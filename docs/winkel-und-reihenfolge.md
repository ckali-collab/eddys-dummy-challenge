# Der Winkel steht nicht im Regelwerk

Nachgelesen in der APD/R des DRC, Fassung 2022-09-03, Original-PDF von drc.de.

---

## 1. Drei Fehler im Kriterium von F Gold, zwei davon von heute

Deine Frage 5 hat eine Antwort, die weiter reicht als die Frage.

**"Winkel" kommt in der gesamten APD/R nicht vor.** Kein einziges Mal, in
keinem Paragraphen, in keiner Klasse.

Die 90 Grad stammen aus der **DP-E**, und die ist die Prüfungsordnung des
**GRC**, nicht des DRC. Ich habe eine Zahl aus einem Regelwerk in ein anderes
übertragen und dort als Steigerung konstruiert ("enger als 90 Grad"). Du
hattest das gemeldet: "Es kann 'enger als 90 Grad' nicht behalten, weil das
dort nie stand." Ich habe geantwortet, der Winkel gehöre ins Kriterium. Das
war falsch, und es war schlechter als das, was vorher dastand.

**§ 30 Abs. 3 im Wortlaut:**

> Die Reihenfolge der gebrachten Dummies ist beliebig. Sie wird dem Richter
> vom Hundeführer mitgeteilt.

Nicht der Richter gibt sie vor, sondern der Hundeführer sagt sie an. Mein
Tipp bei F Gold behauptet das Gegenteil.

**§ 30 Abs. 1 und 2:**

> ... mindestens ein Dummy in ein Gewässer oder jenseits eines stehenden
> (langsam fließenden) Gewässers fällt.

Ist kein geeignetes Gewässer da, darf nach Abs. 2 an Land gearbeitet werden,
dann aber **zusätzlich** eine Markierung aus tiefem Wasser, die nur mit
bestanden oder nicht bestanden bewertet wird. "In Deckung **oder** im Wasser"
gibt es nicht, Deckung ist kein Ersatz.

---

## 2. Das Kriterium neu

```
criteria: Holt beide Dummys einer Doppelmarkierung in der Reihenfolge, die du
          ansagst, bis 80 Meter, auch im schweren Gelände. Vier Durchgänge.
```

Gleiche Bauart wie F Silber: Das Kriterium nennt kein Wasser, weil
Geländestufe 4 es nicht erzwingt, und der Prüfungsbezug trägt die
Regelwerksanforderung.

**Die eigentliche Leistung steht jetzt drin.** Dass der Hundeführer die
Reihenfolge vorher ansagen muss, ist der Grund, warum der Hund jede
Reihenfolge können muss und nicht nur seine liebste.

---

## 3. Der Tipp wird umgedreht

Statt "In der Prüfung gibt der Richter sie vor":

> Am Anfang den zuletzt geworfenen zuerst schicken, der liegt frischer im
> Gedächtnis. Sobald das sitzt, die Reihenfolge wechseln. In der Prüfung sagst
> du sie vorher an, und dann muss er genau die bringen.

---

## 4. Der Prüfungsbezug bekommt die Ausweichregel

> In der Fortgeschrittenen-Klasse muss mindestens ein Dummy der
> Doppelmarkierung ins Wasser oder darüber. Ist kein geeignetes Gewässer da,
> wird an Land gearbeitet und zusätzlich eine Markierung aus tiefem Wasser
> verlangt, die nur bestanden oder nicht bestanden zählt. Wenn du dieses Level
> ohne Wasser abgeschlossen hast, hol das nach, bevor du zu einer Prüfung
> gehst.

---

## 5. Was mit dem Winkel passiert

**Aus dem Kriterium raus. Im Aufbau bleibt er**, aber als das, was er ist:
eine Trainingsmethode, keine Prüfungsvorgabe.

