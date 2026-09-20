// questions.js
// Registro centrale delle domande di A Zena, suddivise per livello.
// I file di categoria continuano a usare window.QUIZ_QUESTIONS.push(...).
// index.html collega temporaneamente QUIZ_QUESTIONS all'array del livello
// che sta caricando, cosi non serve duplicare logica nei singoli file.

window.QUIZ_LEVELS = {
  1: [],
  2: [],
  3: [],
};

// Compatibilita con i file di categoria e con eventuale codice precedente.
window.QUIZ_QUESTIONS = window.QUIZ_LEVELS[1];
