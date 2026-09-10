/* FLOW - Ambient Focus Timer - Vanilla JS */
(function () {
  "use strict";

  var timeDisplay = document.getElementById("timeDisplay");
  var timeNote = document.getElementById("timeNote");
  var ariaStatus = document.getElementById("ariaStatus");
  var ringProgress = document.getElementById("ringProgress");
  var startBtn = document.getElementById("startBtn");
  var resetBtn = document.getElementById("resetBtn");
  var flowLine = document.getElementById("flowLine");
  var sessionLabel = document.getElementById("sessionLabel");
  var weekLabel = document.getElementById("weekLabel");
  var weekTotal = document.getElementById("weekTotal");
  var weekBars = document.getElementById("weekBars");
  var customMin = document.getElementById("customMin");
  var presetBtns = Array.prototype.slice.call(document.querySelectorAll(".preset[data-min]"));

  var TOTAL = 25 * 60;
  var remaining = TOTAL;
  var running = false;
  var timerId = null;
  var endAt = null;
  var kind = "Focus session";

  var RING_LENGTH = 2 * Math.PI * 120;

  var canvas = document.getElementById("embers");
  var ctx = canvas.getContext("2d");
  var embers = [];
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function seedEmbers() {
    var count = window.innerWidth < 600 ? 26 : 44;
    embers = [];
    for (var i = 0; i < count; i++) {
      embers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: rand(0.6, 2.2),
        vx: rand(-0.08, 0.08),
        vy: rand(-0.14, -0.45),
        hue: rand(8, 26),
        a: rand(0.06, 0.4),
        pulse: rand(0.004, 0.02)
      });
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    seedEmbers();
  }

  function drawEmbers() {
    if (REDUCED) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < embers.length; i++) {
      var e = embers[i];
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, " + (94 - Math.abs(20 - e.hue)) + ", 58," + e.a + ")";
      ctx.fill();
      e.y += e.vy;
      e.x += e.vx;
      if (e.x < -4) { e.x = canvas.width + 4; }
      if (e.y < -4) { e.y = canvas.height + 4; e.x = Math.random() * canvas.width; }
      if (Math.random() < 0.02) {
 e.x += e.vx;
 e.y += e.vy;
 }
    }
    requestAnimationFrame(drawEmbers);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  drawEmbers();

  function fmt(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function setRing(frac) {
    ringProgress.style.strokeDashoffset = (RING_LENGTH * (1 - frac)) + "px";
  }

  function setTone(runningNow) {
    if (runningNow) {
      timeNote.textContent = "in flow";
      flowLine.textContent = "stay with it - the timer tracks itself";
      startBtn.textContent = "Pause";
    } else {
      timeNote.textContent = "ready";
      flowLine.textContent = "Pick a length and press start";
      startBtn.textContent = "Start";
    }
  }

  function render(state) {
    if (state === "running" || state === "paused") {
      timeDisplay.textContent = fmt(remaining);
      setRing(remaining / TOTAL);
      ariaStatus.textContent = fmt(remaining) + " remaining";
    } else {
      timeDisplay.textContent = fmt(TOTAL);
      setRing(1);
      ariaStatus.textContent = "";
    }
  }

  function setKind(nextKind) {
    kind = nextKind;
 sessionLabel.textContent = kind;
 document.title = kind + " - FLOW";
  }

  function complete() {
    running = false;
    timerId = null;
    remaining = TOTAL;
    completedMin = Math.round(TOTAL / 60);
    recordFocus(completedMin);
    render("idle");
    setTone(false);
    sessionLabel.textContent = kind + " - done";
    ariaStatus.textContent = "Session complete - great work";
    chime();
    pulseCard();
  }
function pulseCard() {
    var card = document.querySelector(".timer-card");
    card.classList.remove("pulse");
    void card.offsetWidth;
    card.classList.add("pulse");
  }

  function chime() {
    try {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var notes = [523.25, 659.25, 783.99];
      var t = audioCtx.currentTime +  0.05;
      for (var i =  0; i < notes.length; i++) {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.frequency.value = notes[i];
        osc.type = "sine";
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.18, t +0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t +0.9);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.95);
        t = t + 0.22;
      }
    } catch (err) {
      /* no audio available */
    }
  }

  var KEY = "flow-focus-log-v1";

  function getLog() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {}
    return {};
  }

  function saveLog(log) {
    try {
      localStorage.setItem(KEY, JSON.stringify(log));
    } catch (err) {}
  }

  function isoDay(offset) {
    var d = new Date();
    d.setDate(d.getDate() - offset);
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function recordFocus(minutes) {
    var log = getLog();
    var key = isoDay(0);
    log[key] = (log[key] || 0) + minutes;
    saveLog(log);
    renderStats();
  }

  function renderStats() {
    var days = [];
    var labels = ["S", "M", "T", "W", "T", "F", "S"];
    for (var offset =  6; offset >= 0; offset--) {
      var key = isoDay(offset);
      var value = getLog()[key] || 0;
      var pad = String(new Date(key + "T00:00:00").getDay());
      days.push({ key: key, value: value, label: labels[Number(pad)], isToday: offset === 0 });
    }

    var total = days.reduce(function (sum, d) { return sum + d.value; }, 0);
    weekTotal.textContent = total + " min focused";
    weekLabel.textContent = "This week - " + new Date().toLocaleDateString(undefined, { month: "long" });

    weekBars.innerHTML = "";

    var max = 1;
    days.forEach(function (d) { if (d.value > max) max = d.value; });

    days.forEach(function (d) {
      var bar = document.createElement("div");
      bar.className = "bar" + (d.isToday ? " is-today" : "");
      var fill = document.createElement("div");
      fill.className = "bar-fill";
      fill.style.height = (d.value / max * 100) + "%";
      var label = document.createElement("span");
      label.className = "bar-label";
      label.textContent = d.label;
      bar.appendChild(fill);
      bar.appendChild(label);
      weekBars.appendChild(bar);
    });
  }

  function setPreset(minutes) {
    var prev = TOTAL;
    TOTAL = minutes * 60;
    remaining = TOTAL;
    setKind("Focus session");

    presetBtns.forEach(function (btn) {
      btn.classList.toggle("is-active", Number(btn.getAttribute("data-min")) === minutes);
    });

    render("idle");
    setTone(false);
  }

  function stopTimer() {
    running = false;
    if (timerId) clearInterval(timerId);
    timerId = null;
    endAt = null;
  }

  function tick() {
    var now = Date.now();
    if (endAt && now >= endAt) {
      remaining =  0;
      complete();
      return;
    }
    if (endAt) remaining = Math.max(0, Math.round((endAt - now)) / 1000);
    render("running");
  }

  function toggle() {
    if (running) {
      stopTimer();
      remaining = Math.max(0, Math.round((endAt - Date.now())) / 1000);
      render("paused");
      setTone(false);
      return;
    }

    if (remaining <=  0) remaining = TOTAL;
    running = true;
    endAt = Date.now() + remaining * 1000;
    render("running");
    setTone(true);
    timerId = setInterval(tick, 250);

    if (remaining === TOTAL) {
      setKind(kind);
    }
  }

  function reset() {
    stopTimer();
    remaining = TOTAL;
    render("idle");
    setTone(false);
    sessionLabel.textContent = kind;
  }

  startBtn.addEventListener("click", toggle);
  resetBtn.addEventListener("click", reset);

  presetBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setPreset(Number(btn.getAttribute("data-min")));
    });
  });

  customMin.addEventListener("input", function () {
    var v = Math.max(1, Math.min(120, Number(customMin.value) || 25));
    customMin.value = v;
  });

  customMin.addEventListener("blur", function () {
    var v = Math.max(1, Math.min(120, Number(customMin.value) || 25));
    customMin.value = v;
    setPreset(v);
  });

  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && e.target === document.body) {
      e.preventDefault();
      toggle();
    }
  });

  render("idle");
  setTone(false);
  renderStats();
})();