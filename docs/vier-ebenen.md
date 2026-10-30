# Die vier Ebenen eines Levels

Die Meldungen zeigen zum dritten Mal dasselbe Muster: Ich ändere eine Ebene,
die anderen bleiben stehen. Erst war es Vorsitzen, dann die Fabrikationen,
jetzt die Kriterien. Deshalb steht am Anfang eine Arbeitsregel und erst danach
die Korrekturen.

---

## 0. Arbeitsregel ab jetzt

Ein Level hat **vier Textebenen**, und jede Änderung an einer verlangt eine
Prüfung der anderen drei:

| Ebene | Feld | Frage |
|---|---|---|
| Kriterium | `criteria` | Wann gilt das Level als geschafft? |
| Kartentext | `run` | Was mache ich in diesem einen Durchgang? |
| Stufen | `conditionPath` / `path` | Welche Situation ist heute dran? |
| Aufbau | `steps` | Wie baue ich das über Wochen auf? |

**Wenn eine Spec eine Ebene ändert und zu den anderen nichts sagt, prüfe sie
trotzdem und melde die Abweichungen.** Das gilt auch, wenn mein Text sie nicht
erwähnt. Ich habe es dreimal übersehen, und du hast es dreimal gefunden.

Dazu die Regel, die ich in `kriterien-und-stufen.md` zu knapp formuliert habe:

> **Das Kriterium nennt die schwierigste Situation des Levels und die
> Zählregel. Es darf weitere Stufen nennen, aber keine Situation, die in
> keiner Stufe vorkommt.**

---

## 1. Kriterien, die Stufe 4 nicht nennen

Alle vier Meldungen sind berechtigt.

**B Gold**
> Kommt auf das erste Signal, auch wenn andere Hunde spielen, bei
> Wildwitterung, wenn er dich zeitweise nicht sieht und bei Wind von vorn.
> Drei Durchgänge an verschiedenen Tagen.

**D Silber**
> Hält den Sitz, wenn zwei Dummys fliegen, wenn eine zweite Person wirft, wenn
> du das Dummy selbst holst und wenn ihr in Bewegung seid. Drei Durchgänge.

**E Gold**
> Saubere Abgabe bei hoher Erregung: mit nassem Dummy aus dem Wasser, mit
> einem sperrigen Gegenstand, wenn ein zweites Dummy bereitliegt und wenn
> Zuschauer dabei sind. Drei Durchgänge.

**D Gold**
> Bleibt bei Fuß, wenn aus der Bewegung ein Dummy fliegt, auch wenn eine
> zweite Person zuerst arbeitet, ein lautes Signal fällt und ihr in
> unbekanntem Gelände seid. Drei Durchgänge.

---

## 2. Kartentexte, die den neuen Kriterien widersprechen

Der Kartentext sagt, was in **einem** Durchgang zu tun ist. Er darf die
Situation nicht festlegen, das macht die Stufe.

| Level | alt | neu |
|---|---|---|
| A Silber | 4 saubere Stopps auf 25 Meter | 4 saubere Stopps in der Situation der heutigen Stufe. |
| C Silber | mit mindestens 4 Tempowechseln und 2 Kehrtwendungen | 100 Meter am Stück in der Situation der heutigen Stufe. |
| E Gold | nach langem Retrieve, nach Wasser und nach Mehrfachmarke | 3 Retrieves in der Situation der heutigen Stufe. |
| D Bronze | danach Apport | danach schickst du ihn. |

**Dazu der Aufbau:**
- **A Silber** nennt im Aufbau noch 25 Meter. Auf **35 Meter** ändern, passend
  zu Kriterium und Stufe 3.
- **E Gold** nennt im Aufbau "Nach Mehrfachmarken". Ersetzen durch **"Nach
  mehreren Apports hintereinander"**. Damit ist der erfundene Begriff überall
  weg.

**Prüfaufgabe:** Geh alle Kartentexte durch und melde die, die eine Situation
oder eine Zahl festlegen, die in den Stufen anders steht. Nach der Arbeitsregel
oben gehört das ab jetzt zu jeder Änderung, aber dieser eine Durchgang holt
nach, was liegen geblieben ist.

---

## 3. Die übrigen Punkte

### Glossareintrag für das Aus-Signal
Fehlt, richtig. Nach dem Eintrag "Freigabe-Signal" einfügen:

```
Aus-Signal, Dummy abgeben  {signal.release_dummy}

Fordert den Hund auf, das Dummy loszulassen. Nicht zu verwechseln mit dem
Freigabe-Signal, das die ganze Übung beendet: Nach dem Aus-Signal bleibt der
Hund in der Arbeit.
Verbreitet ist "Aus". Wer das Dummy ohne eigenes Signal abnimmt, trägt im
Profil nichts ein, dann erscheint die Zeile nicht.
`Praxis`
```

### H Silber: "Rüber" gegen Rechts und Links
Kein Widerspruch, aber erklärungsbedürftig. Das Glossar sagt es bereits: Oft
wird **dasselbe Wort für beide Seiten** benutzt, weil der Arm die Richtung
trägt.

**Ergänzung im Kriterium von H Silber**, nach dem ersten Satz:
> Das Wort ist für beide Seiten dasselbe, die Richtung zeigt der Arm. Wer zwei
> Wörter nutzt, trägt sie im Profil ein.

### "Hindernis aufstellen" in Basics und Glossar
Das bleibt. Es ist Buchinhalt: Der Rollzaun ist ein echtes Trainingsmittel, und
der Text beschreibt ihn. Gestrichen war nur der Checklistenpunkt, der von
keinem Level ausgelöst wird. Wenn später ein Level mit Hindernis dazukommt,
kommt der Punkt zurück.

### DIRECTION_NOTE
Prüf, ob ihr Inhalt im Basics-Abschnitt "Handzeichen" steht. Wenn ja,
**streichen** wie `WHISTLES` und `COMMANDS`. Wenn nein, melde den Text, dann
entscheide ich, wo er hingehört.

---

## 4. Deine sechs Entscheidungen

Alle sechs waren richtig, nichts davon nehme ich zurück.

**`release_dummy` statt `release`** war der wichtigste Fang. Meine Tabelle hat
die Freigabe der Übung mit dem Loslassen des Dummys verwechselt, obwohl ich
drei Absätze später selbst die richtige Zeile eingeführt habe.

**Die Bezeichnungen der Signalzeile** aus dem Glossar zu nehmen war richtig.
"Positionssignal" und "Signal zum Dummy abgeben" passen.

**C Gold Stufe 3 mitzubinden**, obwohl ich nur D Silber genannt hatte, ist
genau die Arbeitsweise aus Abschnitt 0. Mach das weiter so.

**Die Verb-Ergänzung**, die Kategorie-Änderung bei C Gold und der Zusatz zur
zweiten Seite sind alle drei korrekt.
