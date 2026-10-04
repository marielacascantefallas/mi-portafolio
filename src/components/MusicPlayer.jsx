import { useEffect, useRef, useState } from 'react'
import './MusicPlayer.css'

// Fase 8 — floating background-music toggle. Source is YouTube (IFrame API,
// hidden player) per the brief: https://www.youtube.com/watch?v=rFZHOHl-L8A
const VIDEO_ID = 'rFZHOHl-L8A'
const MUTE_KEY = 'musicMuted'
const DEFAULT_VOLUME = 20 // "volumen bajo por defecto"

// YouTube error codes that specifically mean "the owner doesn't allow this
// video to be played in embedded players" (101 and 150 are the same thing,
// YouTube just uses both historically).
const EMBED_DISALLOWED_CODES = [101, 150]

export default function MusicPlayer() {
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const startedRef = useRef(false)
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [embedBlocked, setEmbedBlocked] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const mutedRef = useRef(muted)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Load the IFrame API once and create a hidden player.
  useEffect(() => {
    let cancelled = false

    const createPlayer = () => {
      if (cancelled || !containerRef.current || playerRef.current) return
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(DEFAULT_VOLUME)
            if (mutedRef.current) e.target.mute()
          },
          onStateChange: (e) => {
            setIsPlaying(e.data === window.YT.PlayerState.PLAYING)
          },
          onError: (e) => {
            if (EMBED_DISALLOWED_CODES.includes(e.data)) {
              setEmbedBlocked(true)
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.()
        createPlayer()
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

  // Browsers block autoplay-with-sound: wait for the user's first
  // interaction anywhere on the page (click, scroll, or key) before
  // starting playback. The disc stays still until then.
  useEffect(() => {
    const start = () => {
      if (startedRef.current) return
      const player = playerRef.current
      if (!player || typeof player.playVideo !== 'function') return

      startedRef.current = true
      player.playVideo()

      window.removeEventListener('click', start)
      window.removeEventListener('scroll', start)
      window.removeEventListener('keydown', start)
    }

    window.addEventListener('click', start)
    window.addEventListener('scroll', start, { passive: true })
    window.addEventListener('keydown', start)

    return () => {
      window.removeEventListener('click', start)
      window.removeEventListener('scroll', start)
      window.removeEventListener('keydown', start)
    }
  }, [])

  const toggleMuted = () => {
    // State/localStorage/aria update regardless of whether the player has
    // finished initializing yet — a click should always reflect the
    // person's intent, not silently no-op on a slow connection. Whatever
    // the player's current readiness, applying mute/unmute to it is a
    // best-effort extra, not a precondition.
    const player = playerRef.current

    if (player && !startedRef.current && typeof player.playVideo === 'function') {
      // The button doubles as the very first interaction when that's how
      // someone finds it — playVideo() is a no-op if playback already
      // started, so this is safe to call unconditionally.
      startedRef.current = true
      player.playVideo()
    }

    const next = !muted
    setMuted(next)
    try {
      localStorage.setItem(MUTE_KEY, String(next))
    } catch {
      // Storage can be unavailable (private mode, quota) — the toggle
      // still works for the rest of the session, it just won't persist.
    }

    if (player) {
      if (next) player.mute?.()
      else player.unMute?.()
    }
  }

  const spinning = isPlaying && !muted && !reducedMotion

  return (
    <>
      <div ref={containerRef} className="music-player__frame" aria-hidden="true" />

      <button
        type="button"
        className={`music-player__disc${spinning ? ' music-player__disc--spinning' : ''}`}
        onClick={toggleMuted}
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        aria-pressed={muted}
        disabled={embedBlocked}
        title={embedBlocked ? "This track can't be embedded" : undefined}
      >
        <span className="music-player__disc-ring" aria-hidden="true" />
        <span className="music-player__disc-label" aria-hidden="true" />
      </button>
    </>
  )
}
