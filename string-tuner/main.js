// ═══════════════════════════════════════════════════════════════
//  STRING TUNER  ·  ST-440
// ═══════════════════════════════════════════════════════════════

// ── TUNING DATA ─────────────────────────────────────────────────

const INSTRUMENTS = {
  guitar: {
    label: 'GUITAR',
    tunings: {
      'Standard': [
        { name:'E2', freq:82.41,  label:'① E2' },
        { name:'A2', freq:110.00, label:'② A2' },
        { name:'D3', freq:146.83, label:'③ D3' },
        { name:'G3', freq:196.00, label:'④ G3' },
        { name:'B3', freq:246.94, label:'⑤ B3' },
        { name:'E4', freq:329.63, label:'⑥ E4' },
      ],
      'Drop D': [
        { name:'D2', freq:73.42,  label:'① D2' },
        { name:'A2', freq:110.00, label:'② A2' },
        { name:'D3', freq:146.83, label:'③ D3' },
        { name:'G3', freq:196.00, label:'④ G3' },
        { name:'B3', freq:246.94, label:'⑤ B3' },
        { name:'E4', freq:329.63, label:'⑥ E4' },
      ],
      'Open G': [
        { name:'D2', freq:73.42,  label:'① D2' },
        { name:'G2', freq:98.00,  label:'② G2' },
        { name:'D3', freq:146.83, label:'③ D3' },
        { name:'G3', freq:196.00, label:'④ G3' },
        { name:'B3', freq:246.94, label:'⑤ B3' },
        { name:'D4', freq:293.66, label:'⑥ D4' },
      ],
      'Open D': [
        { name:'D2', freq:73.42,  label:'① D2' },
        { name:'A2', freq:110.00, label:'② A2' },
        { name:'D3', freq:146.83, label:'③ D3' },
        { name:'F#3',freq:185.00, label:'④ F#3' },
        { name:'A3', freq:220.00, label:'⑤ A3' },
        { name:'D4', freq:293.66, label:'⑥ D4' },
      ],
      'Piano Ref': [
        { name:'E',  freq:160.5,  label:'① E' },
        { name:'A',  freq:215.0,  label:'② A' },
        { name:'D',  freq:286.3,  label:'③ D' },
        { name:'G',  freq:381.4,  label:'④ G' },
        { name:'B',  freq:481.1,  label:'⑤ B' },
        { name:'e',  freq:641.4,  label:'⑥ e' },
      ],
    }
  },
  ukulele: {
    label: 'UKULELE',
    tunings: {
      'Standard': [
        { name:'G4', freq:392.00, label:'① G4' },
        { name:'C4', freq:261.63, label:'② C4' },
        { name:'E4', freq:329.63, label:'③ E4' },
        { name:'A4', freq:440.00, label:'④ A4' },
      ],
      'Low-G': [
        { name:'G3', freq:196.00, label:'① G3' },
        { name:'C4', freq:261.63, label:'② C4' },
        { name:'E4', freq:329.63, label:'③ E4' },
        { name:'A4', freq:440.00, label:'④ A4' },
      ],
      'D-tuning': [
        { name:'A4', freq:440.00, label:'① A4' },
        { name:'D4', freq:293.66, label:'② D4' },
        { name:'F#4',freq:369.99, label:'③ F#4' },
        { name:'B4', freq:493.88, label:'④ B4' },
      ],
      'Piano Ref': [
        { name:'G',  freq:381.4,  label:'① G' },
        { name:'C',  freq:256.4,  label:'② C' },
        { name:'E',  freq:312.2,  label:'③ E' },
        { name:'A',  freq:430.9,  label:'④ A' },
      ],
    }
  }
}

// ── CHORD DATA ──────────────────────────────────────────────────
// Each quality is now an ARRAY of voicings (positions on the neck)
// Format: { name, frets[], barre? }

