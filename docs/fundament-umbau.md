# Fundament-Umbau: training.js auf das Trainingsfundament

Prompt für Claude Code. Änderungsspezifikation, keine Ersatzdatei.
Grundlage: `entscheidungen.md`, `fundament.md`, `umbau.md`,
`zvolsky-auswertung.md`.

Alle Entscheidungen darin sind getroffen. Nichts in dieser Spec ist zur
Diskussion gestellt. Wo ein Wert als "Konstruktion" markiert ist, ist er von
mir aus den Quellen abgeleitet und nicht wörtlich belegt, aber verbindlich.

---

## 0. Reihenfolge der Arbeit

1. Globale Tabellen anlegen (Abschnitt 1)
2. `PRINCIPLES`, `SOURCES`, `COMMANDS` ersetzen (2 bis 4)
3. Level-Datenmodell erweitern (5)
4. Track-Metadaten setzen (6)
5. Level-Pfade einsetzen (7)
6. Die sechs Abweichungen beheben (8)
7. Belastung, Warm-up, Session-Regeln, Einstiegsalter (9 bis 12)
8. Troubleshooting ergänzen (13)

Nach jedem Schritt build laufen lassen. Keine Änderung an bestehenden
localStorage-Keys ohne Migration, siehe Abschnitt 14.

---

## 1. Neue globale Tabellen

```js
export const DISTANCE_STEPS = [
  { id: 1, maxM: 15, label: 'bis 15 m', paces: 20,
    note: 'Einwirkungsbereich. Junghunde bleiben hier.' },
  { id: 2, maxM: 30, label: 'bis 30 m', paces: 40,
    note: 'Prüfungsmaß DP-E.' },
  { id: 3, maxM: 50, label: 'bis 50 m', paces: 65,
    note: 'Prüfungsmaß Dummy A.' },
  { id: 4, maxM: 80, label: 'bis 80 m', paces: 105,
    note: 'Prüfungsmaß Dummy F.' }
];

export const TERRAIN_STEPS = [
  { id: 1, label: 'offen und einsehbar',
    examples: 'Wiese, Acker, Stoppelfeld' },
  { id: 2, label: 'niedrige Deckung',
    examples: 'hohes Gras, Brache, lichter Bewuchs' },
  { id: 3, label: 'hohe Deckung oder ein Geländewechsel',
    examples: 'Mais, Schilf, Waldrand, Graben, Hecke' },
  { id: 4, label: 'Wasser oder mehrere Wechsel',
    examples: 'tiefes Gewässer, Graben plus Hecke' }
];

// Die acht veränderbaren Bedingungen (Zvolsky S. 71 f.).
// Variantenachse für alle Tracks ohne Distanzbezug.
export const CONDITIONS = [
  { id: 'haltung',   label: 'Haltung, Gestik, Mimik',
    examples: 'stehend, laufend, Rücken zudrehen, am Boden, hinschauen oder wegschauen' },
  { id: 'ort',       label: 'Trainingsort',
    examples: 'Bewuchs, Hintergrund, Untergrund, Haus, Garten' },
  { id: 'gegenstand',label: 'Trainingsgegenstände',
    examples: 'Dummygewichte, Ball, Spezialdummy' },
  { id: 'position',  label: 'Entfernung und Position des Führers',
    examples: 'neben, vor, nah, fern' },
  { id: 'verleitung',label: 'Verleitungen',
    examples: 'andere Hunde, Menschen, Gegenstände, Winkel, andere Sequenzen' },
  { id: 'ausgang',   label: 'Ausgangssituation',
    examples: 'sitzt, steht, läuft, liegt, apportiert' },
  { id: 'belohnung', label: 'Aufbewahrungsort der Belohnung',
    examples: 'Jackentasche, Hosentasche, Dummytasche, Schüssel am Boden' },
  { id: 'wetter',    label: 'Wetter',
    examples: 'Sonne, Regen, Schnee, Nebel, Wind, Sturm, gegen die Sonne' }
];

// Lernphasen (Zvolsky S. 70 f.). Pro Level anzeigen, in welcher Phase
// der Nutzer sich befindet.
export const LEARNING_PHASES = [
  { id: 'erlernen', label: 'Erlernen',
    reinforce: 'jedes Mal, hochwertig',
    conditions: 'immer gleich, ablenkungsarm',
    goal: 'Verhalten entsteht' },
  { id: 'ueben', label: 'Üben',
    reinforce: 'unregelmäßig, nur bei optimaler Ausführung',
    conditions: 'Rahmenbedingungen variieren',
    goal: 'Qualität erhöhen' },
  { id: 'festigen', label: 'Festigen',
    reinforce: 'variabel, nur bei optimalem Verhalten',
    conditions: 'große Ablenkung, Konfliktsituationen',
    goal: 'Verhalten unter allen Bedingungen' }
];
```

