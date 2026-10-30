# Handover: Eddy's Dummy Challenge — Stand 2026-10-27

React 18 + Vite 5, Deploy über Netlify (`dist`). Umbau auf Trainingskonzept v2 läuft (6 Schritte).
Inhaltliche Basis: `docs/trainingskonzept-v2.md` + `src/data/training.js`. Design-Referenz: `docs/trophy-reference.html`.

## Umbau Schritt 1/6: Fundament (2026-10-11)
- Struktur: `src/App.jsx` (Shell, Splash, Onboarding, Nav), `src/components/` (ProfileForm, Settings, Icons),
  `src/lib/storage.js` (Key, Schema, Theme), `src/styles.css` (alle Farb-Tokens, Hell/Dunkel).
- Theme: Tokens nur in `styles.css`. Wahl Hell/Dunkel/System liegt in `settings.theme` im State.
  Inline-Script in `index.html` setzt `data-theme` vor dem ersten Paint (liest `edc-v3` direkt, Key dort mitpflegen).
- Schriften: Archivo + Public Sans über `@fontsource` lokal gebündelt (offline-fähig, im Precache).
- Logo-Set (aus einem Sammelbild ausgeschnitten): `public/logo.webp` (977×928, Splash), `logo-mark.webp`
  (rundes Icon, Onboarding-Kopf), `icon-192/512.png` (eckiges Icon, Manifest „any“), `icon-maskable-512.png`
  (rundes Icon auf 78 % auf Dunkelgrün, Android-Safe-Zone), `apple-touch-icon.png` (Ecken dunkel gefüllt, iOS rundet selbst),
  `favicon.png`. Quelle der Icons nur ~470 px → 512er leicht hochskaliert; bei Bedarf höher aufgelöste Einzeldateien nachliefern.
- Storage: neuer Key `edc-v3` mit `schemaVersion: 1`. `edc-v2` wird ignoriert, nicht migriert → Testdaten weg.
- Tabs Heute/Tracks/Trophäen/Basics sind Platzhalter.

## Umbau Schritt 2/6: Tracks-Tab (2026-10-11)
- `src/components/TracksTab.jsx` (Übersicht, Level-Badges), `LevelDetail.jsx` (Detailseite), Logik in `src/lib/progress.js`.
- Freischaltung: `requires` sperrt Tracks, Level innerhalb eines Tracks öffnen nacheinander. Bereits gezählter
  Fortschritt bleibt immer erreichbar, auch wenn eine Voraussetzung später zurückgesetzt wird.
- Storage: Level haben zusätzlich `dates` (ISO-Zeitstempel je Durchgang) für den Same-Day-Hinweis.
  Additiv, `normalize()` füllt fehlende `dates` mit `[]` → kein Schema-Bump nötig, Profil bleibt erhalten.
- Gelenkwarnungen: Zuordnung Level → Warnung in `JOINT_WARNING_LEVELS` (training.js), aktiv bei Gelenkbefund leicht/deutlich.

## Umbau Schritt 3/6: Heute-Tab (2026-10-18)
- `src/components/HeuteTab.jsx`, Logik als reine Funktionen in `src/lib/session.js` (buildPlan, restStatus, recordSession, loadLimits).
- Hauptteil = offenes Level aus freigeschalteten Tracks des Sessiontyps. Sortierung: angefangen (reps > 0) vor unberührt →
  Bronze vor Silber vor Gold → niedrigster Fortschritt → nicht der Track des letzten Hauptteils → Track-Reihenfolge.
  Warm-up/Abschluss = geschaffte Level, Sortierung: anderer Track als Hauptteil → Vorzugs-Tracks (`SESSION_ROLE_PREFS`) → leichtere Stufe.
  Hauptteil Gold → Warm-up/Abschluss nur Bronze. Tauschen = Offset in der sortierten Kandidatenliste.