const CHORDS = {
  guitar: {
    C: {
      major: [
        { name:'C',      frets:[ 0, 3, 2, 0, 1, 0] },
        { name:'C',      frets:[-1, 3, 2, 0, 1, 0], barre:{fret:3,from:2,to:5} },
        { name:'C/8fr',  frets:[ 8,10,10, 9, 8, 8], barre:{fret:8,from:0,to:5} },
      ],
      minor: [
        { name:'Cm',     frets:[ 0, 3, 5, 5, 4, 3], barre:{fret:3,from:1,to:5} },
        { name:'Cm/8fr', frets:[ 8,10,10, 9, 8, 8], barre:{fret:8,from:0,to:5} },
      ],
      dim: [
        { name:'Cdim',   frets:[ 0, 3, 4, 5, 4, 3] },
        { name:'Cdim',   frets:[-1,-1, 1, 2, 1, 2] },
      ],
      maj7: [
        { name:'Cmaj7',  frets:[ 0, 3, 2, 0, 0, 0] },
        { name:'Cmaj7',  frets:[-1, 3, 2, 4, 0, 0] },
      ],
    },
    D: {
      major: [
        { name:'D',      frets:[-1,-1, 0, 2, 3, 2] },
        { name:'D/5fr',  frets:[ 5, 5, 7, 7, 7, 5], barre:{fret:5,from:0,to:5} },
        { name:'D/10fr', frets:[-1,10,12,12,11,10], barre:{fret:10,from:1,to:5} },
      ],
      minor: [
        { name:'Dm',     frets:[-1,-1, 0, 2, 3, 1] },
        { name:'Dm/5fr', frets:[ 5, 5, 7, 7, 6, 5], barre:{fret:5,from:0,to:5} },
      ],
      dim: [
        { name:'Ddim',   frets:[-1,-1, 0, 1, 3, 1] },
        { name:'Ddim',   frets:[-1,-1, 3, 4, 3, 4] },
      ],
      maj7: [
        { name:'Dmaj7',  frets:[-1,-1, 0, 2, 2, 2] },
        { name:'Dmaj7',  frets:[-1, 5, 4, 6, 5,-1] },
      ],
    },
    E: {
      major: [
        { name:'E',      frets:[ 0, 2, 2, 1, 0, 0] },
        { name:'E/7fr',  frets:[ 7, 7, 9, 9, 9, 7], barre:{fret:7,from:0,to:5} },
      ],
      minor: [
        { name:'Em',     frets:[ 0, 2, 2, 0, 0, 0] },
        { name:'Em/7fr', frets:[ 7, 7, 9, 9, 8, 7], barre:{fret:7,from:0,to:5} },
      ],
      dim: [
        { name:'Edim',   frets:[ 0, 1, 2, 3, 2, 0] },
        { name:'Edim',   frets:[-1,-1, 2, 3, 2, 3] },
      ],
      maj7: [
        { name:'Emaj7',  frets:[ 0, 2, 1, 1, 0, 0] },
        { name:'Emaj7',  frets:[ 0, 2, 2, 1, 4, 0] },
      ],
    },
    F: {
      major: [
        { name:'F',      frets:[ 1, 3, 3, 2, 1, 1], barre:{fret:1,from:0,to:5} },
        { name:'F/8fr',  frets:[ 8, 8,10,10,10, 8], barre:{fret:8,from:0,to:5} },
      ],
      minor: [
        { name:'Fm',     frets:[ 1, 3, 3, 1, 1, 1], barre:{fret:1,from:0,to:5} },
        { name:'Fm/8fr', frets:[ 8, 8,10,10, 9, 8], barre:{fret:8,from:0,to:5} },
      ],
      dim: [
        { name:'Fdim',   frets:[ 1, 2, 3, 4, 3, 1] },
        { name:'Fdim',   frets:[-1,-1, 3, 4, 3, 4] },
      ],
      maj7: [
        { name:'Fmaj7',  frets:[ 1, 3, 3, 2, 1, 0], barre:{fret:1,from:0,to:4} },
        { name:'Fmaj7',  frets:[-1, 0, 3, 2, 1, 0] },
      ],
    },
    G: {
      major: [
        { name:'G',      frets:[ 3, 2, 0, 0, 0, 3] },
        { name:'G',      frets:[ 3, 2, 0, 0, 3, 3] },
        { name:'G/10fr', frets:[10,10,12,12,12,10], barre:{fret:10,from:0,to:5} },
      ],
      minor: [
        { name:'Gm',     frets:[ 3, 5, 5, 3, 3, 3], barre:{fret:3,from:0,to:5} },
        { name:'Gm/10fr',frets:[10,10,12,12,11,10], barre:{fret:10,from:0,to:5} },
      ],
      dim: [
        { name:'Gdim',   frets:[-1,-1, 5, 6, 5, 6] },
        { name:'Gdim',   frets:[ 3, 4, 5, 6, 5, 3] },
      ],
      maj7: [
        { name:'Gmaj7',  frets:[ 3, 2, 0, 0, 0, 2] },
        { name:'Gmaj7',  frets:[-1,10, 9,11,10,-1] },
      ],
    },
    A: {
      major: [
        { name:'A',      frets:[ 0, 0, 2, 2, 2, 0] },
        { name:'A/5fr',  frets:[ 5, 7, 7, 6, 5, 5], barre:{fret:5,from:0,to:5} },
      ],
      minor: [
        { name:'Am',     frets:[ 0, 0, 2, 2, 1, 0] },
        { name:'Am/5fr', frets:[ 5, 7, 7, 5, 5, 5], barre:{fret:5,from:0,to:5} },
      ],
      dim: [
        { name:'Adim',   frets:[ 0, 0, 1, 2, 1, 0] },
        { name:'Adim',   frets:[-1,-1, 4, 5, 4, 5] },
      ],
      maj7: [
        { name:'Amaj7',  frets:[ 0, 0, 2, 1, 2, 0] },
        { name:'Amaj7',  frets:[-1, 0, 2, 1, 2, 0] },
      ],
    },
    B: {
      major: [
        { name:'B',      frets:[-1, 2, 4, 4, 4, 2], barre:{fret:2,from:1,to:5} },
        { name:'B/7fr',  frets:[ 7, 9, 9, 8, 7, 7], barre:{fret:7,from:0,to:5} },
      ],
      minor: [
        { name:'Bm',     frets:[-1, 2, 4, 4, 3, 2], barre:{fret:2,from:1,to:5} },
        { name:'Bm/7fr', frets:[ 7, 9, 9, 7, 7, 7], barre:{fret:7,from:0,to:5} },
      ],
      dim: [
        { name:'Bdim',   frets:[-1, 2, 3, 4, 3, 2] },
        { name:'Bdim',   frets:[-1,-1, 0, 1, 0, 1] },
      ],
      maj7: [
        { name:'Bmaj7',  frets:[-1, 2, 4, 3, 4, 2] },
        { name:'Bmaj7',  frets:[-1, 7, 6, 8, 7,-1] },
      ],
    },
  },
  ukulele: {
    C: {
      major: [
        { name:'C',     frets:[0,0,0,3] },
        { name:'C/5fr', frets:[5,4,3,3], barre:{fret:3,from:2,to:3} },
      ],
      minor: [
        { name:'Cm',    frets:[0,3,3,3] },
        { name:'Cm',    frets:[5,4,3,5] },
      ],
      dim: [
        { name:'Cdim',  frets:[2,3,2,3] },
        { name:'Cdim',  frets:[5,6,5,6] },
      ],
      maj7: [
        { name:'Cmaj7', frets:[0,0,0,2] },
        { name:'Cmaj7', frets:[4,4,3,3] },
      ],
    },
    D: {
      major: [
        { name:'D',     frets:[2,2,2,0] },
        { name:'D/7fr', frets:[7,6,5,5], barre:{fret:5,from:2,to:3} },
      ],
      minor: [
        { name:'Dm',    frets:[2,2,1,0] },
        { name:'Dm',    frets:[7,6,5,7] },
      ],
      dim: [
        { name:'Ddim',  frets:[1,2,1,2] },
        { name:'Ddim',  frets:[4,5,4,5] },
      ],
      maj7: [
        { name:'Dmaj7', frets:[2,2,2,4] },
        { name:'Dmaj7', frets:[2,2,2,0] },
      ],
    },
    E: {
      major: [
        { name:'E',     frets:[4,4,4,2], barre:{fret:2,from:3,to:3} },
        { name:'E/9fr', frets:[4,4,4,7] },
      ],
      minor: [
        { name:'Em',    frets:[0,4,3,2] },
        { name:'Em',    frets:[4,4,3,2] },
      ],
      dim: [
        { name:'Edim',  frets:[0,1,3,1] },
        { name:'Edim',  frets:[3,4,3,4] },
      ],
      maj7: [
        { name:'Emaj7', frets:[1,3,0,2] },
        { name:'Emaj7', frets:[4,4,4,6] },
      ],
    },
    F: {
      major: [
        { name:'F',     frets:[2,0,1,0] },
        { name:'F/5fr', frets:[5,5,5,3], barre:{fret:3,from:3,to:3} },
      ],
      minor: [
        { name:'Fm',    frets:[1,0,1,3] },
        { name:'Fm',    frets:[5,5,4,3] },
      ],
      dim: [
        { name:'Fdim',  frets:[1,2,1,2] },
        { name:'Fdim',  frets:[4,5,4,5] },
      ],
      maj7: [
        { name:'Fmaj7', frets:[2,4,1,3] },
        { name:'Fmaj7', frets:[5,4,5,3] },
      ],
    },
    G: {
      major: [
        { name:'G',     frets:[0,2,3,2] },
        { name:'G/7fr', frets:[7,7,7,5] },
      ],
      minor: [
        { name:'Gm',    frets:[0,2,3,1] },
        { name:'Gm',    frets:[7,7,6,5] },
      ],
      dim: [
        { name:'Gdim',  frets:[0,1,3,1] },
        { name:'Gdim',  frets:[3,4,3,4] },
      ],
      maj7: [
        { name:'Gmaj7', frets:[0,2,2,2] },
        { name:'Gmaj7', frets:[7,6,7,5] },
      ],
    },
    A: {
      major: [
        { name:'A',     frets:[2,1,0,0] },
        { name:'A/9fr', frets:[9,9,9,7] },
      ],
      minor: [
        { name:'Am',    frets:[2,0,0,0] },
        { name:'Am',    frets:[2,4,3,5] },
      ],
      dim: [
        { name:'Adim',  frets:[2,3,2,3] },
        { name:'Adim',  frets:[5,6,5,6] },
      ],
      maj7: [
        { name:'Amaj7', frets:[1,1,0,0] },
        { name:'Amaj7', frets:[2,1,0,4] },
      ],
    },
    B: {
      major: [
        { name:'B',     frets:[4,3,2,2] },
        { name:'B/4fr', frets:[4,4,4,2], barre:{fret:2,from:3,to:3} },
      ],
      minor: [
        { name:'Bm',    frets:[4,2,2,2] },
        { name:'Bm',    frets:[4,4,3,2] },
      ],
      dim: [
        { name:'Bdim',  frets:[0,1,0,1] },
        { name:'Bdim',  frets:[3,4,3,4] },
      ],
      maj7: [
        { name:'Bmaj7', frets:[3,3,2,2] },
        { name:'Bmaj7', frets:[4,3,2,5] },
      ],
    },
  }
}

