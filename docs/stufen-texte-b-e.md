# Stufentexte für Track B bis E

Dieselbe Umstellung wie bei Track A (`track-a-stufen.md`): Jeder Stufentext
nennt Ausgangslage, Signal und erwartete Reaktion, sodass draußen niemand
nachschlagen oder raten muss. Dazu die Nacharbeit, die sich daraus ergibt:
`run` wird konkret, `steps` wird auf das reduziert, was keine Stufe sagt.

Grundlage: `src/data/training.js` im Stand `a145c29`, `track-a-stufen.md`,
`aufbau-pruefung.md`.

---

## 1. Was sich ändert, und warum

Heute stehen in den Stufen von B bis E nur Bedingungen: „Ein Mensch steht oder
geht in der Nähe." Daraus geht nicht hervor, was zu tun ist. Wie weit ist der
Hund weg? Rufe ich ihn? Was soll er tun? Das ist genau der Punkt, der beim
Stopp-Pfiff aufgefallen ist.

Vier Ebenen müssen widerspruchsfrei sein (`vier-ebenen.md`). Nach der
Umstellung tragen sie:

- **conditionPath** — was heute, auf dieser Stufe, zu tun ist. Vollständig.
- **criteria** — woran der Abschluss des ganzen Levels gemessen wird.
- **run** — wie oft, und was den Durchgang umschließt (Lob, Freigabe, Pause).
- **steps** — nur noch das, was in keiner Stufe steht.

Das Ergebnis: In **zehn von zwölf Leveln wird `steps` leer**. Der Ablauf, der
dort bisher stand, ist jetzt im Stufentext, wo er beim Rausgehen gebraucht
wird. Nur **D Bronze** (Variante verspätetes Schicken) und **E Bronze** (der
Griff bei der Abgabe) behalten Schritte, weil die in jeder Stufe gleich sind
und zu kleinteilig für den Stufentext wären.

`steps: []` ist sicher: `LevelDetail.jsx` Zeile 267 rendert den Block bei
Tracks mit `axis: "bedingungen"` nur, wenn `level.steps.length > 0`.

**Schrittangaben:** Ein Schritt sind 75 cm, wie in `DISTANCE_STEPS`
(15 m / 20 Schritte), gerundet auf den nächsten Fünfer — dieselbe Rechnung,
die die Tabelle selbst anwendet (50 m / 65, 80 m / 105). Daraus:
20 m = rund 25 Schritte, 40 m = rund 55, 50 m = rund 65, 100 m = rund 135.

---

## 2. Drei Korrekturen, die über das Muster hinausgehen

### 2.1 C Silber trägt den falschen Titel

Der Titel lautet „Tempo- und Richtungswechsel". Die vier Stufen handeln aber
von Dummys am Weg, unbekanntem Gelände, Menschen und dem Tragen eines Dummys.
Tempo- und Richtungswechsel sind C **Bronze**, Stufen 2 und 3. Auch `criteria`
sagt nichts von Tempo oder Richtung, sondern „Bleibt 100 Meter am Stück bei
Fuß".

**Neuer Titel: „100 Meter unter Ablenkung".**

### 2.2 B Gold ist nach Schwierigkeit absteigend sortiert

Heute: 1 spielende Hunde, 2 Wildwitterung, 3 Wald außer Sicht, 4 Wind von
vorn. Die Stufen sollen aufsteigen, hier fallen sie ab. Wind und Deckung
kosten Hörbarkeit, dagegen hilft Lautstärkereserve (der Pfeif-Tipp im selben
Level nennt genau das). Spiel und Wildwitterung kosten Motivation, dagegen
hilft keine Lautstärke. Darum stehen sie hinten.

*Korrigiert nach der Umsetzung: Die erste Fassung begründete die Reihenfolge
damit, dass Wind für einen Pfiff kaum ein Hindernis sei. Das widersprach dem
Pfeif-Tipp, der Wind ausdrücklich als Grund für Reserve nennt.*

**Neue Reihenfolge: 1 Wind, 2 Wald, 3 spielende Hunde, 4 Wildwitterung.**

### 2.3 D Silber: die Reihenfolge erzeugt den Widerspruch

