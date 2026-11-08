# Track A: die fünf Folgefehler

Alle fünf bestätigt. Vier sind durch meine Stufentexte entstanden.

---

## 1. Die Ausrüstung zieht nicht mit

Die neuen Stufen verlangen Dinge, die im Level nicht gelistet sind.

**A Bronze:** Der verbleibende Aufbau-Schritt wirft ein Dummy.

```
gear: Pfeife, 1 Dummy 500 g (für die Variante mit Dummywurf)
```

**A Silber:** Stufe 4 verlangt ein sichtbar liegendes Dummy, der Durchgang
belohnt mit Dummywurf. Beides ist nicht optional.

```
gear: Pfeife, 1 Dummy 500 g
```

**A Gold:** Stufe 3 nennt ein zweites Dummy oder eine Person.

```
gear:  Pfeife, 2 Dummys 500 g
setup: Eine zweite Person (nur Stufe 3, alternativ ein zweites Dummy)
```

Prüf, ob `setup` eine Stufenbindung kennt. Wenn nicht, steht die Person ohne
Einschränkung dort, und die Klammer wandert in den Stufentext.

---

## 2. Der Rückruf bei A Silber Stufe 1

Mein Text verlangt ein zweites Signal, das die Seite nicht anzeigt. Deine
Lösung ist die richtige: **das Rückruf-Signal auf Stufe 1 einblenden**, nicht
im ganzen Level.

```
signals: stop (alle Stufen), recall (nur Stufe 1)
```

---

## 3. Die doppelte Belohnung bei A Silber

Mein Fehler: Ich habe den alten Durchgangstext übernommen und gleichzeitig den
Aufbau-Schritt zum Tipp gemacht. Jetzt steht dasselbe zweimal.

**Der Durchgang wird gekürzt**, der Tipp ist der ausführlichere und bleibt:

```
run: Viermal über die Einheit verteilt.
```

---

## 4. A Gold: Aufbau auf zwei Schritte, Stufen gekürzt

Dein Befund 4 trifft, und er löst zugleich deine Längenfrage.

**Der Aufbau behält nur, was die Stufen nicht sagen:**

> 1. Während er auf den Dummy zugaloppiert, trittst du vor ihn und gibst
>    gleichzeitig den Stopp-Pfiff.
> 2. Schrittweise weniger vortreten, bis der Pfiff allein reicht.

Das ist eine echte Aufbauhilfe über mehrere Wochen und gehört nicht in eine
Stufe. `stepsType` bleibt **"ablauf"**, die beiden bauen aufeinander auf.

**Die vier Stufen werden kürzer.** Nur Stufe 1 beschreibt den Ablauf
vollständig, die übrigen nennen die Erschwernis zuerst und den Ablauf im
Telegrammstil. Jede bleibt für sich lesbar, niemand muss nachschlagen.

| | neu |
|---|---|
| 1 | Du wirfst ein Dummy und schickst den Hund. Auf etwa 40 Metern gibst du den Stopp-Pfiff. Er stoppt, danach schickst du ihn weiter zum Dummy. |
| 2 | Ein fremder Hund ist in Sichtweite. Dummy werfen, Hund schicken, auf 40 Metern Stopp-Pfiff, dann weiterschicken. |
| 3 | Während er läuft, fliegt ein zweites Dummy oder eine Person läuft los. Dummy werfen, Hund schicken, auf 40 Metern Stopp-Pfiff, dann weiter zum ersten Dummy. |
| 4 | In einem Gelände, in dem ihr noch nie wart. Dummy werfen, Hund schicken, auf 40 Metern Stopp-Pfiff, dann weiterschicken. |

---

## 5. Mein ungenaues Zitat

Dass meine Tabelle die Aufbau-Schritte verkürzt wiedergibt und beim ersten
das "Leise" verliert, stimmt. Ich hatte aus einem früheren Auszug zitiert
statt aus dem aktuellen Stand.

Das ist dieselbe Ungenauigkeit wie beim Winkel: aus dem eigenen Text zitieren
statt aus der Quelle. Dass du den tatsächlichen Wortlaut behalten hast, war
richtig.

---

## 6. Die Signalzeile

Nur zur Kenntnis. Dass sie unter dem Stufentext steht statt darüber, ist in
Ordnung: zuerst die Aufgabe, dann das Werkzeug.

---

## 7. Zur Länge

Mit Abschnitt 4 ist die Frage beantwortet. Das Muster für B bis E lautet:

- **Stufe 1 beschreibt den Ablauf vollständig.**
- **Stufe 2 bis 4 nennen die Erschwernis zuerst**, dann den Ablauf verkürzt.
- Wiederholung innerhalb eines Levels ist erlaubt, Verweise sind es nicht.
  Draußen liest man eine Stufe, nicht vier.

Damit schreibe ich die 48 Stufen von B bis E, sobald A draußen getestet ist.
