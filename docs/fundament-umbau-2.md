# Fundament-Umbau, Teil 2: Lücken schließen

Nachtrag zu `docs/fundament-umbau.md`. Schließt die Lücken und Widersprüche aus
dem Bericht zu Teil 1. Reihenfolge wie unten.

Drei der gemeldeten Widersprüche waren Fehler in Teil 1, nicht im Repo. Die
Auflösung steht in Abschnitt 0 und ist verbindlich.

---

## 0. Die drei Widersprüche aus Teil 1, aufgelöst

### Abschnitt 9 gegen Abschnitt 14
Teil 1 hat das Belastungsmodell gleichzeitig geändert und für unantastbar
erklärt. Auflösung:

**Unantastbar ist die Logik:** dass Apports gezählt werden und nicht Übungen,
das Feld `counts`, der Gelenkbefund-Faktor, die Sortierung des Hauptteils,
`SESSION_FALLBACKS`.

**Änderbar ist der Zahlenwert.** `maxRetrievesPerSession` geht von 8 auf 5.

Wichtig dabei: Die 5 ist eine **Warnschwelle, keine Sperre.** Wenn der
Session-Builder die Zahl heute als harte Obergrenze für die Blockzahl nutzt,
muss sich das Verhalten ändern: Der Builder plant bis 5 Apports, und was
darüber hinausgeht, wird geplant und mit einem Hinweis versehen, statt
weggelassen. Die Session darf nicht leerer werden als vorher.

### Der Wasser-Track gegen "acht Tracks bleiben"
Teil 1 hat beides gefordert. Auflösung: **Kein neunter Track.** Meine
Entscheidung 7 im Fundament war falsch, der Strukturbruch ist den Gewinn nicht
wert.

Stattdessen ist Wasser das, was es im D/G-Modell ohnehin schon ist: die
Geländestufe G4. Daraus folgt nur eine Pflicht:

- **F Silber, Schritt 4** muss ein Wasserschritt sein, weil Dummy A eine
  Einzelmarkierung Wasser als eigenes Fach fordert. Der Pfad für F Silber
  ändert sich deshalb von `[{d:2,g:2},{d:3,g:2},{d:2,g:3},{d:3,g:3}]` auf
  `[{d:2,g:2},{d:3,g:2},{d:2,g:3},{d:3,g:4}]`.
- **F Gold, Schritt 4** bleibt wie in Teil 1 auf G4, das deckt die
  F-Anforderung "mindestens ein Dummy im Wasser" ab.

Das Wasser-Modul in der App bleibt als Modul, wird aber mit dem Hinweis
versehen, dass Wasser in Dummy A ein eigenes Prüfungsfach ist. Ein eigener
Track ist zurückgestellt.

### F Gold verliert bei alten Ständen den Abschluss
Richtig erkannt, und die Zweifelsregel greift hier falsch. Auflösung:

**Ein abgeschlossenes Level bleibt abgeschlossen.** Ist `completedAt` gesetzt,
steht das Level nach der Migration auf **Schritt 4 und gilt als
abgeschlossen**, unabhängig vom Durchgangszähler. Der Zähler wird dabei auf
den neuen Sollwert gesetzt, nicht auf den alten belassen. Trophäen werden
daraus neu berechnet und bleiben damit freigeschaltet.

Begründung: Kali hat die Leistung erbracht. Dass ich die Durchgangszahl
nachträglich erhöht habe, ist mein Eingriff, nicht seine Lücke.

---

## 1. Das Schritt-Zähler-Modell

Das ist die eigentliche Lücke aus Teil 1: vier Schritte und drei Durchgänge
ohne Verbindung. Hier die Verbindung.

### Die Regel

| Bewertung | Durchgangszähler | Schritt |
|---|---|---|
| gut | +1 | +1, maximal 4 |
| okay | unverändert | unverändert |
| noch nicht | unverändert | -1, minimal 1 |

**Level abgeschlossen bei Zähler 3 und Schritt 4.** Beides wird gleichzeitig
erreicht, wenn drei Durchgänge als "gut" bewertet werden: Start auf Schritt 1,
dreimal "gut", Ende auf Schritt 4 mit Zähler 3. Die beiden Zähler laufen
synchron und können nicht auseinanderdriften.