`aufbau-pruefung.md` hat festgestellt, dass Stufen und Schritte
Gegensätzliches sagen: Das zweite Dummy kommt in den Stufen auf Stufe 1, in
den Schritten erst am Ende. Die Ursache ist die Stufenreihenfolge. Ein
zweiter Werfer ist leichter als zwei fliegende Dummys, weil der Hund bei dir
bleibt und du nichts tust.

**Neue Reihenfolge: 1 zweite Person wirft, 2 zwei Dummys, 3 du holst selbst,
4 aus der Bewegung.**

### Folge für gespeicherte Fortschritte

2.2 und 2.3 verschieben die Bedeutung der gespeicherten Stufennummer. Wer bei
B Gold auf Stufe 2 steht, steht nach der Änderung inhaltlich woanders.
`doneAt` bleibt die Wahrheit für abgeschlossene Level, betroffen sind nur
angefangene. Bei zwei Gold- beziehungsweise Silberleveln, die Eddy noch nicht
erreicht hat, halte ich das für vertretbar. Wenn du das anders siehst, bleiben
die Reihenfolgen und nur die Texte werden ersetzt.

---

## 3. Track B — Rückruf

### B Bronze — „Rückruf aus ruhiger Situation"

`conditionPath` neu:

1. `ort` — „Im Garten oder auf einer eingezäunten Fläche. Der Hund läuft frei etwa 20 Meter von dir weg, rund 25 Schritte. Du gibst den Rückruf-Pfiff. Er kommt in gerader Linie und bleibt vor dir stehen."
2. `ort` — „Auf einer bekannten Wiese, keine anderen Hunde in Sicht. Der Hund läuft frei auf etwa 20 Meter. Du gibst den Rückruf-Pfiff. Er kommt in gerader Linie, ohne unterwegs zu schnüffeln."
3. `verleitung` — „Ein Mensch steht oder geht etwa 20 Meter entfernt. Der Hund läuft frei auf etwa 20 Meter. Du gibst den Rückruf-Pfiff. Er kommt zu dir, ohne zu dem Menschen abzubiegen."
4. `position` — „Der Hund läuft frei auf etwa 20 Meter. Du drehst dich von ihm weg und gibst den Rückruf-Pfiff, ohne ihn anzusehen. Er kommt und bleibt vor dir stehen."

`steps`: `[]` — Freilaufen, Pfiff und Ankommen stehen jetzt in den Stufen, Lob
und Freigabe in `run`.

`run`, `criteria`, `trophy`, `tips`: unverändert.

### B Silber — „Rückruf aus der Beschäftigung"

`conditionPath` neu:

1. `ort` — „In einem Gelände, in dem ihr noch nie wart. Der Hund läuft frei etwa 40 Meter von dir weg, rund 55 Schritte. Du gibst den Rückruf-Pfiff. Er kommt sofort und in gerader Linie."
2. `verleitung` — „Ein fremder Hund ist in Sichtweite und angeleint. Der Hund läuft frei auf etwa 40 Meter. Du gibst den Rückruf-Pfiff. Er kommt, ohne zu dem anderen Hund abzubiegen."
3. `ausgang` — „Der Hund schnüffelt auf etwa 40 Meter mit der Nase am Boden. Du gibst den Rückruf-Pfiff. Er hebt den Kopf und kommt sofort."
4. `ausgang` — „Der Hund rennt frei auf etwa 40 Meter umher. Du gibst den Rückruf-Pfiff mitten in der Bewegung. Er dreht ab und kommt direkt zu dir."

