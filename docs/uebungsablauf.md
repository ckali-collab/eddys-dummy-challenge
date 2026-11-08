# Der Übungsablauf fehlt, an allen 24 Leveln

Geprüft am 8. November am Live-Stand, alle 24 Level in den Daten, Detailseite
und Heute-Tab auf 375 x 812.

---

## 1. Dein Befund stimmt und ist systematisch

**16 von 24 Durchgangstexten verweisen auf die Stufe, statt sie zu nennen.**
Neunmal wörtlich als "in der Situation der heutigen Stufe", siebenmal als "auf
der heutigen Stufe" oder "mit der Wartezeit der heutigen Stufe".

Ein Verweis ist draußen wertlos. Er zwingt zum Nachschlagen in einem Moment,
in dem man den Hund an der Leine hat.

**Das Kriterium beschreibt überall Stufe 4, steht aber unter "GESCHAFFT
WENN" direkt neben dem heutigen Ziel.** Bei A Bronze:

```
HEUTE          Stufe 1 - Der Hund sitzt neben dir, wenn du pfeifst.
GESCHAFFT WENN Sitzt sofort auf den leisen Stopp-Pfiff, auch auf 25 Meter.
```

Die 25 Meter sind Stufe 4. Zwei Anforderungen übereinander, ohne dass
dasteht, dass die eine heute gilt und die andere am Ende.

---

## 2. Der eigentliche Fehler: zwei Listen, die nicht zusammenpassen

Beim Nachsehen in den Daten kommt etwas heraus, das du nicht genannt hast und
das die Verwirrung erklärt.

**Jedes dieser Level hat zwei getrennte Vierer-Beschreibungen:**

| | A Bronze, Stufen (`conditionPath`) | A Bronze, Aufbau (`steps`) |
|---|---|---|
| 1 | Der Hund sitzt neben dir, wenn du pfeifst. | Hund geht bei Fuß. Leise den Stopp-Pfiff geben. Er setzt sich sofort hin. |
| 2 | Der Hund steht oder geht neben dir. | Hund sitzt 20 große Schritte vor dir. Stopp-Pfiff. Er bleibt sitzen. |
| 3 | Der Hund ist etwa 10 Meter entfernt. | Rückruf pfeifen, dann auf halbem Weg den Stopp-Pfiff. |
| 4 | Der Hund ist etwa 25 Meter entfernt. | Er stöbert vor dir. Stopp-Pfiff und gleichzeitig Dummy werfen. |

**Die Aufbau-Spalte enthält genau das, was du vermisst**, nämlich die
Ausgangslage: "Hund geht bei Fuß". Aber sie ist gegen die Stufen verschoben,
und sie steht im zugeklappten Hintergrund-Block am Seitenende.

Die Zahl der Schritte schwankt zwischen 2 und 7, die Stufen sind immer 4. Eine
Zuordnung gibt es nicht und kann es so nicht geben.

**Betroffen sind 15 Level**, alle mit Bedingungsachse: Track A, B, C, D und E.
Die neun Distanz-Level (F, G, H) haben das Problem in abgeschwächter Form, dort
sagt die Stufe wenigstens Meter und Gelände.

---

## 3. Stufe 1 von A Bronze ist zweideutig

> Der Hund sitzt neben dir, wenn du pfeifst.

Sitzt er schon und soll sitzen bleiben? Oder soll er sich auf den Pfiff
setzen? Beides ist lesbar, und es sind zwei verschiedene Übungen. Der
Aufbau-Schritt daneben beschreibt die zweite Lesart, die Stufe eher die erste.

Genau deshalb schreibst du "Der Hund sitzt neben mir wenn ich pfeife aber
zunächst gehe ich doch mit ihm".

---

## 4. Die Lösung: die Stufe wird der Ablauf

Nicht ein weiteres Feld, sondern die vorhandenen Stufentexte umschreiben.
Jede Stufe beschreibt künftig **Ausgangslage, Signal und erwartete Reaktion**
in dieser Reihenfolge, in ganzen Sätzen.

