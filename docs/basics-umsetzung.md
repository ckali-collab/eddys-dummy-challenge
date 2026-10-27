# Basics-Tab und Glossar: Umsetzung

Spezifikation für Claude Code. Die Inhalte stehen vollständig in
`docs/basics-tab.md` und `docs/glossar-v5.md`. Diese Datei sagt nur, wie sie
in die App kommen.

Der Basics-Tab ist heute ein Platzhalter, es gibt also keinen Altbestand, der
migriert werden müsste.

---

## 1. Datenstruktur

Zwei neue Dateien, beide reine Daten ohne JSX:

### `src/data/basics.js`

```js
export const BASICS_SECTIONS = [
  {
    id: 'einstieg',
    title: 'So fängst du an',
    open: true,
    showWhen: { experience: 'keine' },   // nur bei dieser Profilangabe
    blocks: [ /* siehe unten */ ]
  },
  // ...
];
```

Feld `showWhen` ist optional. Fehlt es, ist der Abschnitt immer sichtbar.
Feld `open` bestimmt, ob das Accordion beim Öffnen des Tabs aufgeklappt ist.

Blocktypen, bewusst wenige:

```js
{ type: 'text',   content: 'Ein Absatz.' }
{ type: 'lead',   content: 'Hervorgehobener Einleitungssatz.' }
{ type: 'list',   items: ['...', '...'], ordered: false }
{ type: 'check',  items: ['...', '...'] }        // Checkliste, nicht persistiert
{ type: 'table',  head: ['...'], rows: [['...']] }
{ type: 'quote',  content: 'Wörtliches Zitat.', source: 'S. 234' }
{ type: 'note',   content: 'Abgesetzter Hinweis.' }
```

`check` ist eine optische Checkliste ohne Speicherung. Die abhakbare Variante
vor der Session existiert bereits im Heute-Tab, die hier ist nur zum Lesen.

### `src/data/glossar.js`

Ersetzt die Datenkonstante mit dem einen Blinken-Eintrag.

```js
export const GLOSSAR = [
  {
    id: 'einweisen',
    term: 'Einweisen',
    group: 'pruefungsfaecher',
    short: 'Der Führer kennt die Lage des Dummys, der Hund nicht.',
    long: 'Der Führer lenkt ihn mit Pfeife und Handzeichen dorthin. Kommt erst in Dummy F vor.',
    aliases: []
  },
  // ...
];

export const GLOSSAR_GROUPS = [
  { id: 'klassen',        label: 'Prüfungsklassen' },
  { id: 'pruefungsfaecher', label: 'Prüfungsfächer' },
  { id: 'markieren',      label: 'Markieren und Apportieren' },
  { id: 'suchen',         label: 'Die beiden Suchen' },
  { id: 'fehler',         label: 'Fehler' },
  { id: 'position',       label: 'Position und Fußarbeit' },
  { id: 'steadiness',     label: 'Steadiness' },
  { id: 'ausruestung',    label: 'Ausrüstung' },
  { id: 'sinne',          label: 'Der Hund als Sinneswesen' },
  { id: 'lernen',         label: 'Lernen und Methodik' },
  { id: 'signale',        label: 'Signale' }
];
```

`short` ist der Text für die Sprechblase, `long` der im Glossar-Abschnitt.
Bei kurzen Einträgen kann `long` fehlen, dann zeigt das Glossar `short`.

**Die Evidenzstufen aus `glossar-v5.md` kommen nicht in die Daten.** Sie sind
nur für meine Prüfung. Zitate mit Seitenangabe bleiben, die gehören zum
Inhalt.

**Signale:** Die Einträge aus Topf 2 stehen in der Gruppe `signale`. Wo im Text
`{signal.x}` steht, wird der Wert aus dem Profil eingesetzt, wie in den
Übungstexten. Steht im Profil nichts, zeigt der Text die Funktion in Klammern,
etwa "dein Stopp-Signal".

---

## 2. Reihenfolge der Abschnitte

Genau wie in `docs/basics-tab.md`, Tabelle am Anfang. Zwölf Abschnitte,
Nummer 1 bis 3 aufgeklappt, der Rest eingeklappt.

**Abschnitt 3, Einwirkung und Korrektur, bleibt aufgeklappt und an Position 3.**
Das ist die einzige Stelle, an der die App eine methodische Haltung bezieht,
und sie soll nicht hinter einem Accordion stecken.

---

## 3. Antippbare Begriffe im Rest der App

Beim ersten Vorkommen eines Glossarbegriffs in einem Übungstext wird er
antippbar und markiert. Tippen zeigt eine Sprechblase mit `short` und einem
Link in den Glossar-Abschnitt.

**Markierung:** gepunktete Unterstreichung, **keine eigene Textfarbe.** Bei
drei Begriffen in einem Satz wird die Farbvariante unruhig, und draußen bei
Sonne ist sie schlechter lesbar.

**Stärke nach Profilangabe:** bei Erfahrung "Keine" deutlicher, sonst dezent.

**Nur das erste Vorkommen pro Textblock markieren**, nicht jedes. Sonst ist der
Kriteriumstext von H Gold durchgehend gepunktet.

Wenn die Erkennung der Begriffe im Text aufwendiger wird als erwartet, baue
zuerst nur den Glossar-Abschnitt und melde es. Die Sprechblasen sind der
Komfort, der Glossar-Abschnitt ist die Substanz.

---

## 4. Was NICHT in den Basics-Tab gehört

- Keine Navigation, keine neuen Tabs.
- Keine Verlinkung auf externe Seiten. Die Quellen stehen als Text, nicht als
  Link.
- Kein Suchfeld im Glossar, solange es unter etwa 60 Einträge hat. Die
  Gruppierung reicht.

---

## 5. Zwei Inhalte, die aus `training.js` kommen

Doppelte Pflege vermeiden:

- Die **Klassentabelle** in Abschnitt 2 zieht die Distanzen aus
  `DISTANCE_STEPS`, nicht aus hart geschriebenem Text.
- Die **Aufwärm-Zeiten** in Abschnitt 4 ziehen aus derselben Quelle wie der
  Session-Builder. Wenn dort Zahlen stehen, verweise darauf, statt sie zu
  wiederholen.

---

## 6. Reihenfolge der Arbeit

1. `src/data/glossar.js` aus `docs/glossar-v5.md` befüllen, Topf 1 und Topf 2.
2. `src/data/basics.js` aus `docs/basics-tab.md` befüllen, alle zwölf
   Abschnitte.
3. Den Basics-Tab von Platzhalter auf Accordion umbauen, Blocktypen rendern.
4. Glossar-Abschnitt mit Gruppierung.
5. Antippbare Begriffe, siehe Abschnitt 3.

Build nach jedem Schritt. Beide Inhaltsdateien gehören in den Commit.

Es gilt weiter: keine erfundenen Inhalte. Wo ein Text fehlt oder eine
Zuordnung unklar ist, melde die Lücke, statt sie zu füllen. Die
Evidenzstufen sind dabei ein Hilfsmittel: Was in `glossar-v5.md` als
`Empfehlung` markiert ist, ist mein Rat und keine Quelle. Alles andere ist
belegt und soll wörtlich übernommen werden.
