# Ebenen-Abgleich

Antwort auf die Prüfaufgabe und die Meldungen. Ein echter Bug ist dabei.

---

## 0. Meine Falschbehauptung, und ein fehlender Glossarsatz

Ich habe geschrieben, das Glossar sage bereits, dass oft dasselbe Wort für
beide Seiten benutzt wird. Das stimmt nicht, und der Grund ist, dass ich mich
auf eine Fassung berufen habe, die es nicht mehr gibt: Der Satz stand in
Fassung 4 des Glossars und ist beim Schreiben von Fassung 5 verlorengegangen.

**Nachtragen im Glossareintrag "Richtungssignal seitlich":**

> Verbreitete Wörter sind Rüber oder Go, oft dasselbe Wort für beide Seiten,
> weil der Arm die Richtung trägt. Wer zwei Wörter nutzt, trägt beide im
> Profil ein.

Danach stimmt auch der Satz, den ich ins Kriterium von H Silber gesetzt habe.

**Den Evidenz-Tag `Praxis` wegzulassen war richtig.** Er stand in meiner Vorlage
aus Versehen, die Regel aus `basics-umsetzung.md` gilt.

---

## 1. Der Bug: H Bronze hat vier Stufen mit zwei Inhalten

Der wichtigste Fund. Der Pfad lautet D1G1, D1G1, D2G1, D2G1, also zeigen Stufe
1 und 2 denselben Text, und 3 und 4 ebenso. Die App kann sie nicht
unterscheiden, und der Nutzer sieht zweimal dasselbe.

Das kommt aus meiner Tabelle in `fundament-umbau.md`, wo ich die Duplikate
bewusst gesetzt habe mit der Begründung, bei H variiere nicht die Distanz,
sondern die Richtungsarbeit. Die Begründung war richtig, die Umsetzung falsch:
Ich habe die Variation nicht benannt, sondern die Distanz verdoppelt.

**H Bronze bekommt statt des D/G-Pfades vier eigene Stufen**, abgeleitet aus
dem Voran-Aufbau des Buchs:

1. Futterschüssel an einer Leitlinie, etwa 15 Meter.
2. Dummy statt Schüssel, an derselben Leitlinie.
3. Halbblind: eine zweite Person legt nach, während er zurückläuft. Bis 30 Meter.
4. Vollblind: vorher ausgelegt, er hat nichts gesehen. Bis 30 Meter.

Technisch bleibt es ein `path` mit Distanzstufen, die Texte kommen aber wie bei
A bis E aus eigenen Einträgen. Wenn das Datenmodell das nicht hergibt, melde
es, statt eine Zwischenlösung zu bauen.

**Prüf H Silber, H Gold und den Wasser-Pfad auf dasselbe Muster** und melde,
was du findest.

---

## 2. Die sechs Kartentexte aus der Prüfaufgabe

| Level | neu |
|---|---|
| B Silber | 5 Rückrufe in der Situation der heutigen Stufe, jeder mit Lob und Freigabe. |
| C Gold | 5 Halts in der Situation der heutigen Stufe, er setzt sich jedes Mal ohne Kommando. |
| D Gold | In Bewegung gehen, Dummy fliegt, in der Situation der heutigen Stufe. |
| E Bronze | 10 kurze Retrieves bis 10 Meter, jedes Mal ruhig abnehmen. |
| F Bronze | Eine Einzelmarke auf der Distanz der heutigen Stufe. |
| F Gold | Zwei Dummys im engen Winkel, auf Distanz und Gelände der heutigen Stufe. |

Bei **E Bronze** entfällt das Rückwärtsgehen aus dem Kartentext, weil Stufe 4
die Abgabe im Stehen verlangt. Es bleibt im Aufbau, dort gehört es hin.

Die Rücknahme der F-Bronze-Meldung ist richtig: Jede Stufe hat genau eine
Geländeart, der alte Kartentext war korrekt.

---

## 3. Was durch meine letzte Runde entstanden ist

