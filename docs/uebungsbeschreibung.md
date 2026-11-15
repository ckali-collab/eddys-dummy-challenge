# Die Übungsbeschreibung nach vorn

Befund und Umbauvorschlag nach Kalis Rückmeldung vom 15.11.: Der Ablauf einer
Übung ist das Wichtigste draußen und steht heute am weitesten hinten.

Grundlage: Repo-Stand `4856898`, lokal gebaut und im Browser durchgesehen,
dazu alle 24 Level im Datenbestand gelesen.

---

## 1. Der Kernbefund

**Auf der Heute-Seite wird der Ablauf einer Übung nicht angezeigt.**
`HeuteTab.jsx` rendert im Hauptteil: Track, Level, Titel, Fortschritt, `run`,
die Stufen, Equipment. Das Feld `steps` kommt dort nicht vor.

**Auf der Levelseite steht er im eingeklappten Hintergrundblock.** Bei allen
Tracks mit Bedingungsachse (A bis E) greift `stepsInBackground`, und der
Aufbau rutscht hinter Prüfungsbezug, Lernphase, Verstärkung, Rahmen und
Alter — zugeklappt.

So sieht Abgabe Bronze heute auf der Levelseite aus, von oben nach unten:

```
HEUTE          Stufe 1, Signal, run, todayNote, Equipment
STUFEN         die drei Stufen, Stufe 1 wortgleich noch einmal
AM ENDE        criteria
TIPPS          zwei Tipps
FORTSCHRITT    Zähler und Knöpfe
Hintergrund ▸  zugeklappt: Prüfung, Lernphase, Verstärkung, Alter,
               und ganz unten der Ablauf eines Durchgangs
```

Der Ablauf, der dort unten steht, ist genau das, was beim Abgabetraining
zählt: rückwärts gehen, damit er bis an dich herankommt; eine Hand von unten
unter das Kinn; nicht sofort wegnehmen, kurz halten, loben. Drei Sätze, die
den Unterschied zwischen sauberer Abgabe und Ablegen ausmachen, und man muss
sie aufklappen.

**Derselbe Befund erklärt den Dummy in Stopp-Pfiff Bronze.** Er steht dort,
weil eine der beiden Varianten lautet: „Er stöbert wenige Meter vor dir.
Stopp-Pfiff geben und gleichzeitig einen Dummy werfen. Der Dummy ist die
Belohnung für den Stopp." Diese Variante wird auf der Heute-Seite nicht
angezeigt, also steht der Dummy unbegründet in der Packliste.

Die Reihenfolge, die Kali nennt, ist die richtige: erst was zu tun ist, dann
worauf zu achten ist, dann das Ziel.

---

## 2. Neue Reihenfolge auf der Heute-Seite

Heute im Hauptteil, in dieser Folge:

| heute | neu |
|---|---|
| Track, Level, Titel, Zähler | unverändert |
| `run` | **Das übst du heute** — Stufentext |
| Einstieg + Ziel heute | **So läuft ein Durchgang** — `steps`, wenn vorhanden |
| Equipment | **Wie oft** — `run` |
| | **Worauf du achtest** — die ersten zwei `tips` |
| | Mitnehmen — Equipment |

