const ALLOWED_LANGS = new Set(["it", "en", "es", "fr", "ar", "ru", "zh", "lij"]);
const ALLOWED_TAGS = new Set(["museums", "cinema", "theatre", "music", "palaces", "heritage", "festivals", "markets", "sport"]);
const ALLOWED_PERIODS = new Set(["today", "weekend", "7days", "30days"]);
const ALLOWED_AREAS = new Set(["genova", "metro"]);
const MAX_BODY_BYTES = 90000;
const MAX_EVENT_RESULTS = 16;
const MAX_VENUES_TOTAL = 100;
const MAX_VENUES_PER_TAG = 40;
const SEARCH_BUDGET_MS = 20000;
const MIN_RETRY_REMAINING_MS = 7000;

const TAG_LABELS = {
  museums: "musei, mostre ed esposizioni",
  cinema: "cinema, proiezioni, rassegne e incontri",
  theatre: "teatro e spettacoli teatrali",
  music: "concerti e appuntamenti musicali",
  palaces: "eventi in palazzi, ville e dimore storiche",
  heritage: "eventi in chiese, forti e luoghi storici",
  festivals: "festival, feste e manifestazioni",
  markets: "mercati e fiere",
  sport: "gare, incontri e attivita sportive",
};

const LANGUAGE_NAMES = {
  it: "italiano",
  en: "inglese",
  es: "spagnolo",
  fr: "francese",
  ar: "arabo",
  ru: "russo",
  zh: "cinese semplificato",
  lij: "ligure/genovese",
};

function json(value, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

function cleanString(value, max = 400) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanUrl(value) {
  try {
    const url = new URL(String(value || ""));
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.href;
  } catch {
    return "";
  }
}

function cleanDate(value) {
  const text = cleanString(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, count) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + count);
  return next;
}

function dateRange(todayText, period) {
  const today = parseDate(todayText) || new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 12));
  if (period === "today") return { start: isoDate(start), end: isoDate(start), label: "oggi" };
  if (period === "weekend") {
    const weekday = start.getUTCDay(); // 0=Sun ... 6=Sat
    let fridayOffset;
    if (weekday === 5) fridayOffset = 0;
    else if (weekday === 6) fridayOffset = -1;
    else if (weekday === 0) fridayOffset = -2;
    else fridayOffset = 5 - weekday;
    const friday = addDays(start, fridayOffset);
    const sunday = addDays(friday, 2);
    return { start: isoDate(friday), end: isoDate(sunday), label: "questo weekend" };
  }
  const days = period === "30days" ? 29 : 6;
  return { start: isoDate(start), end: isoDate(addDays(start, days)), label: period === "30days" ? "i prossimi 30 giorni" : "i prossimi 7 giorni" };
}

function sanitizeVenues(value) {
  const out = {};
  if (!value || typeof value !== "object") return out;
  const entries = Object.entries(value).filter(([tag, list]) => ALLOWED_TAGS.has(tag) && Array.isArray(list));
  if (!entries.length) return out;
  const fairPerTagLimit = Math.max(10, Math.min(MAX_VENUES_PER_TAG, Math.floor(MAX_VENUES_TOTAL / entries.length)));
  let total = 0;
  for (const [tag, list] of entries) {
    const seen = new Set();
    out[tag] = [];
    for (const item of list) {
      if (out[tag].length >= fairPerTagLimit || total >= MAX_VENUES_TOTAL) break;
      const name = cleanString(item, 120);
      const key = name.toLocaleLowerCase("it");
      if (!name || seen.has(key)) continue;
      seen.add(key);
      out[tag].push(name);
      total++;
    }
  }
  return out;
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) return payload.output_text.trim();
  const chunks = [];
  for (const item of payload?.output || []) {
    if (item?.type !== "message") continue;
    for (const part of item.content || []) {
      if (part?.type === "output_text" && typeof part.text === "string") chunks.push(part.text);
    }
  }
  return chunks.join("\n").trim();
}

