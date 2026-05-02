// ─────────────────────────────────────────────────────────────────
//  STRING TUNER  ·  ST-440
//  Pitch detection via NSDF autocorrelation + temporal smoothing
// ─────────────────────────────────────────────────────────────────

// ── INSTRUMENT DATA ───────────────────────────────────────────────

const INSTRUMENTS = {
  guitar: {
    label: 'GUITAR',
    tunings: {
      'Standard (EADGBe)': [
        { name: 'E2', freq: 82.41,  label: '① E2' },
        { name: 'A2', freq: 110.00, label: '② A2' },
        { name: 'D3', freq: 146.83, label: '③ D3' },
        { name: 'G3', freq: 196.00, label: '④ G3' },
        { name: 'B3', freq: 246.94, label: '⑤ B3' },
        { name: 'E4', freq: 329.63, label: '⑥ E4' },
      ],
      'Drop D (DADGBe)': [
        { name: 'D2', freq: 73.42,  label: '① D2' },
        { name: 'A2', freq: 110.00, label: '② A2' },
        { name: 'D3', freq: 146.83, label: '③ D3' },
        { name: 'G3', freq: 196.00, label: '④ G3' },
        { name: 'B3', freq: 246.94, label: '⑤ B3' },
        { name: 'E4', freq: 329.63, label: '⑥ E4' },
      ],
      'Open G (DGDGBd)': [
        { name: 'D2', freq: 73.42,  label: '① D2' },
        { name: 'G2', freq: 98.00,  label: '② G2' },
        { name: 'D3', freq: 146.83, label: '③ D3' },
        { name: 'G3', freq: 196.00, label: '④ G3' },
        { name: 'B3', freq: 246.94, label: '⑤ B3' },
        { name: 'D4', freq: 293.66, label: '⑥ D4' },
      ],
      'Open D (DADf#Ad)': [
        { name: 'D2', freq: 73.42,  label: '① D2' },
        { name: 'A2', freq: 110.00, label: '② A2' },
        { name: 'D3', freq: 146.83, label: '③ D3' },
        { name: 'F#3',freq: 185.00, label: '④ F#3' },
        { name: 'A3', freq: 220.00, label: '⑤ A3' },
        { name: 'D4', freq: 293.66, label: '⑥ D4' },
      ],
      'Piano Ref': [
        { name: 'E',  freq: 160.5,  label: '① E' },
        { name: 'A',  freq: 215.0,  label: '② A' },
        { name: 'D',  freq: 286.3,  label: '③ D' },
        { name: 'G',  freq: 381.4,  label: '④ G' },
        { name: 'B',  freq: 481.1,  label: '⑤ B' },
        { name: 'e',  freq: 641.4,  label: '⑥ e' },
      ],
    }
  },
  ukulele: {
    label: 'UKULELE',
    tunings: {
      'Standard (GCEA)': [
        { name: 'G4', freq: 392.00, label: '① G4' },
        { name: 'C4', freq: 261.63, label: '② C4' },
        { name: 'E4', freq: 329.63, label: '③ E4' },
        { name: 'A4', freq: 440.00, label: '④ A4' },
      ],
      'Low-G (gCEA)': [
        { name: 'G3', freq: 196.00, label: '① G3' },
        { name: 'C4', freq: 261.63, label: '② C4' },
        { name: 'E4', freq: 329.63, label: '③ E4' },
        { name: 'A4', freq: 440.00, label: '④ A4' },
      ],
      'D-tuning (ADF#B)': [
        { name: 'A4', freq: 440.00, label: '① A4' },
        { name: 'D4', freq: 293.66, label: '② D4' },
        { name: 'F#4',freq: 369.99, label: '③ F#4' },
        { name: 'B4', freq: 493.88, label: '④ B4' },
      ],
      'Piano Ref': [
        { name: 'G',  freq: 381.4,  label: '① G' },
        { name: 'C',  freq: 256.4,  label: '② C' },
        { name: 'E',  freq: 312.2,  label: '③ E' },
        { name: 'A',  freq: 430.9,  label: '④ A' },
      ],
    }
  }
}

