# App-Befund und Umbau: zurück zur Benutzbarkeit

Stand 28.10.2026, geprüft am Live-Deploy vor dem Restposten-Commit. Maßstab:
rausgehen und ohne Umstände wissen, was zu tun ist.

**Die Diagnose vorweg:** Ich habe über fünf Spezifikationen hinweg Daten
hinzugefügt und nie entschieden, was davon der Nutzer draußen braucht. Das
Ergebnis sind zwei konkurrierende Listen für dieselbe Sache, eine umgekehrte
Informationshierarchie und Rohdaten als Anzeigetexte. Alle drei sind meine
Fehler, nicht Umsetzungsfehler.

---

## 1. Der Kernfehler: zwei Listen für dasselbe

Im Übungsdetail von Stopp-Pfiff Bronze stehen untereinander:

**STUFEN**
```
1  Hund sitzt          Ausgangssituation
2  Hund steht          Ausgangssituation
3  10 m Abstand        Entfernung und Position des Führers
4  25 m Abstand        Entfernung und Position des Führers
```

**AUFBAU ÜBER MEHRERE WOCHEN**
```
Hund geht bei Fuß. Leise pfeifen. Er setzt sich sofort hin.
Hund sitzt 20 große Schritte vor dir. Pfeifen. Er bleibt sitzen und schaut dich an.
Rückruf pfeifen, dann auf halbem Weg Pfiff. Er stoppt sofort.
Er stöbert wenige Meter vor dir. Pfeifen und gleichzeitig einen Dummy werfen.
```

Beides sind Vier-Punkte-Listen für dasselbe Level, und sie **widersprechen
sich**: Stufe 1 sagt "Hund sitzt", Variante 1 sagt "Hund geht bei Fuß".

Dazu steht darunter "In einem Durchgang arbeitest du an einer dieser
Varianten, nicht an allen", und im Durchgangstext "5 Stopps aus einer der vier
Varianten". Welche heute dran ist, sagt niemand.

### Die Auflösung

**Bei den Bedingungs-Tracks A bis E sind die bestehenden Varianten die
Stufen.** Sie sind konkreter und besser formuliert als meine
Bedingungs-Stichworte. Der `conditionPath` wird nicht mehr angezeigt, die
vier `steps` werden zur Stufenliste.

```
STUFEN
1  Hund geht bei Fuß. Leise pfeifen. Er setzt sich sofort hin.
2  Hund sitzt 20 große Schritte vor dir. Pfeifen. Er bleibt sitzen.
3  Rückruf pfeifen, dann auf halbem Weg Pfiff. Er stoppt sofort.
4  Er stöbert wenige Meter vor dir. Pfeifen und gleichzeitig ein Dummy werfen.
```

Eine Liste, nummeriert, aktuelle Stufe markiert. Der Block "Aufbau über
mehrere Wochen" entfällt bei diesen Tracks ersatzlos.

**Bei den Distanz-Tracks F, G, H bleiben beide Listen**, weil sie
verschiedene Dinge sagen: Die Stufe nennt Distanz und Gelände, der Ablauf
nennt die Reihenfolge innerhalb eines Durchgangs. Dort ist `stepsType` schon
auf `ablauf` gesetzt, und die Überschrift heißt richtig "Ablauf eines
Durchgangs".

Wenn ein Bedingungs-Level nicht genau vier `steps` hat, melde es, statt die
Liste zu kürzen oder aufzufüllen.

---

## 2. Die Informationshierarchie ist umgekehrt

Was man beim Öffnen von Stopp-Pfiff Bronze sieht, in dieser Reihenfolge:

1. Prüfungsbezug
2. Lernphase, Verstärkung, Rahmen, Ziel (vier Zeilen Lerntheorie)
3. Kriterium
4. Stufen
5. **Was heute zu tun ist**
6. Aufbau über mehrere Wochen
7. Tipps, Achtung, Equipment, Fortschritt, Levelwechsel-Warnung

Man scrollt durch zwei Blöcke Theorie, bevor die Handlungsanweisung kommt.
Die Frage "brauche ich die Lernphase, um die Übung auszuführen" beantwortet
sich selbst: nein.

### Neue Reihenfolge