function cleanEvents(events, range) {
  if (!Array.isArray(events)) return [];
  const seen = new Set();
  const out = [];
  for (const raw of events.slice(0, 28)) {
    if (!raw || typeof raw !== "object") continue;
    const title = cleanString(raw.title, 180);
    const venue = cleanString(raw.venue, 160);
    const startDate = cleanDate(raw.startDate);
    const endDate = cleanDate(raw.endDate) || startDate;
    if (!title || !startDate) continue;
    if (startDate > range.end || endDate < range.start) continue;
    const key = `${title.toLocaleLowerCase("it")}|${venue.toLocaleLowerCase("it")}|${startDate}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      title,
      category: cleanString(raw.category, 80),
      venue,
      municipality: cleanString(raw.municipality, 100),
      startDate,
      endDate,
      time: cleanString(raw.time, 80),
      duration: cleanString(raw.duration, 100),
      description: cleanString(raw.description, 520),
      url: cleanUrl(raw.url),
      sourceName: cleanString(raw.sourceName, 140),
      mapVenue: cleanString(raw.mapVenue, 160),
    });
  }
  out.sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title, "it"));
  return out.slice(0, MAX_EVENT_RESULTS);
}

function buildPrompt({ language, tags, area, range, venues }) {
  const requested = tags.map((key) => TAG_LABELS[key]).filter(Boolean).join("; ");
  const areaText = area === "metro"
    ? "tutta la Citta Metropolitana di Genova, comprendendo anche i comuni fuori dal capoluogo"
    : "il Comune di Genova";
  const venueSections = tags.map((tag) => {
    const list = venues[tag] || [];
    if (!list.length) return `- ${TAG_LABELS[tag]}: nessun luogo specifico fornito; cerca comunque nel territorio.`;
    return `- ${TAG_LABELS[tag]}: ${list.join(" | ")}`;
  }).join("\n");

  return `Sei il motore di ricerca eventi di Genova mApp. Devi cercare sul web eventi REALI, pubblici, programmati o in corso nel territorio indicato.\n\n` +
    `Periodo da considerare: dal ${range.start} al ${range.end} inclusi (${range.label}).\n` +
    `Territorio: ${areaText}.\n` +
    `Tipi richiesti: ${requested}.\n` +
    `Lingua dell'interfaccia e dei testi finali: ${LANGUAGE_NAMES[language] || "italiano"}.\n\n` +
    `Cerca soprattutto in italiano, perche molte fonti locali sono in italiano, ma restituisci titolo categoria durata e breve descrizione nella lingua richiesta. Non tradurre i nomi propri dei luoghi.\n\n` +
    `Dai priorita a fonti ufficiali: Comune di Genova, Citta Metropolitana, Visit Genoa, musei, teatri, cinema, fondazioni, organizzatori, enti culturali, impianti sportivi e pagine ufficiali dell'evento. Usa fonti generiche solo come integrazione.\n` +
    `NON includere un evento se non riesci a verificare una data compatibile con il periodo richiesto. NON inventare URL, orari, luoghi o descrizioni. Se una pagina e vecchia o non conferma l'edizione corrente, escludila.\n` +
    `Preferisci come url la pagina ufficiale specifica dell'evento; se non esiste usa la pagina ufficiale del programma/calendario che conferma l'evento.\n` +
    `Ordina gli eventi per data e limita il risultato a un massimo di ${MAX_EVENT_RESULTS} elementi. Evita duplicati. Mantieni le descrizioni brevi: una o due frasi.\n\n` +
    `Questi sono i luoghi gia presenti in Genova mApp, raggruppati per tipo. Usali come indizi di ricerca. Se un evento si svolge chiaramente in uno di questi luoghi, imposta mapVenue ESATTAMENTE con il nome presente nell'elenco; altrimenti lascia mapVenue vuoto.\n${venueSections}\n\n` +
    `Per gli eventi diffusi, festival, mercati e fiere cerca anche eventi che non corrispondono a un luogo dell'elenco.`;
}

const EVENT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    events: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          category: { type: "string" },
          venue: { type: "string" },
          municipality: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          time: { type: "string" },
          duration: { type: "string" },
          description: { type: "string" },
          url: { type: "string" },
          sourceName: { type: "string" },
          mapVenue: { type: "string" },
        },
        required: ["title", "category", "venue", "municipality", "startDate", "endDate", "time", "duration", "description", "url", "sourceName", "mapVenue"],
      },
    },
  },
  required: ["events"],
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function upstreamErrorInfo(status, payload) {
  const upstreamError = payload && payload.error && typeof payload.error === "object" ? payload.error : {};
  const code = cleanString(upstreamError.code || upstreamError.type || "", 120);
  const message = cleanString(upstreamError.message || "OpenAI non ha restituito una risposta valida.", 520);
  return {
    code,
    message,
    diagnostic: `OpenAI ${status}${code ? ` (${code})` : ""}: ${message}`,
  };
}

