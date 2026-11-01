# Nacharbeit zu F Silber und F Gold

Alle sieben Punkte bestätigt. Fünf sind Fehler in meinem Text aus
`f-silber-aufbau.md`, zwei waren schon vorher drin.

---

## 1. F Gold: der Winkel, mein schwerster Fehler

Mein neuer Schritt 1 hat den engen Winkel aus dem Aufbau genommen, während
Durchgang und Kriterium ihn weiter verlangen. Ich habe die Progression
eingebaut und das Ziel dabei gelöscht.

**Schritt 1 vollständig, mit allem, was verschwunden war:**

> Zwei Dummys werfen lassen, am Anfang mit weitem Winkel, etwa 10 Uhr und
> 2 Uhr. Erst wenn beide Apporte sauber sitzen, den Winkel über mehrere
> Einheiten zusammenziehen, bis er enger als 90 Grad ist. Der enge Winkel ist
> die eigentliche Schwierigkeit.

**Der Durchgang wird neutral**, weil der Winkel keine Stufen-Dimension ist. Er
gehört in den Aufbau, nicht in die Stufenbeschreibung:

```
run: Eine Doppelmarkierung auf Distanz und Gelände der heutigen Stufe.
```

**Das Kriterium behält "enger als 90 Grad".** Es beschreibt das Ziel des
Levels, und das Ziel ist der enge Winkel.

---

## 2. F Gold: die Reihenfolge

Dein Vorschlag ist richtig, mit einem Zusatz: Der Grund muss dabeistehen,
sonst liest es sich wie eine Marotte.

> Am Anfang den zuletzt geworfenen zuerst schicken, der liegt frischer im
> Gedächtnis. Sobald das sitzt, die Reihenfolge wechseln. In der Prüfung gibt
> der Richter sie vor.

Damit ist auch "Nicht immer dieselbe Reihenfolge verlangen" aufgelöst: Es ist
kein Widerspruch mehr, sondern die zweite Stufe desselben Rats. Prüf, ob der
alte Satz danach noch gebraucht wird oder doppelt steht.

---

## 3. F Silber: Graben raus, Fluss rein

Berechtigt, und der Fehler ist schlimmer als er klingt: Ein Graben steht bei
Geländestufe 3. Wer auf Stufe 4 über einen Graben arbeitet, hält Wasser für
erledigt und hat Geländestufe 3 wiederholt.

> Schritt 4: Ab Stufe 4 ins Wasser oder über einen schmalen Fluss oder Kanal,
> mit schwimmfähigem Dummy.

Der Satz "Geht Wasser gerade nicht..." fliegt dort raus, er steht im Hinweis.

---

## 4. F Silber: die Zahl der Marken wird eine Anweisung

Hier widersprichst du mir zu vorsichtig. "Im Wasser reichen zwei Marken statt
drei" ist eine Erlaubnis, und Erlaubnisse sind genau das, was draußen nicht
funktioniert. Es muss drinstehen, was zu tun ist.

```
run:    Einzelmarkierungen auf Distanz und Gelände der heutigen Stufe.
        Drei an Land, zwei im Wasser.
amount: 3 Einzelmarkierungen, im Wasser 2
```

Der Tipp "Im Wasser reichen zwei Marken statt drei" entfällt dann, er steht
jetzt im Durchgang. **Melde, wenn das Mengenfeld technisch nur einen Wert
tragen kann**, dann bleibt es bei 3 und der Durchgang trägt die Angabe allein.

---

## 5. F Silber: die Warnung von E Gold übernehmen

Mein Fehler, und ein doppelter: Ich habe eine Wasserwarnung in das Feld für
Gelenkhinweise geschrieben, ohne eine Aussage über Gelenke darin, und dabei
den Jahreszeit-Satz wiederholt, den ohnehin jeder sieht.

**Nimm die Warnung von E Gold**, sie hat den fachlichen Kern, der mir
fehlte: Der Absprung von einer Uferkante ist eine Stoßbelastung auf Schulter
und Vorderbeine, flacher Einstieg vermeidet sie.

Falls sie dort an Land nicht passend formuliert ist, **melde ihren Wortlaut**,
dann schreibe ich eine Fassung für F Silber. Prüf dabei, ob sie sich auf
Stufe 4 beschränken lässt, sonst muss "im Wasser" im Satz selbst stehen.

Die alte Warnung "Viele Starts und Stopps" ist weg: Sie beschrieb das Warten
zwischen den zwei Apporten der Doppelmarke.

---

## 6. F Silber: stepsType auf "ablauf"

Berechtigt, und dieser Fehler ist der ärgerlichste. Es ist genau der aus
`app-befund.md`, Abschnitt 1: Schritte als Varianten ausgeben, die ein Ablauf
sind. Ich habe ihn beim Schreiben des neuen Aufbaus wieder eingebaut.

```
stepsType: "ablauf"
```

Schritt 5 trägt die Kennzeichnung im Text ("Variante Memory:"), das reicht.

---

## 7. double-mark streichen

Deine Empfehlung, mit deiner Begründung. Ein Verweis auf ein Diagramm, das es
nicht gibt und das kein Code liest, gehört nicht in die Daten.

**Prüf, ob das Feld `diagram` danach irgendwo noch belegt ist.** Wenn nicht,
raus damit, sonst erbt es der nächste Umbau.

---

## 8. D Bronze: das Etikett ist wirklich falsch

Dein Nebenbefund ist richtig und löst sich sauber. D Bronze übt kein
Doppelmarkieren, aber Schritt 5 übt **"Apportieren mit verspätetem Schicken"**,
und das ist ein eigenes DP-E-Fach aus der Prüfungsordnung.

> D Bronze, Prüfungsfach neu: DP-E, Apportieren mit verspätetem Schicken

Die Doppelmarkierung fällt dort weg. Damit beschreibt sie nur noch die
Variante bei F Bronze, und die bleibt, wie du vorgeschlagen hast.

---

## 9. Zum Pushen

Erst diese acht Punkte, dann Commit und Push zusammen. Melde die zwei
Rückfragen aus Punkt 4 und 5, bevor du pushst, falls sie auftreten.
