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
      "Direkt nachdem er den Dummy aufgenommen hat (zerstört den flüssigen Rücklauf)",
      "Wenn du nicht durchsetzen kannst, dass er wirklich stoppt",
    ],
    note: "Das Signal bedeutet für den Hund: Halt an, pass auf, gleich kommt etwas Gutes. Der Stopp muss sich lohnen. Ein Durchgang pro Spaziergang, nicht mehr. Bei Stopp-Pfiff Bronze sind das fünf Stopps.",
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
  { word: "Voran",
    gesture: "Flache Hand auf der Hundeseite über den Kopf des HUNDES, " +
             "20 bis 30 cm davor, zeigt die Laufrichtung wie über Kimme und Korn",
    when: "Hund in Grundstellung neben dir" },
  { word: "Back",
    gesture: "Arm senkrecht über den EIGENEN Kopf",
    when: "Nach Stopp-Pfiff, Hund steht entfernt und sieht dich an",
    note: "Rechter Arm, der Hund dreht über die linke Schulter. " +
          "Spiegelbildlich, weil er dich ansieht." },
  { word: "Links",    gesture: "Linker Arm waagerecht ausgestreckt",     when: "Nach Stopp-Pfiff" },
  { word: "Rechts",   gesture: "Rechter Arm waagerecht ausgestreckt",    when: "Nach Stopp-Pfiff" },
  { word: "Verloren", gesture: "Trommelbewegung, Handfläche nach unten", when: "Nasenarbeit in der Zone" },
  { word: "Frei",     gesture: "Wischbewegung nach vorn",                when: "Ende der Übung" },
];

export const DIRECTION_NOTE =
  "Richtungsangaben sind immer aus deiner Sicht. Du streckst den linken Arm aus, der Hund läuft nach links von dir aus gesehen.";

// Die alte TERRAIN-Tabelle (Gelände je Stufe) ist entfallen. Einzige Wahrheitsquelle für Gelände ist
// TERRAIN_STEPS über den Pfad des Levels (fundament-umbau-2.md, Abschnitt 7).

// ─── Fundament: Distanz, Gelände, Bedingungen, Lernphasen (docs/fundament-umbau.md, Abschnitt 1) ──
export const DISTANCE_STEPS = [
  { id: 1, maxM: 15, label: "bis 15 m", paces: 20,
    note: "Einwirkungsbereich. Junghunde bleiben hier." },
  { id: 2, maxM: 30, label: "bis 30 m", paces: 40,
    note: "Prüfungsmaß DP-E." },
  { id: 3, maxM: 50, label: "bis 50 m", paces: 65,
    note: "Prüfungsmaß Dummy A." },
  { id: 4, maxM: 80, label: "bis 80 m", paces: 105,
    note: "Prüfungsmaß Dummy F." },
];

export const TERRAIN_STEPS = [
  { id: 1, label: "offen und einsehbar",
    examples: "Wiese, Acker, Stoppelfeld" },
  { id: 2, label: "niedrige Deckung",
    examples: "hohes Gras, Brache, lichter Bewuchs" },
  { id: 3, label: "hohe Deckung oder ein Geländewechsel",
    examples: "Mais, Schilf, Waldrand, Graben, Hecke" },
  { id: 4, label: "Wasser oder mehrere Wechsel",
    examples: "tiefes Gewässer, Graben plus Hecke" },
];

// Die acht veränderbaren Bedingungen (Zvolsky S. 71 f.).
// Variantenachse für alle Tracks ohne Distanzbezug.
export const CONDITIONS = [
  { id: "haltung",    label: "Haltung, Gestik, Mimik",
    examples: "stehend, laufend, Rücken zudrehen, am Boden, hinschauen oder wegschauen" },
  { id: "ort",        label: "Trainingsort",
    examples: "Bewuchs, Hintergrund, Untergrund, Haus, Garten" },
  { id: "gegenstand", label: "Trainingsgegenstände",
    examples: "Dummygewichte, Ball, Spezialdummy" },
  { id: "position",   label: "Entfernung und Position des Führers",
    examples: "neben, vor, nah, fern" },
  { id: "verleitung", label: "Verleitungen",
    examples: "andere Hunde, Menschen, Gegenstände, Winkel, andere Sequenzen" },
  { id: "ausgang",    label: "Ausgangssituation",
    examples: "sitzt, steht, läuft, liegt, apportiert" },
  { id: "belohnung",  label: "Aufbewahrungsort der Belohnung",
    examples: "Jackentasche, Hosentasche, Dummytasche, Schüssel am Boden" },
  { id: "wetter",     label: "Wetter",
    examples: "Sonne, Regen, Schnee, Nebel, Wind, Sturm, gegen die Sonne" },
];

// Lernphasen (Zvolsky S. 70 f.). Pro Level anzeigen, in welcher Phase
// der Nutzer sich befindet.
export const LEARNING_PHASES = [
  { id: "erlernen", label: "Erlernen",
    reinforce: "jedes Mal, hochwertig",
    conditions: "immer gleich, ablenkungsarm",
    goal: "Verhalten entsteht" },
  { id: "ueben", label: "Üben",
    reinforce: "unregelmäßig, nur bei optimaler Ausführung",
    conditions: "Rahmenbedingungen variieren",
    goal: "Qualität erhöhen" },
  { id: "festigen", label: "Festigen",
    reinforce: "variabel, nur bei optimalem Verhalten",
    conditions: "große Ablenkung, Konfliktsituationen",
    goal: "Verhalten unter allen Bedingungen" },
];

// Überschrift und Einleitung der steps-Liste je stepsType (fundament-umbau-5.md, Abschnitt 3)
export const STEPS_TYPES = {
  varianten: { title: "Aufbau über mehrere Wochen", intro: "In einem Durchgang arbeitest du an einer dieser Varianten, nicht an allen." },
  ablauf:    { title: "Ablauf eines Durchgangs",    intro: "So läuft ein Durchgang ab, von oben nach unten." },
};

// Bei jedem Levelwechsel anzuzeigen (Zvolsky, wörtlich)
export const LEVEL_CHANGE_WARNING =
  "Vermeiden Sie, eine noch nicht genügend gefestigte Übung mit Ablenkung zu trainieren. Das bereits erreichte Niveau wird gesenkt und somit das vorangegangene Training ad absurdum geführt.";