**Warnhinweis, der bei jedem Levelwechsel angezeigt werden soll** (Zvolsky,
wörtlich): "Vermeiden Sie, eine noch nicht genügend gefestigte Übung mit
Ablenkung zu trainieren. Das bereits erreichte Niveau wird gesenkt und somit
das vorangegangene Training ad absurdum geführt."

---

## 2. PRINCIPLES ersetzen

Reihenfolge ist bewusst. Punkt 1 ist die Entscheidungsregel für alle
Zweifelsfälle.

```js
export const PRINCIPLES = [
  { name: 'Die Arbeit ist für den Hund',
    desc: 'Wo Motivation und Trainingsfortschritt in Konflikt geraten, gewinnt ' +
          'die Motivation. Abbruch vor Druck, Pause vor Wiederholung, ' +
          'Rückstufung vor Erzwingen.' },
  { name: 'Lerninhalte über positive Verstärkung',
    desc: 'Neues Verhalten entsteht über Belohnung, nie über Druck. Bekanntes ' +
          'Verhalten wird eingefordert, nicht verhandelt: unerwünschtes ' +
          'Verhalten wird unterbrochen und umgelenkt, nicht ausgesessen. ' +
          'Körperliche Einwirkung ist kein Mittel dieser App.' },
  { name: 'Eine Variable pro Steigerung',
    desc: 'Nie Distanz und Gelände gleichzeitig, nie Zeit und Distanz ' +
          'gleichzeitig. Steigt die Geländeschwierigkeit, geht die Distanz ' +
          'eine Stufe zurück.' },
  { name: 'Verteilt statt massiert',
    desc: 'Zwei kurze Einheiten pro Woche schlagen tägliches Training. Belegt ' +
          'bei Demant et al. 2011: 44 Beagles, Training ein bis zwei Mal pro ' +
          'Woche führte schneller zum Ziel als täglich, kurze Einheiten ' +
          'schneller als lange.' },
  { name: 'Selbstständigkeit vor Handling',
    desc: 'Im Regelwerk ist zu viel oder zu laute Lenkung ein schwerer Fehler ' +
          '("noisy or inappropriate handling"). Erst Markierung und Suche, ' +
          'dann Einweisen. Hilf nur, wenn der Hund verzweifelt, unsicher wird ' +
          'oder die Motivation verliert.' },
  { name: 'Einfach aufbauen',
    desc: 'Je einfacher eine Einheit aufgebaut ist, umso schneller versteht ' +
          'der Hund. Verschiedene Übungen am selben Tag zeitlich trennen, bei ' +
          'Anfängern auch räumlich: die Gefahr der Verwechslung und die ' +
          'daraus folgende Verwirrung muss so gering wie möglich bleiben.' },
  { name: 'Errorless Learning',
    desc: 'Die Aufgabe so stellen, dass der Hund sie lösen kann. Zielwert ' +
          'rund 80 Prozent Erfolgsquote. Praxiswert aus der ' +
          'Trainingsliteratur, keine Studie dazu bekannt.' }
];
```

**Entfernen:** die alte Formel "Keine Korrekturreize". Sie widerspricht dem
Fundament.