`run` neu: „5 Rückrufe auf 40 Meter, jeder mit Lob und Freigabe, über die
Einheit verteilt, dazwischen normal weitergehen."
(bisher: „in der Situation der heutigen Stufe")

`steps`: `[]`

`tips` neu — der bisherige Schritt 4 ist der Fehlerfall und zu wertvoll zum
Streichen:

```
"Niemals zweimal pfeifen.",
"Kommt er nicht: hingehen, ruhig holen, keine Strafe. Den nächsten Versuch leichter machen, näher oder mit weniger Ablenkung.",
LEISE_PFEIFEN,
```

### B Gold — „Rückruf unter sozialer Ablenkung"

`conditionPath` neu, in der neuen Reihenfolge aus 2.2:

1. `wetter` — „Bei Wind von vorn, der den Schall wegträgt. Der Hund läuft frei auf etwa 40 Meter. Du gibst den Rückruf-Pfiff, leise wie immer. Er kommt sofort."
2. `ort` — „Im Wald. Der Hund ist frei und zeitweise hinter Bewuchs, sodass er dich nicht sieht. Du gibst den Rückruf-Pfiff, ohne dich zu bewegen. Er kommt."
3. `verleitung` — „Zwei oder mehr Hunde spielen in Sichtweite, dein Hund spielt mit. Du gibst den Rückruf-Pfiff. Er löst sich aus dem Spiel und kommt zu dir."
4. `verleitung` — „Der Hund hat frische Wildwitterung aufgenommen und arbeitet mit der Nase. Du gibst den Rückruf-Pfiff. Er bricht ab und kommt."

`criteria` neu — nennt die Stufen in der neuen Reihenfolge:
„Kommt auf das erste Signal, auch bei Wind von vorn, wenn er dich im Wald
zeitweise nicht sieht, aus dem Spiel mit anderen Hunden und aus frischer
Wildwitterung. Vier Durchgänge an verschiedenen Tagen."

`run` neu: „Ein einziger Rückruf, danach wieder freigeben und weiterspielen
lassen."

`steps`: `[]` — die bisherigen vier Schritte sind der Aufbau **einer** Stufe,
nicht des Levels. `aufbau-pruefung.md` hatte das offen gelassen; damit ist es
geklärt. Sie wandern als ein Tipp mit Stufenbezug nach `tips`.

`tips` neu:

```
"Niemals zweimal pfeifen.",
"Die Spielstufe baust du über mehrere Einheiten auf: erst aus großer Distanz belohnen, wenn er von selbst zu dir schaut, dann Rückruf in Sichtweite, aber außerhalb des Spiels, dann näher heran, zuletzt aus dem Spiel heraus. Eine Stufe weiter erst nach fünf schnellen Reaktionen in Folge.",
"Nach einer langsamen Reaktion darf er nicht sofort zur Ablenkung zurück. Sonst lernt er, dich auszusitzen.",
"Übe lieber mit Hunden, deren Halter du kennst und die auf Zuruf abrufbar sind, als mit fremden Hunden im Park.",
LEISE_PFEIFEN,
```

---

## 4. Track C — Fuß

### C Bronze — „50 Meter ohne Ziehen"

`conditionPath` neu:

1. `haltung` — „Eine gerade Strecke von 50 Metern, rund 65 Schritte. Der Hund geht ohne Leine in der Fußposition, etwa auf Kniehöhe. Gleichmäßiges Tempo, keine Wendungen."

„etwa auf Kniehöhe" steht wörtlich so im Glossar unter Fußarbeit. „In der
Fußposition" statt „links neben dir", damit die Glossarverlinkung greift und
7.1 die zweite Seite ergänzen kann.
2. `haltung` — „Dieselben 50 Meter, aber mit Wendungen: zweimal rechts, zweimal links, einmal kehrt. Der Hund bleibt in der Position, auch in der Kehrtwendung."
3. `haltung` — „50 Meter mit Tempowechsel: etwa 15 Schritte langsam, 15 normal, 15 zügig, dann wieder normal. Der Hund passt sein Tempo an, ohne vorzuziehen oder zurückzufallen."
4. `haltung` — „50 Meter mit zwei bis drei Halts. Du bleibst stehen und sagst nichts. Der Hund setzt sich von selbst neben dir."

`run` neu: „2 bewusste Fuß-Phasen à 50 Meter, jeweils mit dem Fuß-Signal
angekündigt und mit der Freigabe beendet."

`steps`: `[]`

`tips` neu:

```
"Kurze Phasen, dafür sauber. Nicht den ganzen Spaziergang.",
"Wenn er vorzieht: stehen bleiben und warten, bis er zurückkommt. Kein Kommentar.",
```

### C Silber — „100 Meter unter Ablenkung" (Titel neu, siehe 2.1)

`conditionPath` neu:

1. `verleitung` — „Eine Strecke von 100 Metern, rund 135 Schritte. Zwei Dummys liegen sichtbar am Weg. Der Hund geht ohne Leine bei Fuß daran vorbei, ohne sie anzusteuern."
2. `ort` — „100 Meter in einem Gelände, in dem ihr noch nie wart. Der Hund geht ohne Leine bei Fuß, ohne zu erkunden."
3. `verleitung` — „100 Meter auf einem Weg, auf dem Menschen stehen oder vorbeigehen. Der Hund bleibt in der Position und geht nicht zu ihnen."
4. `gegenstand` — „100 Meter, der Hund trägt dabei ein Dummy im Fang. Er bleibt in der Position und behält das Dummy, bis du es abnimmst."

`run` neu: „100 Meter am Stück, einmal."

`steps`: `[]` — Schritt 1 („erst ohne Ablenkung") widersprach Stufe 1, in der
Dummys am Weg liegen. Er wird zum Tipp und damit optional, statt die Stufe zu
überschreiben.

`tips` neu:

```
"Unvorhersehbar sein. Das erzeugt Aufmerksamkeit.",
"Wenn 100 Meter am Stück für ihn neu sind: erst einmal auf bekanntem Weg ohne Ablenkung gehen, bevor du mit Stufe 1 beginnst.",
"Stufe 4 ist die schwerste, weil er sich auf zwei Dinge gleichzeitig konzentrieren muss: die Position und das Dummy im Fang.",
"Er soll dich beobachten, nicht nur nebenher laufen.",
```

### C Gold — „Automatisches Sitzen unter Ablenkung"

`conditionPath` neu:

1. `verleitung` — „Fremde Hunde sind in Sichtweite. Ihr geht bei Fuß. Du bleibst stehen und sagst nichts. Der Hund setzt sich von selbst neben dir."
2. `verleitung` — „Ihr geht bei Fuß. Du wirfst ein Dummy nach vorn und bleibst stehen, ohne etwas zu sagen. Der Hund setzt sich von selbst und bleibt sitzen."
3. `ort` — „Eine zweite Person geht neben euch her und führt einen Hund oder trägt Dummys. Du bleibst stehen und sagst nichts. Der Hund setzt sich von selbst."
4. `verleitung` — „Ein Radfahrer oder Jogger kommt vorbei. Du bleibst stehen und sagst nichts. Der Hund setzt sich von selbst und bleibt sitzen, bis die Person vorbei ist."

`run` neu: „5 Halts über die Einheit verteilt. Er setzt sich jedes Mal ohne
Kommando."

`steps`: `[]`

`tips` neu:

```
"Das ist gleichzeitig die Basis für Walk-up in Track D.",
"An belebteren Wegen üben, dort kommen die Ablenkungen von selbst.",
"Auch wenn die Ablenkung kommt: nichts sagen. Das Sitzen soll seine Entscheidung sein, nicht deine Ansage.",
```

---

## 5. Track D — Steadiness

### D Bronze — „Warten nach dem Wurf"

`conditionPath` neu — die Wartezeiten standen schon drin, jetzt mit
Ausgangslage und Abschluss:

1. `verleitung` — „Der Hund sitzt ohne Leine in der Fußposition. Du lässt ein Dummy neben dir fallen und sagst nichts. Er bleibt 3 Sekunden sitzen, dann schickst du ihn."
2. `verleitung` — „Der Hund sitzt ohne Leine in der Fußposition. Du wirfst ein Dummy wenige Meter weit und sagst nichts. Er bleibt 5 Sekunden sitzen, dann schickst du ihn."
3. `verleitung` — „Der Hund sitzt ohne Leine in der Fußposition. Du wirfst ein Dummy so weit du kannst und sagst nichts. Er bleibt 8 Sekunden sitzen, dann schickst du ihn."
4. `position` — „Der Hund sitzt ohne Leine in der Fußposition. Du wirfst ein Dummy, gehst dann zwei Schritte von ihm weg und sagst nichts. Er bleibt 8 Sekunden sitzen, dann schickst du ihn."

`run` neu: „4 Würfe nacheinander, dazwischen kurz freigeben."
(die Wartezeit steht jetzt in der Stufe)

`steps` neu — **bleibt**, aber nur die echte Variante. Der bisherige Schritt 4
(„schrittweise auf 5 und 8 Sekunden steigern") wiederholte die Stufen 1 bis 3
und fällt weg:

```
"Variante verspätetes Schicken: Hund setzen, Dummy etwa 10 Meter vor ihm werfen lassen, dann mit dem Hund weitere 20 Meter gehen, setzen, und von dort schicken.",
```

`stepsType`: `"varianten"` — passt jetzt zum Inhalt.

### D Silber — „Warten bei Bewegung und zweitem Dummy"

`conditionPath` neu, in der neuen Reihenfolge aus 2.3:

1. `verleitung` — „Der Hund sitzt ohne Leine in der Fußposition. Eine zweite Person wirft ein Dummy, nicht du. Er bleibt sitzen, bis du ihn schickst."
2. `verleitung` — „Der Hund sitzt ohne Leine in der Fußposition. Du wirfst zwei Dummys nacheinander in verschiedene Richtungen. Er bleibt sitzen, bis du ihn für das erste schickst."
3. `position` — „Der Hund sitzt ohne Leine. Du wirfst ein Dummy, gehst hin und holst es selbst. Er bleibt die ganze Zeit sitzen und wird nicht geschickt."
4. `ausgang` — „Ihr geht bei Fuß. Aus der Bewegung wirfst du ein Dummy nach vorn. Der Hund setzt sich von selbst und bleibt sitzen, bis du ihn schickst."

`criteria` neu, in der neuen Reihenfolge:
„Hält den Sitz, wenn eine zweite Person wirft, wenn zwei Dummys nacheinander
fliegen, wenn du das Dummy selbst holst und wenn das Dummy aus der Bewegung
fliegt. Vier Durchgänge."

`run` neu: „4 Wiederholungen nacheinander, dazwischen kurz freigeben."

`steps`: `[]` — die drei Schritte zum Weggehen sind der Aufbau von Stufe 3 und
wandern als Tipp dorthin.

`gear` neu: `[{ id: "dummy", n: 2 }]` — **der Markierstab fällt weg.** Er kam
nur im bisherigen Schritt 3 vor, und dort in einer Rolle, die der Text selbst
einschränken musste („markiert hier deinen Weg, nicht ein Ziel für den Hund").
Für Stufe 3 reicht es, hinzugehen und das Dummy zu holen. Ein Gegenstand
weniger in der Packliste.

`tips` neu:

```
"Stufe 2 ist die direkte Vorbereitung auf Doppelmarken in Track F.",
"Stufe 3 baust du in kleinen Schritten auf: erst ein Schritt zur Seite, dann vier bis fünf Schritte weg, dann der ganze Weg bis zum Dummy. Nicht beim ersten Mal den ganzen Weg gehen.",
```

### D Gold — „Standruhe in Verbindung mit Markieren (Walk Up)"

`conditionPath` neu:

1. `verleitung` — „Ihr geht zu zweit nebeneinander, der Hund frei bei Fuß. Ein Dummy fliegt, ihr bleibt stehen, der Hund setzt sich ohne Signal. Die zweite Person holt das Dummy oder schickt ihren Hund. Dein Hund bleibt sitzen und sieht zu."
2. `ausgang` — „Ihr geht zu zweit nebeneinander weiter, ohne anzuhalten. Aus der Bewegung fliegt ein Dummy. Der Hund setzt sich von selbst, während ihr stehen bleibt."
3. `verleitung` — „Ihr geht zu zweit. Ein lautes Signal oder ein Schuss fällt, erst danach fliegt das Dummy. Der Hund setzt sich und bleibt sitzen."
4. `ort` — „Dasselbe in einem Gelände, in dem ihr noch nie wart, mit Menschen und Betrieb. Der Hund setzt sich, wenn das Dummy fliegt, und bleibt bei Fuß sitzen."

`run` neu — macht die 80/20-Regel aus den Tipps zur Anweisung:
„Vier Durchgänge. In höchstens einem davon wird er geschickt, die anderen
Dummys holst du oder die zweite Person."

`steps`: `[]` — der bisherige Ablauf steht jetzt in den Stufen, Schritt 5
(„Steigerung: Schuss statt Zuruf") ist Stufe 3.

`tips`: unverändert.

---

## 6. Track E — Abgabe

### E Bronze — „In die Hand, ohne Ablegen"

`conditionPath` neu — `lightOnly` auf Stufe 1 bleibt:

1. `gegenstand`, `lightOnly: true` — „Mit dem Welpendummy, 200 Gramm. Du wirfst es etwa 10 Meter weit und schickst ihn. Er bringt es bis in deine Hand und legt es nicht ab."
2. `gegenstand` — „Mit dem Juniordummy, 400 Gramm. Du wirfst es etwa 10 Meter weit und schickst ihn. Er bringt es bis in deine Hand und legt es nicht ab."
3. `belohnung` — „Mit dem Juniordummy. Du hast kein Leckerchen in der Hand, wenn er ankommt. Er gibt trotzdem bis in die Hand ab, das Lob kommt erst danach."
4. `position` — „Mit dem Juniordummy. Er kommt an und gibt im Stehen direkt vor dir ab, ohne sich hinzusetzen und ohne abzulegen."

`steps` neu — **bleibt**, ohne den bisherigen Schritt 1 („maximal 10 Meter"),
der jetzt in jeder Stufe steht. Was übrig bleibt, ist der Griff bei der
Abgabe: in allen vier Stufen gleich und zu kleinteilig für den Stufentext:

```
"Sobald er zurückkommt: nicht stehen bleiben, sondern ein paar Schritte rückwärts gehen. Das zieht ihn bis an dich heran.",
"Dummy ruhig abnehmen, eine Hand von unten unter das Kinn.",
"Nicht sofort wegnehmen. Kurz halten, loben, dann abnehmen.",
```

`stepsType` neu: `"ablauf"` — das ist der Ablauf jeder einzelnen Abgabe, nicht
eine Auswahl von Varianten.

`run`, `criteria`, `trophy`, `todayNote`, `tips`: unverändert.

### E Silber — „Sitzen bei der Abgabe"

`conditionPath` neu:

1. `gegenstand` — „Mit dem Standarddummy, 500 Gramm. Du wirfst es und schickst ihn. Er bringt es bis in deine Hand."
2. `gegenstand` — „Mit einem Felldummy. Du wirfst es und schickst ihn. Er bringt es bis in deine Hand, ohne zu knautschen."
3. `position` — „Er kommt mit dem Dummy zurück, geht an dir vorbei in die Fußposition und setzt sich dort. Von dort gibt er ab."
4. `ausgang` — „Er sitzt in der Fußposition und hält das Dummy, bis du das Aus-Signal gibst. Vorher wartest du ein paar Sekunden."

Die Wendung „bis du das Aus-Signal gibst" steht hier wörtlich, weil
`withDummySignal` in `steps.js` genau diese Zeichenkette ersetzt, wenn im
Profil kein Aus-Signal eingetragen ist. Eine Umformulierung würde den
Fallback aushebeln.

`steps`: `[]`

`tips` neu — Schritt 1 war eine Voraussetzung, Schritt 3 eine Übung, beide
gehören nicht in einen Ablauf:

```
"Erst anfangen, wenn Bronze sicher sitzt.",
"Geduld aufbauen: Wenn er in der Fußposition sitzt, gehst du ein paar Schritte rückwärts, kommst zurück und nimmst erst dann ab.",
"Hier sind es fünf, nicht zehn: Die Distanz ist nicht mehr begrenzt, und schwere oder ungewohnte Gegenstände kosten Kraft und Konzentration.",
"Nie hetzen. Die Ruhe bei der Abgabe überträgt sich.",
```

### E Gold — „Abgabe unter Erregung"

Die Erregung ist der Kern dieses Levels und stand bisher nur in `run` und in
Schritt 4. Jetzt steht sie in der Stufe:

`conditionPath` neu:

1. `gegenstand` — „Mit einem nassen Dummy. Lass ihn vorher zwei bis drei Apports laufen, damit die Erregung hoch ist. Dann wirfst du das nasse Dummy und schickst ihn. Er bringt es bis in die Hand und gibt sauber ab."
2. `gegenstand` — „Mit einem sperrigen oder ungewohnten Gegenstand, wieder nach zwei bis drei Apports. Er bringt ihn bis in die Hand, ohne unterwegs abzulegen oder neu zu fassen."
3. `verleitung` — „Ein zweites Dummy liegt sichtbar in Sichtweite. Du schickst ihn auf das erste. Er bringt es bis in die Hand, ohne zum zweiten zu wechseln."
4. `ort` — „Menschen stehen dabei, sehen zu und bewegen sich. Du schickst ihn. Er bringt das Dummy bis in die Hand und gibt ab, ohne sich ablenken zu lassen."

`run` neu: „3 Retrieves einzeln, dazwischen etwas anderes machen. Nicht drei
Abgaben am Stück verlangen."

`steps`: `[]`

`tips` neu:

```
"Wenn er knautscht oder fallen lässt: Apportieren für diese Session beenden.",
"Fehlverhalten nicht mit weiteren Retrieves belohnen.",
"Für das nasse Dummy auf Stufe 1 reicht ein Eimer Wasser, wenn gerade kein Gewässer da ist.",
"Am Gewässer: direkt an der Wasserkante stehen und abnehmen, bevor er sich schüttelt oder ablegt. Flacher Einstieg, kein Absprung von Uferkanten.",
```

---

## 7. Nacharbeit im Code, die sich aus der Umstellung ergibt

Vier Punkte, die beim Prüfen der Spec gegen `training.js` und `steps.js`
aufgefallen sind. Ohne sie hat die Umstellung Nebenwirkungen.

### 7.1 `stepText` muss `withSecondSide` anwenden

`steps.js` Zeile 34 wendet auf Stufentexte nur `withDummySignal` an.
`withSecondSide`, das „in der Fußposition" um die zweite Seite aus dem Profil
ergänzt, läuft heute nur über `steps`. Das war bisher folgenlos, weil die
Fußposition fast nur in `steps` vorkam. Nach dieser Spec steht sie neunmal in
Stufentexten (D Bronze viermal, D Silber zweimal, E Silber zweimal, C Gold
einmal indirekt). Wer eine zweite Seite im Profil hat, verliert den Hinweis
genau dort, wo er gebraucht wird.

```js
// steps.js, in stepText:
return s ? `Stufe ${shown} - ${withSecondSide(withDummySignal(s.main, dog), dog)}` : `Stufe ${shown}`;
```

### 7.2 B Gold: `setup` muss an Stufe 3 gebunden werden

`setup: ["Zwei oder mehr Hunde anderer Halter"]` gilt heute für alle vier
Stufen. Schon jetzt falsch, denn Wildwitterung und Wald brauchen keine
fremden Hunde. Mit der neuen Reihenfolge wandert die Spielstufe auf Platz 3:

```js
setup: [{ text: "Zwei oder mehr Hunde anderer Halter", steps: [3] }],
```

### 7.3 D Silber: `setup` von Stufe 2 auf Stufe 1

Die zweite Person wirft nach der neuen Reihenfolge auf Stufe 1:

```js
setup: [{ text: "Eine zweite Person", steps: [1] }],
gear: [{ id: "dummy", n: 2 }],   // Markierstab entfällt, siehe Abschnitt 5
```

### 7.4 E Silber: Stufe 2 verlangt einen Felldummy, die Packliste kennt ihn nicht

`gear` nennt nur `standarddummy`. Für Stufe 2 steht der Hund ohne Gerät da.
`GEAR_ITEMS` hat keinen Eintrag dafür. Vorschlag:

```js
// GEAR_ITEMS ergänzen:
felldummy: { one: "Felldummy", many: "Felldummys", icon: "dummy" },

// E Silber:
gear: [{ id: "standarddummy", n: 1, steps: [1, 3, 4] }, { id: "felldummy", n: 1, steps: [2] }],
```

Falls du keinen Felldummy hast und keinen anschaffen willst, ist die
Alternative, Stufe 2 durch eine andere Bedingung zu ersetzen. Dann sag
Bescheid, ich schreibe sie. Den Gegenstand in der Stufe zu nennen und ihn aus
der Packliste zu lassen, ist jedenfalls keine Option.

---

## 8. Was danach noch offen bleibt

- **„in der Situation der heutigen Stufe"** verschwindet mit dieser Spec aus
  B Silber, B Gold, C Silber, C Gold, D Silber, D Gold und E Gold. In Track A
  war es schon weg. Bei F bis H steht es noch, dort kommt es mit den
  Stufentexten dieser Tracks dran.
- **A Bronze, Schritt 1** sagt „Hund sitzt 20 große Schritte vor dir". Das
  rechnet mit einem Meter pro Schritt, die Stufentexte rechnen mit 75 cm, wie
  `DISTANCE_STEPS`. Eine der beiden Angaben ist falsch, und es ist meine. Der
  Schritt sollte „rund 25 Schritte" heißen, damit er zur Stufe 4 desselben
  Levels passt.
- **H Bronze und H Silber** stehen weiter auf der Liste aus
  `aufbau-pruefung.md`, ebenso **F Gold** (Winkel über mehrere Einheiten).
  Die hängen an den F-bis-H-Stufentexten.
