// Spanish overlays for the timeline. English (timeline.ts) stays canonical;
// entries here replace the display fields per id when the locale is "es".
// Citations in `sources` are bibliographic and are intentionally NOT here.
// Coverage is enforced by scripts/integrity-check.ts: every timeline id must
// have an overlay, so the Spanish site can never silently fall back to English.

export interface TimelineEsEntry {
  date: string;
  title: string;
  inBrief: string;
  body: string[];
  whyToday: string;
}

export const timelineEs: Record<string, TimelineEsEntry> = {
  "pre-1683": {
    date: "Antes de 1683",
    title: "Tierra indígena antes del Islip colonial",
    inBrief: "Antes de que Islip tuviera su nombre, este era el hogar de pueblos nativos, incluidos los secatogue. Su historia aquí es la más antigua.",
    body: [
      "La tierra que se convirtió en Islip era tierra indígena antes de las patentes coloniales y del gobierno del pueblo. Registros coloniales posteriores identifican a Winnaquaheagh como sachem (jefe) de las tierras del actual Pueblo de Islip y describen el traspaso de la tierra a William Nicoll."
    ],
    whyToday: "La historia del pueblo comienza antes de que tuviera un nombre europeo. Esto define cómo el proyecto habla de la tierra, la memoria y la pertenencia.",
  },
  "1683-nicoll-purchase": {
    date: "29 de noviembre de 1683",
    title: "La primera compra de William Nicoll e Islip Grange",
    inBrief: "Un hombre llamado William Nicoll compró tierras a Winnaquaheagh, un líder secatogue. Esa compra dio inicio al lugar que después se llamó Islip.",
    body: [
      "William Nicoll hizo la primera compra de la tierra que se convirtió en Islip Grange el 29 de noviembre de 1683. La carta anotada de 1798 la describe como la primera tierra con escritura y el comienzo de Islip Grange, que abarcaba zonas conectadas con los actuales East Islip, Great River, Islip Terrace y las aldeas cercanas."
    ],
    whyToday: "Esta fecha aparece en la identidad cívica de Islip y en el sello del pueblo, pero marca una compra de tierras, no la creación completa del gobierno moderno del pueblo.",
  },
  "1684-royal-patent": {
    date: "5 de diciembre de 1684",
    title: "Patente real para William Nicoll",
    inBrief: "El gobernador del rey le dio a Nicoll un papel oficial por la tierra. Nicoll tenía que pagarle al rey una pequeña renta cada año.",
    body: [
      "El gobernador real Thomas Dongan confirmó la compra de Nicoll con una patente real el 5 de diciembre de 1684. La patente obligaba a Nicoll a pagar una renta anual a la Corona."
    ],
    whyToday: "La historia de la patente explica por qué la tierra, la ley y la autoridad colonial son centrales en los orígenes de Islip.",
  },
  "1692-1697-sagtikos": {
    date: "1692 / 1697",
    title: "Los comienzos de la Mansión Sagtikos",
    inBrief: "La tierra que se convirtió en la Mansión Sagtikos tuvo aquí su comienzo. Más tarde, esta casa vio muchos momentos importantes de la historia de Islip.",
    body: [
      "La historia de la propiedad de la Mansión Sagtikos comienza con la compra de tierras de Stephanus Van Cortlandt en 1692 y una patente real otorgada el 2 de junio de 1697. Esto se convirtió en la primera parte de lo que después llegó a ser la Mansión Sagtikos."
    ],
    whyToday: "Sagtikos se convierte en uno de los vínculos físicos más fuertes del proyecto entre el Islip colonial, la Revolución y la historia posterior de la familia Gardiner.",
  },
  "1706-carll": {
    date: "1706",
    title: "La familia Carll adquiere la propiedad de Sagtikos",
    inBrief: "La familia Carll compró las tierras de Sagtikos. En el Islip de los primeros tiempos, la tierra familiar y los cargos del pueblo solían ir de la mano.",
    body: [
      "Timothy Carll compró la propiedad de la Mansión Sagtikos a los herederos de Stephanus Van Cortlandt en 1706. Su hijo Ananias heredó después la tierra y participó activamente en el gobierno local."
    ],
    whyToday: "Esto muestra cómo la propiedad, las redes familiares y los cargos locales estaban conectados en los primeros años de Islip.",
  },
  "1710-precinct": {
    date: "1710",
    title: "Se autoriza el gobierno del Precinto",
    inBrief: "Una nueva ley permitió que la gente de Islip eligiera a sus propios líderes locales por primera vez. Fue entonces cuando el gobierno de Islip comenzó de verdad.",
    body: [
      "Una ley colonial aprobada en 1710 permitió que el Precinto de Islip eligiera tasadores, un recaudador, un alguacil y un supervisor. Es un momento clave en el desarrollo del gobierno local."
    ],
    whyToday: "Esta es una de las fechas más sólidas para explicar el comienzo del gobierno de Islip, en lugar de apoyarse de manera demasiado simple en 1683.",
  },
  "1720-freeholders": {
    date: "1720",
    title: "Una elección temprana de los propietarios",
    inBrief: "En esa época, solo los hombres dueños de tierras podían votar. Las mujeres, los pueblos nativos, las personas negras y los niños quedaban fuera.",
    body: [
      "Los registros del pueblo muestran que en las primeras elecciones locales participaban los propietarios (hombres dueños de tierras con derecho a voto). Esto revela que el primer gobierno local estaba limitado por la propiedad y el género."
    ],
    whyToday: "Esto conecta el primer gobierno local con el tema más amplio de la exposición: la promesa de la participación cívica no estaba abierta a todos desde el principio.",
  },
  "1731-1742-carll-duties": {
    date: "1731–1742",
    title: "Ananias Carll y las primeras tareas del pueblo",
    inBrief: "Ananias Carll ayudó a administrar el pueblo, cuidando los caminos y a los vecinos pobres. Los cargos del pueblo eran un trabajo que los vecinos compartían.",
    body: [
      "Ananias Carll fue elegido supervisor en 1731, sirvió como encargado de los pobres a fines de la década de 1730 y ayudó a realizar trabajos públicos de caminos en el Precinto de Islip."
    ],
    whyToday: "Los caminos, la ayuda a los pobres y los registros muestran los comienzos prácticos del gobierno del pueblo.",
  },
  "1739-annual-meeting": {
    date: "abril de 1739",
    title: "La reunión anual del pueblo en acción",
    inBrief: "Cada abril, los vecinos se reunían para elegir a los líderes del pueblo y hacer reglas. En 1739 también pagaron el cuidado de una mujer pobre llamada Hannah Hulse.",
    body: [
      "Las actas de abril de 1739 muestran al gobierno del Precinto de Islip en plena rutina: George Phillips fue elegido supervisor y secretario, junto con tasadores, un alguacil y recaudador, y encargados “to take care of ye Pore of ye Town” (cuidar a los pobres del pueblo). En la misma reunión, Anning Moubray aceptó hospedar a Hannah Hulse, una vecina pobre, por una tarifa semanal fija. Año tras año, el primer martes de abril traía el mismo ritmo cívico: elecciones, cuentas, trabajo en los caminos, revisores de cercas y reglas para los cerdos y verracos sueltos en los terrenos comunes."
    ],
    whyToday: "Décadas antes de la independencia, Islip ya se gobernaba a sí mismo a través de una reunión anual de vecinos. El autogobierno fue una costumbre local antes de convertirse en una idea nacional.",
  },
  "1758-jonathan-thompson": {
    date: "1758",
    title: "Jonathan Thompson compra la Mansión Sagtikos",
    inBrief: "Jonathan Thompson compró la Mansión Sagtikos para su familia. Su hijo Isaac viviría allí durante la Revolución.",
    body: [
      "Jonathan Thompson compró la Mansión Sagtikos / Apple Tree Farm en 1758. La propiedad después se volvió central en la historia de Isaac Thompson durante la época de la Revolución."
    ],
    whyToday: "Esta compra convierte a Sagtikos en un sitio importante de la Revolución en la memoria de Islip.",
  },
  "1765-fishing-rule": {
    date: "abril de 1765",
    title: "El pueblo regula la pesca en la bahía",
    inBrief: "El pueblo hizo una regla: no invitar a gente de afuera a pescar en la bahía. Quien la rompía pagaba una multa, y el dinero iba a ayudar a los pobres.",
    body: [
      "La reunión anual votó que cualquier habitante que le diera permiso a alguien de afuera para pescar en la bahía o en los arroyos perdería cuarenta chelines “to the overseers of the poor for the use of the poor of the Said town” (para los encargados de los pobres, en beneficio de los pobres de dicho pueblo). La regla se mantuvo en 1766 con una vía legal para cobrar la multa, y esa misma idea siguió viva: en 1815 el pueblo votó que los no residentes no podían sacar almejas, pescado ni aves del pueblo."
    ],
    whyToday: "El acceso a la bahía fue política del pueblo desde el principio. Un solo voto une la economía de Islip, su medio ambiente y el cuidado de sus vecinos más pobres.",
  },
  "1765-st-johns": {
    date: "Hacia 1765",
    title: "Se construye St. John's / Charlotte Church",
    inBrief: "Por esta época se levantó el primer edificio de iglesia de Islip. Sus viejos registros nos ayudan a conocer a las primeras familias.",
    body: [
      "El folleto de la iglesia episcopal St. John's dice que 1765 parece ser la fecha más confiable para el edificio de la iglesia. Lo describe como la primera iglesia del Pueblo de Islip y la segunda más antigua del condado de Suffolk."
    ],
    whyToday: "El cementerio de la iglesia y sus registros conservan la historia familiar, religiosa y racial de los primeros tiempos de Islip.",
  },
  "1775-april-meeting": {
    date: "4 de abril de 1775",
    title: "La última reunión anual de Islip en tiempos de paz",
    inBrief: "En abril de 1775, la reunión del pueblo fue completamente normal: se eligieron líderes, se mantuvieron las reglas y nadie habló de guerra. Nadie sabía que todo estaba por cambiar.",
    body: [
      "En la reunión anual del Precinto de Islip del 4 de abril de 1775, las actas registran asuntos locales de rutina: William Nicoll fue reelegido supervisor, siguieron las reglas de siempre sobre los cerdos y se ajustaron las cuentas del precinto. Entre los elegidos para los cargos estaban Benajah Strong e Isaac Thompson como encargados de los caminos, y Thompson también sirvió como encargado de los pobres. No hay ninguna señal de la crisis que estaba por llegar; en menos de un año, estos mismos dos hombres organizarían la compañía de milicia de Islip."
    ],
    whyToday: "Muestra a gente común viviendo vidas normales justo antes de que la historia los alcanzara, un recordatorio de que los grandes cambios pueden llegar sin aviso.",
  },
  "1775-lexington": {
    date: "19 de abril de 1775",
    title: "Lexington y Concord",
    inBrief: "Lejos, en Massachusetts, se pelearon las primeras batallas de la Revolución estadounidense. Las noticias viajaron despacio hasta Long Island.",
    body: [
      "Quince días después de la reunión anual de Islip, estallaron los combates en Lexington y Concord, en Massachusetts. Las noticias llegaron despacio a Long Island, muchas veces de boca en boca y llevadas por barco."
    ],
    whyToday: "La guerra que ocuparía Islip durante siete años comenzó lejos, pero sus consecuencias llegaron a cada pueblo de Long Island.",
  },
  "1775-articles": {
    date: "10 de mayo de 1775",
    title: "Reunión de Islip sobre los Artículos de Asociación",
    inBrief: "Gente de Islip firmó un papel prometiendo apoyar la causa estadounidense. Firmar exigía valor, porque el gobierno del rey lo consideraba un delito.",
    body: [
      "Isaac Thompson asistió a una reunión de propietarios (hombres dueños de tierras con derecho a voto) y residentes del Precinto de Islip el 10 de mayo de 1775 para discutir si apoyaban los Artículos de Asociación del Congreso Continental. Firmó los artículos del Precinto de Islip, poniéndose en riesgo a sí mismo y a su familia, porque también era magistrado de la Corona y funcionario del precinto."
    ],
    whyToday: "Este evento le da a Islip un momento local previo a la independencia, ligado a la Revolución que se acercaba.",
  },
  "1775-census": {
    date: "26 de junio de 1775",
    title: "Censo de Islip y quiénes podían servir en la milicia",
    inBrief: "El pueblo contó a su gente: aquí vivían 375 personas, y 64 hombres tenían la edad justa para servir como soldados de medio tiempo.",
    body: [
      "Un censo realizado por John Mowbrey, con el juez Isaac Thompson como testigo, contó 375 residentes del Precinto de Islip e identificó a 64 hombres de 16 a 50 años obligados al servicio de milicia. Se completó días después de la batalla de Bunker Hill."
    ],
    whyToday: "Da una idea concreta de la escala: un precinto pequeño igual tenía que tomar decisiones políticas y militares.",
  },
  "1776-militia-letter": {
    date: "9 de febrero de 1776",
    title: "Islip pide su propia compañía de milicia",
    inBrief: "Islip pidió tener su propia compañía de milicia, con Benajah Strong como capitán. Unos 36 o 37 hombres formarían parte de ella.",
    body: [
      "Escribiendo como presidente del Comité de Islip, Isaac Thompson pidió al Congreso Provincial que nombrara oficiales para una compañía de milicia elegida por el precinto, proponiendo a Benajah Strong como capitán. La compañía tenía unos 36 o 37 hombres."
    ],
    whyToday: "Islip se organizó política y militarmente antes de la ocupación, en lugar de esperar a que otros decidieran por él.",
  },
  "1776-thompson-supervisor": {
    date: "abril de 1776",
    title: "Isaac Thompson se convierte en supervisor",
    inBrief: "Isaac Thompson fue elegido líder del pueblo, con el cargo de supervisor. Mantuvo ese trabajo durante todos los años de la guerra.",
    body: [
      "En la reunión anual de abril de 1776, las actas registran por primera vez “Isaac Thompson Supervisor”, poniendo fin a la larga permanencia de William Nicoll en el cargo. Thompson, que había firmado los Artículos de Asociación y había pedido al Congreso Provincial una compañía de milicia, sería reelegido cada año durante la ocupación; su última elección como supervisor fue en abril de 1785."
    ],
    whyToday: "El hombre que caminaba por la cuerda floja de la Revolución en Islip no era un extraño. Era el líder electo del pueblo, elegido por sus vecinos en la misma primavera en que la guerra se acercaba.",
  },
  "1776-town-gun": {
    date: "abril de 1776",
    title: "“A Gun and the accutriments”, propiedad del pueblo",
    inBrief: "El pueblo compró un arma con su equipo y dejó escrito que pertenecía a todo el pueblo. Los viejos papeles nunca dicen por qué, así que sigue siendo un misterio.",
    body: [
      "En la página que sigue a la reunión de abril de 1776, el secretario anotó que “A Gun and the accutriments” (un arma y sus accesorios) fueron “paid for at Said Town Meeting which are the property of the towns” (pagados en dicha reunión del pueblo y propiedad del pueblo). Las actas no dicen para qué era el arma. La fecha es sugerente, dos meses después de que Islip pidiera los nombramientos para su milicia y tres meses antes de la independencia, pero el registro en sí es una sola oración, y este proyecto no afirma más de lo que dice."
    ],
    whyToday: "Una sola línea en un libro de cuentas puede guardar todo un momento: un pueblo pequeño comprando un arma con dinero público en la primavera de 1776. Qué significó es una pregunta de investigación que los registros digitalizados ahora le permiten hacer a cualquiera.",
  },
  "1776-declaration-huntington": {
    date: "22 de julio de 1776",
    title: "La Declaración se lee en Huntington",
    inBrief: "La Declaración de Independencia se leyó en voz alta en el cercano Huntington. La gente celebró, pero el peligro venía en camino.",
    body: [
      "La Declaración de Independencia se leyó públicamente en Huntington. Los pueblos cercanos celebraron, pero los movimientos militares británicos pronto cambiaron el ánimo en todo Long Island."
    ],
    whyToday: "La independencia se proclamó justo cuando el peligro de invasión llegaba a la puerta de Islip.",
  },
  "1776-battle-long-island": {
    date: "27–29 de agosto de 1776",
    title: "La batalla de Long Island",
    inBrief: "El ejército británico ganó una gran batalla en Brooklyn. Después de eso, controló todo Long Island, incluido Islip.",
    body: [
      "Las fuerzas británicas derrotaron al Ejército Continental en la batalla de Long Island, peleada en Brooklyn (condado de Kings). La milicia del condado de Suffolk, incluidos hombres vinculados a Islip, había marchado hacia el oeste después de que se leyó la Declaración."
    ],
    whyToday: "La derrota abrió Long Island a la ocupación. La batalla no se peleó en Islip, pero su resultado marcó los siguientes siete años del pueblo.",
  },
  "1776-occupation-begins": {
    date: "1 de septiembre de 1776",
    title: "Comienza la ocupación británica de Long Island",
    inBrief: "Los soldados británicos tomaron el control de Long Island. Durante unos siete años, la gente de Islip tuvo que vivir bajo su mando.",
    body: [
      "Tras la derrota en Brooklyn, las fuerzas británicas y leales a la Corona ocuparon Long Island. El Precinto de Islip permanecería bajo la autoridad de la Corona hasta fines de 1783."
    ],
    whyToday: "Durante seis años, la ocupación marcó la vida diaria en Islip: los hogares, las granjas, la lealtad y la supervivencia.",
  },
  "1776-privateers-inlet": {
    date: "1776",
    title: "Corsarios estadounidenses en Fire Island Inlet",
    inBrief: "Años después, un líder del pueblo recordó que en 1776 tres barcos estadounidenses se escondían en Fire Island Inlet y capturaban barcos británicos. Lo sabemos solo porque él lo dejó escrito.",
    body: [
      "Escribiendo en 1798, el supervisor Nathaniel Conklin recordó que “in the late war in the year 1776 there were three American privateers lay within this Inlet” (en la última guerra, en el año 1776, hubo tres corsarios estadounidenses dentro de esta entrada), que salían cuando se presentaba la oportunidad, capturaban embarcaciones británicas y las traían por la entrada hasta la bahía, entre ellas un barco de transporte de unas trescientas toneladas. Su recuerdo, escrito veintidós años después, es la evidencia principal de esta actividad en la entrada de Islip."
    ],
    whyToday: "La Revolución en el mar tocó a Islip directamente: su propia entrada al mar dio refugio a los corsarios estadounidenses. También muestra cuánta historia local sobrevive solo porque alguien la escribió después.",
  },
  "1776-1783-occupation": {
    date: "1776–1783",
    title: "La ocupación británica afecta a Islip",
    inBrief: "Durante la guerra, los soldados usaron hasta la pequeña iglesia de Islip. La vida fue dura para las familias comunes.",
    body: [
      "Durante la Revolución, Islip vivió bajo la ocupación británica. El folleto de St. John's dice que la pequeña iglesia de tejas de madera fue usada como puesto militar y quedó en mal estado después de que los británicos evacuaron Nueva York en 1783."
    ],
    whyToday: "Esto hace local la Revolución: la ocupación afectó edificios, familias, la vida religiosa y la vida diaria.",
  },
  "1776-mary-thompson": {
    date: "septiembre–octubre de 1776",
    title: "Mary Gardiner Thompson y su familia bajo la ocupación",
    inBrief: "Mary Thompson esperaba un bebé cuando llegaron los soldados. Su familia tuvo que tomar decisiones difíciles para mantenerse a salvo.",
    body: [
      "Al comienzo de la ocupación, Mary Gardiner Thompson estaba en la etapa final de su embarazo y cuidaba a un hijo pequeño. El material del Historiador del Pueblo usa esto para explicar por qué Isaac Thompson pudo haberse quedado en Sagtikos, eligiendo la salud y la seguridad de su familia en medio del peligro."
    ],
    whyToday: "Esto muestra la Revolución a través de la vida familiar, no solo de los hechos militares o políticos.",
  },
  "1777-1783-wartime-meetings": {
    date: "1777–1783",
    title: "Las reuniones del pueblo continúan bajo el nombre del rey",
    inBrief: "Aun con los soldados al mando, el pueblo siguió haciendo su reunión cada abril. Los papeles tenían que usar el nombre del rey, pero eso no nos dice lo que la gente realmente creía.",
    body: [
      "Durante todos los años de la ocupación británica, Islip celebró su reunión anual de abril, eligió a sus funcionarios y llevó sus cuentas. Como registros legales bajo la autoridad de la Corona, las actas fecharon cada reunión de esos años de guerra según el reinado del rey Jorge III, hasta “the three and twentieth year” (el año veintitrés) en abril de 1783. Esa redacción era la fórmula legal obligatoria de un lugar ocupado, no una prueba de que la gente de Islip fuera leal a la Corona: las mismas reuniones siguieron reeligiendo como supervisor a Isaac Thompson, quien había firmado los Artículos de Asociación del lado patriota."
    ],
    whyToday: "La Revolución no fue un corte limpio. Los propios registros de Islip muestran a una comunidad que se mantuvo unida bajo la ocupación, gobernándose con las fórmulas de una autoridad mientras muchos de sus habitantes esperaban otra.",
  },
  "1778-suspected": {
    date: "30 de junio de 1778",
    title: "Nueva York pone en la mira a los “suspected characters”",
    inBrief: "Una nueva ley decía que la gente tenía que prometer lealtad a Nueva York. Incluso quedarse neutral, sin escoger un bando, podía traer problemas.",
    body: [
      "Una ley de Nueva York autorizó a comisionados a citar a personas consideradas neutrales o de lealtad “equivocal and suspected” (dudosa y sospechosa) y a exigirles jurar lealtad al Estado."
    ],
    whyToday: "Muestra que la Revolución fue también un conflicto civil, donde la propia neutralidad podía tratarse como algo peligroso.",
  },
  "1779-loyalty-laws": {
    date: "octubre de 1779",
    title: "Nueva York castiga la lealtad al rey y planea la reocupación",
    inBrief: "Nueva York castigó a quienes ayudaron al bando del rey quitándoles sus tierras. La guerra separó a los vecinos.",
    body: [
      "En cuestión de dos días, Nueva York aprobó una ley que confiscaba y vendía las propiedades de quienes se habían adherido al enemigo (nombrando a figuras como Sir Henry Clinton), y otra ley para planear el gobierno temporal del distrito sur una vez que los británicos se fueran."
    ],
    whyToday: "La propiedad, el castigo y el difícil regreso al gobierno civil fueron parte del alcance local de la Revolución.",
  },
  "1781-plundering": {
    date: "1781",
    title: "Los asaltos en botes balleneros y la resolución contra el saqueo",
    inBrief: "Asaltantes en botes pequeños cruzaban desde Connecticut y robaban granjas de Long Island, incluso en Islip. La gente de aquí enfrentaba peligro por todos lados.",
    body: [
      "Mientras botes armados desde Connecticut asaltaban el Long Island ocupado, Nueva York resolvió que sus habitantes, aunque estaban bajo control británico, seguían siendo sus súbditos y merecían protección, no saqueo. Relatos de periódicos registran asaltos repetidos a la casa de los Nicoll en Islip."
    ],
    whyToday: "Los habitantes de Islip quedaron atrapados entre ocupantes, asaltantes y sospechas de todos lados: la “Whaleboat War” (la guerra de los botes balleneros) en su propia orilla.",
  },
  "1782-1783-hutton": {
    date: "1782–1783",
    title: "Ayuda a los pobres en tiempos de guerra: Johanna Hutton y su hijo",
    inBrief: "Incluso durante la guerra, el pueblo ayudó a una madre llamada Johanna Hutton y a su hijo. Las familias se turnaban para cuidarlos.",
    body: [
      "En plena ocupación, el pueblo formalizó su cuidado de los pobres. En 1782 la reunión acordó que los encargados de los pobres, junto con un juez, fijarían y cobrarían el dinero necesario para la ayuda a los pobres. En 1783 se votó que Johanna Hutton y su hijo serían mantenidos por las familias del pueblo por turnos, en proporción a sus impuestos, comenzando por el extremo oeste del pueblo. Las cuentas también registran pagos a “Joanna Hudson”, aparentemente la misma mujer con el nombre escrito de otra forma."
    ],
    whyToday: "La guerra no puso en pausa las dificultades de todos los días. Una madre y su hijo mantenidos casa por casa muestran lo duro y lo real de una red de apoyo del siglo dieciocho, y que siguió funcionando durante la ocupación.",
  },
  "1783-evacuation": {
    date: "23 de noviembre de 1783",
    title: "Los británicos se retiran; Islip vuelve al estado",
    inBrief: "Los británicos por fin se fueron en sus barcos, y la guerra terminó. Islip al fin era parte de los nuevos Estados Unidos.",
    body: [
      "Las últimas fuerzas británicas salieron de la ciudad de Nueva York, y entraron las tropas continentales. Después de más de siete años, la ocupación de Long Island terminó e Islip volvió al Estado de Nueva York."
    ],
    whyToday: "La independencia, declarada en 1776, solo se hizo realidad en Islip a fines de 1783.",
  },
  "1783-st-johns-mixed": {
    date: "1783",
    title: "El cambio de nombre de St. John's y un registro de población diversa",
    inBrief: "Un registro de la iglesia de 1783 cuenta la boda de York, un hombre negro, y Elizabeth, una mujer indígena libre. Muestra que Islip era hogar de gente muy diversa.",
    body: [
      "Después de la Revolución, los feligreses votaron por cambiar el nombre de Charlotte Church a St. John's. El registro de matrimonio de 1783 de York, un sirviente negro de William Nicoll, y Elizabeth, una mujer indígena libre, ofrece una mirada poco común a la población pequeña pero étnicamente diversa de Islip Grange."
    ],
    whyToday: "Esto conecta a la nueva nación con la promesa inconclusa de pertenencia e inclusión racial.",
  },
  "1784-state-authority": {
    date: "abril de 1784",
    title: "Primera reunión del pueblo bajo el Estado de Nueva York",
    inBrief: "Por primera vez, los papeles del pueblo dejaron de contar los años por el rey. En su lugar, los contaron desde la independencia de Estados Unidos.",
    body: [
      "El primer abril después de que los británicos evacuaran Nueva York, la reunión anual de Islip abrió con palabras nuevas: celebrada “by the Authority of the good People of the State of new york and in the Eighth year of the American Independence” (por la autoridad del buen pueblo del Estado de Nueva York y en el octavo año de la independencia de Estados Unidos). Los cargos, la regla de los cerdos y las cuentas continuaron como antes, e Isaac Thompson fue reelegido supervisor, pero el pueblo ahora contaba sus años desde 1776."
    ],
    whyToday: "Este encabezado es la llegada de la Revolución escrita con la propia letra de Islip: el momento en que los registros del pueblo dejaron de pertenecer a un rey y empezaron a pertenecer a un estado construido sobre la independencia.",
  },
  "1790-washington": {
    date: "21–22 de abril de 1790",
    title: "La gira de Washington por Long Island y la Mansión Sagtikos",
    inBrief: "El presidente George Washington pasó una noche en la Mansión Sagtikos durante su viaje por Long Island. Vino como líder del país recién nacido.",
    body: [
      "El diario de George Washington describe que se detuvo en la casa “Squire Thompson's” el 21 de abril de 1790, y que a la mañana siguiente salió de “Mr. Thompson's”. La anotación del Historiador del Pueblo identifica esta casa como la Mansión Sagtikos, sobre la actual Montauk Highway."
    ],
    whyToday: "La visita de Washington une el paisaje de Islip ocupado durante la Revolución con la nueva república.",
  },
  "1796-school-commissioners": {
    date: "abril de 1796",
    title: "Se eligen los comisionados de escuelas",
    inBrief: "El pueblo escogió a sus primeros líderes escolares. En ese entonces Islip tenía cinco pequeñas escuelas.",
    body: [
      "La reunión anual eligió comisionados de escuelas por primera vez en el libro de actas: Richard Udall, Nathaniel Conklin y Nehemiah Higbie, después de que el Estado de Nueva York aprobara en 1795 una ley para fomentar las escuelas comunes. La descripción de Conklin de 1798 completa el cuadro: cinco pequeñas escuelas, maestros contratados por trimestre y, en un año, doce maestros de escuela y 11,814 días de instrucción. En 1799 la reunión ordenó que el dinero escolar recaudado en 1797 y 1798 se pagara a la tesorería del pueblo."
    ],
    whyToday: "La educación pública en Islip comienza en estos registros, atendida en la misma reunión que elegía a los revisores de cercas. Las escuelas empezaron aquí como una responsabilidad local y entre vecinos.",
  },
  "1798-conklin": {
    date: "11 de enero de 1798",
    title: "Nathaniel Conklin describe Islip",
    inBrief: "El líder del pueblo Nathaniel Conklin escribió una carta larga describiendo Islip: sus granjas, la bahía, los molinos, las tabernas, las escuelas y unas 120 casas.",
    body: [
      "El supervisor Nathaniel Conklin escribió una descripción del Pueblo de Islip el 11 de enero de 1798, para defender los límites del pueblo en una disputa con Huntington. De paso describió el pueblo entero: granjas y “necks” (lenguas de tierra) divididas por arroyos, casas a lo largo de la South Country Road frente a la bahía, los llanos de pinos que cubrían unas cuatro quintas partes de la tierra, las ostras y almejas de la bahía, cultivos y ganado, iglesias, cinco escuelas, dos molinos de grano, seis aserraderos, cinco tabernas, un médico y unas 120 viviendas, veinticinco de ellas habitadas por “Indians, Mustees and free Negros” (indígenas, “Mustees”, un término de la época para personas de ascendencia mixta, y negros libres)."
    ],
    whyToday: "Este es el retrato más completo de Islip en la primera generación después de la independencia que el proyecto ha encontrado, y el punto de partida para preguntar a quiénes incluía de verdad la promesa del pueblo.",
  },
  "1790-1800-population": {
    date: "1790–1800",
    title: "La población temprana y las personas de color en Islip",
    inBrief: "Los registros antiguos muestran que más o menos una de cada cinco casas en Islip pertenecía a familias indígenas, negras o mixtas. Islip nunca fue un pueblo de una sola gente.",
    body: [
      "La publicación anotada de Conklin señala que la población de Islip era de 609 en 1790 y de 958 para 1800. También apunta que alrededor del 21 por ciento de las 120 viviendas estaban ocupadas por personas de color, y estima aproximadamente entre 128 y 201 personas en esa categoría."
    ],
    whyToday: "Esto es clave para mostrar que el Islip temprano no fue solo una historia de familias blancas dueñas de tierras.",
  },
  "1883-town-seal": {
    date: "1883",
    title: "Abraham Gardiner Thompson diseña el Sello del Pueblo",
    inBrief: "Islip recibió su sello del pueblo, que es un juego de imágenes: un ojo (“eye” en inglés) más una ramita de planta llamada “slip” forman “I-slip”. Todavía puedes verlo hoy.",
    body: [
      "En 1883, el secretario del pueblo Seth Clock le pidió a Abraham Gardiner Thompson que diseñara un sello para el Pueblo de Islip. El diseño de Thompson usó un “eye” (ojo) y un “slip” (ramita de planta) como un acertijo de imágenes, y conectó el símbolo con los orígenes poco comunes del pueblo."
    ],
    whyToday: "El Sello del Pueblo todavía aparece hoy en el gobierno y la vida cívica, lo que hace de este uno de los vínculos más visibles entre el pasado y el presente.",
  },
  "1897-cemetery": {
    date: "10 de diciembre de 1897",
    title: "Se reconoce la Bay Shore United Hebrew Benevolent Cemetery Association",
    inBrief: "Las familias judías crearon su propia asociación de cementerio. Fue uno de los primeros grandes pasos de la comunidad judía en Islip.",
    body: [
      "El folleto de la comunidad judía señala que la Bay Shore United Hebrew Benevolent Cemetery Association fue reconocida legalmente el 10 de diciembre de 1897. Esto ayudó a establecer el entierro judío y la vida religiosa comunitaria en el Pueblo de Islip."
    ],
    whyToday: "Esto muestra cómo las comunidades inmigrantes y religiosas construyeron instituciones que hicieron visible la pertenencia.",
  },
  "1918-synagogue": {
    date: "1918",
    title: "Se compra la primera sinagoga en el Pueblo de Islip",
    inBrief: "La comunidad judía compró su primer edificio de sinagoga en el Pueblo de Islip.",
    body: [
      "El folleto de la comunidad judía dice que la Bay Shore United Hebrew Benevolent Cemetery Association compró la primera sinagoga del Pueblo de Islip a los Knights of Columbus en 1918."
    ],
    whyToday: "Esto marca un gran paso institucional en la vida judía de Islip.",
  },
  "1933-merge": {
    date: "1933",
    title: "Las organizaciones judías se unen en el Bay Shore Jewish Center",
    inBrief: "Grupos judíos más pequeños se juntaron y formaron el Bay Shore Jewish Center.",
    body: [
      "La Bay Shore United Hebrew Benevolent Cemetery Association se fusionó con la Bay Shore Jewish Alliance, la Ladies Aid Society y la Junior League para convertirse en lo que hoy se conoce como el Bay Shore Jewish Center."
    ],
    whyToday: "Esto muestra cómo pequeños grupos comunitarios se convirtieron en instituciones duraderas.",
  },
  "postwar-refuge": {
    date: "Después de la Segunda Guerra Mundial",
    title: "Sobrevivientes del Holocausto encuentran refugio en Central Islip",
    inBrief: "Después de la Segunda Guerra Mundial, algunos judíos sobrevivientes del Holocausto encontraron un nuevo hogar seguro en Islip. Samuel Sitko fue uno de ellos.",
    body: [
      "Después de la Segunda Guerra Mundial, refugiados judíos llegaron por Ellis Island y algunos se abrieron camino hasta el Pueblo de Islip. Adasse Farm, una granja en Central Islip, sirvió como uno de esos refugios, incluyendo a Samuel Sitko y al menos a otros tres sobrevivientes conocidos."
    ],
    whyToday: "Esto conecta a Islip con la historia mundial, el refugio, la reconstrucción y la pertenencia de los inmigrantes.",
  },
  "1958-brentwood": {
    date: "agosto–septiembre de 1958",
    title: "Se organiza el Brentwood Jewish Center",
    inBrief: "Unos 30 vecinos se reunieron en una sala de estar y decidieron fundar el Brentwood Jewish Center.",
    body: [
      "Unas 30 personas se reunieron en la casa de Ruby y Doris Hodus el 29 de agosto de 1958 para hablar de formar un lugar de culto judío en Brentwood. El 1 de septiembre se escogió el nombre Brentwood Jewish Center."
    ],
    whyToday: "Esto muestra cómo los vecinos crearon instituciones para responder a las necesidades cambiantes de la comunidad.",
  },
  "1964-bnai-israel": {
    date: "julio de 1964",
    title: "Se funda el B'nai Israel Reform Temple",
    inBrief: "Familias de East Islip y Sayville fundaron un nuevo templo llamado B'nai Israel.",
    body: [
      "El folleto de la comunidad judía dice que el B'nai Israel Reform Temple se fundó en julio de 1964 después de un trabajo de organización comunitaria entre familias de la zona de East Islip y Sayville."
    ],
    whyToday: "Esto conecta la vida familiar, los niños, la fe y la construcción de instituciones locales.",
  },
  "2022-internship": {
    date: "2022",
    title: "Programa de pasantías y aprendices del Historiador del Pueblo",
    inBrief: "La Oficina del Historiador del Pueblo empezó a enseñar a estudiantes cómo estudiar y compartir la historia de Islip.",
    body: [
      "La edición de 2024 de Vignettes dice que, desde 2022, un programa de pasantes y aprendices forma parte de la Oficina del Historiador del Pueblo. El programa enseña investigación, escritura, manejo de documentos, preservación, interpretación y presentación al público."
    ],
    whyToday: "Esto conecta al propio proyecto con una tradición viva de historia pública en Islip.",
  },
  "2025-2026-expansion": {
    date: "2025–2026",
    title: "La Oficina del Historiador del Pueblo amplía su trabajo de historia pública",
    inBrief: "La Oficina del Historiador sigue trabajando para abrir la historia de Islip a todos.",
    body: [
      "La edición de 2025 de Vignettes describe a la Oficina del Historiador entrando en su año número once y continuando los esfuerzos por abrir la historia única de Islip a los residentes a través de personal, voluntarios, agencias, organizaciones, eventos y publicaciones."
    ],
    whyToday: "Este es el contexto institucional del sitio web: el proyecto es parte de un esfuerzo más grande por hacer la historia de Islip pública, accesible y útil.",
  },
  "2026-250th": {
    date: "2025–2026",
    title: "Placas para los patriotas y la conmemoración de los 250 años",
    inBrief: "Islip se prepara para el cumpleaños 250 de Estados Unidos. Nuevas placas honran a los patriotas del pueblo de la época de la Revolución.",
    body: [
      "Junto con los Sons of the American Revolution, la Oficina del Historiador del Pueblo investigó y marcó los lugares de entierro de los patriotas conocidos de Islip, y se planea una placa histórica de la “Islip Militia” cerca de Islip Town Hall (la sede del gobierno del pueblo). Estos son algunos de los primeros pasos de la conmemoración de los 250 años del Pueblo."
    ],
    whyToday: "La Revolución no está solo en documentos viejos. Todavía se investiga, se marca y se recuerda en Islip hoy.",
  },
};
