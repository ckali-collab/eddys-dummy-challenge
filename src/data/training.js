/**
 * Eddy's Dummy Challenge - Trainingsdaten v2
 * Stand: 11.10.2026
 *
 * Struktur: 8 parallele Tracks, je 3 Level (bronze/silber/gold).
 * Keine lineare Stufenlogik mehr. Gelaende ist in die Level eingebaut.
 */

// ─── Pfeifsignale ─────────────────────────────────────────────
export const WHISTLES = [
  {
    id: "stop",
    name: "Stopp",
    pattern: "pip",
    visual: "●",
    desc: "1x kurz",
    meaning: "Sofort anhalten, hinsetzen, Blick zum Hundeführer",
    use: [
      "Im Alltag statt des Wortes Sitz, um das Signal beiläufig zu festigen",
      "Wenn der Hund auf eine Gefahr zuläuft",
      "Als Vorbereitung jeder Richtungseinweisung: immer zuerst stoppen, dann Handzeichen",
      "Wenn er beim Blind von der Linie abweicht",
    ],
    avoid: [
      "Mehr als drei bis vier Mal pro Spaziergang",
      "Direkt nachdem er den Dummy aufgenommen hat (zerstört den flüssigen Rücklauf)",
      "Wenn du nicht durchsetzen kannst, dass er wirklich stoppt",
    ],
    note: "Das Signal bedeutet für den Hund: Halt an, pass auf, gleich kommt etwas Gutes. Der Stopp muss sich lohnen.",
  },
  {
    id: "recall",
    name: "Rückruf",
    pattern: "peeeep - peeeep",
    visual: "▬ ▬",
    desc: "2x lang",
    meaning: "Direkt und auf gerader Linie zurückkommen, vorsitzen",
    use: [
      "Wenn du sicher bist, dass er kommt",
      "Wenn er ohnehin in deine Richtung orientiert ist - festigt das Signal gratis",
    ],
    avoid: [
      "Wenn er intensiv mit anderen Hunden spielt und noch nicht auf diesem Level ist",
      "Ein zweites Mal, wenn er beim ersten nicht reagiert hat",
    ],
    note: "Zentraler Fehler: Jeder Abruf aus etwas Schönem bestraft das Rückruf-Verhalten. Deshalb nach dem Rückruf oft wieder freigeben.",
  },
  {
    id: "hunt",
    name: "Verloren",
    pattern: "pip - peeeep",
    visual: "● ▬",
    desc: "kurz-lang, Sequenz bei Bedarf wiederholen",
    meaning: "Such hier mit der Nase in diesem Bereich",
    use: [
      "Wenn der Hund im Suchbereich angekommen ist und mit der Nase arbeiten soll",
      "Wenn er im Bereich aufgibt oder herausläuft",
    ],
    avoid: [
      "Als Startkommando aus der Grundposition - dafür gibt es Apport oder Voran",
      "Solange er noch aktiv und sinnvoll sucht",
    ],
    note: "Der erste Ton heißt Achtung hör zu, der zweite heißt such hier.",
  },
];

// ─── Handzeichen und Kommandos ────────────────────────────────
export const COMMANDS = [
  { word: "Fuß",     gesture: "Hund links neben dir",                  when: "Grundposition" },
  { word: "Ran",      gesture: "Hund rechts neben dir",                 when: "Grundposition" },
  { word: "Apport",   gesture: null,                                     when: "Sichtmarke, Hund hat die Flugbahn gesehen" },
  { word: "Voran",    gesture: "Arm vollständig über Kopf gestreckt",  when: "Gerade Linie von der Grundposition weg" },
  { word: "Back",     gesture: "Arm über Kopf",                         when: "Nach Stopp-Pfiff: weiter von dir weg" },
  { word: "Links",    gesture: "Linker Arm waagerecht ausgestreckt",     when: "Nach Stopp-Pfiff" },
  { word: "Rechts",   gesture: "Rechter Arm waagerecht ausgestreckt",    when: "Nach Stopp-Pfiff" },
  { word: "Verloren", gesture: "Trommelbewegung, Handfläche nach unten", when: "Nasenarbeit in der Zone" },
  { word: "Frei",     gesture: "Wischbewegung nach vorn",                when: "Ende der Übung" },
];

export const DIRECTION_NOTE =
  "Richtungsangaben sind immer aus deiner Sicht. Du streckst den linken Arm aus, der Hund läuft nach links von dir aus gesehen.";

// ─── Gelaendestufen ───────────────────────────────────────────
export const TERRAIN = [
  { level: "bronze", emoji: "🟢", label: "Feldweg, kurzes Gras",            desc: "Kurze Distanz, kaum Ablenkung" },
  { level: "silber", emoji: "🟡", label: "Wiese, mittleres Gras",           desc: "Mittlere Distanz, leichte Ablenkung" },
  { level: "gold",   emoji: "🟠", label: "Hohes Gras, Buschwerk, Waldrand", desc: "Volle Distanz, reale Ablenkung" },
];

