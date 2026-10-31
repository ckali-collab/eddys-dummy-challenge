# Export und Import

Die Spezifikation stand bisher nur auf der Notion-Projektseite als "Relaunch,
Epic 1" und wurde nie umgesetzt. Sie gehört ins Repo und vor die restliche
Textarbeit: Ein Glossareintrag mehr oder weniger kostet nichts, ein verlorenes
Trainingstagebuch ist nicht wiederherstellbar.

---

## 1. Die fünf Regeln

Sie stammen aus einem Fehler in einem Schwesterprojekt, bei dem ein
partieller Import Daten zerstört hat. Keine davon ist verhandelbar.

1. **Versioniertes Schema.** Der Export trägt `schemaVersion`. Der Import
   prüft die Version, **bevor** er etwas schreibt.
2. **Atomarer Voll-Replace.** Der Import ersetzt den kompletten State in einem
   Rutsch. Niemals einzelne Keys partiell überschreiben, genau das war der
   Fehler damals.
3. **Auto-Backup vor dem Import.** Vor jedem Import den aktuellen Stand
   automatisch sichern, unter `edc-v3-prev`, damit ein fehlerhafter Import
   rückholbar ist.
4. **Roundtrip-Test vor jedem Deploy.** Export, Import, State identisch.
5. **Storage-Key-Liste pflegen.** Die aktuelle Liste aller Keys ist die
   einzige Wahrheitsquelle für Wipe- und Migrationsentscheidungen.

---

## 2. Was der Export enthält

Den kompletten `edc-v3`-State, also:

```
schemaVersion, dog (inklusive signals), tracks, sessions, trophies,
plan, settings
```

**Dateiname:** `eddy-2026-10-31.json`, also Hundename aus dem Profil, klein
geschrieben, Umlaute ersetzt, plus Datum. Ohne Hundenamen: `edc-2026-10-31.json`.

**Die Migrations-Sicherungen** `edc-v3-backup-v1` und `-v2` kommen **nicht**
in den Export. Sie sind Zwischenstände, keine Daten.

---

## 3. Der Import

**Ablauf:**
1. Datei wählen, Inhalt lesen, als JSON parsen. Schlägt das fehl: Fehlermeldung,
   nichts geschrieben.
2. `schemaVersion` prüfen.
   - Gleich der aktuellen: direkt übernehmen.
   - Niedriger: durch dieselben Migrationen laufen lassen, die auch beim
     Laden greifen.
   - Höher als die aktuelle: **ablehnen** mit dem Hinweis, dass die Datei aus
     einer neueren Version stammt und die App zuerst aktualisiert werden muss.
3. Aktuellen Stand nach `edc-v3-prev` sichern.
4. State in einem Schreibvorgang ersetzen.
5. App neu laden.

**Vor Schritt 3 eine Bestätigung**, die sagt, was verloren geht:

> Import ersetzt deinen gesamten Fortschritt. Aktuell gespeichert sind 14
> Sessions und 3 Trophäen, in der Datei sind es 22 und 5. Der aktuelle Stand
> wird vorher gesichert und lässt sich einmal zurückholen.

Die Zahlen kommen aus beiden Ständen. Wenn eine Zahl nicht zu ermitteln ist,
nenne sie nicht, statt zu schätzen.

**"Letzten Import rückgängig machen"** steht danach in den Einstellungen,
solange `edc-v3-prev` existiert.

---

## 4. Die Export-Erinnerung

Ohne Erinnerung wird nicht exportiert, und dann nützt die Funktion nichts.

**Nach jeder zehnten abgeschlossenen Session** ein Hinweis im Heute-Tab, über
der Sessionplanung:

> Seit deinem letzten Export sind 10 Sessions dazugekommen. Eine Sicherung
> dauert zehn Sekunden.

Mit einem Knopf, der direkt exportiert, und einem, der den Hinweis für zehn
weitere Sessions wegklickt. Der Zeitpunkt des letzten Exports wird im State
gespeichert, also braucht `settings` ein Feld `lastExportAt`.

Wurde noch nie exportiert, erscheint der Hinweis das erste Mal nach fünf
Sessions.

---

## 5. Wo es steht

In den Einstellungen, **über** dem Zurücksetzen-Block, als eigener Abschnitt
"Sicherung":

```
Sicherung

[Fortschritt exportieren]
Lädt eine Datei mit deinem gesamten Fortschritt herunter.
Letzter Export: 31.10.2026

[Datei importieren]
Ersetzt deinen Fortschritt durch den Inhalt der Datei.

[Letzten Import rückgängig machen]        (nur wenn vorhanden)
```

Der Abstand zum Zurücksetzen-Block muss deutlich sein. Die beiden Bereiche
dürfen nicht verwechselbar aussehen.

---

## 6. Was bewusst nicht dazugehört

**Kein Auto-Sync, keine Cloud.** Das war von Anfang an zurückgestellt und
bleibt es. Die bekannte Einschränkung: Manueller Export schützt nur so weit
wie die Export-Disziplin. Verlust zwischen zwei Exporten ist Verlust seit dem
letzten Export.

**Kein Teil-Import.** Weder "nur Sessions" noch "nur Profil". Jede Teilmenge
ist eine neue Fehlerquelle für dasselbe Problem, das Regel 2 verhindert.

---

## 7. Vor dem Deploy

Der Roundtrip-Test aus Regel 4 ist Pflicht und gehört in die Node-Tests:
Export erzeugen, importieren, State gegen den Ausgangszustand vergleichen,
Gleichheit prüfen. Dazu ein Test für den Import einer älteren
`schemaVersion` und einer neueren.

Melde die Storage-Key-Liste im Bericht, damit sie dokumentiert ist.
