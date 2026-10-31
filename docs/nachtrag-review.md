# Nachtrag zum Review

Antwort auf die Prüfaufgaben und die sieben Lücken. Zwei Punkte sind dringend.

---

## 1. Markierstab: ja, korrigieren, vor dem Deploy

Drei sichtbare Stellen widersprechen dem neuen Glossartext. Das ist schlimmer
als der ursprüngliche Fehler, weil die App sich jetzt selbst widerspricht.

| Stelle | neu |
|---|---|
| Basics, "Dummys und Ausrüstung" | Ein Stab, der eine Stelle im Gelände markiert. Nicht der Stab ist das Ziel, deine Hand zeigt den Weg. Deshalb immer mehrere aufstellen und nur bei einem ein Dummy auslegen. |
| F Gold, Tipp | Mehrere Markierstäbe aufstellen, Dummy nur bei einem. So lernt er, auf deine Richtungsangabe zu achten statt auf den nächsten Stab. |
| `DUMMY_FACTS.markierstab` | derselbe Text wie in den Basics, das ist die Quelle dafür |

**D Silber mit einem einzelnen Stab** ist kein Widerspruch: Dort wird der Stab
beim Weggehen gesetzt, er markiert nicht ein Ziel für den Hund. Lass ihn, aber
nimm den Zusatz dazu: "Der Stab markiert hier deinen Weg, nicht ein Ziel für
den Hund."

**F Silber mit zweimal "Markierstab setzen" bei vier im Equipment** ist
ebenfalls in Ordnung. Vier stehen, zwei davon bekommen ein Dummy. Genau so
soll es sein.

**Das Troubleshooting wird nirgends angezeigt.** Melde, ob es noch gebraucht
wird. Wenn es nirgends hinführt, gehört es entweder angezeigt oder gelöscht.

---

## 2. Aufwärmen bei Gelenkbefund

Der wichtigste Punkt deiner Liste, und du hast ihn richtig eingeordnet.
Galoppsprints und Wendungen für einen Hund mit deutlichem Gelenkbefund sind
fachlich falsch, und die App sagt an anderer Stelle selbst das Gegenteil.

**Der Ablauf wird profilabhängig.** Bei `joints: "deutlich"`:

> 1. Lockeres Traben, etwas länger als sonst.
> 2. Kontrolliertes Schrittgehen.
> 3. Noch einmal Trab.
> 4. Weite Bögen statt enger Wendungen. Keine Galoppsprints.
> 5. Konzentrations- und Gehorsamsübungen im Schritt.
> 6. Zum Schluss selbstständiges Dehnen.
>
> Bei bekanntem Gelenkbefund den Ablauf einmal mit dem Tierarzt abstimmen.
> Die Zeiten gelten unverändert: Unter zehn Minuten bringt das Aufwärmen
> nichts.

Bei `joints: "leicht"` bleibt der Standardablauf, aber mit einem Zusatz nach
Punkt 4: "Die Galoppsprints kurz halten."

**Das ist meine Ableitung, nicht aus dem Buch.** Siegl beschreibt einen
Ablauf, ohne nach Gelenkbefund zu unterscheiden. Dass ein Hund mit
Gelenkproblemen keine Sprints und engen Wendungen macht, folgt aus derselben
Logik, mit der die App ihr Belastungsmodell staffelt.

---

## 3. Die neun Kartentexte ohne Angabe

Die Regel dahinter: **Appell-Übungen verteilen sich über die Einheit, Apports
kommen in Gruppen mit Freigabe dazwischen.**

| Level | Zusatz |
|---|---|
| A Silber | ... über die Einheit verteilt. |
| B Bronze | ... über die Einheit verteilt, dazwischen normal weitergehen. |
| B Silber | ... über die Einheit verteilt, dazwischen normal weitergehen. |
| C Gold | ... über die Einheit verteilt. |
| D Bronze | ... nacheinander, dazwischen kurz freigeben. |
| D Silber | ... nacheinander, dazwischen kurz freigeben. |
| E Silber | ... am Stück, danach eine Pause. |
| E Gold | ... einzeln, dazwischen etwas anderes machen. |
| F Bronze | ... in zwei Gruppen, dazwischen freigeben. |
| F Silber | ... nacheinander, dazwischen freigeben. |

