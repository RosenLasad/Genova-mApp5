// games.js
// Motore del Quiz di Genova. Le domande stanno in questions.js (window.QUIZ_QUESTIONS).

const CATEGORIES = [
  { id: "storia", label: "Storia" },
  { id: "geografia", label: "Geografia" },
  { id: "musica", label: "Musica" },
  { id: "arte", label: "Arte" },
  { id: "spettacolo", label: "Spettacolo" },
  { id: "scienza", label: "Scienza" },
  { id: "sport", label: "Sport" },
  { id: "cucina", label: "Cucina" },
  { id: "dialetto", label: "Dialetto e cultura" },
];

const WIN_PER_CAT = 3;

// Colori categoria (UI): scelti per essere leggibili su sfondo scuro.
const CATEGORY_COLORS = {
  storia: "#ef4444",      // rosso
  geografia: "#3b82f6",   // blu
  musica: "#a855f7",      // viola
  arte: "#f97316",        // arancio
  spettacolo: "#14b8a6",  // teal
  scienza: "#22c55e",     // verde
  sport: "#eab308",       // giallo
  cucina: "#fb7185",      // rosa
  dialetto: "#94a3b8",    // grigio/ardesia
};

function getCatColor(catId) {
  return CATEGORY_COLORS[catId] || "#2a3042";
}

function applyCatPillStyle(el, catId) {
  const col = getCatColor(catId);
  if (!el) return;
  el.style.background = col;
  el.style.borderColor = col;
  el.style.color = "#0f1115";
}

function applyCatCardStyle(el, catId) {
  const col = getCatColor(catId);
  if (!el) return;
  el.style.borderColor = col;
  el.style.boxShadow = `inset 6px 0 0 ${col}`;
}


const CAT_SET = new Set(CATEGORIES.map(c => c.id));

// --- Persistence (LocalStorage) ---
const SAVE_KEY = "gdg_quiz_save_v1";

function getActiveScreenId() {
  if (!screenMain.classList.contains("hidden")) return "main";
  if (!screenCats.classList.contains("hidden")) return "cats";
  if (!screenQ.classList.contains("hidden")) return "q";
  if (!screenWin.classList.contains("hidden")) return "win";
  return "main";
}

function serializeGame() {
  if (!game) return null;
  const g = JSON.parse(JSON.stringify(game));

  // Non salviamo l'oggetto domanda completo: basta l'id.
  if (g.current && g.current.q && typeof g.current.q._id === "number") {
    g.current.qId = g.current.q._id;
    delete g.current.q;
  }
  return g;
}

function hydrateGame(g) {
  if (!g) return null;

  // Ricostruisci q dall'id
  if (g.current && typeof g.current.qId === "number") {
    const qObj = QUESTIONS[g.current.qId];
    if (qObj) {
      g.current.q = { ...qObj, _id: g.current.qId };
    } else {
      g.current = null;
    }
    try { delete g.current.qId; } catch {}
  }
  return g;
}

function makeSavePayload() {
  return {
    v: 1,
    savedAt: Date.now(),
    settings,
    game: serializeGame(),
    ui: {
      screen: getActiveScreenId(),
      timeLeft,
      paused,
      feedback: {
        visible: !elFeedback.classList.contains("hidden"),
        className: elFeedback.className,
        text: elFeedback.textContent,
        nextVisible: !btnNext.classList.contains("hidden"),
        choicesDisabled: Array.from(elChoices.querySelectorAll("button")).every(b => b.disabled),
      }
    }
  };
}

function saveNow() {
  try {
    if (!settings || !game) return;
    localStorage.setItem(SAVE_KEY, JSON.stringify(makeSavePayload()));
  } catch (e) {
    console.warn("QUIZ: salvataggio fallito", e);
  }
}

function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch {}
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.v !== 1) return null;
    if (!data.settings || !data.game) return null;
    return data;
  } catch {
    return null;
  }
}

function hasValidSave() {
  return !!loadSave();
}


function sanitizeQuestions(raw) {
  const out = [];
  (raw || []).forEach((q, i) => {
    const ok =
      q && CAT_SET.has(q.category) &&
      typeof q.question === "string" && q.question.trim().length > 0 &&
      Array.isArray(q.choices) && q.choices.length === 3 && q.choices.every(c => typeof c === "string" && c.trim().length > 0) &&
      Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 2 &&
      (q.explain === undefined || typeof q.explain === "string") &&
      (q.image === undefined || (typeof q.image === "string" && q.image.trim().length > 0));

    if (!ok) {
      console.warn(`QUIZ: domanda ignorata (indice ${i}). Controlla questions.js`, q);
      return;
    }
    out.push(q);
  });
  return out;
}