"noch nicht" setzt weiterhin keinen Durchgangszähler zurück und nimmt kein
abgeschlossenes Level weg. Es senkt nur den Schritt, und damit die
Schwierigkeit der nächsten Session. Das ist die Rückstufung, die Zvolsky für
den Fall "zu schnelle Steigerung" fordert.

### Die Rücksetzungsregel ist ein Einstieg, kein Zählschritt

Der Zvolsky-Satz aus Abschnitt 11 von Teil 1 ("immer einen Schritt vor dem
Punkt, an dem Sie das letzte Mal aufgehört haben") betrifft den **Beginn der
Einheit**, nicht die Bewertung. Deshalb nennt jeder Session-Block künftig
**zwei** Schritte:

```
Einstieg (zum Erinnern, wird nicht bewertet):
  Schritt 1 - bis 15 m (etwa 20 Schritte), offen und einsehbar

Ziel heute (wird bewertet):
  Schritt 2 - bis 30 m (etwa 40 Schritte), offen und einsehbar
```

Der Einstiegsschritt ist immer der Zielschritt minus 1. Steht das Level auf
Schritt 1, entfällt der Einstieg und Schritt 1 ist das Ziel. Bewertet wird
immer nur der Zielschritt.

### Neue Felder im Fortschritt
```js
// pro Level, zusätzlich zum bestehenden Zähler
step: 1          // 1 bis 4, aktueller Zielschritt
```
Das Feld ist bereits aus Teil 1 vorhanden. Es fehlt nur die
Weiterschalt-Logik oben.

---

## 2. Lernphasen zuordnen

Keine eigene Tabelle nötig, die Zuordnung folgt der Stufe:

| Stufe | Phase |
|---|---|
| Bronze | `erlernen` |
| Silber | `ueben` |
| Gold | `festigen` |

Das deckt sich mit den Phasenbeschreibungen: Bronze baut das Verhalten auf,
Silber variiert die Rahmenbedingungen, Gold sichert es unter Ablenkung und im
Konflikt ab. Setze `phase` an allen 24 Leveln nach dieser Regel.

---

## 3. Einstiegsalter ohne Logik

Das Profil hat kein Geburtsdatum, und eines einzuführen ist eine
UI-Änderung, die hier nicht hingehört. Deshalb:

**Keine automatische Prüfung, kein Vergleich, keine Sperre.**
`minAgeMonths` wird nur als **Hinweistext im Übungsdetail** angezeigt:

> Ab etwa 10 Monaten, nach dem Zahnwechsel.

Zuordnung pro Track, nicht pro Level:

| Track | minAgeMonths | Begründung aus dem Buch |
|---|---|---|
| A, B, C, E | null | kein Mindestalter, Appell und Abgabe von Anfang an |
| D | 10 | Steadiness setzt Markierungen voraus |
| D Gold | 12 | Walk-up ohne Leine ab ca. 12 Monaten |
| F | 10 | Markierungen 8 bis 10 Monate, und nur wenn steady |
| G | 12 | Verlorensuche systematisch ab 12 Monaten |
| H | 12 | folgt auf Markierung und Suche |

Dazu der Satz für die Bronze-Level, in denen noch kein Apport vorkommt: "Zwei
bis drei Apportiereinheiten mit maximal zwei bis drei Wiederholungen in der
Woche sind zu Beginn mehr als ausreichend."

---

## 4. Die Ersatztexte für die fünf umgebauten Level

Das ist der inhaltlich wichtigste Teil. Bisher stehen Titel und Kriterium neu,
aber Ablauf, Schritte und Equipment noch von der alten, erfundenen Übung. Die
folgenden Texte ersetzen sie vollständig. Alle Inhalte stammen aus dem Buch,
Abschnitte 10 bis 12 der Auswertung.

### H Bronze - nur Voran

```
title:    'Voran - die gerade Linie'
criteria: 'Läuft auf Handzeichen und Signal in gerader Linie vom Führer weg
           und nimmt ein nicht sichtbar ausgelegtes Dummy auf. Bis 30 Meter.
           Drei Durchgänge.'
```

Ablauf, Buchreihenfolge:
1. Futterschüssel an einer **Leitlinie** (Weg, Zaun, Grabenkante) auslegen,
   Hund daneben ausrichten, Handzeichen, Signal. Die Leitlinie macht die
   gerade Linie für den Hund selbsterklärend.
2. Entfernung vergrößern, Leitlinie beibehalten.
3. Zwei Schüsseln als Ablenkung, der Hund muss die ausgerichtete nehmen.
4. Dummy statt Schüssel.
5. **Halbblind:** Ein Helfer legt nach, während der Hund zurückläuft. Der Hund
   weiß, dass dort etwas liegt, hat es aber nicht gesehen.
6. **Vollblind:** vorher ausgelegt, der Hund hat nichts gesehen.

Tipps:
- Hand hochkant, **20 bis 30 cm vor dem Hundekopf**, wie über Kimme und Korn.
- **Üben Sie Voran niemals mit Wind von vorn.** Bei Gegenwind reviert der Hund
  statt zu laufen.
- **Ritualisieren:** immer dieselbe Körperhaltung. Ändert sie sich, fehlt dem
  Hund die Motivation.
- **Pushen:** das Signal vor Hindernissen wiederholen.
- Linker Arm für Voran, rechter Arm für Markierungen, als klare Unterscheidung.

Equipment: Futterschüssel, Dummy (Standard 500 g), Leitlinie im Gelände,
optional ein Helfer für das Halbblind.

### H Silber - Back, dann Rechts und Links

```
title:    'Richtungssignale'
criteria: 'Nimmt nach dem Stopp-Pfiff Back, Rechts und Links an und läuft in
           die gezeigte Richtung. Bis 30 Meter. Drei Durchgänge.'
```

Reihenfolge ist im Buch festgelegt und darf nicht geändert werden:
**Voran, dann Back, dann Rechts und Links.** Rechts und Links sind für den
Hund leichter, werden aber zuletzt aufgebaut, um ihn nicht zu verwirren.

Ablauf:
1. **Bindeglied:** Jede Richtungsübung beginnt mit Stopp-Pfiff und erhobenem
   Arm. Ohne sauberen Stopp kein Richtungssignal.
2. **Back-Timing:** Stopp-Pfiff, Arm in **neutrale Position vor der Brust**,
   **zwei Sekunden Pause**, dann Arm nach oben schnellen, Signal während der
   Armbewegung. Arm oben stehen lassen.
3. Drehrichtung beachten: rechter Arm, der Hund dreht über die linke Schulter.
   Spiegelbildlich, weil er dich ansieht.
4. Erst eine Richtung allein, dann die andere allein, dann beide mit Wahl.
5. Variante **Voran auf der Uhr**: enge Winkel beim Voran. Der Hund wird aus
   derselben Position in leicht versetzte Richtungen geschickt, die Winkel
   werden schrittweise enger. Das ist eine Voran-Übung, nicht eine
   Einweisen-Übung nach dem Stopp.

Tipps:
- Nicht einseitig aus der Fuß-Position üben, sonst kommt der Hund beim Pfiff
  zurück statt zu stoppen.
- Belohnungsapport für Fortgeschrittene: Dummy über den Hund hinweg nach
  hinten oder seitlich werfen und mit Back beziehungsweise der Seitenrichtung
  schicken. So wird der Stopp selbst zur Einweise-Übung.

Equipment: Pfeife, mehrere Dummys, offenes Gelände.

### H Gold - Einweisen in ein Suchengelände

```
title:    'Einweisen in ein Suchengelände'
criteria: 'Wird auf ein nicht sichtbar ausgelegtes Dummy in ein Suchengelände
           eingewiesen und arbeitet dort selbstständig. Bis 80 Meter,
           maximal zwei Korrekturen. Drei Durchgänge.'
diagram:  'einweisen-gelaende'
```

Ablauf:
1. Dummy **ohne Hund** auslegen, Auslegefährte vermeiden (nicht auf direktem
   Weg zurücklaufen).
2. Hund exakt ausrichten. Buch S. 53: Ist der Hundeführer richtig
   ausgerichtet, ist der Hund es auch. Die Fuß-Position links existiert genau
   dafür.
3. Voran. Bei Abweichung Stopp-Pfiff, dann Richtungssignal.
4. Am Zielgelände das **Suchensignal** geben, und zwar nicht automatisch,
   sondern in dem Moment, in dem der Hund Witterung bekommt. Arm seitlich nach
   unten, Handfläche zum Hund.
5. Ab dort arbeitet der Hund selbstständig. Nicht weiter lenken.

Tipps:
- Hier gilt die **Kleine Suche**: enger Bereich, tiefe Nase, ruhig. Nicht zu
  verwechseln mit der Großen Suche der freien Verlorensuche.
- Maximal zwei Korrekturen. Im Regelwerk ist zu viel oder zu laute Lenkung ein
  schwerer Fehler.
- Gegenwind vermeiden, siehe H Bronze.

Equipment: Pfeife, Dummy, Suchengelände mit natürlicher Begrenzung.
Trophäe `one-cast` bleibt.

### F Gold - Doppelmarkierung auf F-Niveau

```
title:    'Doppelmarkierung auf F-Niveau'
criteria: 'Beide Dummys in der vorgegebenen Reihenfolge, bis 80 Meter,
           mindestens ein Dummy in Deckung oder über Wasser. Drei Durchgänge.'
reps:     3
```

Ablauf ersetzt die Dreifachmarke vollständig:
1. Zwei Dummys werfen lassen, Winkel **enger als 90 Grad**. Der enge Winkel
   ist die eigentliche Schwierigkeit, nicht die dritte Marke.
2. Der Hund wartet beide Würfe ab, ohne einzuspringen.
3. Reihenfolge vorgeben, in der Prüfung gibt sie der Richter vor. Im Training
   wechseln, damit der Hund keine Gewohnheit aufbaut.
4. Mindestens ein Dummy hinter einer Sichtkante oder über Wasser.
5. Zweites Dummy erst schicken, wenn das erste korrekt abgegeben ist.

Tipps:
- Nicht immer dieselbe Reihenfolge verlangen, sonst merkt sich der Hund die
  Reihenfolge statt die Fallstellen.
- Markierstäbe als Sichthilfe **für den Hund**, mindestens vier aufstellen,
  sonst wird der einzelne Stab selbst zum Ziel.

Equipment: zwei Dummys (Standard 500 g), Werfer oder Wurfgerät, mindestens
vier Markierstäbe, Gelände mit Sichtkante oder Wasser.

### D Gold - Standruhe in Verbindung mit Markieren (Walk Up)

```
title:    'Standruhe in Verbindung mit Markieren (Walk Up)'
criteria: 'Bleibt in der Linie bei Fuß, wenn aus der Bewegung ein Dummy
           fliegt, auch wenn ein anderes Gespann vor dir arbeitet.
           Drei Durchgänge.'
exam:     'walkup'
```

Ablauf ersetzt Honouring vollständig:
1. In der Linie gehen, Hund frei bei Fuß. Walk-up ohne Leine ab etwa 12
   Monaten.
2. Aus der Bewegung fliegt ein Dummy. Die Linie bleibt stehen, der Hund setzt
   sich ohne Signal.
3. Ein anderes Gespann arbeitet zuerst. Der Hund bleibt sitzen und beobachtet.
4. Erst dann wird er geschickt, oder gar nicht.
5. Steigerung: Schuss statt Zuruf als Signal für den Wurf.

Tipps:
- **80 Prozent der geworfenen Dummys holt der Führer selbst**, der Hund nur 20
  Prozent. Das ist das Verhältnis, mit dem Steadiness entsteht.
- Springt der Hund ein: Dummy selbst holen, zurück zum Ausgangspunkt, neu
  beginnen. Nicht hinterherschicken, das belohnt genau das Einspringen.
- Hände in die Jackentaschen während der Wartezeit. Hunde springen oft ein,
  weil der Führer mit den Händen herumfuchtelt.

Equipment: Dummys, Werfer, mindestens ein weiteres Gespann oder ein Helfer mit
Hund, optional Schreckschuss.

---

## 5. Equipment-Daten ersetzen, nicht ergänzen

Teil 1 war unklar. Die neuen Werte **ersetzen** die alten, mit allen Folgen
für Packliste und Equipment-Anzeige.

| Eintrag | alt | neu |
|---|---|---|
| Welpendummy | 250 g | **200 g** |
| Juniordummy | fehlt | **400 g** |
| Standarddummy | 500 g | 500 g, unverändert |
| Suchendummy | fehlt | **80 g** |
| Pocket Dummy | Taschen-Dummy für unterwegs | **entfällt als eigener Eintrag.** Was bisher so hieß, ist das 80-g-Suchendummy für Suchenpfiff-Training bei geringer Witterung |
| Markierstäbe | 2, einer optional | **4, keiner optional** |

**Mini-Session und Packliste:** Wo der Pocket Dummy als Taschen-Dummy auftaucht,
tritt das Juniordummy 400 g an seine Stelle. Das Suchendummy 80 g erscheint nur
dort, wo Suchenpfiff oder Kleine Suche trainiert wird.

**Dummyfarben**, falls die Equipment-Daten Farben führen: Blau ist für den Hund
am besten sichtbar und die beste Lernhilfe. Orange, Rot, Gelb, Braun und Grün
kann er nicht unterscheiden, Orange liest er wie Grau. Orange ist für den
Menschen. Weiß wirkt über den Kontrast, nicht über die Farbe.

---

## 6. Track G: die Verzögerungen

Die Verzögerung ist keine eigene Steigerungsachse mehr, sondern eine Variante
innerhalb des jeweils letzten Schritts eines Levels:

| Level | Verzögerung auf Schritt 4 |
|---|---|
| G Bronze | keine |
| G Silber | 2 Minuten zwischen Auslegen und Schicken |
| G Gold | 5 Minuten |

Dazu die Suchen-Regeln aus dem Buch, die in allen drei G-Leveln gelten:
- Suchengebiet mit natürlicher Begrenzung, bei Prüfungen 50 mal 50 Meter.
- **Halbkreisförmiges Auslegen** um den Hund herum, 10 bis 15 Meter Abstand.
  Das minimiert die Tauschgefahr.
- **Immer zehn oder mehr Dummys auslegen**, aber den Hund nur einen
  wechselnden Teil holen lassen. Den Rest holt der Führer selbst, sichtbar für
  den Hund.
- **Anzahl variieren**, sonst gewöhnt sich der Hund an eine feste Zahl.
- Wind: Gegenwind bedeutet frühes Revieren. Seitenwind ist leicht, den
  Ansatzpunkt wandern lassen. Rückenwind heißt erst tief hinein, dann
  zurücksuchen.
- Suchenstil messen: farbige Dummys in farbgleichen Reihen auslegen. An der
  Farbe erkennt man, ob der Hund vorne oder hinten sucht.
- **Nasenarbeit ist Schwerstarbeit.** Die Nase muss feucht sein, sonst sinkt
  die Leistung. Bei Nasenarbeit braucht der Hund genügend Wasser. Der
  Zickzackkurs dient auch der Nasenerholung, weil sich die Riechzellen an
  gleichartige Gerüche gewöhnen.

---

## 7. TERRAIN und TERRAIN_STEPS

Die alte `TERRAIN`-Tabelle fällt weg. `TERRAIN_STEPS` ist die einzige
Wahrheitsquelle. Wo `TERRAIN` heute referenziert wird, auf die passende
`TERRAIN_STEPS`-Stufe mappen:

| alter TERRAIN-Wert | neue Stufe |
|---|---|
| kurzes Gras, Wiese, Acker, Stoppel | G1 |
| mittleres Gras, hohes Gras, Brache | G2 |
| Mais, Schilf, Wald, Waldrand, Graben, Hecke, Deckung | G3 |
| Wasser, Teich, Fluss | G4 |

Lässt sich ein vorhandener Wert nicht zuordnen, melde ihn statt zu raten.

---

## 8. Warm-up gegen Blockminuten

Kein Widerspruch, sondern eine echte Verlängerung. Der Warm-up-Block der
Vollsession bekommt **15 Minuten** statt der bisherigen 2, und die
Gesamtdauer der Session steigt entsprechend. Das ist gewollt: 2 Minuten
Aufwärmen waren sportmedizinisch nicht vertretbar.

Kurzübung 5 Minuten, Mini-Session 3 Minuten. Cool Down bei der Vollsession
10 Minuten, bei der Kurzübung 3 bis 5, bei der Mini-Session keiner.

Wenn die angezeigte Gesamtdauer dadurch über eine fest verdrahtete Obergrenze
läuft, hebe die Obergrenze, statt das Warm-up zu kürzen.

---

## 9. Blinken bleibt im Glossar

Richtig erkannt, dass der Eintrag unvollständig wäre. **Blinken kommt nicht ins
Troubleshooting.** Es bleibt ein Fehlerbegriff im Glossar mit der Definition
"Der Hund findet das Dummy und zeigt es nicht an, läuft weiter oder nimmt es
nicht auf."

Grund: Ich habe keine belegte Ursache-und-Abhilfe-Kette dafür. Eine erfundene
wäre genau der Fehler, den dieser ganze Umbau beseitigen soll.

---

## 10. Anzeige: was aus den Daten sichtbar werden muss

Das ist der zweite große Posten aus dem Bericht. Die Daten liegen, die Anzeige
fehlt. Konkret:

### Im Übungsdetail
- **Der Schritt-Pfad** als vier Zeilen mit Markierung des aktuellen Schritts.
  Je Schritt: Distanzstufe mit Bandbreite und Schrittschätzung, Geländestufe
  mit Beispielen. Bei den Bedingungs-Tracks stattdessen Bedingung und Variante.
- **Prüfungsbezug** als kleine Zeile: "Zählt für Dummy A, Einzelmarkierung
  Land" beziehungsweise bei Track E "Kein eigenes Prüfungsfach, wird in jedem
  Fach mitbewertet".
- **Lernphase** mit dem passenden Verstärkungshinweis aus `LEARNING_PHASES`.
- **Mindestalter** als Hinweistext, wo gesetzt.

### Im Session-Block
- **Einstiegsschritt und Zielschritt** wie in Abschnitt 1 beschrieben.
- **Pausenvorschlag** nach einem als "gut" bewerteten Durchgang, statt direkt
  die nächste Wiederholung anzubieten.
- **Blocktrennung** mit Begründung: zwischen zwei Blöcken eine Pause
  ausweisen, Grund "Verwechslungsgefahr".

### Beim Levelwechsel
Der Warnhinweis aus Abschnitt 1 von Teil 1, wörtlich: "Vermeiden Sie, eine noch
nicht genügend gefestigte Übung mit Ablenkung zu trainieren. Das bereits
erreichte Niveau wird gesenkt und somit das vorangegangene Training ad absurdum
geführt."

### Vor der Session
Die **Trainingsvorbereitungs-Checkliste** aus Abschnitt 11 von Teil 1, als
abhakbare Liste. Sechs Punkte, keine Pflicht.

### In der Sessionbewertung
- Die **fünf Fehlerursachen** als Auswahl, wenn ein Durchgang mit "noch nicht"
  bewertet wird.
- Die **Übersprungszeichen** als Checkbox-Liste. Bei mehr als zwei
  angekreuzten Zeichen eine Rückstufung vorschlagen.

Wo ein Platz in der Oberfläche unklar ist, entscheide pragmatisch und melde
die Entscheidung, statt zu warten. Keiner dieser Punkte rechtfertigt einen
Umbau der Navigation oder der Tab-Struktur.

---

## 11. Commit

Der Stand aus Teil 1 ist getestet und soll committet werden, bevor Teil 2
beginnt. `docs/fundament-umbau.md` und `docs/fundament-umbau-2.md` gehören mit
in den Commit, sie sind die Dokumentation der fachlichen Grundlage.

Commit-Nachricht für Teil 1, Vorschlag:
```
Fundament-Umbau Teil 1: Datenmodell auf Pruefungsklassen und D/G-Achsen

- DISTANCE_STEPS, TERRAIN_STEPS, CONDITIONS, LEARNING_PHASES
- PRINCIPLES, SOURCES, COMMANDS auf die neue Quellenlage
- je Level Pruefungsfach, Klasse, max. Distanzstufe, Vier-Schritt-Pfad
- F/D/H Gold und H Bronze/Silber: erfundene Inhalte ersetzt
- Migration auf schemaVersion 2 mit Sicherung unter edc-v3-backup-v1
```