---

## 3. SOURCES ersetzen

```js
export const SOURCES = [
  'Monika Zvolsky, Die Kosmos Retrieverschule (Hauptquelle)',
  'Kennel Club, Field Trial Regulations J einschließlich Gundog Working Tests',
  'Deutscher Retriever Club, Ordnung für Arbeitsprüfungen mit Dummies',
  'Golden Retriever Club, Dummyprüfung A/F/O und DP-E',
  'Howard Kirby, Mullenscote Gundogs',
  'Lez Graham',
  'Demant et al. 2011, Trainingsfrequenz und Langzeitgedächtnis bei Hunden',
  'Ziv 2017, Journal of Veterinary Behavior, Review zu aversiven Methoden',
  'Vieira de Castro et al. 2020, PLoS ONE, Trainingsmethode und Tierwohl',
  'Dr. Astrid Siegl, Vierbeiner Reha-Zentrum, Aufwärmen und Cool Down'
];
```

**Mike Stewart, Wildrose Kennels entfällt.** Entschieden. Wildrose ist die
amerikanische Schule und war die Quelle der Vermischung (Dreifachmarke, Cold
Blind, Drill-Logik). Jeremy Hunt und Gundog Journal ebenfalls entfernen, weil
sie keinem Inhalt der App zuzuordnen sind.

---

## 4. COMMANDS korrigieren

Der jetzige Stand gibt Voran und Back dasselbe Handzeichen. Das ist falsch.

```js
{ word: 'Voran',
  gesture: 'Flache Hand auf der Hundeseite über den Kopf des HUNDES, ' +
           '20 bis 30 cm davor, zeigt die Laufrichtung wie über Kimme und Korn',
  when:    'Hund in Grundstellung neben dir' },
{ word: 'Back',
  gesture: 'Arm senkrecht über den EIGENEN Kopf',
  when:    'Nach Stopp-Pfiff, Hund steht entfernt und sieht dich an',
  note:    'Rechter Arm, der Hund dreht über die linke Schulter. ' +
           'Spiegelbildlich, weil er dich ansieht.' }
```

**Fuß und Ran** sind Nutzerkonventionen, keine festen Daten. Fuß ist links,
Ran ist rechts. Beide Wörter und beide Seiten kommen aus dem Profil, `COMMANDS`
zieht sie über `{signal.x}`.

**Handzeichen allgemein** (Zvolsky S. 67 f., belegt): Hunde sind
Bewegungsseher und haben kein Sehpigment für Grün. Das deutlichste Handzeichen
ist das, das die Silhouette des Führers am stärksten verändert. Ein
ausgestreckter Zeigefinger ist auf Distanz schlecht zu erkennen. Diesen
Hinweis in den Basics-Tab.

---

## 5. Level-Datenmodell erweitern

Neue Felder pro Level:

```js
{
  // bestehend: id, title, criteria, steps, reps, tip, ...
  exam:            'markierung',   // appell | markierung | suche | wasser | einweisen | null
  examClass:       'A',            // 'DP-E' | 'A' | 'F' | 'O'
  maxDistanceStep: 3,              // Index in DISTANCE_STEPS, null bei Tracks ohne Distanz
  path: [                          // nur bei Distanz-Tracks
    { d: 2, g: 2 }, { d: 3, g: 2 }, { d: 2, g: 3 }, { d: 3, g: 3 }
  ],
  conditionPath: [                 // nur bei Tracks ohne Distanz
    { condition: 'ausgang',    variant: 'Hund sitzt' },
    { condition: 'ausgang',    variant: 'Hund steht' },
    { condition: 'ausgang',    variant: 'Hund läuft' },
    { condition: 'verleitung', variant: 'fremder Hund in Sicht' }
  ],
  phase: 'ueben',                  // Lernphase, siehe LEARNING_PHASES
  minAgeMonths: 10                 // Einstiegsalter, siehe Abschnitt 12
}
```

`path` und `conditionPath` schließen sich aus. Jedes Level hat genau vier
Schritte, und der vierte Schritt ist die Zielkombination der Prüfungsklasse.

