# Heute entschlacken, Einstellungen entzerren

Gemessen am 1. November auf 375 x 812, Profil Eddy, viel Erfahrung,
erwachsen, leichter Gelenkbefund, Vollsession.

---

## 1. Der Befund in Zahlen

**Heute ist die dichteste Seite der ganzen App**, und es ist die einzige, die
draußen gelesen wird.

| Tab | Höhe | Wörter | Wörter je Bildschirm |
|---|---|---|---|
| **Heute** | 2516 px | 397 | **128** |
| Basics | 5842 px | 813 | 113 |
| Trophäen | 2793 px | 298 | 88 |
| Tracks | 2479 px | 215 | 69 |

Das ist genau verkehrt herum. Basics liest man zu Hause im Sitzen, Heute mit
Hund an der Leine, bei Wind, manchmal mit Handschuhen.

**Innerhalb der Session:**

| Block | Höhe | ändert sich je Session? |
|---|---|---|
| Aufwärmen | 341 px | nein |
| Erster Teil | 275 px | selten |
| Pause | 128 px | **nein** |
| **Hauptteil** | **459 px** | ja |
| Pause | 128 px | **nein, wortgleich** |
| Abschluss | 275 px | selten |
| Cool Down | 344 px | nein |

**941 px von 1950 px, also 48 Prozent, sind Text, der bei jeder Session
identisch ist.** Der Hauptteil, um den es geht, hat 24 Prozent.

---

## 2. Dein Punkt 7 ist der härteste: die tote Fläche

Bestätigt und schlimmer als du es beschreibst.

```
Karte "Hauptteil":       459 px hoch
Button .block-main:       89 px hoch
nicht anklickbar:        371 px  =  81 Prozent
```

Der Durchgangstext und der Kasten "Ziel heute" liegen außerhalb des Buttons.
Wer dorthin tippt, wo die Übung beschrieben steht, löst nichts aus.

**Die ganze Karte wird zum Ziel**, mit zwei Ausnahmen, die ihre eigene
Funktion behalten: "Tauschen" und, wo vorhanden, die Bewertungsknöpfe. Prüf,
ob das auch für Erster Teil und Abschluss gilt, und ob die Trefferfläche
mindestens 44 px hoch bleibt, wo sie klein ist.

---

## 3. Aufwärmen und Cool Down einklappen

Deine Lösung, mit der Mechanik, die in der App schon existiert: Die
Vorbereitung ist ein `details`-Element mit Chevron. Dasselbe Muster hier.

**Zugeklappt sichtbar:**

> Aufwärmen · 15 Min                                        v
> Traben, Schritt, Trab, kurze Galoppsprints, Stopps, Dehnen.

> Cool Down · 10 Min                                        v
> Lockerer Trab, Schritt bis die Atmung normal ist, Dehnen.

Die Zeile zugeklappt ist die Liste in einem Satz, also für jemanden, der es
kennt, schon die vollständige Anweisung. Wer es nicht kennt, klappt auf und
bekommt die sechs Schritte mit den Erklärungen.

**Aufgeklappt bleibt, was jetzt dasteht**, einschließlich der 30-Prozent-Regel
und der Zehn-Minuten-Begründung.

**Offen oder zu wird gemerkt**, pro Phase, damit niemand es jedes Mal neu
zuklappt. Das gehört in `settings`, nicht in den Plan: Es ist eine
Darstellungs-Einstellung, kein Trainingsinhalt.

---

## 4. Die Pause: nicht einklappen, kürzen

Hier bist du unsicher, deshalb eine klare Empfehlung: **nicht aufklappbar.**
Eine dritte Klappmechanik auf einem Bildschirm, der schon zwei hat, kostet
mehr Aufmerksamkeit als sie spart.

Der Text steht zweimal wortgleich und erklärt ein Prinzip, wo draußen eine
Anweisung gebraucht wird.

> Pause · 3 Min
> Ein paar Minuten etwas anderes machen.

**Die Begründung wandert einmalig nach Basics**, in den Abschnitt über den
Aufbau einer Session:

> Zwischen zwei Blöcken gehören ein paar Minuten Abstand. Zwei Übungen direkt
> hintereinander verwechselt der Hund leicht, und was er einmal verwechselt
> hat, muss man mühsam wieder trennen.

Das spart zweimal rund 90 px und nimmt dem Bildschirm die Stelle, an der man
beim Scrollen zweimal dasselbe liest.

---

## 5. Die Dauer stimmt nicht

Nebenbefund beim Nachrechnen, nicht von dir genannt.

```
15 + 8 + 12 + 5 + 10 = 50 Min
```

