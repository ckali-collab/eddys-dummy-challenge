# Profilfelder und Aufräumen

Letzter Nachtrag zum inhaltlichen Block. Der Basics-Tab kann vorher committet
werden.

---

## 1. Profilfeld Erfahrung

Drei Optionen, Pflichtfeld im Onboarding, später in den Einstellungen
änderbar:

```js
experience: 'keine' | 'etwas' | 'viel'
```

| Option | Label | Beschreibung im Onboarding |
|---|---|---|
| `keine` | Keine | Noch nie mit Dummys gearbeitet |
| `etwas` | Etwas | Erste Apports, Pfiff noch nicht aufgebaut |
| `viel` | Viel | Pfeifsignale sitzen, Markierungen und Blinds bekannt |

Wirkung, beides schon gebaut und wartet nur auf das Feld:
- `keine` zeigt "So fängst du an" an Position 1 des Basics-Tabs.
- `keine` markiert Glossarbegriffe deutlicher, sonst dezent.

Keine weitere Wirkung. Insbesondere **keine Sperre von Leveln** und keine
geänderte Reihenfolge der Tracks. Wer "Viel" angibt, bekommt dieselbe App.

---

## 2. Profilabschnitt "Meine Signale"

Eine Zeile pro Funktion, vorbelegt mit dem gängigen Wort, frei editierbar. Die
Übungstexte und das Glossar setzen daraus ein, statt den Platzhalter zu zeigen.

| Schlüssel | Funktion | Vorbelegung |
|---|---|---|
| `stop` | Stopp auf Distanz | Pfiff, ein kurzer Ton |
| `recall` | Rückruf | Pfiff, mehrere kurze Töne |
| `search` | Kleine Suche | Such |
| `area` | Große Suche, Gebiet | Verloren |
| `out` | Geradeaus, Voran | Voran |
| `back` | In die Tiefe | Back |
| `over` | Seitlich | Rüber |
| `fetch` | Apportieren | Bring |
| `release` | Freigabe | Lauf |
| `heel` | Fußposition links | Fuß |
| `side2` | Zweite Seite, rechts | leer, optional |

`side2` bleibt leer, wenn der Führer nur eine Seite nutzt. Ist es leer,
erscheint in den Texten kein Hinweis auf eine zweite Seite.

Bei den Pfiffsignalen ist das Feld ein Freitext für das Muster, nicht für ein
Wort. Beispiele als Platzhaltertext im Eingabefeld: "ein kurzer Ton",
"Pfiff-peeeep", "drei kurze".

**Ein Hinweis gehört direkt unter das Feld `area`:**

> Prüfe, ob der erste Ton deines Suchensignals dem Stopp-Pfiff gleicht. Hunde
> interpretieren bereits den ersten Ton und beginnen danach zu handeln
> (Zvolsky S. 234). Setzt dein Hund sich auf das Suchensignal, liegt es
> vermutlich daran. Teste es bewusst auf Distanz, bei Ablenkung und im hohen
> Bewuchs, dort tritt die Verwechslung zuerst auf.

Der Hinweis ist eine Information, keine Warnung und keine Blockade. Er
erscheint immer, nicht nur bei einer erkannten Ähnlichkeit: Ob zwei
Pfiffmuster klangähnlich sind, kann die App aus einem Freitext nicht
beurteilen.

---

## 3. Farbtext: eine Quelle, vier Fundstellen

Punkt 4 des Berichts. Der Text zu den Dummyfarben steht an vier Stellen in
leicht verschiedenen Fassungen. Das ist meine Inkonsistenz über drei
Spezifikationen hinweg.

**`DUMMY_FACTS` ist die einzige Quelle.** Diese Fassung gilt, wörtlich:

> Dem Hund fehlt das Sehpigment für Grün, er sieht wie ein grünblinder Mensch.
> Blau und Violett sieht er zweifelsfrei, deshalb sind blaue Dummys die beste
> Lernhilfe. Rot, Gelb, Orange, Braun, Gelbgrün und Grün kann er nicht
> unterscheiden, Rot erscheint ihm als sattes Gelb. Orange ist für den
> Menschen gut sichtbar, nicht für den Hund. Weiße Dummys wirken über den
> Kontrast, nicht über die Farbe.

Die drei anderen Stellen verweisen darauf, statt eigenen Text zu führen:
- Glossar-Eintrag "Dummyfarbe"
- Basics-Abschnitt "Dummys und Ausrüstung"
- Basics-Abschnitt "Sehen", dort nur der Teil zum Sehpigment plus der Satz
  zum Bewegungssehen, der in `DUMMY_FACTS` nichts zu suchen hat

Die Formulierung "er liest es wie Grau" fällt weg. Sie stand nur in
`basics-tab.md` und ist nicht die Buchformulierung.

---

## 4. SOURCES aufräumen

Punkt 7 des Berichts. Die Liste aus `training.js` existiert neben den
Glossar-Quellen und wird nirgends angezeigt.

**Die Glossar-Quellen sind die einzige Liste.** Sie werden im Basics-Tab
angezeigt, Abschnitt 12. `SOURCES` aus `training.js` entfällt, weil es
denselben Zweck doppelt erfüllt und nie sichtbar war.

Wenn an `SOURCES` noch etwas hängt, das in den Glossar-Quellen fehlt, melde
es, statt die Liste zu behalten.

---

## 5. Kein Suchfeld

Punkt 6 des Berichts: 64 Einträge liegen über der genannten Grenze von etwa
60. **Bleibt trotzdem ohne Suchfeld.** Die Grenze war ungefähr gemeint, und
elf Gruppen mit durchschnittlich sechs Einträgen sind ohne Suche überschaubar.
Ein Suchfeld lohnt ab etwa dem Doppelten.

---

## 6. Was aus dem Bericht bestätigt bleibt

- **Kurztexte der Sprechblasen** aus den Einträgen selbst, nichts neu
  formuliert. Bei Memory der Kern der drei Lesarten statt des ersten Satzes:
  richtig entschieden.
- **Weggelassen:** die Blinken-Notiz an mich, "Was Fassung 4 falsch hatte",
  "Neu in Fassung 5". Alles drei sind Arbeitsnotizen, kein App-Inhalt.
- **Übernommen:** die Einschränkung zum verteilten Training
  ("Laborbeagles, eine Aufgabe, eine Studie"). Richtig, die zählt für den
  Leser.
- **Die Empfehlung beim Knautschen bleibt drin.** Sie ist als Rat erkennbar
  und besser als keine Reaktion.
- **Der Satz "Bei kurzen Einheiten entsprechend weniger, aber nie ganz
  weglassen"** bleibt weg. Er widerspricht dem Session-Builder, und der hat
  recht: Eine Mini-Session von drei Minuten braucht keinen Cool Down.
- **Checkliste nur zum Lesen** im Basics-Tab, abhakbar nur im Heute-Tab.
  Richtig getrennt.
