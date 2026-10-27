# Fundament-Umbau, Teil 5: Aufräumen

Letzter Nachtrag an den Daten. Teil 4 kann vorher committet werden.

---

## 1. G Bronze: zehn Dummys, nicht sechs bis acht

Widerspruch zwischen meinen eigenen Teilen. Teil 3 verlangt "zehn oder mehr"
für alle G-Level, Teil 4 nennt bei G Bronze "sechs bis acht". **Teil 3 gilt.**

Das Buchprinzip gilt ab dem Einstieg: viele auslegen, wenige holen lassen, den
Rest sichtbar selbst holen. Genau das verhindert, dass der Hund sich eine
feste Zahl angewöhnt, und das ist von der ersten Einheit an so.

G Bronze, Schritt 2 neu:

> Zehn oder mehr Dummys **im Halbkreis um den Hund** auslegen, 10 bis 15 Meter
> Abstand zueinander. Der Hund sieht dabei zu. Der Halbkreis minimiert die
> Tauschgefahr.

Schritt 4 bleibt bei "zwei bis drei holen lassen". Die Differenz zwischen
ausgelegt und geholt ist der Punkt der Methode, kein Fehler.

---

## 2. "Auf dem letzten Schritt" heißt jetzt "Auf der letzten Stufe"

Punkt 1 des Berichts. In den Kriterien von G Silber und G Gold, und überall
sonst, wo ein Inhaltstext den Pfad meint:

- G Silber: "Auf der letzten Stufe mit zwei Minuten Verzögerung zwischen
  Auslegen und Schicken."
- G Gold: "Auf der letzten Stufe mit fünf Minuten Verzögerung."
- Die Ablaufschritte 4 beziehungsweise 5: "Nur auf der letzten Stufe: ..."

Such den Wortlaut im Datenbestand und ersetze ihn überall, wo der Pfad gemeint
ist. Wo "Schritt" einen Ablaufschritt meint, bleibt er.

---

## 3. Zwei Arten von Schrittlisten unterscheiden

Punkt 3 des Berichts, und der substanziellste. Die Einleitung "In einem
Durchgang arbeitest du an einer dieser Varianten, nicht an allen" stimmt für
die Bedingungs-Tracks, aber nicht für die neuen Abläufe.

Neues Feld pro Level:

```js
stepsType: 'varianten'   // oder 'ablauf'
```

| Wert | Bedeutung | Einleitungstext |
|---|---|---|
| `varianten` | Jeder Schritt ist eine eigene Übungsvariante | In einem Durchgang arbeitest du an einer dieser Varianten, nicht an allen. |
| `ablauf` | Die Schritte gehören in dieser Reihenfolge in einen Durchgang | So läuft ein Durchgang ab, von oben nach unten. |

Zuordnung:

| Level | stepsType |
|---|---|
| G Bronze, G Silber, G Gold | `ablauf` |
| H Bronze, H Silber, H Gold | `ablauf` |
| F Gold | `ablauf` |
| D Gold | `ablauf` |
| alle übrigen | `varianten` |

Die Überschrift "Aufbau über mehrere Wochen" passt nur zu `varianten`. Bei
`ablauf` heißt sie **"Ablauf eines Durchgangs"**.

Bei H Bronze ist das ein Grenzfall: die sechs Schritte von der Futterschüssel
bis zum Vollblind laufen über Wochen, nicht in einem Durchgang. Trotzdem
`ablauf`, weil sie eine feste Reihenfolge haben und keine wählbaren Varianten
sind. Die Reihenfolge ist im Buch begründet und darf nicht gemischt werden.

---

## 4. Alte G-Tipps streichen

Punkt 4 des Berichts. Beide widersprechen dem neuen Fundament:

- **G Bronze, "Zone anfangs klein, etwa 5 Meter Radius":** streichen. Steht
  gegen den Halbkreis mit 10 bis 15 Metern Abstand.
- **G Silber, "Erst Distanz, dann Gelände, dann Zeit":** streichen. Die
  Steigerungsreihenfolge ist jetzt der Stufenpfad, und der ordnet Distanz und
  Gelände anders.

Ersatz brauchen sie nicht, die Suchen-Regeln aus Teil 2 decken den Inhalt ab.

---

## 5. Nasen-Text nur einmal

Punkt 5 des Berichts. **Den Tipp entfernen, die Suchen-Regel behalten.** Die
Regeln aus Teil 2 sind der Ort dafür, und dort steht der vollständige
Zusammenhang mit dem Zickzackkurs.

---

## 6. Mini-Session: Hinweistext korrigieren

Der Hauptteil heißt noch "Nasenarbeit oder einfache Marke." Beides kann dort
nicht mehr vorkommen: Nasenarbeit ist Track G und ist jetzt ausgeschlossen,
Marking war nie freigegeben. Neuer Text:

> Appell, Führigkeit oder Abgabe. Kurz, ohne Aufbau.

Dass die Mini-Session ab Gold keinen Hauptteil mehr hat, ist richtig so und
war vorher praktisch genauso. Die Gold-Level brauchen Werfer, Gelände oder
mehrere Dummys, das ist kein Spaziergangsprogramm.

---

## 7. Danach

Damit sind die Daten durch. Was offen bleibt, braucht keine Spezifikation,
sondern Inhalt: Glossar, Basics-Tab, Einwirkungs-Abschnitt und Rechtskapitel.
Die Glossar-Datenkonstante mit dem einen Eintrag bleibt bis dahin unangetastet.