// ── CHORD SVG RENDERER ──────────────────────────────────────────
// Compact version for grid layout

function buildChordSVG(chordData, instrument, compact = false) {
  const numStrings = instrument === 'guitar' ? 6 : 4
  const frets = chordData.frets
  const barre = chordData.barre || null

  const playedFrets = frets.filter(f => f > 0)
  const minFret = playedFrets.length ? Math.min(...playedFrets) : 1
  const maxFret = playedFrets.length ? Math.max(...playedFrets) : 4
  let startFret = 1
  if (maxFret > 5) startFret = minFret
  const numFrets = 4

  // compact = smaller for grid view
  const W = compact ? 90 : 150
  const H = compact ? 110 : 180
  const padL = compact ? 16 : 24
  const padR = compact ? 8  : 12
  const padT = compact ? 24 : 36
  const padB = compact ? 10 : 16

  const gridW  = W - padL - padR
  const gridH  = H - padT - padB
  const strGap = gridW / (numStrings - 1)
  const frtGap = gridH / numFrets

  const cBg  = '#0e0e0e'
  const cGrd = '#2a2a2a'
  const cDim = '#444'
  const cDot = '#d4a843'
  const cNut = '#b8b4a8'
  const cMut = '#333'
  const dotR = compact ? 4.5 : 7

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`

  // fret label if not open position
  if (startFret > 1) {
    s += `<text x="${padL-4}" y="${padT + frtGap*0.6}"
      text-anchor="end" font-family="Share Tech Mono,monospace"
      font-size="${compact?7:9}" fill="${cDim}">${startFret}</text>`
  }

  // Nut or top line
  if (startFret === 1) {
    s += `<rect x="${padL}" y="${padT-4}" width="${gridW}" height="${compact?3:5}" fill="${cNut}" rx="1"/>`
  } else {
    s += `<line x1="${padL}" y1="${padT}" x2="${padL+gridW}" y2="${padT}" stroke="${cGrd}" stroke-width="1.5"/>`
  }

  // Fret lines
  for (let f = 1; f <= numFrets; f++) {
    const y = padT + f * frtGap
    s += `<line x1="${padL}" y1="${y}" x2="${padL+gridW}" y2="${y}" stroke="${cGrd}" stroke-width="0.8"/>`
  }

  // String lines
  for (let i = 0; i < numStrings; i++) {
    const x = padL + i * strGap
    s += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT+gridH}" stroke="${cGrd}" stroke-width="0.8"/>`
  }

  // Barre
  if (barre) {
    const bf = barre.fret - startFret + 1
    if (bf >= 1 && bf <= numFrets) {
      const y  = padT + (bf - 0.5) * frtGap
      const x1 = padL + barre.from * strGap
      const x2 = padL + barre.to   * strGap
      s += `<rect x="${x1}" y="${y - dotR*0.85}" width="${x2-x1}" height="${dotR*1.7}"
        rx="${dotR}" fill="${cDot}" opacity="0.88"/>`
    }
  }

  // Dots / open / mute
  for (let i = 0; i < numStrings; i++) {
    const f = frets[i]
    const x = padL + i * strGap
    const aboveY = padT - (compact ? 8 : 12)

    if (f === -1) {
      s += `<text x="${x}" y="${aboveY+2}" text-anchor="middle"
        font-family="Share Tech Mono,monospace" font-size="${compact?8:11}" fill="${cMut}">✕</text>`
    } else if (f === 0) {
      s += `<circle cx="${x}" cy="${aboveY}" r="${compact?3:4}"
        stroke="${cDim}" stroke-width="1" fill="none"/>`
    } else {
      const rf = f - startFret + 1
      if (rf >= 1 && rf <= numFrets) {
        const y = padT + (rf - 0.5) * frtGap
        const covered = barre && barre.fret === f && i >= barre.from && i <= barre.to
        if (!covered) {
          s += `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${cDot}"/>`
        }
      }
    }
  }

  s += `</svg>`
  return s
}