- Belastung: `retrievesPerSession` begrenzt nur Level mit `counts: true` (training.js: A Silber/Gold, E–H). Fachlich ist
  ein Apport nur E–H; Stopp-Pfiff Silber/Gold zählt trotzdem in die Belastung. UI sagt daher „Belastung“ und „Durchgänge“.
  Seitenblöcke je 2 Durchgänge (bei Limit < 6 je 1). Hauptteil mit counts: Restlimit bis `mainReps`, mindestens 2.
  Hauptteil ohne counts: `drillReps` (3 voll, 2 kurz/mini). Bei knappem Limit werden Seitenblöcke ohne counts bevorzugt,
  notfalls weicht ein belastender Seitenblock dem Ersatz-Block. Limit = strengster Wert aus default, Alter, Gelenkbefund.
- Kein Level zweimal pro Session: belegte Level sind für die anderen Blöcke ausgeschlossen (auch beim Tauschen).
  Fehlt ein zweites geschafftes Level, kommt der Ersatz-Block.
- Bewertung: nur „gut“ auf dem Hauptteil zählt. Nichts verringert je einen Zähler.
- Ruhetag: nur Vollsessions zählen. Hinweis bei Vollsession heute, innerhalb `restDays` oder ≥ `sessionsPerWeek` in 7 Tagen.
- Frischer Start / kein Kandidat: Ersatz-Blöcke aus `SESSION_FALLBACKS` (zählen keine Wiederholungen, nicht tauschbar).
- Session-Eintrag: `{ id, date, type, blocks: [{ role, trackId, levelId, reps, counts, rating: gut|okay|nein }] }`.

## Zwischenschritt: Rücknehmen, Verlauf, Zurücksetzen (2026-10-18)
- `undoLastSession` (session.js): nimmt nur die jüngste Session zurück. Entfernt in allen Leveln genau den Zeitstempel,
  der dem Session-Datum entspricht (recordSession zählt mit demselben `now`), setzt `doneAt` zurück, wenn es dieses Datum war.
  Funktioniert damit auch für alte Einträge ohne `counted`. Ruhetag-Hinweis verschwindet automatisch.
- Rückgängig auf der Bestätigungskarte (ohne Rückfrage, stellt auch Sessiontyp und Tausch-Offsets wieder her) und am
  jüngsten Eintrag in „Letzte Sessions“ (mit Rückfrage). Ältere Einträge sind fix.
- Session-Eintrag zusätzlich: `load`, `limit`, `counted: [{ trackId, levelId, reps, of }]`.
- `SessionItem.jsx`: aufklappbarer Eintrag, fehlende Felder → „–“. `SessionsView.jsx`: „Alle Sessions“ (View `sessions`), nach Monat.
- Einstellungen → Gefahrenbereich: Sessions löschen / Fortschritt zurücksetzen (tracks, sessions, trophies) / App zurücksetzen
  (Key `edc-v3` entfernen, Onboarding). Jede Aktion mit Rückfrage, die konkret nennt, was gelöscht wird.

## Icons (Stand 2026-10-24: farbige WebP statt SVG)
- `public/icons/<name>.webp` (12 Stück, 96px, transparent), `TrackIcon.jsx`: `TrackIcon` (img) und `IconTile` (Kachel).
  Ein Icon-Satz für beide Themes, nur die Kachel wechselt: `--tile-icon` hell #F3EEE3, dunkel #C9C0AC (bleibt hell getönt,
  sonst verschwindet die dunkelbraune Kontur). Keine Gruppenfarben mehr (`--grp-*`, `TrackIcons.jsx` entfernt).
- Größen (feste Grundmaße aus der Typografie, keine Laufzeitmessung): Track-Karte und Detailkopf 52/37,
  Heute-Block 62/45, Equipment 24/18 mit eigener Kachel. Bricht Text um, bleibt unten Luft neben der Kachel (gewollt).
- Gesperrter Track: Kachel opacity .45 + grayscale(.7). Icons liegen im Precache (globPatterns enthält webp), offline getestet.
- `Gear.jsx`: `gearIcon()` + `GearList` (Schlüsselwörter pocket, dummy, pfeife, markierstab/markierstäb).
- Regeln: Icon nie ohne Text, keine Icons auf Level-Badges, Icons sind dekorativ (alt="", aria-hidden).
- Verlaufszeile: Bewertungspunkt + Klartext, einzeilig; passt sie nicht, entfällt der Abschluss (Messung in `SummaryLine`).
  Ganze Zeile ist der Schalter, jüngster Eintrag offen.
