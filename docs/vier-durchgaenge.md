# Vier Durchgänge, vier Stufen

---

## 1. Der Logikfehler

Dein Befund ist richtig und wiegt schwer. Nachgerechnet:

| Session | Ziel | Bewertung | danach |
|---|---|---|---|
| 1 | Stufe 1 | gut | Zähler 1, Stufe 2 |
| 2 | Stufe 2 | gut | Zähler 2, Stufe 3 |
| 3 | Stufe 3 | gut | Zähler 3, Stufe 4, **fertig** |

**Stufe 4 wurde nie trainiert.** Das Level gilt als geschafft, obwohl sein
Kriterium genau die Situation von Stufe 4 beschreibt. Bei F Silber fehlt damit
die Wasserstufe, wegen der die Distanz dort festgelegt ist. Bei A Bronze
fehlen die 25 Meter, die im Kriterium stehen.

Der Fehler steckt in meiner eigenen Spezifikation. Ich hatte geschrieben:
"Start auf Schritt 1, dreimal gut, Ende auf Schritt 4 mit Zähler 3" und dabei
"erreicht" mit "trainiert" verwechselt.

---

## 2. Die Lösung: vier Durchgänge

Deine Empfehlung, umgesetzt als saubere Regel statt als Sonderfall.

**Ein Level braucht vier Durchgänge mit "gut", einen pro Stufe.** Der vierte
findet auf Stufe 4 statt, danach ist das Level fertig.

| Session | Ziel | Bewertung | danach |
|---|---|---|---|
| 1 | Stufe 1 | gut | Zähler 1, Stufe 2 |
| 2 | Stufe 2 | gut | Zähler 2, Stufe 3 |
| 3 | Stufe 3 | gut | Zähler 3, Stufe 4 |
| 4 | Stufe 4 | gut | Zähler 4, **fertig** |

**Was mitzieht:**
- Alle Kriterien: "Drei Durchgänge" wird **"Vier Durchgänge"**, "an drei
  verschiedenen Tagen" wird "an vier verschiedenen Tagen".
- Der Zähler: `reps` von 3 auf 4, die Anzeige "0/3" wird "0/4".
- Die Trophäentexte, soweit sie Zahlen nennen.
- `reps: 3` in den Leveldaten.

**Was nicht mitzieht:** Die Migration. Wer ein Level bereits abgeschlossen
hat, behält es abgeschlossen. `completedAt` bleibt die Wahrheit, nicht der
Zähler. Das war bei der letzten Zählerumstellung schon die Regel und gilt
weiter.

Vier Tage statt drei pro Level bedeutet bei 24 Leveln und zwei Einheiten pro
Woche knapp ein Jahr. Das ist für Dummytraining bis Gold realistisch und kein
Argument dagegen.

**Mit "Das kann er schon"** springt die Stufe weiter, ohne zu zählen. Wer eine
Stufe überspringt, braucht entsprechend weniger "gut", kann das Level aber nie
ohne einen "gut" auf Stufe 4 abschließen. Das ist richtig so.

---

## 3. "Gut" braucht eine Erklärung

Deine zweite Frage hängt daran, und die Antwort löst beides.

Der Satz "zwischen zwei Stufen liegen oft mehrere Einheiten" **stimmt**, aber
nur, wenn der Nutzer versteht, wann er "gut" vergibt. Der Mechanismus ist
schon da: "okay" lässt Zähler und Stufe stehen. Man kann beliebig oft auf
einer Stufe üben, bis es sitzt.

Was fehlt, ist die Bedeutung der drei Bewertungen. **Als Hinweis über den
Bewertungsknöpfen:**

> **gut** heißt: Diese Stufe sitzt, wir können weiter.
> **okay** heißt: Hat geklappt, aber noch nicht sicher. Dieselbe Stufe noch
> einmal.
> **noch nicht** heißt: War zu schwer. Eine Stufe zurück.

Das ist der Satz, der bisher fehlt, und er macht aus dem Zähler eine
Qualitätsaussage statt einer Anwesenheitsliste.

---

## 4. Die vier kleineren Punkte

**"Dann die Entfernung wieder heran":** Unklar, richtig.
> ... erst das Gelände schwerer machen und die Entfernung verkürzen, dann die
> Entfernung über mehrere Einheiten wieder verlängern.

**F Bronze, "Bleib unter den fünf Marken" neben "Maximal drei bis fünf
Würfe":** Der Hinweis wird konkret.
> Ganz am Anfang reichen zwei bis drei Apportiereinheiten pro Woche mit je
> zwei bis drei Würfen. Die fünf Marken sind das Ziel dieses Levels.

**Anfängerhinweise nur auf der Detailseite:** Richtig, der Heute-Tab sagt dem
Anfänger weiter "10 kurze Retrieves". **Bei `experience: "keine"` erscheint
der Hinweis zusätzlich im HEUTE-Block**, gekürzt:
> Ganz am Anfang reichen zwei bis drei Wiederholungen. Die zehn sind das Ziel.

**Wartezeit bei G Silber und Gold:** Mit Prinzip 3 ist der Widerspruch weg,
aber unerklärt. Die Meilenstein-Erklärung deckt sie mit ab, wenn sie
allgemeiner formuliert ist:
> ... Distanz, Gelände und Wartezeit steigern sich über die Stufen hinweg.
> Wo einmal zwei zugleich steigen, liegen zwischen den Stufen mehrere
> Einheiten, in denen du die Regel einhältst.

---

## 5. Deine Korrektur

Dass Track E "von Anfang an" nicht sichtbar ist, nehme ich zur Kenntnis. Gut,
dass du die eigene frühere Meldung korrigierst, statt sie stehen zu lassen.

Die Troubleshooting-Prüfung steht bei mir noch aus. Der Block bleibt
verborgen, bis sie durch ist.
