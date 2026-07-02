// Spanish overlays for the primary sources. English (primary-sources.ts)
// stays canonical. The document EXCERPTS deliberately stay in their original
// language (they are historical transcriptions); what translates is the
// editorial frame: title, type, date wording, context, why-it-matters, and
// the excerpt labels. Citations are bibliographic and are not translated.

export interface PrimarySourceEsEntry {
  title: string;
  type: string;
  date: string | null;
  context: string;
  whyItMatters: string | null;
  /** Aligned with the source's excerpts; null where an excerpt has no label. */
  excerptLabels: (string | null)[];
}

export const primarySourcesEs: Record<string, PrimarySourceEsEntry> = {
  "islip-precinct-1710": {
    title: "Ley que creó el gobierno del Precinto de Islip",
    type: "Ley colonial",
    date: "25 de noviembre de 1710",
    context: "Esta ley colonial es uno de los documentos más importantes para los orígenes del gobierno de Islip. No creó un pueblo moderno, pero permitió que el Precinto de Islip eligiera funcionarios locales y llevara cuentas públicas.",
    whyItMatters: "Este es uno de los documentos fundacionales más sólidos del gobierno de Islip. Muestra que la vida cívica temprana de Islip se construyó alrededor de los impuestos, las cuentas públicas, el orden local y los cargos electos, y complica la afirmación más simple de que Islip fue simplemente “fundado en 1683”.",
    excerptLabels: [
      null
    ],
  },
  "thompson-town-offices": {
    title: "Actas del pueblo sobre los cargos públicos de Isaac Thompson",
    type: "Registro del pueblo",
    date: null,
    context: "Las actas del Precinto de Islip siguen el servicio público de Isaac Thompson. Muestran que no fue solo una figura de la Mansión Sagtikos, sino que ocupó cargos locales prácticos ligados a los caminos, la ayuda a los pobres, la supervisión del pueblo, los registros, las cuentas, las licencias y los impuestos.",
    whyItMatters: "Esto hace de Isaac Thompson algo más que un dueño de mansión o el anfitrión de Washington. Fue parte del gobierno activo de Islip antes, durante y después de la Revolución, lo que volvió más riesgosas sus simpatías patriotas durante la ocupación.",
    excerptLabels: [
      null,
      null
    ],
  },
  "town-minutes-annual-meetings": {
    title: "La reunión anual del pueblo: el gobierno local en acción",
    type: "Actas del pueblo",
    date: "1739–1800",
    context: "Cada año, el primer martes de abril, los propietarios (hombres dueños de tierras con derecho a voto) y los habitantes de Islip se reunían y elegían a los funcionarios que manejaban el pueblo: un supervisor, un secretario, tasadores (los que fijaban los impuestos), un recaudador, un alguacil, encargados de los pobres, encargados de los caminos y revisores de cercas. El primer libro de actas registra esta reunión año tras año, en tiempos de paz, de guerra y de ocupación. La entrada de 1739 que aparece abajo es típica, y las reuniones mismas se hacían en casas de vecinos, fijadas para las dos de la tarde.",
    whyItMatters: "La reunión anual es una de las instituciones más antiguas de Islip. Estas entradas muestran el autogobierno como una rutina de trabajo, con vecinos comunes que se turnaban cada año como supervisor, secretario, tasador, alguacil, encargado y revisor de cercas, décadas antes de que la independencia americana convirtiera el autogobierno en una idea nacional.",
    excerptLabels: [
      "Los funcionarios elegidos en abril de 1739",
      "Horas y lugares de las reuniones (1780 y 1795)"
    ],
  },
  "town-minutes-poor-relief": {
    title: "El cuidado de los pobres en las actas del pueblo",
    type: "Actas del pueblo",
    date: "1739–1787",
    context: "Mucho antes de los sistemas públicos de asistencia social, el pueblo mismo era responsable de sus residentes más pobres, y cada abril se elegían encargados de los pobres. Las actas muestran cómo era ese deber en la práctica: pensión semanal para Hannah Hulse, cuidados para “Old Joseph” (el viejo Joseph) en su enfermedad, grano del pueblo para una mujer a la que el secretario llamó “Indian hannah” y, en plena ocupación, un plan formal para reunir dinero de ayuda a los pobres (1782) y para mantener a Johanna Hutton y su hijo (1783).",
    whyItMatters: "Estas entradas ponen a personas concretas, incluidas personas de color, en el registro cívico de Islip décadas antes de que cualquier censo las contara. También muestran al pueblo tratando el cuidado de los pobres como un asunto público normal que siguió funcionando durante la guerra: en 1782 la reunión acordó que los encargados de los pobres, junto con un juez, fijarían y recaudarían el dinero necesario, y en 1783 organizó el sostén de Johanna Hutton y su hijo familia por familia. Las cuentas junto a las actas de 1782 registran pagos a “Joanna Hudson”, aparentemente la misma mujer con el nombre escrito de otra manera.",
    excerptLabels: [
      "Hannah Hulse, 1739",
      "Joseph Nicolls, 1740",
      "Cuidados de enfermería, 1750",
      "Johanna Hutton y su hijo, 1783",
      "Grano para Indian Hannah, 1787"
    ],
  },
  "town-minutes-fishing-1765": {
    title: "Proteger la bahía: la regla de pesca de 1765",
    type: "Actas del pueblo",
    date: "abril de 1765",
    context: "La Great South Bay alimentaba a las familias de Islip y a su economía, y el pueblo trataba el acceso a ella como asunto del pueblo. En 1765 la reunión anual votó que cualquier habitante que le diera permiso a alguien de afuera para pescar en la bahía o en los arroyos perdería cuarenta chelines, y la multa iba para los pobres. La regla se renovó en 1766 con una vía legal para cobrar la multa, y el instinto duró: en 1815 el pueblo votó que los no residentes no podían sacar del pueblo almejas, pescado, horsefeet [cangrejos herradura] ni aves.",
    whyItMatters: "El acceso a la bahía fue política del pueblo desde el principio. Esta es una pieza temprana de regulación económica y ambiental local, y el destino de la multa, “the use of the poor” (para el uso de los pobres), conecta la riqueza de la bahía directamente con el cuidado del pueblo hacia sus residentes más necesitados.",
    excerptLabels: [
      "La votación de 1765",
      "El mismo instinto en 1815"
    ],
  },
  "town-minutes-1775-1776": {
    title: "Los cargos del pueblo en vísperas de la Revolución, y un arma del pueblo",
    type: "Actas del pueblo",
    date: "abril de 1775 – abril de 1776",
    context: "El propio libro de actas del pueblo registra la llegada de la Revolución al gobierno local de todos los días. En la reunión anual de abril de 1775, semanas antes de que Islip firmara los Artículos de Asociación, Benajah Strong e Isaac Thompson fueron elegidos encargados de los caminos, y Thompson también fue encargado de los pobres. En menos de un año, esos mismos dos hombres habían organizado la compañía de milicia de Islip, con Strong como capitán. En la reunión de abril de 1776, Isaac Thompson fue elegido supervisor por primera vez, en reemplazo de William Nicoll, y el secretario registró la compra de un arma como propiedad del pueblo.",
    whyItMatters: "Las actas no dicen por qué el pueblo compró el arma, y este proyecto no afirma que fuera para la milicia. Lo que el registro sí muestra es un pueblo cuyos líderes electos, Thompson y Strong, eran los mismos hombres que organizaban la parte de Islip en la Revolución, y una reunión del pueblo en abril de 1776 pagando un arma y registrándola como propiedad pública. La fecha es sugerente; el propósito sigue siendo una pregunta abierta de investigación.",
    excerptLabels: [
      "Abril de 1775: cargos del pueblo",
      "Abril de 1776: un nuevo supervisor",
      "El arma del pueblo"
    ],
  },
  "town-minutes-wartime": {
    title: "Reuniones del pueblo en tiempos de guerra bajo el nombre del rey",
    type: "Actas del pueblo",
    date: "1777–1783",
    context: "Las fuerzas británicas y lealistas ocuparon Long Island desde septiembre de 1776 hasta fines de 1783, y el libro de actas de Islip muestra al pueblo celebrando su reunión anual cada abril durante todo ese tiempo. Las reuniones elegían a los funcionarios de siempre, mantenían las reglas de siempre sobre los cerdos y verracos, y llevaban las cuentas. Como registros legales hechos bajo la autoridad de la Corona, fechaban cada reunión de guerra por el reinado del rey Jorge III. Isaac Thompson, que había firmado los Artículos de Asociación en 1775, fue reelegido supervisor en cada una de estas reuniones.",
    whyItMatters: "El nombre del rey en estos encabezados no es prueba de que la gente de Islip fuera lealista. Es la fórmula oficial que se exigía en los registros legales de un territorio ocupado, y es evidencia de lo complicada que fue en realidad la transición a la independencia: un pueblo podía seguir gobernándose, cuidar a sus pobres y reelegir a un supervisor que había firmado un compromiso patriota, todo bajo un encabezado que todavía decía “his Majesty King George the third” (su Majestad el rey Jorge III).",
    excerptLabels: [
      "Abril de 1777",
      "Abril de 1783, la última reunión fechada por la Corona"
    ],
  },
  "town-minutes-1784": {
    title: "1784: fechar los registros del pueblo por la independencia americana",
    type: "Actas del pueblo",
    date: "abril de 1784",
    context: "Los británicos evacuaron Nueva York en noviembre de 1783. Cuando la reunión anual de Islip se juntó el abril siguiente, el secretario abrió el registro con palabras completamente nuevas: no el reinado de un rey, sino la autoridad de la gente del Estado de Nueva York y el año de la independencia americana. Isaac Thompson, supervisor durante todos los años de la guerra, fue reelegido bajo el nuevo encabezado.",
    whyItMatters: "Este encabezado es el rastro documental de la Revolución en Islip: el momento en que los propios registros del pueblo dejaron de contar los años por Jorge III y empezaron a contarlos desde 1776. Nada más cambió en la reunión, los mismos cargos, la misma regla sobre los cerdos, las mismas cuentas, y ese es justamente el punto. La independencia llegó a los registros de Islip no como una batalla, sino como un cambio en el nombre bajo el cual el pueblo se gobernaba a sí mismo.",
    excerptLabels: [
      "El encabezado de abril de 1784",
      "Abril de 1785"
    ],
  },
  "town-minutes-schools-1796": {
    title: "Los comisionados de escuelas aparecen en los registros del pueblo",
    type: "Actas del pueblo",
    date: "1796–1799",
    context: "En abril de 1796 la reunión anual eligió comisionados de las escuelas por primera vez en el libro de actas: Richard Udall, Nathaniel Conklin y Nehemiah Higbie. El Estado de Nueva York había aprobado una ley para fomentar las escuelas comunes en 1795, y los registros de Islip muestran al pueblo participando la primavera siguiente: comisionados elegidos en 1796 y de nuevo en 1797, y en 1799 una orden sobre el dinero escolar recaudado en 1797 y 1798. La propia descripción de Conklin de 1798 completa el cuadro con cinco pequeñas escuelas, maestros contratados por trimestre y 11,814 días de instrucción en un solo año.",
    whyItMatters: "La educación pública entra aquí en los registros de Islip, manejada en la misma reunión anual que elegía revisores de cercas y mantenía la regla sobre los cerdos. También conecta dos de las fuentes del proyecto: Nathaniel Conklin, uno de los primeros comisionados de escuelas del pueblo, es el mismo hombre que escribió la descripción del pueblo de 1798.",
    excerptLabels: [
      "Abril de 1796",
      "Abril de 1799"
    ],
  },
  "conklin-description-1798": {
    title: "Descripción del Pueblo de Islip por Nathaniel Conklin",
    type: "Carta / descripción oficial",
    date: "11 de enero de 1798",
    context: "El supervisor Nathaniel Conklin escribió esta descripción para defender los límites de Islip en una disputa con Huntington, pero dio mucho más que un argumento sobre límites: un retrato completo del pueblo quince años después de la Revolución. Describió las granjas y los “necks” (cuellos de tierra) divididos por arroyos, las casas alineadas a lo largo de la South Country Road frente a la bahía, las llanuras de pinos que cubrían unas cuatro quintas partes del pueblo, las ostras, almejas y aves acuáticas de la bahía, los cultivos y el ganado, las iglesias, escuelas, molinos y tabernas, y quiénes vivían en las aproximadamente 120 casas del pueblo.",
    whyItMatters: "Este es el retrato más completo que el proyecto ha encontrado de lo que Islip realmente era en la primera generación después de la independencia: un pueblo de granjas y de bahía con unos 120 hogares, de los cuales aproximadamente uno de cada cinco era hogar de residentes nativos, de ascendencia mixta y negros libres (“Mustee” es una palabra de la época para personas de ascendencia mixta, comúnmente indígena americana y africana). Ancla en una fuente primaria la pregunta más difícil de la exposición: ¿quiénes vivían en el pueblo que la Revolución había prometido hacer libre?",
    excerptLabels: [
      "La forma del pueblo",
      "Fire Island Inlet y los corsarios de 1776",
      "La riqueza de la bahía",
      "Quiénes vivían en Islip",
      "Iglesias y escuelas",
      "Los pobres y las tabernas"
    ],
  },
  "articles-of-association-1775": {
    title: "Los Artículos de Asociación del Precinto de Islip",
    type: "Documento fundacional",
    date: "10 de mayo de 1775",
    context: "El 10 de mayo de 1775, semanas después de Lexington y Concord, el Precinto de Islip celebró una reunión especial donde los residentes podían firmar un documento local en apoyo a los Artículos de Asociación del Congreso Continental. Firmar no era algo simbólico. El Historiador del Pueblo explica que una firma en este papel era un acto de traición contra la Corona.",
    whyItMatters: "Este es uno de los documentos más claros que muestran que los residentes de Islip tomaron decisiones políticas antes de la ocupación británica. También apoya el tema más amplio de la exposición: la independencia fue una promesa, pero la participación fue limitada. Las mujeres, las personas esclavizadas, los negros libres, los indígenas americanos, los niños y los cuáqueros quedaron excluidos o no pudieron firmar.",
    excerptLabels: [
      "Los Artículos de Asociación del Precinto de Islip",
      "Contexto del Historiador del Pueblo"
    ],
  },
  "thompson-militia-letter-1776": {
    title: "Isaac Thompson pide comisiones para una compañía de milicia de Islip",
    type: "Carta",
    date: "9 de febrero de 1776",
    context: "Escribiendo como presidente del Comité de Islip, Isaac Thompson pidió al Congreso Provincial que otorgara comisiones para los oficiales de una compañía de milicia elegida por la gente del precinto. La carta nombra a Benajah Strong como capitán y muestra que los residentes de Islip querían una compañía propia en lugar de estar divididos entre las compañías de Smithtown y Huntington.",
    whyItMatters: "Esto muestra que Islip no estuvo pasivo antes de la ocupación. Los residentes locales se organizaron política y militarmente, escogieron a sus propios oficiales y buscaron el reconocimiento del Congreso Provincial. Conecta a Isaac Thompson, Benajah Strong, Jeremiah Terry, Samuel Oakley y Annen Mobray con el movimiento patriota local.",
    excerptLabels: [
      null,
      null
    ],
  },
  "provincial-congress-militia-1776": {
    title: "Entrada del Congreso Provincial sobre la compañía de milicia de Islip",
    type: "Registro de gobierno",
    date: "9 de febrero de 1776",
    context: "Esta entrada resume la carta de Isaac Thompson de febrero de 1776 al Congreso Provincial y condensa la historia de la milicia en un solo párrafo.",
    whyItMatters: null,
    excerptLabels: [
      null
    ],
  },
  "islip-census-1775": {
    title: "El censo de 1775 y la elegibilidad para la milicia en Islip",
    type: "Registro de censo",
    date: "26 de junio de 1775",
    context: "El censo de 1775 da una cifra concreta de población para el Precinto de Islip y el número de hombres sujetos al servicio de milicia. La tabla completa del censo todavía no se ha extraído por separado; por ahora las cifras vienen del resumen de Robert Finnegan.",
    whyItMatters: "Esto da una idea de la escala. El Precinto de Islip era pequeño, pero la Revolución igual exigió decisiones políticas y militares de sus residentes.",
    excerptLabels: [
      null
    ],
  },
  "plundering-resolution-1781": {
    title: "Resolución sobre botes armados, saqueos y los residentes de Long Island",
    type: "Resolución estatal",
    date: "28 de junio de 1781",
    context: "Esta resolución del Estado de Nueva York muestra lo complicada que se volvió la vida en Long Island ocupada. El Estado argumentó que los residentes de Long Island, aunque vivían bajo control británico, no debían tratarse automáticamente como súbditos británicos ni como blancos de saqueo. Se quejó de que botes armados desde Connecticut estaban desembarcando en Long Island, llevándose propiedades y haciendo daño a los civiles.",
    whyItMatters: "Esto complica la historia habitual de patriotas contra lealistas. Los residentes de Long Island podían quedar atrapados entre la ocupación británica, la autoridad del Estado de Nueva York, los asaltantes de Connecticut y la sospecha de los tiempos de guerra. Para Islip, la ocupación no fue solo una condición militar. Afectó la propiedad, la seguridad de las familias, la identidad política y la supervivencia diaria.",
    excerptLabels: [
      null,
      null
    ],
  },
  "huntington-vessels-1776": {
    title: "Registros del pueblo de Huntington: barcos británicos y miedo antes de la ocupación",
    type: "Registro del pueblo / carta",
    date: "26 de agosto de 1776",
    context: "Este registro de Huntington muestra el miedo y la incertidumbre en Long Island justo antes de la campaña británica. El Historiador del Pueblo usa registros de Huntington porque las actas propias de Islip dicen relativamente poco sobre la ocupación. Estos registros cercanos ayudan a explicar las presiones que los residentes de Islip también enfrentaron.",
    whyItMatters: "Esto muestra qué tan rápido se extendió el miedo por Long Island en agosto de 1776. El detalle humano, “Our women are in great tumult” (nuestras mujeres están muy alteradas), muestra que la invasión afectó a los hogares y a las familias, no solo a los soldados.",
    excerptLabels: [
      null
    ],
  },
  "huntington-independence-1776": {
    title: "Registros del pueblo de Huntington: alegría tras la independencia, miedo antes de la ocupación",
    type: "Registro del pueblo",
    date: "julio–agosto de 1776",
    context: "Este fragmento captura el paso de la celebración al peligro en el verano de 1776. Huntington celebró la independencia, pero los movimientos militares británicos cambiaron el ánimo muy rápido, y eso enmarca el contexto de Islip como parte de una historia regional de Long Island.",
    whyItMatters: "Esto muestra el vaivén emocional de 1776: alegría pública por la independencia seguida casi de inmediato por el peligro militar y la ocupación.",
    excerptLabels: [
      null
    ],
  },
  "suspected-characters-1778": {
    title: "Ley sobre las personas de carácter “equívoco y sospechoso”",
    type: "Ley estatal",
    date: "30 de junio de 1778",
    context: "Esta ley de Nueva York muestra cómo el estado revolucionario trató la neutralidad y la sospecha de lealtad a Gran Bretaña. Autorizó a comisionados a citar a las personas consideradas “neutral and equivocal characters” (personas de carácter neutral y equívoco) y a exigirles jurar lealtad al Estado de Nueva York.",
    whyItMatters: "Esto ayuda a explicar por qué la Revolución fue también un conflicto civil. Se presionaba a la gente para declarar su lealtad, la neutralidad podía tratarse como algo peligroso y la identidad política tenía consecuencias legales. Para los residentes de Islip bajo ocupación, la lealtad pública podía volverse riesgosa.",
    excerptLabels: [
      null,
      "El juramento exigido"
    ],
  },
  "forfeiture-1779": {
    title: "Ley para la confiscación y venta de las propiedades de los lealistas",
    type: "Ley estatal",
    date: "22 de octubre de 1779",
    context: "Esta ley declaró que ciertas personas que se habían adherido a los enemigos del Estado habían perdido sus propiedades, y nombró a personas desterradas de Nueva York. Muestra cómo los gobiernos revolucionarios castigaron la lealtad a Gran Bretaña y cómo la propiedad se volvió parte de la lucha política.",
    whyItMatters: "Esto muestra cómo la Revolución alcanzó la propiedad, el castigo, el exilio y la identidad legal. Les recuerda a los visitantes que la Revolución fue también un conflicto civil por la lealtad, la tierra, la ley y el futuro del gobierno.",
    excerptLabels: [
      null,
      "Personas nombradas"
    ],
  },
  "temporary-government-1779": {
    title: "Gobierno temporal para el sur de Nueva York después de la evacuación británica",
    type: "Ley estatal",
    date: "23 de octubre de 1779",
    context: "Esta ley planeó cómo se gobernarían las partes del sur del estado, incluido el condado de Suffolk, una vez que los británicos se fueran. Muestra que Nueva York esperaba que la transición de la ocupación al gobierno restaurado fuera difícil, y le dio a un consejo temporal poder sobre el orden, los precios de los alimentos, el alojamiento de tropas, los suministros, las elecciones y la sospecha de deslealtad.",
    whyItMatters: "No se esperaba que restaurar el gobierno después de la ocupación fuera sencillo. El estado anticipó escasez, sospechas, disputas de lealtad, elecciones y demandas militares. Para Islip, el fin de la ocupación no fue solo un regreso a la vida normal.",
    excerptLabels: [
      null,
      null
    ],
  },
  "prisoner-exchange-1781": {
    title: "Intercambio de prisioneros y confiscación de la propiedad",
    type: "Ley estatal",
    date: "20 de marzo de 1781",
    context: "Esta ley permitió que ciertos habitantes solicitaran ser tratados como prisioneros de guerra para un intercambio. El lenguaje es llamativo: una vez aprobada la solicitud, la persona sería tratada como prisionera de guerra y súbdita del rey de Gran Bretaña, y sus bienes raíces en Nueva York quedarían confiscados a favor del pueblo del Estado.",
    whyItMatters: "Esto muestra qué tan hondo afectó la Revolución la identidad legal y la propiedad. La condición de una persona en tiempos de guerra podía quedar atada a si se le trataba como prisionera, como súbdita británica o como alguien cuya propiedad podía ser confiscada.",
    excerptLabels: [
      null
    ],
  },
  "onderdonk-raids": {
    title: "Relatos de periódicos sobre asaltos a Islip",
    type: "Fragmentos de periódicos",
    date: "1778–1781",
    context: "Notas de periódicos de la época revolucionaria, recopiladas por Henry Onderdonk Jr., registran asaltos, robos y actividad de botes balleneros alrededor de Islip y Blue Point. Varias tratan sobre la casa de William Nicoll, Esq. Muestran la Whaleboat War (la guerra de los botes balleneros) tal como tocó la costa de Islip.",
    whyItMatters: "Estos relatos hacen que la ocupación se vuelva concreta y local. Los residentes de Islip quedaron atrapados entre las fuerzas de ocupación, las sospechas de lealtad a la Corona y los asaltos en botes balleneros desde Connecticut, con la incautación de propiedades como un peligro constante.",
    excerptLabels: [
      "Gaine, 9 de marzo de 1778",
      "Gaine, 15–22 de junio de 1778",
      "Rivington, 1781"
    ],
  },
  "huntington-liberty-flag": {
    title: "La lectura de la Declaración y la bandera de la Libertad de Huntington",
    type: "Contexto regional",
    date: "1776",
    context: "Aunque esto trata sobre Huntington, ayuda a explicar lo que pasaba cerca en 1776. Como la milicia de Islip estaba muy ligada a Huntington, el Historiador del Pueblo sugiere que los milicianos de Islip pudieron haber marchado bajo la misma bandera. La redacción es cuidadosa a propósito: dice “probablemente”, no algo seguro.",
    whyItMatters: "Islip fue parte de una historia más amplia de la ocupación de Long Island. Los registros y las conmemoraciones revolucionarias de Huntington dan contexto regional sobre lo que los residentes de Islip probablemente vivieron. Este proyecto no afirma que Islip haya tenido con certeza su propia bandera de la Libertad.",
    excerptLabels: [
      null
    ],
  },
};