// ─── Tracks ───────────────────────────────────────────────────
export const TRACKS = [
  {
    id: "A",
    name: "Stopp-Pfiff",
    icon: "whistle",
    short: "Anhalten und Sitzen auf einen kurzen Pip",
    desc: "Grundlage für alles. Ohne zuverlässigen Stopp ist kein Handling möglich.",
    gear: ["Pfeife"],
    requires: [],
    levels: [
      {
        id: "bronze",
        title: "Stopp im Nahbereich",
        criteria: "Sitzt sofort auf einen leisen Pip, fünf von fünf Fällen, an drei verschiedenen Tagen.",
        reps: 3,
        diagram: null,
        steps: [
          "Hund geht bei Fuß. Leise Pip pfeifen. Er setzt sich sofort hin.",
          "Hund sitzt 20 große Schritte vor dir. Pip pfeifen. Er bleibt sitzen und schaut dich an.",
          "Rückruf pfeifen, dann auf halbem Weg Pip. Er stoppt sofort.",
          "Er stöbert wenige Meter vor dir. Pip pfeifen und gleichzeitig einen Dummy werfen. Der Dummy ist die Belohnung für den Stopp.",
        ],
        tips: [
          "Immer leise pfeifen. Lautstärke ist keine Steigerung, sondern Lärm.",
          "Im Alltag das Wort Sitz durch den Pfiff ersetzen. Kostet keine Trainingszeit.",
          "Maximal drei bis vier Stopps pro Spaziergang.",
        ],
        warning: "Zu viele Wiederholungen führen dazu, dass der Hund beim Rausschicken von selbst stoppt.",
      },
      {
        id: "silber",
        title: "Stopp auf Distanz und aus der Bewegung",
        criteria: "Stopp auf 25 Meter, auch beim Schnüffeln oder Laufen. Vier saubere Stopps in Folge, drei verschiedene Orte.",
        reps: 4,
        diagram: null,
        steps: [
          "Hund sucht oder schnüffelt frei auf etwa 25 Meter. Pip. Er stoppt, sitzt, schaut dich an.",
          "Nach dem Stopp: Rückruf pfeifen und loben, oder einen Dummy werfen. Der Stopp muss sich lohnen.",
          "Distanz schrittweise auf 30 bis 35 Meter steigern.",
        ],
        tips: [
          "Wenn er nicht stoppt: nicht nachpfeifen. Hingehen, zurück zum Ausgangspunkt, Distanz verkürzen.",
          "Bei Gelenkeinschränkung aus dem Trab üben, nicht aus dem Galopp.",
        ],
        warning: null,
      },
      {
        id: "gold",
        title: "Stopp im Lauf auf den Dummy",
        criteria: "Stopp auf 40 Meter während des Laufs zum Dummy, und Stopp bei realer Ablenkung. Je drei saubere Durchgänge.",
        reps: 3,
        diagram: null,
        steps: [
          "Dummy werfen, Hund schicken.",
          "Während er auf den Dummy zugaloppiert, trittst du vor ihn und pfeifst gleichzeitig Pip.",
          "Er stoppt. Danach schickst du ihn weiter auf den Dummy - der Stopp war keine Absage, sondern eine Zwischenstation.",
          "Schrittweise weniger vortreten, bis der Pfiff allein reicht.",
        ],
        tips: [
          "Railway-Track-Methode nach Kirby.",
          "Maximal einmal pro Session, sonst entsteht Zögern beim Rausschicken.",
        ],
        warning: "Sparsam einsetzen. Diese Übung ist der häufigste Auslöser für antizipierendes Stoppen.",
      },
    ],
  },

  {
    id: "B",
    name: "Rückruf",
    icon: "return",
    short: "Direktes Zurückkommen auf zwei lange Töne",
    desc: "Gerade Linie, kein Zickzack, kein Schnüffeln unterwegs.",
    gear: ["Pfeife"],
    requires: [],
    levels: [
      {
        id: "bronze",
        title: "Rückruf aus ruhiger Situation",
        criteria: "20 Meter, gerade Linie, Vorsitzen. Fünf schnelle Reaktionen auf das erste Signal in Folge.",
        reps: 5,
        diagram: null,
        steps: [
          "Hund läuft frei auf etwa 20 Meter.",
          "Peeeep - peeeep. Er kommt direkt und gerade.",
          "Er sitzt vor dir ab. Loben.",
          "Wieder freigeben.",
        ],
        tips: [
          "Schritt 4 ist der wichtigste. Wenn der Rückruf immer das Ende der Freiheit bedeutet, wird er schlechter.",
        ],
        warning: null,
      },
      {
        id: "silber",
        title: "Rückruf aus der Beschäftigung",
        criteria: "40 Meter, Hund ist aktiv am Schnüffeln oder Suchen. Fünf schnelle Reaktionen in Folge.",
        reps: 5,
        diagram: null,
        steps: [
          "Warten, bis er wirklich in etwas vertieft ist.",
          "Peeeep - peeeep einmal.",
          "Kommt er: große Belohnung, dann wieder freigeben.",
          "Kommt er nicht: hingehen, ruhig holen, keine Strafe. Nächster Versuch leichter.",
        ],
        tips: ["Niemals zweimal pfeifen."],
        warning: null,
      },
      {
        id: "gold",
        title: "Rückruf unter sozialer Ablenkung",
        criteria: "Kommt auf das erste Signal, während andere Hunde in der Nähe spielen. Drei Durchgänge an verschiedenen Tagen.",
        reps: 3,
        diagram: null,
        steps: [
          "Check-in trainieren, bevor du pfeifst. Große Distanz zu den spielenden Hunden. Sobald er die anderen ansieht und dann von selbst zu dir schaut: belohnen.",
          "Rückruf auf großer Distanz. Erst wenn Schritt 1 sicher sitzt. Hund ist in Sichtweite, aber nicht im Spiel.",
          "Distanz schrittweise verkürzen. Nur eine Stufe weiter nach fünf schnellen Reaktionen in Folge.",
          "Rückruf aus dem Spiel. Erst ganz am Ende. Danach wieder freigeben und weiterspielen lassen.",
        ],
        tips: [
          "Niemals zweimal pfeifen.",
          "Nach einer langsamen Reaktion darf er nicht sofort zur Ablenkung zurück. Sonst lernt er, dich auszusitzen.",
          "Besser mit kontrollierten Helferhunden üben als mit fremden Hunden im Park.",
        ],
        warning: null,
      },
    ],
  },

  {
    id: "C",
    name: "Fuß",
    icon: "paw",
    short: "Position, Tempo, Richtung",
    desc: "Ruhig neben dir, ohne Ziehen, ohne Vorauslaufen. In bewussten Phasen, nicht den ganzen Spaziergang.",
    gear: [],
    requires: [],
    levels: [
      {
        id: "bronze",
        title: "50 Meter ohne Ziehen",
        criteria: "50 Meter off-lead bei Fuß auf bekanntem Weg, keine Leinenspannung, kein Vorlaufen.",
        reps: 3,
        diagram: null,
        steps: [
          "Bewusste Fuß-Phase ankündigen, 50 Meter gehen, dann freigeben.",
          "Wenn er vorzieht: stehen bleiben und warten, bis er zurückkommt. Kein Kommentar.",
        ],
        tips: ["Kurze Phasen, dafür sauber. Nicht den ganzen Spaziergang."],
        warning: null,
      },
      {
        id: "silber",
        title: "Tempo- und Richtungswechsel",
        criteria: "Bleibt bei Fuß bei abrupten Tempo- und Richtungswechseln, 100 Meter am Stück.",
        reps: 3,
        diagram: null,
        steps: [
          "Tempo variieren, Kehrtwendungen gehen, stehenbleiben und weitergehen.",
          "Er muss dich beobachten statt nebenher zu laufen.",
        ],
        tips: ["Unvorhersehbar sein. Das erzeugt Aufmerksamkeit."],
        warning: null,
      },
      {
        id: "gold",
        title: "Automatisches Sitzen unter Ablenkung",
        criteria: "Du bleibst stehen, Hund sitzt automatisch ohne Kommando - auch bei Fahrrad oder Jogger. Fünf Mal in Folge.",
        reps: 5,
        diagram: null,
        steps: [
          "An belebteren Wegen üben.",
          "Du hältst an, sagst nichts. Er sitzt.",
          "Wenn eine Ablenkung kommt: weiter nichts sagen.",
        ],
        tips: ["Das ist gleichzeitig die Basis für Walk-up in Track D."],
        warning: null,
      },
    ],
  },

  {
    id: "D",
    name: "Steadiness",
    icon: "brain",
    short: "Warten statt Losrennen",
    desc: "Erweiterung des Grundgehorsams. Der Hund entscheidet selbst zu warten. Immer off-lead - mit Leine trainierst du nichts.",
    gear: ["Dummy", "Pfeife"],
    requires: ["C:bronze"],
    levels: [
      {
        id: "bronze",
        title: "Warten nach dem Wurf",
        criteria: "Wartet 8 Sekunden ruhig nach dem Dummy-Wurf, vier Durchgänge ohne Durchbrechen.",
        reps: 4,
        diagram: null,
        steps: [
          "Hund sitzt off-lead in Fuß oder Ran.",
          "Dummy werfen. Nichts sagen.",
          "3 Sekunden warten, dann Apport.",
          "Schrittweise auf 5 und 8 Sekunden steigern.",
        ],
        tips: [
          "Wenn er durchbricht: Dummy selbst holen, zurück zum Ausgangspunkt, neu beginnen.",
          "Niemals danach schicken - das belohnt das Durchbrechen.",
        ],
        warning: null,
      },
      {
        id: "silber",
        title: "Warten bei Bewegung und zweitem Dummy",
        criteria: "Hält den Sitz, während du fünf Schritte weggehst oder ein zweiter Dummy fliegt. Vier Durchgänge.",
        reps: 4,
        diagram: null,
        steps: [
          "Dummy werfen, du machst einen Schritt zur Seite.",
          "Dummy werfen, du gehst vier bis fünf Schritte weg.",
          "Dummy werfen, du gehst raus und setzt einen Markierstab.",
          "Ersten Dummy werfen, zweiten Dummy werfen, erst dann schicken.",
        ],
        tips: ["Schritt 4 ist die direkte Vorbereitung auf Doppelmarken in Track F."],
        warning: null,
      },
      {
        id: "gold",
        title: "Walk-up und Honouring",
        criteria: "Bleibt bei Fuß, wenn ein Dummy aus der Bewegung heraus fliegt. Und bleibt ruhig sitzen, während ein anderer Hund arbeitet. Je drei Durchgänge.",
        reps: 3,
        diagram: "walkup",
        steps: [
          "Walk-up: Hund läuft off-lead bei Fuß, ihr geht gemeinsam.",
          "Eine zweite Person wirft seitlich einen Dummy.",
          "Hund bleibt bei Fuß, ohne Kommando.",
          "Du hältst an, er sitzt automatisch. 2 bis 3 Sekunden Pause. Dann Apport.",
          "Honouring: Ein anderer Hund arbeitet in Sichtweite. Dein Hund sitzt und schaut zu. Mit großer Distanz beginnen.",
        ],
        tips: ["Krönung aller Steadiness-Arbeit.", "Anfangs langsam gehen und Dummy weit seitlich."],
        warning: null,
      },
    ],
  },

  {
    id: "E",
    name: "Abgabe",
    icon: "hand",
    short: "Sauber in die Hand geben",
    desc: "Die meisten Abgabeprobleme entstehen drei bis vier Schritte vor dem Hundeführer.",
    gear: ["Dummy"],
    requires: [],
    levels: [
      {
        id: "bronze",
        title: "In die Hand, ohne Ablegen",
        criteria: "Bringt den Dummy bis in die Hand, legt nicht ab, bei zehn Retrieves hintereinander.",
        reps: 3,
        diagram: null,
        steps: [
          "Kurze Retrieves, maximal 10 Meter.",
          "Sobald er zurückkommt: nicht stehen bleiben, sondern ein paar Schritte rückwärts gehen. Das zieht ihn bis an dich heran.",
          "Dummy ruhig abnehmen, eine Hand von unten unter das Kinn.",
          "Nicht sofort wegnehmen. Kurz halten, loben, dann abnehmen.",
        ],
        tips: [
          "Häufige Ursachen: Dummy zu schnell abgenommen, zu großes Theater, Hund kommt nicht weit genug heran.",
        ],
        warning: null,
      },
      {
        id: "silber",
        title: "Sitzen bei der Abgabe",
        criteria: "Sitzt vor dir ab und hält den Dummy, bis du ihn nimmst. Zehn Retrieves.",
        reps: 3,
        diagram: null,
        steps: [
          "Erst wenn Bronze sicher sitzt.",
          "Er kommt, sitzt vor dir ab, hält.",
          "Du gehst ein paar Schritte rückwärts, kommst zurück, nimmst dann erst ab. Das baut Geduld auf.",
        ],
        tips: ["Nie hetzen. Die Ruhe bei der Abgabe überträgt sich."],
        warning: null,
      },
      {
        id: "gold",
        title: "Abgabe unter Erregung",
        criteria: "Saubere Abgabe nach langem Retrieve, nach Wasserarbeit und nach Mehrfachmarken. Je drei Durchgänge.",
        reps: 3,
        diagram: null,
        steps: [
          "Nach langem Retrieve üben, wenn die Erregung hoch ist.",
          "Bei Wasser: direkt an der Wasserkante stehen. Verhindert Ablegen am Ufer und Schütteln vor der Abgabe.",
          "Nach Mehrfachmarken: zwischen den Retrieves bewusst Ruhe einbauen.",
        ],
        tips: [
          "Wenn er knautscht oder fallen lässt: Apportieren für diese Session beenden.",
          "Fehlverhalten nicht mit weiteren Retrieves belohnen.",
        ],
        warning: null,
      },
    ],
  },

  {
    id: "F",
    name: "Marking",
    icon: "target",
    short: "Einzel-, Doppel-, Dreifachmarke",
    desc: "Marking heißt: die Flugbahn verfolgen und sich die Position merken. Nicht den Dummy liegen sehen. Hohes Gras ist deshalb kein Hindernis.",
    gear: ["1-3 Dummys", "Markierstäbe"],
    requires: ["D:bronze", "E:bronze"],
    levels: [
      {
        id: "bronze",
        title: "Einzelmarke",
        criteria: "Direkter Weg hin und zurück, sauberes Apportieren, 20 bis 30 Meter, auf drei verschiedenen Geländearten je drei Durchgänge.",
        reps: 3,
        diagram: "single-mark",
        steps: [
          "Hund sitzt in Fuß oder Ran neben dir.",
          "Dummy hoch und weit werfen, damit die Flugbahn gut sichtbar ist.",
          "Warten, bis er fokussiert ist, dann Apport.",
          "Abgabe nach Track E.",
        ],
        tips: [
          "Maximal drei bis fünf Würfe.",
          "Markierstab optional, hilft dir selbst bei der Orientierung.",
        ],
        warning: null,
      },
      {
        id: "silber",
        title: "Doppelmarke",
        criteria: "Beide Dummys in richtiger Reihenfolge, Winkel mindestens 90 Grad, drei Durchgänge.",
        reps: 3,
        diagram: "double-mark",
        steps: [
          "Ersten Dummy werfen, etwa auf 10 Uhr, 25 Meter. Markierstab setzen.",
          "Hund wartet. Zweiten Dummy werfen, etwa auf 2 Uhr, 20 Meter. Markierstab setzen.",
          "Zuletzt geworfenen zuerst schicken. Der liegt frischer im Gedächtnis.",
          "Abnahme, kurze Pause, Körper zum ersten Dummy drehen, dann schicken.",
        ],
        tips: [
          "Der zweite Retrieve ist die eigentliche Gedächtnisaufgabe.",
          "Voraussetzung: Steadiness Silber Schritt 4 muss sitzen.",
        ],
        warning: null,
      },
      {
        id: "gold",
        title: "Dreifachmarke",
        criteria: "Alle drei in richtiger Reihenfolge, zwei komplette Sequenzen ohne Hilfe.",
        reps: 2,
        diagram: "triple-mark",
        steps: [
          "Drei Dummys in etwa 120-Grad-Abständen werfen.",
          "Reihenfolge immer rückwärts: zuletzt geworfen zuerst.",
          "Zwischen den Retrieves kurze Pause und neuer Fokus.",
          "Körper jeweils zur nächsten Position drehen.",
        ],
        tips: [
          "Maximal zwei Sequenzen, danach Ruhetag.",
          "Bei Gelenkeinschränkung zwei Ruhetage.",
        ],
        warning: "Hohe geistige und körperliche Beanspruchung.",
      },
    ],
  },

  {
    id: "G",
    name: "Nasenarbeit",
    icon: "nose",
    short: "Zone absuchen mit der Nase",
    desc: "Der Hund wird in eine Zone geschickt und sucht dort selbstständig. Kein Richtungskommando.",
    gear: ["Dummy", "Markierstab"],
    requires: [],
    levels: [
      {
        id: "bronze",
        title: "Zone auf kurzer Distanz",
        criteria: "Findet selbstständig ohne Hilfe, 15 Meter, kurzes Gras, drei verschiedene Richtungen.",
        reps: 3,
        diagram: null,
        steps: [
          "Dummy ablegen, während der Hund wegschaut. Markierstab setzen.",
          "Hund grob in die Richtung drehen.",
          "Verloren plus Trommelbewegung.",
          "Nicht eingreifen, solange er sucht.",
          "Wenn er aufgibt oder herausläuft: pip-peeeep, um ihn in der Zone zu halten.",
        ],
        tips: [
          "Zone anfangs klein, etwa 5 Meter Radius.",
          "Nie direkt zum Dummy zeigen.",
        ],
        warning: null,
      },
      {
        id: "silber",
        title: "Größere Zone mit Zeitverzögerung",
        criteria: "30 Meter, mittleres Gras, 2 Minuten Verzögerung, drei Durchgänge.",
        reps: 3,
        diagram: null,
        steps: [
          "Dummy auf 30 Meter ablegen, Markierstab setzen.",
          "Zwei Minuten weitergehen oder etwas anderes machen.",
          "Dann in die Zone schicken: Verloren plus Trommelbewegung.",
        ],
        tips: ["Immer nur eine Variable steigern. Erst Distanz, dann Gelände, dann Zeit."],
        warning: null,
      },
      {
        id: "gold",
        title: "Komplexes Gelände",
        criteria: "50 Meter und mehr, hohes Gras oder Waldrand, 5 Minuten Verzögerung, drei Durchgänge.",
        reps: 3,
        diagram: null,
        steps: [
          "Dummy in schwierigem Gelände ablegen, Markierstab setzen.",
          "Fünf Minuten spazieren.",
          "In die Zone schicken. Er muss sich an den Bereich erinnern und systematisch suchen.",
        ],
        tips: ["Bei Misserfolg: zurück auf eine Variable, nicht alles gleichzeitig reduzieren."],
        warning: null,
      },
    ],
  },

  {
    id: "H",
    name: "Richtung und Blind",
    icon: "compass",
    short: "Voran, Back, Links, Rechts, Blind",
    desc: "Hier wird aus Einzelteilen ein System. Immer erst Stopp-Pfiff, dann Handzeichen.",
    gear: ["Dummys", "Pfeife", "Markierstäbe"],
    requires: ["A:silber"],
    levels: [
      {
        id: "bronze",
        title: "Memory Retrieve und Voran",
        criteria: "Läuft auf Voran mindestens 35 Meter geradeaus auf einen unsichtbaren Dummy, auf zwei Geländestufen je drei Durchgänge.",
        reps: 3,
        diagram: "memory-retrieve",
        steps: [
          "Memory Retrieve: Hund bei Fuß, gemeinsam zum Ablagepunkt gehen, etwa 30 Meter.",
          "Dummy dort ablegen, der Hund sieht es. Markierstab setzen.",
          "Gemeinsam zurück zur Startposition.",
          "Kurze Pause, dann Apport. Er läuft mit Tempo, weil er genau weiß, wo der Dummy liegt.",
          "Verzögerung steigern: sofort, 30 Sekunden, 1 Minute, 3 Minuten.",
          "Voran einführen: Dummy sichtbar auf 15 Meter geradeaus auslegen.",
          "Hund bei Fuß, beide schauen in dieselbe Richtung. Voran plus Arm vollständig über Kopf.",
          "Distanz steigern, dann auf unsichtbaren Dummy wechseln.",
        ],
        tips: [
          "Einen natürlichen Korridor nutzen: Weg zwischen Büschen, Heckenreihe. Hält ihn auf der Linie.",
          "Effizient: beim Rundgang um ein Feld in jeder Ecke einen Dummy als Memory ablegen. Am Ende vier lange Memory Retrieves im vollen Galopp.",
        ],
        warning: null,
      },
      {
        id: "silber",
        title: "Back, Links, Rechts und Memory Blind",
        criteria: "Nimmt alle drei Richtungssignale nach Stopp-Pfiff an, auf 15 Meter je drei Durchgänge pro Richtung. Plus Memory Blind auf 35 Meter mit maximal einer Korrektur.",
        reps: 3,
        diagram: "directions",
        steps: [
          "Schritt 1: Back allein. Stopp-Pfiff, Arm über Kopf, Back. Kennt er als Voran-Variante, daher sofortiger Erfolg.",
          "Schritt 2: Eine Richtung allein. Dummy genau links ablegen, 5 Meter. Stopp-Pfiff, linker Arm, Links. Nur ein Dummy im Feld, er kann nicht falsch laufen.",
          "Schritt 3: Die andere Richtung allein. Dasselbe nach rechts.",
          "Schritt 4: Beide Richtungen mit Wahl. Erst hier lernt er den Unterschied.",
          "Schritt 5: Memory Blind. Dummy ohne Hund ablegen, an einem bekannten Ort. Voran, im Bereich dann Verloren.",
        ],
        tips: [
          "Übst du Rechts, legst du den linken Dummy weiter weg. Er dient als Ablenkung, und wenn der Hund falsch läuft, hast du Zeit zu stoppen.",
          "Memory-Mark-Blind-Formel: drei Retrieves auf dieselbe Stelle in einer Session. Erst Memory, dann Sichtmarke, dann Blind.",
          "Immer erst Stopp-Pfiff, dann Handzeichen. Nie Handzeichen ohne vorherigen Stopp.",
        ],
        warning: null,
      },
      {
        id: "gold",
        title: "Cold Blind, Clock Face, Kombination",
        criteria: "Findet einen unbekannten Blind auf 30 Meter mit maximal zwei Korrekturen, auf drei Geländestufen je drei Durchgänge.",
        reps: 3,
        diagram: "clockface",
        steps: [
          "Clock Face: Hund sitzt in der Mitte. 12 Uhr Back, 3 Uhr Rechts, 6 Uhr zu dir hin, 9 Uhr Links.",
          "Aufbau mit Markierstäben. Erst zwei Positionen, dann schrittweise mehr Dummys.",
          "Cold Blind: Dummy ablegen, ohne dass der Hund es sieht. Markierstab.",
          "Hund exakt ausrichten - sein Körper zeigt auf die Linie. Die Ausrichtung entscheidet.",
          "Voran plus Arm. Bei Abweichung: Pip, dann Richtungssignal, dann weiter.",
          "Im Bereich: Verloren plus Trommelbewegung.",
          "Kombination: Blind vorab ablegen (Zone A), Sichtmarke werfen (Zone B, 90 Grad versetzt). Erst Marke, dann Blind.",
        ],
        tips: [
          "Ziel ist der One-Cast Blind: hinlaufen, finden, zurückbringen, ohne eine einzige Korrektur.",
          "Beim Back mit dem rechten Arm soll er nach rechts abdrehen, beim linken Arm nach links. Konsistent bleiben.",
        ],
        warning: null,
      },
    ],
  },
];