// ── CHORD UI STATE ──────────────────────────────────────────────

const NOTES = ['C','D','E','F','G','A','B']
const QUALITIES = ['major','minor','dim','maj7']
const Q_LABELS  = { major:'MAJ', minor:'MIN', dim:'DIM', maj7:'MAJ7' }

// Per-quality voicing index
let voicingIdx = { major:0, minor:0, dim:0, maj7:0 }

let chordState = {
  instrument: 'guitar',
  note: 'C',
}

function resetVoicingIdx() {
  QUALITIES.forEach(q => voicingIdx[q] = 0)
}

function renderChordNotes() {
  const row = document.getElementById('chordNoteRow')
  row.innerHTML = ''
  NOTES.forEach(n => {
    const btn = document.createElement('button')
    btn.className = 'note-btn' + (n === chordState.note ? ' active' : '')
    btn.textContent = n
    btn.addEventListener('click', () => {
      chordState.note = n
      resetVoicingIdx()
      renderChordNotes()
      renderChordGrid()
    })
    row.appendChild(btn)
  })
}

function renderChordGrid() {
  const { instrument, note } = chordState
  const noteData = CHORDS[instrument]?.[note]
  const grid = document.getElementById('chordGrid')
  if (!grid) return
  grid.innerHTML = ''

  QUALITIES.forEach(q => {
    const voicings = noteData?.[q]
    const idx = voicingIdx[q] || 0
    const chord = voicings?.[idx]

    const cell = document.createElement('div')
    cell.className = 'chord-cell'

    // Quality label
    const qlabel = document.createElement('div')
    qlabel.className = 'chord-cell-label'
    qlabel.textContent = Q_LABELS[q]
    cell.appendChild(qlabel)

    // SVG diagram
    const diagramWrap = document.createElement('div')
    diagramWrap.className = 'chord-cell-diagram'
    if (chord) {
      diagramWrap.innerHTML = buildChordSVG(chord, instrument, true)
    } else {
      diagramWrap.innerHTML = `<div class="chord-no-data">—</div>`
    }
    cell.appendChild(diagramWrap)

    // Chord name
    const nameEl = document.createElement('div')
    nameEl.className = 'chord-cell-name'
    nameEl.textContent = chord ? chord.name : ''
    cell.appendChild(nameEl)

    // Voicing navigator (only if >1 voicing)
    if (voicings && voicings.length > 1) {
      const nav = document.createElement('div')
      nav.className = 'chord-nav'

      const prev = document.createElement('button')
      prev.className = 'chord-nav-btn'
      prev.textContent = '‹'
      prev.addEventListener('click', () => {
        voicingIdx[q] = (idx - 1 + voicings.length) % voicings.length
        renderChordGrid()
      })

      const counter = document.createElement('span')
      counter.className = 'chord-nav-counter'
      counter.textContent = `${idx + 1}/${voicings.length}`

      const next = document.createElement('button')
      next.className = 'chord-nav-btn'
      next.textContent = '›'
      next.addEventListener('click', () => {
        voicingIdx[q] = (idx + 1) % voicings.length
        renderChordGrid()
      })

      nav.appendChild(prev)
      nav.appendChild(counter)
      nav.appendChild(next)
      cell.appendChild(nav)
    }

    grid.appendChild(cell)
  })
}

