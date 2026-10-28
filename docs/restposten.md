# Restposten

Letzter Durchlauf am Regelwerksbezug. Alles klein, aber es sind
Widersprüche im sichtbaren Text.

---

## 1. Der Einleitungssatz hebt die Soll-Wert-Korrektur wieder auf

Punkt 6 des Berichts. Im Basics-Tab, Abschnitt "Worauf das Training
hinarbeitet", steht weiter "bis 30 / 50 / 80 Meter". Das ist genau die
Formulierung, die Abschnitt 3 der Korrektur ersetzen sollte, und sie steht
einen Absatz über der korrigierten Tabelle.

Neuer Satz:

> Die Übungen folgen den deutschen Dummyprüfungen. Bronze ist die
> Einsteigerprüfung DP-E des Golden Retriever Club, Silber die Anfänger-Klasse
> und Gold die Fortgeschrittenen-Klasse der DRC-Ordnung. Die Apportdistanzen
> sollen dort 30, 50 beziehungsweise 80 Meter nicht überschreiten, werden aber
> an Gelände und Witterung angepasst. Deshalb heißt Bronze nicht einfach
> leicht, sondern Einsteigerniveau. Du musst nie zu einer Prüfung gehen, aber
> die Stufen bedeuten etwas außerhalb dieser App.

---

## 2. Der DP-E-Glossareintrag, ausformuliert

Punkt 2 des Berichts: richtig gehandelt, den falschen Eintrag nicht stehen zu
lassen. Damit die Formulierung geprüft ist, hier der Text zum Übernehmen:

```
DP-E, Dummy-Einsteigerprüfung

Einsteigerprüfung des Golden Retriever Club e.V., in zwei Varianten: mit
Schuss (m. S.) und ohne (o. S.). Nicht Teil der DRC-Ordnung. Der Hund muss am
Prüfungstag mindestens 12 Monate alt sein.

Apportdistanzen sollen 30 Meter nicht überschreiten, angepasst an Gelände und
Witterung.

Fünf Fächer zu je 20 Punkten: Unterordnung, Doppelmarkierung, Apportieren mit
verspätetem Schicken, Apportieren von zwei Dummys, Markierapport. Bestanden ab
50 Punkten, wenn kein Fach mit null Punkten bewertet wurde.

Die DP-E enthält keine Verlorensuche, kein Einweisen und keine Wasserarbeit.
Dafür eine Doppelmarkierung, in einer leichteren Form als die
Fortgeschrittenen-Klasse: Der Führer holt den zuerst geworfenen Dummy selbst,
der Hund nur den zuletzt geworfenen.
```

---

## 3. Einspringen: die DP-E ist milder

Punkt 7 des Berichts, nachgereicht. Beim Glossareintrag "Einspringen"
ergänzen:

> In der DP-E wird ein einmaliges, haltbares Einspringen nur mit der halben
> Punktzahl bewertet statt mit null. Die Einsteigerprüfung ist an dieser Stelle
> milder als die APD/R.

---

## 4. Drei Vereinheitlichungen

**Prüfungsbezug bei Track G.** G Bronze heißt jetzt "Verlorensuche", G Silber
und G Gold heißen weiter "Suche". Alle drei auf **"Verlorensuche"**, das ist
die Bezeichnung in beiden Ordnungen.

**`examSubject` je Track.** Veraltet und nirgends angezeigt. **Löschen.** Der
Prüfungsbezug steht jetzt pro Level, und ein Track kann ohnehin auf mehrere
Fächer einzahlen, wie D Bronze zeigt.

**Pfad der Verweisdatei.** In `dp-e-korrektur.md` steht
`docs/quellen/regelwerke.md`, die Datei liegt unter `docs/regelwerke.md`. Den
Pfad in der Spec korrigieren, damit die Dokumentation stimmt.

---

## 5. Bestätigt

- **Die beiden gelöschten Docs gehören in den Commit.**
  `durchgaenge.md` und `trainingskonzept-v2.md` stammen aus der Zeit vor dem
  Fundament-Umbau und widersprechen dem aktuellen Stand. Die Löschung ist
  gewollt.
- **A Bronze mit "Dummy A, Appell"** ist die richtige Entscheidung. Der Stopp
  auf Distanz kommt in der DP-E nicht vor, gehört aber zum Appell der
  Anfänger-Klasse.
- **Die Retrievergebrauchsprüfung bleibt draußen.** Sie ist eine jagdliche
  Prüfung und für die Dummyarbeit nicht die Grundlage. Die endgültige Liste
  gilt.
- **Varianten ohne Stufenbindung** sind in Ordnung. Die Zuordnung "Stufe 3
  oder 4" war ein Vorschlag, keine Anforderung.
- **Preflight fehlt**, weil sich der Pfad des Skill-Plugins geändert hat. Kein
  Grund zu warten, aber vor dem nächsten größeren Durchlauf einmal nachsehen,
  wo das Skript jetzt liegt.