**Anzeige:** Nie exakte Meterzahl, immer Stufe plus Bandbreite plus
Schrittschätzung.

> **Schritt 2 von 4** - bis 30 m (etwa 40 Schritte), niedrige Deckung

---

## 6. Track-Metadaten

| Track | Prüfungsfach | Achse |
|---|---|---|
| A Stopp-Pfiff | Appell | Bedingungen |
| B Rückruf | Appell | Bedingungen |
| C Fuß | Appell | Bedingungen |
| D Steadiness | Appell, ab Gold Walk Up | Bedingungen |
| E Abgabe | **kein eigenes Fach**, wird in jedem Fach mitbewertet | Bedingungen |
| F Marking | Markierung | Distanz und Gelände |
| G Nasenarbeit | Suche | Distanz und Gelände |
| H Richtung und Blind | Einweisen | Distanz und Gelände |
| Wasser | **Einzelmarkierung Wasser**, eigenes Fach ab Dummy A | Distanz und Gelände |

**Track E:** Auf der Karte muss stehen, dass Abgabe kein Prüfungsfach ist. Das
erklärt, warum der Track keine Klasse trägt und trotzdem zu jeder Session
gehört.

**Wasser wird ein eigener Track mit Prüfungsbezug.** Entschieden. Dummy A
fordert "Einzelmarkierung Wasser" als eigenes Fach, Dummy F fordert
mindestens ein Dummy der Doppelmarkierung im Wasser. Pflichtaufgabe:
Einzelmarkierung Wasser auf A-Niveau.

**Level-Semantik:**

| Stufe | Klasse | Max. Distanzstufe |
|---|---|---|
| Bronze | DP-E, Einsteigerprüfung | D2 (30 m) |
| Silber | Dummy A, Anfängerklasse | D3 (50 m) |
| Gold | Dummy F, Fortgeschrittene | D4 (80 m) |

**Ausnahme Track H:** Einweisen kommt in DP-E und Dummy A nicht vor. Track H
arbeitet vollständig auf das F-Fach hin, die drei Level sind Aufbaustufen
innerhalb dieses Fachs. Gold zielt auf die O-Aufgabe "Einweisen in ein
Suchengelände".

**Freischaltung Track H:**
```js
requires: ['A:silber', 'F:silber', 'G:silber']
```

---

## 7. Die Level-Pfade

### Distanz-Tracks (F, G, H, Wasser)

Einheitliches Sägezahnmuster. Jedes Level beginnt, wo das vorige endete.

| Level | Schritt 1 | Schritt 2 | Schritt 3 | Schritt 4 |
|---|---|---|---|---|
| Bronze | D1 G1 | D2 G1 | D1 G2 | D2 G2 |
| Silber | D2 G2 | D3 G2 | D2 G3 | D3 G3 |
| Gold | D3 G3 | D4 G3 | D3 G4 | D4 G4 |

**Ausnahme Track H.** Richtungsarbeit ist nahbereichslastig, der Aufbau
beginnt tiefer und steigt später:

| Level | Schritt 1 | Schritt 2 | Schritt 3 | Schritt 4 |
|---|---|---|---|---|
| H Bronze | D1 G1 | D1 G1 | D2 G1 | D2 G1 |
| H Silber | D1 G1 | D2 G1 | D1 G2 | D2 G2 |
| H Gold | D2 G2 | D3 G2 | D3 G3 | D4 G3 |

Begründung: Bei H Bronze und Silber variiert nicht die Distanz, sondern die
Richtung und die Zahl der Signale. Zvolsky S. 228: "Nicht die Entfernung macht
das Einweisen schwer, sondern vielmehr alle anderen Einflussfaktoren."
Konstruktion, aus dieser Aussage abgeleitet.

**Ausnahme Wasser.** G ist beim Wassertrack immer mindestens 3, weil Wasser
per Definition G4 ist. Pfad:

| Level | Schritt 1 | Schritt 2 | Schritt 3 | Schritt 4 |
|---|---|---|---|---|
| Wasser Bronze | D1 G3 | D1 G4 | D2 G4 | D2 G4 |
| Wasser Silber | D2 G4 | D3 G4 | D3 G4 | D3 G4 |
| Wasser Gold | D3 G4 | D4 G4 | D4 G4 | D4 G4 |

Bei Wasser steigert sich innerhalb von G4 die Art des Eintritts: flache
Einstiegsstelle, steiles Ufer, Schwimmdistanz, Gegenufer mit Deckung.

### Bedingungs-Tracks (A, B, C, D, E)

Konstruktion aus den acht Bedingungen. Je Level vier Schritte, jeder Schritt
variiert genau eine Bedingung.

**A Stopp-Pfiff**

| Level | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Bronze | ausgang: Hund sitzt | ausgang: Hund steht | position: 10 m Abstand | position: 25 m Abstand |
| Silber | ausgang: Hund läuft auf dich zu | ausgang: Hund läuft von dir weg | position: 35 m | verleitung: Dummy liegt in Sicht |
| Gold | ausgang: Hund läuft zum Dummy | verleitung: fremder Hund in Sicht | verleitung: Wild oder Vogel | ort: unbekanntes Gelände |

**B Rückruf**

| Level | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Bronze | ort: Garten | ort: bekannte Wiese | verleitung: ein Mensch | position: aus dem Rücken gerufen |
| Silber | ort: unbekanntes Gelände | verleitung: fremder Hund | ausgang: aus dem Schnüffeln heraus | ausgang: aus dem Lauf heraus |
| Gold | verleitung: spielende Hunde | verleitung: Wildwitterung | ort: Wald mit Sichtverlust | wetter: Wind von vorn |

**C Fuß**

| Level | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Bronze | haltung: gerade Linie | haltung: Richtungswechsel | haltung: Tempowechsel | haltung: Stopp aus der Bewegung |
| Silber | verleitung: Dummys am Boden | ort: unbekanntes Gelände | verleitung: Menschen | gegenstand: mit Dummy im Fang |
| Gold | verleitung: fremde Hunde | verleitung: fliegendes Dummy | ort: Prüfungsähnliche Linie | wetter: Regen oder Wind |

**D Steadiness**

| Level | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Bronze | verleitung: Dummy wird fallen gelassen | verleitung: Dummy wird kurz geworfen | verleitung: Dummy weit geworfen | position: du gehst zwei Schritte weg |
| Silber | verleitung: zwei Dummys nacheinander | verleitung: Werfer wirft | position: du holst selbst | ausgang: aus der Bewegung |
| Gold | verleitung: anderes Gespann arbeitet zuerst | ausgang: Walk-up-Linie in Bewegung | verleitung: Schuss | ort: Prüfungsgelände |

**Die 80/20-Regel bei D gehört ins Kriterium** (Zvolsky S. 212): 80 Prozent
der geworfenen Dummys holt der Führer selbst, der Hund nur 20 Prozent.

**E Abgabe**

| Level | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Bronze | gegenstand: Welpendummy 200 g | gegenstand: Juniordummy 400 g | belohnung: Hand leer | position: Abgabe im Stehen vorn |
| Silber | gegenstand: Standard 500 g | gegenstand: Kaltwild oder Fell | position: Abgabe seitlich aus Fuß | ausgang: Festhalten bis zum Aus-Signal |
| Gold | gegenstand: nasses Dummy | gegenstand: sperriger Gegenstand | verleitung: zweites Dummy liegt bereit | ort: Prüfungssituation |

---

## 8. Die sechs Abweichungen beheben

### F Gold: Dreifachmarke ersetzen
Keine Prüfungsklasse kennt Dreifachmarken.
```
title:    'Doppelmarkierung auf F-Niveau'
criteria: 'Beide Dummys in der vorgegebenen Reihenfolge, bis 80 Meter,
           mindestens ein Dummy in Deckung oder über Wasser. Drei Durchgänge.'
reps:     3
```
Steps wie Silber, aber Distanz bis 80 m, ein Dummy hinter einer Sichtkante
oder über Wasser, Winkel enger als 90 Grad.