function initChordPanel() {
  renderChordNotes()

  // Panel instrument toggle
  document.querySelectorAll('.p-inst-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      chordState.instrument = btn.dataset.pinst
      document.querySelectorAll('.p-inst-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      resetVoicingIdx()
      renderChordGrid()
    })
  })

  renderChordGrid()
}

function initPanel() {
  const hamburger = document.getElementById('hamburgerBtn')
  const panel     = document.getElementById('slidePanel')
  const overlay   = document.getElementById('panelOverlay')
  const closeBtn  = document.getElementById('panelClose')
  const open  = () => { panel.classList.add('open'); overlay.classList.add('visible'); hamburger.classList.add('open') }
  const close = () => { panel.classList.remove('open'); overlay.classList.remove('visible'); hamburger.classList.remove('open') }
  hamburger.addEventListener('click', () => panel.classList.contains('open') ? close() : open())
  closeBtn.addEventListener('click', close)
  overlay.addEventListener('click', close)
}

// ── TUNER STATE ─────────────────────────────────────────────────

// In-tune tolerance & lock
const TUNE_THRESHOLD  = 8     // cents — within this = in tune
const TUNE_LOCK_BREAK = 80    // cents from locked freq before exiting green (new note)
const SMOOTH_WINDOW   = 7
const NO_SIGNAL_GRACE = 12

let state = {
  instrument: 'guitar',
  tuning: 'Standard',
  selectedString: null,
  listening: false,
  audioCtx: null,
  analyser: null,
  stream: null,
  animFrame: null,
  freqHistory: [],
  smoothedFreq: null,
  noSignalFrames: 0,
  currentCents: 0,
  hasSignal: false,
  lockedFreq: null,   // freq recorded when we entered green — held until new note
  isTuned: false,
}

// ── NOTE MATH ───────────────────────────────────────────────────

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

function freqToNoteInfo(freq) {
  if (!freq || freq < 20) return null
  const semitones = 12 * Math.log2(freq / 440) + 57
  const midi = Math.round(semitones)
  const noteName = NOTE_NAMES[((midi % 12) + 12) % 12]
  const octave = Math.floor(midi / 12) - 1
  const targetFreq = 440 * Math.pow(2, (midi - 69) / 12)
  const cents = 1200 * Math.log2(freq / targetFreq)
  return { noteName, octave, cents }
}

function findClosestString(freq, strings) {
  if (!freq) return null
  let best = null, bestCents = Infinity
  for (const s of strings) {
    const c = Math.abs(1200 * Math.log2(freq / s.freq))
    if (c < bestCents) { bestCents = c; best = s }
  }
  return bestCents < 250 ? best : null
}