> Schritt 1: Zwei Dummys werfen lassen, am Anfang weit auseinander, etwa
> 10 Uhr und 2 Uhr. Erst wenn beide Apporte sauber sitzen, den Winkel über
> mehrere Einheiten zusammenziehen. Je enger die beiden Fallstellen
> beieinanderliegen, desto schwerer wird es für ihn, sie auseinanderzuhalten.

Die Zahl 90 verschwindet damit aus Track F. **Bei F Bronze bleibt sie**, dort
gehört sie hin: Die DP-E nennt sie ausdrücklich, und das Level zählt für die
DP-E.

**Prüf, ob die Trophäe von Track F den Winkel noch nennt.** Sie zieht aus dem
Kriterium, sollte also mitziehen, aber melde es.

---

## 6. Deine übrigen Fragen

**Frage 1, Abschnitt 6 anfangen:** Ja. 424 px gespart ist genug Spielraum.

**Frage 2, Kurzzeile bei deutlichem Befund:** Ja, deine Fassung. Sie ist aus
dem vorhandenen Ablauf abgeleitet, nicht erfunden.

**Frage 3, Knopf und Signale:** Du hast recht, meine Regel war überflüssig.
Zugeklappt steht niemand mehr vor den Feldern, und unter dem Knopf müsste man
nach dem Ändern zurückscrollen. Reihenfolge bleibt.

**Frage 4, E Gold:** Ja, deine Fassung. Sie deckt beides ab, meine nur das
Schütteln.

**Frage 6, die vier Stellen:** Drei davon ja, auf "Hundeführer". Die vierte,
Glossar Doppelmarkierung, wird inhaltlich falsch und nicht nur sprachlich:

> Zwei sichtbar geworfene Dummys. Der Hundeführer sagt dem Richter vorher an,
> in welcher Reihenfolge der Hund sie bringt, und der Hund muss sie genau so
> bringen.

**Frage 7, alle drei ja:**
- **Sie-Satz:** Stell ihn auf "du" um und lass den Rest unverändert. Den
  vollen Wortlaut habe ich nicht, deshalb keine fertige Fassung. Melde ihn,
  wenn die Umstellung mehr als die Anrede ändert.
- **"anleinen" in Basics und Glossar:** Ja, derselbe Widerspruch wie in
  Abschnitt 9. "Lösen lassen" bleibt, "anleinen" fällt weg.
- **Rückruf-Tipp:** Ja. Die Begründung gilt für jeden Pfiff, nicht nur für den
  Stopp-Pfiff: Hunde hören viermal leiser, und wer immer laut pfeift, hat
  keine Reserve für Distanz, Wind und Deckung. Derselbe Tipp bei Rückruf
  Bronze, Silber und Gold.

---

## 7. Die netlify.toml

Du findest sie nicht, weil sie noch nicht existiert. Hier der Wortlaut, neue
Datei im Repo-Wurzelverzeichnis:

```toml
[build]
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- . ':(exclude)docs'"
```

Damit löst ein Commit, der nur `docs/` berührt, keinen Netlify-Build aus.
**Prüf die Pathspec lokal mit einem Testcommit:** Bei einer reinen
docs-Änderung muss der Befehl Exit 0 liefern, bei jeder Änderung außerhalb
Exit 1. Wenn `$CACHED_COMMIT_REF` leer ist, läuft der Build, das ist der
richtige Fallback.

**Melde nach dem ersten reinen docs-Commit, ob Netlify den Build übersprungen
hat und wie der Eintrag im Deploy-Log heißt.** Ob ein übersprungener Build
Credits kostet, steht in der Netlify-Doku nicht ausdrücklich.

---

## 8. Dein Hinweis zum Update

Angenommen, und es erklärt meine Beobachtung von vorhin. Nebenbei: Mein
Schluss war ohnehin falsch, meine erste Abfrage lag schon nach dem Deploy.

Die Regel selbst ist richtig so. Ein Update mitten in einer laufenden Session
wäre schlimmer als ein Tag Verzögerung.