- Offen für den Trophäen-Schritt: `TROPHIES.desc` enthält noch „Gold in Track A erreicht“ (Buchstabe sichtbar).

## Bündel 2: Durchgang, Belastung, Equipment, Rotation (2026-10-24)
- Quelle: `docs/durchgaenge.md`. Je Level `run` (was ein Durchgang ist), `reps` = Tage, `load` = Belastungspunkte.
  `steps` = Aufbau über mehrere Wochen. Zähler zählt höchstens einmal pro Level und Tag (`countedToday`).
- `LOAD_LIMITS.*.loadPerSession` begrenzt die Summe der `load` der drei Blöcke. Sprengt der Hauptteil das Limit allein,
  wird er über `amount` proportional gekürzt („6 statt 10 Retrieves wegen Gelenkbefund“). Spanne (`amount.min`, F Bronze):
  innerhalb der Spanne kein „statt“, nur die Zahl. „Belastung: X von max. Y“ entfällt bei 0.
- Equipment je Level: `gear: [{ id, n, optional }]` + `dummyType` (null | standard | both). Anzeige/Packliste in `src/lib/gear.js`,
  Gewicht 250/500 g aus dem Profil. Packliste „Mitnehmen“ im Heute-Tab: Pflicht-Equipment, höchste Stückzahl, standard schlägt both.
  `EQUIPMENT_NOTES` + `WATER_MODULE.gearLabel` für den Basics-Tab (noch nicht gerendert).
- Rotation Hauptteil (`mainCandidates`): Track mit dem am längsten zurückliegenden Hauptteil zuerst, im Track angefangen vor
  unberührt, dann Bronze→Gold. Vollsession: ohne Apport-Track (`APPORT_TRACKS`) unter den letzten drei Vollsessions bekommt
  der älteste Apport-Track den Vorzug.
- Sessionplan in edc-v3: `plan = { date, type, offsets, picks }` (additiv, kein Schema-Bump). Von heute: unverändert, sonst neu
  (bei Ruhetag startet Kurzübung). Update-Sperre nur noch für den Bewertungsdialog.
- Hauptteil ohne offenes Level: „Session abschließen“ gesperrt, Hinweis auf Sessiontypen mit offenen Leveln.
- Mini-Session: zusätzlich zu `allowedTracks` nur Level mit `dummyType` null oder "both" (`allowedDummyTypes`).
  G Bronze ist "both". Packliste nutzt dieselbe 24px-Kachel wie der Fließtext.
- Kriterien sprechen von „Durchgängen“ nur noch im neuen Sinn (Tage). „in Folge“/„Fünf Mal“ (B, C Gold) beschreibt,
  was innerhalb eines Durchgangs passiert, und bleibt.

## Bündel 3: Trophäen (2026-10-25)
- `src/lib/trophies.js`: `syncTrophies` gleicht `trophies[]` (`{ id, at, manual? }`) bei jeder Zustandsänderung mit dem
  Zustand ab (App-Effekt). Erster Abgleich nach dem Laden still (rückwirkend), danach Overlay für neu Freigeschaltete,
  nacheinander (`TrophyUnlock`). Nicht mehr Erfülltes wird wieder gesperrt (Rückgängig, Sessions löschen).
- Wasserratte: Schalter „Heute am Wasser gearbeitet“ im Bewertungsdialog, nur Vollsession, speichert `water: true`.
- One-Cast Blind: einzige manuelle Trophäe, „Selbst eintragen“/„Zurücknehmen“ auf ihrer Karte (ohne Overlay).
- `Trophies.jsx`: Metallfarben bewusst hart codiert (nicht tokenisieren), Gradient-id per `useId`.
- Packliste: optionales Equipment mit „(optional)“, teils Pflicht/teils optional als „2 Markierstäbe (1 optional)“.
  Heute-Karten: Equipment-Zeile mit Kachel 20/15/6.
- Basics noch Platzhalter.