```
1  HEUTE
   Die aktuelle Stufe als Satz, dann der Durchgangstext, dann das
   Equipment für genau diese Stufe.

2  GESCHAFFT WENN
   Das Kriterium.

3  STUFEN  (bzw. STUFEN + ABLAUF bei F, G, H)
   Alle vier, aktuelle markiert.

4  TIPPS

5  ACHTUNG
   Der Warnhinweis des Levels.

6  FORTSCHRITT
   Zähler und Button.

7  HINTERGRUND   [eingeklappt, standardmäßig zu]
   Prüfungsbezug, Lernphase mit Verstärkungshinweis, Mindestalter,
   Levelwechsel-Warnung.
```

Abschnitt 7 ist der entscheidende Teil: Alles, was zum Verstehen gehört und
nicht zum Ausführen, wandert dorthin und ist zugeklappt. Der Inhalt bleibt,
er steht nur nicht mehr im Weg.

---

## 3. Rohdaten als Anzeigetext

"Hund sitzt / Ausgangssituation" ist der Inhalt meines Datenfeldes, kein Satz
für einen Menschen. Dasselbe im Session-Block: "Stufe 1 - Trainingsort:
Garten".

**Regel:** Die Anzeige nennt die Stufe und die Anweisung, nicht den Namen der
Bedingung. Der Bedingungsname ist eine interne Ordnungskategorie.

```
falsch:   Stufe 1 - Trainingsort: Garten
richtig:  Stufe 1 - Im Garten, ohne Ablenkung
```

Wo eine Variante nur aus einem Stichwort besteht, muss sie zu einem Satz
werden. Melde die Stellen, an denen das nicht aus den vorhandenen Daten geht,
statt zu formulieren.

Derselbe Fehler im Basics-Tab: Dort steht **"Und darüber steht ein Satz, der
alle Zweifelsfälle entscheidet"**. Das war meine Spec-Sprache und bezieht sich
auf nichts in der App. Ersetzen durch:

> Ein Satz entscheidet alle Zweifelsfälle: Die Arbeit ist für den Hund. Wo
> Motivation und Trainingsfortschritt in Konflikt geraten, gewinnt die
> Motivation. Abbruch vor Druck, Pause vor Wiederholung, Rückstufung vor
> Erzwingen.

Prüf den Basics-Tab auf weitere Stellen, an denen mein Spec-Ton stehen
geblieben ist. "Was diese App vorschlägt" als Überschrift ist in der App
selbst merkwürdig, besser: "Die Haltung dieser App".

---

## 4. Equipment hängt am Level statt an der Stufe

Der Befund des Nutzers. Stopp-Pfiff Bronze zeigt "1 Dummy 500 g (optional)",
obwohl das Dummy nur in Stufe 4 vorkommt. Wer auf Stufe 1 steht, nimmt es
umsonst mit.

**Lösung:** Equipment-Einträge bekommen eine optionale Stufenbindung.

```js
gear: [
  { item: 'Pfeife' },
  { item: '1 Dummy 500 g', steps: [4] }
]
```

Angezeigt wird:
- im **Session-Block und in der Packliste**: nur das Equipment der heutigen
  Stufe
- im **Übungsdetail unter HEUTE**: nur das der aktuellen Stufe
- im **Stufenblock**: beim jeweiligen Eintrag als Zusatz, etwa "Stufe 4:
  zusätzlich ein Dummy"

Ohne `steps` gilt ein Eintrag für alle Stufen.

Das löst auch den Track-Befund: "Stopp-Pfiff, Equipment Gold: 1 Dummy 500 g"
in der Trackübersicht. Dort zeigt die App das Equipment des nächsten offenen
Levels. Besser: das Equipment der **aktuellen Stufe des nächsten offenen
Levels**, und wenn alle Level geschafft sind, gar keins.

---

## 5. Die Packliste richtet sich nicht nach der Session

Der zweite Befund des Nutzers, und er trifft mehr als gedacht.

In der Mini-Session steht in der Kopfzeile "Juniordummy 400 g in der Jacke"
und zwei Zeilen darunter unter MITNEHMEN "1 Dummy 500 g (optional)". Zwei
verschiedene Angaben in derselben Ansicht.

**Regeln:**
1. Die Packliste ist die Vereinigung des Equipments **der heutigen Stufen**
   aller drei Blöcke, nicht der Level.
2. Die Kopfzeile der Mini-Session nennt kein eigenes Equipment mehr. Sie sagt
   nur die Dauer. Was mitzunehmen ist, steht in der Packliste.
