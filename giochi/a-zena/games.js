// games.js
// Motore del Quiz di Genova. Le domande sono caricate dai file in ./questions/ dentro window.QUIZ_QUESTIONS.

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

const DIFFICULTIES = {
  1: { name: "Foresto", level: "Facile" },
  2: { name: "Zeneize", level: "Medio" },
  3: { name: "Superbo", level: "Difficile" },
};

function getDifficultyInfo(level) {
  return DIFFICULTIES[Number(level)] || DIFFICULTIES[1];
}

const WIN_PER_CAT = 3;

// Colori categoria (UI): scelti per essere leggibili su sfondo scuro.
const CATEGORY_COLORS = {
  storia: "#c8675b",      // terracotta / rosso mattone
  geografia: "#4f9c95",   // petrolio / turchese sobrio
  musica: "#9a6fae",      // prugna
  arte: "#d09a4b",        // ocra
  spettacolo: "#c56f86",  // rosa bordeaux
  scienza: "#78956f",     // verde oliva
  sport: "#d1ad4f",       // oro
  cucina: "#d07b4d",      // arancio bruciato
  dialetto: "#7c8d98",    // ardesia
};

const CATEGORY_BACKGROUNDS = {
  storia: "images/bg-cat-storia.jpg",
  geografia: "images/bg-cat-geografia.jpg",
  musica: "images/bg-cat-musica.jpg",
  arte: "images/bg-cat-arte.jpg",
  spettacolo: "images/bg-cat-spettacolo.jpg",
  scienza: "images/bg-cat-scienza.jpg",
  sport: "images/bg-cat-sport.jpg",
  cucina: "images/bg-cat-cucina.jpg",
  dialetto: "images/bg-cat-dialetto.jpg",
};

function getCatColor(catId) {
  return CATEGORY_COLORS[catId] || "#8d8172";
}

function applyCatPillStyle(el, catId) {
  const col = getCatColor(catId);
  if (!el) return;
  el.style.background = col;
  el.style.borderColor = col;
  el.style.color = "#191714";
}

function applyCatCardStyle(el, catId) {
  const col = getCatColor(catId);
  if (!el) return;
  el.style.borderColor = col;
  el.style.boxShadow = `inset 6px 0 0 ${col}`;
}

function setGameBackdrop(catId = "") {
  const validCatId = (typeof catId === "string" && Object.prototype.hasOwnProperty.call(CATEGORY_BACKGROUNDS, catId))
    ? catId
    : "";

  if (validCatId) {
    document.body.dataset.azenaCat = validCatId;
  } else {
    delete document.body.dataset.azenaCat;
  }
}


const CAT_SET = new Set(CATEGORIES.map(c => c.id));

// --- Persistence (LocalStorage) ---
const SAVE_KEY = "gdg_quiz_save_v2";

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
  if (g.current && g.current.q && (typeof g.current.q._id === "string" || typeof g.current.q._id === "number")) {
    g.current.qId = g.current.q._id;
    delete g.current.q;
  }
  return g;
}

function hydrateGame(g) {
  if (!g) return null;

  // Ricostruisci q dall'id
  if (g.current && (typeof g.current.qId === "string" || typeof g.current.qId === "number")) {
    let qObj = ALL_QUESTIONS.find(q => q._id === g.current.qId);

    // Compatibilita con i salvataggi creati prima dei livelli di difficolta.
    if (!qObj && typeof g.current.qId === "string" && !/^\d+::/.test(g.current.qId)) {
      qObj = ALL_QUESTIONS.find(q => `${q.category}::${q.question.trim()}` === g.current.qId);
    }

    if (qObj) {
      g.current.q = { ...qObj, _id: qObj._id };
    } else {
      g.current = null;
    }
    try { delete g.current.qId; } catch {}
  }
  return g;
}

function makeSavePayload() {
  return {
    v: 3,
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
    if (!data || ![2, 3].includes(data.v)) return null;
    if (!data.settings || !data.game) return null;
    return data;
  } catch {
    return null;
  }
}

function hasValidSave() {
  return !!loadSave();
}


function sanitizeQuestions(raw, level) {
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
      console.warn(`QUIZ: domanda ignorata (livello ${level}, indice ${i}).`, q);
      return;
    }

    out.push({
      ...q,
      _level: Number(level),
      _id: `${level}::${q.category}::${q.question.trim()}`,
    });
  });
  return out;
}

const QUESTIONS_BY_LEVEL = {
  1: sanitizeQuestions(window.QUIZ_LEVELS?.[1], 1),
  2: sanitizeQuestions(window.QUIZ_LEVELS?.[2], 2),
  3: sanitizeQuestions(window.QUIZ_LEVELS?.[3], 3),
};