// ─── Wasser-Modul ─────────────────────────────────────────────
export const WATER_MODULE = {
  name: "Wasser",
  desc: "Kein eigener Track, sondern eine Variante. Jede Übung aus Marking, Nasenarbeit oder Richtung kann ans Wasser verlegt werden, sobald sie an Land auf Silber sitzt.",
  rules: [
    "Nur im Sommer einführen. Kaltes Wasser beim Erstkontakt kann einen Hund dauerhaft abschrecken.",
    "Reihenfolge: ein paar Retrieves an Land, dann am Ufer, dann ins Wasser, dann über das Wasser.",
    "Drei erfolgreiche Retrieves pro Session reichen völlig.",
    "Keine neuen Konzepte am Wasser einführen. Nur wiederholen, was an Land sitzt.",
    "Du stehst direkt an der Wasserkante, um den Retrieve anzunehmen.",
    "Schwimmender Dummy, gut greifbar, gut sichtbar.",
  ],
  jointWarning:
    "Bei Gelenkeinschränkung nur flacher Einstieg. Kein Absprung von Uferkanten. Schwimmen selbst ist gelenkschonend, der Ein- und Ausstieg ist das Risiko.",
};

// ─── Session-Vorlagen ─────────────────────────────────────────
export const SESSION_TYPES = [
  {
    id: "voll",
    name: "Vollsession",
    icon: "target",
    duration: "15-20 Min",
    desc: "Mit Equipment, gezielter Fokus",
    blocks: [
      { role: "warmup",  minutes: 2,  label: "Warm-up",   hint: "Ein Level, das bereits sitzt. Bevorzugt Stopp-Pfiff, Rückruf oder Fuß." },
      { role: "main",    minutes: 12, label: "Hauptteil", hint: "Das aktuell offene Level. Maximal 5 Wiederholungen." },
      { role: "cooldown", minutes: 3, label: "Abschluss", hint: "Ein Level, das sicher gelingt. Bevorzugt Nasenarbeit oder einfache Marke." },
    ],
    allowedTracks: ["A", "B", "C", "D", "E", "F", "G", "H"],
  },
  {
    id: "kurz",
    name: "Kurzübung im Spaziergang",
    icon: "walk",
    duration: "5-10 Min",
    desc: "Kein Equipment nötig",
    blocks: [
      { role: "warmup",  minutes: 1, label: "Warm-up",   hint: "Kurz ankommen." },
      { role: "main",    minutes: 5, label: "Hauptteil", hint: "Ein Signal gezielt üben." },
      { role: "cooldown", minutes: 1, label: "Abschluss", hint: "Sicherer Erfolg." },
    ],
    allowedTracks: ["A", "B", "C"],
  },
  {
    id: "mini",
    name: "Mini-Session",
    icon: "pocket",
    duration: "5-10 Min",
    desc: "Pocket Dummy in der Jacke",
    blocks: [
      { role: "warmup",  minutes: 1, label: "Warm-up",   hint: "Zwei Stopps oder ein Rückruf." },
      { role: "main",    minutes: 6, label: "Hauptteil", hint: "Nasenarbeit oder einfache Marke." },
      { role: "cooldown", minutes: 1, label: "Abschluss", hint: "Zwei kurze Retrieves." },
    ],
    allowedTracks: ["A", "B", "C", "D", "E", "G"],
  },
];

