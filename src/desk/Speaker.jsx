import { useEffect, useRef, useState } from 'react'

// "Mariela's portfolio speakers": the same Lofi Girl stream the previous
// site played, through a hidden YouTube IFrame API player. As before, it
// starts on the visitor's first interaction (browsers block sound before
// that); the pill adds play/pause and volume down/up.
const VIDEO_ID = 'rFZHOHl-L8A'
const VOL_KEY = 'speakerVolume'
const PAUSE_KEY = 'speakerPaused'
const STEP = 10

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v === null ? fallback : v
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    // Storage can be unavailable; the control still works for this visit.
  }
}

function IconVolLow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 5h3l4-3v10L4 9H1z" fill="currentColor" />
    </svg>
  )
}
function IconVolHigh() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
      <path d="M1 5h3l4-3v10L4 9H1z" fill="currentColor" />
      <path d="M11 4.5a4 4 0 010 5M13.5 2.5a7 7 0 010 9" stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export default function Speaker() {
  const frameRef = useRef(null)
  const playerRef = useRef(null)
  const startedRef = useRef(false)
  const [volume, setVolume] = useState(20)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const pausedByUser = useRef(false)

  useEffect(() => {
    // Read after hydration so the prerendered markup matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVolume(Number(read(VOL_KEY, 20)))
    pausedByUser.current = read(PAUSE_KEY, 'false') === 'true'
  }, [])

  useEffect(() => {
    let cancelled = false
    const create = () => {
      if (cancelled || playerRef.current || !frameRef.current) return
      playerRef.current = new window.YT.Player(frameRef.current, {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, loop: 1, playlist: VIDEO_ID, playsinline: 1 },
        events: {
          onReady: (e) => e.target.setVolume(Number(read(VOL_KEY, 20))),
          onStateChange: (e) => setPlaying(e.data === window.YT.PlayerState.PLAYING),
          onError: (e) => {
            if ([101, 150].includes(e.data)) setBlocked(true)
          },
        },
      })
    }
    if (window.YT?.Player) create()
    else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        create()
      }
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script')
        tag.id = 'youtube-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
    }
    return () => {
      cancelled = true
    }
  }, [])

  // Start on the first interaction anywhere, unless the visitor paused it.
  useEffect(() => {
    const start = (e) => {
      if (startedRef.current || pausedByUser.current) return
      if (e?.target?.closest?.('[data-speaker]')) return
      const p = playerRef.current
      if (!p?.playVideo) return
      startedRef.current = true
      p.playVideo()
      off()
    }
    const off = () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
    window.addEventListener('pointerdown', start)
    window.addEventListener('keydown', start)
    return off
  }, [])

  const applyVolume = (v) => {
    const next = Math.max(0, Math.min(100, Math.round(v)))
    setVolume(next)
    write(VOL_KEY, next)
    playerRef.current?.setVolume?.(next)
  }

  const togglePlay = () => {
    const p = playerRef.current
    startedRef.current = true
    if (playing) {
      p?.pauseVideo?.()
      pausedByUser.current = true
      write(PAUSE_KEY, true)
    } else {
      p?.setVolume?.(volume)
      p?.playVideo?.()
      pausedByUser.current = false
      write(PAUSE_KEY, false)
    }
  }

  return (
    <div className="speaker glass" data-speaker>
      <div ref={frameRef} className="speaker__frame" aria-hidden="true" />
      <p className="speaker__title" id="speaker-title">
        Mariela’s portfolio speakers
      </p>
      <div className="speaker__row" role="group" aria-labelledby="speaker-title">
        <button
          type="button"
          className="speaker__play"
          onClick={togglePlay}
          disabled={blocked}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
              <path d="M0 0h3v12H0zM7 0h3v12H7z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
              <path d="M0 0l10 6-10 6z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button type="button" className="speaker__btn" onClick={() => applyVolume(volume - STEP)} aria-label="Volume down">
          <IconVolLow />
        </button>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={(e) => applyVolume(Number(e.target.value))}
          aria-label="Volume"
          aria-valuetext={`${volume} percent`}
          style={{ '--v': `${volume}%` }}
        />
        <button type="button" className="speaker__btn" onClick={() => applyVolume(volume + STEP)} aria-label="Volume up">
          <IconVolHigh />
        </button>
      </div>
    </div>
  )
}