### D Gold: Honouring auflösen
Honouring steht in keinem Regelwerk als Fach, ist aber implizit Teil des Walk
Up: dort geht eine Linie mehrerer Gespanne, je Hund fliegt ein Dummy.
```
title:    'Standruhe in Verbindung mit Markieren (Walk Up)'
criteria: 'Bleibt in der Linie bei Fuß, wenn aus der Bewegung ein Dummy fliegt,
           auch wenn ein anderes Gespann vor dir arbeitet. Drei Durchgänge.'
```
Schritt 5 heißt nicht mehr Honouring, sondern "ein anderes Gespann arbeitet
zuerst".

### H Gold: Cold Blind und Clock Face ersetzen
Beides US-Terminologie, Clock Face war erfunden.
```
title:    'Einweisen in ein Suchengelände'
criteria: 'Wird auf ein nicht sichtbar ausgelegtes Dummy in ein Suchengelände
           eingewiesen und arbeitet dort selbstständig. Bis 80 Meter,
           maximal zwei Korrekturen. Drei Durchgänge.'
diagram:  'einweisen-gelaende'
```
Trophäe `one-cast` bleibt.

**Zusätzlich aufnehmen, weil im Buch belegt:** die Übung **"Voran auf der
Uhr"**. Sie trainiert enge Winkel beim Voran, nicht das Einweisen nach dem
Stopp. Gehört nach H Silber als Variante, nicht nach H Gold.

### H Bronze: Memory herausnehmen
Memory ist laut Regelwerk eine Variante der Markierung und steht in Dummy A im
Fach "Appell und Memory", nicht beim Einweisen. Memory wandert nach **F
Silber** als Variante, in der Form mit Standortwechsel:
```
Variante Memory: Dummy sichtbar werfen, Hund wartet, ihr wechselt die
Position um mindestens 20 Meter, dann von dort schicken.
```
H Bronze enthält danach nur noch Voran: gerade Linie, Distanzaufbau, Wechsel
von sichtbar auf unsichtbar.

### Track G: die Drei-Variablen-Steigerung auflösen
Bisher steigen von Bronze auf Silber Distanz, Gelände und Verzögerung
gleichzeitig, während der Tipp derselben Stufe "Immer nur eine Variable
steigern" sagt. Das wird durch den D/G-Pfad aus Abschnitt 7 ersetzt. Die
Verzögerung ist keine eigene Steigerungsachse mehr, sondern eine Variante
innerhalb des letzten Schritts.

### A Gold und H Silber entzerren
A Gold enthält "Stopp im Lauf **und** Stopp bei realer Ablenkung", das sind
zwei Kriterien. H Silber enthält Back, Links, Rechts und Memory Blind in einem
Level. Memory Blind fällt weg. Beide Level werden über den `conditionPath` aus
Abschnitt 7 auf je eine Steigerung pro Schritt verteilt.

---

## 9. Belastung und Retrieves

```js
// bisher 8 Punkte Default
LOAD_LIMITS: {
  maxRetrievesPerSession: 5,   // Zvolsky S. 210: "Vier bis fünf Retrieves
                               // sind für den Hund mehr als genug."
  maxRepeatsOnFailure: 2       // "Maximal zwei Wiederholungen, dann sollten
                               // Sie an dieser Stelle erst einmal für heute
                               // aufhören."
}
```

Beim Überschreiten eine Warnung, keine Sperre.

---

## 10. Warm-up und Cool Down

Quelle: Beitrag Dr. Astrid Siegl, Vierbeiner Reha-Zentrum, im Buch.

| Sessiontyp | Warm-up | Cool Down |
|---|---|---|
| Vollsession | 15 min, nie unter 10, bei ca. 30 % der max. Leistungsfähigkeit | ca. 10 min |
| Kurzübung | 5 min, zügiges Lösen und Traben | 3 bis 5 min |
| Mini-Session | 3 min Bewegung, kein strukturiertes Programm | entfällt |