## Fundament-Umbau (2026-10-27, Spec: `docs/fundament-umbau.md`)
- Nur Daten in `src/data/training.js` (Abschnitte 1–13): DISTANCE_STEPS, TERRAIN_STEPS, CONDITIONS, LEARNING_PHASES,
  LEVEL_CHANGE_WARNING, Handzeichen Voran/Back, PRINCIPLES, SOURCES, je Level `exam`/`examClass`/`maxDistanceStep` und
  genau vier Schritte als `path` (F, G, H: `{ d, g }`) oder `conditionPath` (A–E: `{ condition, variant }`), je Track
  `examSubject`/`axis`, H setzt A/F/G Silber voraus. Neue Exporte WARMUP_COOLDOWN, SESSION_GUIDANCE, MIN_AGE_MONTHS,
  FAILURE_CAUSES, DISPLACEMENT_SIGNS, DUMMY_TYPES, DUMMY_FACTS – noch **ohne UI**. Einzige UI: `examNote` bei Track E.
- Schema 2: Levelfortschritt hat `step` (1–4). Migration v1→v2 in `storage.js` (`MIGRATIONS`): geschafft → 4, sonst 1.
  Vor jeder Migration und vor dem Verwerfen einer unbekannten Version: Rohstand unter `edc-v3-backup-v<alt>` (nie überschrieben).
  `countRep` und Rücknehmen lassen `step` stehen, `resetLevel` setzt 1. Weiterschalten von `step` ist noch nicht spezifiziert.
- Offene Widersprüche und Lücken: Bericht im Chat vom 2026-10-27 (u. a. Abschnitt 9 vs. 14, Phasen-Tabelle, Wasser-Track,
  Restinhalte F/D/H Gold, H Bronze/Silber).

## Fundament-Umbau Teil 2 (2026-10-27, Spec: `docs/fundament-umbau-2.md`)
- Schema 3: Migration v2→v3 – abgeschlossene Level (doneAt) bleiben abgeschlossen: Schritt 4, Zähler auf Sollwert.
  Sicherung unter `edc-v3-backup-v2`.
- Schritt-Zähler-Modell in `progress.js` (`rateLevel`): gut = Zähler +1 und Schritt +1, okay = nichts, noch nicht =
  Schritt -1. Abgeschlossen = Zähler voll **und** Schritt 4 (`isLevelDone`). Schritt geht nur mit dem Zähler weiter
  (einmal pro Tag); bei vollem Zähler hebt „gut“ nur noch den Schritt. Session speichert `steps` (from/to) für Rückgängig,
  dazu `cause`, `signs`, `downgraded`, `capped`.
- Belastung: `LOAD_LIMITS.default` = 5 ist nur Warnschwelle (`plan.over`, „Richtwert“). Alter/Gelenke bleiben Obergrenzen
  (`loadLimits().cap`), nur dann wird gekürzt.
- `src/lib/steps.js`: Schritttexte, Einstieg/Ziel, Geländebereich aus `path`, Prüfungsbezug, Phase, Mindestalter.
- `TERRAIN` entfernt, Gelände nur noch über `TERRAIN_STEPS` im Pfad. `dummyType "both"` heißt jetzt `"junior"`
  (Juniordummy 400 g). Welpendummy 200 g. Markierstäbe überall 4, Pflicht. Neue gear-ids ohne Icon: futterschuessel,
  schreckschuss. Neues Level-Feld `setup` (Gelände/Helfer, nicht in der Packliste). `run: null` bei den fünf neu
  geschriebenen Leveln (kein Text in der Spec).
- Anzeige: Schritt-Pfad, Prüfungsbezug, Lernphase, Alter, Suchen-Regeln (G) im Übungsdetail; Einstieg/Ziel im Hauptteil,
  Blocktrennung, Aufwärm-/Cool-Down-Hinweis, Vorbereitungs-Checkliste (nur Vollsession), Fehlerursachen und
  Übersprungszeichen in der Bewertung, Pausenvorschlag und Levelwechsel-Warnung im Ergebnis.
- `GLOSSARY` angelegt (nur Blinken), noch nicht gerendert.

