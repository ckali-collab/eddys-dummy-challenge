/**
 * Glossar - aus docs/glossar-v5.md (Fassung 5, Stand 27.10.2026), Topf 1 und Topf 2.
 * Evidenzstufen bewusst nicht übernommen (nur für die Prüfung). Zitate mit Seitenangabe bleiben.
 *
 * term:    Überschrift wie im Glossar
 * aliases: Wörter, die im Übungstext antippbar werden (leer → term)
 * short:   Sprechblase (ein Satz aus dem Eintrag)
 * long:    Blöcke für den Glossar-Abschnitt, gleiche Blocktypen wie basics.js. **fett** ist erlaubt.
 * signal:  Topf 2, Schlüssel für das Wort aus dem Profil ({signal.x}); fallback, solange es fehlt
 */

import { DUMMY_FACTS } from "./training.js";

const t = (content) => ({ type: "text", content });
const ol = (...items) => ({ type: "list", ordered: true, items });
const ul = (...items) => ({ type: "list", ordered: false, items });

export const GLOSSAR_GROUPS = [
  { id: "klassen",          label: "Prüfungsklassen", intro: "Das Gerüst, auf das alles hinarbeitet." },
  { id: "pruefungsfaecher", label: "Prüfungsfächer" },
  { id: "markieren",        label: "Markieren und Apportieren" },
  { id: "suchen",           label: "Die beiden Suchen", intro: "Das Buch trennt sie scharf, und die Trennung erklärt, warum zwei verschiedene Signale nötig sind." },
  { id: "fehler",           label: "Fehler", intro: "Die Ordnungen unterscheiden zwei Schweregrade. Das ist nützlich, weil es sortiert, was wirklich schlimm ist." },
  { id: "position",         label: "Position und Fußarbeit" },
  { id: "steadiness",       label: "Steadiness" },
  { id: "ausruestung",      label: "Ausrüstung" },
  { id: "sinne",            label: "Der Hund als Sinneswesen", intro: "Diese Zahlen begründen mehrere Trainingsregeln und gehören deshalb ins Glossar, nicht nur in den Basics-Tab." },
  { id: "lernen",           label: "Lernen und Methodik" },
  { id: "signale",          label: "Signale", intro: "Erklärt als Funktion und Handzeichen. Das Wort oder Pfiffmuster kommt aus deinem Profil." },
];