const QUESTIONS = sanitizeQuestions(Array.isArray(window.QUIZ_QUESTIONS) ? window.QUIZ_QUESTIONS : []);
if (QUESTIONS.length === 0) {
  console.warn("QUIZ: Nessuna domanda caricata. Controlla questions.js e l'ordine degli script in index.html.");
}

const $ = (s) => document.querySelector(s);

// Screens
const screenMain = $("#screenMain");
const screenCats = $("#screenCats");
const screenQ = $("#screenQ");
const screenWin = $("#screenWin");

// Top buttons
const btnTopMenu = $("#btnTopMenu");
const btnResetTop = $("#btnReset");

// Main menu UI
const multiOptions = $("#multiOptions");
const playerCountSel = $("#playerCount");
const playerNamesBox = $("#playerNames");
const oneCatOptions = $("#oneCatOptions");
const singleCategorySel = $("#singleCategory");
const timerSecondsSel = $("#timerSeconds");
const timerEnabledChk = $("#timerEnabled");
const btnStart = $("#btnStart");
const btnHub2 = $("#btnHub2");

// Cats UI
const catsTitle = $("#catsTitle");
const catsSub = $("#catsSub");
const elCats = $("#cats");
const hudPlayer = $("#hudPlayer");
const hudMode = $("#hudMode");
const hudHint = $("#hudHint");

// Question UI
const qCat = $("#qCat");
const qPlayer = $("#qPlayer");
const qText = $("#qText");
const qNeed = $("#qNeed");
const qMedia = $("#qMedia");
const qImg = $("#qImg");
const elChoices = $("#choices");
const elFeedback = $("#feedback");
const btnNext = $("#btnNext");
const btnBack = $("#btnBack");
const timerText = $("#timerText");
const timerBox = $("#timerBox");
const hudPlayersQ = $("#hudPlayersQ");
const hudPlayersSummary = $("#hudPlayersSummary");

// Win UI
const winTitle = $("#winTitle");
const winSub = $("#winSub");
const btnNewGame = $("#btnNewGame");
const btnRestartSame = $("#btnRestartSame");
const leaderboard = $("#leaderboard");

// Overlays
const overlayTurn = $("#overlayTurn");
const turnText = $("#turnText");
const btnTurnOk = $("#btnTurnOk");

const overlayPause = $("#overlayPause");
const btnResume = $("#btnResume");
const btnRestart = $("#btnRestart");
const btnToMain = $("#btnToMain");
const confirmMain = $("#confirmMain");
const btnConfirmMainYes = $("#btnConfirmMainYes");
const btnConfirmMainNo = $("#btnConfirmMainNo");

// --- Game state (in memoria, niente persistence) ---
let settings = null;
let game = null;

// Timer runtime
let timerInterval = null;
let timeLeft = 0;
let paused = false;