## Fundament-Umbau Teil 3 (2026-10-27, Spec: `docs/fundament-umbau-3.md`)
- Migration v2→v3 (vor dem Rollout geändert): Schritt = doneAt ? 4 : min(4, Zähler + 1); unlesbarer Zähler → 1.
- `run` für H Bronze/Silber/Gold, F Gold, D Gold und G; G-Kriterien neu; Belastung F Gold 2, D Gold 1, H 1/2/1.
- gear: `orMore` („10 oder mehr Dummys“, Track G), `steps` (nur auf diesen Schritten einpacken, braucht `block.step`,
  nur am Hauptteil gesetzt). Neue ids welpendummy, juniordummy, suchdummy (feste Gewichte, unabhängig vom Profil).
- Gelenkwarnung F Gold `doubleMarkF`, Track-F-Kurztext neu, `minAgeSuffix` „nach dem Zahnwechsel“ bei E und F,
  Apportier-Hinweis nur bei `MIN_AGE_NOTE_LEVELS` (E Bronze, F Bronze). Glossar bleibt bei einem Eintrag, nicht anzeigen.

## Fundament-Umbau Teil 4 (2026-10-27, Spec: `docs/fundament-umbau-4.md`)
- Begriffe in der Anzeige: Pfad (`step`, `path`, `conditionPath`) heißt „Stufe“, Ablauf (`steps`) heißt „Schritt“.
  Feldnamen unverändert. Abschnitt im Übungsdetail: „Stufen“.
- Track G: `steps` aller drei Level ersetzt, Nasen-Tipp an allen drei, `dummyType` überall "standard" → G nicht mehr in
  der Mini-Session (12 Level bleiben dort: A–C, D/E Bronze und Silber).
- „nach dem Zahnwechsel“ nur noch bei F. Farbtext mit „Rot erscheint ihm als sattes Gelb“.
- Damit ist der Fundament-Umbau an den Daten abgeschlossen. Offen: Glossar, Basics-Tab, Einwirkung, Rechtskapitel
  (erst Inhalt). `GLOSSARY` bleibt bei einem Eintrag.

## Fundament-Umbau Teil 5 (2026-10-27, Spec: `docs/fundament-umbau-5.md`)
- Neues Level-Feld `stepsType` ("varianten" | "ablauf"), Überschrift und Einleitung aus `STEPS_TYPES`.
  "ablauf": alle G- und H-Level, F Gold, D Gold.
- G Bronze legt zehn oder mehr Dummys aus. G-Kriterien „Auf der letzten Stufe“. Alte G-Tipps und Nasen-Tipp entfernt
  (Nasen-Text steht nur noch in den Suchen-Regeln). Mini-Session-Hinweis im Hauptteil neu (nur Daten, `hint` wird nicht gerendert).

## Basics-Tab und Glossar (2026-10-27, Spec: `docs/basics-umsetzung.md`, Inhalt: `docs/basics-tab.md`, `docs/glossar-v5.md`)
- `src/data/glossar.js` (64 Einträge, `GLOSSAR_GROUPS`, `GLOSSAR_SOURCES`) ersetzt `GLOSSARY` aus training.js.
  Ohne Evidenzstufen. `long` = Blöcke wie in basics.js, `**fett**` erlaubt.
- `src/data/basics.js`: 12 Abschnitte als Blöcke (text, lead, list, check, table, quote, note). Klassentabelle aus
  `DISTANCE_STEPS`, Aufwärm-Tabelle aus `WARMUP_COOLDOWN`, Farbtext aus `DUMMY_FACTS.farben`.
- `BasicsTab.jsx`: Accordion (details), Glossar-Abschnitt gruppiert. `Glossar.jsx`: `RichText` (fett, Umbruch,
  antippbare Begriffe), Sprechblase mit Sprung ins Glossar über `GlossarContext` (App: `glossarFocus`).
  `src/lib/glossar.js`: Begriffserkennung, ganzes Wort, Groß-/Kleinschreibung, je Begriff erstes Vorkommen pro Block.
  Markiert in Übungsdetail (Kriterium, Kartentext, Schritte, Tipps) und Heute-Karten (Kartentext).
