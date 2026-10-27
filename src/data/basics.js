/**
 * Basics-Tab - aus docs/basics-tab.md (Stand 27.10.2026), Umsetzung nach docs/basics-umsetzung.md.
 * Reine Daten. Blocktypen: text, lead, list, check, table, quote, note. **fett** ist erlaubt,
 * "\n" im Text ist ein Zeilenumbruch.
 *
 * showWhen: nur sichtbar, wenn die Profilangabe passt (fehlt → immer sichtbar)
 * open:     beim Öffnen des Tabs aufgeklappt
 * kind:     "glossar" rendert den Glossar-Abschnitt statt blocks
 */
import { DISTANCE_STEPS, WARMUP_COOLDOWN, SESSION_TYPES, DUMMY_FACTS } from "./training.js";
import { GLOSSAR_SOURCES } from "./glossar.js";

const t = (content) => ({ type: "text", content });
const lead = (content) => ({ type: "lead", content });
const ol = (...items) => ({ type: "list", ordered: true, items });
const ul = (...items) => ({ type: "list", ordered: false, items });
const note = (content) => ({ type: "note", content });

// Klassentabelle: Distanzen aus DISTANCE_STEPS (Prüfungsmaß in note), nicht hart geschrieben
const examMeters = (label) => `${DISTANCE_STEPS.find((d) => d.note.includes(`Prüfungsmaß ${label}`))?.maxM} m`;

// Aufwärmen und Cool Down: dieselbe Quelle wie der Session-Builder (WARMUP_COOLDOWN)
const sessionName = (id) => SESSION_TYPES.find((s) => s.id === id)?.short ?? id;
const warmupTable = {
  type: "table",
  head: ["", "Aufwärmen", "Cool Down"],
  rows: ["voll", "kurz", "mini"].map((id) => [sessionName(id), WARMUP_COOLDOWN[id].warmup, WARMUP_COOLDOWN[id].cooldown ?? "entfällt"]),
};