const ALL_QUESTIONS = [
  ...QUESTIONS_BY_LEVEL[1],
  ...QUESTIONS_BY_LEVEL[2],
  ...QUESTIONS_BY_LEVEL[3],
];

function questionsForLevel(level) {
  return QUESTIONS_BY_LEVEL[Number(level)] || [];
}

function questionCount(level, categoryId) {
  return questionsForLevel(level).filter(q => q.category === categoryId).length;
}

if (ALL_QUESTIONS.length === 0) {
  console.warn("QUIZ: Nessuna domanda caricata. Controlla i file dentro ./questions/level_1, level_2 e level_3.");
}

const $ = (s) => document.querySelector(s);

// Screens
const screenMain = $("#screenMain");
const screenCats = $("#screenCats");
const screenQ = $("#screenQ");
const screenWin = $("#screenWin");

// Top / settings buttons
const btnSettings = $("#btnSettings");
const btnSettingsClose = $("#btnSettingsClose");
const overlaySettings = $("#overlaySettings");
const settingsGameActions = $("#settingsGameActions");
const btnTopMenu = $("#btnTopMenu");
const btnResetTop = $("#btnReset");

// Main menu UI
const multiOptions = $("#multiOptions");
const playerCountSel = $("#playerCount");
const playerNamesBox = $("#playerNames");
const oneCatOptions = $("#oneCatOptions");
const singleCategorySel = $("#singleCategory");
const categoryButtons = Array.from(document.querySelectorAll(".categoryChip"));
const levelAvailability = $("#levelAvailability");
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
const qDifficulty = $("#qDifficulty");
const qPlayer = $("#qPlayer");
const qText = $("#qText");
const qNeed = $("#qNeed");
const qMedia = $("#qMedia");
const qImg = $("#qImg");
const elChoices = $("#choices");
const elFeedback = $("#feedback");
const btnNext = $("#btnNext");
const btnBack = $("#btnBack");
const btnPause = $("#btnPause");
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
let settingsPanelPausedGame = false;

function showOnly(screen) {
  [screenMain, screenCats, screenQ, screenWin].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");

  const isHomeScreen = screen === screenMain;
  // La home ha il proprio panorama; durante il gioco usiamo gli sfondi di categoria.
  document.body.classList.toggle("azena-home", isHomeScreen);
  document.body.classList.toggle("azena-play", !isHomeScreen);

  if (isHomeScreen) setGameBackdrop("");
}

function setTopButtons(inGame) {
  // Le azioni di partita vivono nel pannello Impostazioni.
  btnTopMenu.classList.toggle("hidden", !inGame);
  btnResetTop.classList.toggle("hidden", !inGame);
  if (settingsGameActions) settingsGameActions.classList.toggle("hidden", !inGame);
}

function openSettingsPanel() {
  if (!overlaySettings) return;
  settingsPanelPausedGame = Boolean(game && !paused);
  if (settingsPanelPausedGame) pauseGame();
  overlaySettings.classList.remove("hidden");
  document.body.classList.add("settings-open");
  if (btnSettings) btnSettings.setAttribute("aria-expanded", "true");
  window.requestAnimationFrame(() => btnSettingsClose?.focus());
}

