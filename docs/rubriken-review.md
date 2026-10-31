# Review der übrigen Rubriken

Tracks, Trophäen, Basics und Einstellungen, geprüft mit Profil "viel
Erfahrung, erwachsen", alle Level auf Anfang. Diese Bereiche hatte ich bisher
nie vollständig angesehen.

Der erste Befund wiegt schwerer als alles, was wir in den letzten zwei Wochen
behandelt haben.

---

## 1. Es gibt keinen Export

**Die App kann den Fortschritt nicht sichern.** Kein Export, kein Import, kein
Download. In den Einstellungen stehen nur drei Zurücksetz-Funktionen.

Was das heißt: Browser-Daten gelöscht, Handy gewechselt, PWA neu installiert,
und der gesamte Fortschritt ist weg. Die Sicherungen, die bei den Migrationen
angelegt wurden, liegen im selben localStorage und sind dann ebenfalls weg.

Das ist umso ärgerlicher, als die Export/Import-Spezifikation schon
existiert: Sie steht als "Relaunch, Epic 1" auf der Notion-Projektseite, mit
fünf Regeln, darunter versioniertes Schema, atomarer Voll-Replace und
Auto-Backup vor jedem Import. Umgesetzt wurde sie nie.

**Das gehört vor alle Textarbeit.** Ein Glossareintrag mehr oder weniger
kostet nichts, ein verlorenes Trainingstagebuch ist nicht wiederherstellbar.

Die Spezifikation liegt vor, sie muss nur umgesetzt werden. Was dazukommt,
weil es sie damals noch nicht gab:
- Der Export enthält `schemaVersion: 3` und die Signale aus dem Profil.
- Der Export-Dateiname trägt Hundename und Datum: `eddy-2026-10-31.json`.
- **Export-Erinnerung:** Nach jeder zehnten abgeschlossenen Session ein
  Hinweis im Heute-Tab, dass eine Sicherung fällig ist.

---

## 2. Die Trophäe "Wasserratte" ist nicht erreichbar

"Eine Vollsession mit Wasserarbeit abschließen." Das Wasser-Modul hat keine
Level, also kann diese Bedingung nie eintreten. Eine von siebzehn Trophäen ist
tot.

**Zwei Wege, beide vertretbar:**
- **Entfernen**, bis das Wasser-Modul gebaut ist. Ehrlich, aber die Vitrine
  hat dann eine Lücke.
- **Umdefinieren** auf etwas, das heute erreichbar ist: "Eine Session
  abschließen, in der ein Dummy über Wasser ging." Das deckt F Silber Stufe 4
  und F Gold Stufe 4 ab, die beide Wasser verlangen.

Ich bin für das Umdefinieren. Die Bedingung wird damit prüfbar, und der Name
bleibt.

---

## 3. Die Trackbeschreibung des Rückrufs widerspricht dem Profil

> Rückruf: "Direktes Zurückkommen auf **zwei lange Töne**"

Das Profil sagt "Pfiff, mehrere kurze Töne". Zwei verschiedene Angaben für
dasselbe Signal, und die Trackbeschreibung ist hartcodiert.

Die letzte Prüfaufgabe hat das nicht gefunden, weil sie die Übungstexte geprüft
hat und nicht die Track-Beschreibungen.

> Neu: Direktes Zurückkommen auf den Rückruf-Pfiff.

**Prüf alle acht Trackbeschreibungen und die Kurztexte** auf dasselbe Muster.
Bei Stopp-Pfiff steht bereits "auf einen kurzen Pfiff", das ist in Ordnung,
weil es die Funktion beschreibt und kein bestimmtes Muster vorgibt.

---

## 4. Das Glossar ist eine Liste von 64 Klappelementen

Im Basics-Tab stehen 76 Accordions untereinander, davon 64 Glossareinträge.
Wer einen Begriff sucht, scrollt.

Ich hatte entschieden, dass ein Suchfeld sich erst ab etwa dem Doppelten
lohnt. Das war falsch: Die Zahl ist nicht das Problem, die **Verschachtelung**
ist es. Das Glossar ist ein Accordion, in dem 64 weitere Accordions liegen.

**Zwei Änderungen:**
1. **Die elf Gruppen werden eigene Klappelemente.** Statt 64 Einträgen auf
   einer Ebene stehen dort elf Gruppen, und erst darin die Einträge. Wer
   "Fehler" sucht, klappt eine Gruppe auf statt an 30 Einträgen vorbeizuscrollen.
2. **Ein Suchfeld im Glossar-Abschnitt.** Es filtert die Einträge nach Begriff
   und Alias. Bei 64 Einträgen ist das kein Luxus mehr.

