# Track A: zwölf Stufen neu

Die Musterlösung nach `uebungsablauf.md`, Abschnitt 4. Jede Stufe nennt
**Ausgangslage, Signal, erwartete Reaktion**, in dieser Reihenfolge, ohne
Verweis auf etwas anderes.

**Das Signal selbst steht nicht im Text**, sondern bleibt bei "Du gibst den
Stopp-Pfiff". Die Zeile "Dein Stopp-Signal: ..." darüber liefert, wie er
klingt. Sonst stünde es doppelt und widerspräche dem Profil.

---

## 1. A Bronze, Stopp im Nahbereich

| | neu |
|---|---|
| 1 | Der Hund sitzt neben dir in der Fußposition. Du gibst den Stopp-Pfiff. Er bleibt sitzen und sieht dich an. |
| 2 | Der Hund geht bei Fuß. Du gibst den Stopp-Pfiff. Er setzt sich sofort, du gehst weiter. |
| 3 | Der Hund läuft frei etwa 10 Meter vor dir, rund 15 Schritte. Du gibst den Stopp-Pfiff. Er setzt sich dort, wo er ist. |
| 4 | Der Hund läuft frei etwa 25 Meter vor dir, rund 35 Schritte. Du gibst den Stopp-Pfiff. Er setzt sich dort, wo er ist. |

**Stufe 1 ist jetzt eindeutig:** Der Pfiff wird mit der Position verknüpft,
die der Hund schon hat. Erst Stufe 2 verlangt, dass er sich auf den Pfiff
hinsetzt. Das ist auch die Reihenfolge aus dem Buch.

```
run: Fünfmal über die Einheit verteilt, dazwischen normal weitergehen.
```

---

## 2. A Silber, Stopp auf Distanz und aus der Bewegung

| | neu |
|---|---|
| 1 | Du rufst den Hund aus etwa 20 Metern zurück. Während er auf dich zuläuft, gibst du den Stopp-Pfiff. Er stoppt sofort und setzt sich. |
| 2 | Der Hund läuft von dir weg, etwa 20 Meter. Du gibst den Stopp-Pfiff. Er stoppt, setzt sich und dreht sich zu dir. |
| 3 | Der Hund sucht oder schnüffelt frei auf etwa 35 Meter, rund 45 Schritte. Du gibst den Stopp-Pfiff. Er stoppt und setzt sich. |
| 4 | Ein Dummy liegt sichtbar im Gelände. Der Hund arbeitet auf etwa 35 Meter. Du gibst den Stopp-Pfiff. Er stoppt, auch mit dem Dummy im Blick. |

**Damit ist dein Befund 2 gelöst:** Die Distanz steigt jetzt sichtbar von 20
auf 35 Meter, statt erst auf Stufe 3 aufzutauchen.

```
run: Viermal über die Einheit verteilt. Jeder Stopp wird belohnt, mit
     Rückruf oder Dummywurf.
```

---

## 3. A Gold, Stopp im Lauf auf den Dummy

Dein Befund 4, aufgelöst: Jede Stufe nennt jetzt die ganze Übung, nicht nur
die Erschwernis.

| | neu |
|---|---|
| 1 | Du wirfst ein Dummy und schickst den Hund. Auf etwa 40 Metern, während er läuft, gibst du den Stopp-Pfiff. Er stoppt, danach schickst du ihn weiter zum Dummy. |
| 2 | Ein fremder Hund ist in Sichtweite. Du wirfst ein Dummy und schickst den Hund. Auf etwa 40 Metern gibst du den Stopp-Pfiff. Er stoppt, danach schickst du ihn weiter. |
| 3 | Du wirfst ein Dummy und schickst den Hund. Während er läuft, fliegt ein zweites Dummy oder eine Person läuft los. Du gibst den Stopp-Pfiff. Er stoppt, danach schickst du ihn weiter zum ersten Dummy. |
| 4 | In einem Gelände, in dem ihr noch nie wart: Du wirfst ein Dummy und schickst den Hund. Auf etwa 40 Metern gibst du den Stopp-Pfiff. Er stoppt, danach schickst du ihn weiter. |

```
run: Ein Durchgang. Mehr nicht.
```

---

## 4. Was aus den Aufbau-Blöcken wird

**A Bronze:** Von vier Schritten bleibt einer.

| alt | wohin |
|---|---|
| Hund geht bei Fuß. Stopp-Pfiff. Er setzt sich. | ist jetzt Stufe 2, **streichen** |
| Hund sitzt 20 große Schritte vor dir. Stopp-Pfiff. Er bleibt sitzen. | **bleibt**, das ist Sitzen halten auf Distanz, nicht Hinsetzen |
| Rückruf pfeifen, dann auf halbem Weg den Stopp-Pfiff. | das ist **A Silber Stufe 1**, hier **streichen** |
| Er stöbert wenige Meter vor dir. Stopp-Pfiff und gleichzeitig ein Dummy werfen. Der Dummy ist die Belohnung für den Stopp. | **bleibt** |

**A Silber:** Von drei Schritten bleibt keiner im Aufbau.

| alt | wohin |
|---|---|
| Hund sucht oder schnüffelt frei auf etwa 35 Meter. Stopp-Pfiff. | ist jetzt Stufe 3, **streichen** |
| Nach dem Stopp: Rückruf pfeifen und loben, oder einen Dummy werfen. Der Stopp muss sich lohnen. | **wird ein Tipp**, kein Aufbau-Schritt |
| Distanz schrittweise auf 35 Meter steigern. | **streichen**, das machen jetzt die Stufen. Damit ist auch dein Befund 1 erledigt, der Widerspruch zu Schritt 1 verschwindet. |

**A Gold:** Der Aufbau bleibt vollständig, aber als **Ablauf**, nicht als
Varianten. Dein Befund 3 trifft, es ist derselbe Fall wie bei F Silber.

```
stepsType: "ablauf"
```

Schritt 3 wird wegen des Strichs neu formuliert:

> Er stoppt. Danach schickst du ihn weiter auf den Dummy. Der Stopp war keine
> Absage, sondern eine Zwischenstation.

Prüf bei A Bronze und A Silber, ob `stepsType` nach dem Kürzen noch
"varianten" sein soll. Bei A Bronze bleiben zwei echte Varianten, dort passt
es. Bei A Silber bleibt nichts übrig, der Block entfällt.

---

## 5. Was ich beim Schreiben gesehen habe

**A Silber Stufe 2 ist neu.** Alt stand dort nur "Der Hund läuft von dir
weg", ohne Distanz und ohne das Umdrehen. Dass er sich nach dem Stopp zu dir
dreht, ist die eigentliche Leistung und stand nirgends.

**A Gold Stufe 1 nennt jetzt das Weiterschicken.** Dass der Stopp keine
Absage ist, stand bisher nur im Aufbau, also im zugeklappten Block. Wer nur
die Stufe liest, hätte den Hund gestoppt und dann abgebrochen.

---

## 6. Danach

Wenn das draußen trägt, kommen Track B, C, D und E nach demselben Muster,
48 weitere Stufen. Vorher sagst du mir, ob die Länge passt: Diese Texte sind
zwei bis drei Sätze statt einem. Auf der Heute-Karte ist das mehr Text, aber
es ersetzt das Nachschlagen.