// ── STATE ─────────────────────────────────────────────────────────

const SMOOTH_WINDOW   = 6     // median window size (frames)
const NO_SIGNAL_GRACE = 10    // frames before clearing display

let state = {
  instrument: 'guitar',
  tuning: 'Standard (EADGBe)',
  selectedString: null,
  listening: false,
  audioCtx: null,
  analyser: null,
  stream: null,
  animFrame: null,
  freqHistory: [],
  smoothedFreq: null,
  noSignalFrames: 0,
}

// ── NOTE MATH ─────────────────────────────────────────────────────

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

function freqToNoteInfo(freq) {
  if (!freq || freq < 20) return null
  const semitones = 12 * Math.log2(freq / 440) + 57
  const midi = Math.round(semitones)
  const noteName = NOTE_NAMES[((midi % 12) + 12) % 12]
  const octave = Math.floor(midi / 12) - 1
  const targetFreq = 440 * Math.pow(2, (midi - 69) / 12)
  const cents = 1200 * Math.log2(freq / targetFreq)
  return { noteName, octave, cents, midi, targetFreq }
}

function findClosestString(freq, strings) {
  if (!freq) return null
  let best = null, bestCents = Infinity
  for (const s of strings) {
    const cents = Math.abs(1200 * Math.log2(freq / s.freq))
    if (cents < bestCents) { bestCents = cents; best = s }
  }
  return bestCents < 250 ? best : null
}

function medianFreq(history) {
  if (!history.length) return null
  const sorted = [...history].sort((a, b) => a - b)
  const m = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[m] : (sorted[m-1] + sorted[m]) / 2
}

// ── PITCH DETECTOR (NSDF) ─────────────────────────────────────────

function detectPitch(buf, sampleRate) {
  const SIZE = buf.length
  const HALF = Math.floor(SIZE / 2)

  let rms = 0
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i]
  rms = Math.sqrt(rms / SIZE)
  if (rms < 0.004) return { freq: null, clarity: 0, rms }

  // Normalized Square Difference Function
  const nsdf = new Float32Array(HALF)
  for (let lag = 0; lag < HALF; lag++) {
    let ac = 0, norm = 0
    for (let i = 0; i < HALF; i++) {
      ac   += buf[i] * buf[i + lag]
      norm += buf[i] * buf[i] + buf[i + lag] * buf[i + lag]
    }
    nsdf[lag] = norm > 0 ? 2 * ac / norm : 0
  }

  // Find peaks after initial lobe
  let i = 1
  while (i < HALF - 1 && nsdf[i] > 0) i++   // skip lag-0 lobe
  while (i < HALF - 1 && nsdf[i] <= 0) i++   // cross zero upward

  let bestPeak = -1, bestVal = -Infinity
  while (i < HALF - 1) {
    if (nsdf[i] > nsdf[i-1] && nsdf[i] >= nsdf[i+1] && nsdf[i] > bestVal) {
      bestVal = nsdf[i]
      bestPeak = i
    }
    i++
  }

  if (bestPeak < 1 || bestVal < 0.80) return { freq: null, clarity: bestVal, rms }

  // Parabolic interpolation for sub-sample precision
  const y1 = nsdf[bestPeak - 1], y2 = nsdf[bestPeak], y3 = nsdf[bestPeak + 1] ?? y2
  const denom = 2 * y2 - y1 - y3
  const refined = denom !== 0 ? bestPeak + (y3 - y1) / (2 * denom) : bestPeak

  const freq = sampleRate / refined
  if (freq < 55 || freq > 1400) return { freq: null, clarity: bestVal, rms }

  return { freq, clarity: bestVal, rms }
}

