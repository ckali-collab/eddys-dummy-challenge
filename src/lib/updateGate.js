// Hält ein Service-Worker-Update zurück, solange gearbeitet wird. Kein Banner, keine Rückfrage.
// Gründe werden einzeln gesetzt (z.B. "rating", "plan"), das Update läuft erst, wenn keiner mehr aktiv ist
// und die App das nächste Mal prüft (Vordergrund) oder neu startet.
const reasons = new Set();

export const setUpdateHold = (reason, active) => {
  if (active) reasons.add(reason);
  else reasons.delete(reason);
};

export const isUpdateHeld = () => reasons.size > 0;