export const SESSION_RULES = [
  "Der Hauptteil bestimmt den Sessiontyp. Braucht er Equipment, ist es eine Vollsession.",
  "Warm-up und Abschluss sind nie das aktuell offene Level. Sie müssen sicher gelingen.",
  "Nie zwei schwere Blöcke kombinieren.",
  "Die Summe der Wiederholungen bleibt unter dem Retrieve-Limit aus dem Hundeprofil.",
  "Nach dem Hauptteil keine neue Schwierigkeit mehr einführen.",
];

// ─── Hundeprofil und Belastungssteuerung ──────────────────────
export const PROFILE_FIELDS = {
  age: [
    { id: "welpe",      label: "Welpe (bis 12 Monate)" },
    { id: "junghund",   label: "Junghund (1-2 Jahre)" },
    { id: "erwachsen",  label: "Erwachsen (2-8 Jahre)" },
    { id: "senior",     label: "Senior (ab 8 Jahre)" },
  ],
  joints: [
    { id: "ok",         label: "Unauffällig" },
    { id: "leicht",     label: "Leichte Einschränkung" },
    { id: "deutlich",   label: "Deutliche Einschränkung" },
    { id: "unbekannt",  label: "Unbekannt" },
  ],
};

export const LOAD_LIMITS = {
  default:  { retrievesPerSession: 8, sessionsPerWeek: 2, restDays: 1 },
  leicht:   { retrievesPerSession: 5, sessionsPerWeek: 2, restDays: 1 },
  deutlich: { retrievesPerSession: 3, sessionsPerWeek: 1, restDays: 2 },
  welpe:    { retrievesPerSession: 3, sessionsPerWeek: 2, restDays: 1 },
  junghund: { retrievesPerSession: 5, sessionsPerWeek: 2, restDays: 1 },
  senior:   { retrievesPerSession: 5, sessionsPerWeek: 1, restDays: 2 },
};