// ── AUDIO ─────────────────────────────────────────────────────────

async function startListening() {
  try {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 })
    state.stream = await navigator.mediaDevices.getUserMedia({ audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
      channelCount: 1,
    }})
    const source = state.audioCtx.createMediaStreamSource(state.stream)
    state.analyser = state.audioCtx.createAnalyser()
    state.analyser.fftSize = 8192   // larger = better bass resolution
    state.analyser.smoothingTimeConstant = 0
    source.connect(state.analyser)
    state.listening = true
    state.freqHistory = []
    state.smoothedFreq = null
    state.noSignalFrames = 0
    updateMicUI()
    loop()
  } catch (err) {
    console.error('Mic error:', err)
    setStatus('MIC ACCESS DENIED')
  }
}

function stopListening() {
  if (state.animFrame) cancelAnimationFrame(state.animFrame)
  if (state.stream) state.stream.getTracks().forEach(t => t.stop())
  if (state.audioCtx) state.audioCtx.close()
  Object.assign(state, { listening: false, audioCtx: null, analyser: null,
    stream: null, freqHistory: [], smoothedFreq: null })
  updateMicUI()
  resetDisplay()
}

// ── MAIN LOOP ─────────────────────────────────────────────────────

function loop() {
  state.animFrame = requestAnimationFrame(loop)
  const buf = new Float32Array(state.analyser.fftSize)
  state.analyser.getFloatTimeDomainData(buf)

  const { freq, rms } = detectPitch(buf, state.audioCtx.sampleRate)

  document.getElementById('signalBar').style.width = Math.min(100, rms * 600) + '%'

  if (!freq) {
    state.noSignalFrames++
    if (state.noSignalFrames > NO_SIGNAL_GRACE) {
      state.freqHistory = []
      state.smoothedFreq = null
      setStatus('— NO SIGNAL —')
    }
    return
  }
  state.noSignalFrames = 0

  // Reset history if pitch jumps more than 4 semitones (400 cents) = new note
  if (state.smoothedFreq) {
    const jump = Math.abs(1200 * Math.log2(freq / state.smoothedFreq))
    if (jump > 400) state.freqHistory = []
  }

  state.freqHistory.push(freq)
  if (state.freqHistory.length > SMOOTH_WINDOW) state.freqHistory.shift()

  const smoothFreq = medianFreq(state.freqHistory)
  state.smoothedFreq = smoothFreq

  document.getElementById('freqValue').textContent = smoothFreq.toFixed(1)

  const noteInfo = freqToNoteInfo(smoothFreq)
  if (!noteInfo) return

  document.getElementById('noteName').textContent = noteInfo.noteName
  document.getElementById('noteOctave').textContent = noteInfo.octave

  const strings = currentStrings()
  const targetString = state.selectedString
    ? strings.find(s => s.name === state.selectedString)
    : findClosestString(smoothFreq, strings)

  if (targetString) {
    updateMeter(1200 * Math.log2(smoothFreq / targetString.freq))
    updateAutoHighlight(targetString)
  } else {
    updateMeter(noteInfo.cents)
    updateAutoHighlight(null)
  }
}

// ── DISPLAY ───────────────────────────────────────────────────────

function updateMeter(cents) {
  const clamped = Math.max(-50, Math.min(50, cents))
  const pct = 50 + (clamped / 50) * 50
  const needle = document.getElementById('meterNeedle')
  needle.style.left = pct + '%'

  const inTune = Math.abs(cents) < 5
  needle.classList.toggle('in-tune', inTune)

  document.getElementById('arrowFlat').classList.toggle('active', cents < -5)
  document.getElementById('feedbackOk').classList.toggle('active', inTune)
  document.getElementById('arrowSharp').classList.toggle('active', cents > 5)

  if (inTune)         setStatus('✓  IN TUNE')
  else if (cents < -5) setStatus(`${Math.abs(cents).toFixed(0)}¢ FLAT — TIGHTEN`)
  else                 setStatus(`${cents.toFixed(0)}¢ SHARP — LOOSEN`)
}