**A Bronze, Stufen neu:**

| | neu |
|---|---|
| 1 | Der Hund sitzt neben dir in der Fußposition. Du pfeifst einmal kurz. Er bleibt sitzen und sieht dich an. |
| 2 | Der Hund geht bei Fuß. Du pfeifst einmal kurz. Er setzt sich sofort, du gehst weiter. |
| 3 | Der Hund ist etwa 10 Meter entfernt, rund 15 Schritte. Du pfeifst einmal kurz. Er setzt sich dort, wo er ist. |
| 4 | Der Hund ist etwa 25 Meter entfernt, rund 35 Schritte. Du pfeifst einmal kurz. Er setzt sich dort, wo er ist. |

Damit ist Stufe 1 eindeutig: Der Pfiff wird zuerst mit der Position verknüpft,
die er schon hat. Erst Stufe 2 verlangt, dass er sich auf den Pfiff hinsetzt.
Das ist auch der Aufbau aus dem Buch.

**Der Durchgangstext wird dann zur reinen Mengenangabe:**

```
run: Fünfmal über die Einheit verteilt, dazwischen normal weitergehen.
```

Zusammen steht auf der Karte:

> **Heute:** Der Hund sitzt neben dir in der Fußposition. Du pfeifst einmal
> kurz. Er bleibt sitzen und sieht dich an.
> Fünfmal über die Einheit verteilt, dazwischen normal weitergehen.

Kein Verweis, kein Nachschlagen, keine offene Frage, was der Hund gerade tut.

---

## 5. Was mit dem Aufbau-Block passiert

Er bleibt, aber er hört auf, eine zweite Stufenliste zu sein. Nach dem Umbau
stehen die vier Aufbau-Schritte von A Bronze inhaltlich in den Stufen. Was
übrig bleibt, sind die echten Zusatzvarianten, bei A Bronze etwa:

> Er stöbert wenige Meter vor dir. Stopp-Pfiff geben und gleichzeitig ein
> Dummy werfen. Der Dummy ist die Belohnung für den Stopp.

**Melde für jedes der 15 Level, welche Aufbau-Schritte nach dem Umbau noch
etwas sagen, das nicht schon in einer Stufe steht.** Den Rest streichen wir.

---

## 6. "GESCHAFFT WENN" rutscht nach unten

Es ist das Ziel des Levels, nicht die Aufgabe von heute. Zwei Änderungen:

1. **Die Überschrift wird eindeutig:** `GESCHAFFT WENN` wird
   **`AM ENDE DES LEVELS`**.
2. **Der Block rutscht unter die Stufenliste.** Dann liest man von oben nach
   unten: heute, dann der Weg, dann das Ziel. Heute steht zuerst, weil man
   deswegen die Seite öffnet.

---

## 7. Umfang und Reihenfolge

Der Umbau betrifft **60 Stufentexte** in 15 Leveln. Die schreibe ich, nicht
Claude Code, und nicht alle auf einmal.

**Schritt 1:** Track A, alle drei Level, zwölf Stufen. Das ist die
Musterlösung. Wenn sie draußen trägt, kommt der Rest.
**Schritt 2:** Die übrigen vier Tracks mit Bedingungsachse, B, C, D, E.
**Schritt 3:** Die Distanz-Level F, G, H prüfen. Dort ist die Lücke kleiner,
aber "auf Distanz und Gelände der heutigen Stufe" ist derselbe Verweis.

**Abschnitt 6 kann sofort umgesetzt werden**, der hängt an keinem Text.

---

## 8. Was ich noch nicht geprüft habe

Den Aufbau der Übungen **innerhalb** einer Session, also welcher Block in
welcher Reihenfolge kommt und warum. Das ist eine eigene Frage, und sie lohnt
erst, wenn die einzelne Übung klar ist. Sag Bescheid, wenn ich sie
vorziehen soll.
