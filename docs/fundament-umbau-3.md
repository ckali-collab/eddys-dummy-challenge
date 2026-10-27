# Fundament-Umbau, Teil 3: Resttexte und eine Migrationskorrektur

Nachtrag zu Teil 1 und 2. Abschnitt 1 ist dringend und gehört **vor** den
Commit von Teil 2. Alles andere danach.

---

## 1. Vor dem Commit: Schritt aus dem Zähler ableiten

Punkt 3 des Berichts zu Teil 2: Angefangene Level stehen nach der Migration auf
Schritt 1 und brauchen deshalb einen guten Durchgang mehr. Das ist reparierbar,
aber nur solange die v2→v3-Migration noch nicht ausgerollt ist.

Im Modell gilt: nach n guten Durchgängen steht das Level auf Schritt n+1.
Daraus folgt die Migrationsregel:

```js
// v2 -> v3, für jedes Level
step = completedAt ? 4 : Math.min(4, (durchgangszaehler ?? 0) + 1)
```

Ein Level mit 1 von 3 landet damit auf Schritt 2, eines mit 2 von 3 auf Schritt
3. Das ist kein Geschenk, sondern die Umkehrung derselben Regel, die den Schritt
sonst weiterschaltet.

Die Zweifelsregel aus Teil 1 ("im Zweifel auf Schritt 1") gilt weiter für den
Fall, dass kein Zähler vorliegt oder er nicht lesbar ist.

Danach committen.

---

## 2. Was ich aus Teil 2 übernehme, ohne Änderung

Diese Festlegungen waren besser als meine Vorgabe und bleiben:

- **Belastungsmodell:** Grundwert 5 als Richtwert mit Hinweis, Alter und
  Gelenke bleiben harte Obergrenzen. Dass ein Junghund eine echte Grenze von 5
  hat und ein gesunder Erwachsener nur einen Richtwert, ist richtiger als meine
  pauschale Warnschwelle.
- **Schritt bei vollem Zähler**, siehe oben.
- **Einstieg und Ziel nur im Hauptteil.** Der Hinweis stimmt: bei Warm-up und
  Abschluss wäre der Zielschritt eines geschafften Levels immer Schritt 4.
- **Vorbereitungs-Checkliste nur bei der Vollsession.** Werfer und Rollzaun
  passen beim Spaziergang nicht.
- **Mini-Session behält ihren Abschlussblock** mit 1 Minute, weil er
  Trainingsinhalt hat.
- **Prüfungsbezug** als "Zählt für Dummy A, Markierung". Klasse O heißt
  "Klasse O".
- **Mengen** 2 als Mindestmenge, wo nur "mehrere" stand.
- **`run` und `amount` entfernt**, wo kein Ersatz vorlag. Die Lücke schließt
  Abschnitt 3.
- **Gelände-Kopfzeile aus dem Pfad** statt aus der alten TERRAIN-Tabelle.

Streichen bitte: den Satz über die Apportiereinheiten bei den Bronze-Leveln
von A, B und C. Der Hinweis gehört zu Apportierübungen, und dort kommt kein
Apport vor. Er steht künftig nur bei **E Bronze und F Bronze**.

---

## 3. Die fehlenden Kartentexte (`run`)

Je ein Satz, was in diesem Durchgang zu tun ist:

| Level | `run` |
|---|---|
| H Bronze | Dummy an der Leitlinie auslegen, Hund ausrichten, mit Handzeichen und Voran schicken. |
| H Silber | Hund auf Distanz stoppen, Arm neutral vor die Brust, zwei Sekunden warten, dann ein Richtungssignal. |
| H Gold | Dummy vorher ins Suchengelände legen, Hund einweisen, am Ziel das Suchensignal geben, dann nicht mehr lenken. |
| F Gold | Zwei Dummys im engen Winkel werfen lassen, Reihenfolge vorgeben, eines aus Deckung oder über Wasser. |
| D Gold | In der Linie gehen, Dummy fliegt aus der Bewegung, ein anderes Gespann arbeitet zuerst. |

---

## 4. Track G: Kriterien neu, Verzögerung nur auf Schritt 4

Der alte Text verlangt die Verzögerung als feste Bedingung. Ersetzen:

```
G Bronze
criteria: 'Findet in einer freien Verlorensuche Dummys in einem begrenzten
           Gebiet, bis 30 Meter, ohne Verzögerung. Drei Durchgänge.'
run:      'Dummys im Halbkreis auslegen, Hund schicken, Suchensignal erst
           wenn er Witterung bekommt.'

G Silber
criteria: 'Findet drei bis fünf Dummys in einem begrenzten Suchengebiet, bis
           50 Meter. Auf dem letzten Schritt mit zwei Minuten Verzögerung
           zwischen Auslegen und Schicken. Drei Durchgänge.'
run:      'Zehn oder mehr Dummys im Halbkreis auslegen, den Hund drei bis fünf
           holen lassen, den Rest selbst holen.'

G Gold
criteria: 'Findet acht Dummys in einem Suchengebiet von 50 mal 50 Metern, bis
           80 Meter. Auf dem letzten Schritt mit fünf Minuten Verzögerung.
           Drei Durchgänge.'
run:      'Suchengebiet mit natürlicher Begrenzung abstecken, zehn oder mehr
           Dummys auslegen, acht holen lassen.'
```

