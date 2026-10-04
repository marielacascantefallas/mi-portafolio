// Remembers the home page's scroll position across a trip to a case study
// page and back, so returning from one doesn't reset you to the top (Fase 7:
// "al volver se conserve la posición del scroll"). sessionStorage survives
// the route change but not a fresh tab/visit, which is exactly the scope we
// want — a real new visit to "/" should still start at the top.
const KEY = 'homeScrollY'

export function saveHomeScroll() {
  sessionStorage.setItem(KEY, String(window.scrollY))
}

export function consumeHomeScroll() {
  const saved = sessionStorage.getItem(KEY)
  if (saved === null) return null
  sessionStorage.removeItem(KEY)
  return Number(saved)
}