Unabhängig vom Sessiontyp:
- Nach dem Aufwärmen zügig starten.
- Wartezeit maximal 5 bis 10 Minuten.
- Über 20 Minuten Wartezeit: **neu aufwärmen.**

Bei Kurzübung und Mini-Session Hinweis anzeigen, dass die verkürzte Variante
unter der physiotherapeutischen Empfehlung liegt und nur bei geringer
Belastungsintensität vertretbar ist.

---

## 11. Session-Regeln

### Neue Regel, die die Level-Logik ändert
Zvolsky S. 87, wörtlich: "Beginnen Sie an jedem Trainingstag mit der jeweiligen
Übung (Trainingseinheit) immer **einen Schritt vor dem Punkt, an dem Sie das
letzte Mal aufgehört haben.** Somit geben Sie dem Hund die Möglichkeit, sich an
die Übung zu erinnern."

**Umsetzung:** Die App schlägt beim Fortsetzen eines Levels nicht den
erreichten Schritt vor, sondern den davor. Ist der erreichte Schritt der
erste, bleibt es dabei. Der Vorschlag ist überschreibbar.

### Nach gelungener Übung
"Hat die Übung geklappt, dann machen Sie erst einmal eine Pause. Eine gerade
gelungene Übung noch mehrmals zu wiederholen oder gar die Anforderungen gleich
zu steigern, ist in der Regel kontraproduktiv."

**Umsetzung:** Nach einem als gelungen markierten Durchgang schlägt die App
eine Pause vor, nicht die nächste Wiederholung. Steigerung erst in der
nächsten Session oder nach der Pause.

### Trainingsvorbereitung, neue Checkliste vor der Session
Zvolsky S. 86: Alles vorbereiten, **bevor** der Hund aus dem Auto kommt.
```
[ ] Dummys ausgelegt (wenn Einweisen geübt wird)
[ ] Werfer instruiert (wenn Markierungen geübt werden)
[ ] Hindernis oder Rollzaun aufgestellt
[ ] Jacke zugeknöpft (flatternde Ecke behindert den Hund beim Markieren
    und trifft ihn bei Fuß im Gesicht)
[ ] Pfeife in der Hand oder im Mund, nicht in der Tasche
[ ] Hund gelöst, angeleint, auf die Aufgabe konzentriert
```
Dazu der Hinweis: Hände während der Wartezeiten in die Jackentaschen. Hunde
springen oft ein, weil der Führer mit den Händen herumfuchtelt.

### Fünf Planungsfragen, optional vor der Vollsession
1. In welche Teilziele zerlege ich die heutige Aufgabe?
2. Was will ich in welcher Reihenfolge üben?
3. Welche Probleme können auftreten?
4. Wie reagiere ich darauf, oder wie vermeide ich sie?
5. Welches Ziel will ich heute erreichen?

### Blöcke zeitlich trennen
Verschiedene Übungen am selben Tag zeitlich trennen, bei Anfängern auch
räumlich. Der Session-Builder darf drei Tracks in eine Session legen, muss
aber zwischen den Blöcken eine Pause ausweisen und den Grund nennen:
Verwechslungsgefahr.

### Wann eingreifen
"Wenn Sie den Eindruck gewinnen, Ihr Hund verzweifelt an der gestellten
Aufgabe; wenn Sie beobachten, dass seine Motivation schwindet oder dass er
unsicher wird, dann müssen Sie ihm unbedingt helfen." Sonst nicht: er muss
lernen, selbstständig zu arbeiten und eigene Erfahrungen zu sammeln.

---

## 12. Einstiegsalter

```js
minAgeMonths: {
  apportiertraining: 10,   // nach dem Zahnwechsel, ca. 9 bis 10 Monate
  markierungen: 10,        // 8 bis 10 Monate, nur wenn der Hund steady ist
  walkUpOhneLeine: 12,
  verlorensucheSystematisch: 12,
  schuss: null             // nach der Geschlechtsreife, individuell
}
```