function shouldRetryUpstream(status, code) {
  if (status >= 500 && status <= 599) return true;
  if (status !== 429) return false;
  const terminal429 = new Set([
    "credit_balance_exhausted",
    "insufficient_quota",
    "organization_spend_limit_exceeded",
    "project_spend_limit_exceeded",
    "organization_usage_limit_exceeded",
  ]);
  return !terminal429.has(code || "");
}

function retryDelayMs(response, attempt) {
  const header = response && response.headers ? response.headers.get("retry-after") : "";
  if (header) {
    const seconds = Number(header);
    if (Number.isFinite(seconds) && seconds >= 0) return Math.min(Math.max(seconds * 1000, 250), 6000);
    const when = Date.parse(header);
    if (Number.isFinite(when)) return Math.min(Math.max(when - Date.now(), 250), 6000);
  }
  return attempt === 0 ? 800 : 1600;
}

function extractRefusal(payload) {
  for (const item of payload?.output || []) {
    if (item?.type !== "message") continue;
    for (const part of item.content || []) {
      if (part?.type === "refusal" && typeof part.refusal === "string" && part.refusal.trim()) {
        return cleanString(part.refusal, 520);
      }
    }
  }
  return "";
}

function remainingBudgetMs(startedAt) {
  return Math.max(0, SEARCH_BUDGET_MS - (Date.now() - startedAt));
}

function canRetryWithinBudget(startedAt) {
  return remainingBudgetMs(startedAt) >= MIN_RETRY_REMAINING_MS;
}

async function fetchWithBudget(url, options, startedAt, attempt) {
  const remaining = remainingBudgetMs(startedAt);
  const safety = 1200;
  if (remaining <= safety + 500) {
    const error = new Error("event_search_time_budget_exhausted");
    error.name = "EventSearchTimeoutError";
    throw error;
  }
  const preferred = attempt === 0 ? 17500 : 10000;
  const timeoutMs = Math.max(1000, Math.min(preferred, remaining - safety));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error && error.name === "AbortError") {
      const timeoutError = new Error("event_search_upstream_timeout");
      timeoutError.name = "EventSearchTimeoutError";
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}