function updateAutoHighlight(targetString) {
  document.querySelectorAll('.string-btn').forEach(btn => {
    btn.classList.toggle('active',
      !state.selectedString && !!targetString && btn.dataset.stringName === targetString.name)
  })
  const label = document.getElementById('autoDetectLabel')
  label.textContent = (!state.selectedString && targetString)
    ? 'AUTO · ' + targetString.label
    : 'AUTO DETECT'
}

function setStatus(msg) { document.getElementById('meterStatus').textContent = msg }

function resetDisplay() {
  document.getElementById('freqValue').textContent = '---'
  document.getElementById('noteName').textContent = '·'
  document.getElementById('noteOctave').textContent = ''
  document.getElementById('meterNeedle').style.left = '50%'
  document.getElementById('signalBar').style.width = '0%'
  setStatus('— WAITING FOR SIGNAL —')
  ;['arrowFlat','feedbackOk','arrowSharp'].forEach(id =>
    document.getElementById(id).classList.remove('active'))
}

function updateMicUI() {
  const on = state.listening
  document.getElementById('micBtn').classList.toggle('listening', on)
  document.getElementById('micLabel').textContent = on ? 'LISTENING · TAP TO STOP' : 'TAP TO TUNE'
  const ind = document.getElementById('powerIndicator')
  ind.classList.toggle('active', on)
  ind.querySelector('span:last-child').textContent = on ? 'ACTIVE' : 'STANDBY'
}

// ── RENDER CONTROLS ───────────────────────────────────────────────

function currentStrings() {
  return INSTRUMENTS[state.instrument].tunings[state.tuning] || []
}

function renderTuningButtons() {
  const tunings = INSTRUMENTS[state.instrument].tunings
  const container = document.getElementById('tuningButtons')
  container.innerHTML = ''
  Object.keys(tunings).forEach(key => {
    const btn = document.createElement('button')
    btn.className = 'tuning-btn' + (key === state.tuning ? ' active' : '')
    btn.textContent = key
    btn.addEventListener('click', () => {
      state.tuning = key
      state.selectedString = null
      state.freqHistory = []
      state.smoothedFreq = null
      renderTuningButtons()
      renderStringButtons()
    })
    container.appendChild(btn)
  })
}

function renderStringButtons() {
  const strings = currentStrings()
  const container = document.getElementById('stringButtons')
  container.innerHTML = ''
  strings.forEach(s => {
    const btn = document.createElement('button')
    btn.className = 'string-btn' + (state.selectedString === s.name ? ' locked' : '')
    btn.dataset.stringName = s.name
    btn.textContent = s.label
    btn.addEventListener('click', () => {
      state.selectedString = state.selectedString === s.name ? null : s.name
      const locked = state.selectedString !== null
      document.getElementById('autoDetectLabel').textContent = locked
        ? 'LOCKED → ' + s.label : 'AUTO DETECT'
      document.getElementById('autoHint').textContent = locked
        ? 'tap again to unlock' : 'tap to lock on a string'
      state.freqHistory = []
      state.smoothedFreq = null
      renderStringButtons()
    })
    container.appendChild(btn)
  })
}

// ── INIT ──────────────────────────────────────────────────────────

function init() {
  document.querySelectorAll('.inst-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.instrument = btn.dataset.instrument
      state.tuning = Object.keys(INSTRUMENTS[state.instrument].tunings)[0]
      state.selectedString = null
      state.freqHistory = []
      state.smoothedFreq = null
      document.querySelectorAll('.inst-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      renderTuningButtons()
      renderStringButtons()
    })
  })
  document.getElementById('micBtn').addEventListener('click', () => {
    state.listening ? stopListening() : startListening()
  })
  renderTuningButtons()
  renderStringButtons()
}

init()