Der Einstiegsschritt („zum Erinnern, wird nicht bewertet") bleibt, rutscht
aber unter das Ziel: Er ist die Wiederholung von gestern, nicht die Aufgabe
von heute.

**Die Beschriftung ändert sich mit.** „Ziel heute (wird bewertet)" klingt nach
einem Abstraktum, das man anstrebt. Seit der Umstellung auf vollständige
Stufentexte steht dort aber die Handlungsanweisung: „Der Hund sitzt neben dir
in der Fußposition. Du gibst den Stopp-Pfiff. Er bleibt sitzen und sieht dich
an." Das ist keine Zielbeschreibung, das ist die Übung. Neu: **„Das übst du
heute"**, und darunter klein „wird bewertet".

**Zwei Tipps, nicht alle.** B Gold hat fünf, H Silber sechs, teils über 160
Zeichen. Alles anzuzeigen macht die Karte unlesbar. Die ersten zwei stehen da,
der Rest hinter „mehr". Dafür muss in jedem Level der wichtigste Tipp vorn
stehen — die Reihenfolge ist heute zufällig, bei A steht überall der lange
Pfeif-Hinweis zuerst.

---

## 3. Neue Reihenfolge auf der Levelseite

```
HEUTE                 Stufe, Signal, run, Equipment       (wie bisher)
SO LÄUFT EIN DURCHGANG steps, ausgeklappt, für alle Tracks  ← neu hier
TIPPS                 alle Tipps
STUFEN                die vier Stufen
AM ENDE DES LEVELS    criteria
FORTSCHRITT           Zähler und Knöpfe
Hintergrund ▸         Prüfung, Lernphase, Verstärkung, Alter
```

Zwei Änderungen: Der Ablauf kommt aus dem Hintergrund heraus und nach oben,
und die Stufen rutschen unter die Tipps. `stepsInBackground` entfällt damit
als Unterscheidung — der Ablauf steht bei jedem Track an derselben Stelle.

**Die Dopplung verschwindet.** Heute steht Stufe 1 zweimal wortgleich auf der
Seite, einmal unter HEUTE und einmal als erste Zeile unter STUFEN. Wenn STUFEN
nach unten rutscht, ist das der Überblick über das ganze Level und die
Wiederholung stört nicht mehr. Alternativ die aktuelle Stufe dort nur als
Zeile markieren, ohne den vollen Text.

---

## 4. Equipment gegen Übungsinhalt

Jeden `gear`-Eintrag gegen das gelesen, was die Übung verlangt.

### Falsch oder unvollständig

- **A Bronze: `dummy` ist ungebunden und unerklärt.** Er gehört zur zweiten
  Variante. Mit Abschnitt 2 wird die Variante auf Heute sichtbar, dann ist er
  begründet. Zusätzlich: `dummyType: null` zieht das Profilgewicht, also
  500 g für Eddy. Für einen Belohnungswurf beim Stopp-Pfiff reicht ein
  leichteres. Vorschlag: `dummyType: "junior"` wäre falsch, weil A Bronze dann
  aus der Mini-Session fällt (der Kommentar im Code sagt das). Also bleibt es,
  aber die Variante muss sichtbar werden.
- **A Silber: `dummy` ist ungebunden, zwingend ist er nur auf Stufe 4**
  („Ein Dummy liegt sichtbar im Gelände"). Auf den Stufen 1 bis 3 ist er
  optional, für die Belohnung nach dem Stopp. Vorschlag: so lassen, aber
  prüfen, ob `optional: true` wie bei Bronze ehrlicher wäre.
- **F Bronze: die Variante Doppelmarkierung braucht zwei Dummys**, `gear`
  nennt einen. Das ist ein echter Fehler: Wer die Variante draußen machen
  will, hat das zweite Dummy nicht dabei.
- **D Silber: zwei Dummys ungebunden**, gebraucht werden zwei nur auf Stufe 2.
  Harmlos, aber mit `steps: [2]` sauberer.

### Richtig

C Bronze (leer), C Silber, C Gold, D Bronze, D Gold, E Bronze, E Silber,
E Gold, F Silber, F Gold, G Bronze bis Gold, H Bronze bis Gold.

---

## 5. Methodik und Verständlichkeit, Level für Level

Gelesen mit der Frage: Weiß jemand, der noch nie Dummyarbeit gemacht hat, was
zu tun ist?

### 5.1 Echte Lücken

**E Bronze, Tipp 2 ist ein Fragment ohne Bezug.**
„Häufige Ursachen: Dummy zu schnell abgenommen, zu großes Theater, Hund kommt
nicht weit genug heran." Ursachen wofür? Gemeint sind Ablegen und Knautschen,
das steht nirgends. Neu:
„Wenn er ablegt oder knautscht, liegt es meist an einem von drei Dingen:
Dummy zu schnell abgenommen, zu großes Theater bei der Abgabe, oder er kommt
nicht weit genug heran."

**A Silber: Was nach dem Stopp passiert, steht nur im Tipp.**
„Nach dem Stopp: Rückruf pfeifen und loben, oder einen Dummy werfen. Der Stopp
muss sich lohnen." Das ist kein Hinweis am Rand, das ist der zweite Teil jedes
Durchgangs. Ohne ihn endet die Übung mit einem sitzenden Hund und niemand weiß
weiter. Gehört in `run`:
„Viermal über die Einheit verteilt. Nach jedem Stopp: Rückruf pfeifen und
loben, oder einen Dummy werfen. Der Stopp muss sich lohnen."

**F Bronze: „Abgabe nach Track E" steht mitten im Ablauf.**
Ein Verweis auf einen anderen Track, den man draußen nicht aufschlägt. Besser
in einem Satz sagen, was gemeint ist: „Er bringt bis in die Hand und legt
nicht ab."

**F Silber: eine Voraussetzung steht als Tipp.**
„Voraussetzung: Steadiness Silber muss sitzen." Track F verlangt über
`requires` nur `D:bronze`. Entweder ist der Tipp zu streng oder `requires` zu
lasch. Wenn D Silber wirklich nötig ist, gehört es in die Daten, wo die App es
durchsetzt, nicht in einen Tipp, den man überliest.

### 5.2 Form stimmt nicht mit Inhalt

**F Bronze trägt „Varianten zum Abwechseln" über einem Ablauf.**
Sechs Schritte: 1 bis 4 sind der Ablauf eines Durchgangs (Hund sitzt, werfen,
warten, schicken, abgeben), 5 und 6 sind echte Varianten. Die Einleitung sagt
„In einem Durchgang arbeitest du an einer dieser Varianten, nicht an allen" —
für die ersten vier ist das schlicht falsch. Derselbe Fehlertyp, den wir bei
D Bronze schon behoben haben. Vorschlag: `stepsType: "ablauf"`, die Schritte 1
bis 4 bleiben dort, die zwei Varianten wandern in die Tipps.

**H Bronze und H Silber: der Aufbau wiederholt die Stufen.**
Steht seit `aufbau-pruefung.md` auf der Liste. Bei H Bronze sind die Schritte
1, 4, 5 und 6 fast wörtlich die Stufen 1 bis 4; neu sind nur Schritt 2
(Entfernung vergrößern) und 3 (zwei Schüsseln). Bei H Silber wiederholt
Schritt 1 die vier Stufen. Beide gehören mit den F-bis-H-Stufentexten
zusammen, nicht in diesen Umbau.

**D Gold trägt `stepsType: "ablauf"` bei leerem `steps`.**
Wie D Bronze folgenlos, weil ein leerer Aufbau nicht gerendert wird. Beim
nächsten Durchgang mit aufräumen.

### 5.3 Tipps, die keine sind

Zwei Tipps erklären die Belastungsrechnung der App, statt beim Training zu
helfen:

- **E Bronze:** „Zehn Wiederholungen klingen viel. Für Markierungen und Suchen
  wären sie es auch … Das zählt in der Belastung halb."
- **E Silber:** „Hier sind es fünf, nicht zehn: Die Distanz ist nicht mehr
  begrenzt, und schwere oder ungewohnte Gegenstände kosten Kraft und
  Konzentration."

Beide rechtfertigen eine Designentscheidung. Draußen hilft das niemandem, und
sie stehen jeweils an erster Stelle, wo mit Abschnitt 2 nur noch zwei Tipps
sichtbar sind. Beide in den Hintergrundblock, zur Lernphase.

### 5.4 Mengen

- **B Gold hat fünf Tipps, H Silber sechs**, davon je zwei über 160 Zeichen.
  Mit der Begrenzung auf zwei sichtbare entschärft sich das, aber die
  Reihenfolge muss stimmen.
- **G Silber hat keinen einzigen Tipp.** Das einzige Level ohne. Entweder ist
  dort wirklich nichts zu sagen, oder es ist eine Lücke. Mein Verdacht: Lücke,
  denn Windarbeit ist der schwerste Teil der Suche und steht nur als Schritt 2
  im Ablauf.

### 5.5 Geprüft und in Ordnung

A Bronze, B Bronze bis Gold, C Bronze bis Gold, D Bronze, D Silber, E Gold,
F Gold, G Bronze, G Gold, H Gold. Die Stufentexte tragen seit der Umstellung,
der Ablauf ist vollständig, die Tipps helfen.

Eine Beobachtung ohne Handlungsbedarf: **A Gold wiederholt in den Stufen 2, 3
und 4 fast wortgleich** „Dummy werfen, Hund schicken, auf 40 Metern
Stopp-Pfiff, dann weiterschicken". Das ist Absicht, weil jede Stufe für sich
lesbar sein soll, und draußen sieht man immer nur eine davon.

---

## 6. Was ich bewusst nicht vorschlage

**Die Stufentexte wieder kürzen.** Sie sind seit heute vollständig, und genau
das macht sie draußen brauchbar. Die Wiederholung zwischen Stufe und Ablauf
ist gering, weil der Ablauf nur noch enthält, was in keiner Stufe steht.

**Den Hintergrundblock abschaffen.** Prüfungsbezug, Lernphase und Verstärkung
gehören dorthin. Falsch war nur, dass der Ablauf mit hineingerutscht ist.

---

## 7. Reihenfolge der Umsetzung

1. Abschnitt 2 und 3 — die Darstellung. Größter Hebel, betrifft alle 24 Level
   auf einmal.
2. Abschnitt 5.1 — die vier echten Lücken.
3. Abschnitt 4 — Equipment, davon ist nur F Bronze ein echter Fehler.
4. Abschnitt 5.2 F Bronze und 5.3 — Form und Tipps.
5. H Bronze, H Silber und `stepsType` bei D Bronze und D Gold gehen mit den
   F-bis-H-Stufentexten zusammen, nicht hier.

---

## 8. Nachtrag nach der Umsetzung: Kartenlänge

Gemessen bei 390 px, Hauptteil auf Heute (Stand `61216fa`): A Bronze Stufe 1
840 px, Stufe 2 mit Einstieg 944 px. **G Bronze 1149 px, der Ablauf allein
546 px.** Offen bis zur F-bis-H-Runde: Dort wird der Ablauf von G gekürzt.
