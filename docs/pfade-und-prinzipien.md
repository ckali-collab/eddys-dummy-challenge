# Pfade, Prinzipien und die drei Entscheidungen

---

## 1. Die Prinzipien bleiben, die Pfade werden korrigiert

Deine Frage war, ob das Prinzip entschärft wird. **Nein, umgekehrt.**

"Erhöhen Sie im Training die Schwierigkeitsstufe, dann müssen Sie erst einmal
wieder die Entfernung verkürzen" ist ein wörtlicher Buchsatz, S. 214. Die
Pfade sind meine Konstruktion. Wenn beides nicht zusammenpasst, hat die
Konstruktion unrecht.

Dass der Satz schon falsch in den Basics steht, ist kein Argument dafür, ihn
zu entschärfen. Es ist ein Argument dafür, dass der Fehler länger drin ist als
gedacht.

### Die drei Stellen

**F Silber, Stufe 4:** `{d:3, g:4}` wird zu **`{d:2, g:4}`**. Die
Wasserstufe steigt im Gelände, also geht die Distanz zurück. Das ist genau der
Sägezahn, den das Modell vorsieht, und ich habe ihn beim Einbau der
Wasserstufe selbst gebrochen.

**H Gold, Stufe 2:** Der Text sagt "über einen Geländewechsel, bis 50 Meter",
Stufe 1 sagt "bis 30 Meter, offenes Gelände". Beides steigt.
> Stufe 2 neu: Einweisen über einen Geländewechsel. Bis 30 Meter.
> Stufe 3 bleibt bei 50 Metern, dort steigt dann nur die Distanz.

**G Silber und G Gold, Stufe 4:** Distanz und Wartezeit steigen zusammen. Die
Distanz von Stufe 4 wird auf den Wert von Stufe 3 gesetzt, nur die Verzögerung
kommt dazu.

**Prüf alle übrigen Pfade** auf dasselbe und melde, was du findest. Wenn an
einer Stelle beide Achsen steigen, ist es ein Fehler, keine Absicht.

### Errorless Learning

Die Evidenzangabe hat dort nichts zu suchen, richtig erkannt.
> Errorless Learning: Die Aufgabe so stellen, dass der Hund sie lösen kann.
> Zielwert rund 80 Prozent Erfolgsquote.

Die Einschränkung "Praxiswert, keine Studie bekannt" bleibt in der
Spezifikation und steht künftig in den Quellen, nicht im Prinzip.

**Danach sind es wieder sieben Prinzipien**, und der Block kann angezeigt
werden.

---

## 2. Junghund: 400 Gramm

Eindeutig. Das Buch nennt das **Juniordummy mit 400 Gramm** für Junghunde, das
Welpendummy mit 200 Gramm für Welpen. Dass die App einem Junghund 200 Gramm
einpackt, ist ein Fehler, und er ist sichtbar.

**`DUMMY_WEIGHT` oder die entsprechende Logik korrigieren:** Welpe 200,
Junghund 400, erwachsen 500, Senior 400.

Senior auf 400 ist meine Ableitung: Dasselbe Argument wie beim Aufwärmen,
abgenutzter Knorpel trägt weniger gern schwer. Melde, wenn das irgendwo
anders steht.

Danach kann `EQUIPMENT_NOTES.gewichte` angezeigt werden, der Widerspruch ist
weg.

---

## 3. E Bronze: mein Satz war falsch herum

Du hast recht, und meine Formulierung hat das Level aus dem Einstieg
herausdefiniert. E Bronze **ist** das Einstiegslevel.

Der Konflikt ist ein anderer: Zwei bis drei Wiederholungen gelten für die
**erste Einheit**, die zehn Retrieves sind das **Abschlusskriterium** nach
Wochen. Das ist kein Widerspruch, sondern Anfang und Ziel.

> **Ganz am Anfang** reichen zwei bis drei Apportiereinheiten pro Woche mit je
> zwei bis drei Wiederholungen. Die zehn Retrieves sind das Ziel dieses
> Levels, nicht der Anfang: Steigere die Zahl über die Wochen.

**Keine Voraussetzung für E Bronze.** Deine Begründung stimmt, eine Sperre
träfe F und G mit.

**Dasselbe bei F Bronze:**
> Ganz am Anfang reichen zwei bis drei Apportiereinheiten pro Woche. Die fünf
> Marken sind das Ziel dieses Levels, nicht der Anfang.

---

## 4. Das Troubleshooting bleibt vorerst unsichtbar

Dein Punkt 9 ist das größte Risiko dieser Runde, und ich kann ihn nicht
auflösen: Die Einträge sind aus dem Bundle getreeshakt, ich kann sie nicht
lesen.

Wir haben vor drei Wochen vier erfundene Fachbegriffe aus dem Glossar
entfernt, die aus derselben Zeit stammen wie diese Einträge. Zehn ungeprüfte
Ursache-und-Abhilfe-Ketten sichtbar zu machen, wäre fahrlässig.

**Bitte liste die zwölf Einträge vollständig im nächsten Bericht**, mit
Problem, Ursache und Abhilfe. Ich prüfe sie gegen Buch und Regelwerk, dann
entscheiden wir, welche bleiben.

Die beiden, die du schon als widersprüchlich erkannt hast, sind ein gutes
Zeichen für die Qualität der restlichen: Der Eintrag "Fiept oder winselt"
widerspricht dem Buchzitat direkt.

---

## 5. Die übrigen Widersprüche

**E Gold, Belastung:** Richtig, die Aufheiz-Apports fehlen in der Rechnung.
**`load` von 3 auf 5.** Drei Abgaben plus die Apports, die dazu nötig sind.

**E Silber bei deutlichem Gelenkbefund:** 500 Gramm sind dort falsch. Das
Level bekommt in diesem Fall keinen Gewichtsersatz, sondern einen Hinweis:
> Bei deutlichem Gelenkbefund ist dieses Level nicht geeignet. Bleib bei
> Bronze oder sprich das Gewicht mit dem Tierarzt ab.

**Packliste "Dummy 500 g" und "Standarddummy 500 g" getrennt:** Zusammenfassen,
wenn das Gewicht gleich ist. Melde, falls die Namen aus verschiedenen Quellen
kommen und sich nicht zusammenführen lassen.

**Junghund und Wachstumsfugen:** Berechtigt. **Junghund bekommt denselben
Aufwärm-Ablauf wie Welpe und Senior**, also den für "leicht".

**Gelenkstatus "unbekannt":** Mein Zusatz widerspricht der Liste. Wenn die
Sprints wegfallen sollen, **gilt dort der Ablauf für "leicht"** statt des
Standardablaufs mit Zusatz.

**Kurzübung bei "leicht", Welpe und Senior:** Dieselbe Korrektur wie bei
"deutlich", also "weite Bögen" statt "ein paar Wendungen". Die
Unterscheidung macht dort keinen Sinn.

**Doppelter Titel "Wenn etwas nicht klappt":** Die Zwischenüberschrift unter
"Wie Hunde lernen" heißt künftig **"Die fünf Fehlerursachen"**. Das ist
präziser und der Abschnittstitel bleibt frei.

**Wasserdummy-Text, "die Linie deines Hundes":** Gemeint ist die Linie, auf
der das Dummy liegt.
> Helle Farben helfen dir, die Fallstelle im Wasser im Blick zu behalten.

---

## 6. Deine Entscheidungen

Alle vier übernommen. **Dass "deutlich" allem vorgeht**, ist die richtige
Reihenfolge: Der Gelenkbefund ist die härtere Einschränkung, das Alter die
weichere.