export const BASICS_SECTIONS = [
  {
    id: "einstieg",
    title: "So fängst du an",
    open: true,
    showWhen: { experience: "keine" },
    blocks: [
      t("**Die ersten vier Wochen**\nFang mit Fuß, Abgabe und Stopp-Pfiff an. Fuß und Abgabe verzeihen Fehler, die korrigierst du nächste Woche. Beim Pfiff ist das anders: Ein Signal, auf das der Hund gelernt hat nicht zu reagieren, kostet Monate."),
      t("**Was du brauchst**\nEine Trillerpfeife und ein Dummy. Für Junghunde 400 Gramm, erwachsen 500. Mehr nicht. Markierstäbe und weitere Dummys kommen später dazu."),
      t("**Wie oft**\nZwei kurze Einheiten pro Woche. Das ist nicht Bequemlichkeit: In einer Studie mit 44 Hunden lernten die Tiere, die ein bis zwei Mal pro Woche trainierten, schneller als die täglich trainierten, und kurze Einheiten schlugen lange. Zwischen zwei Einheiten mit Apports liegt mindestens ein Ruhetag."),
      t("**Wie viel pro Einheit**\nVier bis fünf Apports sind genug. Mehr ist nicht mehr Training, sondern weniger Konzentration."),
      t("**Warum du nicht sofort einweisen lernst**\nErst Markierung und Suche, dann gelenkte Arbeit. Die Anfängerklasse enthält gar kein Einweisen, und im britischen Regelwerk ist zu viel Lenkung ein schwerer Fehler. Ein Hund, der früh ans Gelenktwerden gewöhnt wird, wartet auf Anweisungen statt selbst zu arbeiten."),
      t("**Die drei häufigsten Anfängerfehler**"),
      ul("Zweimal pfeifen, wenn der Hund nicht reagiert. Damit lernt er, dass der erste Pfiff unverbindlich ist.",
         "Den Hund hinterherschicken, wenn er zu früh losgelaufen ist. Damit belohnst du genau das Einspringen, das du abtrainieren willst.",
         "Jede Einheit mit dem Rückruf und dem Ende der Freiheit abschließen. Damit wird der Rückruf von Woche zu Woche langsamer."),
      note("**Diese App ersetzt keinen Trainer**\nPfiffaufbau und Steadiness verzeihen Fehler schlecht, und du merkst sie oft erst Wochen später. Wenn du die Möglichkeit hast, geh in eine Gruppe oder lass dir die ersten Einheiten einmal ansehen."),
    ],
  },
  {
    id: "ziel",
    title: "Worauf das Training hinarbeitet",
    open: true,
    blocks: [
      lead("Die Übungen folgen den deutschen Dummyprüfungen. Bronze ist die Einsteigerprüfung DP-E bis 30 Meter, Silber die Anfängerklasse Dummy A bis 50 Meter, Gold die Fortgeschrittenenklasse Dummy F bis 80 Meter. Deshalb heißt Bronze nicht einfach leicht, sondern Einsteigerniveau. Du musst nie zu einer Prüfung gehen, aber die Stufen bedeuten etwas außerhalb dieser App."),
      t("**Distanz ist nicht die Hauptschwierigkeit.** Jedes Level hat vier Stufen, und die steigern Distanz und Geländeschwierigkeit abwechselnd, nicht gemeinsam. Wird das Gelände schwerer, geht die Distanz eine Stufe zurück. Das ist keine Bequemlichkeit, sondern eine Regel aus der Fachliteratur: \"Erhöhen Sie im Training die Schwierigkeitsstufe, dann müssen Sie erst einmal wieder die Entfernung verkürzen.\""),
      t("Die Distanzen stehen als Stufe mit Schrittschätzung da, nicht als exakte Meterzahl. Im Gelände misst niemand nach."),
      { type: "table", head: ["", "DP-E", "Dummy A", "Dummy F"], rows: [
        ["Max. Distanz", examMeters("DP-E"), examMeters("Dummy A"), examMeters("Dummy F")],
        ["Einweisen", "nein", "nein", "ja"],
        ["In der App", "Bronze", "Silber", "Gold"],
      ] },
    ],
  },
  {
    id: "einwirkung",
    title: "Einwirkung und Korrektur",
    open: true, // bleibt offen und an Position 3 (basics-umsetzung.md, Abschnitt 2)
    blocks: [
      t("**Was diese App vorschlägt**"),
      t("Neues Verhalten entsteht über Belohnung. Bekanntes Verhalten wird eingefordert, nicht verhandelt: unerwünschtes Verhalten wird unterbrochen und in erwünschtes umgelenkt, nicht ausgesessen. **Körperliche Einwirkung ist kein Mittel dieser App.**"),
      t("Und darüber steht ein Satz, der alle Zweifelsfälle entscheidet: Die Arbeit ist für den Hund. Wo Motivation und Trainingsfortschritt in Konflikt geraten, gewinnt die Motivation. Abbruch vor Druck, Pause vor Wiederholung, Rückstufung vor Erzwingen."),
      t("**Was das Regelwerk sagt**"),
      t("Die Prüfungsordnungen kennen genau zwei ausscheidende Fehler, nach denen ein Gespann die Prüfung nicht beenden darf: Aggressivität gegenüber Artgenossen oder Personen, und **physisches Einwirken auf den Hund.** Körperliche Einwirkung steht dort gleichrangig neben der Aggression und schwerer als jede Arbeitsverweigerung. Das ist kein Tierschutzzusatz am Rand, sondern die härteste Kategorie, die das Regelwerk hat."),
      t("**Was die Hauptquelle dieser App sagt**"),
      t("Die Kosmos Retrieverschule arbeitet mit negativen Einwirkungen und nennt auch körperliche Formen, beim Welpen etwa Schnauzgriff und Nackengriff. Beim Winseln ist sie ausdrücklich: \"Zeigen Sie ihm sofort deutlich und nachhaltig mit einer negativen Einwirkung, dass Sie das Verhalten nicht dulden. Ignorieren hilft hier nicht.\""),
      t("Gleichzeitig zieht sie klare Grenzen, die diese App übernimmt: Lerninhalte immer über positive Motivation, negative Einwirkung nur bei bereits bekanntem Verhalten, Timing maximal zwei Sekunden, danach loben."),
      t("**Was die Studienlage sagt**"),
      t("An diesem einen Punkt steht das Buch gegen die Forschung, und dort ist die Evidenz eindeutig."),
      t("Ein Review von 17 Studien (Ziv 2017, Journal of Veterinary Behavior) kommt zu dem Ergebnis, dass aversive Methoden der körperlichen und psychischen Gesundheit schaden und dass es **keinen Hinweis darauf gibt, dass sie wirksamer wären** als Training über Belohnung. Teils findet er Hinweise auf das Gegenteil."),
      t("Eine Feldstudie mit 92 Hunden aus sieben Hundeschulen (Vieira de Castro et al. 2020, PLoS ONE) verglich drei Gruppen: belohnungsbasiert, gemischt, überwiegend aversiv. Gemessen wurden Stressverhalten im Video, sechs Cortisol-Proben und ein Cognitive-Bias-Test. Die aversiv trainierte Gruppe zeigte mehr Stressverhalten, hechelte mehr, war häufiger angespannt, hatte einen höheren Cortisol-Anstieg nach dem Training und einen pessimistischeren Cognitive Bias. Auch die gemischte Gruppe lag schlechter als die belohnungsbasierte."),
      t("**Warum die App sich so entscheidet**"),
      t("Das Buch ist in Lernaufbau, Übungsmechanik, Prüfungslogik und Physiologie belastbar, und es ist die Grundlage für fast alles in dieser App. An der Einwirkungsfrage ist es Erfahrungswissen ohne Studienbelege, und dagegen stehen ein Review und eine kontrollierte Feldstudie. Dazu kommt, dass das Regelwerk körperliche Einwirkung zum ausscheidenden Fehler macht."),
      note("Deshalb: Methodik ja, körperliche Techniken nein. Die Entscheidung liegt am Ende bei dir, aber du sollst beide Seiten kennen."),
    ],
  },
  {
    id: "vorbereitung",
    title: "Vor der Einheit",
    blocks: [
      t("**Alles vorbereiten, bevor der Hund aus dem Auto kommt.** Dummys auslegen, Werfer instruieren, Hindernis aufstellen. Erst wenn alles steht, den Hund holen, lösen lassen, anleinen und auf die Aufgabe konzentrieren. Nur wenn Hund und Führer aufeinander konzentriert sind, bilden sie ein Team."),
      t("**Checkliste**"),
      { type: "check", items: [
        "Dummys ausgelegt, wenn Einweisen geübt wird",
        "Werfer instruiert, wenn Markierungen geübt werden",
        "Hindernis oder Rollzaun aufgestellt",
        "Jacke zugeknöpft",
        "Pfeife in der Hand oder im Mund",
        "Hund gelöst, angeleint, konzentriert",
      ] },
      t("**Warum die Jacke zugeknöpft gehört:** Eine offene Jacke flattert im Wind und trifft den bei Fuß sitzenden Hund im Gesicht. Manche Hunde halten deshalb Abstand. Die nach vorn stehende Ecke des Saums kann ihm außerdem die Sicht nehmen, und damit die Markierung verderben."),
      t("**Warum die Pfeife nicht in die Tasche gehört:** Du musst sofort reagieren können, wenn der Hund Hilfe braucht. Deine Aufmerksamkeit soll beim Hund sein, nicht bei der Suche nach der Pfeife."),
      t("**Und was mit den Händen:** In die Jackentaschen, während du wartest. Ein häufiger Grund für Einspringen ist, dass der Führer mit den Händen herumfuchtelt und der Hund das als Startsignal liest."),
      t("**Fünf Fragen, bevor es losgeht**"),
      ol("In welche Teilziele zerlege ich die heutige Aufgabe?",
         "Was übe ich in welcher Reihenfolge?",
         "Welche Probleme können auftreten?",
         "Wie reagiere ich darauf, oder wie vermeide ich sie?",
         "Welches Ziel will ich heute erreichen?"),
      t("**Verschiedene Übungen am selben Tag trennen**, zeitlich und bei Anfängern auch räumlich. Der Grund: \"Die Gefahr der Verwechslungen und die daraus resultierende Verwirrung des Hundes muss so gering wie möglich gehalten werden. Je einfacher eine Trainingseinheit aufgebaut ist, umso schneller versteht der Hund.\""),
      // Zahlen aus WARMUP_COOLDOWN, wie im Session-Builder (basics-umsetzung.md, Abschnitt 5)
      t("**Aufwärmen und Cool Down**"),
      warmupTable,
      ul(...WARMUP_COOLDOWN.rules),
      note(WARMUP_COOLDOWN.shortNote),
    ],
  },
  {
    id: "sinne",
    title: "Der Hund als Sinneswesen",
    blocks: [
      t("**Gehör**\nHunde hören von 30 Hz bis 64 kHz, am empfindlichsten zwischen 1 und 16 kHz. Sie nehmen Töne viermal leiser wahr als Menschen und aus viermal größerer Entfernung. Sie unterscheiden Tonhöhen, die nur ein Achtel Ton auseinanderliegen."),
      t("Daraus folgt: **Pfeife so leise, wie du kannst.** Der Hund hört es. Nach oben bleibt dann Reserve für Distanz, Wind und Deckung. Lautstärke ist kein Verstärker für einen Hund, der nicht reagiert. Und im Regelwerk ist lautes oder unpassendes Handling ein schwerer Fehler."),
      t("Daraus folgt außerdem: **Pfeifsignale müssen sich im ersten Ton unterscheiden.** Hunde interpretieren bereits den ersten Ton und beginnen danach zu handeln. Ein Suchensignal, dessen erster Ton dem Stopp-Pfiff gleicht, lässt den Hund womöglich sitzen."),
      t("**Sehen**\nDem Hund fehlt das Sehpigment für Grün, er sieht wie ein grünblinder Mensch. Blau und Violett sieht er zweifelsfrei. Rot, Gelb, Orange, Braun, Gelbgrün und Grün kann er nicht unterscheiden, Rot erscheint ihm als sattes Gelb. In der Dämmerung verstärkt das Tapetum Lucidum die Lichtausbeute um etwa 50 Prozent, dafür wird das Bild unschärfer."),
      t("Hunde sind **Bewegungsseher.** Deshalb ist das deutlichste Handzeichen das, das deine Silhouette am stärksten verändert. Ein ausgestreckter Zeigefinger ist auf Distanz kaum zu erkennen."),
      t("**Nase**\nDie Nase muss feucht sein, sonst sinkt die Leistung. Bei Nasenarbeit braucht der Hund genügend Wasser. Die Riechzellen gewöhnen sich an gleichartige Gerüche, deshalb dient der Zickzackkurs auch der Nasenerholung. Nasenarbeit ist Schwerstarbeit, nicht Beschäftigung."),
    ],
  },
  {
    id: "handzeichen",
    title: "Handzeichen",
    blocks: [
      lead("Voran und Back sind zwei verschiedene Köpfe."),
      t("Voran: flache Hand hochkant, 20 bis 30 cm vor dem Kopf des **Hundes**, wie über Kimme und Korn. Ein Startsignal aus der Grundstellung."),
      t("Back: Arm senkrecht über den **eigenen** Kopf. Ein Fortsetzungssignal auf Distanz, nach dem Stopp-Pfiff."),
      t("**Timing bei Back:** Stopp-Pfiff, Arm in neutrale Position vor der Brust, zwei Sekunden Pause, dann Arm nach oben schnellen. Das Signal kommt während der Armbewegung. Arm oben stehen lassen."),
      t("**Drehrichtung:** rechter Arm, der Hund dreht über die linke Schulter. Spiegelbildlich, weil er dich ansieht."),
      t("**Seitlich:** Arm waagerecht zur Seite, in Richtung des Dummys."),
      t("**Suchen:** Arm seitlich nach unten, Handfläche zum Hund."),
      t("**Reihenfolge im Aufbau:** Voran, dann Back, dann Rechts und Links. Die Seitenrichtungen sind für den Hund leichter, werden aber zuletzt aufgebaut, um ihn nicht zu verwirren."),
      t("**Drei Regeln zum Voran, die leicht übersehen werden**"),
      ul("Üben Sie Voran niemals mit Wind von vorn. Bei Gegenwind reviert der Hund statt zu laufen.",
         "Ritualisieren: immer dieselbe Körperhaltung. Ändert sie sich, fehlt dem Hund die Motivation.",
         "Pushen: das Signal vor Hindernissen wiederholen."),
      t("Eine elegante Unterscheidung, wenn du sie von Anfang an durchhältst: linker Arm für Voran, rechter Arm für Markierungen."),
    ],
  },
  {
    id: "ausruestung",
    title: "Dummys und Ausrüstung",
    blocks: [
      t("**Gewichte**"),
      { type: "table", head: ["Dummy", "Gewicht", "Einsatz"], rows: [
        ["Welpendummy", "200 g", "erste Apports"],
        ["Juniordummy", "400 g", "Junghund, kurze Einheiten unterwegs"],
        ["Standarddummy", "500 g", "Normalfall, alle Prüfungsklassen"],
        ["Suchendummy", "80 g", "Kleine Suche, Suchenpfiff bei geringer Witterung"],
      ] },
      // Farbtext überall identisch (fundament-umbau-3.md Abschnitt 6, -4.md Abschnitt 4): aus DUMMY_FACTS
      t("**Farben**\n" + DUMMY_FACTS.farben),
      t("**Markierstäbe**\nSie sind eine Sichthilfe für den Hund, nicht für dich. Stell mindestens vier auf und nutze sie bewusst als Verleitung, nicht nur als Zielpunkt. Steht nur einer, lernt der Hund, zum Stab zu laufen statt auf dich zu hören. Leere Stäbe soll er nicht abchecken dürfen."),
      t("**Pfeife**\nMit Erbse für Reichweite, ohne Erbse für leise Signale. Im Training und in der Prüfung in der Hand oder im Mund, nicht in der Tasche."),
    ],
  },
  {
    id: "lernen",
    title: "Wie Hunde lernen",
    blocks: [
      t("**Drei Phasen**"),
      { type: "table", head: ["Phase", "Verstärkung", "Bedingungen", "Ziel"], rows: [
        ["Erlernen", "jedes Mal, hochwertig", "immer gleich, ablenkungsarm", "Verhalten entsteht"],
        ["Üben", "unregelmäßig, nur bei optimaler Ausführung", "variieren", "Qualität erhöhen"],
        ["Festigen", "variabel, nur bei optimalem Verhalten", "große Ablenkung", "sitzt unter allen Bedingungen"],
      ] },
      t("Nicht das Erlernen eines Signals kostet Zeit, sondern das Absichern unter verschiedenen Bedingungen. Und: Übe keine Übung mit Ablenkung, die noch nicht gefestigt ist. Das senkt das erreichte Niveau wieder."),
      t("**Die acht Bedingungen, die du variieren kannst**\nHaltung und Gestik, Trainingsort, Trainingsgegenstände, Entfernung und Position des Führers, Verleitungen, Ausgangssituation, Aufbewahrungsort der Belohnung, Wetter."),
      t("**Belohnen, nicht bestechen**\nDer Verstärker kommt nach der Ausführung. Zeigst du ihn vorher, wird er Teil des Signals, und der Hund wartet künftig ab, ob es etwas gibt. Bewahre Leckerchen in etwas auf, das nicht knistert: das Knistern und die Hand in der Tasche sind Vorboten, an denen der Hund abliest, ob die Arbeit sich lohnt."),
      t("Alltägliche Dinge taugen als Belohnung: rennen dürfen, ein Dummy holen dürfen, schwimmen dürfen. Oft wirksamer als das Leckerchen."),
      t("**Wenn etwas nicht klappt, fünf mögliche Ursachen**"),
      ol("Überforderung, körperlich oder geistig. Pause.",
         "Unpassende Methode. Pause und überdenken.",
         "Ein neues Detail wurde eingeführt, das Alte wird vorübergehend schlechter. Ignorieren, nicht maßregeln. Es verschwindet von allein.",
         "Der Hund testet, was wirklich erwartet wird. Sanft korrigieren oder einfach nicht belohnen.",
         "Zu schnell gesteigert. Zurück in den Kindergarten."),
      t("Bei unklarer Ursache gilt: Es ist immer besser, nicht zu reagieren, als falsch zu reagieren. Und maximal zwei Wiederholungen, dann für heute aufhören."),
      t("**Wann du helfen musst**\nNur wenn der Hund an der Aufgabe verzweifelt, unsicher wird oder die Motivation verliert. Sonst nicht. Er muss lernen, auszuprobieren, selbstständig zu arbeiten und eigene Lösungen zu finden. Das ist der schmale Grat, auf dem sich jeder Ausbilder bewegt."),
      t("**Stressanzeichen, die du kennen solltest**\nGähnen, Sich-Lecken, Sich-Kratzen, Bellen als Entladung, Schnuppern ohne Witterung, Sitzenbleiben beim Schicken, Zurückkommen obwohl geschickt. Das sind deutliche Zeichen, dass er die Aufgabe noch nicht verstanden hat."),
      t("**Und zum Schluss:** Die Lernkurve eines Hundes ist niemals linear. Lernplateaus sind normal und keine Sturheit."),
    ],
  },
  {
    id: "wasser",
    title: "Sicherheit am Wasser",
    blocks: [
      t("**Untersuche den Uferbereich, bevor der Hund springt.** Einige Hunde haben beim Sprung ins Wasser den Tod gefunden, weil sie sich an Metallteilen, Ästen oder scharfkantigen Steinen verletzt haben."),
      t("Dazu: Beim Hechtsprung kommt leicht Wasser ins Ohr. Nach der Wasserarbeit die Ohren kontrollieren."),
    ],
  },
  {
    id: "glossar",
    title: "Glossar",
    kind: "glossar",
    blocks: [],
  },
  {
    id: "recht",
    title: "Recht und Rahmen",
    blocks: [
      note("**Diese Angaben sind keine Rechtsberatung.** Jagd- und Naturschutzrecht ist Landesrecht und weicht je nach Bundesland ab. Die Fristen unten sind die im Buch genannten Regelfälle."),
      t("**Brut- und Setzzeit: 1. April bis 15. Juli.** In dieser Zeit ist besondere Rücksicht geboten, freies Laufenlassen in Feld und Wald ist in vielen Bundesländern eingeschränkt oder verboten."),
      t("**Betretungsverbot für Grünland: 1. März bis 15. Oktober.** Landwirtschaftlich genutzte Wiesen und Weiden dürfen in dieser Zeit nicht betreten werden."),
      t("**Der Hund muss im Einwirkungsbereich bleiben**, also etwa 15 bis 20 Meter. Ein Hund, der weiter weg ist und auf den du nicht einwirken kannst, gilt rechtlich als nicht unter Kontrolle."),
      t("**Weitläufiges Dummytraining braucht die Genehmigung des Jagdpächters.** Das gilt für alles, was über den Einwirkungsbereich hinausgeht, also für fast alle Übungen ab Silber. Such das Gespräch, bevor du anfängst, nicht hinterher."),
      t("**Training mit Schuss ist ohne Erlaubnis generell verboten.**"),
      t("Praktische Folge für diese App: Die Distanzen ab Stufe 3 sind auf freiem Feld ohne Absprache rechtlich problematisch. Nutze eingezäunte Flächen, Hundewiesen oder ein Gelände, für das du die Erlaubnis hast."),
      t("Quelle: Beitrag von RA Christian Hoffs im Buch, S. 112 bis 115."),
    ],
  },
  {
    id: "quellen",
    title: "Quellen",
    blocks: [
      t("**Hauptquelle**"), ul(...GLOSSAR_SOURCES.haupt),
      t("**Regelwerke**"), ul(...GLOSSAR_SOURCES.regelwerke),
      t("**Fachquellen, weiter verwendet**"), ul(...GLOSSAR_SOURCES.fach),
      t("**Studien**"), ul(...GLOSSAR_SOURCES.studien),
      t("**Nicht mehr verwendet**\nDiese Quellen haben falsche Angaben geliefert, die bis Fassung 4 im Glossar standen:"),
      { type: "table", head: ["Quelle", "Falsche Angabe"], rows: GLOSSAR_SOURCES.nichtMehr },
      t(GLOSSAR_SOURCES.nichtMehrNote),
    ],
  },
];
