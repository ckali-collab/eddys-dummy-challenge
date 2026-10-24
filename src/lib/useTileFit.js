import { useLayoutEffect, useRef } from "react";

// Misst die Höhe des Textblocks neben einer Icon-Kachel und schreibt sie als --text-h auf den
// gemeinsamen Container. Die Kachel nimmt daraus clamp(--tile-base, --text-h, --tile-max) (styles.css).
// Wächst die Kachel, wird der Text schmaler und kann nur mehr Zeilen bekommen, nie weniger:
// die Rechnung pendelt deshalb nicht.
export default function useTileFit(textSelector) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const box = ref.current;
    const text = box?.querySelector(textSelector);
    if (!text) return;
    const set = () => box.style.setProperty("--text-h", `${text.getBoundingClientRect().height}px`);
    set();
    // ResizeObserver für Umbrüche durch Inhalt, resize als Absicherung (Drehen, Fensterbreite)
    const ro = new ResizeObserver(set);
    ro.observe(text);
    window.addEventListener("resize", set);
    return () => { ro.disconnect(); window.removeEventListener("resize", set); };
  }, [textSelector]);
  return ref;
}