Die Kopfzeile sagt "50 Min". Die zwei Pausen sind nicht eingerechnet. Wer
sich auf die Angabe verlässt, plant zu knapp.

**Mit den 3 Minuten aus Abschnitt 4:** 15+8+3+12+3+5+10 = 56.

> Kopfzeile: **Rund 55 Min · Gezielter Fokus**

Prüf dieselbe Rechnung für Kurzübung und Mini-Session und melde, was dort
herauskommt.

---

## 6. Die Schrift: erst kürzen, dann vergrößern

Dein Eindruck stimmt, aber die Ursache ist nicht die, die man vermutet.

**Der Kontrast ist nicht das Problem.** Gemessen über die ganze Heute-Seite
liegt der schlechteste Wert bei 5,58 zu 1, gefordert sind 4,5. Kein einziger
Text fällt durch.

**Die Größe ist das Problem.** Fließtext steht teils auf 14 px, unter anderem
die Aufwärm- und Cool-Down-Listen, der Kasten "Ziel heute" und die
Fortschrittszeile. Der Browser-Standard für Fließtext ist 16 px, und was
draußen gelesen und befolgt wird, sollte nicht darunter liegen.

**Die Regel:**
- Text, der eine Anweisung ist und draußen befolgt wird: **mindestens 16 px**
- Zusatzinfo, die man nur im Vorbeigehen liest: **mindestens 14 px**, nicht
  weniger
- Nichts auf der Heute-Seite unter 14 px

**Die Reihenfolge ist wichtig:** Erst Abschnitt 3 und 4 umsetzen, dann
vergrößern. Nur vergrößern macht aus 3,1 Bildschirmen 3,6 und verschlimmert
genau das, worüber wir reden.

Melde nach dem Umbau die neue Gesamthöhe der Heute-Seite.

---

## 7. Der Begriff: "du", nicht "Führer"

Bestätigt, und es sind drei Begriffe für dieselbe Person: **"Führer"** an über
zwölf Stellen, **"Hundeführer"** an zwei, **"Halter"** an zwei. Dieselbe
Buchstelle, Seite 53, steht einmal als "Hundeführer" und einmal als "Führer".

**Die Regel, in dieser Reihenfolge:**

1. **Wo die App den Nutzer meint: "du".** Das ist fast überall der Fall, und
   es ist kürzer als jeder Fachbegriff.
   - "Hunde springen oft ein, weil der Führer mit den Händen herumfuchtelt"
     wird zu "... wenn du mit den Händen herumfuchtelst"
   - "Ist der Führer richtig ausgerichtet, ist der Hund es auch" wird zu
     "Bist du richtig ausgerichtet, ist er es auch"
   - "80 Prozent der geworfenen Dummys holt der Führer selbst" wird zu
     "... holst du selbst"
   - "drei bis vier Schritte vor dem Hundeführer" wird zu "... vor dir"
2. **Wo eine Rolle in der Prüfung beschrieben wird und "du" falsch wäre:
   "Hundeführer".** Nie "Führer" allein.
3. **"Halter" bleibt**, wo es um fremde Leute geht: "Hunde anderer Halter",
   "deren Halter du kennst". Dort ist es richtig.

**Melde jede Stelle, bei der "du" den Sinn ändert**, bevor du sie umstellst.

---

## 8. Noch ein Begriffsbruch: die Sie-Form

Nicht von dir genannt, beim Suchen gefunden. An zwei Stellen steht in einer
Du-App ein Sie-Satz, beide Male als normaler Absatz ohne Kennzeichnung als
Zitat: unter "Levelwechsel" auf der Detailseite und nach dem Abschluss einer
Session.

> Vermeiden Sie, eine noch nicht genügend gefestigte Übung mit Ablenkung zu
> trainieren. Das bereits erreichte Niveau wird gesenkt und somit das
> vorangegangene Training ad absurdum geführt.

Der Inhalt ist richtig und gehört dorthin. Nur die Form nicht.

> Trainier eine Übung nicht unter Ablenkung, solange sie nicht sicher sitzt.
> Sonst sinkt das Niveau wieder, das du schon erreicht hattest.

---

## 9. "Angeleint" fliegt raus

Dein Punkt 3, und du hast einen echten Widerspruch gefunden.

Die Vorbereitung sagt: "Hund gelöst, **angeleint**, konzentriert."
Der erste Aufbau-Schritt von D Bronze sagt: "Hund sitzt **ohne Leine** in der
Fußposition."

Die Checkliste verlangt also das Gegenteil dessen, was die Übung zwei
Bildschirme weiter verlangt.

