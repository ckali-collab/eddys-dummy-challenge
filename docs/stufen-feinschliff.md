# Feinschliff und eine Klarstellung zu den Quellen

---

## 0. Was belegt ist und was nicht

Der Einwand trifft. Ich fordere seit Wochen "keine erfundenen Inhalte" und
habe selbst abgeleitete Texte geliefert, ohne sie zu kennzeichnen. Das hole
ich hier nach.

**Belegt im Buch:**
- Die Reihenfolge Voran, dann Back, dann Rechts und Links, mit der Begründung,
  dass die Seitenrichtungen leichter sind und deshalb zuletzt kommen.
- Der Aufbau "erst eine Richtung allein, dann die andere allein, dann beide
  mit Wahl", also H Silber Stufe 2 bis 4.
- Das Back-Timing mit neutraler Armhaltung und zwei Sekunden Pause.
- Der Voran-Aufbau von der Futterschüssel über halbblind zum vollblind, also
  H Bronze Stufe 1 bis 4.
- Der Ablauf des Einweisens: auslegen, ausrichten, Voran, Suchensignal erst
  bei Witterung, dann selbstständig.

**Von mir konstruiert, nicht im Buch:**
- Die Distanzstaffelung 30, 50, 50, 80 Meter bei H Gold.
- Die drei Aufbauzeilen von C Silber.
- Die Zuordnung, welche Buchstufe welche Nummer bekommt.

**Warum das in Ordnung ist, aber benannt gehört:** Das Buch beschreibt
Lernwege, keine Vier-Stufen-Raster. Das Raster ist die Struktur dieser App,
und es zu füllen heißt, die Buchinhalte darauf zu verteilen. Was ich dabei
nicht tun darf, ist Inhalte erfinden, die im Buch nicht stehen. Eine Distanz
auf vier Stufen zu verteilen ist etwas anderes als eine Methode zu erfinden,
die es nicht gibt.

**Für dich heißt das:** Wenn dir ein Stufentext inhaltlich falsch vorkommt,
melde ihn, auch wenn er aus meiner Spec stammt. Bei der Verteilung habe ich
keine Quelle hinter mir, nur Plausibilität.

---

## 1. H Gold: Kartentext und Signalzeile

Der Kartentext beschreibt Stufe 3 und 4, steht aber auf allen vieren.

> Kartentext neu: Ein Durchgang auf der heutigen Stufe: Dummy vorher auslegen,
> Hund ausrichten, Voran.

Das deckt alle vier Stufen, das Suchensignal kommt aus dem Stufentext selbst.

**Signalzeile:** `search` erscheint ab Stufe 1, gebraucht wird es ab Stufe 3.
**Binde die Signale an Stufen**, wie Equipment und setup. Bei H Gold also
`out` ab Stufe 1, `stop` ab Stufe 1, `search` ab Stufe 3.

Wenn das Modell die Bindung für Signale nicht hergibt, melde es. Dann bleibt
die Zeile vollständig, das ist das kleinere Übel.

---

## 2. H Silber: die drei Regeln sind keine Varianten

Die Meldung ist richtig. "Jede Richtungsübung beginnt mit Stopp-Pfiff",
das Back-Timing und die Drehrichtung sind Regeln, die immer gelten, keine
Varianten zum Durchprobieren.

**Die ersten drei Zeilen wandern aus `steps` in `tips`.** Was im Aufbau bleibt:

1. Erst eine Richtung allein, dann die andere allein, dann beide mit Wahl.
2. Variante Voran auf der Uhr: aus derselben Position in leicht versetzte
   Richtungen schicken, die Winkel schrittweise enger.

Damit passt der Einleitungssatz, und `varianten` stimmt.

---

## 3. H Silber: drei kleinere Abweichungen

**Stufe 3 hat `d: 1`**, der Text sagt bis 30 Meter. **Auf `d: 2` ändern.** Die
Hintergrundwerte sollen den Texten nicht widersprechen, auch wenn sie nicht
sichtbar sind.

**Die Gelände-Kopfzeile** widerspricht der Vorbereitung und den Stufentexten,
die kein Gelände mehr nennen. **Regel:** Hat ein Level eigene Stufentexte,
entfällt die abgeleitete Gelände- und Distanzkopfzeile. Die Texte sagen es
selbst, genauer.

Betrifft H Bronze, H Silber und H Gold.

**Das Kriterium** sagt "trägt sie im Profil ein", das Glossar jetzt genauer.
Im Kriterium angleichen:
> Wer zwei Wörter nutzt, trägt beide in das Profilfeld ein, etwa "Rechts,
> Links".

---

## 4. C Silber: die vierte Zeile zurück

Ich hatte "drei Zeilen" geschrieben und dabei übersehen, dass eine bestehende
dadurch wegfällt. Der Satz "Er muss dich beobachten statt nebenher zu laufen"
ist gut und gehört zurück, als vierte Zeile:

1. Erst 100 Meter am Stück auf bekanntem Weg, ohne Ablenkung.
2. Dann eine Ablenkung dazunehmen, nie zwei gleichzeitig.
3. Zuletzt mit Dummy im Fang. Das ist die schwerste Variante, weil er sich auf
   zwei Dinge gleichzeitig konzentrieren muss.
4. Er muss dich beobachten statt nebenher zu laufen.

---

## 5. Deine fünf Entscheidungen

Alle richtig, und die erste ist mehr als eine Entscheidung.

**Die Anzeige des Aufbaus hing am Track, nicht an `stepsType`.** Das wusste
ich nicht, und meine Spec hat es falsch vorausgesetzt. Deine Regel, dass der
Block in den Hintergrund wandert, wenn ein Level eigene Stufentexte **und**
`varianten` hat, ist präziser als meine und lässt F unverändert. Die bleibt.

**Die Geländewerte bei H Gold** anzupassen war nötig, sonst hätte die
Kopfzeile dem Stufentext widersprochen. Mit Abschnitt 3 entfällt die Kopfzeile
dort ohnehin, die Werte bleiben trotzdem richtig gesetzt.

**"Ab Stufe 3" statt "Stufe 3"** ist genauer. Übernommen.

**H Gold bleibt `ablauf`**, richtig: Auslegen, ausrichten, Voran, Suchensignal
ist ein Durchgang von oben nach unten.

---

## 6. F Bronze: die Quellenfrage

Die Zahl 5 steht nicht im Buch, die Aussage "vier bis fünf Apports sind genug"
schon. Fünf ist die Obergrenze davon, und das Minimum 3 greift nur beim
Kürzen wegen Belastung.

Das ist dieselbe Art Ableitung wie in Abschnitt 0: eine Buchaussage auf eine
konkrete Zahl gebracht. Sie steht so nicht im Buch und widerspricht ihm auch
nicht.
