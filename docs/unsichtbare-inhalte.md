# Unsichtbare Inhalte und offene Lücken

Der Befund zu den ungenutzten Datenblöcken ist der wichtigste dieser Runde.
Er steht hier vor den Aufwärm-Lücken, obwohl die dringender sind.

---

## 1. Sieben Datenblöcke, die niemand sieht

`TROUBLESHOOTING`, `WATER_MODULE`, `EQUIPMENT_NOTES`, `PRINCIPLES`,
`SESSION_RULES`, `MIN_AGE_MONTHS`, `DUMMY_TYPES`.

**`PRINCIPLES` ist der schmerzhafteste.** Die sieben Prinzipien habe ich im
Fundament-Umbau neu geschrieben, inklusive des Satzes, der alle Zweifelsfälle
entscheidet: "Die Arbeit ist für den Hund." Er steht im Basics-Tab unter
"Einwirkung", aber die anderen sechs sind unsichtbar.

**Alle sieben gehören angezeigt, nicht gelöscht.** Vorschlag, wo:

| Block | Wohin |
|---|---|
| `PRINCIPLES` | Basics, **neuer Abschnitt "Die sieben Prinzipien"**, in der Gruppe "Wie trainiert wird", direkt nach "Worauf das Training hinarbeitet" |
| `TROUBLESHOOTING` | Basics, **neuer Abschnitt "Wenn etwas nicht klappt"**, in der Gruppe "Nachschlagen", vor dem Glossar |
| `WATER_MODULE` | in den bestehenden Abschnitt "Sicherheit am Wasser", der bisher nur aus zwei Sätzen besteht. Die Gelenkwarnung gehört unbedingt dazu |
| `EQUIPMENT_NOTES` | in "Dummys und Ausrüstung" |
| `SESSION_RULES` | in "Vor der Einheit" |
| `MIN_AGE_MONTHS` | prüfen: Die Altershinweise erscheinen im Übungsdetail, vermutlich aus einem anderen Feld. Wenn der Block doppelt ist, löschen und melden |
| `DUMMY_TYPES` | prüfen, ob `DUMMY_FACTS` ihn ersetzt hat. Wenn ja, löschen |

**Prüf beim Einbauen auf Widersprüche** zum aktuellen Stand. Diese Blöcke sind
seit Trainingskonzept v2 unberührt und stammen aus der Zeit vor dem
Fundament-Umbau. Dort stecken mit hoher Wahrscheinlichkeit Begriffe und
Zahlen, die wir seitdem korrigiert haben. **Melde jeden Widerspruch, bevor du
ihn anzeigst.** Das ist wichtiger als die Anzeige selbst.

---

## 2. Aufwärmen, jetzt vollständig

Meine letzte Spec hat nur den Vollsession-Ablauf für "deutlich" getauscht. Das
war halb. Hier alle Fälle.

### Kurzübung, Gelenkbefund "deutlich"
> Lockeres Traben, dann kontrolliertes Schrittgehen, zum Schluss ein paar
> weite Bögen. Lösen lassen, bevor es losgeht.

### Vollsession, Gelenkbefund "leicht"
Punkt 4 und 5 zusammen, damit sie sich nicht widersprechen:
> 4. Ein paar kontrollierte Galoppsprints, kurz halten.
> 5. Dann Stopps aus dem Trab und weite Wendungen, dazu ein paar
>    Konzentrations- und Gehorsamsübungen.

### Die 30-Prozent-Regel bei "deutlich"
Sie fehlt, weil mein Text sie nicht nannte. Ergänzen, wie beim Standardablauf:
> Nicht über 30 Prozent dessen gehen, was er leisten könnte: Er soll danach
> warm sein, nicht müde.

### Welpe und Senior
Berechtigter Einwand. Ein Welpe mit Galoppsprints fällt auf.

**Bei `age: "welpe"` und `age: "senior"` gilt der Ablauf für "leicht"**, auch
wenn der Gelenkbefund unauffällig ist. Begründung: Beim Welpen sind die
Wachstumsfugen offen, beim Senior ist der Knorpel abgenutzt. Das ist meine
Ableitung, nicht aus dem Buch, und sie folgt derselben Logik, mit der die App
ihr Belastungsmodell nach Alter staffelt.