export const JOINT_WARNINGS = {
  water:      "Nur flacher Einstieg, kein Absprung von Uferkanten.",
  multiMark:  "Viele Starts und Stopps, hohe Gelenkbelastung. Danach zwei Ruhetage.",
  hardStop:   "Stopp-Pfiff bevorzugt aus dem Trab üben, nicht aus dem vollen Galopp.",
  directions: "Enge Wendungen begrenzen.",
};

export const DISCLAIMER =
  "Die App ersetzt keine tierärztliche Beratung. Bei bekannten Vorerkrankungen Belastungsgrenzen mit dem Tierarzt abstimmen.";

// ─── Troubleshooting ──────────────────────────────────────────
export const TROUBLESHOOTING = [
  {
    id: "recall-dogs",
    problem: "Überhört den Rückruf bei spielenden Hunden",
    cause: "Nie unter dieser Reizstärke trainiert. Pfiff wurde in aussichtsloser Lage wiederholt.",
    fix: "Distanz massiv vergrößern, Check-in-Verhalten aufbauen, erst dann pfeifen. Nie zweimal pfeifen. Nach dem Rückruf wieder freigeben.",
    track: "B",
  },
  {
    id: "breaking",
    problem: "Bricht vor dem Schickkommando los",
    cause: "Steadiness zu schnell gesteigert. Irgendwann wurde nach dem Durchbrechen geschickt.",
    fix: "Zurück auf 3 Sekunden. Nach jedem Durchbrechen den Dummy selbst holen.",
    track: "D",
  },
  {
    id: "whining",
    problem: "Fiept oder winselt vor dem Schicken",
    cause: "Erwartungsdruck, zu viele Wiederholungen.",
    fix: "Anzahl der Retrieves pro Session reduzieren. Längere Pausen. Session beenden, bevor die Erregung hochkocht.",
    track: "D",
  },
  {
    id: "mouthing",
    problem: "Knautscht den Dummy",
    cause: "Übererregung oder zu viele Retrieves.",
    fix: "Apportieren für die Session beenden. Nicht mit weiteren Retrieves belohnen. Weniger Wiederholungen.",
    track: "E",
  },
  {
    id: "dropping",
    problem: "Lässt den Dummy vor dir fallen",
    cause: "Dummy wurde zu oft zu schnell abgenommen. Er kommt nicht weit genug heran.",
    fix: "Rückwärts gehen beim Ankommen. Dummy erst nach kurzem Halten abnehmen. Kein Theater.",
    track: "E",
  },
  {
    id: "overrun",
    problem: "Läuft am Dummy vorbei",
    cause: "Distanz vor dem Gelände erhöht.",
    fix: "Eine Variable zurück. Distanz verkürzen oder einfacheres Gelände.",
    track: "F",
  },
  {
    id: "detour",
    problem: "Kommt mit Umweg zurück",
    cause: "Zu viel Ansprache unterwegs, Unsicherheit.",
    fix: "Still sein, während er zurückkommt. Rückwärts gehen zieht ihn gerade.",
    track: "E",
  },
  {
    id: "offline",
    problem: "Weicht beim Blind von der Linie ab",
    cause: "Ausrichtung vor dem Schicken war ungenau.",
    fix: "Vor dem Schicken Körperachse prüfen. Korridor nutzen. Markierstab für deine eigene Orientierung.",
    track: "H",
  },
  {
    id: "self-stop",
    problem: "Stoppt von selbst beim Rausschicken",
    cause: "Zu viel Stopp-Pfiff-Training. Er antizipiert.",
    fix: "Stopp-Pfiff-Training pausieren. Nur freie Retrieves, bis er wieder flüssig läuft.",
    track: "A",
  },
  {
    id: "no-direction",
    problem: "Nimmt das Richtungssignal nicht an",
    cause: "Kein sauberer Stopp davor, oder zu früh beide Richtungen verlangt.",
    fix: "Zurück zu einer Richtung mit nur einem Dummy. Stopp muss vorher sitzen.",
    track: "H",
  },
  {
    id: "unsystematic",
    problem: "Sucht im Bereich nicht systematisch",
    cause: "Zone zu groß, oder zu oft reingeredet.",
    fix: "Zone verkleinern. Nicht eingreifen, solange er sucht.",
    track: "G",
  },
  {
    id: "water-refusal",
    problem: "Geht nicht ins Wasser",
    cause: "Erstkontakt war zu kalt, zu tief oder zu laut.",
    fix: "Komplett zurück an den Anfang. Flaches Wasser, Sommer, ohne Retrieve-Anspruch.",
    track: null,
  },
];