Die App vergleicht mit dem Geburtsdatum im Profil und zeigt bei
Unterschreitung einen Hinweis, keine Sperre. Vor dem Einstiegsalter gilt:
"Zwei bis drei Apportiereinheiten mit maximal zwei bis drei Wiederholungen in
der Woche sind zu Beginn mehr als ausreichend."

---

## 13. Troubleshooting ergänzen

### Fünf Fehlerursachen, als Auswahl bei einem fehlgeschlagenen Durchgang
1. **Körperliche oder geistige Überforderung** - Pause machen
2. **Unpassende Trainingsmethode** - Pause, Methode überdenken
3. **Einführung neuer Verhaltensdetails** - altes Verhalten wird vorübergehend
   schlechter. **Ignorieren, nicht maßregeln**, es verschwindet von allein
4. **Vom Hund bewusst eingebaut** - er testet, was wirklich erwartet wird.
   Sanfte Korrektur oder einfach nicht belohnen
5. **Zu schnelle Steigerung** - zurück in den Kindergarten

Bei unklarer Ursache: "Es ist immer besser, nicht zu reagieren, als falsch zu
reagieren."

### Übersprungsverhalten, als Checkbox-Liste in der Sessionbewertung
Gähnen, Sich-Lecken, Sich-Kratzen, Bellen als Stressentladung, Schnuppern am
Boden ohne Witterung, Sitzenbleiben beim Schicken, Zurückkommen obwohl
geschickt. "Sie sind ein deutliches Zeichen dafür, dass er die Aufgabe noch
nicht richtig verstanden hat." Mehr als zwei Zeichen: Rückstufung vorschlagen.

### Fehlendes Problem: Blinken
Der Hund findet das Dummy und zeigt es nicht an. Häufiger Fehler, fehlt
bisher komplett.

### Dummy-Korrekturen
| | bisher | neu |
|---|---|---|
| Welpendummy | 250 g | **200 g** |
| Juniordummy | fehlte | **400 g** |
| Standard | 500 g | 500 g |
| Suchendummy | fehlte | **80 g** |

**Farben, bisher falsch herum:** Der Hund hat kein Sehpigment für Grün. **Blau
und Violett sieht er zweifelsfrei, deshalb sind blaue Dummys die beste
Lernhilfe.** Rot, Gelb, Orange, Braun, Gelbgrün und Grün kann er nicht
unterscheiden, Rot erscheint ihm als sattes Gelb. Orange ist für den
**Menschen** gut sichtbar, nicht für den Hund. Weiße Dummys wirken über den
Kontrast, nicht über die Farbe.

**Pocket Dummy:** ist das 80-g-Suchendummy für Suchenpfiff-Training bei
geringer Witterung, kein Jackentaschen-Dummy für unterwegs.

**Markierstab:** Sichthilfe **für den Hund**, nicht für den Führer. Praxisregel:
mindestens vier aufstellen, damit nicht der Stab selbst zum Ziel wird.

---

## 14. Was unangetastet bleibt

- **Die acht Tracks.** Sie sind feiner als die Prüfungsfächer und als
  Trainingstagebuch besser geeignet. Die Fächer sind eine zweite Schicht
  darüber, kein Ersatz.
- **Drei Durchgänge als Zähler.** Gesetzt, nicht belegt. Bleibt, aber als
  Empfehlung gekennzeichnet.
- **Das Belastungsmodell.** Sportmedizinische Plausibilität, keine
  Studienlage. Bleibt gekennzeichnet.
- **Bestehende localStorage-Keys.** Wenn sich das Level-Datenmodell ändert,
  braucht der Fortschritt eine Migration: alte Levelstände auf den neuen
  Vier-Schritt-Pfad abbilden, im Zweifel auf Schritt 1 des erreichten Levels.
  Kein Reset ohne Migration.
- **Service Worker und Manifest.** Nur Cache-Version hochziehen.