// ─── Tracks ───────────────────────────────────────────────────
export const TRACKS = [
  {
    id: "A",
    name: "Stopp-Pfiff",
    icon: "stop-whistle",
    group: "grund",
    short: "Anhalten und Sitzen auf einen kurzen Pip",
    desc: "Grundlage für alles. Ohne zuverlässigen Stopp ist kein Handling möglich.",
    axis: "bedingungen", // "bedingungen" | "distanz"
    minAgeMonths: null, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Kein Mindestalter, Appell und Abgabe von Anfang an",
    requires: [],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Stopp im Nahbereich",
        exam: "appell", // dp-e-korrektur.md, Abschnitt 4
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ausgang", variant: "Hund sitzt" },
          { condition: "ausgang", variant: "Hund steht" },
          { condition: "position", variant: "10 m Abstand" },
          { condition: "position", variant: "25 m Abstand" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Sitzt sofort auf einen leisen Pip, fünf von fünf Fällen, an drei verschiedenen Tagen.",
        run: "5 Stopps auf den leisen Pip aus einer der vier Varianten, über den Spaziergang verteilt. Dazwischen normal weitergehen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 1, steps: [4] }],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        stepsAsStufen: true, // die vier steps sind die Stufen, conditionPath wird nicht angezeigt (app-befund.md, Abschnitt 1) // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Hund geht bei Fuß. Leise Pip pfeifen. Er setzt sich sofort hin.",
          "Hund sitzt 20 große Schritte vor dir. Pip pfeifen. Er bleibt sitzen und schaut dich an.",
          "Rückruf pfeifen, dann auf halbem Weg Pip. Er stoppt sofort.",
          "Er stöbert wenige Meter vor dir. Pip pfeifen und gleichzeitig einen Dummy werfen. Der Dummy ist die Belohnung für den Stopp.",
        ],
        tips: [
          "Immer leise pfeifen. Lautstärke ist keine Steigerung, sondern Lärm.",
          "Im Alltag das Wort Sitz durch den Pfiff ersetzen. Kostet keine Trainingszeit.",
          "Ein Durchgang pro Spaziergang, nicht mehr.",
        ],
        warning: "Zu viele Wiederholungen führen dazu, dass der Hund beim Rausschicken von selbst stoppt.",
      },
      {
        id: "silber",
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Stopp auf Distanz und aus der Bewegung",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ausgang", variant: "Hund läuft auf dich zu" },
          { condition: "ausgang", variant: "Hund läuft von dir weg" },
          { condition: "position", variant: "35 m" },
          { condition: "verleitung", variant: "Dummy liegt in Sicht" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Stopp auf 25 Meter, auch beim Schnüffeln oder Laufen. Vier saubere Stopps in Folge, drei verschiedene Orte.",
        run: "4 saubere Stopps auf 25 Meter an einem Ort, jeder Stopp wird belohnt (Rückruf oder Dummywurf).",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 1, optional: true }],
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Stopp im Lauf auf den Dummy",
        exam: "appell",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ausgang", variant: "Hund läuft zum Dummy" },
          { condition: "verleitung", variant: "fremder Hund in Sicht" },
          { condition: "verleitung", variant: "Wild oder Vogel" },
          { condition: "ort", variant: "unbekanntes Gelände" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Stopp auf 40 Meter während des Laufs zum Dummy. Drei Durchgänge an drei Tagen, davon mindestens einer bei realer Ablenkung.",
        run: "Ein Stopp während des Laufs auf den Dummy, danach weiterschicken. Mehr nicht.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 1 }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        stepsAsStufen: true, // die vier steps sind die Stufen, conditionPath wird nicht angezeigt (app-befund.md, Abschnitt 1) // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
    icon: "recall",
    group: "grund",
    short: "Direktes Zurückkommen auf zwei lange Töne",
    desc: "Gerade Linie, kein Zickzack, kein Schnüffeln unterwegs.",
    axis: "bedingungen", // "bedingungen" | "distanz"
    minAgeMonths: null, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Kein Mindestalter, Appell und Abgabe von Anfang an",
    requires: [],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Rückruf aus ruhiger Situation",
        exam: "unterordnung", // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ort", variant: "Garten" },
          { condition: "ort", variant: "bekannte Wiese" },
          { condition: "verleitung", variant: "ein Mensch" },
          { condition: "position", variant: "aus dem Rücken gerufen" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "20 Meter, gerade Linie, Vorsitzen. Fünf schnelle Reaktionen auf das erste Signal in Folge.",
        run: "5 Rückrufe auf 20 Meter, jeder mit Lob und anschließender Freigabe.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        stepsAsStufen: true, // die vier steps sind die Stufen, conditionPath wird nicht angezeigt (app-befund.md, Abschnitt 1) // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Rückruf aus der Beschäftigung",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ort", variant: "unbekanntes Gelände" },
          { condition: "verleitung", variant: "fremder Hund" },
          { condition: "ausgang", variant: "aus dem Schnüffeln heraus" },
          { condition: "ausgang", variant: "aus dem Lauf heraus" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "40 Meter, Hund ist aktiv am Schnüffeln oder Suchen. Fünf schnelle Reaktionen in Folge.",
        run: "5 Rückrufe auf 40 Meter, jedes Mal erst abwarten, bis er wirklich vertieft ist.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        stepsAsStufen: true, // die vier steps sind die Stufen, conditionPath wird nicht angezeigt (app-befund.md, Abschnitt 1) // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Rückruf unter sozialer Ablenkung",
        exam: "appell",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "spielende Hunde" },
          { condition: "verleitung", variant: "Wildwitterung" },
          { condition: "ort", variant: "Wald mit Sichtverlust" },
          { condition: "wetter", variant: "Wind von vorn" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Kommt auf das erste Signal, während andere Hunde in der Nähe spielen. Drei Durchgänge an verschiedenen Tagen.",
        run: "Ein Rückruf auf der aktuellen Distanzstufe, danach wieder freigeben und weiterspielen lassen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        stepsAsStufen: true, // die vier steps sind die Stufen, conditionPath wird nicht angezeigt (app-befund.md, Abschnitt 1) // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
    icon: "heel",
    group: "grund",
    short: "Position, Tempo, Richtung",
    desc: "Ruhig neben dir, ohne Ziehen, ohne Vorauslaufen. In bewussten Phasen, nicht den ganzen Spaziergang.",
    axis: "bedingungen", // "bedingungen" | "distanz"
    minAgeMonths: null, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Kein Mindestalter, Appell und Abgabe von Anfang an",
    requires: [],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "50 Meter ohne Ziehen",
        exam: "unterordnung", // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "haltung", variant: "gerade Linie" },
          { condition: "haltung", variant: "Richtungswechsel" },
          { condition: "haltung", variant: "Tempowechsel" },
          { condition: "haltung", variant: "Stopp aus der Bewegung" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "50 Meter off-lead bei Fuß auf bekanntem Weg, keine Leinenspannung, kein Vorlaufen.",
        run: "2 bewusste Fuß-Phasen à 50 Meter, jeweils angekündigt und mit Freigabe beendet.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Bewusste Fuß-Phase ankündigen, 50 Meter gehen, dann freigeben.",
          "Wenn er vorzieht: stehen bleiben und warten, bis er zurückkommt. Kein Kommentar.",
        ],
        tips: ["Kurze Phasen, dafür sauber. Nicht den ganzen Spaziergang."],
        warning: null,
      },
      {
        id: "silber",
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Tempo- und Richtungswechsel",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Dummys am Boden" },
          { condition: "ort", variant: "unbekanntes Gelände" },
          { condition: "verleitung", variant: "Menschen" },
          { condition: "gegenstand", variant: "mit Dummy im Fang" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Bleibt bei Fuß bei abrupten Tempo- und Richtungswechseln, 100 Meter am Stück.",
        run: "100 Meter am Stück mit mindestens 4 Tempowechseln und 2 Kehrtwendungen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Tempo variieren, Kehrtwendungen gehen, stehenbleiben und weitergehen.",
          "Er muss dich beobachten statt nebenher zu laufen.",
        ],
        tips: ["Unvorhersehbar sein. Das erzeugt Aufmerksamkeit."],
        warning: null,
      },
      {
        id: "gold",
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Automatisches Sitzen unter Ablenkung",
        exam: "appell",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "fremde Hunde" },
          { condition: "verleitung", variant: "fliegendes Dummy" },
          { condition: "ort", variant: "Prüfungsähnliche Linie" },
          { condition: "wetter", variant: "Regen oder Wind" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Du bleibst stehen, Hund sitzt automatisch ohne Kommando - auch bei Fahrrad oder Jogger. Fünf Mal in Folge.",
        run: "5 Halts ohne Kommando, davon mindestens 2 mit vorbeikommender Ablenkung.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
    icon: "steadiness",
    group: "apport",
    short: "Warten statt Losrennen",
    desc: "Erweiterung des Grundgehorsams. Der Hund entscheidet selbst zu warten. Immer off-lead - mit Leine trainierst du nichts.",
    axis: "bedingungen", // "bedingungen" | "distanz"
    minAgeMonths: 10, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Steadiness setzt Markierungen voraus",
    requires: ["C:bronze"],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Warten nach dem Wurf",
        exam: ["doppelmarkierung", "verspaetet"], // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Dummy wird fallen gelassen" },
          { condition: "verleitung", variant: "Dummy wird kurz geworfen" },
          { condition: "verleitung", variant: "Dummy weit geworfen" },
          { condition: "position", variant: "du gehst zwei Schritte weg" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Wartet 8 Sekunden ruhig nach dem Dummy-Wurf, ohne durchzubrechen. Drei Durchgänge.",
        run: "4 Würfe mit Wartezeit auf der aktuellen Stufe (3, 5 oder 8 Sekunden), danach Apport.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 1 }],
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Hund sitzt off-lead in Fuß oder Ran.",
          "Dummy werfen. Nichts sagen.",
          "3 Sekunden warten, dann Apport.",
          "Schrittweise auf 5 und 8 Sekunden steigern.",
          "Variante verspätetes Schicken: Hund setzen, Dummy etwa 10 m vor ihm werfen lassen, dann mit dem Hund weitere 20 m gehen, setzen, und von dort schicken.",
        ],
        tips: [
          "Wenn er durchbricht: Dummy selbst holen, zurück zum Ausgangspunkt, neu beginnen.",
          "Niemals danach schicken - das belohnt das Durchbrechen.",
        ],
        warning: null,
      },
      {
        id: "silber",
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Warten bei Bewegung und zweitem Dummy",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "zwei Dummys nacheinander" },
          { condition: "verleitung", variant: "Werfer wirft" },
          { condition: "position", variant: "du holst selbst" },
          { condition: "ausgang", variant: "aus der Bewegung" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Hält den Sitz, während du fünf Schritte weggehst oder ein zweiter Dummy fliegt. Drei Durchgänge.",
        run: "4 Wiederholungen einer Variante (Schritt zur Seite, Weggehen, Markierstab setzen, zweiter Dummy).",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }, { id: "markierstab", n: 4, steps: [3] }],
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        stepsAsStufen: true, // die vier steps sind die Stufen, conditionPath wird nicht angezeigt (app-befund.md, Abschnitt 1) // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        minAgeMonths: 12, // überschreibt den Track-Wert
        minAgeNote: "Walk-up ohne Leine ab ca. 12 Monaten",
        title: "Standruhe in Verbindung mit Markieren (Walk Up)",
        exam: "walkup",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "anderes Gespann arbeitet zuerst" },
          { condition: "ausgang", variant: "Walk-up-Linie in Bewegung" },
          { condition: "verleitung", variant: "Schuss" },
          { condition: "ort", variant: "Prüfungsgelände" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Bleibt in der Linie bei Fuß, wenn aus der Bewegung ein Dummy fliegt, auch wenn ein anderes Gespann vor dir arbeitet. Drei Durchgänge.",
        run: "In der Linie gehen, Dummy fliegt aus der Bewegung, ein anderes Gespann arbeitet zuerst.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 1, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }, { id: "schreckschuss", n: 1, optional: true }],
        setup: ["Werfer", "Mindestens ein weiteres Gespann oder ein Helfer mit Hund"], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: "walkup",
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "In der Linie gehen, Hund frei bei Fuß. Walk-up ohne Leine ab etwa 12 Monaten.",
          "Aus der Bewegung fliegt ein Dummy. Die Linie bleibt stehen, der Hund setzt sich ohne Signal.",
          "Ein anderes Gespann arbeitet zuerst. Der Hund bleibt sitzen und beobachtet.",
          "Erst dann wird er geschickt, oder gar nicht.",
          "Steigerung: Schuss statt Zuruf als Signal für den Wurf.",
        ],
        tips: [
          "80 Prozent der geworfenen Dummys holt der Führer selbst, der Hund nur 20 Prozent. Das ist das Verhältnis, mit dem Steadiness entsteht.",
          "Springt der Hund ein: Dummy selbst holen, zurück zum Ausgangspunkt, neu beginnen. Nicht hinterherschicken, das belohnt genau das Einspringen.",
          "Hände in die Jackentaschen während der Wartezeit. Hunde springen oft ein, weil der Führer mit den Händen herumfuchtelt.",
        ],
        warning: null,
      },
    ],
  },

  {
    id: "E",
    name: "Abgabe",
    icon: "delivery",
    group: "apport",
    short: "Sauber in die Hand geben",
    desc: "Die meisten Abgabeprobleme entstehen drei bis vier Schritte vor dem Hundeführer.",
    axis: "bedingungen", // "bedingungen" | "distanz"
    examNote: "Kein eigenes Prüfungsfach, wird in jedem Fach mitbewertet.",
    minAgeMonths: null, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Kein Mindestalter, Appell und Abgabe von Anfang an",
    requires: [],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "In die Hand, ohne Ablegen",
        exam: null,
        examClass: null,
        maxDistanceStep: null,
        conditionPath: [
          { condition: "gegenstand", variant: "Welpendummy 200 g" },
          { condition: "gegenstand", variant: "Juniordummy 400 g" },
          { condition: "belohnung", variant: "Hand leer" },
          { condition: "position", variant: "Abgabe im Stehen vorn" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Bringt den Dummy bis in die Hand, legt nicht ab, bei zehn Retrieves hintereinander.",
        run: "10 kurze Retrieves bis 10 Meter, jedes Mal rückwärts gehen und ruhig abnehmen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 5, // Belastungspunkte pro Durchgang
        gear: [{ id: "welpendummy", n: 1 }, { id: "juniordummy", n: 1 }], // Teil 3, Abschnitt 6: Standard 500 g erst ab E Silber
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        amount: { n: 10, unit: "Retrieves" }, // zählbare Menge aus run, für Kürzung bei Belastungslimit
        diagram: null,
        stepsType: "varianten",
        stepsAsStufen: true, // die vier steps sind die Stufen, conditionPath wird nicht angezeigt (app-befund.md, Abschnitt 1) // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Sitzen bei der Abgabe",
        exam: null,
        examClass: null,
        maxDistanceStep: null,
        conditionPath: [
          { condition: "gegenstand", variant: "Standard 500 g" },
          { condition: "gegenstand", variant: "Kaltwild oder Fell" },
          { condition: "position", variant: "Abgabe seitlich aus Fuß" },
          { condition: "ausgang", variant: "Festhalten bis zum Aus-Signal" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Sitzt vor dir ab und hält den Dummy, bis du ihn nimmst. Zehn Retrieves.",
        run: "10 Retrieves mit Vorsitzen und Halten, bis du den Dummy nimmst.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 5, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 1 }],
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        amount: { n: 10, unit: "Retrieves" }, // zählbare Menge aus run, für Kürzung bei Belastungslimit
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Abgabe unter Erregung",
        exam: null,
        examClass: null,
        maxDistanceStep: null,
        conditionPath: [
          { condition: "gegenstand", variant: "nasses Dummy" },
          { condition: "gegenstand", variant: "sperriger Gegenstand" },
          { condition: "verleitung", variant: "zweites Dummy liegt bereit" },
          { condition: "ort", variant: "Prüfungssituation" },
        ], // je Schritt eine Bedingung (Abschnitt 7)
        criteria: "Saubere Abgabe bei hoher Erregung. Drei Durchgänge, jeder mit allen drei Situationen: nach langem Retrieve, nach Wasserarbeit, nach Mehrfachmarke.",
        run: "3 Abgaben in hoher Erregung, je eine nach langem Retrieve, nach Wasser und nach Mehrfachmarke.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 3, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
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
    icon: "marking",
    group: "suche",
    short: "Markierungen sehen, erinnern und holen, von der Einzelmarkierung bis zur Doppelmarkierung.",
    desc: "Marking heißt: die Flugbahn verfolgen und sich die Position merken. Nicht den Dummy liegen sehen. Hohes Gras ist deshalb kein Hindernis.",
    axis: "distanz", // "bedingungen" | "distanz"
    minAgeMonths: 10, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Markierungen 8 bis 10 Monate, und nur wenn steady",
    minAgeSuffix: "nach dem Zahnwechsel", // nur F (fundament-umbau-4.md, Abschnitt 4)
    requires: ["D:bronze", "E:bronze"],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Einzelmarke",
        exam: "markierapport", // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: 2,
        path: [{ d: 1, g: 1 }, { d: 2, g: 1 }, { d: 1, g: 2 }, { d: 2, g: 2 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Direkter Weg hin und zurück, sauberes Apportieren, 20 bis 30 Meter. Drei Durchgänge, verteilt auf drei verschiedene Geländearten.",
        run: "3 bis 5 Einzelmarken auf 20 bis 30 Meter auf einer Geländeart.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 4, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 1 }, { id: "markierstab", n: 4, optional: true }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        amount: { n: 5, min: 3, unit: "Einzelmarken" }, // zählbare Menge aus run, für Kürzung bei Belastungslimit
        diagram: "single-mark",
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Hund sitzt in Fuß oder Ran neben dir.",
          "Dummy hoch und weit werfen, damit die Flugbahn gut sichtbar ist.",
          "Warten, bis er fokussiert ist, dann Apport.",
          "Abgabe nach Track E.",
          "Variante Doppelmarkierung DP-E: Zwei Dummys werfen lassen, Winkel mindestens 90 Grad. Du holst den zuerst geworfenen selbst, der Hund bleibt sitzen. Dann schickst du ihn zum zuletzt geworfenen.",
          "Variante Halbblind: Hund holt ein geworfenes Dummy. Während er zurückläuft, legt ein Helfer an derselben Stelle ein zweites ab. Dann schicke ihn erneut.",
        ],
        tips: [
          "Maximal drei bis fünf Würfe.",
          "Markierstab optional, hilft dir selbst bei der Orientierung.",
        ],
        warning: null,
      },
      {
        id: "silber",
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Doppelmarke",
        exam: "markierung",
        examClass: "A",
        maxDistanceStep: 3,
        path: [{ d: 2, g: 2 }, { d: 3, g: 2 }, { d: 2, g: 3 }, { d: 3, g: 4 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Beide Dummys in richtiger Reihenfolge, Winkel mindestens 90 Grad, drei Durchgänge.",
        run: "2 Doppelmarken-Sequenzen, jeweils zuletzt geworfener Dummy zuerst.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 4, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }, { id: "markierstab", n: 4 }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        amount: { n: 2, unit: "Doppelmarken-Sequenzen" }, // zählbare Menge aus run, für Kürzung bei Belastungslimit
        diagram: "double-mark",
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Ersten Dummy werfen, etwa auf 10 Uhr, 25 Meter. Markierstab setzen.",
          "Hund wartet. Zweiten Dummy werfen, etwa auf 2 Uhr, 20 Meter. Markierstab setzen.",
          "Zuletzt geworfenen zuerst schicken. Der liegt frischer im Gedächtnis.",
          "Abnahme, kurze Pause, Körper zum ersten Dummy drehen, dann schicken.",
          "Variante Memory: Dummy sichtbar werfen, Hund wartet, ihr wechselt die Position um mindestens 20 Meter, dann von dort schicken.",
        ],
        tips: [
          "Der zweite Retrieve ist die eigentliche Gedächtnisaufgabe.",
          "Voraussetzung: Steadiness Silber muss sitzen.",
        ],
        warning: null,
      },
      {
        id: "gold",
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Doppelmarkierung auf F-Niveau",
        exam: "markierung",
        examClass: "F",
        maxDistanceStep: 4,
        path: [{ d: 3, g: 3 }, { d: 4, g: 3 }, { d: 3, g: 4 }, { d: 4, g: 4 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Beide Dummys in der vorgegebenen Reihenfolge, bis 80 Meter, mindestens ein Dummy in Deckung oder über Wasser. Drei Durchgänge.",
        run: "Zwei Dummys im engen Winkel werfen lassen, Reihenfolge vorgeben, eines aus Deckung oder über Wasser.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }, { id: "markierstab", n: 4 }],
        setup: ["Werfer oder Wurfgerät", "Gelände mit Sichtkante oder Wasser"], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null, // offen: fundament-umbau-2.md nennt kein Diagramm (vorher triple-mark)
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Zwei Dummys werfen lassen, Winkel enger als 90 Grad. Der enge Winkel ist die eigentliche Schwierigkeit, nicht die dritte Marke.",
          "Der Hund wartet beide Würfe ab, ohne einzuspringen.",
          "Reihenfolge vorgeben, in der Prüfung gibt sie der Richter vor. Im Training wechseln, damit der Hund keine Gewohnheit aufbaut.",
          "Mindestens ein Dummy hinter einer Sichtkante oder über Wasser.",
          "Zweites Dummy erst schicken, wenn das erste korrekt abgegeben ist.",
        ],
        tips: [
          "Nicht immer dieselbe Reihenfolge verlangen, sonst merkt sich der Hund die Reihenfolge statt die Fallstellen.",
          "Markierstäbe als Sichthilfe für den Hund, mindestens vier aufstellen, sonst wird der einzelne Stab selbst zum Ziel.",
        ],
        warning: null,
      },
    ],
  },

  {
    id: "G",
    name: "Nasenarbeit",
    icon: "scenting",
    group: "suche",
    short: "Zone absuchen mit der Nase",
    desc: "Der Hund wird in eine Zone geschickt und sucht dort selbstständig. Kein Richtungskommando.",
    axis: "distanz", // "bedingungen" | "distanz"
    minAgeMonths: 12, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Verlorensuche systematisch ab 12 Monaten",
    // Suchen-Regeln, gelten in allen drei G-Leveln (fundament-umbau-2.md, Abschnitt 6)
    searchRules: [
      "Suchengebiet mit natürlicher Begrenzung, bei Prüfungen 50 mal 50 Meter.",
      "Halbkreisförmiges Auslegen um den Hund herum, 10 bis 15 Meter Abstand. Das minimiert die Tauschgefahr.",
      "Immer zehn oder mehr Dummys auslegen, aber den Hund nur einen wechselnden Teil holen lassen. Den Rest holt der Führer selbst, sichtbar für den Hund.",
      "Anzahl variieren, sonst gewöhnt sich der Hund an eine feste Zahl.",
      "Wind: Gegenwind bedeutet frühes Revieren. Seitenwind ist leicht, den Ansatzpunkt wandern lassen. Rückenwind heißt erst tief hinein, dann zurücksuchen.",
      "Suchenstil messen: farbige Dummys in farbgleichen Reihen auslegen. An der Farbe erkennt man, ob der Hund vorne oder hinten sucht.",
      "Nasenarbeit ist Schwerstarbeit. Die Nase muss feucht sein, sonst sinkt die Leistung. Bei Nasenarbeit braucht der Hund genügend Wasser. Der Zickzackkurs dient auch der Nasenerholung, weil sich die Riechzellen an gleichartige Gerüche gewöhnen.",
    ],
    requires: [],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Zone auf kurzer Distanz",
        exam: "verlorensuche", // dp-e-korrektur.md, Abschnitt 4
        examClass: "A",
        maxDistanceStep: 2,
        path: [{ d: 1, g: 1 }, { d: 2, g: 1 }, { d: 1, g: 2 }, { d: 2, g: 2 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Findet in einer freien Verlorensuche Dummys in einem begrenzten Gebiet, bis 30 Meter, ohne Verzögerung. Drei Durchgänge.",
        run: "Dummys im Halbkreis auslegen, Hund schicken, Suchensignal erst wenn er Witterung bekommt.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 10, orMore: true }, { id: "suchdummy", n: 2, steps: [1, 2] }], // Suchendummys als Aufbauhilfe nur auf Schritt 1 und 2 (Teil 3, Abschnitt 5)
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [ // fundament-umbau-4.md, Abschnitt 2
          "Suchengebiet mit natürlicher Begrenzung wählen, etwa Hecke, Weg oder Grabenkante. Die Begrenzung hält den Hund im Gebiet, ohne dass du lenken musst.",
          "Zehn oder mehr Dummys im Halbkreis um den Hund auslegen, 10 bis 15 Meter Abstand zueinander. Der Hund sieht dabei zu. Der Halbkreis minimiert die Tauschgefahr.",
          "Hund schicken. Das Suchensignal nicht automatisch geben, sondern genau in dem Moment, in dem er Witterung bekommt.",
          "Zwei bis drei Dummys holen lassen, den Rest selbst holen, sichtbar für den Hund.",
          "Die Anzahl bei jeder Wiederholung ändern, sonst gewöhnt er sich an eine feste Zahl.",
        ],
        tips: [
          "Nie direkt zum Dummy zeigen.",
        ],
        warning: null,
      },
      {
        id: "silber",
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Größere Zone mit Zeitverzögerung",
        exam: "verlorensuche", // restposten.md, Abschnitt 4
        examClass: "A",
        maxDistanceStep: 3,
        path: [{ d: 2, g: 2 }, { d: 3, g: 2 }, { d: 2, g: 3 }, { d: 3, g: 3, delay: "2 Minuten zwischen Auslegen und Schicken" }], // Distanz- und Geländestufe je Schritt (Abschnitt 7), Verzögerung nur auf Schritt 4 (fundament-umbau-2.md, Abschnitt 6)
        criteria: "Findet drei bis fünf Dummys in einem begrenzten Suchengebiet, bis 50 Meter. Auf der letzten Stufe mit zwei Minuten Verzögerung zwischen Auslegen und Schicken. Drei Durchgänge.",
        run: "Zehn oder mehr Dummys im Halbkreis auslegen, den Hund drei bis fünf holen lassen, den Rest selbst holen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 3, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 10, orMore: true }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [ // fundament-umbau-4.md, Abschnitt 2
          "Zehn oder mehr Dummys im Halbkreis auslegen, ohne dass der Hund zusieht.",
          "Wind prüfen und den Ansatz danach wählen: bei Gegenwind früh revieren lassen, bei Seitenwind den Ansatzpunkt wandern lassen, bei Rückenwind erst tief hinein und dann zurücksuchen.",
          "Hund schicken, drei bis fünf Dummys holen lassen.",
          "Nur auf der letzten Stufe: zwei Minuten warten, bevor du schickst.",
        ],
        tips: [
        ],
        warning: null,
      },
      {
        id: "gold",
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Komplexes Gelände",
        exam: "verlorensuche", // restposten.md, Abschnitt 4
        examClass: "F",
        maxDistanceStep: 4,
        path: [{ d: 3, g: 3 }, { d: 4, g: 3 }, { d: 3, g: 4 }, { d: 4, g: 4, delay: "5 Minuten" }], // Distanz- und Geländestufe je Schritt (Abschnitt 7), Verzögerung nur auf Schritt 4 (fundament-umbau-2.md, Abschnitt 6)
        criteria: "Findet acht Dummys in einem Suchengebiet von 50 mal 50 Metern, bis 80 Meter. Auf der letzten Stufe mit fünf Minuten Verzögerung. Drei Durchgänge.",
        run: "Suchengebiet mit natürlicher Begrenzung abstecken, zehn oder mehr Dummys auslegen, acht holen lassen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 3, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 10, orMore: true }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [ // fundament-umbau-4.md, Abschnitt 2
          "Suchengebiet von 50 mal 50 Metern abstecken, so groß wie in der Prüfung.",
          "Zehn oder mehr Dummys verdeckt auslegen.",
          "Acht Dummys holen lassen.",
          "Suchenstil messen: farbige Dummys in farbgleichen Reihen auslegen. An der Farbe der gebrachten Dummys erkennst du, ob der Hund vorne oder hinten sucht.",
          "Nur auf der letzten Stufe: fünf Minuten warten, bevor du schickst.",
        ],
        tips: [
          "Bei Misserfolg: zurück auf eine Variable, nicht alles gleichzeitig reduzieren.",
        ],
        warning: null,
      },
    ],
  },

  {
    id: "H",
    name: "Richtung und Blind",
    icon: "directions",
    group: "handling",
    short: "Voran, Back, Links, Rechts, Blind",
    desc: "Hier wird aus Einzelteilen ein System. Immer erst Stopp-Pfiff, dann Handzeichen.",
    axis: "distanz", // "bedingungen" | "distanz"
    minAgeMonths: 12, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Folgt auf Markierung und Suche",
    requires: ["A:silber", "F:silber", "G:silber"],
    levels: [
      {
        id: "bronze",
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Voran - die gerade Linie",
        exam: "einweisen",
        examClass: "F",
        maxDistanceStep: 2,
        path: [{ d: 1, g: 1 }, { d: 1, g: 1 }, { d: 2, g: 1 }, { d: 2, g: 1 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Läuft auf Handzeichen und Signal in gerader Linie vom Führer weg und nimmt ein nicht sichtbar ausgelegtes Dummy auf. Bis 30 Meter. Drei Durchgänge.",
        run: "Dummy an der Leitlinie auslegen, Hund ausrichten, mit Handzeichen und Voran schicken.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 1, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "futterschuessel", n: 1 }, { id: "dummy", n: 1 }],
        setup: ["Leitlinie im Gelände", "Optional ein Helfer für das Halbblind"], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null, // offen: fundament-umbau-2.md nennt kein Diagramm
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Futterschüssel an einer Leitlinie (Weg, Zaun, Grabenkante) auslegen, Hund daneben ausrichten, Handzeichen, Signal. Die Leitlinie macht die gerade Linie für den Hund selbsterklärend.",
          "Entfernung vergrößern, Leitlinie beibehalten.",
          "Zwei Schüsseln als Ablenkung, der Hund muss die ausgerichtete nehmen.",
          "Dummy statt Schüssel.",
          "Halbblind: Ein Helfer legt nach, während der Hund zurückläuft. Der Hund weiß, dass dort etwas liegt, hat es aber nicht gesehen.",
          "Vollblind: vorher ausgelegt, der Hund hat nichts gesehen.",
        ],
        tips: [
          "Hand hochkant, 20 bis 30 cm vor dem Hundekopf, wie über Kimme und Korn.",
          "Üben Sie Voran niemals mit Wind von vorn. Bei Gegenwind reviert der Hund statt zu laufen.",
          "Ritualisieren: immer dieselbe Körperhaltung. Ändert sie sich, fehlt dem Hund die Motivation.",
          "Pushen: das Signal vor Hindernissen wiederholen.",
          "Linker Arm für Voran, rechter Arm für Markierungen, als klare Unterscheidung.",
        ],
        warning: null,
      },
      {
        id: "silber",
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Richtungssignale",
        exam: "einweisen",
        examClass: "F",
        maxDistanceStep: 3,
        path: [{ d: 1, g: 1 }, { d: 2, g: 1 }, { d: 1, g: 2 }, { d: 2, g: 2 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Nimmt nach dem Stopp-Pfiff Back, Rechts und Links an und läuft in die gezeigte Richtung. Bis 30 Meter. Drei Durchgänge.",
        run: "Hund auf Distanz stoppen, Arm neutral vor die Brust, zwei Sekunden warten, dann ein Richtungssignal.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 2 }],
        setup: ["Offenes Gelände"], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: "directions",
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Bindeglied: Jede Richtungsübung beginnt mit Stopp-Pfiff und erhobenem Arm. Ohne sauberen Stopp kein Richtungssignal.",
          "Back-Timing: Stopp-Pfiff, Arm in neutrale Position vor der Brust, zwei Sekunden Pause, dann Arm nach oben schnellen, Signal während der Armbewegung. Arm oben stehen lassen.",
          "Drehrichtung beachten: rechter Arm, der Hund dreht über die linke Schulter. Spiegelbildlich, weil er dich ansieht.",
          "Erst eine Richtung allein, dann die andere allein, dann beide mit Wahl.",
          "Variante Voran auf der Uhr: enge Winkel beim Voran. Der Hund wird aus derselben Position in leicht versetzte Richtungen geschickt, die Winkel werden schrittweise enger. Das ist eine Voran-Übung, nicht eine Einweisen-Übung nach dem Stopp.",
        ],
        tips: [
          "Nicht einseitig aus der Fuß-Position üben, sonst kommt der Hund beim Pfiff zurück statt zu stoppen.",
          "Belohnungsapport für Fortgeschrittene: Dummy über den Hund hinweg nach hinten oder seitlich werfen und mit Back beziehungsweise der Seitenrichtung schicken. So wird der Stopp selbst zur Einweise-Übung.",
        ],
        warning: "Die Reihenfolge ist im Buch festgelegt und darf nicht geändert werden: Voran, dann Back, dann Rechts und Links. Rechts und Links sind für den Hund leichter, werden aber zuletzt aufgebaut, um ihn nicht zu verwirren.",
      },
      {
        id: "gold",
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Einweisen in ein Suchengelände",
        exam: "einweisen",
        examClass: "O",
        maxDistanceStep: 4,
        path: [{ d: 2, g: 2 }, { d: 3, g: 2 }, { d: 3, g: 3 }, { d: 4, g: 3 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Wird auf ein nicht sichtbar ausgelegtes Dummy in ein Suchengelände eingewiesen und arbeitet dort selbstständig. Bis 80 Meter, maximal zwei Korrekturen. Drei Durchgänge.",
        run: "Dummy vorher ins Suchengelände legen, Hund einweisen, am Ziel das Suchensignal geben, dann nicht mehr lenken.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 1, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 1 }, { id: "suchdummy", n: 1, optional: true }], // Suchendummy optional für die Kleine Suche am Zielort (Teil 3, Abschnitt 5)
        setup: ["Suchengelände mit natürlicher Begrenzung"], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: "einweisen-gelaende",
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Dummy ohne Hund auslegen, Auslegefährte vermeiden (nicht auf direktem Weg zurücklaufen).",
          "Hund exakt ausrichten. Buch S. 53: Ist der Hundeführer richtig ausgerichtet, ist der Hund es auch. Die Fuß-Position links existiert genau dafür.",
          "Voran. Bei Abweichung Stopp-Pfiff, dann Richtungssignal.",
          "Am Zielgelände das Suchensignal geben, und zwar nicht automatisch, sondern in dem Moment, in dem der Hund Witterung bekommt. Arm seitlich nach unten, Handfläche zum Hund.",
          "Ab dort arbeitet der Hund selbstständig. Nicht weiter lenken.",
        ],
        tips: [
          "Hier gilt die Kleine Suche: enger Bereich, tiefe Nase, ruhig. Nicht zu verwechseln mit der Großen Suche der freien Verlorensuche.",
          "Maximal zwei Korrekturen. Im Regelwerk ist zu viel oder zu laute Lenkung ein schwerer Fehler.",
          "Gegenwind vermeiden, siehe H Bronze.",
        ],
        warning: null,
      },
    ],
  },
];

// ─── Wasser-Modul ─────────────────────────────────────────────
export const WATER_MODULE = {
  name: "Wasser",
  // Wasser ist im D/G-Modell die Geländestufe G4 (fundament-umbau-2.md, Abschnitt 0). Kein eigener Track.
  examNote: "Wasser ist in Dummy A ein eigenes Prüfungsfach.",
  gearLabel: "1 Dummy, schwimmfähig",
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
// Minuten für Warm-up und Abschluss (Cool Down) nach fundament-umbau-2.md, Abschnitt 8. duration = Summe der Blöcke.
export const SESSION_TYPES = [
  {
    id: "voll",
    name: "Vollsession",
    short: "Vollsession",
    icon: "target",
    duration: "37 Min",
    desc: "Mit Equipment, gezielter Fokus",
    blocks: [
      { role: "warmup",  minutes: 15, label: "Erster Teil",   hint: "Ein Level, das bereits sitzt. Bevorzugt Stopp-Pfiff, Rückruf oder Fuß." },
      { role: "main",    minutes: 12, label: "Hauptteil", hint: "Das aktuell offene Level. Der Umfang richtet sich nach dem Belastungslimit aus dem Hundeprofil." },
      { role: "cooldown", minutes: 10, label: "Abschluss", hint: "Ein Level, das sicher gelingt. Bevorzugt Nasenarbeit oder einfache Marke." },
    ],
    allowedTracks: ["A", "B", "C", "D", "E", "F", "G", "H"],
  },
  {
    id: "kurz",
    name: "Kurzübung im Spaziergang",
    short: "Kurzübung",
    icon: "walk",
    duration: "13-15 Min",
    desc: "Kein Equipment nötig",
    blocks: [
      { role: "warmup",  minutes: 5, label: "Erster Teil",   hint: "Kurz ankommen." },
      { role: "main",    minutes: 5, label: "Hauptteil", hint: "Ein Signal gezielt üben." },
      { role: "cooldown", minutes: "3-5", label: "Abschluss", hint: "Sicherer Erfolg." },
    ],
    allowedTracks: ["A", "B", "C"],
  },
  {
    id: "mini",
    name: "Mini-Session",
    short: "Mini-Session",
    icon: "pocket",
    duration: "10 Min",
    desc: null, // nur die Dauer; was mitzunehmen ist, steht in der Packliste
    blocks: [
      { role: "warmup",  minutes: 3, label: "Erster Teil",   hint: "Zwei Stopps oder ein Rückruf." },
      { role: "main",    minutes: 6, label: "Hauptteil", hint: "Appell, Führigkeit, Steadiness oder Abgabe. Kurz, ohne Aufbau." },
      // Laut Abschnitt 8 kein Cool Down bei der Mini-Session; der Block bleibt, weil er Trainingsinhalt hat (gemeldet)
      { role: "cooldown", minutes: 1, label: "Abschluss", hint: "Zwei kurze Retrieves." },
    ],
    allowedTracks: ["A", "B", "C", "D", "E", "G"],
    // Zusätzlich zu allowedTracks: nur Level ohne Dummy oder mit Juniordummy-Option (Unterwegs-Szenario)
    allowedDummyTypes: [null, "junior"],
  },
];

// Tracks mit Dummyarbeit. Vollsession: unter den letzten drei soll mindestens eine einen davon als Hauptteil haben.
export const APPORT_TRACKS = ["E", "F", "G", "H"];

// Bevorzugte Tracks für Warm-up und Abschluss (aus den Block-Hinweisen oben)
export const SESSION_ROLE_PREFS = {
  warmup:   ["A", "B", "C"],
  cooldown: ["G", "F"],
};

// Ersatz-Blöcke, wenn kein passendes Level existiert (z.B. frischer Start ohne abgeschlossenes Level)
export const SESSION_FALLBACKS = {
  warmup: {
    title: "Lockeres Ankommen",
    desc: "Ein paar Meter entspannt gehen, Blickkontakt belohnen, kurz spielen. Noch kein Kommando, das sitzen muss.",
  },
  main: {
    title: "Alles offen geschafft",
    desc: "In diesem Sessiontyp ist gerade kein Level offen. Wähle einen anderen Sessiontyp oder wiederhole ein Level, das sicher sitzt.",
  },
  cooldown: {
    title: "Sicherer Abschluss",
    desc: "Etwas, das garantiert klappt: ein kurzer Rückruf aus der Nähe oder ein Leckerli im Gras suchen lassen. Positiv beenden.",
  },
};

// ─── Aufwärmen und Cool Down (Abschnitt 10; Dr. Astrid Siegl, Vierbeiner Reha-Zentrum, im Buch) ──
export const WARMUP_COOLDOWN = {
  voll: { warmup: "15 min, nie unter 10, bei ca. 30 % der max. Leistungsfähigkeit", cooldown: "ca. 10 min" },
  kurz: { warmup: "5 min, zügiges Lösen und Traben", cooldown: "3 bis 5 min" },
  mini: { warmup: "3 min Bewegung, kein strukturiertes Programm", cooldown: null }, // Cool Down entfällt
  rules: [
    "Nach dem Aufwärmen zügig starten.",
    "Wartezeit maximal 5 bis 10 Minuten.",
    "Über 20 Minuten Wartezeit: neu aufwärmen.",
  ],
  // Bei Kurzübung und Mini-Session anzuzeigen
  shortNote: "Die verkürzte Variante liegt unter der physiotherapeutischen Empfehlung und ist nur bei geringer Belastungsintensität vertretbar.",
};

// ─── Session-Regeln aus dem Fundament (Abschnitt 11; Zvolsky) ──
export const SESSION_GUIDANCE = {
  // S. 87, wörtlich. Umsetzung: beim Fortsetzen den Schritt vor dem erreichten vorschlagen, überschreibbar.
  startOneStepBack: "Beginnen Sie an jedem Trainingstag mit der jeweiligen Übung (Trainingseinheit) immer einen Schritt vor dem Punkt, an dem Sie das letzte Mal aufgehört haben. Somit geben Sie dem Hund die Möglichkeit, sich an die Übung zu erinnern.",
  // Umsetzung: nach einem gelungenen Durchgang Pause vorschlagen, nicht die nächste Wiederholung
  afterSuccess: "Hat die Übung geklappt, dann machen Sie erst einmal eine Pause. Eine gerade gelungene Übung noch mehrmals zu wiederholen oder gar die Anforderungen gleich zu steigern, ist in der Regel kontraproduktiv.",
  // S. 86: alles vorbereiten, bevor der Hund aus dem Auto kommt
  checklist: [
    "Dummys ausgelegt (wenn Einweisen geübt wird)",
    "Werfer instruiert (wenn Markierungen geübt werden)",
    "Hindernis oder Rollzaun aufgestellt",
    "Jacke zugeknöpft (flatternde Ecke behindert den Hund beim Markieren und trifft ihn bei Fuß im Gesicht)",
    "Pfeife in der Hand oder im Mund, nicht in der Tasche",
    "Hund gelöst, angeleint, auf die Aufgabe konzentriert",
  ],
  handsNote: "Hände während der Wartezeiten in die Jackentaschen. Hunde springen oft ein, weil der Führer mit den Händen herumfuchtelt.",
  // Optional vor der Vollsession
  planningQuestions: [
    "In welche Teilziele zerlege ich die heutige Aufgabe?",
    "Was will ich in welcher Reihenfolge üben?",
    "Welche Probleme können auftreten?",
    "Wie reagiere ich darauf, oder wie vermeide ich sie?",
    "Welches Ziel will ich heute erreichen?",
  ],
  // Zwischen den Blöcken eine Pause ausweisen, Grund: Verwechslungsgefahr
  blockSeparation: "Verschiedene Übungen am selben Tag zeitlich trennen, bei Anfängern auch räumlich. Verwechslungsgefahr.",
  whenToHelp: "Wenn Sie den Eindruck gewinnen, Ihr Hund verzweifelt an der gestellten Aufgabe; wenn Sie beobachten, dass seine Motivation schwindet oder dass er unsicher wird, dann müssen Sie ihm unbedingt helfen.",
  whenNotToHelp: "Sonst nicht: er muss lernen, selbstständig zu arbeiten und eigene Erfahrungen zu sammeln.",
};

// ─── Einstiegsalter (Abschnitt 12) ── Hinweis bei Unterschreitung, keine Sperre
export const MIN_AGE_MONTHS = {
  apportiertraining: 10,        // nach dem Zahnwechsel, ca. 9 bis 10 Monate
  markierungen: 10,             // 8 bis 10 Monate, nur wenn der Hund steady ist
  walkUpOhneLeine: 12,
  verlorensucheSystematisch: 12,
  schuss: null,                 // nach der Geschlechtsreife, individuell
};
// Bei Leveln mit Prüfungsbezug DP-E (dp-e-korrektur.md, Abschnitt 4)
export const DPE_AGE_NOTE = "Für die DP-E muss der Hund am Prüfungstag mindestens 12 Monate alt sein. Trainieren kannst du früher.";
export const DPE_SHOT_NOTE = "Die DP-E gibt es mit Schuss (m. S.) und ohne (o. S.). In der Variante ohne Schuss wird ein Lautzeichen gegeben. Wer den Hund noch nicht an den Schuss gewöhnt hat, meldet die Variante ohne.";

// Nur bei E Bronze und F Bronze anzeigen (fundament-umbau-3.md, Abschnitt 2)
export const MIN_AGE_NOTE_LEVELS = ["E:bronze", "F:bronze"];
export const MIN_AGE_NOTE =
  "Zwei bis drei Apportiereinheiten mit maximal zwei bis drei Wiederholungen in der Woche sind zu Beginn mehr als ausreichend.";

export const SESSION_RULES = [
  "Der Hauptteil bestimmt den Sessiontyp. Braucht er Equipment, ist es eine Vollsession.",
  "Warm-up und Abschluss sind nie das aktuell offene Level. Sie müssen sicher gelingen.",
  "Nie zwei schwere Blöcke kombinieren.",
  "Die Summe der Wiederholungen bleibt unter dem Retrieve-Limit aus dem Hundeprofil.",
  "Nach dem Hauptteil keine neue Schwierigkeit mehr einführen.",
];

// ─── Meine Signale (docs/profil-und-aufraeumen.md, Abschnitt 2) ─
// Schlüssel wie {signal.x} im Glossar. Pfiffsignale: Freitext für das Muster.
const WHISTLE_PLACEHOLDER = "z.B. ein kurzer Ton, Pfiff-peeeep, drei kurze";
export const SIGNAL_FIELDS = [
  { key: "stop",    label: "Stopp auf Distanz",    default: "Pfiff, ein kurzer Ton",    placeholder: WHISTLE_PLACEHOLDER },
  { key: "recall",  label: "Rückruf",              default: "Pfiff, mehrere kurze Töne", placeholder: WHISTLE_PLACEHOLDER },
  { key: "search",  label: "Kleine Suche",         default: "Such" },
  { key: "area",    label: "Große Suche, Gebiet",  default: "Verloren" },
  { key: "out",     label: "Geradeaus, Voran",     default: "Voran" },
  { key: "back",    label: "In die Tiefe",         default: "Back" },
  { key: "over",    label: "Seitlich",             default: "Rüber" },
  { key: "fetch",   label: "Apportieren",          default: "Bring" },
  { key: "release", label: "Freigabe",             default: "Lauf" },
  { key: "heel",    label: "Fußposition links",    default: "Fuß" },
  { key: "side2",   label: "Zweite Seite, rechts", default: "", optional: true }, // leer: kein Hinweis auf eine zweite Seite
];
export const SIGNAL_DEFAULTS = Object.fromEntries(SIGNAL_FIELDS.map((f) => [f.key, f.default]));
// Steht immer direkt unter dem Feld area, unabhängig von den eingetragenen Mustern
export const SIGNAL_SEARCH_NOTE =
  "Prüfe, ob der erste Ton deines Suchensignals dem Stopp-Pfiff gleicht. Hunde interpretieren bereits den ersten Ton und beginnen danach zu handeln (Zvolsky S. 234). Setzt dein Hund sich auf das Suchensignal, liegt es vermutlich daran. Teste es bewusst auf Distanz, bei Ablenkung und im hohen Bewuchs, dort tritt die Verwechslung zuerst auf.";

// ─── Hundeprofil und Belastungssteuerung ──────────────────────
export const PROFILE_FIELDS = {
  // Erfahrung (docs/profil-und-aufraeumen.md, Abschnitt 1). Wirkt nur im Basics-Tab:
  // "keine" zeigt "So fängst du an" und markiert Glossarbegriffe deutlicher. Keine Sperre, keine andere Reihenfolge.
  experience: [
    { id: "keine", label: "Keine", desc: "Noch nie mit Dummys gearbeitet" },
    { id: "etwas", label: "Etwas", desc: "Erste Apports, Pfiff noch nicht aufgebaut" },
    { id: "viel",  label: "Viel",  desc: "Pfeifsignale sitzen, Markierungen und Blinds bekannt" },
  ],
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

// Belastungspunkte pro Session (Summe der load-Werte der Blöcke), siehe docs/durchgaenge.md.
// default.loadPerSession ist seit fundament-umbau-2.md (Abschnitt 0) eine Warnschwelle, keine Sperre:
// darüber wird weiter geplant und ein Hinweis gezeigt. Die Werte für Alter und Gelenkbefund bleiben Obergrenzen.
export const LOAD_LIMITS = {
  default:  { loadPerSession: 5, sessionsPerWeek: 2, restDays: 1 },
  leicht:   { loadPerSession: 5, sessionsPerWeek: 2, restDays: 1 },
  deutlich: { loadPerSession: 3, sessionsPerWeek: 1, restDays: 2 },
  welpe:    { loadPerSession: 3, sessionsPerWeek: 2, restDays: 1 },
  junghund: { loadPerSession: 5, sessionsPerWeek: 2, restDays: 1 },
  senior:   { loadPerSession: 5, sessionsPerWeek: 1, restDays: 2 },
};

export const JOINT_WARNINGS = {
  water:      "Nur flacher Einstieg, kein Absprung von Uferkanten.",
  multiMark:  "Viele Starts und Stopps, hohe Gelenkbelastung. Danach zwei Ruhetage.",
  doubleMarkF: "Zwei Apports bis 80 Meter, einer durch Deckung oder Wasser. Bei Gelenkbefund die Distanz reduzieren, nicht die Zahl der Apports.",
  hardStop:   "Stopp-Pfiff bevorzugt aus dem Trab üben, nicht aus dem vollen Galopp.",
  directions: "Enge Wendungen begrenzen.",
};

// Welche Level von welcher Gelenkwarnung betroffen sind ("Track:Level" → Keys aus JOINT_WARNINGS)
export const JOINT_WARNING_LEVELS = {
  "A:silber": ["hardStop"],
  "A:gold":   ["hardStop"],
  "E:gold":   ["water", "multiMark"],
  "F:silber": ["multiMark"],
  "F:gold":   ["doubleMarkF"], // Teil 3, Abschnitt 6
  "H:silber": ["directions"],
  "H:gold":   ["directions"],
};

// Profilwerte, bei denen Gelenkwarnungen eingeblendet werden
export const JOINT_RESTRICTED = ["leicht", "deutlich"];

// ─── Equipment ────────────────────────────────────────────────
// Bezeichnungen für gear-Einträge (id → Einzahl/Mehrzahl, Icon aus public/icons/)
export const GEAR_ITEMS = {
  pfeife:      { one: "Pfeife",      many: "Pfeifen",      icon: "whistle" },
  dummy:       { one: "Dummy",       many: "Dummys",       icon: "dummy" },
  markierstab: { one: "Markierstab", many: "Markierstäbe", icon: "marker-pole" },
  futterschuessel: { one: "Futterschüssel", many: "Futterschüsseln", icon: null },
  // Dummys mit festem Gewicht (DUMMY_TYPES), unabhängig vom Profil
  welpendummy:     { one: "Welpendummy 200 g", many: "Welpendummys 200 g", icon: "dummy" },
  juniordummy:     { one: "Juniordummy 400 g", many: "Juniordummys 400 g", icon: "dummy" },
  suchdummy:       { one: "Suchendummy 80 g", many: "Suchendummys 80 g", icon: "pocket-dummy" },
  schreckschuss:   { one: "Schreckschuss", many: "Schreckschuss", icon: null },
};

// Dummy-Gewicht aus dem Profil: Welpe/Junghund oder deutlicher Gelenkbefund → Welpendummy 200 g, sonst 500 g
// (fundament-umbau-2.md, Abschnitt 5; alle Gewichte in DUMMY_TYPES)
export const DUMMY_WEIGHT = { light: 200, junior: 400, standard: 500, lightAges: ["welpe", "junghund"], lightJoints: ["deutlich"] };

// Texte für den Basics-Tab (noch nicht gerendert)
export const EQUIPMENT_NOTES = {
  gewichte: "Ein Standard-Dummy wiegt 500 Gramm. Für Welpen und Junghunde nimmst du 200 Gramm, damit Gebiss und Gelenke nicht unnötig belastet werden. Bei deutlichem Gelenkbefund bleibst du auch beim erwachsenen Hund bei 200 Gramm.",
  wasser: "Fast alle Canvas-Dummys schwimmen, du brauchst für den Anfang nichts Zusätzliches. Canvas saugt sich im Wasser aber voll, wird schwerer und bleibt lange feucht. Wenn du regelmäßig am Wasser arbeitest, lohnt ein Wasserdummy aus Kunststoff: trocknet sofort und liegt sichtbarer auf der Oberfläche. Helle Farben wie Weiß oder Orange helfen dir, die Linie deines Hundes im Wasser zu verfolgen.",
};

export const DISCLAIMER =
  "Die App ersetzt keine tierärztliche Beratung. Bei bekannten Vorerkrankungen Belastungsgrenzen mit dem Tierarzt abstimmen.";

// Glossar: src/data/glossar.js (docs/glossar-v5.md)

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

// ─── Fehlerursachen und Übersprungsverhalten (Abschnitt 13; Zvolsky) ──
// Auswahl bei einem fehlgeschlagenen Durchgang
export const FAILURE_CAUSES = [
  { id: "ueberforderung", label: "Körperliche oder geistige Überforderung", action: "Pause machen" },
  { id: "methode",        label: "Unpassende Trainingsmethode",             action: "Pause, Methode überdenken" },
  { id: "neues-detail",   label: "Einführung neuer Verhaltensdetails",
    action: "Altes Verhalten wird vorübergehend schlechter. Ignorieren, nicht maßregeln, es verschwindet von allein" },
  { id: "test",           label: "Vom Hund bewusst eingebaut",
    action: "Er testet, was wirklich erwartet wird. Sanfte Korrektur oder einfach nicht belohnen" },
  { id: "steigerung",     label: "Zu schnelle Steigerung",                  action: "Zurück in den Kindergarten" },
];
export const FAILURE_UNCLEAR = "Es ist immer besser, nicht zu reagieren, als falsch zu reagieren.";

// Checkbox-Liste in der Sessionbewertung; mehr als zwei Zeichen: Rückstufung vorschlagen
export const DISPLACEMENT_SIGNS = [
  "Gähnen",
  "Sich-Lecken",
  "Sich-Kratzen",
  "Bellen als Stressentladung",
  "Schnuppern am Boden ohne Witterung",
  "Sitzenbleiben beim Schicken",
  "Zurückkommen obwohl geschickt",
];
export const DISPLACEMENT_NOTE = "Sie sind ein deutliches Zeichen dafür, dass er die Aufgabe noch nicht richtig verstanden hat.";
export const DISPLACEMENT_DOWNGRADE_ABOVE = 2;

// Dummy-Gewichte und -Eigenschaften (Abschnitt 13, Korrekturen)
export const DUMMY_TYPES = [
  { id: "welpe",    label: "Welpendummy", grams: 200 },
  { id: "junior",   label: "Juniordummy", grams: 400 },
  { id: "standard", label: "Standard",    grams: 500 },
  { id: "suche",    label: "Suchendummy", grams: 80 },
];
// Farbtext: einzige Quelle (docs/profil-und-aufraeumen.md, Abschnitt 3). Glossar "Dummyfarbe" und Basics
// "Dummys und Ausrüstung" zeigen farben, Basics "Sehen" nur die Sätze zum Sehpigment (farbenSehpigment).
const FARB_SAETZE = {
  pigment:   "Dem Hund fehlt das Sehpigment für Grün, er sieht wie ein grünblinder Mensch.",
  blau:      "Blau und Violett sieht er zweifelsfrei, deshalb sind blaue Dummys die beste Lernhilfe.",
  rot:       "Rot, Gelb, Orange, Braun, Gelbgrün und Grün kann er nicht unterscheiden, Rot erscheint ihm als sattes Gelb.",
  orange:    "Orange ist für den Menschen gut sichtbar, nicht für den Hund.",
  weiss:     "Weiße Dummys wirken über den Kontrast, nicht über die Farbe.",
};
export const DUMMY_FACTS = {
  farben: [FARB_SAETZE.pigment, FARB_SAETZE.blau, FARB_SAETZE.rot, FARB_SAETZE.orange, FARB_SAETZE.weiss].join(" "),
  farbenSehpigment: [FARB_SAETZE.pigment, FARB_SAETZE.rot].join(" "),
  pocketDummy: "Der Pocket Dummy ist das 80-g-Suchendummy für Suchenpfiff-Training bei geringer Witterung, kein Jackentaschen-Dummy für unterwegs.",
  markierstab: "Der Markierstab ist eine Sichthilfe für den Hund, nicht für den Führer. Praxisregel: mindestens vier aufstellen, damit nicht der Stab selbst zum Ziel wird.",
};

// ─── Trophaeen ────────────────────────────────────────────────
export const TROPHIES = [
  // Track-Trophaeen
  ...TRACKS.map((t) => ({
    id: `track-${t.id}`,
    name: `${t.name} gemeistert`,
    desc: `${t.name}: Gold erreicht`,
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
  { name: "Die Arbeit ist für den Hund",
    desc: "Wo Motivation und Trainingsfortschritt in Konflikt geraten, gewinnt " +
          "die Motivation. Abbruch vor Druck, Pause vor Wiederholung, " +
          "Rückstufung vor Erzwingen." },
  { name: "Lerninhalte über positive Verstärkung",
    desc: "Neues Verhalten entsteht über Belohnung, nie über Druck. Bekanntes " +
          "Verhalten wird eingefordert, nicht verhandelt: unerwünschtes " +
          "Verhalten wird unterbrochen und umgelenkt, nicht ausgesessen. " +
          "Körperliche Einwirkung ist kein Mittel dieser App." },
  { name: "Eine Variable pro Steigerung",
    desc: "Nie Distanz und Gelände gleichzeitig, nie Zeit und Distanz " +
          "gleichzeitig. Steigt die Geländeschwierigkeit, geht die Distanz " +
          "eine Stufe zurück." },
  { name: "Verteilt statt massiert",
    desc: "Zwei kurze Einheiten pro Woche schlagen tägliches Training. Belegt " +
          "bei Demant et al. 2011: 44 Beagles, Training ein bis zwei Mal pro " +
          "Woche führte schneller zum Ziel als täglich, kurze Einheiten " +
          "schneller als lange." },
  { name: "Selbstständigkeit vor Handling",
    desc: "Im Regelwerk ist zu viel oder zu laute Lenkung ein schwerer Fehler " +
          "(\"noisy or inappropriate handling\"). Erst Markierung und Suche, " +
          "dann Einweisen. Hilf nur, wenn der Hund verzweifelt, unsicher wird " +
          "oder die Motivation verliert." },
  { name: "Einfach aufbauen",
    desc: "Je einfacher eine Einheit aufgebaut ist, umso schneller versteht " +
          "der Hund. Verschiedene Übungen am selben Tag zeitlich trennen, bei " +
          "Anfängern auch räumlich: die Gefahr der Verwechslung und die " +
          "daraus folgende Verwirrung muss so gering wie möglich bleiben." },
  { name: "Errorless Learning",
    desc: "Die Aufgabe so stellen, dass der Hund sie lösen kann. Zielwert " +
          "rund 80 Prozent Erfolgsquote. Praxiswert aus der " +
          "Trainingsliteratur, keine Studie dazu bekannt." },
];