function closeSettingsPanel({ resume = true, restoreFocus = true } = {}) {
  if (!overlaySettings || overlaySettings.classList.contains("hidden")) return;
  overlaySettings.classList.add("hidden");
  document.body.classList.remove("settings-open");
  if (btnSettings) btnSettings.setAttribute("aria-expanded", "false");

  const shouldResume = resume && settingsPanelPausedGame && game;
  settingsPanelPausedGame = false;
  if (shouldResume) resumeGame();
  if (restoreFocus) window.requestAnimationFrame(() => btnSettings?.focus());
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

function readDifficultyFromMenu() {
  const raw = document.querySelector('input[name="difficulty"]:checked')?.value || "1";
  const level = parseInt(raw, 10);
  return DIFFICULTIES[level] ? level : 1;
}

function syncSelectedCategoryChip() {
  const mode = document.querySelector('input[name="modeCats"]:checked')?.value || "all";
  categoryButtons.forEach(btn => {
    btn.classList.toggle("selected", mode === "one" && btn.dataset.category === singleCategorySel.value);
  });
}

function updateSetupAvailability() {
  const level = readDifficultyFromMenu();
  const info = getDifficultyInfo(level);
  const mode = document.querySelector('input[name="modeCats"]:checked')?.value || "all";
  const counts = Object.fromEntries(CATEGORIES.map(c => [c.id, questionCount(level, c.id)]));
  const available = CATEGORIES.filter(c => counts[c.id] > 0);

  if (mode === "one" && (!singleCategorySel.value || counts[singleCategorySel.value] === 0)) {
    singleCategorySel.value = available[0]?.id || CATEGORIES[0].id;
  }

  if (oneCatOptions) {
    oneCatOptions.classList.toggle("is-disabled", mode !== "one");
    oneCatOptions.setAttribute("aria-disabled", mode === "one" ? "false" : "true");
  }

  categoryButtons.forEach(btn => {
    const catId = btn.dataset.category;
    const count = counts[catId] || 0;
    btn.dataset.count = String(count);
    btn.disabled = mode !== "one" || count === 0;
    btn.classList.toggle("unavailable", count === 0);
    btn.title = count > 0 ? `${count} domande disponibili` : "Nessuna domanda disponibile in questo livello";
  });
  syncSelectedCategoryChip();

  const total = questionsForLevel(level).length;
  const missing = CATEGORIES.filter(c => counts[c.id] === 0);
  let canStart = total > 0;
  let notice = "";

  if (total === 0) {
    canStart = false;
    notice = `${info.name} - ${info.level}: questo livello non contiene ancora domande.`;
  } else if (mode === "all" && missing.length > 0) {
    canStart = false;
    notice = `${info.name}: per giocare con tutte le categorie mancano ancora ${missing.length} categorie.`;
  } else if (mode === "one") {
    const selectedCount = counts[singleCategorySel.value] || 0;
    canStart = selectedCount > 0;
    if (!canStart) {
      notice = `${info.name}: scegli una categoria con domande disponibili.`;
    }
  }

  if (levelAvailability) {
    levelAvailability.textContent = notice;
    levelAvailability.hidden = !notice;
    levelAvailability.classList.toggle("warning", !canStart);
  }

  if (btnStart) btnStart.disabled = !canStart;
}

function syncTimerMenuUI() {
  const enabled = !!timerEnabledChk?.checked;
  if (timerSecondsSel) timerSecondsSel.disabled = !enabled;
  const switchText = document.querySelector(".switchText");
  if (switchText) switchText.textContent = enabled ? "Attivo" : "Disattivo";
}

function initMainMenu() {
  // All'avvio A Zena si apre sulla home: attiva subito il relativo sfondo.
  document.body.classList.add("azena-home");
  singleCategorySel.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join("");
  singleCategorySel.value = CATEGORIES[0].id;
  buildNamesInputs(parseInt(playerCountSel.value, 10));

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

  document.querySelectorAll('input[name="difficulty"]').forEach(r => {
    r.addEventListener("change", updateSetupAvailability);
  });

  document.querySelectorAll('input[name="modeCats"]').forEach(r => {
    r.addEventListener("change", updateSetupAvailability);
  });

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      singleCategorySel.value = btn.dataset.category || CATEGORIES[0].id;
      syncSelectedCategoryChip();
      updateSetupAvailability();
    });
  });

  if (timerEnabledChk) timerEnabledChk.addEventListener("change", syncTimerMenuUI);
  syncTimerMenuUI();
  updateSetupAvailability();

  let btnContinue = $("#btnContinue");
  if (!btnContinue) {
    btnContinue = document.createElement("button");
    btnContinue.type = "button";
    btnContinue.id = "btnContinue";
    btnContinue.className = "ghost continueCta";
    btnContinue.textContent = "Continua partita";
    const row = btnStart?.parentElement;
    if (row) row.appendChild(btnContinue);
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
      settings.difficulty = Number(settings.difficulty) || 1;
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
          : "Ora puoi vantarti con chiunque. Sì, anche se nessuno te l'ha chiesto.";
        renderLeaderboard();
        stopTimer();
        paused = false;
        setTopButtons(true);
        saveNow();
        refreshContinueButton();
        return;
      }

      if (target === "q") {
        if (game?.current?.q) restoreQuestionUIFromSave(data);
        else startFirstQuestion();
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
      console.warn("QUIZ: ripristino fallito", e);
      clearSave();
      showMainMenu();
      setTopButtons(false);
      refreshContinueButton();
    }
  });

  refreshContinueButton();
  btnStart.addEventListener("click", startNewMatchFromMenu);
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
  const { isMulti, names } = readPlayersFromMenu();
  const cats = readCategoriesFromMenu();
  const t = readTimerFromMenu();
  const difficulty = readDifficultyFromMenu();
  const pool = questionsForLevel(difficulty);

  if (pool.length === 0) {
    alert("Questo livello non contiene ancora domande.");
    return;
  }

  if (cats.mode === "all") {
    const missing = CATEGORIES.filter(c => questionCount(difficulty, c.id) === 0);
    if (missing.length > 0) {
      alert("Per giocare con tutte le categorie, ogni categoria deve avere almeno una domanda in questo livello.");
      return;
    }
  } else if (questionCount(difficulty, cats.active[0]) === 0) {
    alert("La categoria scelta non contiene ancora domande in questo livello.");
    return;
  }

  clearSave();
  settings = {
    isMulti,
    players: names,
    difficulty,
    categoriesMode: cats.mode,
    activeCategories: cats.active,
    timerEnabled: t.enabled,
    timerSeconds: t.seconds,
  };

  game = makeGame(settings);
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
  closeSettingsPanel({ resume: false, restoreFocus: false });
  stopTimer();
  paused = false;
  settings = null;
  game = null;
  setTopButtons(false);
  showOnly(screenMain);
  updateTimerVisibility();
  renderQuestionMedia(null);
  updateSetupAvailability();
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
  const diff = getDifficultyInfo(settings.difficulty);
  hudMode.textContent = settings.categoriesMode === "all"
    ? `${diff.name} \u00b7 Obiettivo: ${WIN_PER_CAT} corrette per categoria`
    : `${diff.name} \u00b7 Obiettivo: ${WIN_PER_CAT} corrette in 1 categoria`;
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
    setGameBackdrop(catId);
    catsTitle.textContent = `Categoria: ${catLabel}`;
    catsSub.textContent = `Completa ${WIN_PER_CAT} risposte corrette per vincere.`;
  } else {
    setGameBackdrop(game?.current?.categoryId || "");
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
  const pool = questionsForLevel(settings?.difficulty || 1).filter(q => q.category === categoryId);

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
    alert("Non ci sono domande per questa categoria. Aggiungile nel relativo file dentro ./questions/.");
    return;
  }

  game.current = { categoryId, q };
  setGameBackdrop(categoryId);

  const catLabel = CATEGORIES.find(c => c.id === categoryId)?.label ?? categoryId;
  const p = currentPlayer();

  qCat.textContent = catLabel;
  applyCatPillStyle(qCat, categoryId);
  if (qDifficulty) qDifficulty.textContent = getDifficultyInfo(settings?.difficulty).name;
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
  setGameBackdrop(categoryId);
  const catLabel = CATEGORIES.find(c => c.id === categoryId)?.label ?? categoryId;
  const p = currentPlayer();

  qCat.textContent = catLabel;
  applyCatPillStyle(qCat, categoryId);
  if (qDifficulty) qDifficulty.textContent = getDifficultyInfo(settings?.difficulty).name;
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
    <div style="border:1px solid rgba(226,214,194,.16); border-radius:12px; overflow:hidden;">
      <div style="padding:10px 12px; background:rgba(24,22,20,.82); border-bottom:1px solid rgba(226,214,194,.16); display:flex; justify-content:space-between; gap:10px; align-items:center;">
        <b>Classifica</b>
        <span class="muted" style="font-size:12px;">Categorie: ${rows[0]?.catsCount ?? 0} · Target: ${WIN_PER_CAT}/cat</span>
      </div>
      ${rows.map((r, pos) => {
        const isWinner = (r.idx === game.winnerIndex);
        const medal = pos === 0 ? "🥇" : pos === 1 ? "🥈" : pos === 2 ? "🥉" : `${pos + 1}`;
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:10px 12px; border-bottom:1px solid rgba(226,214,194,.16); ${isWinner ? "background:rgba(209,161,94,.07);" : ""}">
            <div style="display:flex; gap:10px; align-items:center; min-width:0;">
              <div style="width:34px; height:34px; border-radius:12px; border:1px solid rgba(226,214,194,.16); background:rgba(24,22,20,.82); display:flex; align-items:center; justify-content:center; font-variant-numeric: tabular-nums;">
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

// Impostazioni / guida
btnSettings?.addEventListener("click", openSettingsPanel);
btnSettingsClose?.addEventListener("click", () => closeSettingsPanel());
overlaySettings?.addEventListener("click", (event) => {
  if (event.target === overlaySettings) closeSettingsPanel();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlaySettings && !overlaySettings.classList.contains("hidden")) {
    closeSettingsPanel();
  }
});

// Menu partita / pausa
function openPauseMenu() {
  // Pausa solo se siamo dentro una partita.
  if (!game) return;
  closeSettingsPanel({ resume: false, restoreFocus: false });
  overlayPause.classList.remove("hidden");
  confirmMain.classList.add("hidden");
  pauseGame();
}

btnTopMenu.addEventListener("click", openPauseMenu);
btnPause?.addEventListener("click", openPauseMenu);

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
  closeSettingsPanel({ resume: false, restoreFocus: false });
  paused = false;
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
