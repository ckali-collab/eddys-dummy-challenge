# Fundament-Umbau, Teil 4: Track G und die Begriffskollision

Nachtrag zu Teil 3. Teil 3 kann vorher committet werden, nichts hier
widerspricht ihm.

---

## 1. Zwei Dinge heißen "Schritt"

Punkt 5 des Berichts: Die Tipps zählen Ablaufschritte, der neue Pfad zählt
Schwierigkeitsstufen, und beide heißen in der Oberfläche "Schritt". Das ist
meine Schuld, Teil 1 hat den Begriff doppelt belegt.

**Auflösung, nur in der Anzeige:**

| Was | Feld | Anzeigebegriff |
|---|---|---|
| Ablauf der Übung, Aufbau über Wochen | `steps` | **Schritt** (unverändert) |
| Vier Schwierigkeitsstufen aus D/G oder Bedingungen | `step`, `path`, `conditionPath` | **Stufe** |

Die Feldnamen im Code bleiben, nur die Texte ändern sich:

```
Einstieg (zum Erinnern, wird nicht bewertet):
  Stufe 1 - bis 15 m (etwa 20 Schritte), offen und einsehbar

Ziel heute (wird bewertet):
  Stufe 2 - bis 30 m (etwa 40 Schritte), offen und einsehbar
```

Ebenso "Stufe 2 von 4" im Übungsdetail und "(Stufe 1 und 2)" beim
Suchendummy.

Damit sind die drei Tipps von B Bronze, B Gold und D Silber wieder eindeutig
und bleiben unverändert. Die Schrittschätzung in Metern heißt weiterhin
"etwa 40 Schritte", das ist ein Gangschritt und keine Verwechslungsgefahr.

---

## 2. Track G: der Ablauf

Punkt 3 des Berichts. Die `steps` beschreiben noch eine Übung mit einem
einzelnen Dummy und haben die Verzögerung fest eingebaut. Vollständiger
Ersatz, Inhalte aus dem Buch:

### G Bronze (Frei-Verloren-Suche, DP-E)
1. Suchengebiet mit natürlicher Begrenzung wählen, etwa Hecke, Weg oder
   Grabenkante. Die Begrenzung hält den Hund im Gebiet, ohne dass du lenken
   musst.
2. Sechs bis acht Dummys **im Halbkreis um den Hund** auslegen, 10 bis 15
   Meter Abstand zueinander. Der Hund sieht dabei zu. Der Halbkreis
   minimiert die Tauschgefahr.
3. Hund schicken. **Das Suchensignal nicht automatisch geben**, sondern genau
   in dem Moment, in dem er Witterung bekommt.
4. Zwei bis drei Dummys holen lassen, den Rest selbst holen, sichtbar für den
   Hund.
5. Die Anzahl bei jeder Wiederholung ändern, sonst gewöhnt er sich an eine
   feste Zahl.

### G Silber (Verlorensuche 3 bis 5, Dummy A)
1. Zehn oder mehr Dummys im Halbkreis auslegen, **ohne dass der Hund zusieht.**
2. Wind prüfen und den Ansatz danach wählen: bei Gegenwind früh revieren
   lassen, bei Seitenwind den Ansatzpunkt wandern lassen, bei Rückenwind erst
   tief hinein und dann zurücksuchen.
3. Hund schicken, drei bis fünf Dummys holen lassen.
4. Nur auf der letzten Stufe: zwei Minuten warten, bevor du schickst.

### G Gold (Verlorensuche 8, Dummy F)
1. Suchengebiet von **50 mal 50 Metern** abstecken, so groß wie in der
   Prüfung.
2. Zehn oder mehr Dummys verdeckt auslegen.
3. Acht Dummys holen lassen.
4. Suchenstil messen: farbige Dummys in farbgleichen Reihen auslegen. An der
   Farbe der gebrachten Dummys erkennst du, ob der Hund vorne oder hinten
   sucht.
5. Nur auf der letzten Stufe: fünf Minuten warten, bevor du schickst.

**Die Verzögerung steht in keinem Ablaufschritt mehr als feste Bedingung**,
sondern nur im jeweils letzten, mit dem Zusatz "nur auf der letzten Stufe".

Dazu für alle drei G-Level als Tipp: Nasenarbeit ist Schwerstarbeit. Die Nase
muss feucht sein, sonst sinkt die Leistung, also Wasser mitnehmen. Der
Zickzackkurs dient auch der Nasenerholung, weil sich die Riechzellen an
gleichartige Gerüche gewöhnen.

---

## 3. Track G gehört nicht in die Mini-Session

Punkt 4 des Berichts. Zehn Dummys und ein Jackentaschen-Dummy passen nicht
zusammen.

**Alle drei G-Level verlieren die Markierung "Juniordummy reicht".**
Verlorensuche braucht die volle Auslage, nicht ein Dummy unterwegs. Damit
fällt G aus der Mini-Session heraus.

Prüf bitte, ob dadurch zu wenige Level für die Mini-Session übrig bleiben. Wenn
ja, melde es, statt G wieder aufzunehmen oder die Dummyzahl zu senken.

---

## 4. Zwei Kleinigkeiten

### "Nach dem Zahnwechsel" bei E
Punkt 1 des Berichts: E hat kein Mindestalter, der Zusatz erscheint nie.
**Zusatz bei E entfernen.** Er gehört nur zu F. Abgabe wird von Anfang an
geübt, da ist der Zahnwechsel kein Kriterium.

### Farbtext vervollständigen
Punkt 2: Richtig gesehen, mein Zitat war unvollständig. Der Satz **"Rot
erscheint ihm als sattes Gelb"** gehört dazu, direkt nach der Aufzählung der
nicht unterscheidbaren Farben.

---

## 5. Was danach kommt

Damit ist der Fundament-Umbau an den Daten abgeschlossen. Offen bleibt genau
ein Block, und der braucht keine Code-Spezifikation, sondern erst Inhalt:
Glossar, Basics-Tab, Einwirkungs-Abschnitt und Rechtskapitel. Die
Glossar-Datenkonstante mit dem einen Eintrag bleibt bis dahin unangetastet.