**Bei `joints: "unbekannt"`** bleibt der Standardablauf, aber mit dem Zusatz:
> Wenn du den Gelenkzustand nicht kennst, lass die Galoppsprints weg, bis du
> ihn kennst.

### Die Prozentzahl in den Basics
Mein Satz war falsch, die Begründung nennt keine Prozentzahl. **Ergänzen** in
der Begründung unter "Vor der Einheit":
> Beim Aufwärmen nicht über 30 Prozent dessen gehen, was er leisten könnte.

---

## 3. Der Satz zu E Bronze: ich habe den Inhalt verändert

Berechtigt, und der Grund ist ein echter Konflikt, den ich weggekürzt habe.

**Das Original aus dem Buch:** "Zwei bis drei Apportiereinheiten mit maximal
zwei bis drei Wiederholungen in der Woche sind zu Beginn mehr als
ausreichend."

Das sind zwei Angaben: zwei bis drei **Einheiten pro Woche**, mit je zwei bis
drei **Wiederholungen**. Und zwei bis drei Wiederholungen widersprechen den
zehn Retrieves von E Bronze direkt.

**Die Auflösung ist der Geltungsbereich.** Der Buchsatz steht beim
Einstiegszeitpunkt, also beim ersten Apportiertraining nach dem Zahnwechsel.
E Bronze ist kein Welpenlevel.

> **Ganz am Anfang** reichen zwei bis drei Apportiereinheiten pro Woche mit je
> zwei bis drei Wiederholungen. Das gilt für die ersten Wochen nach dem
> Zahnwechsel. Die zehn kurzen Retrieves dieses Levels sind für einen Hund
> gedacht, der das Bringen schon kennt.

**Dasselbe bei F Bronze** mit den fünf Einzelmarken. Dort reicht der erste
Teil des Satzes plus:
> Die fünf Marken dieses Levels setzen voraus, dass er das Apportieren kennt.

---

## 4. E Gold: der Aufbau widerspricht dem Kartentext

Echter Widerspruch, richtig gefunden. Der Kartentext sagt "einzeln", der
Aufbau "Nach mehreren Apports hintereinander".

**Der Aufbau hat recht und der Kartentext auch**, sie meinen Verschiedenes:
Der Aufbau beschreibt, **wie man die Erregung herstellt** (mehrere Apports
hintereinander machen den Hund heiß), der Kartentext sagt, **wie man die
Abgabe prüft** (einzeln, nicht drei Abgaben am Stück).

**Aufbauzeile präzisieren:**
> Erregung herstellen: mehrere Apports hintereinander laufen lassen, dann die
> Abgabe prüfen. Nicht drei Abgaben am Stück verlangen.

---

## 5. Drei Formulierungen

**F Gold, Markierstab-Tipp.** Richtig, in einem Marking-Level gibt es keine
Richtungsangabe. Der Tipp gehört trotzdem dorthin, weil dort vier Stäbe
stehen:
> Mehrere Markierstäbe aufstellen, Dummy nur bei einem. Sonst lernt er, zum
> nächsten Stab zu laufen, statt sich die Fallstelle zu merken.

**Track H, "zurück".** Berechtigt, das liest sich wie "zu dir zurück".
> Den Hund auf Distanz lenken: geradeaus, weiter von dir weg, zur Seite, und
> auf ein Dummy, das er nicht gesehen hat.

"In die Tiefe" ist der Glossarbegriff und bleibt dort, aber in einer
Trackbeschreibung versteht ihn niemand, der ihn nicht schon kennt.

**E Silber, Equipment bei Junghund und Welpe.** Der Fall bleibt offen: Stufe 1
sagt 500 Gramm, das Equipment zeigt 200. **Das Level bekommt eine feste
Gewichtsangabe** statt der profilabhängigen, weil das Gewicht dort die Übung
ist. Bei Welpen und Junghunden erscheint zusätzlich:
> Dieses Level setzt voraus, dass er das Standarddummy tragen kann. Wenn nicht,
> bleib bei Bronze.

---

## 6. Deine Entscheidungen

Alle drei übernommen. **Die Satzstellung in den Kartentexten einzuarbeiten
statt anzuhängen** war richtig, angehängte Zusätze klingen immer wie
nachträglich drangeklebt. Genau so weiter.