- Profil (2026-10-27, `docs/profil-und-aufraeumen.md`): `dog.experience` ("keine" | "etwas" | "viel"), Pflichtfeld im
  Formular; wirkt nur im Basics-Tab. `dog.signals` (11 Schlüssel, `SIGNAL_FIELDS`/`SIGNAL_DEFAULTS`), „Meine Signale“ nur in
  den Einstellungen; normalize füllt fehlende Werte mit der Vorbelegung. Beides additiv, kein Schema-Bump.
- Farbtext nur noch aus `DUMMY_FACTS` (`farben`, `farbenSehpigment`). `SOURCES` aus training.js gelöscht, Quellen nur
  noch `GLOSSAR_SOURCES`.

## Regelwerk- und DP-E-Korrektur (2026-10-28, `docs/regelwerk-korrektur.md`, `docs/dp-e-korrektur.md`)
- Fundstellen der Ordnungen: `docs/regelwerke.md` (Verweisdatei, nicht ändern).
- Glossar: Klassen heißen Anfänger-, Fortgeschrittenen-, Offene Klasse mit Kurzform Dummy A/F/O; Distanzen als Soll-Werte;
  Offene Klasse 150 m über FCI; Nullwertung elf Fälle plus §23(4); DP-E mit den fünf echten Fächern; Doppelmarkierung
  mit DP-E-Form. Quellen: Regelwerke nach dp-e-korrektur.md §5, Siegl zurück in den Fachquellen. `HAND_SIGNAL_NOTE` gelöscht.
- Bronze-Zuordnung: A → Dummy A, Appell; B/C → DP-E, Unterordnung; D → DP-E, Doppelmarkierung und verspätetes Schicken
  (`exam` als Liste); F → DP-E, Markierapport; G → Dummy A, Verlorensuche (G Silber/Gold ebenfalls „Verlorensuche“,
  `examSubject` je Track entfernt, restposten.md). Neue Varianten: F Bronze Doppelmarkierung DP-E
  und Halbblind, D Bronze verspätetes Schicken. `DPE_AGE_NOTE` im Übungsdetail bei DP-E-Leveln, `DPE_SHOT_NOTE` im Basics-Tab.

## App-Befund (2026-10-28, `docs/app-befund.md`)
- `stepsAsStufen: true` an A Bronze, A Gold, B Bronze/Silber/Gold, D Silber, E Bronze: die vier `steps` sind die Stufen,
  `conditionPath` wird dort nicht angezeigt, kein Block „Aufbau“. Die übrigen acht A–E-Level haben nicht genau vier steps
  und zeigen weiter conditionPath (nur die Variante, ohne Bedingungsnamen) plus steps.
- Übungsdetail: Heute (Stufe, Durchgang, Equipment der Stufe), Geschafft wenn, Stufen, Tipps, Achtung, Fortschritt,
  „Hintergrund“ zugeklappt (Prüfungsbezug, Lernphase, Alter, Levelwechsel).
- gear-Einträge mit `steps` gelten nur auf diesen Stufen (`gearForStep`); Packliste, Heute-Karten, Trackübersicht nach
  heutiger Stufe (`block.step` an allen Level-Blöcken). Mini-Session ohne Equipment-Text in der Kopfzeile.
- Warm-up-Block heißt „Erster Teil“, Aufwärmhinweis steht darüber. Pausen-Trenner nur in der Vollsession.
  Zähler gedeckelt, geschaffte Level zeigen „Geschafft“. G ohne Markierstäbe, F Bronze Markierstäbe optional.

## Stufentexte (2026-10-28, `docs/stufen-texte.md`)
- `stepsAsStufen` wieder entfernt. Alle 15 A–E-Level haben vier Stufen aus `conditionPath` (60 Sätze, Bedingung nur noch
  interne Kategorie). Bei A–E (`axis: "bedingungen"`) steht „Aufbau über mehrere Wochen“ im Hintergrund-Block,
  bei F–H bleibt „Ablauf eines Durchgangs“ sichtbar.