function medianFreq(h) {
  if (!h.length) return null
  const s = [...h].sort((a,b) => a-b)
  const m = Math.floor(s.length/2)
  return s.length%2 ? s[m] : (s[m-1]+s[m])/2
}

// ── PITCH DETECTOR ──────────────────────────────────────────────

function detectPitch(buf, sampleRate) {
  const SIZE = buf.length, HALF = Math.floor(SIZE/2)
  let rms = 0
  for (let i = 0; i < SIZE; i++) rms += buf[i]*buf[i]
  rms = Math.sqrt(rms/SIZE)
  if (rms < 0.004) return { freq:null, rms }

  const nsdf = new Float32Array(HALF)
  for (let lag = 0; lag < HALF; lag++) {
    let ac = 0, norm = 0
    for (let i = 0; i < HALF; i++) {
      ac   += buf[i] * buf[i+lag]
      norm += buf[i]*buf[i] + buf[i+lag]*buf[i+lag]
    }
    nsdf[lag] = norm > 0 ? 2*ac/norm : 0
  }

  let i = 1
  while (i < HALF-1 && nsdf[i] > 0) i++
  while (i < HALF-1 && nsdf[i] <= 0) i++
  let bestPeak = -1, bestVal = -Infinity
  while (i < HALF-1) {
    if (nsdf[i] > nsdf[i-1] && nsdf[i] >= nsdf[i+1] && nsdf[i] > bestVal) {
      bestVal = nsdf[i]; bestPeak = i
    }
    i++
  }
  if (bestPeak < 1 || bestVal < 0.80) return { freq:null, rms }
  const y1 = nsdf[bestPeak-1], y2 = nsdf[bestPeak], y3 = nsdf[bestPeak+1]??y2
  const d = 2*y2-y1-y3
  const refined = d !== 0 ? bestPeak+(y3-y1)/(2*d) : bestPeak
  const freq = sampleRate/refined
  if (freq < 55 || freq > 1400) return { freq:null, rms }
  return { freq, rms }
}

// ── PARTICLES ───────────────────────────────────────────────────

// Initialized inside init() after DOM is ready — avoids null crash on module load
let canvas = null
let ctx    = null
const N = 90
const pts = []
const CA = [212,168,67], CG = [143,168,92], CI = [32,32,32]
const lerp = (a,b,t) => a.map((v,i)=>Math.round(v+(b[i]-v)*t))
const rgba = ([r,g,b],a=1) => `rgba(${r},${g},${b},${a})`

function initPts() {
  if (!canvas) return
  pts.length = 0
  const w = canvas.width, h = canvas.height
  for (let i = 0; i < N; i++) {
    const xb = (i/(N-1))*w
    pts.push({ xb, x:xb, y:h/2+(Math.random()-.5)*h*.5,
               vx:0, vy:0, ph:Math.random()*Math.PI*2, sz:1+Math.random()*1.4 })
  }
}

let wph = 0

function drawPts(cents, active, t) {
  if (!canvas || !ctx) return
  const w = canvas.width, h = canvas.height
  if (!w||!h) return
  ctx.fillStyle = 'rgba(13,13,13,0.50)'
  ctx.fillRect(0,0,w,h)

  if (!active) {
    wph += 0.005
    for (const p of pts) {
      p.x += Math.sin(t*.0004+p.ph)*.5
      p.y += Math.cos(t*.0006+p.ph*1.3)*.35
      if (p.x<0) p.x=w; if (p.x>w) p.x=0
      if (p.y<4) p.y=h-4; if (p.y>h-4) p.y=4
      ctx.beginPath(); ctx.arc(p.x,p.y,p.sz*.9,0,Math.PI*2)
      ctx.fillStyle = rgba(CI,.6); ctx.fill()
    }
    return
  }

  const ab    = Math.min(50,Math.abs(cents))
  const score = 1 - ab/50
  const col   = lerp(CA, CG, Math.pow(score,1.8))
  const amp   = h*.28*(1-score*.82)
  const chaos = (1-score)*h*.13
  wph += .032+(1-score)*.07

  // backbone line
  ctx.beginPath()
  ctx.strokeStyle = rgba(col,.08+score*.18)
  ctx.lineWidth = 1
  let first = true
  for (const p of pts) {
    const yw = h/2 + Math.sin((p.xb/w)*Math.PI*3+wph+p.ph*.15)*amp
    if (first) { ctx.moveTo(p.xb,yw); first=false } else ctx.lineTo(p.xb,yw)
  }
  ctx.stroke()

  for (const p of pts) {
    const tw = h/2 + Math.sin((p.xb/w)*Math.PI*3+wph+p.ph*.15)*amp
    const dx = (Math.random()-.5)*chaos*2, dy = (Math.random()-.5)*chaos*2
    const sp = .09+score*.18
    p.x += (p.xb+dx-p.x)*sp; p.y += (tw+dy-p.y)*sp
    p.vx *= .8; p.vy *= .8; p.x += p.vx; p.y += p.vy

    const r = p.sz*(1+score*2.2)
    const al = .3+score*.6

    if (score > .2) {
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*3.5)
      g.addColorStop(0, rgba(col,al*.4)); g.addColorStop(1, rgba(col,0))
      ctx.beginPath(); ctx.arc(p.x,p.y,r*3.5,0,Math.PI*2)
      ctx.fillStyle=g; ctx.fill()
    }
    ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2)
    ctx.fillStyle = rgba(col,al); ctx.fill()
  }

  // center reference line
  ctx.beginPath(); ctx.setLineDash([2,14])
  ctx.strokeStyle = rgba(CI,.3); ctx.lineWidth=1
  ctx.moveTo(0,h/2); ctx.lineTo(w,h/2); ctx.stroke()
  ctx.setLineDash([])
}