**Dazu ein Sprung nach oben.** Der Basics-Tab ist jetzt sehr lang, und am Ende
gibt es keinen Weg zurück außer scrollen.

---

## 5. Nasenarbeit ist von Anfang an offen, braucht aber das meiste Material

Nasenarbeit Bronze hat keine Voraussetzungen und verlangt **zehn oder mehr
Dummys plus zwei Suchendummys**. Es ist damit das Level mit der höchsten
Einstiegshürde und gleichzeitig eines der ersten, die der Session-Builder
vorschlägt.

Fachlich kommt es zu früh: Die Verlorensuche ist ein Fach der Anfänger-Klasse,
nicht der DP-E. In der Einsteigerprüfung kommt keine Suche vor, das haben wir
beim Lesen der Ordnung festgestellt.

> `requires: ["E:bronze"]` für Track G.

Begründung: Wer eine Verlorensuche macht, bekommt zehn Dummys gebracht. Ohne
saubere Abgabe wird das ein Sammelspiel. Marking als Voraussetzung wäre
fachlich auch zu begründen, würde Track G aber sehr weit nach hinten schieben.

**Melde, wenn dadurch bei frischem Start zu wenige Level offen bleiben.**

---

## 6. Dummygewichte zwischen den Tracks uneinheitlich

Bei erwachsenem Hund zeigt die Trackübersicht:

| Track | Bronze-Equipment |
|---|---|
| Steadiness | 1 Dummy 500 g (oder Juniordummy 400 g) |
| Abgabe | 1 Juniordummy 400 g |

Zwei verschiedene Angaben, und der Grund ist technisch: Bei Abgabe greift die
Altersregel, bei Steadiness nicht. Für den Nutzer sieht das aus wie Willkür.

**Vereinheitlichen auf die Formulierung mit Alternative:**
> 1 Dummy 500 g oder Juniordummy 400 g

Das gilt überall dort, wo das Gewicht nicht die Übung ist. Bei Abgabe **ist**
das Gewicht die Übung, dort bleibt die Stufenangabe. Der Hinweis aus
`erklaeren-statt-nennen.md` Abschnitt 5 erklärt das dann an Ort und Stelle.

---

## 7. Die Trophäen kennen die Prüfungsklassen nicht

Drei Trophäen heißen "Fundament", "Fortgeschritten" und "Gundog" und stehen
für alle Tracks auf Bronze, Silber und Gold. Seit dem Fundament-Umbau bedeuten
diese Stufen etwas Bestimmtes, und die Trophäen sagen es nicht.

| alt | neu |
|---|---|
| Fundament: Alle acht Tracks auf Bronze bringen | **Bereit für die DP-E:** Alle acht Tracks auf Bronze. Damit deckst du die Einsteigerprüfung ab. |
| Fortgeschritten: Alle acht Tracks auf Silber bringen | **Bereit für die Anfänger-Klasse:** Alle acht Tracks auf Silber. |
| Gundog: Alle acht Tracks auf Gold bringen | **Bereit für die Fortgeschrittenen-Klasse:** Alle acht Tracks auf Gold. |

"Gundog" als Name finde ich gut, aber die Beschreibung soll sagen, was
erreicht ist. Wenn dir die alten Namen lieber sind, behalte sie und ändere nur
die Beschreibungen.

**Dazu:** Die acht Track-Trophäen heißen "X gemeistert" und werden beschrieben
mit "X: das Gold-Level schaffen". Die Beschreibung wiederholt den Namen.
Besser wäre, was man dann kann, etwa bei Stopp-Pfiff: "Stoppt auf 40 Meter im
Lauf zum Dummy, auch bei Ablenkung." Das ist das Gold-Kriterium, es steht
bereits in den Daten.

---

## 7b. Der Markierstab ist nicht für den Hund

Kali hat recht, und mein Eintrag widerspricht sich selbst: Wenn der Stab eine
Sichthilfe für den Hund wäre, ergäbe die Regel "mindestens vier aufstellen und
als Verleitung nutzen" keinen Sinn.

**Woher der Fehler kam:** Der Satz steht in meiner Buchauswertung unter
"Unsere Korrekturen", also als meine Schlussfolgerung, nicht als Buchzitat.
Das Buch führt in seiner Ausrüstungsliste einen **Flagman**, das ist etwas
anderes: eine Person oder Fahne, die dem Hund die Fallstelle zeigt. Daraus
habe ich den Markierstab gemacht und die Funktion gleich mit.