function showOnly(screen) {
  [screenMain, screenCats, screenQ, screenWin].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function setTopButtons(inGame) {
  // Menu appare solo in partita (cats o question)
  btnTopMenu.classList.toggle("hidden", !inGame);
  btnResetTop.classList.toggle("hidden", !inGame);
}

function updateTimerVisibility() {
  const enabled = settings?.timerEnabled !== false;
  if (timerBox) timerBox.classList.toggle("hidden", !enabled);
}

function formatMMSS(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function startTimer(seconds) {
  // Se timer disattivato, non fare nulla.
  if (settings?.timerEnabled === false) {
    stopTimer();
    timeLeft = 0;
    if (timerText) timerText.textContent = formatMMSS(0);
    return;
  }
  stopTimer();
  timeLeft = seconds;
  timerText.textContent = formatMMSS(timeLeft);

  timerInterval = setInterval(() => {
    if (paused) return;
    timeLeft -= 1;
    timerText.textContent = formatMMSS(Math.max(0, timeLeft));
    if (timeLeft <= 0) {
      stopTimer();
      onTimeout();
    }
  }, 1000);
}

function pauseGame() {
  paused = true;
  stopTimer(); // ferma proprio l'intervallo, così non fa casino
  saveNow();
}

function resumeGame() {
  paused = false;
  // riparte solo se timer attivo
  if (settings?.timerEnabled !== false && game?.current?.q && timeLeft > 0) startTimer(timeLeft);
  saveNow();
}

function buildNamesInputs(n) {
  playerNamesBox.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const row = document.createElement("div");
    row.className = "nameRow";
    row.innerHTML = `
      <label class="muted">Giocatore ${i+1}</label>
      <input type="text" data-player="${i}" placeholder="Nome (es. Gino)" />
    `;
    playerNamesBox.appendChild(row);
  }
}

function readPlayersFromMenu() {
  const modePlayers = document.querySelector('input[name="modePlayers"]:checked')?.value || "single";
  const isMulti = modePlayers === "multi";
  const n = isMulti ? parseInt(playerCountSel.value, 10) : 1;

  const names = [];
  if (isMulti) {
    const inputs = Array.from(playerNamesBox.querySelectorAll('input[type="text"]'));
    for (let i = 0; i < n; i++) {
      const val = (inputs[i]?.value || "").trim();
      names.push(val || `Giocatore ${i+1}`);
    }
  } else {
    names.push("Giocatore");
  }
  return { isMulti, names };
}

function readCategoriesFromMenu() {
  const modeCats = document.querySelector('input[name="modeCats"]:checked')?.value || "all";
  if (modeCats === "one") {
    const cat = singleCategorySel.value;
    return { mode: "one", active: [cat] };
  }
  return { mode: "all", active: CATEGORIES.map(c => c.id) };
}

function readTimerFromMenu() {
  const enabled = !!timerEnabledChk?.checked;
  const sec = parseInt(timerSecondsSel.value, 10);
  const seconds = Number.isFinite(sec) ? sec : 30;
  return { enabled, seconds };
}

function initMainMenu() {
  // Popola select categoria singola
  singleCategorySel.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join("");

  // Default names inputs
  buildNamesInputs(parseInt(playerCountSel.value, 10));

  // Toggle UI
  document.querySelectorAll('input[name="modePlayers"]').forEach(r => {
    r.addEventListener("change", () => {
      const isMulti = document.querySelector('input[name="modePlayers"]:checked')?.value === "multi";
      multiOptions.classList.toggle("hidden", !isMulti);
      if (isMulti) buildNamesInputs(parseInt(playerCountSel.value, 10));
    });
  });

  playerCountSel.addEventListener("change", () => {
    buildNamesInputs(parseInt(playerCountSel.value, 10));
  });

  document.querySelectorAll('input[name="modeCats"]').forEach(r => {
    r.addEventListener("change", () => {
      const one = document.querySelector('input[name="modeCats"]:checked')?.value === "one";
      oneCatOptions.classList.toggle("hidden", !one);
    });

  function syncTimerMenuUI() {
    const enabled = !!timerEnabledChk?.checked;
    if (timerSecondsSel) timerSecondsSel.disabled = !enabled;
    if (timerSecondsSel) timerSecondsSel.style.opacity = enabled ? "1" : ".6";
  }

  if (timerEnabledChk) {
    timerEnabledChk.addEventListener("change", syncTimerMenuUI);
  }
  syncTimerMenuUI();

  });




  // Bottone "Continua partita" (creato via JS per non toccare l'HTML)
  let btnContinue = $("#btnContinue");
  if (!btnContinue) {
    btnContinue = document.createElement("button");
    btnContinue.type = "button";
    btnContinue.id = "btnContinue";
    btnContinue.className = "ghost";
    btnContinue.textContent = "Continua partita";
    // Inseriscilo accanto a "Inizia partita"
    const row = btnStart?.parentElement;
    if (row) row.insertBefore(btnContinue, btnStart.nextSibling);
  }

  function refreshContinueButton() {
    const ok = hasValidSave();
    btnContinue.disabled = !ok;
    btnContinue.title = ok ? "Riprendi la partita salvata" : "Nessuna partita salvata trovata";
    btnContinue.classList.toggle("hidden", !ok);
  }

  btnContinue.addEventListener("click", () => {
    const data = loadSave();
    if (!data) return;

    try {
      settings = data.settings;
      game = hydrateGame(data.game);

      timeLeft = Number.isFinite(data.ui?.timeLeft)
        ? data.ui.timeLeft
        : ((settings && settings.timerEnabled === false) ? 0 : (settings?.timerSeconds || 30));

      paused = !!data.ui?.paused;

      const target = data.ui?.screen || "main";

      if (target === "win" && game?.finished) {
        showOnly(screenWin);
  renderQuestionMedia(null);

        const winnerName = game.players[game.winnerIndex]?.name || "Qualcuno";
        winTitle.textContent = settings.isMulti ? `${winnerName} ha vinto.` : "Hai vinto.";
        winSub.textContent = settings.isMulti
          ? "Complimenti. E ora potete litigare su chi teneva il telefono storto."
          : "Ora puoi vantarti con chiunque. Sì, anche se nessuno te l’ha chiesto.";

        renderLeaderboard();
        stopTimer();
        paused = false;
        setTopButtons(true);
        saveNow();
        refreshContinueButton();
        return;
      }

      if (target === "q") {
        if (game?.current?.q) {
          restoreQuestionUIFromSave(data);
        } else {
          startFirstQuestion();
        }
        setTopButtons(true);
        saveNow();
        refreshContinueButton();
        return;
      }

      if (target === "cats") {
        showCatsScreen();
        setTopButtons(true);
        saveNow();
        refreshContinueButton();
        return;
      }

      // fallback: se non sappiamo dove metterti, riparti dalla domanda
      if (game && settings) {
        startFirstQuestion();
        setTopButtons(true);
        saveNow();
      } else {
        showMainMenu();
        setTopButtons(false);
      }

      refreshContinueButton();
    } catch (e) {
      console.warn("QUIZ: ripristino fallito, riparto dalla domanda", e);
      try {
        if (settings && game) {
          startFirstQuestion();
          setTopButtons(true);
          saveNow();
        } else {
          showMainMenu();
          setTopButtons(false);
        }
      } catch {}
      refreshContinueButton();
    }
  });

  refreshContinueButton();

  btnStart.addEventListener("click", () => {
    startNewMatchFromMenu();
  });
}

function makeEmptyScores(activeCats) {
  return Object.fromEntries(activeCats.map(id => [id, 0]));
}


function pickCategoryForPlayer(player) {
  if (settings.categoriesMode === "one") return settings.activeCategories[0];

  // Modalità "tutte le categorie": sorteggia tra quelle non completate dal giocatore corrente
  const incomplete = settings.activeCategories.filter(catId => (player.score[catId] || 0) < WIN_PER_CAT);
  if (incomplete.length === 0) return null;
  return incomplete[Math.floor(Math.random() * incomplete.length)];
}

function startFirstQuestion() {
  const p = currentPlayer();
  const catId = pickCategoryForPlayer(p);

  if (!catId) {
    // Tecnicamente impossibile all'inizio, ma meglio essere paranoici che stupidi.
    setWinner(game.currentPlayer);
    return;
  }
  startQuestion(catId);
}

function makeGame(settings) {
  return {
    players: settings.players.map(name => ({
      name,
      score: makeEmptyScores(settings.activeCategories),
    })),
    used: Object.fromEntries(settings.activeCategories.map(id => [id, []])), // globale, così non ripete troppo
    currentPlayer: 0,
    current: null, // { categoryId, q }
    finished: false,
    winnerIndex: null,
  };
}

function startNewMatchFromMenu() {
  clearSave();
  const { isMulti, names } = readPlayersFromMenu();
  const cats = readCategoriesFromMenu();
  const t = readTimerFromMenu();

  settings = {
    isMulti,
    players: names,
    categoriesMode: cats.mode,   // all | one
    activeCategories: cats.active,
    timerEnabled: t.enabled,
    timerSeconds: t.seconds,
  };

  game = makeGame(settings);

  // Avvia subito la prima domanda (categoria sorteggiata se 'tutte')
  startFirstQuestion();
  saveNow();
}

function restartSameMatch() {
  if (!settings) return;
  game = makeGame(settings);
  // Avvia subito la prima domanda (categoria sorteggiata se 'tutte')
  startFirstQuestion();
  saveNow();
}

function showMainMenu() {
  stopTimer();
  paused = false;
  settings = null;
  game = null;
  setTopButtons(false);
  showOnly(screenMain);
  updateTimerVisibility();
  renderQuestionMedia(null);
  const bc = document.querySelector("#btnContinue");
  if (bc) {
    const ok = hasValidSave();
    bc.disabled = !ok;
    bc.title = ok ? "Riprendi la partita salvata" : "Nessuna partita salvata trovata";
    bc.classList.toggle("hidden", !ok);
  }
}


function currentPlayer() {
  return game.players[game.currentPlayer];
}

function isCatComplete(player, catId) {
  return (player.score[catId] || 0) >= WIN_PER_CAT;
}

function hasWon(player) {
  return settings.activeCategories.every(catId => isCatComplete(player, catId));
}

function updateCatsHUD() {
  const p = currentPlayer();
  hudPlayer.textContent = settings.isMulti ? `Turno: ${p.name}` : `Giocatore: ${p.name}`;
  hudMode.textContent = settings.categoriesMode === "all"
    ? `Obiettivo: ${WIN_PER_CAT} corrette per categoria`
    : `Obiettivo: ${WIN_PER_CAT} corrette in 1 categoria`;
  hudHint.textContent = settings.isMulti ? "Dopo ogni domanda passa il turno." : "";
}

function showCatsScreen() {
  stopTimer();
  paused = false;
  setTopButtons(true);
  showOnly(screenCats);
  updateTimerVisibility();

  // evita “flash” di immagini vecchie quando cambi schermata
  renderQuestionMedia(null);

  const p = currentPlayer();

  if (settings.categoriesMode === "one") {
    const catId = settings.activeCategories[0];
    const catLabel = CATEGORIES.find(c => c.id === catId)?.label ?? catId;
    catsTitle.textContent = `Categoria: ${catLabel}`;
    catsSub.textContent = `Completa ${WIN_PER_CAT} risposte corrette per vincere.`;
  } else {
    catsTitle.textContent = "Completa le categorie";
    catsSub.textContent = `Vinci quando fai ${WIN_PER_CAT} risposte corrette in ciascuna categoria.`;
  }

  updateCatsHUD();
  renderCatsForPlayer(p);
}

function renderCatsForPlayer(player) {
  elCats.innerHTML = "";

  for (const catId of settings.activeCategories) {
    const c = CATEGORIES.find(x => x.id === catId);
    const label = c ? c.label : catId;
    const score = player.score[catId] || 0;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cat";
    applyCatCardStyle(btn, catId);
    btn.innerHTML = `
      <h3>${label}</h3>
      <div class="dots">
        ${[0,1,2].map(i => `<span class="dot ${score > i ? "on" : ""}"></span>`).join("")}
        <span class="muted" style="margin-left:8px">${score}/${WIN_PER_CAT}</span>
      </div>
      <p class="muted">${score >= WIN_PER_CAT ? "Completata" : "Clicca per una domanda"}</p>
    `;
    btn.disabled = score >= WIN_PER_CAT;

    btn.addEventListener("click", () => startQuestion(catId));
    elCats.appendChild(btn);
  }

  // In modalità “solo una categoria”, se completata vai direttamente a win
  if (settings.categoriesMode === "one") {
    const catId = settings.activeCategories[0];
    if (isCatComplete(player, catId)) {
      setWinner(game.currentPlayer);
    }
  }
}

function pickQuestion(categoryId) {
  const pool = QUESTIONS
    .map((q, idx) => ({ ...q, _id: idx }))
    .filter(q => q.category === categoryId);

  if (pool.length === 0) return null;

  const used = new Set(game.used[categoryId] || []);
  let available = pool.filter(q => !used.has(q._id));

  // Se finite, ricomincia (meglio che bloccarsi)
  if (available.length === 0) {
    game.used[categoryId] = [];
    available = pool;
  }

  const picked = available[Math.floor(Math.random() * available.length)];
  game.used[categoryId].push(picked._id);
  return picked;
}


function renderQuestionMedia(q) {
  if (!qMedia || !qImg) return;

  const src = (q && typeof q.image === "string") ? q.image.trim() : "";
  if (src) {
    qImg.src = src;
    qImg.alt = "Immagine domanda";
    qMedia.classList.remove("hidden");
  } else {
    qMedia.classList.add("hidden");
    qImg.removeAttribute("src");
    qImg.alt = "";
  }
}

function startQuestion(categoryId) {
  const q = pickQuestion(categoryId);
  if (!q) {
    alert("Non ci sono domande per questa categoria. Aggiungile in questions.js.");
    return;
  }

  game.current = { categoryId, q };

  const catLabel = CATEGORIES.find(c => c.id === categoryId)?.label ?? categoryId;
  const p = currentPlayer();

  qCat.textContent = catLabel;
  applyCatPillStyle(qCat, categoryId);
  updateTimerVisibility();
  if (timerBox) timerBox.style.borderColor = getCatColor(categoryId);
  updateTimerVisibility();
  qPlayer.textContent = settings.isMulti ? `Gioca: ${p.name}` : p.name;
  qText.textContent = q.question;
  renderQuestionMedia(q);

  const need = Math.max(0, WIN_PER_CAT - (p.score[categoryId] || 0));
  qNeed.textContent = `Ti mancano ${need} punti per completare.`;

  elChoices.innerHTML = "";
  elFeedback.className = "feedback hidden";
  elFeedback.textContent = "";
  btnNext.classList.add("hidden");

  q.choices.forEach((txt, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choice";
    b.textContent = txt;
    b.addEventListener("click", () => answer(i));
    elChoices.appendChild(b);
  });

  paused = false;
  showOnly(screenQ);
  setTopButtons(true);
  renderPlayersHud();

  // Avvia timer (se attivo)
  if (settings.timerEnabled !== false) startTimer(settings.timerSeconds);
  else { stopTimer(); timeLeft = 0; if (timerText) timerText.textContent = formatMMSS(0); }
  saveNow();
}


function renderPlayersHud() {
  if (!hudPlayersQ || !settings || !game) return;

  const cats = settings.activeCategories;

  // Aggiorna il testo del summary (mostra sempre il giocatore di turno)
  const current = game.players?.[game.currentPlayer];
  if (hudPlayersSummary && current) {
    const completed = cats.filter(c => (current.score?.[c] || 0) >= WIN_PER_CAT).length;
    hudPlayersSummary.textContent = `▶ ${current.name} · ${completed}/${cats.length}`;
  }
  hudPlayersQ.innerHTML = "";

  // Ordina: giocatore corrente per primo, poi gli altri
  const order = game.players.map((_, idx) => idx);
  order.sort((a, b) => {
    if (a === game.currentPlayer) return -1;
    if (b === game.currentPlayer) return 1;
    return a - b;
  });

  order.forEach((idx) => {
    const p = game.players[idx];
    const chip = document.createElement("div");
    chip.className = "pChip" + (idx === game.currentPlayer ? " active" : "");

    const completed = cats.filter(c => (p.score[c] || 0) >= WIN_PER_CAT).length;

    const nameRow = document.createElement("div");
    nameRow.className = "pNameRow";

    const name = document.createElement("div");
    name.className = "pName";
    name.textContent = (idx === game.currentPlayer ? "▶ " : "") + p.name;

    const meta = document.createElement("div");
    meta.className = "pMeta";
    meta.textContent = `${completed}/${cats.length}`;

    nameRow.appendChild(name);
    nameRow.appendChild(meta);

    const prog = document.createElement("div");
    prog.className = "pProg";

    cats.forEach(catId => {
      const item = document.createElement("div");
      item.className = "pItem";

      const dot = document.createElement("span");
      dot.className = "pDot";
      dot.style.background = getCatColor(catId);

      const val = document.createElement("span");
      const n = p.score[catId] || 0;
      val.textContent = `${n}/${WIN_PER_CAT}`;

      item.appendChild(dot);
      item.appendChild(val);
      prog.appendChild(item);
    });

    chip.appendChild(nameRow);
    chip.appendChild(prog);
    hudPlayersQ.appendChild(chip);
  });
}

function restoreQuestionUIFromSave(data) {
  if (!data?.game?.current || !game?.current?.q) {
    startFirstQuestion();
    return;
  }

  const { categoryId, q } = game.current;
  const catLabel = CATEGORIES.find(c => c.id === categoryId)?.label ?? categoryId;
  const p = currentPlayer();

  qCat.textContent = catLabel;
  applyCatPillStyle(qCat, categoryId);
  qPlayer.textContent = settings.isMulti ? `Gioca: ${p.name}` : p.name;
  qText.textContent = q.question;

  const need = Math.max(0, WIN_PER_CAT - (p.score[categoryId] || 0));
  qNeed.textContent = `Ti mancano ${need} punti per completare.`;

  elChoices.innerHTML = "";
  q.choices.forEach((txt, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choice";
    b.textContent = txt;
    b.addEventListener("click", () => answer(i));
    elChoices.appendChild(b);
  });

  const fb = data.ui?.feedback;
  if (fb?.visible) {
    elFeedback.className = fb.className || "feedback";
    elFeedback.textContent = fb.text || "";
    elFeedback.classList.remove("hidden");
    if (fb.nextVisible) btnNext.classList.remove("hidden");
    if (fb.choicesDisabled) lockChoices();
    stopTimer();
    paused = false;
  } else {
    elFeedback.className = "feedback hidden";
    elFeedback.textContent = "";
    btnNext.classList.add("hidden");
    paused = false;
    if (timerBox) timerBox.style.borderColor = getCatColor(categoryId);
    updateTimerVisibility();
    if (settings?.timerEnabled !== false) {
      startTimer(Math.max(1, Number.isFinite(data.ui?.timeLeft) ? data.ui.timeLeft : settings.timerSeconds));
    } else {
      stopTimer();
      timeLeft = 0;
      if (timerText) timerText.textContent = formatMMSS(0);
    }
  }

  showOnly(screenQ);
  setTopButtons(true);
  renderPlayersHud();
}

function lockChoices() {
  Array.from(elChoices.querySelectorAll("button")).forEach(b => b.disabled = true);
}

function markChoiceResult(chosenIndex, correctIndex) {
  const btns = Array.from(elChoices.querySelectorAll("button.choice"));
  btns.forEach((b, i) => {
    b.classList.remove("correct", "wrong", "chosen");
    b.setAttribute("aria-pressed", "false");
  });

  // Evidenzia sempre la risposta corretta
  if (Number.isInteger(correctIndex) && btns[correctIndex]) {
    btns[correctIndex].classList.add("correct");
  }

  // Evidenzia la scelta del giocatore (se presente)
  if (Number.isInteger(chosenIndex) && btns[chosenIndex]) {
    btns[chosenIndex].classList.add("chosen");
    btns[chosenIndex].setAttribute("aria-pressed", "true");
    if (chosenIndex !== correctIndex) {
      btns[chosenIndex].classList.add("wrong");
    }
  }
}


function showFeedback(ok, message) {
  elFeedback.className = `feedback ${ok ? "ok" : "no"}`;
  elFeedback.textContent = message;
  elFeedback.classList.remove("hidden");
  btnNext.classList.remove("hidden");
}

function onTimeout() {
  if (!game?.current?.q) return;
  lockChoices();

  const { q } = game.current;
  // Tempo scaduto: evidenzia la risposta corretta
  markChoiceResult(null, q.answer);

  const explain = q.explain ? ` ${q.explain}` : "";
  showFeedback(false, (`Tempo scaduto. Risposta giusta: ${q.choices[q.answer]}.${explain}`).trim());
  renderPlayersHud();
  saveNow();
}


function answer(choiceIndex) {
  stopTimer();
  lockChoices();

  const { categoryId, q } = game.current;
  const p = currentPlayer();

  const ok = choiceIndex === q.answer;
  markChoiceResult(choiceIndex, q.answer);
  if (ok) {
    p.score[categoryId] = Math.min(WIN_PER_CAT, (p.score[categoryId] || 0) + 1);
  }

  const explain = q.explain ? ` ${q.explain}` : "";
  const msg = ok
    ? (`Corretto.${explain}`).trim()
    : (`No. Risposta giusta: ${q.choices[q.answer]}.${explain}`).trim();

  showFeedback(ok, msg);
  renderPlayersHud();
  saveNow();
}

function nextTurn() {
  if (!settings.isMulti) return;

  const nextIdx = (game.currentPlayer + 1) % game.players.length;
  game.currentPlayer = nextIdx;
  saveNow();
}

function playerStats(player) {
  const cats = settings.activeCategories;
  const completed = cats.filter(catId => (player.score[catId] || 0) >= WIN_PER_CAT).length;
  const totalCorrect = cats.reduce((sum, catId) => sum + (player.score[catId] || 0), 0);
  const maxCorrect = cats.length * WIN_PER_CAT;
  return { completed, totalCorrect, maxCorrect, catsCount: cats.length };
}

function renderLeaderboard() {
  if (!leaderboard || !game || !settings) return;

  const rows = game.players
    .map((p, idx) => ({ idx, name: p.name, ...playerStats(p) }))
    .sort((a, b) => {
      if (b.completed !== a.completed) return b.completed - a.completed;
      if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
      return a.idx - b.idx;
    });

  leaderboard.innerHTML = `
    <div style="border:1px solid #232735; border-radius:12px; overflow:hidden;">
      <div style="padding:10px 12px; background:#121623; border-bottom:1px solid #232735; display:flex; justify-content:space-between; gap:10px; align-items:center;">
        <b>Classifica</b>
        <span class="muted" style="font-size:12px;">Categorie: ${rows[0]?.catsCount ?? 0} · Target: ${WIN_PER_CAT}/cat</span>
      </div>
      ${rows.map((r, pos) => {
        const isWinner = (r.idx === game.winnerIndex);
        const medal = pos === 0 ? "🥇" : pos === 1 ? "🥈" : pos === 2 ? "🥉" : `${pos + 1}`;
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:10px 12px; border-bottom:1px solid #232735; ${isWinner ? "background:#10131a;" : ""}">
            <div style="display:flex; gap:10px; align-items:center; min-width:0;">
              <div style="width:34px; height:34px; border-radius:12px; border:1px solid #2a3042; background:#121623; display:flex; align-items:center; justify-content:center; font-variant-numeric: tabular-nums;">
                ${medal}
              </div>
              <div style="min-width:0;">
                <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  ${isWinner ? "🏆 " : ""}${r.name}
                </div>
                <div class="muted" style="font-size:12px; margin-top:2px;">
                  Categorie completate: <b>${r.completed}/${r.catsCount}</b>
                  · Corrette totali: <b>${r.totalCorrect}/${r.maxCorrect}</b>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}


function setWinner(playerIndex) {
  game.finished = true;
  game.winnerIndex = playerIndex;

  stopTimer();
  paused = false;
  setTopButtons(false);
  showOnly(screenWin);

  const winnerName = game.players[playerIndex].name;
  winTitle.textContent = settings.isMulti ? `${winnerName} ha vinto.` : "Hai vinto.";
  winSub.textContent = settings.isMulti
    ? "Complimenti. E ora potete litigare su chi teneva il telefono storto."
    : "Ora puoi vantarti con chiunque. Sì, anche se nessuno te l’ha chiesto.";

  renderLeaderboard();
  saveNow();
}

function checkWinAndMaybeEnd() {
  const p = currentPlayer();
  if (hasWon(p)) {
    setWinner(game.currentPlayer);
    return true;
  }
  return false;
}

// --- Buttons / flows ---
btnBack.addEventListener("click", () => {
  stopTimer();
  paused = false;
  // Avvia subito la prima domanda (categoria sorteggiata se 'tutte')
  startFirstQuestion();
  saveNow();
});

btnNext.addEventListener("click", () => {
  // Se vince il giocatore corrente, fine
  if (checkWinAndMaybeEnd()) return;

  // Multiplayer: cambia turno e mostra overlay "passa il telefono"
  if (settings.isMulti) {
    const nextIdx = (game.currentPlayer + 1) % game.players.length;
    const nextName = game.players[nextIdx].name;
    overlayTurn.classList.remove("hidden");
    turnText.textContent = `Passa il telefono a ${nextName}.`;
    // Il cambio turno avviene quando chiudi overlay, così è coerente
    saveNow();
  } else {
    // Avvia subito la prima domanda (categoria sorteggiata se 'tutte')
  startFirstQuestion();
    saveNow();
  }
});

btnTurnOk.addEventListener("click", () => {
  overlayTurn.classList.add("hidden");
  nextTurn();
  renderPlayersHud();
  // Avvia subito la prima domanda (categoria sorteggiata se 'tutte')
  startFirstQuestion();
});

btnNewGame.addEventListener("click", () => {
  clearSave();
  showMainMenu();
});

btnRestartSame.addEventListener("click", () => {
  restartSameMatch();
});

// Top menu / pause
btnTopMenu.addEventListener("click", () => {
  // Pausa solo se siamo dentro una partita
  if (!game) return;
  overlayPause.classList.remove("hidden");
  confirmMain.classList.add("hidden");
  pauseGame();
});

btnResume.addEventListener("click", () => {
  overlayPause.classList.add("hidden");
  confirmMain.classList.add("hidden");
  // Se eravamo in domanda, riprende il timer
  resumeGame();
});

btnRestart.addEventListener("click", () => {
  overlayPause.classList.add("hidden");
  confirmMain.classList.add("hidden");
  restartSameMatch();
});

btnToMain.addEventListener("click", () => {
  confirmMain.classList.remove("hidden");
});

btnConfirmMainYes.addEventListener("click", () => {
  overlayPause.classList.add("hidden");
  confirmMain.classList.add("hidden");
  clearSave();
  showMainMenu();
});

btnConfirmMainNo.addEventListener("click", () => {
  confirmMain.classList.add("hidden");
});

// Top reset (riavvia match con stesse impostazioni)
btnResetTop.addEventListener("click", () => {
  restartSameMatch();
});


// Autosave in casi comuni (refresh/chiusura/tab nascosta)
window.addEventListener("beforeunload", () => { saveNow(); });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") saveNow();
});


// Init
initMainMenu();
showMainMenu();