function resizeCanvas() {
  if (!canvas) return
  requestAnimationFrame(() => {
    const sect = document.getElementById('displaySection')
    if (!sect) return
    const r = sect.getBoundingClientRect()
    if (r.width>0&&r.height>0) {
      canvas.width = Math.round(r.width)
      canvas.height = Math.round(r.height)
      initPts()
    }
  })
}

// ── TUNED STATE ─────────────────────────────────────────────────

function setTunedState(inTune) {
  if (inTune === state.isTuned) return
  state.isTuned = inTune
  document.getElementById('app').classList.toggle('tuned', inTune)
}

// Called every loop frame with the current smoothed frequency and raw cents offset.
// Logic:
//  - First time we hit TUNE_THRESHOLD → lock green, record lockedFreq
//  - Stay green as long as new signal is within TUNE_LOCK_BREAK cents of lockedFreq
//    (silence / no signal does NOT break the lock — string is still ringing)
//  - Only break green when a clearly different note arrives (> TUNE_LOCK_BREAK cents away)
function updateTunedLock(rawInTune, currentFreq) {
  if (rawInTune && !state.isTuned) {
    // Enter green — record the locking frequency
    state.lockedFreq = currentFreq
    setTunedState(true)
  } else if (state.isTuned && currentFreq && state.lockedFreq) {
    // Already green — only break if a new, clearly different note arrives
    const drift = Math.abs(1200 * Math.log2(currentFreq / state.lockedFreq))
    if (drift > TUNE_LOCK_BREAK) {
      state.lockedFreq = null
      setTunedState(false)
    }
    // silence (no currentFreq) keeps the lock — string is still decaying
  }
}

// ── AUDIO ───────────────────────────────────────────────────────

async function startListening() {
  try {
    state.audioCtx = new (window.AudioContext||window.webkitAudioContext)({ sampleRate:44100 })
    state.stream   = await navigator.mediaDevices.getUserMedia({ audio:{
      echoCancellation:false, noiseSuppression:false, autoGainControl:false, channelCount:1
    }})
    const src = state.audioCtx.createMediaStreamSource(state.stream)
    state.analyser = state.audioCtx.createAnalyser()
    state.analyser.fftSize = 8192
    state.analyser.smoothingTimeConstant = 0
    src.connect(state.analyser)
    Object.assign(state,{listening:true,freqHistory:[],smoothedFreq:null,noSignalFrames:0,lockedFreq:null})
    updateMicUI(); loop()
  } catch(e) { console.error(e); setStatus('MIC ACCESS DENIED') }
}

function stopListening() {
  if (state.animFrame) cancelAnimationFrame(state.animFrame)
  if (state.stream) state.stream.getTracks().forEach(t=>t.stop())
  if (state.audioCtx) state.audioCtx.close()
  Object.assign(state,{listening:false,audioCtx:null,analyser:null,stream:null,
    freqHistory:[],smoothedFreq:null,hasSignal:false,currentCents:0,lockedFreq:null})
  setTunedState(false); updateMicUI(); resetDisplay()
}

// ── MAIN LOOP ───────────────────────────────────────────────────

function loop() {
  state.animFrame = requestAnimationFrame(loop)
  const buf = new Float32Array(state.analyser.fftSize)
  state.analyser.getFloatTimeDomainData(buf)
  const {freq,rms} = detectPitch(buf,state.audioCtx.sampleRate)
  document.getElementById('signalBar').style.width = Math.min(100,rms*600)+'%'

  if (!freq) {
    state.noSignalFrames++
    if (state.noSignalFrames > NO_SIGNAL_GRACE) {
      state.freqHistory=[]; state.smoothedFreq=null; state.hasSignal=false; state.currentCents=0
      setStatus('— NO SIGNAL —')
      // Note: we do NOT break the tuned lock here — string may still be decaying
    }
    return
  }
  state.noSignalFrames = 0; state.hasSignal = true

  if (state.smoothedFreq && Math.abs(1200*Math.log2(freq/state.smoothedFreq)) > 400)
    state.freqHistory = []

  state.freqHistory.push(freq)
  if (state.freqHistory.length > SMOOTH_WINDOW) state.freqHistory.shift()
  const sf = medianFreq(state.freqHistory)
  state.smoothedFreq = sf

  document.getElementById('freqValue').textContent = sf.toFixed(1)
  const ni = freqToNoteInfo(sf)
  if (!ni) return
  document.getElementById('noteName').textContent  = ni.noteName
  document.getElementById('noteOctave').textContent = ni.octave

  const strings = currentStrings()
  const tgt = state.selectedString
    ? strings.find(s=>s.name===state.selectedString)
    : findClosestString(sf,strings)

  let cents = ni.cents
  if (tgt) { cents = 1200*Math.log2(sf/tgt.freq); updateAutoHighlight(tgt) }
  else updateAutoHighlight(null)

  state.currentCents = cents
  const rawInTune = Math.abs(cents) < TUNE_THRESHOLD
  updateTunedLock(rawInTune, sf)
  updateMeter(cents, state.isTuned)
}