export default async (request) => {
  try {
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);
    let body;
    try { body = raw ? JSON.parse(raw) : {}; } catch { return json({ error: "invalid_json" }, 400); }

    const language = ALLOWED_LANGS.has(body.language) ? body.language : "it";
    const tags = Array.isArray(body.tags) ? body.tags.filter((tag) => ALLOWED_TAGS.has(tag)).slice(0, 9) : [];
    const period = ALLOWED_PERIODS.has(body.period) ? body.period : "7days";
    const area = ALLOWED_AREAS.has(body.area) ? body.area : "genova";
    if (!tags.length) return json({ error: "missing_tags" }, 400);
    const venues = sanitizeVenues(body.venues);
    const range = dateRange(cleanString(body.today, 10), period);

    const apiKey = process.env.OPENAI_API_KEY;
    const configuredBaseUrl = cleanString(process.env.OPENAI_BASE_URL || "", 500).replace(/\/+$/, "");
    if (!apiKey) {
      return json({
        error: "search_not_configured",
        message: "OpenAI/Netlify AI Gateway is not available for this deployment.",
      }, 503);
    }

    // Netlify AI Gateway injects both OPENAI_API_KEY and OPENAI_BASE_URL on
    // supported credit-based plans. If the site uses its own OpenAI key, the
    // base URL may be absent; in that case use the official OpenAI endpoint.
    const baseUrl = configuredBaseUrl || "https://api.openai.com";
    const responsesEndpoint = /\/v1$/i.test(baseUrl) ? `${baseUrl}/responses` : `${baseUrl}/v1/responses`;
    const model = process.env.OPENAI_EVENTS_MODEL || "gpt-5.6-luna";
    const requestBody = {
      model,
      store: false,
      reasoning: { effort: "low" },
      tools: [{ type: "web_search", search_context_size: "low", user_location: { type: "approximate", city: "Genoa", region: "Liguria", country: "IT", timezone: "Europe/Rome" } }],
      tool_choice: "auto",
      input: buildPrompt({ language, tags, area, range, venues }),
      max_output_tokens: 7000,
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "genova_mapp_events",
          strict: true,
          schema: EVENT_SCHEMA,
        },
      },
    };

    let parsed = null;
    let lastFailure = null;

    // Una sola ripetizione automatica: serve per errori transitori (rate limit,
    // sovraccarico, risposta incompleta o JSON eccezionalmente non leggibile),
    // ma non ripete errori definitivi come credito esaurito o permessi.
    const searchStartedAt = Date.now();
    for (let attempt = 0; attempt < 2; attempt++) {
      let upstream;
      try {
        upstream = await fetchWithBudget(responsesEndpoint, {
          method: "POST",
          headers: {
            authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }, searchStartedAt, attempt);
      } catch (error) {
        if (error && error.name === "EventSearchTimeoutError") {
          const elapsedMs = Date.now() - searchStartedAt;
          console.warn("Genova mApp events-search timeout:", { language, elapsedMs, attempt: attempt + 1 });
          return json({
            error: "search_timeout",
            message: "La ricerca degli eventi sta impiegando troppo tempo. Riprova: la richiesta e stata interrotta prima del limite Netlify.",
            elapsedMs,
          }, 504);
        }
        throw error;
      }

      const payload = await upstream.json().catch(() => null);
      if (!upstream.ok || !payload) {
        const info = upstreamErrorInfo(upstream.status, payload);
        console.error("Genova mApp events-search upstream:", upstream.status, payload);
        lastFailure = {
          error: "upstream_error",
          message: info.diagnostic,
          upstreamStatus: upstream.status,
          upstreamCode: info.code,
        };
        if (attempt === 0 && shouldRetryUpstream(upstream.status, info.code) && canRetryWithinBudget(searchStartedAt)) {
          await sleep(retryDelayMs(upstream, attempt));
          continue;
        }
        return json(lastFailure, 502);
      }

      if (payload.status === "incomplete") {
        const reason = cleanString(payload?.incomplete_details?.reason || "unknown", 120);
        console.warn("Genova mApp events-search incomplete:", reason);
        lastFailure = {
          error: "incomplete_search_response",
          message: `OpenAI ha restituito una ricerca incompleta (${reason}). Riprova tra qualche secondo.`,
        };
        if (attempt === 0 && reason !== "content_filter" && canRetryWithinBudget(searchStartedAt)) {
          await sleep(650);
          continue;
        }
        return json(lastFailure, 502);
      }

      const refusal = extractRefusal(payload);
      if (refusal) {
        console.warn("Genova mApp events-search refusal:", refusal);
        return json({
          error: "search_refused",
          message: "La ricerca non ha prodotto risultati utilizzabili. Prova con un'altra combinazione di categorie o periodo.",
        }, 502);
      }

      const text = extractOutputText(payload);
      try {
        parsed = JSON.parse(text);
        break;
      } catch (error) {
        console.error("Genova mApp events-search JSON parse:", error, text?.slice(0, 1000));
        lastFailure = {
          error: "invalid_search_response",
          message: "OpenAI ha completato la ricerca, ma la risposta non era nel formato eventi previsto. Riprova tra qualche secondo.",
        };
        if (attempt === 0 && canRetryWithinBudget(searchStartedAt)) {
          await sleep(650);
          continue;
        }
        return json(lastFailure, 502);
      }
    }

    if (!parsed) {
      return json(lastFailure || {
        error: "invalid_search_response",
        message: "Non e stato possibile ottenere una risposta eventi valida.",
      }, 502);
    }

    const cleanedEvents = cleanEvents(parsed.events, range);
    const elapsedMs = Date.now() - searchStartedAt;
    console.log("Genova mApp events-search success:", { language, events: cleanedEvents.length, elapsedMs });
    return json({
      events: cleanedEvents,
      checkedAt: new Date().toISOString(),
      range,
      elapsedMs,
      provider: configuredBaseUrl ? "netlify-ai-gateway-openai-web-search" : "openai-web-search",
    });
  } catch (error) {
    console.error("Genova mApp events-search:", error);
    return json({
      error: "server_error",
      message: `Errore interno della funzione Eventi${error && error.name ? ` (${cleanString(error.name, 80)})` : ""}.`,
    }, 500);
  }
};