Die Dummy-Zahlen 3 bis 5 und 8 kommen aus den Prüfungsordnungen für Dummy A
und Dummy F.

**Packliste G korrigieren:** nicht 1 Dummy, sondern **zehn oder mehr**. Das ist
keine Kleinigkeit, sondern der Kern der Methode: immer viele auslegen, den Hund
nur einen wechselnden Teil holen lassen, den Rest sichtbar selbst holen. Sonst
gewöhnt er sich an eine feste Zahl.

---

## 5. Suchendummy 80 g zuordnen

Es gehört in den Aufbau der **Kleinen Suche**, nicht in die Verlorensuche. Buch:
Leckerchen auf 2 bis 3 Quadratmetern, dann Minisuchendummys von 80 Gramm auf
4 mal 4 Metern.

| Level | Suchendummy 80 g |
|---|---|
| G Bronze, Schritte 1 und 2 | ja, als Aufbauhilfe |
| H Gold | ja, optional für die Kleine Suche am Zielort |
| alle anderen | nein |

---

## 6. Restliche Datenwidersprüche

### E Bronze: Dummygewichte
Die Packliste nennt 500 g oder Juniordummy, die Schritte nennen 200 g und
400 g. Die Schritte sind richtig. Packliste von E Bronze: **Welpendummy 200 g
und Juniordummy 400 g.** Das Standarddummy 500 g kommt erst in E Silber.

### F Gold: Gelenkwarnung und Track-Kurztext
Die Warnung bezieht sich noch auf die Mehrfachmarke. Neuer Text:

> Zwei Apports bis 80 Meter, einer durch Deckung oder Wasser. Bei
> Gelenkbefund die Distanz reduzieren, nicht die Zahl der Apports.

Der Kurztext von Track F sagt noch "Dreifachmarke". Teil 1 hat Track-Texte für
unantastbar erklärt, das war zu streng: ein Begriff, den es im Regelwerk nicht
gibt, muss raus. Neuer Kurztext:

> Markierungen sehen, erinnern und holen, von der Einzelmarkierung bis zur
> Doppelmarkierung.

### F Silber: Tipp verweist auf alte Schrittnummer
Der Verweis "Steadiness Silber Schritt 4" zeigt auf die alte Schrittliste.
Ersetzen durch "Steadiness Silber" ohne Schrittnummer. Dasselbe überall, wo ein
Tipp auf eine Schrittnummer eines anderen Levels zeigt: Nummer weglassen, Level
nennen.

### Dummyfarben vereinheitlichen
Es gilt die Formulierung aus Teil 1, überall identisch:

> Der Hund hat kein Sehpigment für Grün. Blau und Violett sieht er
> zweifelsfrei, deshalb sind blaue Dummys die beste Lernhilfe. Rot, Gelb,
> Orange, Braun, Gelbgrün und Grün kann er nicht unterscheiden. Orange ist
> für den Menschen gut sichtbar, nicht für den Hund. Weiße Dummys wirken über
> den Kontrast, nicht über die Farbe.

Wo die Equipment-Daten keine Farben führen, bleibt das so. Der Text gehört in
den Basics-Tab, nicht in die Equipment-Liste.

### Mindestalter-Anzeige
"Ab etwa N Monaten" plus Begründung aus der Tabelle ist richtig so. Der
Zusatz "nach dem Zahnwechsel" gehört nur zu F und E, nicht zu allen.

### Diagramme
`diagram` wird nirgends gerendert. Keine Arbeit daran, bis die Diagramme
selbst gebaut werden. Die fehlenden Namen bei F Gold und H Bronze bleiben leer.

---

## 7. Belastungswerte der fünf neuen Level

Die alten Werte stammen von den ersetzten Übungen. Neue Werte, in Apports
gerechnet:

| Level | alt | neu | Begründung |
|---|---|---|---|
| F Gold | Wert der Dreifachmarke | **2** | Doppelmarkierung sind zwei Apports |
| D Gold | Wert von Honouring | **1** | 80/20-Regel, der Hund holt selten |
| H Bronze | Wert von Memory | **1** | ein Voran, ein Apport |
| H Silber | Wert mit Memory Blind | **2** | Stopp plus Richtung, zwei Apports |
| H Gold | Wert von Cold Blind | **1** | ein Einweisen bis zum Fund |

Wenn ein Wert dadurch unter dem liegt, was der Session-Builder für einen
sinnvollen Hauptteil braucht, melde es, statt die Zahl anzuheben.

---

## 8. Das Glossar

Dass es im Repo keins gab, ist der Grund, warum es als nächstes kommt. Die
Datenkonstante mit dem einen Eintrag Blinken ist der richtige Anfang. Nicht
erweitern, nicht anzeigen: das vollständige Glossar und der Basics-Tab kommen
als eigener Durchlauf, zusammen mit dem Einwirkungs-Abschnitt und dem
Rechtskapitel.
