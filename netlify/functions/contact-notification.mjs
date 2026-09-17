function env(name) {
  try {
    return String(Netlify.env.get(name) || "").trim();
  } catch (_) {
    return "";
  }
}

function cleanLine(value, max = 160) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMessage(value, max = 6000) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}

function isEmail(value) {
  const email = cleanLine(value, 254);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function recipients(value) {
  const seen = new Set();
  return String(value || "")
    .split(/[;,]/)
    .map((item) => cleanLine(item, 254))
    .filter((item) => isEmail(item))
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);
}

async function sendContactEmail(data) {
  if (!data || data["notification-source"] !== "genova-mapp-contact-v1") return;

  // Netlify invokes this handler only after a form submission has been verified.
  // Keep the honeypot check as an additional defensive guard.
  if (cleanLine(data["bot-field"], 20)) return;

  const name = cleanLine(data.name, 120);
  const senderEmail = cleanLine(data.email, 254);
  const message = cleanMessage(data.message, 6000);
  if (!message) return;

  const apiKey = env("RESEND_API_KEY");
  const from = env("CONTACT_FROM_EMAIL");
  const to = recipients(env("CONTACT_TO_EMAIL"));

  if (!apiKey || !from || !to.length) {
    console.error(
      "Genova mApp contact notification: configuration incomplete. " +
      "Set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL in Netlify environment variables."
    );
    return;
  }

  const receivedAt = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const displayName = name || "Utente Genova mApp";
  const validReplyTo = isEmail(senderEmail) ? senderEmail : "";
  const subject = `[Genova mApp] Nuovo messaggio da ${displayName}`.slice(0, 180);

  const text = [
    "Nuovo messaggio da Genova mApp",
    "",
    `Nome: ${name || "Non indicato"}`,
    `Email: ${validReplyTo || "Non indicata"}`,
    `Ricevuto: ${receivedAt}`,
    "",
    "Messaggio:",
    message,
    "",
    "Il messaggio originale resta archiviato anche in Netlify Forms.",
  ].join("\n");

  const replyBlock = validReplyTo
    ? `<a href="mailto:${escapeHtml(validReplyTo)}" style="color:#0b5cab">${escapeHtml(validReplyTo)}</a>`
    : "Non indicata";

  const html = `<!doctype html>
<html lang="it">
  <body style="margin:0;padding:24px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#172033">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d9e1ea;border-radius:14px;overflow:hidden">
      <div style="padding:18px 22px;background:#0d2e52;color:#ffffff">
        <div style="font-size:20px;font-weight:700">Genova mApp</div>
        <div style="font-size:13px;opacity:.86;margin-top:3px">Nuovo messaggio dal modulo Contattaci</div>
      </div>
      <div style="padding:22px">
        <table role="presentation" style="border-collapse:collapse;width:100%;font-size:14px;margin-bottom:18px">
          <tr><td style="padding:5px 10px 5px 0;font-weight:700;width:90px">Nome</td><td style="padding:5px 0">${escapeHtml(name || "Non indicato")}</td></tr>
          <tr><td style="padding:5px 10px 5px 0;font-weight:700">Email</td><td style="padding:5px 0">${replyBlock}</td></tr>
          <tr><td style="padding:5px 10px 5px 0;font-weight:700">Ricevuto</td><td style="padding:5px 0">${escapeHtml(receivedAt)}</td></tr>
        </table>
        <div style="font-size:14px;font-weight:700;margin-bottom:7px">Messaggio</div>
        <div style="white-space:pre-wrap;line-height:1.55;padding:14px;background:#f7f9fc;border-radius:10px;border:1px solid #e4e9ef">${escapeHtml(message)}</div>
        <div style="font-size:12px;color:#667085;margin-top:18px">Il messaggio originale resta archiviato anche nella sezione Forms di Netlify.</div>
      </div>
    </div>
  </body>
</html>`;

  const payload = {
    from,
    to,
    subject,
    text,
    html,
    tags: [{ name: "source", value: "genova_mapp_contact" }],
  };
  if (validReplyTo) payload.reply_to = validReplyTo;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const code = result && typeof result === "object" ? cleanLine(result.name || result.message, 200) : "unknown";
    console.error(`Genova mApp contact notification: Resend HTTP ${response.status} (${code})`);
    throw new Error(`Resend contact notification failed with HTTP ${response.status}`);
  }

  console.log(`Genova mApp contact notification sent${result?.id ? ` (${result.id})` : ""}.`);
}

export default {
  async formSubmitted(event) {
    await sendContactEmail(event?.data || {});
  },
};