export const GLOSSAR = [
  // ─── Prüfungsklassen ──────────────────────────────────────────
  {
    id: "dp-e", term: "DP-E, Dummy-Einsteigerprüfung", group: "klassen",
    aliases: ["DP-E", "Dummy-Einsteigerprüfung"],
    // Text aus docs/restposten.md, Abschnitt 2; short: zwei Sätze daraus
    short: "Apportdistanzen sollen 30 Meter nicht überschreiten, angepasst an Gelände und Witterung. Die DP-E enthält keine Verlorensuche, kein Einweisen und keine Wasserarbeit.",
    long: [
      t("Einsteigerprüfung des Golden Retriever Club e.V., in zwei Varianten: mit Schuss (m. S.) und ohne (o. S.). Nicht Teil der DRC-Ordnung. Der Hund muss am Prüfungstag mindestens 12 Monate alt sein."),
      t("Apportdistanzen sollen 30 Meter nicht überschreiten, angepasst an Gelände und Witterung."),
      t("Fünf Fächer zu je 20 Punkten: Unterordnung, Doppelmarkierung, Apportieren mit verspätetem Schicken, Apportieren von zwei Dummys, Markierapport. Bestanden ab 50 Punkten, wenn kein Fach mit null Punkten bewertet wurde."),
      t("Die DP-E enthält keine Verlorensuche, kein Einweisen und keine Wasserarbeit. Dafür eine Doppelmarkierung, in einer leichteren Form als die Fortgeschrittenen-Klasse: Der Führer holt den zuerst geworfenen Dummy selbst, der Hund nur den zuletzt geworfenen."),
    ],
  },
  {
    id: "dummy-a", term: "Anfänger-Klasse", group: "klassen",
    aliases: ["Anfänger-Klasse", "Anfängerklasse", "Dummy A"],
    short: "Verbreitete Kurzform: Dummy A. Apporte sollen 50 Meter nicht überschreiten. Kein Einweisen.",
    long: [t("Verbreitete Kurzform: Dummy A. Apporte sollen 50 Meter nicht überschreiten, angepasst an Gelände und Witterung. Vier Fächer: Einzelmarkierung Land, Einzelmarkierung Wasser, Verlorensuche, Appell und Memory. **Kein Einweisen.**")],
  },
  {
    id: "dummy-f", term: "Fortgeschrittenen-Klasse", group: "klassen",
    aliases: ["Fortgeschrittenen-Klasse", "Fortgeschrittenenklasse", "Dummy F"],
    short: "Verbreitete Kurzform: Dummy F. Apporte sollen 80 Meter nicht überschreiten.",
    long: [t("Verbreitete Kurzform: Dummy F. Apporte sollen 80 Meter nicht überschreiten, angepasst an Gelände und Witterung. Vier Fächer: Doppelmarkierung, Verlorensuche mit acht Dummys, Einweisen, Standruhe in Verbindung mit Markieren.")],
  },
  {
    id: "dummy-o", term: "Offene Klasse", group: "klassen",
    aliases: ["Offene Klasse", "Dummy O"],
    short: "Verbreitete Kurzform: Dummy O. Über das FCI-Reglement soll ein Apport 150 Meter nicht überschreiten.",
    long: [
      t("Offene Klasse, verbreitete Kurzform Dummy O. Die Ordnung nennt keine eigene Zahl und passt die Distanzen dem Gelände an. Über das FCI-Reglement gilt, dass ein Apport 150 Meter nicht überschreiten soll."),
      t("Doppelmarkierung, Standtreiben mit mindestens zehn Dummys, Einweisen in ein Suchengelände, Walk-Up."),
    ],
  },
  {
    id: "working-test", term: "Working Test", group: "klassen",
    aliases: ["Working Test", "Field Trial"],
    short: "Die britische Entsprechung, im Kennel Club als Gundog Working Test geführt.",
    long: [t("Die britische Entsprechung, im Kennel Club als Gundog Working Test geführt. Simuliert einen Jagdtag, ohne dass auf Wild geschossen wird, und arbeitet ausschließlich mit Dummys. Nicht zu verwechseln mit dem **Field Trial**, der mit lebendem Wild und Schuss läuft. Die Dummyarbeit gehört zum Working Test, nicht zum Field Trial.")],
  },

  // ─── Prüfungsfächer ───────────────────────────────────────────
  {
    id: "appell", term: "Appell", group: "pruefungsfaecher", aliases: [],
    short: "Eigenes Prüfungsfach, nicht nur allgemeiner Gehorsam.",
    long: [t("Eigenes Prüfungsfach, nicht nur allgemeiner Gehorsam. Umfasst Position, Rückruf, Stopp und Standruhe. In Dummy A zusammen mit Memory geprüft.")],
  },
  {
    id: "einzelmarkierung", term: "Einzelmarkierung Land, Einzelmarkierung Wasser", group: "pruefungsfaecher",
    aliases: ["Einzelmarkierung Land", "Einzelmarkierung Wasser", "Einzelmarkierung"],
    short: "Die offiziellen Bezeichnungen für einen sichtbar geworfenen Einzelapport an Land beziehungsweise ins Wasser.",
    long: [t("Die offiziellen Bezeichnungen für einen sichtbar geworfenen Einzelapport an Land beziehungsweise ins Wasser. Je ein Dummy. Beim Wasser ein tiefes Gewässer, alternativ über einen schmalen Fluss oder Kanal.")],
  },
  {
    id: "doppelmarkierung", term: "Doppelmarkierung", group: "pruefungsfaecher", aliases: [],
    short: "Zwei sichtbar geworfene Dummys. Der Führer gibt die Reihenfolge vor, der Hund soll sie befolgen.",
    long: [
      t("Zwei sichtbar geworfene Dummys. Der Führer gibt die Reihenfolge vor, der Hund soll sie befolgen. In Dummy F muss mindestens ein Dummy ins Wasser oder über ein Gewässer."),
      t("Schon in der DP-E, dort in einer eigenen, leichteren Form:"),
      { type: "table", head: ["Form", "Winkel", "Wer holt was"], rows: [
        ["DP-E", "mindestens 90 Grad", "Führer holt den ersten, Hund den zuletzt geworfenen"],
        ["Dummy F", "enger als 90 Grad ist schwer", "Hund holt beide, Reihenfolge wird vorgegeben"],
      ] },
      t("Im Training die Reihenfolge wechseln, sonst merkt sich der Hund die Reihenfolge statt die Fallstellen. Der Winkel zwischen den beiden Würfen ist die eigentliche Schwierigkeit: enger als 90 Grad ist schwer, weit auseinander leicht."),
    ],
  },
  {
    id: "walk-up", term: "Standruhe in Verbindung mit Markieren, Walk Up", group: "pruefungsfaecher",
    aliases: ["Walk Up", "Walk-Up", "Walk-up"],
    short: "Mehrere Gespanne gehen in einer Linie langsam über das Gelände, je Hund fliegt ein Dummy.",
    long: [
      t("Mehrere Gespanne gehen in einer Linie langsam über das Gelände, je Hund fliegt ein Dummy. Der eigene Hund bleibt bei Fuß, auch während ein anderes Gespann arbeitet. Simuliert eine Streifjagd."),
      t("Walk-up ohne Leine erst ab etwa zwölf Monaten."),
    ],
  },
  {
    id: "standtreiben", term: "Standtreiben", group: "pruefungsfaecher", aliases: [],
    short: "O-Aufgabe. Mindestens zehn Dummys, der Hund bleibt ruhig an seinem Platz.",
    long: [t("O-Aufgabe. Mindestens zehn Dummys, der Hund bleibt ruhig an seinem Platz, während mehrere Dummys fallen, und arbeitet anschließend auf Anweisung.")],
  },
  {
    id: "einweisen", term: "Einweisen", group: "pruefungsfaecher", aliases: [],
    short: "Der Führer kennt die Lage des Dummys, der Hund nicht.",
    long: [
      t("Der Führer kennt die Lage des Dummys, der Hund nicht. Der Führer lenkt ihn mit Pfeife und Handzeichen dorthin. **Kommt erst in Dummy F vor.**"),
      t("Reihenfolge immer: erst Stopp-Signal, dann Richtungszeichen. Ohne Stopp sieht der Hund das Zeichen nicht und rät."),
      t("Und der Satz, der die ganze Distanzlogik umdreht: **\"Nicht die Entfernung macht das Einweisen schwer, sondern vielmehr alle anderen Einflussfaktoren.\"** S. 228."),
    ],
  },
  {
    id: "einweisen-suchengelaende", term: "Einweisen in ein Suchengelände", group: "pruefungsfaecher", aliases: [],
    short: "O-Aufgabe. Der Hund wird nicht auf ein Dummy, sondern in ein Gebiet eingewiesen und sucht dort selbstständig.",
    long: [t("O-Aufgabe. Der Hund wird nicht auf ein Dummy, sondern in ein Gebiet eingewiesen und sucht dort selbstständig.")],
  },

  // ─── Markieren und Apportieren ────────────────────────────────
  {
    id: "apportieren", term: "Apportieren", group: "markieren", aliases: [],
    short: "Der Hund trägt dem Führer die Beute zu.",
    long: [t("Der Hund trägt dem Führer die Beute zu. Vom lateinischen apporto, herbeitragen. Gezieltes Apportiertraining beginnt **nach dem Zahnwechsel, mit etwa neun bis zehn Monaten.**")],
  },
  {
    id: "markieren", term: "Markieren", group: "markieren", aliases: [],
    short: "Das Beobachten der Flugbahn eines oder mehrerer sichtbar geworfener Dummys und das Merken der Fallstelle.",
    long: [
      t("Das Beobachten der Flugbahn eines oder mehrerer sichtbar geworfener Dummys und das Merken der Fallstelle. Entscheidend ist die Flugbahn, nicht das Sehen des liegenden Dummys. Deshalb ist hohes Gras kein Hindernis, sondern Teil der Aufgabe: Der Hund rechnet aus, wo es gelandet sein muss."),
      t("**Nicht die Distanz macht die Schwierigkeit.** S. 203: \"Nicht immer macht eine weite Distanz die Schwierigkeit aus. Eine Markierung in ganz kurzer Distanz, über ein schwieriges Gelände hinweg, kann Open-Klassenniveau haben.\" Markierungen beginnen mit acht bis zehn Monaten, und nur wenn der Hund steady ist."),
    ],
  },
  {
    id: "blind", term: "Blind", group: "markieren", aliases: ["Blind", "Halbblind"],
    short: "Ein Dummy, das ausgelegt wurde, ohne dass der Hund zuschaut.",
    long: [
      t("Ein Dummy, das ausgelegt wurde, ohne dass der Hund zuschaut. Auch wenn der Hund eine Ahnung hat, wo es liegen könnte, bleibt es ein Blind."),
      t("Zwischenstufe im Aufbau: **Halbblind.** Eine zweite Person legt nach, während der Hund einen anderen Apport zurückbringt. Der Hund weiß, dass dort etwas liegt, hat es aber nicht gesehen."),
    ],
  },
  {
    id: "memory", term: "Memory", group: "markieren", aliases: [],
    // short: der gemeinsame Kern aller drei Lesarten (der erste Satz des Eintrags ist nur eine Ankündigung)
    short: "Gemeinsam ist allen: Der Hund hat das Dummy gesehen, arbeitet es aber nicht sofort und nicht unter den Bedingungen, unter denen er es gesehen hat.",
    long: [
      t("Hier gehen die Quellen auseinander, deshalb ausführlich."),
      t("Drei Lesarten sind im Umlauf:"),
      ol("Eine gesehene Marke, die der Hund erst nach längerer Zeit holen darf.",
         "Eine gesehene Marke, die von einem anderen Standort aus gearbeitet wird.",
         "Ein Dummy, das an eine bereits gearbeitete Fallstelle gelegt wird."),
      t("Gemeinsam ist allen: Der Hund hat das Dummy gesehen, arbeitet es aber nicht sofort und nicht unter den Bedingungen, unter denen er es gesehen hat. In Dummy A wird Memory zusammen mit dem Appell geprüft, nicht beim Einweisen."),
      t("**Umstritten ist die Rolle als Vorstufe zum Blind.** Eine verbreitete Position sieht Memory genau dafür vor, zum Aufbau von Merkfähigkeit und Handvertrauen. Die Gegenposition sagt, geworfene Memorys erschweren den Blind-Aufbau: Der Hund lernt, das Richtungssignal bedeute einen Weg zu einer gesehenen Stelle. Beim echten Blind fehlt diese Sicherheit, und er bleibt stehen oder weicht ab. Dazu bleiben so aufgebaute Hunde an Altfallstellen hängen."),
      t("Die Gegenposition schlägt den **Standortwechsel** vor: Der Hund sieht das Dummy an Stelle X, dann wechselt der Führer die Position und schickt ihn von dort. Damit wird die Hand zur Richtungsanzeige und nicht zur bloßen Freigabe. Diese Form ist gleichzeitig Lesart 2 und damit unstrittig."),
    ],
  },

  // ─── Die beiden Suchen ────────────────────────────────────────
  {
    id: "kleine-suche", term: "Kleine Suche", group: "suchen", aliases: [],
    short: "Enger Bereich, tiefe Nase, ruhig. Kommt beim Einweisen zum Einsatz, wenn der Hund am Zielort angekommen ist.",
    long: [t("Enger Bereich, tiefe Nase, ruhig. Kommt beim Einweisen zum Einsatz, wenn der Hund am Zielort angekommen ist. Aufbau über Leckerchen auf zwei bis drei Quadratmetern, dann über 80-Gramm-Suchendummys auf vier mal vier Metern.")],
  },
  {
    id: "grosse-suche", term: "Große Suche, Verlorensuche, Frei-Verloren-Suche", group: "suchen",
    aliases: ["Große Suche", "Verlorensuche", "Frei-Verloren-Suche"],
    short: "Mehrere Dummys liegen in einem abgegrenzten Gebiet. Weder Hund noch Führer kennen die Fallstellen.",
    long: [
      t("Mehrere Dummys liegen in einem abgegrenzten Gebiet, bei Prüfungen 50 mal 50 Meter. **Weder Hund noch Führer kennen die Fallstellen.** Der Führer zeigt mit einer Handbewegung das Gebiet und betritt es während der Arbeit nicht. Der Hund arbeitet mit hoher Nase, reviert in den Wind und soll selbstständig bleiben. Dummy A: drei bis fünf Dummys, Dummy F: acht."),
      t("Abgrenzung zum Einweisen: Dort weiß der Führer, wo es liegt, und lenkt. Hier weiß er es nicht und überlässt dem Hund die Arbeit."),
    ],
  },
  {
    id: "auslegen", term: "Auslegen für die Verlorensuche", group: "suchen", aliases: [],
    short: "Halbkreisförmig um den Hund herum, 10 bis 15 Meter Abstand. Das minimiert die Tauschgefahr.",
    long: [t("**Halbkreisförmig um den Hund herum**, 10 bis 15 Meter Abstand. Das minimiert die Tauschgefahr. Immer zehn oder mehr Dummys auslegen, den Hund aber nur einen wechselnden Teil holen lassen und den Rest selbst holen, sichtbar für den Hund. Die Anzahl variieren, sonst gewöhnt er sich an eine feste Zahl.")],
  },
  {
    id: "wind", term: "Wind in der Suche", group: "suchen", aliases: [],
    short: "Gegenwind heißt frühes Revieren. Seitenwind ist leicht, den Ansatzpunkt wandern lassen. Rückenwind heißt erst tief hinein, dann zurücksuchen.",
  },
  {
    id: "suchenstil", term: "Suchenstil messen", group: "suchen", aliases: ["Suchenstil"],
    short: "Farbige Dummys in farbgleichen Reihen auslegen. An der Farbe der gebrachten Dummys erkennt man, ob der Hund vorne oder hinten sucht.",
  },

  // ─── Fehler ───────────────────────────────────────────────────
  {
    id: "ausscheidender-fehler", term: "Ausscheidender Fehler", group: "fehler", aliases: [],
    short: "Das Gespann darf die Prüfung nicht mehr beenden.",
    long: [
      t("Das Gespann darf die Prüfung nicht mehr beenden. In allen Klassen nur zwei Fälle: **Aggressivität gegenüber Artgenossen oder Personen, und physisches Einwirken auf den Hund.**"),
      t("Der zweite Fall ist bemerkenswert: Die Prüfungsordnung selbst macht körperliche Einwirkung zum schwersten denkbaren Fehler, schwerer als jede Arbeitsverweigerung. Das ist kein Tierschutzzusatz, sondern steht gleichrangig neben der Aggression."),
    ],
  },
  {
    id: "nullwertung", term: "Nullwertung", group: "fehler", aliases: [],
    short: "Beendet nur die betroffene Aufgabe, das Gespann arbeitet weiter.",
    long: [
      t("Beendet nur die betroffene Aufgabe, das Gespann arbeitet weiter. Die Ordnung nennt elf Fälle:"),
      ul("Einspringen", "Winseln oder Bellen", "Schussscheue", "Wasser verweigern",
         "Apport verweigern, also das Dummy nicht aufnehmen", "Tauschen von Dummys", "Hetzen",
         "Außer Kontrolle geraten", "Weitersuchen mit Dummy im Fang", "Nicht-Zurückbringen zum Führer",
         "Starkes Knautschen oder Lochen des Dummys"),
      t("**Eine Aufgabe mit null Punkten oder eine Gesamtpunktzahl unter der Hälfte der erreichbaren bedeutet, die Prüfung ist nicht bestanden.** Eine Nullwertung beendet die Prüfung also nicht, kostet sie aber trotzdem."),
      t("Im britischen Regelwerk heißen die Kategorien anders: eliminating faults und major faults im Field Trial, serious faults im Working Test. Für Retriever zählen dort Hard mouth, Running in, Refusal to retrieve und Chasing zu den Ausscheidungsfehlern, und **\"noisy or inappropriate handling\"** zu den major faults."),
    ],
  },
  {
    id: "einspringen", term: "Einspringen", group: "fehler", aliases: [],
    short: "Der Hund verlässt seinen Platz ohne Aufforderung, um zu apportieren.",
    long: [
      t("Der Hund verlässt seinen Platz ohne Aufforderung, um zu apportieren. Das Gegenteil von Steadiness, Nullwertung."),
      t("Reaktion im Training: Dummy selbst holen, zurück zum Ausgangspunkt, neu beginnen. Nicht hinterherschicken, das belohnt genau das Einspringen."),
      t("Häufige unbemerkte Ursache: Der Führer fuchtelt mit den Händen. Der Hund liest das als Startsignal."),
      t("In der DP-E wird ein einmaliges, haltbares Einspringen nur mit der halben Punktzahl bewertet statt mit null. Die Einsteigerprüfung ist an dieser Stelle milder als die APD/R."),
    ],
  },
  {
    id: "blinken", term: "Blinken", group: "fehler", aliases: [],
    short: "Der Hund findet das Dummy und zeigt es nicht an, läuft weiter oder nimmt es nicht auf.",
  },
  {
    id: "tauschen", term: "Tauschen", group: "fehler", aliases: [],
    short: "Der Hund legt ein gefundenes Dummy ab, um ein anderes aufzunehmen.",
    long: [
      t("Der Hund legt ein gefundenes Dummy ab, um ein anderes aufzunehmen. Nullwertung."),
      t("Vermeidbar über das halbkreisförmige Auslegen mit 10 bis 15 Metern Abstand."),
    ],
  },
  {
    id: "weitersuchen", term: "Weitersuchen mit Dummy im Fang", group: "fehler", aliases: [],
    short: "Der Hund sucht weiter, statt das gefundene Dummy zu bringen. Nullwertung.",
  },
  {
    id: "knautschen", term: "Knautschen, hartes Maul", group: "fehler",
    aliases: ["Knautschen", "hartes Maul", "Hard mouth"],
    short: "Ein Kauen auf der Beute, während sie sich im Fang befindet.",
    long: [
      t("Ein Kauen auf der Beute, während sie sich im Fang befindet. Erkennbar an Zahnabdrücken und Löchern im Stoff. Im britischen Field Trial als Hard mouth ein Ausscheidungsfehler."),
      t("Reaktion im Training: das Apportieren für diese Einheit beenden, weil weitere Retrieves das Verhalten belohnen würden."),
    ],
  },
  {
    id: "schussscheue", term: "Schussscheue", group: "fehler", aliases: [],
    short: "Der Hund reagiert auf den Schuss mit Flucht oder Arbeitsverweigerung.",
    long: [
      t("Der Hund reagiert auf den Schuss mit Flucht oder Arbeitsverweigerung. Nullwertung."),
      t("Schussgewöhnung erst nach der Geschlechtsreife."),
    ],
  },
  {
    id: "uebersprungsverhalten", term: "Übersprungsverhalten", group: "fehler",
    aliases: ["Übersprungsverhalten", "Übersprungszeichen"],
    short: "Keine Fehlerkategorie des Regelwerks, aber das wichtigste Warnzeichen im Training.",
    long: [t("Keine Fehlerkategorie des Regelwerks, aber das wichtigste Warnzeichen im Training. Gähnen, Sich-Lecken, Sich-Kratzen, Bellen als Stressentladung, Schnuppern am Boden ohne Witterung, Sitzenbleiben beim Schicken, Zurückkommen obwohl geschickt. **\"Sie sind ein deutliches Zeichen dafür, dass er die Aufgabe noch nicht richtig verstanden hat.\"**")],
  },

  // ─── Position und Fußarbeit ───────────────────────────────────
  {
    id: "fussarbeit", term: "Fußarbeit", group: "position", aliases: [],
    short: "Der Hund geht auf Kommando an der Seite des Führers, etwa auf Kniehöhe. Die Seite ist links.",
    long: [
      t("Der Hund geht auf Kommando an der Seite des Führers, etwa auf Kniehöhe, und verlässt die Position nicht selbstständig."),
      t("**Die Seite ist links.** Das Buch begründet es mit der Ausrichtung beim Einweisen: Ist der Führer richtig ausgerichtet, ist der Hund es auch, und das funktioniert nur von einer festen Seite aus. Wer eine zweite Seite nutzt, braucht dafür ein eigenes Wort."),
    ],
  },
  { id: "vorprellen", term: "Vorprellen", group: "position", aliases: [], short: "Der Hund läuft bei der Fußarbeit zu weit vorne." },
  { id: "haengen", term: "Hängen", group: "position", aliases: [], short: "Der Hund bleibt bei der Fußarbeit zu weit hinten." },
  {
    id: "grundstellung", term: "Grundstellung", group: "position", aliases: [],
    short: "Der Hund sitzt nah und gerade am Bein, in dieselbe Richtung ausgerichtet wie der Führer.",
    long: [t("Der Hund sitzt nah und gerade am Bein, in dieselbe Richtung ausgerichtet wie der Führer. Ausgangsposition fast aller Übungen und Voraussetzung für eine saubere Linie: Kopf, Wirbelsäule und Rute sollen in die Laufrichtung zeigen.")],
  },
  {
    id: "vorsitzen", term: "Vorsitzen", group: "position", aliases: [],
    short: "Der Hund setzt sich bei der Rückkehr vor den Führer. Beim Junghund kontraproduktiv.",
    long: [
      t("Der Hund setzt sich bei der Rückkehr vor den Führer, statt vorbeizulaufen oder ihn zu umkreisen."),
      t("**Beim Junghund kontraproduktiv.** S. 354 f.: Vorsitzen erzeugt Druck zu Lasten eines schnellen Returns. Das Buch nennt zwei korrekte Varianten: Abgabe vorn im Stehen, und Abgabe seitlich aus der Fußposition. Im Regelwerk ist Vorsitzen nicht gefordert."),
    ],
  },

  // ─── Steadiness ───────────────────────────────────────────────
  {
    id: "steadiness", term: "Steadiness, Standruhe", group: "steadiness",
    aliases: ["Steadiness", "Standruhe"],
    short: "Der Hund sitzt neben dem Führer und wartet, bis er geschickt wird.",
    long: [
      t("Der Hund sitzt neben dem Führer und wartet, bis er geschickt wird. Er darf den Kopf bewegen, um besser zu markieren, soll aber still sitzen und nicht lautgeben. Im britischen Regelwerk als \"steady to shot and fall\" formuliert, dazu \"retrieve only on command\"."),
      t("**Das Trainingsverhältnis ist 80 zu 20:** Von den geworfenen Dummys holt der Führer 80 Prozent selbst, der Hund nur 20. S. 212. Wer den Hund jedes geworfene Dummy holen lässt, trainiert Einspringen."),
    ],
  },

  // ─── Ausrüstung ───────────────────────────────────────────────
  {
    id: "dummy", term: "Dummy", group: "ausruestung", aliases: [],
    short: "Ein gefüllter Canvas-Beutel, der das Wild ersetzt.",
    long: [
      t("Ein gefüllter Canvas-Beutel, der das Wild ersetzt. Canvas schwimmt und taugt fürs Wasser, saugt sich dabei aber voll. Im Working Test dürfen nur Dummys verwendet werden, die die Richter akzeptieren."),
      t("Gewichte:"),
      { type: "table", head: ["Dummy", "Gewicht", "Einsatz"], rows: [
        ["Welpendummy", "200 g", "erste Apports"],
        ["Juniordummy", "400 g", "Junghund, kurze Einheiten unterwegs"],
        ["Standarddummy", "500 g", "Normalfall, alle Prüfungsklassen"],
        ["Suchendummy", "80 g", "Kleine Suche und Suchenpfiff bei geringer Witterung"],
      ] },
    ],
  },
  {
    id: "dummyfarbe", term: "Dummyfarbe", group: "ausruestung", aliases: [],
    short: "Blau und Violett sieht er zweifelsfrei, deshalb sind blaue Dummys die beste Lernhilfe.",
    long: [t(DUMMY_FACTS.farben)], // einzige Quelle: DUMMY_FACTS
  },
  {
    id: "markierstab", term: "Markierstab, Einweisestab", group: "ausruestung",
    aliases: ["Markierstab", "Einweisestab"],
    short: "Ein kurzer Stab, der in den Boden gesteckt wird. Er ist eine Sichthilfe für den Hund, nicht für den Führer.",
    long: [
      t("Ein kurzer Stab, der in den Boden gesteckt wird. **Er ist eine Sichthilfe für den Hund**, nicht für den Führer."),
      t("Praxisregel: mindestens vier Stäbe verwenden und sie bewusst als Verleitung einsetzen, nicht nur als Zielpunkt. Steht nur ein Stab, lernt der Hund, zum Stab zu laufen statt auf die Einweisung zu hören. Leere Stäbe soll er nicht abchecken dürfen."),
    ],
  },
  {
    id: "pfeife", term: "Pfeife", group: "ausruestung", aliases: [],
    short: "Für mehr Reichweite eine Pfeife mit Erbse, für leise Signale eine ohne.",
    long: [t("Für mehr Reichweite eine Pfeife mit Erbse, für leise Signale eine ohne. Im Training und in der Prüfung gehört sie **in die Hand oder besser direkt in den Mund**, nicht in die Tasche: \"Sie müssen deshalb sofort reagieren können, wenn Ihr Hund Ihre Hilfe braucht.\"")],
  },

  // ─── Der Hund als Sinneswesen ─────────────────────────────────
  {
    id: "gehoer", term: "Gehör", group: "sinne", aliases: [],
    short: "Hunde nehmen Töne viermal leiser wahr als Menschen und aus viermal größerer Entfernung.",
    long: [
      t("Hunde hören von 30 Hz bis 64 kHz, am empfindlichsten zwischen 1 und 16 kHz. Sie nehmen Töne **viermal leiser** wahr als Menschen und aus **viermal größerer Entfernung.** Sie unterscheiden Tonhöhen, die nur ein Achtel Ton auseinanderliegen, und orten Schallquellen im Bruchteil einer Sekunde punktgenau."),
      t("Daraus folgt die Regel für den leisen Pfiff: Der Hund soll auf den leisesten Pfiff reagieren, den du geben kannst. Lautstärke ist kein Verstärker für einen Hund, der nicht reagiert, und nach oben bleibt Reserve für Distanz, Wind und Deckung."),
      t("Und die Warnung zu klangähnlichen Signalen: \"Hunde interpretieren bereits den ersten Pfeifton, den sie wahrnehmen, und beginnen dann, sich entsprechend zu verhalten.\" S. 234. Wer ein Suchensignal als Pfeifsequenz baut, deren erster Ton dem Stopp-Pfiff gleicht, riskiert, dass der Hund stoppt."),
    ],
  },
  {
    id: "sehen", term: "Sehen", group: "sinne", aliases: ["Bewegungsseher"],
    short: "Hunde sind Bewegungsseher. Das deutlichste Handzeichen ist das, das die Silhouette des Führers am stärksten verändert.",
    long: [t("Hunde sind **Bewegungsseher.** Das deutlichste Handzeichen ist deshalb das, das die Silhouette des Führers am stärksten verändert. Ein ausgestreckter Zeigefinger ist auf Distanz schlecht zu erkennen. In der Dämmerung verstärkt das Tapetum Lucidum die Lichtausbeute um etwa 50 Prozent, das Bild wird dabei aber unschärfer.")],
  },
  {
    id: "nase", term: "Nase", group: "sinne", aliases: ["Nasenarbeit"],
    short: "Die Nase muss feucht sein, sonst sinkt die Leistung. Nasenarbeit ist Schwerstarbeit.",
    long: [t("Die Nase muss feucht sein, sonst sinkt die Leistung. **Bei Nasenarbeit braucht der Hund genügend Wasser.** Die Riechzellen gewöhnen sich an gleichartige Gerüche, deshalb dient der Zickzackkurs auch der Nasenerholung. Nasenarbeit ist Schwerstarbeit.")],
  },

  // ─── Lernen und Methodik ──────────────────────────────────────
  {
    id: "lernphasen", term: "Die drei Lernphasen", group: "lernen", aliases: ["Lernphase", "Lernphasen"],
    short: "Erlernen, Üben, Festigen. Zeit kostet nicht das Erlernen, sondern das Absichern unter verschiedenen Bedingungen.",
    long: [
      { type: "table", head: ["Phase", "Verstärkung", "Bedingungen", "Ziel"], rows: [
        ["Erlernen", "jedes Mal, hochwertig", "immer gleich, ablenkungsarm", "Verhalten entsteht"],
        ["Üben", "unregelmäßig, nur bei optimaler Ausführung", "Rahmenbedingungen variieren", "Qualität erhöhen"],
        ["Festigen", "variabel, nur bei optimalem Verhalten", "große Ablenkung, Konflikte", "Verhalten unter allen Bedingungen"],
      ] },
      t("\"Nicht das eigentliche Erlernen eines Signals ist zeitintensiv. Meist erlernt der Hund ein neues Signal sehr schnell, sehr zeitintensiv ist hingegen, die Übung unter den verschiedenen Bedingungen abzusichern.\""),
      t("Dazu die Warnung: \"Vermeiden Sie, eine noch nicht genügend gefestigte Übung mit Ablenkung zu trainieren. Das bereits erreichte Niveau wird gesenkt und somit das vorangegangene Training ad absurdum geführt.\""),
    ],
  },
  {
    id: "acht-bedingungen", term: "Die acht veränderbaren Bedingungen", group: "lernen", aliases: [],
    short: "Die Variantenachse für alles, was nicht über Distanz gesteigert wird.",
    long: [t("Die Variantenachse für alles, was nicht über Distanz gesteigert wird: Haltung und Gestik, Trainingsort, Trainingsgegenstände, Entfernung und Position des Führers, Verleitungen, Ausgangssituation, Aufbewahrungsort der Belohnung, Wetter.")],
  },
  {
    id: "belohnen", term: "Belohnen gegen Bestechen", group: "lernen", aliases: [],
    short: "Der Verstärker kommt nach der Ausführung.",
    long: [t("Der Verstärker kommt **nach** der Ausführung. Wird er vorher gezeigt, wird er Bestandteil des Signals, und der Hund zögert künftig und wartet ab, ob es etwas gibt. Leckerchen in etwas aufbewahren, das nicht knistert: das Knistern der Tüte und die Hand in der Tasche sind Vorboten, die den Hund lesen lassen, ob sich die Arbeit lohnt.")],
  },
  {
    id: "jackpot", term: "Jackpot", group: "lernen", aliases: [],
    short: "Ein seltenes, überraschendes Ereignis bei einer herausragenden Leistung.",
    long: [t("Ein seltenes, überraschendes Ereignis bei einer herausragenden Leistung, etwa beim ersten Gelingen einer schwierigen Übung. Nicht planbar und nicht regelmäßig, sonst verliert es die Wirkung.")],
  },
  {
    id: "differenzierte-belohnung", term: "Differenzierte Belohnung", group: "lernen", aliases: [],
    short: "Spitzenleistung mit dem Lieblingsverstärker, alles andere nur mit knappem verbalem Lob.",
    long: [t("Spitzenleistung mit dem Lieblingsverstärker, alles andere nur mit knappem verbalem Lob. Und: alltägliche Dinge taugen als Belohnung, rennen dürfen, ein Dummy holen dürfen, schwimmen dürfen. \"Oftmals wirksamer und einfacher als immer nur das Leckerchen.\"")],
  },
  {
    id: "fehlerursachen", term: "Die fünf Fehlerursachen", group: "lernen", aliases: ["Fehlerursachen"],
    short: "Bei unklarer Ursache: \"Es ist immer besser, nicht zu reagieren, als falsch zu reagieren.\"",
    long: [
      ol("Körperliche oder geistige Überforderung, Pause machen.",
         "Unpassende Trainingsmethode, Pause und Methode überdenken.",
         "Einführung neuer Verhaltensdetails: Altes wird vorübergehend schlechter. **Ignorieren, nicht maßregeln**, es verschwindet von allein.",
         "Vom Hund bewusst eingebaut, er testet, was wirklich erwartet wird. Sanfte Korrektur oder einfach nicht belohnen.",
         "Zu schnelle Steigerung, zurück in den Kindergarten."),
      t("Bei unklarer Ursache: **\"Es ist immer besser, nicht zu reagieren, als falsch zu reagieren.\"** Und: maximal zwei Wiederholungen, dann für heute aufhören."),
    ],
  },
  {
    id: "verteiltes-training", term: "Verteiltes Training", group: "lernen", aliases: [],
    short: "Zwei kurze Einheiten pro Woche wirken besser als tägliches Training.",
    long: [
      t("Zwei kurze Einheiten pro Woche wirken besser als tägliches Training. In einer Studie mit 44 Beagles und einer in 18 Schritte zerlegten Aufgabe erreichten die Hunde, die ein bis zwei Mal pro Woche trainierten, das Ziel schneller als die täglich trainierten, und kurze Einheiten schlugen lange. Nach vier Wochen konnten alle Gruppen die Aufgabe, der Unterschied liegt im Erwerbstempo, nicht im Ergebnis."),
      // Einschränkung aus der Evidenzangabe übernommen, weil sie für den Leser zählt (gemeldet)
      t("Einschränkung: Laborbeagles, eine Aufgabe, eine Studie. Für Dummyarbeit ist die Übertragung plausibel, nicht bewiesen."),
    ],
  },
  {
    id: "lernkurve", term: "Lernkurve", group: "lernen", aliases: [],
    short: "\"Die Lernkurve des Hundes ist niemals linear.\" Lernplateaus sind normal und dürfen nicht als Sturheit ausgelegt werden.",
  },
  {
    id: "wann-eingreifen", term: "Wann eingreifen", group: "lernen", aliases: [],
    short: "Nur wenn der Hund an der Aufgabe verzweifelt, die Motivation verliert oder unsicher wird.",
    long: [t("Nur wenn der Hund an der Aufgabe verzweifelt, die Motivation verliert oder unsicher wird. Sonst nicht: Er muss lernen, selbstständig zu arbeiten und in schwierigen Situationen eigene Lösungen zu finden. \"Das ist der schmale Grat, auf dem sich jeder Ausbilder bewegt.\"")],
  },
  {
    id: "trainingsvorbereitung", term: "Trainingsvorbereitung", group: "lernen", aliases: [],
    short: "Alles vorbereiten, bevor der Hund aus dem Auto kommt.",
    long: [t("Alles vorbereiten, **bevor** der Hund aus dem Auto kommt: Dummys auslegen, zweite Person instruieren, Hindernis aufstellen. \"Erst wenn alles vorbereitet ist, sollten Sie den Hund aus dem Auto holen.\" Dann lösen lassen, anleinen, auf die Aufgabe konzentrieren.")],
  },
  {
    id: "stopp-im-lauf", term: "Stopp im Lauf, Aufbau", group: "lernen", aliases: [],
    short: "Erst die Sitz-Geschwindigkeit direkt am Fuß verbessern, erst danach Distanz und Tempo.",
    long: [
      t("Erst die **Sitz-Geschwindigkeit direkt am Fuß** verbessern: \"In der Geschwindigkeit, in der er sich bei Ihnen am Fuß hinsetzt, wird er sich bestenfalls beim Abstoppen setzen.\" Erst danach Distanz und Tempo."),
      t("Setzt der Hund sich näher beim Führer als gestoppt, ist das **Unsicherheit, nicht Ungehorsam.** Der Sicherheitsabstand wächst von allein. Zurückbringen, dort absitzen lassen, aus der Entfernung loben."),
      t("Stoppt er nicht: nach dem **ersten** nicht befolgten Pfiff aktiv werden, **kein zweites Mal pfeifen**, hingehen, an die Stelle zurückbringen."),
    ],
  },

  // ─── Signale (Topf 2) ─────────────────────────────────────────
  {
    id: "signal-stop", term: "Stopp-Signal", group: "signale", aliases: [], signal: ["stop"], fallback: "dein Stopp-Signal",
    short: "Der Hund stoppt sofort, setzt sich je nach Aufbau und sieht den Führer an.",
    long: [t("Der Hund stoppt sofort, setzt sich je nach Aufbau und sieht den Führer an. Verbreitet ist ein kurzer Pfiff. Leise pfeifen, siehe Gehör.")],
  },
  {
    id: "signal-recall", term: "Rückruf-Signal", group: "signale", aliases: [], signal: ["recall"], fallback: "dein Rückruf-Signal",
    short: "Der Hund kommt auf direktem Weg zurück.",
    long: [
      t("Der Hund kommt auf direktem Weg zurück. Verbreitet sind mehrere kurze Töne."),
      t("Nicht nachpfeifen: Kommt er nicht, hingehen und holen, ohne Ärger, nächsten Versuch leichter machen. Nachpfeifen lehrt ihn, dass der erste Pfiff unverbindlich ist."),
    ],
  },
  {
    id: "signal-search", term: "Suchen-Signal", group: "signale", aliases: ["Suchensignal"], signal: ["search"], fallback: "dein Suchen-Signal",
    short: "Schickt den Hund in die Kleine Suche: enger Bereich, tiefe Nase, ruhig.",
    long: [t("Schickt den Hund in die **Kleine Suche**: enger Bereich, tiefe Nase, ruhig. Handzeichen: Arm seitlich **nach unten**, Handfläche zum Hund. **Nicht automatisch geben.** In der Lernphase genau in dem Moment, in dem der Hund Witterung bekommt.")],
  },
  {
    id: "signal-area", term: "Gebietssignal", group: "signale", aliases: [], signal: ["area"], fallback: "dein Gebietssignal",
    short: "Schickt den Hund in die Große Suche in einem abgegrenzten Gebiet.",
    long: [t("Schickt den Hund in die **Große Suche** in einem abgegrenzten Gebiet. Der Führer zeigt das Gebiet mit einer Handbewegung und betritt es nicht. Das Zeichen zeigt die Zone, nicht das Dummy.")],
  },
  {
    id: "signal-out", term: "Richtungssignal geradeaus, Voran", group: "signale", aliases: ["Voran"], signal: ["out"], fallback: "dein Richtungssignal geradeaus",
    short: "Der Hund läuft in gerader Linie vom Führer weg, bis ein neues Signal kommt.",
    long: [
      t("Der Hund läuft in gerader Linie vom Führer weg, bis ein neues Signal kommt. **Handzeichen: flache Hand hochkant, 20 bis 30 cm vor dem Kopf des HUNDES, \"wie über Kimme und Korn\".** Die Hand zeigt die Laufrichtung. Ausgangslage: Hund in Grundstellung neben dem Führer."),
      t("Drei Regeln aus dem Buch, alle drei leicht zu übersehen:"),
      ul("**\"Üben Sie Voran niemals mit Wind von vorn.\"** Bei Gegenwind reviert der Hund statt zu laufen.",
         "**Ritualisieren:** immer dieselbe Körperhaltung. Ändert sie sich, fehlt dem Hund die Motivation.",
         "**Pushen:** das Signal vor Hindernissen wiederholen."),
      t("Elegante Unterscheidung: linker Arm für Voran, rechter Arm für Markierungen."),
    ],
  },
  {
    id: "signal-back", term: "Richtungssignal in die Tiefe, Back", group: "signale", aliases: ["Back"], signal: ["back"], fallback: "dein Richtungssignal in die Tiefe",
    short: "Der Hund dreht sich um 180 Grad und läuft dann geradeaus weiter. Arm senkrecht über den eigenen Kopf.",
    long: [
      t("Der Hund dreht sich um 180 Grad und läuft dann geradeaus weiter. **Handzeichen: Arm senkrecht über den EIGENEN Kopf.** **Timing:** Stopp-Pfiff, Arm in **neutrale Position vor der Brust**, **zwei Sekunden Pause**, dann Arm nach oben schnellen, Signal während der Armbewegung. Arm oben stehen lassen. Drehrichtung: rechter Arm, Hund dreht über die **linke** Schulter. Spiegelbildlich, weil er dich ansieht. Ausgangslage: Hund steht entfernt, nach dem Stopp-Signal, und sieht den Führer an."),
      t("**Unterschied zu geradeaus:** Zwei verschiedene Köpfe. Geradeaus ist die Hand über dem Kopf des **Hundes** und ein Startsignal aus der Grundstellung. In die Tiefe ist der Arm über dem Kopf des **Führers** und ein Fortsetzungssignal auf Distanz."),
    ],
  },
  {
    id: "signal-over", term: "Richtungssignal seitlich", group: "signale", aliases: [], signal: ["over"], fallback: "dein Richtungssignal seitlich",
    short: "Der Hund läuft im 90-Grad-Winkel nach links oder rechts, je nach Armhaltung.",
    long: [
      t("Der Hund läuft im 90-Grad-Winkel nach links oder rechts, je nach Armhaltung. **Handzeichen: Arm waagerecht zur Seite**, in Richtung des Dummys. Ausgangslage: Hund steht entfernt, nach dem Stopp-Signal."),
      t("Verbreitete Wörter sind Rüber oder Go, oft dasselbe Wort für beide Seiten, weil der Arm die Richtung trägt. Wer zwei Wörter nutzt, trägt beide im Profil ein."),
      t("Reihenfolge im Aufbau beachten: **Voran, dann Back, dann Rechts und Links.** Die Seitenrichtungen sind für den Hund leichter, werden aber zuletzt aufgebaut, um ihn nicht zu verwirren. Ziel für Fortgeschrittene: 100 Meter in jede Richtung."),
    ],
  },
  {
    id: "signal-fetch", term: "Apport-Signal", group: "signale", aliases: [], signal: ["fetch"], fallback: "dein Apport-Signal",
    short: "Schickt den Hund, das Dummy zu holen und zu bringen.",
    long: [t("Schickt den Hund, das Dummy zu holen und zu bringen. Im Regelwerk gilt \"retrieve only on command\": vorher losgelaufen ist Einspringen.")],
  },
  {
    id: "signal-release", term: "Freigabe-Signal", group: "signale", aliases: [], signal: ["release"], fallback: "dein Freigabe-Signal",
    short: "Beendet die Übung, der Hund darf wieder machen, was er will.",
    long: [
      t("Beendet die Übung, der Hund darf wieder machen, was er will. In keiner Ordnung geführt, in der Praxis verbreitet."),
      t("Warum es zählt: Wenn jeder Rückruf und jede Fuß-Phase das Ende der Freiheit bedeutet, werden beide schlechter. Freigeben ist Teil der Belohnung, und das Buch nennt alltägliche Freiheiten ausdrücklich als Verstärker."),
    ],
  },
  {
    id: "signal-release-dummy", term: "Aus-Signal, Dummy abgeben", group: "signale", aliases: ["Aus-Signal"], signal: ["release_dummy"], fallback: "dein Aus-Signal",
    short: "Fordert den Hund auf, das Dummy loszulassen.",
    long: [
      t("Fordert den Hund auf, das Dummy loszulassen. Nicht zu verwechseln mit dem Freigabe-Signal, das die ganze Übung beendet: Nach dem Aus-Signal bleibt der Hund in der Arbeit."),
      t("Verbreitet ist \"Aus\". Wer das Dummy ohne eigenes Signal abnimmt, trägt im Profil nichts ein, dann erscheint die Zeile nicht."),
    ],
  },
  {
    id: "signal-position", term: "Positionssignale", group: "signale", aliases: [], signal: ["heel", "side2"], fallback: "deine Positionssignale",
    short: "Der Hund nimmt die Fußposition ein. Die Hauptposition ist links.",
    long: [t("Der Hund nimmt die Fußposition ein. **Die Hauptposition ist links**, siehe Fußarbeit. Wer eine zweite Seite nutzt, braucht ein zweites Wort. Beide Wörter stehen im Profil.")],
  },
];