**A Silber, Aufbau Zeile 3:** "schrittweise auf 30 bis 35 Meter steigern" wird
zu **"schrittweise auf 35 Meter steigern"**.

**Verlorene Inhalte wiederherstellen.** Mein Ersatz hat ganze Sätze getauscht
und dabei Substanz mitgenommen:

| Level | ergänzen |
|---|---|
| A Silber, Kartentext | 4 saubere Stopps in der Situation der heutigen Stufe. Jeder Stopp wird belohnt, mit Rückruf oder Dummywurf. |
| E Gold, Kartentext | 3 Retrieves in der Situation der heutigen Stufe, jedes Mal bei hoher Erregung. |

---

## 4. Widersprüche, die schon vorher da waren

**C Bronze, Kriterium:** "ohne Leine" und "Keine Leinenspannung" im selben
Satz. Mein Fehler beim Umschreiben.
> Geht 50 Meter ohne Leine bei Fuß, bei Richtungs- und Tempowechseln, und
> setzt sich, wenn du stehen bleibst. Kein Vorlaufen, kein Zurückbleiben.

**E Silber, Aufbau:** "bleibt stehen und hält das Dummy" widerspricht dem
Kriterium, das die Fußposition verlangt.
> Er kommt an, geht in die Fußposition und hält das Dummy.

**C Silber, Aufbau:** "Tempo variieren, Kehrtwendungen gehen" gehört seit der
Neuzuordnung zu Bronze. **Zeile streichen.** Der übrige Aufbau trägt.

**H Silber, Kartentext:** Die zwei Sekunden Pause gelten nur für Back, nicht
für jedes Richtungssignal. Im Kartentext auf Back einschränken oder den
Zeitbezug weglassen.

---

## 5. Was kein Widerspruch ist

Die Meldung, der Aufbau behandele bei B Gold, D Silber und E Gold nicht alle
Stufen, ist richtig beobachtet, aber **kein Fehler.**

Der Aufbau ist eine eigene Ebene: Er beschreibt den Lernweg über Wochen, die
Stufen beschreiben die Prüfsituationen. Er muss die Stufen nicht spiegeln, er
darf ihnen nur nicht widersprechen. E Gold Zeile 1 "Nach langem Retrieve" ist
eine zusätzliche Aufbausituation, kein Widerspruch zu den Stufen.

Das ergänzt die Arbeitsregel aus `vier-ebenen.md`: **Geprüft wird auf
Widerspruch, nicht auf Deckungsgleichheit.**

---

## 6. DIRECTION_NOTE kommt in die Basics

Der Text ist gut und fehlt dort tatsächlich:

> Richtungsangaben sind immer aus deiner Sicht. Du streckst den linken Arm
> aus, der Hund läuft nach links von dir aus gesehen.

**In den Basics-Abschnitt "Handzeichen" aufnehmen**, nach dem Absatz zur
Drehrichtung bei Back. Dort steht bereits der verwandte Hinweis, dass der Hund
spiegelbildlich dreht, weil er dich ansieht. Die Konstante danach streichen.

---

## 7. Leeres Aus-Signal

Richtig gesehen. Ist im Profil nichts eingetragen, verschwindet die Zeile, aber
die Texte sprechen weiter davon.

**Lösung:** Die Texte von E Silber nennen das Signal nur, wenn eines
eingetragen ist. Ohne Eintrag:

| Stelle | mit Signal | ohne Signal |
|---|---|---|
| Kriterium | hält das Dummy, bis du das Aus-Signal gibst | hält das Dummy, bis du es nimmst |
| Stufe 4 | Er hält das Dummy, bis du das Aus-Signal gibst. | Er hält das Dummy, bis du es nimmst. |

Da die Vorbelegung "Aus" lautet, ist das der seltene Fall. Wenn die Umschaltung
im Code aufwendiger ist als gedacht, melde es: Dann bleibt es beim Signaltext,
und wer keines nutzt, liest darüber hinweg.