// ─── Trophaeen ────────────────────────────────────────────────
export const TROPHIES = [
  // Track-Trophaeen
  ...TRACKS.map((t) => ({
    id: `track-${t.id}`,
    name: `${t.name} gemeistert`,
    desc: `Gold in Track ${t.id} erreicht`,
    type: "track",
    condition: { track: t.id, level: "gold" },
  })),
  // Meilensteine
  { id: "first-session",  name: "Erster Schritt",     desc: "Erste Session dokumentiert",             type: "milestone", condition: { sessions: 1 } },
  { id: "sessions-10",    name: "Dranbleiber",        desc: "10 Sessions dokumentiert",               type: "milestone", condition: { sessions: 10 } },
  { id: "sessions-25",    name: "Routinier",          desc: "25 Sessions dokumentiert",               type: "milestone", condition: { sessions: 25 } },
  { id: "sessions-50",    name: "Dauerläufer",       desc: "50 Sessions dokumentiert",               type: "milestone", condition: { sessions: 50 } },
  { id: "all-bronze",     name: "Fundament",          desc: "Alle acht Tracks auf Bronze",            type: "milestone", condition: { allTracks: "bronze" } },
  { id: "all-silber",     name: "Fortgeschritten",    desc: "Alle acht Tracks auf Silber",            type: "milestone", condition: { allTracks: "silber" } },
  { id: "first-water",    name: "Wasserratte",        desc: "Erste Wasserarbeit dokumentiert",        type: "milestone", condition: { water: 1 } },
  { id: "one-cast",       name: "One-Cast Blind",     desc: "Blind ohne eine einzige Korrektur",      type: "milestone", condition: { manual: true } },
  { id: "all-gold",       name: "Gundog",             desc: "Alle acht Tracks auf Gold",              type: "final",     condition: { allTracks: "gold" } },
];