function canvasLoop(t) {
  requestAnimationFrame(canvasLoop)
  drawPts(state.currentCents, state.hasSignal && state.listening, t)
}

// ── DISPLAY ─────────────────────────────────────────────────────

function updateMeter(cents, inTune) {
  const cl = Math.max(-50,Math.min(50,cents))
  document.getElementById('meterNeedle').style.left = (50+(cl/50)*50)+'%'
  setStatus(inTune ? '✓  IN TUNE'
    : cents<-TUNE_THRESHOLD ? `${Math.abs(cents).toFixed(0)}¢ FLAT — TIGHTEN`
    : `${cents.toFixed(0)}¢ SHARP — LOOSEN`)
}

function updateAutoHighlight(tgt) {
  document.querySelectorAll('.string-btn').forEach(b =>
    b.classList.toggle('active', !state.selectedString && !!tgt && b.dataset.stringName===tgt.name))
  document.getElementById('autoDetectLabel').textContent =
    (!state.selectedString && tgt) ? 'AUTO · '+tgt.label : 'AUTO DETECT'
}

function setStatus(m) { document.getElementById('meterStatus').textContent = m }

function resetDisplay() {
  document.getElementById('freqValue').textContent  = '---'
  document.getElementById('noteName').textContent   = '·'
  document.getElementById('noteOctave').textContent = ''
  document.getElementById('meterNeedle').style.left = '50%'
  document.getElementById('signalBar').style.width  = '0%'
  setStatus('— WAITING FOR SIGNAL —')
}

function updateMicUI() {
  const on = state.listening
  document.getElementById('micBtn').classList.toggle('listening',on)
  document.getElementById('micLabel').textContent = on?'LISTENING · TAP TO STOP':'TAP TO TUNE'
  const ind = document.getElementById('powerIndicator')
  ind.classList.toggle('active',on)
  ind.querySelector('span:last-child').textContent = on?'ACTIVE':'STANDBY'
}

// ── CONTROLS ────────────────────────────────────────────────────

function currentStrings() { return INSTRUMENTS[state.instrument].tunings[state.tuning]||[] }

function renderTuningButtons() {
  const t = INSTRUMENTS[state.instrument].tunings
  const c = document.getElementById('tuningButtons')
  c.innerHTML = ''
  Object.keys(t).forEach(k => {
    const b = document.createElement('button')
    b.className = 'tuning-btn'+(k===state.tuning?' active':'')
    b.textContent = k
    b.addEventListener('click',()=>{
      state.tuning=k; state.selectedString=null; state.freqHistory=[]; state.smoothedFreq=null
      renderTuningButtons(); renderStringButtons()
    })
    c.appendChild(b)
  })
}

function renderStringButtons() {
  const strings = currentStrings()
  const c = document.getElementById('stringButtons')
  c.innerHTML = ''
  strings.forEach(s => {
    const b = document.createElement('button')
    b.className = 'string-btn'+(state.selectedString===s.name?' locked':'')
    b.dataset.stringName = s.name; b.textContent = s.label
    b.addEventListener('click',()=>{
      state.selectedString = state.selectedString===s.name ? null : s.name
      const lk = state.selectedString!==null
      document.getElementById('autoDetectLabel').textContent = lk?'LOCKED → '+s.label:'AUTO DETECT'
      document.getElementById('autoHint').textContent = lk?'tap again to unlock':'tap to lock on a string'
      state.freqHistory=[]; state.smoothedFreq=null; renderStringButtons()
    })
    c.appendChild(b)
  })
}

// ── INIT ────────────────────────────────────────────────────────

function init() {
  canvas = document.getElementById('particleCanvas')
  ctx    = canvas ? canvas.getContext('2d') : null

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('orientationchange', ()=>setTimeout(resizeCanvas,200))

  document.querySelectorAll('.inst-btn').forEach(b => b.addEventListener('click',()=>{
    state.instrument = b.dataset.instrument
    state.tuning = Object.keys(INSTRUMENTS[state.instrument].tunings)[0]
    state.selectedString=null; state.freqHistory=[]; state.smoothedFreq=null
    document.querySelectorAll('.inst-btn').forEach(x=>x.classList.remove('active'))
    b.classList.add('active'); renderTuningButtons(); renderStringButtons()
  }))

  document.getElementById('micBtn').addEventListener('click',()=>
    state.listening ? stopListening() : startListening())

  renderTuningButtons(); renderStringButtons()
  initPanel(); initChordPanel()
  requestAnimationFrame(canvasLoop)
}

init()