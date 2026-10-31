# Zurücksetzen und zwei Texte

Nachtrag zu `export-import.md`. Klein, aber der erste Punkt betrifft
Datenlöschung.

---

## 1. "App zurücksetzen" löscht künftig wirklich alles

Der Befund ist richtig und war mir nicht bewusst: Der Text verspricht, alle
Daten zu löschen, und lässt Migrations-Sicherungen und `edc-v2` liegen. Darin
stehen Profil und Trainingsdaten.

**Das ist die falsche Richtung von Ehrlichkeit.** Wer "App zurücksetzen"
drückt, will nicht, dass irgendwo noch ein Profil liegt. Jemand, der die App
weitergibt oder das Handy verkauft, verlässt sich darauf.

**Also: Alle Keys löschen**, `edc-v3`, `edc-v3-prev`, alle
`edc-v3-backup-v<n>` und `edc-v2`. Der Text stimmt dann.

**Die Bestätigung bekommt einen Satz dazu und einen Ausweg:**

> **App zurücksetzen**
> Löscht alles: Profil, Fortschritt, Sessions, Trophäen und alle
> Sicherungen, die bei früheren Updates angelegt wurden. Danach startet die
> App wie frisch installiert.
>
> Das lässt sich nicht rückgängig machen. Wenn du den Stand noch brauchen
> könntest, exportier ihn vorher.
>
> [Erst exportieren]  [Trotzdem zurücksetzen]  [Abbrechen]

"Erst exportieren" löst den Export aus und lässt den Dialog offen. Danach
entscheidet der Nutzer erneut.

**Dieselbe Prüfung bei "Fortschritt zurücksetzen" und "Sessions löschen":**
Melde, was die beiden tatsächlich löschen und ob ihre Texte stimmen. Wenn
nicht, gilt dieselbe Regel: Entweder der Text sagt die Wahrheit, oder die
Funktion tut, was der Text verspricht.

---

## 2. Der Hinweistext ohne bisherigen Export

Deiner ist nicht falsch, aber er sagt nicht, warum es wichtig ist:

> Du hast noch nie exportiert. Fünf Sessions sind gespeichert, und sie liegen
> nur in diesem Browser. Eine Sicherung dauert zehn Sekunden.

Der zweite Satz ist der Punkt: Die meisten Leute wissen nicht, dass eine PWA
ihre Daten lokal hält.

**Beim regulären Hinweis dieselbe Ergänzung**, aber kürzer, weil er öfter
kommt:

> Seit deinem letzten Export sind zehn Sessions dazugekommen. Sie liegen nur
> in diesem Browser.

---

## 3. Deine sechs Entscheidungen

Alle sechs bleiben. Zwei davon sind besser als meine Spec.

**Die strengere Prüfung beim Import** ist der wichtigste Fang: Dass
`{"schemaVersion":3}` den ganzen Fortschritt durch einen leeren Stand ersetzt
hätte, ist genau der Fehler, den Regel 2 verhindern soll, und meine Spec hat
ihn offengelassen.

**Das `prebuild`-Skript** macht aus Regel 4 eine echte Regel statt einer
Absichtserklärung. Dass es beim ersten Lauf gleich gegriffen hat, spricht für
sich.

**`exportSnoozedAt`** war nötig, richtig erkannt. **Die Rückfrage beim
Rückgängigmachen** ebenso: Die Sicherung liegt unbegrenzt, ein Fehltipp hätte
alles seit dem Import gelöscht. **Der Abbruch bei fehlgeschlagener Sicherung**
folgt direkt aus Regel 3.

---

## 4. Die Grenze beim Exportzeitpunkt

Dass ein abgebrochener Download als Export zählt, ist eine echte Schwäche, und
sie lässt sich im Browser nicht sauber lösen. **Bleibt so.**

Eine Abmilderung reicht: Unter dem Datum steht
> Letzter Export: 31.10.2026 (angetippt, nicht bestätigt)

Nein, zu umständlich. Stattdessen: **Das Datum bleibt wie es ist**, und der
Hinweis kommt trotzdem wieder, wenn seit dem letzten Export zehn Sessions
dazugekommen sind. Wer den Download abbricht, bekommt ihn spätestens dann
erneut.

---

## 5. Zum Testen auf dem Handy

Der Hinweis zum iOS-Download ist berechtigt. Das muss Kali einmal selbst
prüfen, und zwar in der **installierten PWA**, nicht im Safari-Tab. Dort
verhalten sich Downloads anders, und wenn es dort nicht geht, ist die
Sicherung genau für den Fall wertlos, für den sie gedacht ist.

Falls es nicht funktioniert, melde es. Dann brauchen wir einen zweiten Weg,
etwa den State als Text anzuzeigen und kopieren zu lassen.