// ─── Methodische Grundprinzipien (fuer Basics-Tab) ────────────
export const PRINCIPLES = [
  { name: "Positive Verstärkung", desc: "Keine Korrekturreize. Fehler werden durch Neustart und Vereinfachung gelöst." },
  { name: "Errorless Learning",    desc: "Schwierigkeit so wählen, dass etwa 80 Prozent der Versuche gelingen. Lieber eine Stufe zurück." },
  { name: "Eine Variable pro Steigerung", desc: "Nie Distanz und Gelände gleichzeitig erhöhen. Nie Zeit und Distanz gleichzeitig." },
  { name: "Qualität vor Menge",   desc: "Lieber drei saubere Durchgänge als zehn mittelmäßige." },
  { name: "Positiver Abschluss",   desc: "Session endet mit einer Übung, die sicher gelingt." },
  { name: "Kein Drill",            desc: "Ständige Wiederholung einer einzelnen Stufe erzeugt Probleme. Bei zu viel Stopp-Pfiff-Training stoppt der Hund beim Rausschicken von selbst." },
];

export const SOURCES = [
  "Howard Kirby, Mullenscote Gundogs",
  "Mike Stewart, Wildrose Kennels",
  "Jeremy Hunt, Fenway Labradors",
  "Lez Graham",
  "Gundog Journal",
];
