# Trophäen: Umbau mit Icons

**Diese Datei ersetzt `trophaeen-neu.md` vollständig.** Aus
`basics-und-trophaeen.md` bleiben die Abschnitte 1 bis 3 gültig, die
betreffen Basics und die Pause und haben mit den Trophäen nichts zu tun.

---

## 1. Die Icons liegen bereit

29 Dateien, freigestellt, quadratisch, 256 mal 256, als webp. **Ablage:
`public/icons/`**, also dort, wo die acht bestehenden Track-Icons liegen.

**Die 24 Level-Icons**, Namensmuster `<track>-<stufe>.webp`:

```
stop-whistle-bronze   stop-whistle-silber   stop-whistle-gold
recall-bronze         recall-silber         recall-gold
heel-bronze           heel-silber           heel-gold
steadiness-bronze     steadiness-silber     steadiness-gold
delivery-bronze       delivery-silber       delivery-gold
marking-bronze        marking-silber        marking-gold
scenting-bronze       scenting-silber       scenting-gold
directions-bronze     directions-silber     directions-gold
```

**Die fünf Zusatz-Icons:**

| Datei | gehört zu |
|---|---|
| `first-water.webp` | **Wasserratte**, bestehende Trophäe, hat heute kein Icon |
| `blind.webp` | **One-Cast Blind**, bestehende Trophäe, hat heute kein Icon |
| `first-distance.webp` | neue Trophäe **Weit draußen** |
| `first-double.webp` | neue Trophäe **Zwei auf einmal** |
| `first-place.webp` | neue Trophäe **Auswärtsspiel**, nur wenn messbar, siehe Abschnitt 6 |

**Drei Icons sind noch fehlerhaft** und werden nachgeliefert:
`scenting-gold`, `directions-silber`, die drei `recall`-Icons. Nimm die
vorhandenen Dateien trotzdem, sie werden später ersetzt. Die Dateinamen
ändern sich nicht.

---

## 2. Jedes Level bekommt eine Trophäe

Heute gibt es acht Track-Trophäen, jeweils nur für Gold. **Künftig gibt es
24, eine je Level.**

Die acht bestehenden "gemeistert"-Texte werden die **Gold-Texte**, sie passen
schon. **Bronze und Silber brauchen neue Texte.** Prüf, ob sich die Kriterien
der Level dafür eignen, und melde drei Beispiele, bevor du sie übernimmst.

**Die Taktung stimmt dann:** Ein Level sind vier Durchgänge, also frühestens
vier Sessions. Bei zwei Einheiten pro Woche heißt das alle zwei Wochen eine
Trophäe, vom ersten Monat an. Heute kommt die erste Track-Trophäe frühestens
nach zwölf Sessions.

---

## 3. Die Darstellung: acht Zeilen statt 24 Karten

24 Karten untereinander wären eine Wand. Stattdessen **eine Zeile pro Track
mit drei Medaillen nebeneinander**:

```
Stopp-Pfiff      [Bronze]  [Silber]  [Gold]
                  erreicht   grau      grau
```

Jede Medaille ist eine eigene Trophäe mit eigenem Icon und eigenem Text. Beim
Antippen öffnet sich der Text der jeweiligen Stufe. Die Zeile hält den Track
zusammen.

---

## 4. Verdiente Trophäen zeigen Farbe

Heute trägt jedes Trophäen-Icon inline `filter: brightness(0)`, also wird
jedes zur schwarzen Silhouette, auch die verdienten. Damit wäre der ganze
Aufwand mit 24 Motiven nicht sichtbar.

```css
.trophy image        { filter: none; }
.trophy.is-locked image { filter: brightness(0); }
```

Gesperrte bleiben Silhouette, das ist gewollt: Man sieht, dass da etwas ist,
aber erst beim Freischalten, was genau. Die bestehende Abdunklung
(`grayscale(1) brightness(0.72)`, `opacity: 0.42`) auf `.trophy.is-locked`
bleibt unverändert.

**Prüf dabei den Kontrast auf der Bronzemedaille.** Hundebraun und
Stiefelbraun liegen nah am Medaillenton, das Icon könnte verschwimmen. Falls
ja, hilft ein heller Ring zwischen Icon und Medaille. Melde, was du siehst.

---

## 5. Die Seite braucht Gruppen

Mit 24 plus 4 plus 3 plus Zusatztrophäen sind es rund 40 Einträge.

> **Können** — die acht Track-Zeilen
> **Besondere Momente** — Wasserratte, One-Cast Blind, die neuen Erstmale
> **Dabeibleiben** — Erster Schritt, Dranbleiber, Routinier, Dauerläufer
> **Prüfungsreife** — Fundament, Fortgeschritten, Gundog

**Die Kopfzeile "x von 17 Trophäen verdient"** wird bei 40 Einträgen zu
"3 von 41". Melde deine Einschätzung, ob das noch motiviert oder ob eine Zahl
je Gruppe besser ist. Du siehst die Anzeige, ich nicht.

---

## 6. Die neuen Erstmale

| Trophäe | Bedingung |
|---|---|
| **Weit draußen** | Erste Einheit auf Distanzstufe 3, also über 30 Meter |
| **Zwei auf einmal** | Erste Doppelmarkierung, also F Gold Stufe 1 |
| **Auswärtsspiel** | Erste Einheit an einem neuen Ort |

**Melde vor dem Einbau, was davon aus dem Datenstand messbar ist.** Bei
"Auswärtsspiel" ist offen, ob die App überhaupt Orte kennt. Was sie nicht
weiß, fällt raus oder wird ein Häkchen wie bei der Wasserratte. Nichts davon
darf geraten werden.

**Nasse Pfoten und Ganz allein** aus der Vorgängerdatei entfallen. Sie
doppeln die bestehenden Trophäen Wasserratte und One-Cast Blind, die
stattdessen die Icons aus Abschnitt 1 bekommen.

---

## 7. Reihenfolge

1. Icons nach `public/icons/` übernehmen
2. Abschnitt 2 und 3: die 24 Trophäen mit der Zeilen-Darstellung
3. Abschnitt 4: der Filter
4. Abschnitt 5: die Gruppierung
5. Abschnitt 6 erst nach deiner Meldung

Schritt 1 bis 4 gehören zusammen. Dazu kommt noch, was aus
`basics-und-trophaeen.md` Abschnitt 1 bis 3 offen ist.