**E Gold einzeln**, weil es dort um hohe Erregung geht: Drei Abgaben
hintereinander bei Erregung trainieren das Gegenteil.

---

## 4. Die Trackbeschreibung von H

"Voran, Back, Links, Rechts, Blind" nennt vier feste Signalwörter.

> Neu: Den Hund auf Distanz lenken: geradeaus, zurück, zur Seite, und auf ein
> Dummy, das er nicht gesehen hat.

Die Funktionen statt der Wörter. Wer eigene Signale nutzt, findet sie im
Profil und in der Signalzeile.

---

## 5. Die übrigen Lücken

**Cool Down der Kurzübung:**
> Lockerer Trab, dann Schritt, bis die Atmung ruhig ist.

**E Bronze, "maximal zwei bis drei Wiederholungen" im Hintergrund:** Der Satz
gehört zum Einstiegsalter und meint Trainingseinheiten pro Woche, nicht
Retrieves pro Einheit. Präzisieren:
> Zu Beginn reichen zwei bis drei Apportiereinheiten pro Woche.

**E Silber, Equipment zeigt "oder Juniordummy 400 g":** Stufe 1 sagt 500
Gramm. Das Level gehört ohnehin nicht in die Mini-Session, dort geht es um
schwere und ungewohnte Gegenstände. **`dummyType` auf Standard setzen** und
die Folge in Kauf nehmen. Melde, wenn dadurch zu wenige Level für die
Mini-Session bleiben.

**Basics-Tabelle "ca. 30 % der max. Leistungsfähigkeit":** Ersetzen durch
> Er soll danach warm sein, nicht müde.

Die Prozentzahl steht weiterhin in der Begründung darunter, dort ist sie am
Platz.

**Bewegungsseher kennzeichnen:** Gar nicht. Die App zeigt keine
Evidenzstufen, das war von Anfang an so entschieden. Die Kennzeichnung gehört
in die Spezifikation, und dort steht sie. Mein Satz war missverständlich.

**Absturz-Hinweis ohne Export:** Bleibt so. Wenn die Daten selbst die Ursache
sind, hilft kein Knopf mehr, und ein Export aus einem abgestürzten Zustand
wäre unzuverlässig. Der Satz "Bitte nicht neu installieren" ist das
Wesentliche.

---

## 6. Deine drei Spec-Fehler

Alle drei berechtigt.

**"Wasserratte" war nicht tot**, es gab das Häkchen. Mein Fehler: Ich habe die
Trophäenliste gelesen und nicht geprüft, wie sie ausgelöst wird. Dass du die
Bedingung behalten und nur umbenannt hast, ist richtig.

**Die Dummygewichte** kamen nicht von der Altersregel. Danke für die
Korrektur, meine Begründung war falsch, die Vereinheitlichung bleibt richtig.

**`desc` wird nirgends angezeigt.** Dann gilt für die Prüfaufgabe nur `short`,
und H ist der einzige Fall.

---

## 7. Deine Entscheidungen

Alle übernommen. Drei hervorzuheben:

**Die Belastungsanzeige nur bei genau erreichtem Richtwert** ist präziser als
meine Formulierung. Bei 3 von 5 wäre der Satz falsch gewesen.

**Der Hinweis bei E Bronze nur für Profile mit 500 g** ist konsequent, daran
hatte ich nicht gedacht.

**Dass du die Glossar-Sprechblase repariert hast**, obwohl der Fehler älter
war als diese Runde, ist genau richtig. Melde solche Funde weiter, aber
repariere sie, wenn sie klein sind.

**"Das kann er schon" ohne Rückweg** ist in Ordnung. Wer zu weit springt,
bewertet einmal mit "noch nicht" und ist eine Stufe zurück. Das reicht.