- Equipment an den Stufentexten (A Silber Dummy wieder optional auf allen Stufen, texte-nachbessern.md): C Silber Dummys Stufe 1 (2) und 4 (1), C Gold Dummy Stufe 2,
  D Gold Schreckschuss Stufe 3. A Bronze Dummy wieder optional, D Silber Markierstäbe wieder ohne Stufe.
- Blockminuten = Übungszeit; Aufwärmen/Cool Down eigene Zeilen über/unter den Blöcken (`WARMUP_COOLDOWN.warmupMin`,
  `cooldownMin`), Gesamtdauer aus `sessionDuration()`: Voll 50, Kurz 15-17, Mini 11 Min. Kurzübung ohne Equipment-Text.

## Praxistauglichkeit (2026-10-30, `docs/praxistauglichkeit.md`)
- Grundsatz: App muss ohne jagdliche Ausrüstung und ohne Genehmigung vollständig nutzbar sein (Liste in der Spec, Abschnitt 1).
  Level-Feld `examHint`: Prüfungsbezug im Hintergrund-Block. „Helfer“ heißt „eine zweite Person“.
- `conditionPath[i].lightOnly`: Stufe entfällt, wenn das Profil kein leichtes Dummy vorsieht (`firstStep`, `effectiveStep` in
  progress.js). Gespeichert wird weiter die echte Stufe, die Anzeige zählt ab der ersten passenden. Gilt nur E Bronze, Stufe 1.
- `sessionChecklist(blocks)`: Vorbereitungsliste nach heutigen Blöcken. Belastung nur noch in der Kopfzeile.
  Kurzübung: Blöcke 1 und 3 ohne Zeitangabe (`hideMinutes`). Splash ohne Untertitel „British Field Trial Method“.

## Praxis-Nachtrag (2026-10-30, `docs/praxis-nachtrag.md`)
- Regel getrennt: Ausrüstung muss ohne Erlaubnis käuflich oder herstellbar sein; Gelände darf eine Absprache voraussetzen.
  Basics „Recht und Rahmen“ hat „Wo du legal trainierst“, Level ab `maxDistanceStep` 3 verweisen darauf (keine Sperre).
- Session-Builder unverändert. Vorauswahl Kurzübung unter drei geschafften Leveln, Hinweis unter dem Ersatzblock.
- Texte nennen die Funktion („Stopp-Pfiff“), `track.signal` (A, B) zeigt das eigene Signal im Heute-Block (`signalLine`).
- Stufenblock: gebundenes Equipment einmal („Ab Stufe 2“, `gearNotesAtStep`). E Silber 5 Retrieves, D Bronze Stufen mit Wartezeit.

## Kriterien und Stufen (2026-10-30, `docs/kriterien-und-stufen.md`)
- Regel: Das Kriterium beschreibt Stufe 4 plus Zählregel. Zahlen aus dem Kriterium stehen auch in einer Stufe.
- `level.signals` (Liste) statt `track.signal`, im Heute-Block je eine Zeile (`signalLines`, `SIGNAL_FIELDS[].term`).
  Neue Profilzeile `release_dummy` („Dummy abgeben“, „Aus“); normalize füllt sie bei bestehenden Profilen.
- `setup`-Einträge: Text oder `{ text, steps }`, Vorbereitungsliste nach heutiger Stufe (`setupForStep`).
- `WHISTLES` und `COMMANDS` gelöscht (ungenutzt). `withSecondSide` ergänzt in Aufbautexten die zweite Seite aus dem Profil.

## Letzter Deploy
- **pwa-offline** (2026-10-04): PWA-Setup mit `vite-plugin-pwa` (v2.0.0, Workbox `generateSW`, `registerType: 'autoUpdate'`).
  - Manifest wird jetzt in `vite.config.js` definiert → Output `/manifest.webmanifest`, Link wird automatisch injiziert. `manifest.json` gelöscht.
  - Icons nach `public/` verschoben (vorher im Root → wurden **nicht** nach `dist` kopiert, Manifest-Icons waren live 404).
  - `netlify.toml`: `no-cache` für `/sw.js` + `/registerSW.js`, korrekter Content-Type fürs Manifest.
  - `.gitignore` neu angelegt (node_modules, dist, dev-dist).
