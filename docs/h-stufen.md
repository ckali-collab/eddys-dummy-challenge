# H-Stufen und Nachbesserungen

Der `text`-Eintrag im `path` macht das möglich, was bei H gefehlt hat. Damit
lösen sich die beiden verbliebenen Abweichungen.

---

## 1. Vor dem Commit: F Bronze

Mein Fehler. "Eine Einzelmarke" hat die Menge von drei bis fünf auf eine
gesenkt, und das war nicht beabsichtigt. Gut gesehen.

> Kartentext: 5 Einzelmarken auf der Distanz und im Gelände der heutigen Stufe.

`amount` kommt zurück: 5, mindestens 3. Fünf Apports liegen am oberen Rand
dessen, was Zvolsky empfiehlt, und das ist für eine reine Markierübung richtig.

---

## 2. H Silber: eigene Stufentexte

Die Meldung ist richtig: Das Kriterium verlangt Back, Rechts und Links, die
Stufen nennen nur Distanz und Gelände. Mit `text` im `path` geht jetzt, was
vorher nicht ging.

Die Reihenfolge folgt dem Buch: **Voran, dann Back, dann Rechts und Links.**
Die Seitenrichtungen sind für den Hund leichter, werden aber zuletzt
aufgebaut, um ihn nicht zu verwirren.

1. Back allein: Stopp, dann Arm senkrecht über den eigenen Kopf. Bis 15 Meter.
2. Eine Seite allein, immer dieselbe. Bis 30 Meter.
3. Die andere Seite allein. Bis 30 Meter.
4. Back und beide Seiten gemischt, du wählst die Richtung. Bis 30 Meter.

Die Distanzwerte des bisherigen Pfades bleiben im Hintergrund, wie bei H
Bronze.

---

## 3. H Gold: eigene Stufentexte

Die Abweichung ist kleiner, aber dieselbe: Die selbstständige Arbeit im
Suchengelände steht nur im Kriterium.

1. Einweisen auf ein Dummy, dessen Lage du kennst. Bis 30 Meter, offenes Gelände.
2. Einweisen über einen Geländewechsel. Bis 50 Meter.
3. Am Ziel das Suchensignal, er sucht von dort selbstständig. Bis 50 Meter.
4. Einweisen in ein Suchengelände, bis 80 Meter, höchstens zwei Korrekturen.

---

## 4. H Bronze: Kartentext und stepsType

**Kartentext** widerspricht Stufe 1, richtig gesehen.
> Ein Durchgang auf der heutigen Stufe: ausrichten, Handzeichen, Voran.

**`stepsType`** ist auch richtig gemeldet. Die sechs Zeilen von der
Futterschüssel bis zum Vollblind sind ein Lernweg über Wochen, kein Ablauf
eines Durchgangs.

**H Bronze bekommt `stepsType: "varianten"`.** Damit heißt die Überschrift
"Aufbau über mehrere Wochen" und der Block wandert in den Hintergrund, wie bei
A bis E. Die sichtbare Anweisung tragen jetzt die Stufen, und die sind seit
dieser Runde konkret genug dafür.

**Prüf dasselbe bei H Silber und H Gold**, sobald die neuen Stufen drin sind.
Wenn deren `steps` ebenfalls einen Lernweg beschreiben statt eines Durchgangs,
gilt dort dasselbe.

---

## 5. Zwei dünne Stellen auffüllen

**C Silber, Aufbau:** Mit einer einzigen Zeile ist er nutzlos. Drei Zeilen,
abgeleitet aus Kriterium und Stufen:

1. Erst 100 Meter am Stück auf bekanntem Weg, ohne Ablenkung.
2. Dann eine Ablenkung dazunehmen, nie zwei gleichzeitig.
3. Zuletzt mit Dummy im Fang. Das ist die schwerste Variante, weil er sich auf
   zwei Dinge gleichzeitig konzentrieren muss.

**F Gold, Kartentext:** Die vorgegebene Reihenfolge gehört in den Durchgang,
nicht nur ins Kriterium.
> Zwei Dummys im engen Winkel, auf Distanz und Gelände der heutigen Stufe.
> Reihenfolge vorgeben, bevor du schickst.

---

## 6. Zweite Seite im Profil

Richtig, das Feld ist eines. Mein Satz im Glossar wird präzisiert:

> Wer zwei Wörter nutzt, trägt beide in das Feld ein, etwa "Rechts, Links".

---

## 7. Deine vier Entscheidungen

Alle richtig.

**Die Ausrüstung bei H Bronze an die Stufen zu binden**, Futterschüssel auf
Stufe 1 und Dummy ab Stufe 2, folgt direkt aus den neuen Stufentexten. Genau
so war es gemeint.

**Die zweite Person von optional auf Pflicht** bei Stufe 3 ist richtig: Ein
Halbblind ohne zweite Person gibt es nicht.

**Die Einschränkung auf Back** bei H Silber war richtig, und mit den neuen
Stufen aus Abschnitt 2 passt der Kartentext jetzt auch dazu.

**Den Kartentext von E Silber mitzuschalten**, obwohl meine Tabelle ihn nicht
nannte, ist die Arbeitsregel aus `vier-ebenen.md` in Anwendung.

---

## 8. Der Wasser-Pfad

Die Feststellung ist richtig und wichtig: `WATER_MODULE` hat keine Levels, der
Pfad steht nur in der alten Spezifikation. **Nichts zu tun.**

Falls das Modul je gebaut wird, gilt dieselbe Lehre wie bei H Bronze: Die
Tabelle in `fundament-umbau.md` hat dort Duplikate, und die taugen nicht als
Stufentexte. Dann braucht es eigene, wie in Abschnitt 2 und 3.