**Was die Fachquelle tatsächlich sagt** (hund-und-freizeit.com, Markierstab
und Einweisestab):

> Die goldene Regel: Nicht der Stab ist das Ziel, deine Hand zeigt den Weg.

Und zur Zahl: mehrere aufstellen, aber nur bei einem ein Dummy auslegen. Das
lehrt, "dass nicht der Stab zählt, sondern dein Kommando". Lässt man den Hund
leere Stäbe abchecken, "trifft er eigene Entscheidungen und verlässt sich
nicht mehr auf dich".

**Neuer Glossareintrag:**

```
Markierstab, Einweisestab

Ein Stab, der eine Stelle im Gelände markiert. Er hilft dir, eine Fallstelle
oder eine Richtung festzulegen, und er ist für den Hund sichtbar, aber er
soll nicht sein Ziel sein.

Die Regel dazu: Nicht der Stab ist das Ziel, deine Hand zeigt den Weg.

Deshalb immer mehrere aufstellen und nur bei einem ein Dummy auslegen. Steht
nur ein Stab, lernt der Hund, zum Stab zu laufen statt auf dich zu hören. Und
leere Stäbe soll er nicht abchecken dürfen: Wer das zulässt, bekommt einen
Hund, der selbst entscheidet statt sich führen zu lassen.
```

**Dieselbe Korrektur im Troubleshooting**, wo ich den Fehler vor zwei Wochen
schon einmal eingebaut habe: Dort steht "Markierstab als Sichthilfe für den
Hund setzen, damit er einen Zielpunkt hat". Genau das soll er nicht.

> Mehrere Markierstäbe aufstellen, Dummy nur bei einem. So lernt er, auf deine
> Richtungsangabe zu achten statt auf den nächstbesten Stab.

**Prüf alle Stellen**, an denen der Markierstab vorkommt, und melde sie. Der
Fehler steckt seit Fassung 4 im Glossar und ist seitdem zweimal weiterkopiert
worden.

---

## 7c. Mehr Struktur im Basics-Tab

Zwölf Abschnitte in einer Reihe, einer davon mit 64 Untereinträgen. Es fehlt
eine Ordnung, die sagt, wofür man wann hineinschaut.

**Vier Gruppen mit Zwischenüberschriften**, die Abschnitte bleiben wie sie
sind:

| Gruppe | Abschnitte |
|---|---|
| **Bevor du rausgehst** | So fängst du an, Vor der Einheit |
| **Wie trainiert wird** | Worauf das Training hinarbeitet, Einwirkung und Korrektur, Wie Hunde lernen |
| **Nachschlagen** | Handzeichen, Dummys und Ausrüstung, Der Hund als Sinneswesen, Glossar |
| **Rahmen** | Sicherheit am Wasser, Recht und Rahmen, Quellen |

Die Zwischenüberschriften sind keine Klappelemente, nur Beschriftungen. Die
Reihenfolge innerhalb der Gruppen bleibt.

**Dazu ein Inhaltsverzeichnis am Anfang**, das zu den Abschnitten springt. Bei
einer Seite, die mit dem Glossar über tausend Zeilen lang ist, ist das kein
Luxus.

"Einwirkung und Korrektur" bleibt aufgeklappt, auch wenn es jetzt in der
zweiten Gruppe steht.

---

## 8. Kleinigkeiten

**Quellenangabe im Nutzerhinweis.** Im Profil steht "(Zvolsky S. 234)" mitten
im Hinweistext zum Suchensignal. In den Basics ist eine Seitenzahl am Platz,
in einem Formular irritiert sie. Dort reicht der Hinweis ohne Beleg, die
Quelle steht im Glossar.

**Die Signaleinträge im Glossar sind gut gelöst.** Sie zeigen den Profilwert
im Titel, etwa "Stopp-Signal 'Pfiff, ein kurzer Ton'". Das ist genau die
Verbindung, die Kali bei den Übungstexten vermisst hat. Mit der antippbaren
Signalzeile aus `erklaeren-statt-nennen.md` Abschnitt 6b schließt sich das.

**"Richtung und Blind" zeigt in der Trackübersicht nur die Futterschüssel**, weil
das Stufe-1-Equipment angezeigt wird. Das ist die Regel und soll so bleiben,
aber in der Trackübersicht, wo man den ganzen Track plant, wäre das Equipment
aller Stufen hilfreicher. **Vorschlag:** In der Trackübersicht alle Einträge
zeigen, im Heute-Tab und im HEUTE-Block nur die der aktuellen Stufe. Melde,
wenn das die Liste dort zu lang macht.