// Quellen aus docs/glossar-v5.md (für den Basics-Abschnitt "Quellen")
export const GLOSSAR_SOURCES = {
  haupt: ["Monika Zvolsky, Die Kosmos Retrieverschule"],
  // Endgültige Liste nach docs/dp-e-korrektur.md, Abschnitt 5 (Fundstellen: docs/regelwerke.md)
  regelwerke: [
    "Golden Retriever Club e.V., Ordnung für die Dummy-Einsteigerprüfung für Retriever (DP-E/GRC m. S., o. S.), Fassung 13.11.2018",
    "Deutscher Retriever Club e.V., Ordnung für Arbeitsprüfungen mit Dummies für Retriever (APD/R), Fassung 11.07.2009, letzte Änderung 03.09.2022",
    "FCI, Reglement für Internationale Working Tests für Retriever (über APD/R §4(2) in Kraft)",
    "Kennel Club, Field Trial Regulations J einschließlich Gundog Working Tests, Mini Guide 2024",
  ],
  fach: [
    "Howard Kirby, Mullenscote Gundogs",
    "Lez Graham",
    "keinkoeter.de, Warum Memory Marks beim Blind-Aufbau nicht helfen (für die Gegenposition zu Memory)",
    "Hund und Freizeit, Markierstab",
    "Easy Dogs, Einweisen in der Dummyarbeit",
    "Dr. Astrid Siegl, Vierbeiner Reha-Zentrum, Aufwärmen und Cool Down (Beitrag im Buch)",
  ],
  studien: [
    "Demant, Ladewig et al. 2011, The effect of frequency and duration of training sessions on acquisition and long-term memory in dogs, Applied Animal Behaviour Science 133, 228-234",
    "Ziv 2017, The Effects of Using Aversive Training Methods in Dogs: A Review, Journal of Veterinary Behavior",
    "Vieira de Castro et al. 2020, Does Training Method Matter? Evidence for the Negative Impact of Aversive-Based Methods on Companion Dog Welfare, PLoS ONE",
  ],
  nichtMehr: [
    ["Labrador Outdoor, Dummyfarben 1x1", "Orange sei für den Hund schwer sichtbar und werde zur Erschwerung genutzt"],
    ["Hundeshop.de, Standardgewichte", "250 g als Welpengewicht"],
    ["Wald und Hund, Dummy-ABC", "Fußseite sei nicht festgelegt"],
    ["Weser-Hunde, Kleines Lexikon der Dummyarbeit", "dito"],
    ["Retrieverfreunde Siegerland, Das Dummy-ABC", "dito"],
    ["sitzplatzfuss.com, Handzeichen im Detail", "gleiche Handzeichen für Voran und Back"],
    ["Joyful Labs, Grundlagen der Dummyarbeit", "Pocket Dummy als Jackentaschen-Dummy"],
    ["Totally Gundogs, Stop Whistle 2", "Aufbau Stopp im Lauf ohne die Sitz-Geschwindigkeit am Fuß"],
    ["Gun Dog Magazine, How to Use a Whistle", "US-Schule, nicht mit dem Fundament vereinbar"],
    ["Hundeschule Jagdfieber", "durch die Original-Ordnungen ersetzt"],
  ],
  nichtMehrNote: "Mike Stewart und Wildrose Kennels stehen nicht mehr in der Liste. Wildrose ist die amerikanische Schule und war die Quelle der Vermischung: Dreifachmarken, Cold Blind, Drill-Logik.",
};
