/* ── PARTICLES ──────────────────────────────────────────── */
(function () {
  const c = document.getElementById("pts");
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "p";
    const x = Math.random() * 100;
    const dur = 6 + Math.random() * 14;
    const delay = -Math.random() * 20;
    const color = Math.random() > 0.5 ? "#ff2cf5" : "#00ffe7";
    p.style.cssText = `left:${x}%;background:${color};
      box-shadow:0 0 4px ${color};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      width:${1 + Math.random() * 3}px;
      height:${1 + Math.random() * 3}px;`;
    c.appendChild(p);
  }
})();

/* ── THEME TOGGLE ───────────────────────────────────────── */
const html = document.documentElement;
let dark = true;
document.getElementById("themeBtn").addEventListener("click", () => {
  dark = !dark;
  html.setAttribute("data-theme", dark ? "dark" : "light");
  document.getElementById("themeBtn").textContent = dark ? "☀️" : "🌙";
  // update particle colors in light
  document.querySelectorAll(".p").forEach((p) => {
    const c = !dark
      ? Math.random() > 0.5
        ? "#cc00cc"
        : "#009999"
      : Math.random() > 0.5
        ? "#ff2cf5"
        : "#00ffe7";
    p.style.background = c;
    p.style.boxShadow = `0 0 4px ${c}`;
  });
});

/* ── SOUND (Web Audio) ──────────────────────────────────── */
let soundOn = false;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx;
function initAudio() {
  if (!ctx && AudioCtx) ctx = new AudioCtx();
}
function beep(freq, type = "sine", vol = 0.18, dur = 0.12) {
  if (!soundOn || !ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g);
  g.connect(ctx.destination);
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  o.start();
  o.stop(ctx.currentTime + dur);
}
document.getElementById("soundBtn").addEventListener("click", () => {
  initAudio();
  soundOn = !soundOn;
  document.getElementById("soundBtn").textContent = soundOn ? "🔊" : "🔇";
});

/* ── GAME STATE ─────────────────────────────────────────── */
const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let board, turn, over, mode, scores, diff, roundCount;

function init() {
  board = Array(9).fill(null);
  roundCount = (roundCount || 0) + 1;
  turn = roundCount % 2 === 1 ? "X" : "O";
  over = false;
  scores = scores || { X: 0, O: 0 };
  mode = mode || "bot";
  diff = diff || "hard";
  render();
  setStatus();
  document.getElementById("thinking").classList.remove("show");
  // if bot mode and O goes first this round, kick off bot after a short delay
  if (mode === "bot" && turn === "O") {
    setTimeout(() => {
      document.getElementById("thinking").classList.add("show");
      setTimeout(botPlay, 600);
    }, 400);
  }
}

/* ── DIFFICULTY ─────────────────────────────────────────── */
function setDiff(d) {
  diff = d;
  document.getElementById("dEasy").className =
    "diff-btn" + (d === "easy" ? " on-easy" : "");
  document.getElementById("dMed").className =
    "diff-btn" + (d === "med" ? " on-med" : "");
  document.getElementById("dHard").className =
    "diff-btn" + (d === "hard" ? " on-hard" : "");
  // don't reset game — difficulty applies to next moves immediately
}

/* ── MODE ───────────────────────────────────────────────── */
function setMode(m) {
  mode = m;
  document.getElementById("tabBot").classList.toggle("on", m === "bot");
  document.getElementById("tabPvp").classList.toggle("on", m === "pvp");
  document.getElementById("nameO").textContent =
    m === "bot" ? "BOT O" : "PLAYER O";
  document.getElementById("diffRow").classList.toggle("hidden", m !== "bot");
  scores = { X: 0, O: 0 };
  roundCount = 0;
  document.getElementById("numX").textContent = "0";
  document.getElementById("numO").textContent = "0";
  init();
}

/* ── RENDER ─────────────────────────────────────────────── */
function render() {
  document.querySelectorAll(".cell").forEach((el, i) => {
    el.textContent = board[i] || "";
    el.className =
      "cell" + (board[i] ? " " + board[i].toLowerCase() + " locked" : "");
  });
  // score active border
  document.getElementById("boxX").className =
    "score-box" + (!over && turn === "X" ? " active-x" : "");
  document.getElementById("boxO").className =
    "score-box" + (!over && turn === "O" ? " active-o" : "");
}

/* ── STATUS ─────────────────────────────────────────────── */
function setStatus(msg, cls) {
  const el = document.getElementById("status");
  if (msg) {
    el.textContent = msg;
    el.className = "status-line " + cls;
    return;
  }
  const who = turn === "X" ? "X" : mode === "bot" ? "BOT" : "O";
  el.textContent = `${who}'S TURN`;
  el.className = "status-line s" + turn.toLowerCase();
}

/* ── CLICK ──────────────────────────────────────────────── */
document.getElementById("board").addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell || over) return;
  const i = +cell.dataset.i;
  if (board[i]) return;
  if (mode === "bot" && turn === "O") return;
  play(i);
  if (!over && mode === "bot" && turn === "O") {
    document.getElementById("thinking").classList.add("show");
    setTimeout(botPlay, 420);
  }
});

function play(i) {
  board[i] = turn;
  beep(turn === "X" ? 660 : 440, "triangle");
  render();
  const win = checkWin();
  if (win) {
    endGame(win);
    return;
  }
  if (board.every(Boolean)) {
    endGame(null);
    return;
  }
  turn = turn === "X" ? "O" : "X";
  setStatus();
}

