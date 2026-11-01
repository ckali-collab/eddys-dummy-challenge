# Die drei "oder"-Stellen, plus zwei Funde aus der eigenen Prüfung

Geprüft am 1. November am Live-Stand `index-6Ec5JGYo.js`, Service Worker
entfernt, 375 x 812, Profil Eddy.

---

## 1. Der Umbau wirkt, gemessen

| | vorher | jetzt |
|---|---|---|
| Höhe der Heute-Seite | 2516 px | **1921 px** |
| Wörter | 397 | **204** |
| Wörter je Bildschirm | 128 | **86** |

**Das Verhältnis hat sich umgedreht**, und das war der eigentliche Punkt:

| | vorher | jetzt |
|---|---|---|
| Fester Text (Aufwärmen, Pausen, Cool Down) | 48 % | **22 %** |
| Hauptteil | 24 % | **36 %** |

Meine Zahlen liegen unter deinen, weil mein Teststand andere Blöcke zieht.
Die Richtung ist dieselbe.

**Die tote Fläche ist weg.** Ich habe unten in die Hauptteil-Karte getippt,
dort wo der Kasten "Ziel heute" steht, und das Level hat geöffnet. Der innere
Button ist noch da und hält den Tastatur-Einstieg.

**Deine Entscheidung zur Fortschrittszeile war richtig und meine Vorgabe
falsch.** Ich hatte sie als zu klein genannt und im selben Dokument die Regel
aufgestellt, nach der sie 14 px bleiben darf. Du hast die Regel angewendet
statt mein Beispiel, das ist die richtige Reihenfolge.

---

## 2. Die drei "oder"-Stellen

Dein Befund stimmt, und die Lösung ist überall dieselbe: **Wasser zuerst
nennen, die Ausweichung danach.** Das kostet keine Zeile mehr und stellt die
Rangfolge richtig.

**Schritt 4:**

> Mindestens ein Dummy ins Wasser oder darüber. Geht Wasser gerade nicht,
> reicht eine Sichtkante.

**Vorbereitung (`setup`):**

> Gelände mit Wasser, ersatzweise mit Sichtkante

**Gelenkwarnung:** Deine Empfehlung, kürzen. Eine Gelenkwarnung beschreibt die
Belastung, nicht das Gelände.

> Zwei Apports bis 80 Meter

---

## 3. Neuer Fund: der Markierstab-Tipp passt nicht zu F Gold

Nicht von dir gemeldet, beim Durchsehen der Leveldaten gefunden.

**F Gold, Tipp 1:**

> Mehrere Markierstäbe aufstellen, **Dummy nur bei einem**. Sonst lernt er,
> zum nächsten Stab zu laufen, statt sich die Fallstelle zu merken.

Bei einer Doppelmarkierung fallen **zwei** Dummys. Der Satz stammt aus
Troubleshooting Nr. 6, wo es um eine Einzelmarkierung geht, und ist beim
Kopieren nicht angepasst worden. Mein Fehler, der Satz ist von mir.

**Neu, und für beide Fälle richtig:**

> Mehr Markierstäbe aufstellen, als Dummys fallen. Sonst lernt er, zum
> nächsten Stab zu laufen, statt sich die Fallstelle zu merken.

**Troubleshooting Nr. 6 bleibt unverändert**, dort ist "Dummy nur bei einem"
korrekt, weil es um eine Einzelmarkierung geht.

---

## 4. Neuer Fund: zwei weitere Sie-Sätze

Die Suche nach "Sie" liefert zwei echte Treffer, die deine Durchsicht nicht
erfasst hat. Beide sind Buchzitate.

> Üben Sie Voran niemals mit Wind von vorn. Bei Gegenwind reviert der Hund
> statt zu laufen.

**Nur die Anrede, der Inhalt ist richtig und wichtig.** Er widerspricht der
Wind-Korrektur beim Markieren nicht, sondern ergänzt sie: Beim Markieren und
Suchen ist Gegenwind günstig, beim Voran stört er, weil der Hund unterwegs
Witterung bekommt und anfängt zu suchen, statt zu laufen.

> Übe Voran nie mit Wind von vorn. Bei Gegenwind reviert der Hund, statt zu
> laufen.

Und:

> Sie müssen deshalb sofort reagieren können, wenn Ihr Hund Ihre Hilfe
> braucht.

> Du musst deshalb sofort reagieren können, wenn dein Hund deine Hilfe
> braucht.

**Die übrigen "Sie" im Datenbestand sind Pronomen** ("Sie müssen sicher
gelingen", "Sie liegen nur in diesem Browser") und bleiben.

---

## 5. Was sauber ist

Selbst nachgesucht, keine Treffer mehr:

| Begriff | Stand |
|---|---|
| "Führer" allein | keine Fundstelle |
| "über Wasser" | keine Fundstelle |
| "anleinen" | nur noch "Ein fremder Hund ist in Sichtweite, angeleint", und das ist richtig |
| "90 Grad" | nur noch bei der DP-E in F Bronze und im Glossar |

---

## 6. Deine netlify.toml

Angenommen, ohne Einschränkung. Dein Test zeigt, dass mein Fallback das
Gegenteil getan hätte: Bei leerem `$CACHED_COMMIT_REF` vergleicht `git diff`
gegen den Arbeitsstand, findet nichts und überspringt den Build. Bei "Clear
cache and deploy" wäre also genau dann kein Build gelaufen, wenn man ihn
braucht.

Dass du das an echten Commits getestet hast statt an meiner Behauptung, ist
der Grund, warum es nicht live gegangen ist.