3. Braucht kein Block der Session ein Dummy, steht in der Packliste nur die
   Pfeife. Kein Default-Dummy.
4. Widersprechen sich Gewichte zwischen Blöcken, nennt die Packliste beide.
   Nicht zusammenfassen.

---

## 6. Weitere Fehler, gefunden beim Durchgehen

### "an 99 von 3 Tagen geschafft"
Der Zähler wird nicht gedeckelt. Bei einem geschafften Level soll dort
**"Geschafft"** stehen, nicht ein Bruch. Die Schaltflächen sagen bereits
"Bronze: geschafft", der sichtbare Text sagt "99/3". Beides angleichen auf
"Geschafft".

In der Trackübersicht dasselbe: statt "99/3" ein Häkchen oder "geschafft".

Die 99 stammt aus einem Teststand, das Deckeln ist trotzdem nötig: Auch "3 von
3" neben "Level geschafft" ist doppelt gemoppelt.

### Pausen in der Mini-Session
Zwischen den Blöcken steht "Pause · Verwechslungsgefahr", bei einer Session
von 10 Minuten mit Blöcken von 3, 6 und 1 Minute. Die Trennung ist für die
Vollsession gedacht.

**Nur in der Vollsession anzeigen.** In Kurzübung und Mini-Session entfällt
sie.

### Der Warm-up-Block widerspricht sich
Dort steht "Aufwärmen: 3 min Bewegung, kein strukturiertes Programm" und
direkt darunter eine Übung mit "5 Stopps auf den leisen Pip".

**Entweder oder.** Vorschlag: Der Aufwärmhinweis steht als eigene Zeile über
dem Block, nicht im Block, und der Block heißt nicht mehr "Warm-up", sondern
"Erster Teil". Das Aufwärmen ist das, was vor dem ersten Teil passiert, nicht
der erste Teil selbst.

### Vorsitzen steht im Durchgangstext von Rückruf
"5 Rückrufe auf 20 Meter, **jeder mit Vorsitzen**, Lob und anschließender
Freigabe."

Die Entscheidung, Vorsitzen optional zu machen, wurde nur in Track E
umgesetzt. In Track B steht es als Pflicht im Text. Ändern in:

> 5 Rückrufe auf 20 Meter, jeder mit Lob und anschließender Freigabe.

Und falls das optionale Vorsitzen-Kriterium im Profil aktiv ist, als Zusatz
anhängen.

### Markierstäbe bei der Nasenarbeit
Nasenarbeit Bronze listet "4 Markierstäbe". Bei einer Verlorensuche, in der
weder Hund noch Führer die Fallstellen kennen, haben Markierstäbe nichts zu
suchen. **Entfernen bei allen G-Leveln.**

Auch bei Marking Bronze sind vier Stäbe für eine Einzelmarkierung bis 30 Meter
zu viel. Die Regel "mindestens vier" gilt, wenn Stäbe als Sichthilfe genutzt
werden, nicht als Pflichtausrüstung jeder Markierübung. Bei F Bronze auf
**optional** setzen, bei F Silber und Gold bleiben sie Pflicht.

### Fehlende Voraussetzung in der Anzeige
"Richtung und Blind" zeigt "Braucht zuerst: Marking Silber, Nasenarbeit
Silber". Laut Spezifikation ist auch **Stopp-Pfiff Silber** Voraussetzung.
Prüfen, ob das Datenfeld unvollständig ist oder nur die Anzeige.

---

## 7. Reihenfolge der Arbeit

1. Abschnitt 1, die zwei Listen vereinen. Größter Effekt.
2. Abschnitt 2, Reihenfolge im Übungsdetail und der Hintergrund-Block.
3. Abschnitt 4 und 5, Equipment an die Stufe binden, Packliste daraus.
4. Abschnitt 3, Anzeigetexte.
5. Abschnitt 6, die Einzelfehler.

Build nach jedem Schritt. Nach Schritt 2 lohnt ein Screenshot des
Übungsdetails auf Handybreite, das ist der Test: Steht in den ersten zwei
Bildschirmhöhen alles, was man draußen braucht?

Es gilt weiter: keine erfundenen Inhalte. Wo ein Satz fehlt, der aus den
vorhandenen Daten nicht zu bilden ist, melde die Stelle.