/* ── BOT ────────────────────────────────────────────────── */
function botPlay() {
  document.getElementById("thinking").classList.remove("show");
  if (over) return;
  play(bestMove());
}

function bestMove() {
  const empty = board.map((v, i) => (v ? null : i)).filter((i) => i !== null);

  // EASY — pure random
  if (diff === "easy") {
    return empty[Math.floor(Math.random() * empty.length)];
  }

  // MEDIUM — 60% smart, 40% random (can be beaten)
  if (diff === "med") {
    if (Math.random() < 0.4)
      return empty[Math.floor(Math.random() * empty.length)];
    // also only look 2 moves deep so it misses long chains
    return bestMoveDepth(2);
  }

  // HARD — full minimax, unbeatable
  return bestMoveDepth(10);
}

function bestMoveDepth(maxDepth) {
  let best = -Infinity,
    idx = board.findIndex((v) => !v);
  board.forEach((_, i) => {
    if (board[i]) return;
    board[i] = "O";
    const s = minimax(0, false, maxDepth);
    board[i] = null;
    if (s > best) {
      best = s;
      idx = i;
    }
  });
  return idx;
}
function minimax(d, isMax, maxDepth) {
  const w = checkWin();
  if (w) {
    const p = board[w[0]];
    return p === "O" ? 10 - d : d - 10;
  }
  if (board.every(Boolean)) return 0;
  if (d >= maxDepth) return 0;
  if (isMax) {
    let b = -Infinity;
    board.forEach((_, i) => {
      if (!board[i]) {
        board[i] = "O";
        b = Math.max(b, minimax(d + 1, false, maxDepth));
        board[i] = null;
      }
    });
    return b;
  } else {
    let b = Infinity;
    board.forEach((_, i) => {
      if (!board[i]) {
        board[i] = "X";
        b = Math.min(b, minimax(d + 1, true, maxDepth));
        board[i] = null;
      }
    });
    return b;
  }
}

/* ── WIN CHECK ──────────────────────────────────────────── */
function checkWin() {
  for (const [a, b, c] of LINES)
    if (board[a] && board[a] === board[b] && board[b] === board[c])
      return [a, b, c];
  return null;
}

/* ── END ────────────────────────────────────────────────── */
function endGame(winLine) {
  over = true;
  document.getElementById("thinking").classList.remove("show");
  if (winLine) {
    winLine.forEach((i) => {
      const c = document.querySelectorAll(".cell")[i];
      c.classList.add("win");
    });
    const winner = board[winLine[0]];
    scores[winner]++;
    document.getElementById("numX").textContent = scores.X;
    document.getElementById("numO").textContent = scores.O;
    const who =
      winner === "X" ? "PLAYER X" : mode === "bot" ? "BOT O" : "PLAYER O";
    setStatus(`${who} WINS! 🏆`, "sw");
    beep(880, "square", 0.2, 0.3);
    setTimeout(() => beep(1100, "square", 0.15, 0.2), 180);
    // show modal after brief delay so player sees the board
    setTimeout(() => showModal(winner, who), 1200);
  } else {
    setStatus("DRAW — WELL PLAYED!", "sd");
    beep(220, "sawtooth", 0.1, 0.4);
    setTimeout(() => showModal(null, null), 1000);
  }
}

/* ── MODAL ──────────────────────────────────────────────── */
function showModal(winner, who) {
  const icon = document.getElementById("modalIcon");
  const title = document.getElementById("modalTitle");
  const sub = document.getElementById("modalSub");
  if (winner) {
    icon.textContent = winner === "X" ? "✕" : "○";
    title.textContent = `${who} WINS!`;
    title.className = `modal-title win-${winner.toLowerCase()}`;
    const streak = scores[winner];
    sub.textContent =
      streak >= 3
        ? `${streak} IN A ROW! ON FIRE! 🔥`
        : `SCORE: X ${scores.X} — O ${scores.O}`;
  } else {
    icon.textContent = "🤝";
    title.textContent = "IT'S A DRAW!";
    title.className = "modal-title draw";
    sub.textContent = "Nobody wins this time…";
  }
  document.getElementById("modalBackdrop").classList.add("show");
}

function hideModal() {
  document.getElementById("modalBackdrop").classList.remove("show");
}

function modalPlayAgain() {
  beep(330, "sine", 0.1, 0.1);
  hideModal();
  setTimeout(init, 120);
}

function modalResetAll() {
  beep(220, "sine", 0.1, 0.15);
  hideModal();
  scores = { X: 0, O: 0 };
  roundCount = 0;
  document.getElementById("numX").textContent = "0";
  document.getElementById("numO").textContent = "0";
  setTimeout(init, 120);
}

/* ── RESET ──────────────────────────────────────────────── */
function resetRound() {
  beep(330, "sine", 0.1, 0.1);
  hideModal();
  init();
}

/* ── START ──────────────────────────────────────────────── */
setDiff("hard");
roundCount = 0;
init();
// if bot goes first on round 1 (won't happen since round 1 = X, but future-proof)
if (mode === "bot" && turn === "O") {
  setTimeout(() => {
    document.getElementById("thinking").classList.add("show");
    setTimeout(botPlay, 500);
  }, 300);
}