**Eine Regelwerksvorgabe gibt es dafür nicht**, jedenfalls keine, die ich in
der APD/R oder der DP-E belegen kann. Üblich ist es auf Prüfungen zwischen
den Fächern, aber das ist Etikette, keine Vorschrift, und für das Training zu
Hause gilt es ohnehin nicht.

> Hund gelöst und aufmerksam.

Wann die Leine dran ist, entscheidet der Halter nach Ort und Situation. Das
ist nichts, was eine Checkliste pro Session vorgeben kann.

---

## 10. Der Cool-Down-Satz

Dein Punkt 5, zugestimmt und mit Begründung: Eine App, die dem Nutzer sagt,
er solle das nicht aus einer App lernen, untergräbt sich selbst, und zwar an
der einzigen Stelle, wo sie gerade erklärt.

> Raus: "Wer gezielte Dehnübungen machen will, lässt sie sich einmal zeigen,
> statt sie aus einer App zu lernen."

**Der Satz davor bleibt**, er trägt die fachliche Aussage:

> Ihn selbst zu ziehen oder Beine zu strecken ist etwas anderes und gehört in
> die Hand einer Hundephysiotherapeutin.

---

## 11. "Meine Signale" einklappen

Dein Punkt 1, und die Zahlen sind deutlicher als das Gefühl.

```
Einstellungen gesamt:   3583 px  =  4,4 Bildschirme
davon Hundeprofil:      2629 px  =  73 Prozent
davon "Meine Signale":  1275 px  =  1,6 Bildschirme
einklappbare Elemente:     0
```

**Der eigentliche Schaden ist die Position.** "Meine Signale" steht zwischen
"Sonstige Einschränkungen" und dem Knopf "Profil speichern". Wer den
Gelenkbefund ändert, muss an 1275 px Signalfeldern vorbeiscrollen, um
speichern zu können.

**Zwei Änderungen:**
1. "Meine Signale" wird ein `details`-Block, zugeklappt als Standard, mit
   derselben Mechanik wie die Vorbereitung. Zugeklappt zeigt die Zeile, wie
   viele Signale belegt sind.
2. **"Profil speichern" wandert davor**, direkt unter "Sonstige
   Einschränkungen". Wer nur ein Profilfeld ändert, soll den Knopf sehen,
   ohne an den Signalen vorbeizumüssen.

Zu Punkt 2: Melde, ob der Knopf auch die Signale speichert. Wenn ja, bleibt
er unten und der Signalblock wandert stattdessen ans Ende der Karte.

---

## 12. Hier widerspreche ich: "leise" bleibt

Du hast das dreimal moniert, und jedes Mal zu Recht gefragt. Aber die Antwort
ist nicht, das Wort zu streichen.

**Die Regel ist fachlich begründet und steht in der App**, unter Basics,
Gehör:

> Hunde nehmen Töne viermal leiser wahr als Menschen und aus viermal größerer
> Entfernung. Daraus folgt: Pfeife so leise, wie du kannst. Der Hund hört es.
> Wenn du immer laut pfeifst, hast du keine Reserve mehr für Distanz, Wind und
> Deckung.

Das ist richtig, und es ist der Grund, warum es überall "leise" heißt.

**Das Problem ist die Platzierung, nicht das Wort.** Im Durchgangstext steht
"5 Stopps auf den leisen Stopp-Pfiff", und dort ist es eine Vorgabe ohne
Grund, drei Taps von ihrer Erklärung entfernt. Genau deshalb fragst du jedes
Mal nach.

**Die Lösung:**
- **Im Durchgangstext raus:** "5 Stopps auf den Stopp-Pfiff in der Situation
  der heutigen Stufe, über die Einheit verteilt."
- **Im Kriterium bleibt es**, dort ist es eine echte Anforderung: Auf einen
  leisen Pfiff zu reagieren ist schwerer als auf einen lauten.
- **Der Tipp mit der Begründung bleibt am Level** und ist die Stelle, an der
  es erklärt gehört.

Prüf, ob der Tipp bei allen drei Stopp-Pfiff-Leveln und bei den
Rückruf-Leveln erscheint. Wenn nicht, melde wo er fehlt.

---

## 13. Reihenfolge

1. Abschnitt 2 (tote Fläche), 9, 10, 12 sind kleine, unabhängige Änderungen
2. Abschnitt 3, 4, 5 gehören zusammen, sie ändern den Aufbau der Heute-Seite
3. Abschnitt 6 erst danach, sonst misst man das Falsche
4. Abschnitt 7 und 8 sind eine eigene Durchsicht über den ganzen Datenbestand
5. Abschnitt 11 betrifft nur die Einstellungen

Melde nach Schritt 2 die neue Gesamthöhe, bevor du mit der Schrift anfängst.