- Enthaltene Bumps: Storage keine (`edc-v2` bleibt). SW-Cache versioniert sich selbst über Asset-Hashes.
- Smoke-Test lokal (`vite preview`): SW aktiv, Seite kontrolliert, Precache 9 Einträge; App lädt nach Server-Stop offline. Live auf Netlify noch nicht verifiziert.

## Offene Punkte (priorisiert)
1. Live-Check nach Deploy: DevTools → Application → Manifest (Icons, Installierbarkeit) und Service Worker; Offline-Haken + Reload. Danach Lighthouse auf der Live-URL.
2. ~~Maskable Icon~~ erledigt: eigenes `icon-maskable-512.png` mit Safe-Zone. Auf dem Gerät prüfen (Test: maskable.app).
3. ~~Logo als Base64~~ erledigt in Umbau Schritt 1.
4. Daten liegen nur in localStorage. iOS kann den Storage nach 7 Tagen ohne Nutzung löschen, wenn die App nicht installiert ist → Export/Backup oder Sync erwägen.

## Architektur-Entscheidungen dieser Session
- **vite-plugin-pwa statt handgeschriebenem `sw.js`**: Precache-Manifest mit Hashes wird automatisch erzeugt, es gibt kein manuelles Bumpen der Cache-Version und damit kein „alte Version hängt"-Problem.
- **`autoUpdate`** statt Update-Banner: Solo-App ohne kritischen In-Flight-State, ein neuer SW darf sofort übernehmen.
- **Update-Mechanismus (2026-10-24):** vite-plugin-pwa 2.0 setzt bei `autoUpdate` weder `skipWaiting` noch `clientsClaim`;
  neue Versionen warteten deshalb, bis alle App-Instanzen geschlossen waren (installierte PWA: tagelang alt).
  Jetzt: `registerType: 'prompt'`, `injectRegister: false`, Registrierung in `src/main.jsx` (`virtual:pwa-register`).
  `registration.update()` bei `visibilitychange` (max. alle 60 s). Die App gibt eine wartende Version per SKIP_WAITING
  nur frei, wenn `updateGate` nichts zurückhält: „rating“ (Bewertungsdialog offen). Die frühere Sperre „plan“ ist seit
  Bündel 2 weg, weil der Sessionplan in edc-v3 liegt. Sonst beim nächsten
  Vordergrund-Check oder App-Start. Auch ein vom Browser selbst aktivierter SW lädt nicht neu, solange gehalten wird
  (`onNeedReload`).
  Alle Fälle end-to-end mit Testversionen geprüft.

## Arbeitsregel: vier Textebenen (docs/vier-ebenen.md)
Ein Level hat vier Textebenen: Kriterium (`criteria`), Kartentext (`run`), Stufen (`conditionPath`/`path`), Aufbau (`steps`). Jede Änderung an einer verlangt eine Prüfung der anderen drei, auch wenn die Spec sie nicht nennt; Abweichungen werden gemeldet. Das Kriterium nennt die schwierigste Situation und die Zählregel. Es darf weitere Stufen nennen, aber keine Situation, die in keiner Stufe vorkommt. Der Kartentext sagt, was in einem Durchgang zu tun ist, und legt die Situation nicht fest.

## Nicht anfassen / Gotchas
- Kein `public/manifest.json` und kein manueller `<link rel="manifest">` in `index.html` wieder einführen. Das Plugin erzeugt beides, ein zweites Manifest würde kollidieren.
- Manifest-Änderungen (Name, Farben, Icons) nur in `vite.config.js`.
- `babel.config.json` wird von `@vitejs/plugin-react` nicht gelesen (Altlast, wirkungslos). Erst entfernen, wenn klar ist, dass kein anderes Tool sie braucht.
- `SCHEMA_VERSION` in `src/lib/storage.js`: bei jeder Änderung am State-Shape (`freshState()`) bumpen **und** eine Migration in `MIGRATIONS` ergänzen. Seit Schema 2 kein Wipe mehr.
- Der SW ist nur im Build aktiv (`npm run build && npx vite preview`), nicht in `npm run dev`.
