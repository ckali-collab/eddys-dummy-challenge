/**
 * Eddy's Dummy Challenge - Trainingsdaten v2
 * Stand: 11.10.2026
 *
 * Struktur: 8 parallele Tracks, je 3 Level (bronze/silber/gold).
 * Keine lineare Stufenlogik mehr. Gelaende ist in die Level eingebaut.
 */

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

// Erster Tipp in allen A-Leveln (erklaeren-statt-nennen.md, Abschnitt 3)
const LEISE_PFEIFEN = "Immer leise pfeifen. Hunde hören viermal leiser als wir und aus viermal größerer Entfernung. Er hört dich. Wenn du immer laut pfeifst, hast du keine Reserve mehr für Distanz, Wind und Deckung, und im Regelwerk ist lautes Handling ein schwerer Fehler.";

// ─── Tracks ───────────────────────────────────────────────────
export const TRACKS = [
  {
    id: "A",
    name: "Stopp-Pfiff",
    icon: "stop-whistle",
    group: "grund",
    short: "Anhalten und Sitzen auf einen kurzen Pfiff",
    desc: "Grundlage für alles. Ohne zuverlässigen Stopp ist kein Handling möglich.",
    axis: "bedingungen", // "bedingungen" | "distanz"
    minAgeMonths: null, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Kein Mindestalter, Appell und Abgabe von Anfang an",
    requires: [],
    levels: [
      {
        id: "bronze",
        signals: ["stop"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Stopp im Nahbereich",
        exam: "appell", // dp-e-korrektur.md, Abschnitt 4
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ausgang", variant: "Der Hund sitzt neben dir, wenn du pfeifst." },
          { condition: "ausgang", variant: "Der Hund steht oder geht neben dir, wenn du pfeifst." },
          { condition: "position", variant: "Der Hund ist etwa 10 Meter entfernt, rund 15 Schritte." },
          { condition: "position", variant: "Der Hund ist etwa 25 Meter entfernt, rund 35 Schritte." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Sitzt sofort auf den leisen Stopp-Pfiff, auch auf 25 Meter. Fünf von fünf Fällen, an drei verschiedenen Tagen.",
        run: "5 Stopps auf den leisen Stopp-Pfiff in der Situation der heutigen Stufe, über die Einheit verteilt. Dazwischen normal weitergehen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        steps: [
          "Hund geht bei Fuß. Leise den Stopp-Pfiff geben. Er setzt sich sofort hin.",
          "Hund sitzt 20 große Schritte vor dir. Stopp-Pfiff geben. Er bleibt sitzen und schaut dich an.",
          "Rückruf pfeifen, dann auf halbem Weg den Stopp-Pfiff. Er stoppt sofort.",
          "Er stöbert wenige Meter vor dir. Stopp-Pfiff geben und gleichzeitig einen Dummy werfen. Der Dummy ist die Belohnung für den Stopp.",
        ],
        tips: [
          LEISE_PFEIFEN,
          "Im Alltag das Wort Sitz durch den Pfiff ersetzen. Kostet keine Trainingszeit.",
          "Ein Durchgang pro Spaziergang, nicht mehr.",
        ],
        warning: "Zu viele Wiederholungen führen dazu, dass der Hund beim Rausschicken von selbst stoppt.",
      },
      {
        id: "silber",
        signals: ["stop"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Stopp auf Distanz und aus der Bewegung",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ausgang", variant: "Der Hund läuft auf dich zu, wenn du pfeifst." },
          { condition: "ausgang", variant: "Der Hund läuft von dir weg, wenn du pfeifst." },
          { condition: "position", variant: "Der Hund ist etwa 35 Meter entfernt, rund 45 Schritte." },
          { condition: "verleitung", variant: "Ein Dummy liegt sichtbar im Gelände, während du pfeifst." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Stoppt auf 35 Meter, auch aus der Bewegung und wenn ein Dummy sichtbar im Gelände liegt. Vier saubere Stopps in Folge, an drei verschiedenen Orten.",
        run: "4 saubere Stopps in der Situation der heutigen Stufe, über die Einheit verteilt. Jeder Stopp wird belohnt, mit Rückruf oder Dummywurf.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 1, optional: true }],
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Hund sucht oder schnüffelt frei auf etwa 35 Meter. Stopp-Pfiff. Er stoppt, sitzt, schaut dich an.",
          "Nach dem Stopp: Rückruf pfeifen und loben, oder einen Dummy werfen. Der Stopp muss sich lohnen.",
          "Distanz schrittweise auf 35 Meter steigern.",
        ],
        tips: [
          LEISE_PFEIFEN,
          "Wenn er nicht stoppt: nicht nachpfeifen. Hingehen, zurück zum Ausgangspunkt, Distanz verkürzen.",
          "Bei Gelenkeinschränkung aus dem Trab üben, nicht aus dem Galopp.",
        ],
        warning: null,
      },
      {
        id: "gold",
        signals: ["stop"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Stopp im Lauf auf den Dummy",
        exam: "appell",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ausgang", variant: "Der Hund ist etwa 40 Meter entfernt auf dem Weg zu einem Dummy, wenn du pfeifst." },
          { condition: "verleitung", variant: "Ein fremder Hund ist in Sichtweite." },
          { condition: "verleitung", variant: "Ein Dummy fliegt oder eine Person läuft los, während er arbeitet." },
          { condition: "ort", variant: "Ein Gelände, in dem ihr noch nie trainiert habt." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        examHint: "In der Prüfung und auf der Jagd ist die Ablenkung aufgehendes Wild. Wer die Situation nicht herstellen kann, übt mit einer Ablenkung, die er auslösen kann.", // praxis-nachtrag.md, Abschnitt 5
        criteria: "Stoppt auf 40 Meter im Lauf zum Dummy, auch bei realer Ablenkung und in unbekanntem Gelände. Drei Durchgänge an drei Tagen.",
        run: "Ein Stopp während des Laufs auf den Dummy, danach weiterschicken. Mehr nicht.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 1 }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        steps: [
          "Dummy werfen, Hund schicken.",
          "Während er auf den Dummy zugaloppiert, trittst du vor ihn und gibst gleichzeitig den Stopp-Pfiff.",
          "Er stoppt. Danach schickst du ihn weiter auf den Dummy - der Stopp war keine Absage, sondern eine Zwischenstation.",
          "Schrittweise weniger vortreten, bis der Pfiff allein reicht.",
        ],
        tips: [
          LEISE_PFEIFEN,
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
    short: "Direktes Zurückkommen auf den Rückruf-Pfiff.",
    desc: "Gerade Linie, kein Zickzack, kein Schnüffeln unterwegs.",
    axis: "bedingungen", // "bedingungen" | "distanz"
    minAgeMonths: null, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Kein Mindestalter, Appell und Abgabe von Anfang an",
    requires: [],
    levels: [
      {
        id: "bronze",
        signals: ["recall"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Rückruf aus ruhiger Situation",
        exam: "unterordnung", // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ort", variant: "Im Garten oder auf einer eingezäunten Fläche, etwa 20 Meter." },
          { condition: "ort", variant: "Auf einer bekannten Wiese, ohne andere Hunde." },
          { condition: "verleitung", variant: "Ein Mensch steht oder geht in der Nähe." },
          { condition: "position", variant: "Du drehst dich weg und rufst, ohne ihn anzusehen." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Kommt auf den ersten Pfiff in gerader Linie zurück, bleibt beim Führer und wartet auf die Freigabe. Fünfmal in Folge auf 20 Meter.",
        run: "5 Rückrufe auf 20 Meter, jeder mit Lob und anschließender Freigabe, über die Einheit verteilt, dazwischen normal weitergehen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        steps: [
          "Hund läuft frei auf etwa 20 Meter.",
          "Den Rückruf-Pfiff geben. Er kommt direkt und gerade.",
          "Er kommt bei dir an und bleibt stehen. Loben.",
          "Wieder freigeben.",
        ],
        tips: [
          "Schritt 4 ist der wichtigste. Wenn der Rückruf immer das Ende der Freiheit bedeutet, wird er schlechter.",
        ],
        warning: null,
      },
      {
        id: "silber",
        signals: ["recall"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Rückruf aus der Beschäftigung",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "ort", variant: "In einem Gelände, in dem ihr noch nie wart, etwa 40 Meter." },
          { condition: "verleitung", variant: "Ein fremder Hund ist in Sichtweite, angeleint." },
          { condition: "ausgang", variant: "Du rufst, während er mit der Nase am Boden ist." },
          { condition: "ausgang", variant: "Du rufst, während er rennt." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Kommt auf den ersten Pfiff aus 40 Metern zurück, auch aus dem Schnüffeln und aus dem Lauf. Fünf schnelle Reaktionen in Folge.",
        run: "5 Rückrufe in der Situation der heutigen Stufe, jeder mit Lob und Freigabe, über die Einheit verteilt, dazwischen normal weitergehen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }],
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        steps: [
          "Warten, bis er wirklich in etwas vertieft ist.",
          "Den Rückruf-Pfiff einmal geben.",
          "Kommt er: große Belohnung, dann wieder freigeben.",
          "Kommt er nicht: hingehen, ruhig holen, keine Strafe. Nächster Versuch leichter.",
        ],
        tips: ["Niemals zweimal pfeifen."],
        warning: null,
      },
      {
        id: "gold",
        signals: ["recall"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Rückruf unter sozialer Ablenkung",
        exam: "appell",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Zwei oder mehr Hunde spielen in Sichtweite." },
          { condition: "verleitung", variant: "Er hat frische Wildwitterung aufgenommen." },
          { condition: "ort", variant: "Im Wald, wo er dich zeitweise nicht sieht." },
          { condition: "wetter", variant: "Bei Wind von vorn, der deine Stimme wegträgt." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Kommt auf das erste Signal, auch wenn andere Hunde spielen, bei Wildwitterung, wenn er dich zeitweise nicht sieht und bei Wind von vorn. Drei Durchgänge an verschiedenen Tagen.",
        run: "Ein Rückruf in der Situation der heutigen Stufe, danach wieder freigeben und weiterspielen lassen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }],
        setup: ["Zwei oder mehr Hunde anderer Halter"], // Gelände, zweite Person: nicht in die Packliste
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        steps: [
          "Check-in trainieren, bevor du pfeifst. Große Distanz zu den spielenden Hunden. Sobald er die anderen ansieht und dann von selbst zu dir schaut: belohnen.",
          "Rückruf auf großer Distanz. Erst wenn Schritt 1 sicher sitzt. Hund ist in Sichtweite, aber nicht im Spiel.",
          "Distanz schrittweise verkürzen. Nur eine Stufe weiter nach fünf schnellen Reaktionen in Folge.",
          "Rückruf aus dem Spiel. Erst ganz am Ende. Danach wieder freigeben und weiterspielen lassen.",
        ],
        tips: [
          "Niemals zweimal pfeifen.",
          "Nach einer langsamen Reaktion darf er nicht sofort zur Ablenkung zurück. Sonst lernt er, dich auszusitzen.",
          "Übe lieber mit Hunden, deren Halter du kennst und die auf Zuruf abrufbar sind, als mit fremden Hunden im Park.",
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
        signals: ["heel"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "50 Meter ohne Ziehen",
        exam: "unterordnung", // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "haltung", variant: "Eine gerade Strecke von 50 Metern, gleichmäßiges Tempo." },
          { condition: "haltung", variant: "Mit Rechts-, Links- und Kehrtwendungen." },
          { condition: "haltung", variant: "Mit Wechsel zwischen langsam, normal und zügig." },
          { condition: "haltung", variant: "Du bleibst stehen, er setzt sich ohne Signal." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Geht 50 Meter ohne Leine bei Fuß, bei Richtungs- und Tempowechseln, und setzt sich, wenn du stehen bleibst. Kein Vorlaufen, kein Zurückbleiben.",
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
        signals: ["heel"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Tempo- und Richtungswechsel",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Dummys liegen sichtbar am Weg, 100 Meter am Stück." },
          { condition: "ort", variant: "In einem Gelände, in dem ihr noch nie wart." },
          { condition: "verleitung", variant: "Menschen gehen vorbei oder stehen in der Nähe." },
          { condition: "gegenstand", variant: "Er trägt ein Dummy, während er bei Fuß geht." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Bleibt 100 Meter am Stück bei Fuß, auch wenn Dummys am Weg liegen, Menschen vorbeigehen und er selbst ein Dummy trägt.",
        run: "100 Meter am Stück in der Situation der heutigen Stufe.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2, steps: [1] }, { id: "dummy", n: 1, steps: [4] }], // Stufe 1: Dummys am Weg, Stufe 4: er trägt ein Dummy
        dummyType: null, // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Erst 100 Meter am Stück auf bekanntem Weg, ohne Ablenkung.",
          "Dann eine Ablenkung dazunehmen, nie zwei gleichzeitig.",
          "Zuletzt mit Dummy im Fang. Das ist die schwerste Variante, weil er sich auf zwei Dinge gleichzeitig konzentrieren muss.",
          "Er muss dich beobachten statt nebenher zu laufen.",
        ],
        tips: ["Unvorhersehbar sein. Das erzeugt Aufmerksamkeit."],
        warning: null,
      },
      {
        id: "gold",
        signals: ["heel"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Automatisches Sitzen unter Ablenkung",
        exam: "appell",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Fremde Hunde in Sichtweite." },
          { condition: "verleitung", variant: "Ein Dummy fliegt, während ihr geht." },
          { condition: "ort", variant: "Neben einer zweiten Person hergehen, die ebenfalls einen Hund führt oder Dummys trägt." },
          { condition: "verleitung", variant: "Ein Radfahrer oder Jogger kommt vorbei." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Setzt sich automatisch, wenn du stehen bleibst, ohne Kommando. Auch bei fremden Hunden, bei fliegendem Dummy und wenn ein Radfahrer oder Jogger vorbeikommt. Fünfmal in Folge.",
        run: "5 Halts in der Situation der heutigen Stufe, über die Einheit verteilt. Er setzt sich jedes Mal ohne Kommando.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 0, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 1, steps: [2] }],
        setup: [{ text: "Eine zweite Person", steps: [3] }], // Stufe 3 nennt sie
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
        signals: ["fetch"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Warten nach dem Wurf",
        exam: ["doppelmarkierung", "verspaetet"], // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Du lässt ein Dummy neben dir fallen, er wartet 3 Sekunden." },
          { condition: "verleitung", variant: "Du wirfst ein Dummy wenige Meter weit, er wartet 5 Sekunden." },
          { condition: "verleitung", variant: "Du wirfst ein Dummy so weit du kannst, er wartet 8 Sekunden." },
          { condition: "position", variant: "Du gehst nach dem Wurf zwei Schritte weg, er wartet 8 Sekunden." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Wartet 8 Sekunden ruhig nach dem Dummy-Wurf, ohne durchzubrechen. Drei Durchgänge.",
        run: "4 Würfe nacheinander mit der Wartezeit der heutigen Stufe, danach schickst du ihn. Dazwischen kurz freigeben.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 1 }],
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Hund sitzt off-lead in der Fußposition.",
          "Dummy werfen. Nichts sagen.",
          "3 Sekunden warten, dann schickst du ihn.",
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
        signals: ["fetch"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Warten bei Bewegung und zweitem Dummy",
        exam: "appell",
        examClass: "A",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Zwei Dummys fliegen nacheinander." },
          { condition: "verleitung", variant: "Eine zweite Person wirft, nicht du." },
          { condition: "position", variant: "Du holst das Dummy selbst, er bleibt sitzen." },
          { condition: "ausgang", variant: "Das Dummy fliegt, während ihr in Bewegung seid." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Hält den Sitz, wenn zwei Dummys fliegen, wenn eine zweite Person wirft, wenn du das Dummy selbst holst und wenn ihr in Bewegung seid. Drei Durchgänge.",
        run: "4 Wiederholungen in der Situation der heutigen Stufe, nacheinander, dazwischen kurz freigeben.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }, { id: "markierstab", n: 1 }],
        setup: [{ text: "Eine zweite Person", steps: [2] }], // Gelände, zweite Person: nicht in die Packliste
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten",
        steps: [
          "Dummy werfen, du machst einen Schritt zur Seite.",
          "Dummy werfen, du gehst vier bis fünf Schritte weg.",
          "Dummy werfen, du gehst raus und setzt einen Markierstab. Der Stab markiert hier deinen Weg, nicht ein Ziel für den Hund.",
          "Ersten Dummy werfen, zweiten Dummy werfen, erst dann schicken.",
        ],
        tips: ["Schritt 4 ist die direkte Vorbereitung auf Doppelmarken in Track F."],
        warning: null,
      },
      {
        id: "gold",
        signals: ["fetch"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        minAgeMonths: 12, // überschreibt den Track-Wert
        minAgeNote: "Walk-up ohne Leine ab ca. 12 Monaten",
        title: "Standruhe in Verbindung mit Markieren (Walk Up)",
        exam: "walkup",
        examClass: "F",
        maxDistanceStep: null,
        conditionPath: [
          { condition: "verleitung", variant: "Eine zweite Person holt das Dummy zuerst, der Hund bleibt sitzen." },
          { condition: "ausgang", variant: "Ihr geht zu zweit nebeneinander und bleibt in Bewegung." },
          { condition: "verleitung", variant: "Ein lautes Signal oder ein Schuss fällt, bevor das Dummy fliegt." },
          { condition: "ort", variant: "In einem unbekannten Gelände, mit Menschen und Ablenkung." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Bleibt bei Fuß, wenn aus der Bewegung ein Dummy fliegt, auch wenn eine zweite Person zuerst arbeitet, ein lautes Signal fällt und ihr in unbekanntem Gelände seid. Drei Durchgänge.",
        run: "In Bewegung gehen, Dummy fliegt, in der Situation der heutigen Stufe.",
        examHint: "In der Prüfung fällt an dieser Stelle ein Schuss. Im Training ist ein Lautzeichen zulässig und gleichwertig: Die DP-E gibt es ausdrücklich in beiden Varianten, mit Schuss und ohne.", // praxistauglichkeit.md, Abschnitt 1
        reps: 3, // Tage mit gelungenem Durchgang
        load: 1, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }, { id: "schreckschuss", n: 1, steps: [3], optional: true }],
        setup: ["Eine zweite Person, mit oder ohne Hund"], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: "walkup",
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "In der Linie gehen, Hund frei bei Fuß. Walk-up ohne Leine ab etwa 12 Monaten.",
          "Aus der Bewegung fliegt ein Dummy. Die Linie bleibt stehen, der Hund setzt sich ohne Signal.",
          "Eine zweite Person arbeitet zuerst. Der Hund bleibt sitzen und beobachtet.",
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
        signals: ["fetch"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "In die Hand, ohne Ablegen",
        exam: null,
        examClass: null,
        maxDistanceStep: null,
        conditionPath: [
          { condition: "gegenstand", variant: "Mit dem Welpendummy, 200 Gramm.", lightOnly: true },
          { condition: "gegenstand", variant: "Mit dem Juniordummy, 400 Gramm." },
          { condition: "belohnung", variant: "Du hast kein Leckerchen in der Hand, wenn er abgibt." },
          { condition: "position", variant: "Er gibt im Stehen vor dir ab, ohne sich zu setzen." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Bringt den Dummy bis in die Hand und legt nicht ab, bei zehn Retrieves in Folge ohne Fehler. Die zehn dürfen auf mehrere Gruppen verteilt sein.",
        run: "10 kurze Retrieves bis 10 Meter, in Gruppen von drei bis vier. Nach jeder Gruppe freigeben und etwas anderes machen, dann weiter.",
        todayNote: "Das leichtere Dummy ist Absicht: Hier geht es um die saubere Abgabe, nicht um das Gewicht. Mit 500 Gramm arbeitest du ab Silber.", // nur bei Profilen, die wirklich 500 g bekommen
        reps: 3, // Tage mit gelungenem Durchgang
        load: 5, // Belastungspunkte pro Durchgang
        gear: [{ id: "welpendummy", n: 1, steps: [1], swap: true }, { id: "juniordummy", n: 1, steps: [2, 3, 4], swap: true }], // praxistauglichkeit.md, Abschnitt 3; Standard 500 g erst ab E Silber
        dummyType: "junior", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        amount: { n: 10, unit: "Retrieves" }, // zählbare Menge aus run, für Kürzung bei Belastungslimit
        diagram: null,
        stepsType: "varianten",
        steps: [
          "Kurze Retrieves, maximal 10 Meter.",
          "Sobald er zurückkommt: nicht stehen bleiben, sondern ein paar Schritte rückwärts gehen. Das zieht ihn bis an dich heran.",
          "Dummy ruhig abnehmen, eine Hand von unten unter das Kinn.",
          "Nicht sofort wegnehmen. Kurz halten, loben, dann abnehmen.",
        ],
        tips: [
          "Zehn Wiederholungen klingen viel. Für Markierungen und Suchen wären sie es auch, dort sind vier bis fünf genug. Hier geht es um zehn Meter hin und zurück, ohne Suchen und ohne Nasenarbeit: Das zählt in der Belastung halb.",
          "Häufige Ursachen: Dummy zu schnell abgenommen, zu großes Theater, Hund kommt nicht weit genug heran.",
        ],
        warning: null,
      },
      {
        id: "silber",
        signals: ["fetch", "release_dummy"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Sitzen bei der Abgabe",
        exam: null,
        examClass: null,
        maxDistanceStep: null,
        conditionPath: [
          { condition: "gegenstand", variant: "Mit dem Standarddummy, 500 Gramm." },
          { condition: "gegenstand", variant: "Mit einem Felldummy." },
          { condition: "position", variant: "Er kommt in die Fußposition und gibt von dort ab." },
          { condition: "ausgang", variant: "Er hält das Dummy, bis du das Aus-Signal gibst." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Kommt in die Fußposition und hält das Dummy, bis du das Aus-Signal gibst. Fünf Retrieves.",
        run: "5 Retrieves am Stück, jedes Mal hält er das Dummy, bis du das Aus-Signal gibst. Danach eine Pause.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 5, // Belastungspunkte pro Durchgang
        gear: [{ id: "standarddummy", n: 1 }], // feste Angabe, das Gewicht ist hier die Übung (unsichtbare-inhalte.md, Abschnitt 5)
        profileNotes: [ // der erste passende Hinweis gilt, der Gelenkbefund geht vor
          { joints: ["deutlich"], text: "Bei deutlichem Gelenkbefund ist dieses Level nicht geeignet. Bleib bei Bronze oder sprich das Gewicht mit dem Tierarzt ab." },
          { ages: ["welpe", "junghund"], text: "Dieses Level setzt voraus, dass er das Standarddummy tragen kann. Wenn nicht, bleib bei Bronze." },
        ],
        dummyType: "standard", // null | "standard" | "junior"; hier geht es um schwere Gegenstände, deshalb nicht in der Mini-Session (nachtrag-review.md, Abschnitt 5)
        amount: { n: 5, unit: "Retrieves" }, // zählbare Menge aus run, für Kürzung bei Belastungslimit
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Erst wenn Bronze sicher sitzt.",
          "Er kommt an, geht in die Fußposition und hält das Dummy.",
          "Du gehst ein paar Schritte rückwärts, kommst zurück, nimmst dann erst ab. Das baut Geduld auf.",
        ],
        tips: [
          "Hier sind es fünf, nicht zehn: Die Distanz ist nicht mehr begrenzt, und schwere oder ungewohnte Gegenstände kosten Kraft und Konzentration.",
          "Nie hetzen. Die Ruhe bei der Abgabe überträgt sich.",
        ],
        warning: null,
      },
      {
        id: "gold",
        signals: ["fetch", "release_dummy"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Abgabe unter Erregung",
        exam: null,
        examClass: null,
        maxDistanceStep: null,
        conditionPath: [
          { condition: "gegenstand", variant: "Mit einem nassen Dummy aus dem Wasser." },
          { condition: "gegenstand", variant: "Mit einem sperrigen oder ungewohnten Gegenstand." },
          { condition: "verleitung", variant: "Ein zweites Dummy liegt sichtbar bereit." },
          { condition: "ort", variant: "Mit Zuschauern, die zusehen und sich bewegen." },
        ], // je Stufe eine Bedingung (interne Kategorie) und ihr Text (stufen-texte.md, Abschnitt 2)
        criteria: "Saubere Abgabe bei hoher Erregung: mit nassem Dummy aus dem Wasser, mit einem sperrigen Gegenstand, wenn ein zweites Dummy bereitliegt und wenn Zuschauer dabei sind. Drei Durchgänge.",
        run: "3 Retrieves einzeln in der Situation der heutigen Stufe, jedes Mal bei hoher Erregung, dazwischen etwas anderes machen.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 5, // Belastungspunkte pro Durchgang: drei Abgaben plus die Apports davor (pfade-und-prinzipien.md, Abschnitt 5)
        gear: [{ id: "dummy", n: 2 }],
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null,
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Nach langem Retrieve üben, wenn die Erregung hoch ist.",
          "Bei Wasser: direkt an der Wasserkante stehen. Verhindert Ablegen am Ufer und Schütteln vor der Abgabe.",
          "Erregung herstellen: mehrere Apports hintereinander laufen lassen, dann die Abgabe prüfen. Nicht drei Abgaben am Stück verlangen.",
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
        signals: ["fetch"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Einzelmarke",
        exam: "markierapport", // dp-e-korrektur.md, Abschnitt 4
        examClass: "DP-E",
        maxDistanceStep: 2,
        path: [{ d: 1, g: 1 }, { d: 2, g: 1 }, { d: 1, g: 2 }, { d: 2, g: 2 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Direkter Weg hin und zurück, sauberes Apportieren, bis 30 Meter. Drei Durchgänge, verteilt auf offenes Gelände und niedrige Deckung.",
        run: "5 Einzelmarken auf der Distanz und im Gelände der heutigen Stufe, in zwei Gruppen, dazwischen freigeben.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 4, // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 1 }, { id: "markierstab", n: 4, optional: true }],
        setup: ["Optional eine zweite Person für das Halbblind"], // Gelände, zweite Person: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        amount: { n: 5, min: 3, unit: "Einzelmarken" }, // zählbare Menge aus run, für Kürzung bei Belastungslimit
        diagram: "single-mark",
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Hund sitzt in der Fußposition neben dir.",
          "Dummy hoch und weit werfen, damit die Flugbahn gut sichtbar ist.",
          "Warten, bis er fokussiert ist, dann schickst du ihn.",
          "Abgabe nach Track E.",
          "Variante Doppelmarkierung DP-E: Zwei Dummys werfen lassen, Winkel mindestens 90 Grad. Du holst den zuerst geworfenen selbst, der Hund bleibt sitzen. Dann schickst du ihn zum zuletzt geworfenen.",
          "Variante Halbblind: Hund holt ein geworfenes Dummy. Während er zurückläuft, legt eine zweite Person an derselben Stelle ein zweites ab. Dann schicke ihn erneut.",
        ],
        tips: [
          "Maximal drei bis fünf Würfe.",
          "Markierstab optional, hilft dir selbst bei der Orientierung.",
        ],
        warning: null,
      },
      {
        id: "silber",
        signals: ["fetch"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Doppelmarke",
        exam: "markierung",
        examClass: "A",
        maxDistanceStep: 3,
        path: [{ d: 2, g: 2 }, { d: 3, g: 2 }, { d: 2, g: 3 }, { d: 3, g: 4 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Beide Dummys in richtiger Reihenfolge, Winkel mindestens 90 Grad, drei Durchgänge.",
        run: "2 Doppelmarken-Sequenzen nacheinander, jeweils zuletzt geworfener Dummy zuerst, dazwischen freigeben.",
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
        signals: ["fetch"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Doppelmarkierung auf F-Niveau",
        exam: "markierung",
        examClass: "F",
        maxDistanceStep: 4,
        path: [{ d: 3, g: 3 }, { d: 4, g: 3 }, { d: 3, g: 4 }, { d: 4, g: 4 }], // Distanz- und Geländestufe je Schritt (Abschnitt 7)
        criteria: "Beide Dummys in der vorgegebenen Reihenfolge, bis 80 Meter, mindestens ein Dummy in Deckung oder über Wasser. Drei Durchgänge.",
        run: "Zwei Dummys im engen Winkel, auf Distanz und Gelände der heutigen Stufe. Reihenfolge vorgeben, bevor du schickst.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "dummy", n: 2 }, { id: "markierstab", n: 4 }],
        setup: ["Eine zweite Person", "Gelände mit Sichtkante oder Wasser"], // Gelände, Helfer, Werfer: nicht in die Packliste
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
          "Mehrere Markierstäbe aufstellen, Dummy nur bei einem. Sonst lernt er, zum nächsten Stab zu laufen, statt sich die Fallstelle zu merken.",
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
    requires: ["E:bronze"], // ohne saubere Abgabe wird die Verlorensuche ein Sammelspiel (rubriken-review.md, Abschnitt 5)
    levels: [
      {
        id: "bronze",
        signals: ["area", "search"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
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
        signals: ["area", "search"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
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
        signals: ["area", "search"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
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
    short: "Den Hund auf Distanz lenken: geradeaus, weiter von dir weg, zur Seite, und auf ein Dummy, das er nicht gesehen hat.",
    desc: "Hier wird aus Einzelteilen ein System. Immer erst Stopp-Pfiff, dann Handzeichen.",
    axis: "distanz", // "bedingungen" | "distanz"
    minAgeMonths: 12, // Hinweis, keine Prüfung (fundament-umbau-2.md, Abschnitt 3)
    minAgeNote: "Folgt auf Markierung und Suche",
    requires: ["A:silber", "F:silber", "G:silber"],
    levels: [
      {
        id: "bronze",
        signals: ["out"], // im Heute-Block (kriterien-und-stufen.md, Abschnitt 8)
        phase: "erlernen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Voran - die gerade Linie",
        exam: "einweisen",
        examClass: "F",
        maxDistanceStep: 2,
        path: [ // eigene Stufentexte statt Distanz und Gelände (ebenen-abgleich.md, Abschnitt 1)
          { d: 1, g: 1, text: "Futterschüssel an einer Leitlinie, etwa 15 Meter." },
          { d: 1, g: 1, text: "Dummy statt Schüssel, an derselben Leitlinie." },
          { d: 2, g: 1, text: "Halbblind: eine zweite Person legt nach, während er zurückläuft. Bis 30 Meter." },
          { d: 2, g: 1, text: "Vollblind: vorher ausgelegt, er hat nichts gesehen. Bis 30 Meter." },
        ],
        criteria: "Läuft auf Handzeichen und Signal in gerader Linie vom Führer weg und nimmt ein nicht sichtbar ausgelegtes Dummy auf. Bis 30 Meter. Drei Durchgänge.",
        run: "Ein Durchgang auf der heutigen Stufe: ausrichten, Handzeichen, Voran.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 1, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "futterschuessel", n: 1, steps: [1], swap: true }, { id: "dummy", n: 1, steps: [2, 3, 4], swap: true }],
        setup: ["Leitlinie im Gelände", { text: "Eine zweite Person", steps: [3] }], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: null, // offen: fundament-umbau-2.md nennt kein Diagramm
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Futterschüssel an einer Leitlinie (Weg, Zaun, Grabenkante) auslegen, Hund daneben ausrichten, Handzeichen, Signal. Die Leitlinie macht die gerade Linie für den Hund selbsterklärend.",
          "Entfernung vergrößern, Leitlinie beibehalten.",
          "Zwei Schüsseln als Ablenkung, der Hund muss die ausgerichtete nehmen.",
          "Dummy statt Schüssel.",
          "Halbblind: Eine zweite Person legt nach, während der Hund zurückläuft. Der Hund weiß, dass dort etwas liegt, hat es aber nicht gesehen.",
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
        signals: ["stop", { key: "back", steps: [1, 4] }, { key: "over", steps: [2, 3, 4] }], // im Heute-Block, optional an Stufen gebunden (stufen-feinschliff.md, Abschnitt 1)
        phase: "ueben", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Richtungssignale",
        exam: "einweisen",
        examClass: "F",
        maxDistanceStep: 2,
        path: [ // eigene Stufentexte, Distanzwerte bleiben im Hintergrund (h-stufen.md, Abschnitt 2)
          { d: 1, g: 1, text: "Back allein: Stopp, dann Arm senkrecht über den eigenen Kopf. Bis 15 Meter." },
          { d: 2, g: 1, text: "Eine Seite allein, immer dieselbe. Bis 30 Meter." },
          { d: 2, g: 1, text: "Die andere Seite allein. Bis 30 Meter." },
          { d: 2, g: 1, text: "Back und beide Seiten gemischt, du wählst die Richtung. Bis 30 Meter." },
        ],
        criteria: "Nimmt nach dem Stopp-Pfiff Back, Rechts und Links an und läuft in die gezeigte Richtung. Das Wort ist für beide Seiten dasselbe, die Richtung zeigt der Arm. Wer zwei Wörter nutzt, trägt beide in das Profilfeld ein, etwa \"Rechts, Links\". Bis 30 Meter. Drei Durchgänge.",
        run: "Hund auf Distanz stoppen, dann ein Richtungssignal. Bei Back: Arm neutral vor die Brust, zwei Sekunden warten.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 2, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 2 }],
        setup: ["Offenes Gelände"], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: "directions",
        stepsType: "varianten", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Erst eine Richtung allein, dann die andere allein, dann beide mit Wahl.",
          "Variante Voran auf der Uhr: aus derselben Position in leicht versetzte Richtungen schicken, die Winkel schrittweise enger. Das ist eine Voran-Übung für enge Winkel, keine Einweisen-Übung nach dem Stopp.",
        ],
        tips: [
          "Bindeglied: Jede Richtungsübung beginnt mit Stopp-Pfiff und erhobenem Arm. Ohne sauberen Stopp kein Richtungssignal.",
          "Der Arm muss zwischen Stopp und Richtungssignal herunter. Hunde sind Bewegungsseher: Bleibt der Arm oben, fehlt die Bewegung, die das neue Signal trägt.",
          "Back-Timing: Stopp-Pfiff, Arm in neutrale Position vor der Brust, zwei Sekunden Pause, dann Arm nach oben schnellen, Signal während der Armbewegung. Arm oben stehen lassen.",
          "Drehrichtung beachten: rechter Arm, der Hund dreht über die linke Schulter. Spiegelbildlich, weil er dich ansieht.",
          "Nicht einseitig aus der Fuß-Position üben, sonst kommt der Hund beim Pfiff zurück statt zu stoppen.",
          "Belohnungsapport für Fortgeschrittene: Dummy über den Hund hinweg nach hinten oder seitlich werfen und mit Back beziehungsweise der Seitenrichtung schicken. So wird der Stopp selbst zur Einweise-Übung.",
        ],
        warning: "Die Reihenfolge ist im Buch festgelegt und darf nicht geändert werden: Voran, dann Back, dann Rechts und Links. Rechts und Links sind für den Hund leichter, werden aber zuletzt aufgebaut, um ihn nicht zu verwirren.",
      },
      {
        id: "gold",
        signals: ["stop", "out", { key: "search", steps: [3, 4] }], // im Heute-Block, optional an Stufen gebunden (stufen-feinschliff.md, Abschnitt 1)
        phase: "festigen", // Lernphase nach Stufe (fundament-umbau-2.md, Abschnitt 2)
        title: "Einweisen in ein Suchengelände",
        exam: "einweisen",
        examClass: "O",
        maxDistanceStep: 4,
        path: [ // eigene Stufentexte (h-stufen.md, Abschnitt 3)
          { d: 2, g: 1, text: "Einweisen auf ein Dummy, dessen Lage du kennst. Bis 30 Meter, offenes Gelände." },
          { d: 3, g: 3, text: "Einweisen über einen Geländewechsel. Bis 50 Meter." },
          { d: 3, g: 3, text: "Am Ziel das Suchensignal, er sucht von dort selbstständig. Bis 50 Meter." },
          { d: 4, g: 3, text: "Einweisen in ein Suchengelände, bis 80 Meter, höchstens zwei Korrekturen." },
        ],
        criteria: "Wird auf ein nicht sichtbar ausgelegtes Dummy in ein Suchengelände eingewiesen und arbeitet dort selbstständig. Bis 80 Meter, maximal zwei Korrekturen. Drei Durchgänge.",
        run: "Ein Durchgang auf der heutigen Stufe: Dummy vorher auslegen, Hund ausrichten, Voran.",
        reps: 3, // Tage mit gelungenem Durchgang
        load: 1, // Belastungspunkte pro Durchgang (fundament-umbau-3.md, Abschnitt 7) // Belastungspunkte pro Durchgang
        gear: [{ id: "pfeife", n: 1 }, { id: "dummy", n: 1 }, { id: "suchdummy", n: 1, optional: true, steps: [3, 4] }], // Suchendummy optional für die Kleine Suche am Zielort (Teil 3, Abschnitt 5)
        setup: [{ text: "Suchengelände mit natürlicher Begrenzung", steps: [3, 4] }], // Gelände, Helfer, Werfer: nicht in die Packliste
        dummyType: "standard", // null | "standard" | "junior" (Juniordummy 400 g reicht)
        diagram: "einweisen-gelaende",
        stepsType: "ablauf", // "varianten" | "ablauf" (fundament-umbau-5.md, Abschnitt 3)
        steps: [
          "Dummy ohne Hund auslegen, Auslegefährte vermeiden (nicht auf direktem Weg zurücklaufen).",
          "Hund exakt ausrichten. Buch S. 53: Ist der Hundeführer richtig ausgerichtet, ist der Hund es auch. Die Fuß-Position links existiert genau dafür.",
          "Voran. Bei Abweichung Stopp-Pfiff, dann Richtungssignal.",
          "Am Zielgelände das Suchensignal geben, und zwar nicht automatisch, sondern in dem Moment, in dem der Hund Witterung bekommt. Arm seitlich nach unten, Handfläche zum Hund. Ab Stufe 3.",
          "Ab dort arbeitet der Hund selbstständig. Nicht weiter lenken. Ab Stufe 3.",
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
  // desc und die mit held markierte Regel werden nicht angezeigt, Widerspruch gemeldet (unsichtbare-inhalte.md, Abschnitt 1)
  desc: "Kein eigener Track, sondern eine Variante. Jede Übung aus Marking, Nasenarbeit oder Richtung kann ans Wasser verlegt werden, sobald sie an Land auf Silber sitzt.",
  rules: [
    { text: "Nur im Sommer einführen. Kaltes Wasser beim Erstkontakt kann einen Hund dauerhaft abschrecken." },
    { text: "Reihenfolge: ein paar Retrieves an Land, dann am Ufer, dann ins Wasser, dann über das Wasser." },
    { text: "Drei erfolgreiche Retrieves pro Session reichen völlig.", held: true },
    { text: "Keine neuen Konzepte am Wasser einführen. Nur wiederholen, was an Land sitzt." },
    { text: "Du stehst direkt an der Wasserkante, um den Retrieve anzunehmen." },
    { text: "Schwimmender Dummy, gut greifbar, gut sichtbar." },
  ],
  jointWarning:
    "Bei Gelenkeinschränkung nur flacher Einstieg. Kein Absprung von Uferkanten. Schwimmen selbst ist gelenkschonend, der Ein- und Ausstieg ist das Risiko.",
};

// ─── Session-Vorlagen ─────────────────────────────────────────
// Blockminuten = reine Übungszeit (stufen-texte.md, Abschnitt 4). Aufwärmen und Cool Down stehen in WARMUP_COOLDOWN,
// die Gesamtdauer rechnet sessionDuration() aus beidem. Vollsession: Werte aus dem Beispiel der Spec (8/12/5);
// Kurzübung und Mini-Session: Übungszeiten wie vor fundament-umbau-2.md (1/5/1, 1/6/1), gemeldet.
export const SESSION_TYPES = [
  {
    id: "voll",
    name: "Vollsession",
    short: "Vollsession",
    icon: "target",
    desc: "Gezielter Fokus",
    blocks: [
      { role: "warmup",  minutes: 8,  label: "Erster Teil",   hint: "Ein Level, das bereits sitzt. Bevorzugt Stopp-Pfiff, Rückruf oder Fuß." },
      { role: "main",    minutes: 12, label: "Hauptteil", hint: "Das aktuell offene Level. Der Umfang richtet sich nach dem Belastungslimit aus dem Hundeprofil." },
      { role: "cooldown", minutes: 5,  label: "Abschluss", hint: "Ein Level, das sicher gelingt. Bevorzugt Nasenarbeit oder einfache Marke." },
    ],
    allowedTracks: ["A", "B", "C", "D", "E", "F", "G", "H"],
  },
  {
    id: "kurz",
    name: "Kurzübung im Spaziergang",
    short: "Kurzübung",
    icon: "walk",
    desc: null, // nur die Dauer; was mitzunehmen ist, steht in der Packliste
    blocks: [
      { role: "warmup",  minutes: 1, hideMinutes: true, label: "Erster Teil",   hint: "Kurz ankommen." },
      { role: "main",    minutes: 5, label: "Hauptteil", hint: "Ein Signal gezielt üben." },
      { role: "cooldown", minutes: 1, hideMinutes: true, label: "Abschluss", hint: "Sicherer Erfolg." },
    ],
    allowedTracks: ["A", "B", "C"],
  },
  {
    id: "mini",
    name: "Mini-Session",
    short: "Mini-Session",
    icon: "pocket",
    desc: null, // nur die Dauer; was mitzunehmen ist, steht in der Packliste
    blocks: [
      { role: "warmup",  minutes: 1, label: "Erster Teil",   hint: "Zwei Stopps oder ein Rückruf." },
      { role: "main",    minutes: 6, label: "Hauptteil", hint: "Appell, Führigkeit, Steadiness oder Abgabe. Kurz, ohne Aufbau." },
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

// Unter Erster Teil und Abschluss, solange noch kein Level geschafft ist (praxis-nachtrag.md, Abschnitt 4)
export const FALLBACK_NOTES = {
  warmup: "Noch kein Level geschafft, deshalb ein einfacher Einstieg. Sobald du das erste Level abgeschlossen hast, steht hier eine Übung, die sicher sitzt.",
  cooldown: "Noch kein Level geschafft, deshalb ein einfacher Abschluss. Sobald du das erste Level abgeschlossen hast, steht hier eine Übung, die sicher sitzt.",
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
  // warmup/cooldown: Kurzform für die Tabelle im Basics-Tab. warmupGuide/cooldownGuide: Anleitung im Heute-Tab
  // (erklaeren-statt-nennen.md, Abschnitt 1).
  voll: {
    warmupMin: 15, cooldownMin: 10, warmup: "15 min, nie unter 10. Er soll danach warm sein, nicht müde.", cooldown: "ca. 10 min",
    warmupGuide: {
      steps: [
        "Lockeres Traben, ein paar Minuten.",
        "Kontrolliertes Schrittgehen.",
        "Wieder in den Trab.",
        "Ein paar kontrollierte Galoppsprints.",
        "Dann Sprints, Stopps und Wendungen, dazu ein paar Konzentrations- und Gehorsamsübungen.",
        "Zum Schluss selbstständige Dehnübungen, also ihn strecken und schütteln lassen.",
      ],
      notes: ["Nicht über 30 Prozent dessen gehen, was er leisten könnte: Er soll danach warm sein, nicht müde. Unter 10 Minuten sind die Stoffwechselabläufe in den Gelenken nicht aktiviert."],
    },
    // Nach Profil (pfade-und-prinzipien.md, Abschnitt 5): abgeleitet, das Buch unterscheidet hier nicht.
    // "leicht" gilt auch für "unbekannt" und WARMUP_GENTLE_AGES; "deutlich" geht vor.
    warmupGuideJoints: {
      deutlich: {
        steps: [
          "Lockeres Traben, etwas länger als sonst.",
          "Kontrolliertes Schrittgehen.",
          "Noch einmal Trab.",
          "Weite Bögen statt enger Wendungen. Keine Galoppsprints.",
          "Konzentrations- und Gehorsamsübungen im Schritt.",
          "Zum Schluss selbstständiges Dehnen.",
        ],
        notes: [
          "Bei bekanntem Gelenkbefund den Ablauf einmal mit dem Tierarzt abstimmen. Die Zeiten gelten unverändert: Unter zehn Minuten bringt das Aufwärmen nichts.",
          "Nicht über 30 Prozent dessen gehen, was er leisten könnte: Er soll danach warm sein, nicht müde.",
        ],
      },
      leicht: { replaceSteps: {
        3: "Ein paar kontrollierte Galoppsprints, kurz halten.",
        4: "Dann Stopps aus dem Trab und weite Wendungen, dazu ein paar Konzentrations- und Gehorsamsübungen.",
      } },
    },
    cooldownGuide: {
      steps: [
        "Lockerer Trab.",
        "Schritt gehen, bis die Atmung wieder normal ist.",
        "Leichte selbstständige Dehnübungen.",
      ],
      notes: [
        "**Selbstständig** heißt: Der Hund dehnt sich selbst, du dehnst ihn nicht. Gib ihm nach der Arbeit ein paar ruhige Minuten, dann macht er es von allein: sich lang strecken mit den Vorderbeinen vorn und dem Hinterteil hoch, sich nach hinten recken, schütteln. Das sind die Bewegungen, um die es geht.",
        "Ihn selbst zu ziehen oder Beine zu strecken ist etwas anderes und gehört in die Hand einer Hundephysiotherapeutin. Wer gezielte Dehnübungen machen will, lässt sie sich einmal zeigen, statt sie aus einer App zu lernen.",
      ],
    },
  },
  kurz: {
    warmupMin: 5, cooldownMin: [3, 5], warmup: "5 min, zügiges Lösen und Traben", cooldown: "3 bis 5 min",
    warmupGuide: { notes: ["Lockeres Traben, dann kontrolliertes Schrittgehen, zum Schluss ein paar weite Bögen. Lösen lassen, bevor es losgeht."] },
    cooldownGuide: { notes: ["Lockerer Trab, dann Schritt, bis die Atmung ruhig ist."] },
  },
  mini: {
    warmupMin: 3, cooldownMin: null, warmup: "3 min Bewegung, kein strukturiertes Programm", cooldown: null, // Cool Down entfällt
    warmupGuide: { notes: ["Ein paar Minuten lockeres Gehen und Traben, bevor du das erste Mal etwas verlangst."] },
  },
  whyWarmup: "**Warum aufwärmen:** Erst nach etwa zehn Minuten Bewegung sind die Stoffwechselabläufe in den Gelenken aktiviert. Gelenkschmiere, Knorpeldicke und Pufferfunktion brauchen diese Zeit. Wer ohne Aufwärmen mit Sprints und Wendungen anfängt, belastet kalte Gelenke. Beim Aufwärmen nicht über 30 Prozent dessen gehen, was er leisten könnte.",
  rules: [
    "Nach dem Aufwärmen zügig starten.",
    "Wartezeit maximal 5 bis 10 Minuten.",
    "Über 20 Minuten Wartezeit: neu aufwärmen.",
  ],
  // Bei Kurzübung und Mini-Session anzuzeigen
  shortNote: "Die verkürzte Variante liegt unter der physiotherapeutischen Empfehlung und ist nur bei geringer Belastungsintensität vertretbar.",
};

export const WARMUP_GENTLE_AGES = ["welpe", "junghund", "senior"];

// ─── Session-Regeln aus dem Fundament (Abschnitt 11; Zvolsky) ──
export const SESSION_GUIDANCE = {
  // S. 87, wörtlich. Umsetzung: beim Fortsetzen den Schritt vor dem erreichten vorschlagen, überschreibbar.
  startOneStepBack: "Beginnen Sie an jedem Trainingstag mit der jeweiligen Übung (Trainingseinheit) immer einen Schritt vor dem Punkt, an dem Sie das letzte Mal aufgehört haben. Somit geben Sie dem Hund die Möglichkeit, sich an die Übung zu erinnern.",
  // Umsetzung: nach einem gelungenen Durchgang Pause vorschlagen, nicht die nächste Wiederholung
  afterSuccess: "Hat die Übung geklappt, dann machen Sie erst einmal eine Pause. Eine gerade gelungene Übung noch mehrmals zu wiederholen oder gar die Anforderungen gleich zu steigern, ist in der Regel kontraproduktiv.",
  // S. 86: alles vorbereiten, bevor der Hund aus dem Auto kommt. when: wann der Punkt heute gilt
  // (praxistauglichkeit.md, Abschnitt 2; ausgewertet in sessionChecklist)
  checklist: [
    { text: "Dummys ausgelegt", when: "trackH" },
    { text: "Zweite Person instruiert", when: "zweitePerson" },
    { text: "Suchengebiet abgesteckt", when: "trackG" },
    { text: "Jacke zugeknöpft", when: "immer" },
    { text: "Pfeife in der Hand oder im Mund", when: "pfeife" },
    { text: "Hund gelöst, angeleint, konzentriert", when: "immer" },
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
  // Zwischen den Blöcken (erklaeren-statt-nennen.md, Abschnitt 2); pauseBeginner bei Erfahrung "keine"
  pause: "Mach ein paar Minuten etwas anderes, bevor der nächste Block kommt. Zwei Übungen direkt hintereinander verwechselt der Hund leicht, und was er einmal verwechselt hat, muss man mühsam wieder trennen.",
  pauseBeginner: "Wechsle dabei auch den Ort, nicht nur die Zeit.",
  whenToHelp: "Wenn Sie den Eindruck gewinnen, Ihr Hund verzweifelt an der gestellten Aufgabe; wenn Sie beobachten, dass seine Motivation schwindet oder dass er unsicher wird, dann müssen Sie ihm unbedingt helfen.",
  whenNotToHelp: "Sonst nicht: er muss lernen, selbstständig zu arbeiten und eigene Erfahrungen zu sammeln.",
};

// Ab Distanzstufe 3 (praxis-nachtrag.md, Abschnitt 1): Verweis, keine Sperre
export const DISTANCE_LEGAL_NOTE = "Für diese Distanzen brauchst du eine passende Fläche, siehe Basics: Wo du legal trainierst.";

// Bei Leveln mit Prüfungsbezug DP-E (dp-e-korrektur.md, Abschnitt 4)
export const DPE_AGE_NOTE = "Für die DP-E muss der Hund am Prüfungstag mindestens 12 Monate alt sein. Trainieren kannst du früher.";
export const DPE_SHOT_NOTE = "Die DP-E gibt es mit Schuss (m. S.) und ohne (o. S.). In der Variante ohne Schuss wird ein Lautzeichen gegeben. Wer den Hund noch nicht an den Schuss gewöhnt hat, meldet die Variante ohne.";

// Buchsatz zum Einstieg, nach Geltungsbereich aufgelöst (unsichtbare-inhalte.md, Abschnitt 3)
const MIN_AGE_START = "**Ganz am Anfang** reichen zwei bis drei Apportiereinheiten pro Woche mit je zwei bis drei Wiederholungen.";
export const MIN_AGE_NOTES = {
  "E:bronze": "**Ganz am Anfang**, in den ersten Wochen nach dem Zahnwechsel, reichen zwei bis drei Apportiereinheiten pro Woche mit je zwei bis drei Wiederholungen. Bleib dann unter den zehn Retrieves dieses Levels. Das Level gilt erst als geschafft, wenn er sie sauber schafft.",
  "F:bronze": `${MIN_AGE_START} Die fünf Marken dieses Levels setzen voraus, dass er das Apportieren kennt.`,
};

// held: nicht angezeigt, Widerspruch zum aktuellen Stand gemeldet (unsichtbare-inhalte.md, Abschnitt 1)
export const SESSION_RULES = [
  { text: "Der Hauptteil bestimmt den Sessiontyp. Braucht er Equipment, ist es eine Vollsession.", held: true },
  { text: "Warm-up und Abschluss sind nie das aktuell offene Level. Sie müssen sicher gelingen.", held: true },
  { text: "Nie zwei schwere Blöcke kombinieren.", held: true },
  { text: "Die Summe der Wiederholungen bleibt unter dem Retrieve-Limit aus dem Hundeprofil.", held: true },
  { text: "Nach dem Hauptteil keine neue Schwierigkeit mehr einführen." },
];

// ─── Meine Signale (docs/profil-und-aufraeumen.md, Abschnitt 2) ─
// Schlüssel wie {signal.x} im Glossar. Pfiffsignale: Freitext für das Muster.
const WHISTLE_PLACEHOLDER = "z.B. ein kurzer Ton, Pfiff-peeeep, drei kurze";
export const SIGNAL_FIELDS = [
  { key: "stop",    label: "Stopp auf Distanz",    term: "Stopp-Signal", default: "Pfiff, ein kurzer Ton",    placeholder: WHISTLE_PLACEHOLDER },
  { key: "recall",  label: "Rückruf",              term: "Rückruf-Signal", default: "Pfiff, mehrere kurze Töne", placeholder: WHISTLE_PLACEHOLDER },
  { key: "search",  label: "Kleine Suche",         term: "Suchen-Signal", default: "Such" },
  { key: "area",    label: "Große Suche, Gebiet",  term: "Gebietssignal", default: "Verloren" },
  { key: "out",     label: "Geradeaus, Voran",     term: "Richtungssignal geradeaus", default: "Voran" },
  { key: "back",    label: "In die Tiefe",         term: "Richtungssignal in die Tiefe", default: "Back" },
  { key: "over",    label: "Seitlich",             term: "Richtungssignal seitlich", default: "Rüber" },
  { key: "fetch",   label: "Apportieren",          term: "Apport-Signal", default: "Bring" },
  { key: "release", label: "Freigabe",             term: "Freigabe-Signal", default: "Lauf" },
  { key: "release_dummy", label: "Dummy abgeben", term: "Signal zum Dummy abgeben", default: "Aus" },
  { key: "heel",    label: "Fußposition links",    term: "Positionssignal", default: "Fuß" },
  { key: "side2",   label: "Zweite Seite, rechts", default: "", optional: true }, // leer: kein Hinweis auf eine zweite Seite
];
export const SIGNAL_DEFAULTS = Object.fromEntries(SIGNAL_FIELDS.map((f) => [f.key, f.default]));
// Steht immer direkt unter dem Feld area, unabhängig von den eingetragenen Mustern
export const SIGNAL_SEARCH_NOTE =
  "Prüfe, ob der erste Ton deines Suchensignals dem Stopp-Pfiff gleicht. Hunde interpretieren bereits den ersten Ton und beginnen danach zu handeln. Setzt dein Hund sich auf das Suchensignal, liegt es vermutlich daran. Teste es bewusst auf Distanz, bei Ablenkung und im hohen Bewuchs, dort tritt die Verwechslung zuerst auf.";

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
  // Dummys mit festem Gewicht, unabhängig vom Profil
  standarddummy:   { one: "Standarddummy 500 g", many: "Standarddummys 500 g", icon: "dummy", grams: 500 },
  welpendummy:     { one: "Welpendummy 200 g", many: "Welpendummys 200 g", icon: "dummy", grams: 200 },
  juniordummy:     { one: "Juniordummy 400 g", many: "Juniordummys 400 g", icon: "dummy", grams: 400 },
  suchdummy:       { one: "Suchendummy 80 g", many: "Suchendummys 80 g", icon: "pocket-dummy" },
  schreckschuss:   { one: "Schreckschuss", many: "Schreckschuss", icon: null },
};

// Dummy-Gewicht aus dem Profil: Welpe oder deutlicher Gelenkbefund 200 g, Junghund und Senior 400 g, sonst 500 g
// (pfade-und-prinzipien.md, Abschnitt 2; Senior ist dort als Ableitung gekennzeichnet)
export const DUMMY_WEIGHT = { light: 200, junior: 400, standard: 500, lightAges: ["welpe"], juniorAges: ["junghund", "senior"], lightJoints: ["deutlich"] };

// Texte für den Basics-Tab
export const EQUIPMENT_NOTES = {
  gewichte: "Ein Standard-Dummy wiegt 500 Gramm. Für Welpen nimmst du 200 Gramm, für Junghunde und Senioren 400, damit Gebiss und Gelenke nicht unnötig belastet werden. Bei deutlichem Gelenkbefund bleibst du auch beim erwachsenen Hund bei 200 Gramm.",
  wasser: "Fast alle Canvas-Dummys schwimmen, du brauchst für den Anfang nichts Zusätzliches. Canvas saugt sich im Wasser aber voll, wird schwerer und bleibt lange feucht. Wenn du regelmäßig am Wasser arbeitest, lohnt ein Wasserdummy aus Kunststoff: trocknet sofort und liegt sichtbarer auf der Oberfläche. Helle Farben helfen dir, die Fallstelle im Wasser im Blick zu behalten.",
};

export const DISCLAIMER =
  "Die App ersetzt keine tierärztliche Beratung. Bei bekannten Vorerkrankungen Belastungsgrenzen mit dem Tierarzt abstimmen.";

// Glossar: src/data/glossar.js (docs/glossar-v5.md)

// ─── Troubleshooting ──────────────────────────────────────────
// Noch nicht angezeigt: Prüfung gegen Buch und Regelwerk steht aus (pfade-und-prinzipien.md, Abschnitt 4)
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
    fix: "Vor dem Schicken Körperachse prüfen. Mehrere Markierstäbe aufstellen, Dummy nur bei einem. So lernt er, auf deine Richtungsangabe zu achten statt auf den nächstbesten Stab.",
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
  markierstab: "Ein Stab, der eine Stelle im Gelände markiert. Nicht der Stab ist das Ziel, deine Hand zeigt den Weg. Deshalb immer mehrere aufstellen und nur bei einem ein Dummy auslegen.",
};

// ─── Trophaeen ────────────────────────────────────────────────
// Track-Trophäe: was der Hund dann kann, aus dem Gold-Kriterium ohne Zählregel (rubriken-review.md, Abschnitt 7)
const goldAbility = (t) => t.levels.find((l) => l.id === "gold").criteria.replace(/\s*(Drei Durchgänge[^.]*|Fünfmal in Folge)\.$/, "");
export const TROPHIES = [
  // Track-Trophaeen
  ...TRACKS.map((t) => ({
    id: `track-${t.id}`,
    name: `${t.name} gemeistert`,
    desc: goldAbility(t),
    type: "track",
    condition: { track: t.id, level: "gold" },
  })),
  // Meilensteine
  { id: "first-session",  name: "Erster Schritt",     desc: "Erste Session dokumentiert",             type: "milestone", condition: { sessions: 1 } },
  { id: "sessions-10",    name: "Dranbleiber",        desc: "10 Sessions dokumentiert",               type: "milestone", condition: { sessions: 10 } },
  { id: "sessions-25",    name: "Routinier",          desc: "25 Sessions dokumentiert",               type: "milestone", condition: { sessions: 25 } },
  { id: "sessions-50",    name: "Dauerläufer",       desc: "50 Sessions dokumentiert",               type: "milestone", condition: { sessions: 50 } },
  { id: "all-bronze",     name: "Fundament",          desc: "Bereit für die DP-E: Alle acht Tracks auf Bronze. Damit deckst du die Einsteigerprüfung ab.", type: "milestone", condition: { allTracks: "bronze" } },
  { id: "all-silber",     name: "Fortgeschritten",    desc: "Bereit für die Anfänger-Klasse: Alle acht Tracks auf Silber.", type: "milestone", condition: { allTracks: "silber" } },
  { id: "first-water",    name: "Wasserratte",        desc: "Eine Session abgeschlossen, in der ein Dummy über Wasser ging.", type: "milestone", condition: { water: 1 } },
  { id: "one-cast",       name: "One-Cast Blind",     desc: "Blind ohne eine einzige Korrektur",      type: "milestone", condition: { manual: true } },
  { id: "all-gold",       name: "Gundog",             desc: "Bereit für die Fortgeschrittenen-Klasse: Alle acht Tracks auf Gold.", type: "final",     condition: { allTracks: "gold" } },
];

// ─── Methodische Grundprinzipien ──────────────────────────────
// Noch nicht angezeigt: "Eine Variable pro Steigerung" widerspricht den Pfaden, gemeldet (unsichtbare-inhalte.md, Abschnitt 1)
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
    desc: "Die Aufgabe so stellen, dass der Hund sie lösen kann. Als " +
          "Faustregel rund 80 Prozent Erfolgsquote." },
];
