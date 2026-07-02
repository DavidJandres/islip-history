// Spanish overlays for the People roster. English (people.ts) stays canonical;
// entries here replace the display fields per slug when the locale is "es".
// Names, portraits, and source citations are not translated.

export interface PersonEsEntry {
  role: string;
  bio: string[];
  whyMatters: string;
  connectionToday: string;
  cardText: string;
}

export const peopleEs: Record<string, PersonEsEntry> = {
  "winnaquaheagh": {
    role: "Sachem de las tierras que se convirtieron en Islip",
    bio: [
      "Winnaquaheagh, identificado en material del Historiador del Pueblo como sachem de las tierras del actual Pueblo de Islip, aparece en la historia temprana del traspaso de tierras conectada con William Nicoll y la creación de Islip Grange. Las fuentes describen la escritura de 1683 que transfirió la tierra a Nicoll, con límites descritos a partir de ríos y de la línea de costa. Eso hace que Winnaquaheagh sea esencial para la historia: el origen colonial de Islip no comenzó en tierra vacía, sino en tierra indígena que ya cargaba historia, autoridad y significado nativos."
    ],
    whyMatters: "Winnaquaheagh ancla la historia antes del Islip colonial. Su presencia es un recordatorio de que la historia del pueblo no comenzó con William Nicoll ni con las patentes europeas.",
    connectionToday: "Incluir a Winnaquaheagh ayuda a que el proyecto no trate a los pueblos indígenas como un simple fondo, y presenta la historia de Islip como una historia con capas de tierra, poder, memoria y pertenencia.",
    cardText: "Sachem de las tierras que se convirtieron en Islip, nombrado en la historia del traspaso de tierras de 1683 con William Nicoll. Su presencia nos recuerda que la historia de Islip comienza antes de las patentes coloniales y del gobierno del pueblo.",
  },
  "william-nicoll": {
    role: "Fundador de Islip Grange",
    bio: [
      "William Nicoll hizo la primera compra de la tierra que se convirtió en Islip Grange el 29 de noviembre de 1683. Las anotaciones a la carta de Conklin de 1798 describen esto como la “first deeded land” (la primera tierra con escritura) y el nacimiento de lo que Nicoll llamó “Islip Grange”, que cubría tierras asociadas con los actuales East Islip, Great River, Islip Terrace y zonas cercanas. El Gobernador Real confirmó la compra con una patente real el 5 de diciembre de 1684.",
      "El propio fundador aparentemente no ocupó ningún cargo del pueblo de Islip; las anotaciones al primer libro de actas del pueblo sugieren que su influencia funcionaba más bien a través de sus cargos provinciales, incluido el de presidente de la Asamblea General. Sin embargo, el apellido de la familia recorre el libro de actas por generaciones: un William Nicoll fue supervisor del precinto durante la mayoría de los años entre 1747 y 1775, y otro volvió a ocupar el cargo en la década de 1790."
    ],
    whyMatters: "Nicoll es central para el origen colonial de Islip Grange y para la historia legal de la tierra que con el tiempo se convirtió en el Pueblo de Islip.",
    connectionToday: "Su historia ayuda a explicar el Sello del Pueblo, los nombres de lugares locales, los primeros patrones de propiedad de la tierra y por qué la fundación de Islip es más complicada que una sola fecha.",
    cardText: "La compra de William Nicoll en 1683 creó Islip Grange, la propiedad colonial que se convirtió en una base para el posterior Pueblo de Islip.",
  },
  "stephanus-van-cortlandt": {
    role: "Primer titular de la patente de la Mansión Sagtikos",
    bio: [
      "Los comienzos de la Mansión Sagtikos se remontan a una patente real otorgada a Stephanus Van Cortlandt el 2 de junio de 1697, basada en su compra de 1692 de 150 acres que se convirtieron en la primera parte de la propiedad. El material del Historiador del Pueblo señala que Van Cortlandt estaba conectado por familia con William Nicoll, lo que une la historia de Sagtikos con la red más amplia de familias coloniales dueñas de tierras."
    ],
    whyMatters: "Van Cortlandt conecta la Mansión Sagtikos con la historia de propiedad colonial más temprana del pueblo.",
    connectionToday: "Su entrada ayuda a que los visitantes vean que la Mansión Sagtikos no fue solo un sitio de la Revolución, sino parte de una historia colonial de la tierra más larga.",
    cardText: "La patente de Stephanus Van Cortlandt en 1697 marca el comienzo de la historia de la propiedad de la Mansión Sagtikos, y une uno de los sitios históricos más importantes de Islip con las redes coloniales de tierras de Long Island.",
  },
  "ananias-carll": {
    role: "Uno de los primeros supervisores del pueblo",
    bio: [
      "Ananias Carll heredó la propiedad de Sagtikos de la línea de Timothy Carll y aparece en los primeros registros del pueblo de Islip. Registró una marca de oreja para su ganado en 1726, fue elegido supervisor en 1731, sirvió como encargado de los pobres a fines de la década de 1730 y ayudó a cumplir una ley de la Asamblea de 1733 para trazar un camino público a través del Precinto de Islip."
    ],
    whyMatters: "Carll conecta la propiedad, el gobierno local, los caminos públicos, el ganado y la ayuda a los pobres: el trabajo práctico de la vida temprana del pueblo.",
    connectionToday: "Su papel muestra que el gobierno del pueblo se construyó con responsabilidades cotidianas: caminos, registros, bienestar público y manejo de la tierra.",
    cardText: "Ananias Carll muestra al gobierno temprano de Islip en acción: Sagtikos, los caminos del pueblo, los cargos públicos y los deberes prácticos que convirtieron un precinto disperso en una comunidad que funcionaba.",
  },
  "jonathan-thompson": {
    role: "Trajo la Mansión Sagtikos a la familia Thompson",
    bio: [
      "Jonathan Thompson, de Brookhaven/Setauket, compró la Mansión Sagtikos, también llamada Apple Tree Farm, en 1758. El material del Historiador del Pueblo afirma que la propiedad se compró por £1,200 en moneda de Nueva York, y que su hijo Isaac Thompson parece haber asumido la administración de la granja siendo adolescente."
    ],
    whyMatters: "Jonathan Thompson trajo la Mansión Sagtikos a la familia Thompson, preparando el terreno para la historia de Isaac Thompson en la época de la Revolución.",
    connectionToday: "Su compra es parte de la razón por la que Sagtikos se convirtió en uno de los vínculos más claros de Islip con la Revolución, la gira de Washington por Long Island y la historia de la familia Gardiner.",
    cardText: "La compra de la Mansión Sagtikos por Jonathan Thompson en 1758 trajo la propiedad a la familia Thompson y preparó el terreno para su importancia en la época de la Revolución.",
  },
  "isaac-thompson": {
    role: "Patriota, magistrado y dueño de personas esclavizadas",
    bio: [
      "Isaac Thompson es una de las personas más importantes de esta historia. El ensayo del Historiador del Pueblo lo llama “A Man on a Tightrope” (un hombre en la cuerda floja): alguien que ocupó cargos de la Corona, políticos locales y judiciales mientras también tomaba riesgos patriotas durante la época de la Revolución. La fuente sostiene que Thompson no fue simplemente un testigo de la historia, sino alguien que “made history” (hizo historia), tomando una postura que puso en peligro su vida y a su familia.",
      "Thompson firmó los Articles of Association (Artículos de Asociación) del Precinto de Islip después de una reunión del 10 de mayo de 1775 de propietarios (hombres dueños de tierras con derecho a voto) y residentes, convocada para discutir el apoyo al Congreso Continental. Firmar puso en riesgo a Thompson, a su familia y a su propiedad, porque él también era magistrado de la Corona y funcionario del precinto.",
      "El propio libro de actas del pueblo sigue su servicio público año por año. Aparece por primera vez en 1768 como encargado de los pobres, fue elegido encargado de los caminos en abril de 1775 junto a Benajah Strong, y en abril de 1776 fue elegido supervisor. Fue reelegido en cada reunión durante la guerra, aun cuando las actas, como registros legales en territorio ocupado, se fechaban por el reinado del rey Jorge III, y seguía siendo supervisor en abril de 1784, cuando el registro contó por primera vez los años desde la independencia estadounidense. Su última elección como supervisor llegó en abril de 1785.",
      "Su historia también debe incluir la parte más dura: la esclavitud y el trabajo en la Mansión Sagtikos. Basándose en el trabajo de Christopher Verga, el material aportado afirma que, durante los años en que Thompson fue dueño, gran parte del trabajo en la granja y en la casa lo realizaban personas esclavizadas o con contratos de servidumbre. Señala que Thompson fue dueño, en promedio, de cuatro personas esclavizadas en las décadas alrededor de 1790, 1800 y 1810, y que esta historia más completa debe ser parte de la investigación del 250.º aniversario."
    ],
    whyMatters: "Isaac Thompson conecta a Islip directamente con la Revolución, la ocupación británica, la Mansión Sagtikos, los cargos públicos locales y las contradicciones de la libertad en una sociedad esclavista.",
    connectionToday: "Su vida es el puente entre la memoria patriótica y una historia pública honesta. Permite que el proyecto muestre que la Revolución importó, y que la promesa de la independencia quedó incompleta.",
    cardText: "Isaac Thompson vivió la Revolución “on a tightrope” (en la cuerda floja): simpatizante patriota, funcionario local, magistrado de la Corona, residente de la Mansión Sagtikos y dueño de personas esclavizadas, cuya vida revela tanto el valor como las contradicciones del Islip de la Revolución.",
  },
  "mary-gardiner-thompson": {
    role: "La Mansión Sagtikos y la conexión Gardiner",
    bio: [
      "Mary Gardiner Thompson fue la esposa de Isaac Thompson y parte de la conexión Gardiner en la Mansión Sagtikos. El material del Historiador del Pueblo la describe, al comienzo de la ocupación, embarazada y “lying in” (guardando reposo por el parto), mientras también cuidaba a un niño pequeño, lo que ayuda a explicar por qué Isaac quizá no pudo o no quiso irse de Sagtikos: la salud y la seguridad de su familia lo ataban a la casa."
    ],
    whyMatters: "Mary Gardiner Thompson ayuda a convertir la historia de la Revolución de un relato militar en una historia de familia y de vida en el hogar.",
    connectionToday: "Su historia ayuda a que los visitantes entiendan que la ocupación afectó a los hogares, las mujeres, los niños y las decisiones familiares, no solo a soldados y funcionarios.",
    cardText: "La situación de Mary Gardiner Thompson durante la ocupación muestra cómo la Revolución entró en la vida familiar. En Sagtikos, la guerra no fue solo política; fue embarazo, hijos, riesgo y supervivencia.",
  },
  "benajah-strong": {
    role: "Capitán de milicia y último supervisor del Precinto de Islip",
    bio: [
      "Benajah Strong fue un agricultor, patriota y funcionario público cuya vida conectó la milicia de Islip, su gobierno del pueblo y la familia Thompson de la Mansión Sagtikos. Nacido alrededor de 1748, en mayo de 1772 se casó con Hannah Thompson, hermana de Isaac Thompson, lo que también lo unió a la familia Woodhull.",
      "Las actas del pueblo colocan a Strong dentro del gobierno local justo antes de la guerra: en la reunión anual de abril de 1775 fue elegido encargado de los caminos junto a Isaac Thompson, semanas antes de que Islip firmara los Articles of Association (Artículos de Asociación). En febrero de 1776, cuando el Precinto de Islip buscó comisiones para su propia compañía de milicia, los residentes eligieron a Benajah Strong como su capitán. Conocido partidario de la causa patriota, estuvo entre quienes huyeron a Connecticut cuando los británicos ocuparon el condado de Suffolk, y participó en varias incursiones y misiones. Los británicos lo consideraban un “notorious rebel” (un rebelde notorio).",
      "Después de la guerra, Strong volvió a la vida pública. En abril de 1787 fue la última persona elegida supervisor del Precinto de Islip, y cuando el Estado de Nueva York reconoció a Islip como Pueblo en 1788, siguió en cargos del pueblo: el libro de actas lo registra como secretario del pueblo desde 1789 hasta 1795, y en 1795 la reunión votó celebrar la siguiente reunión anual del pueblo en su casa."
    ],
    whyMatters: "Benajah Strong muestra que la Revolución de Islip fue llevada adelante por más de una familia. Como capitán de milicia, refugiado, participante en incursiones y último supervisor del precinto, une la organización militar del pueblo, su exilio durante la guerra y su transición de precinto a pueblo.",
    connectionToday: "Su carrera une la Revolución con la fundación del gobierno del Pueblo de Islip. Señalar y recordar a figuras como Strong es parte de la investigación en curso del Pueblo por el 250.º aniversario.",
    cardText: "Capitán de milicia, refugiado durante la guerra y último supervisor del Precinto de Islip. Cuñado de Isaac Thompson, une la milicia patriota de Islip con la fundación de su gobierno del pueblo.",
  },
  "george-washington": {
    role: "Primer presidente de los Estados Unidos",
    bio: [
      "La gira de Washington por Long Island en 1790 conecta el paisaje de la Revolución en Islip con la nueva república. La publicación anotada de Conklin de 1798 cita el diario de Washington del 21 y 22 de abril de 1790, incluida una visita a “Squire Thompson's” (la casa del señor Thompson) y su salida de “Mr. Thompson's” a la mañana siguiente. Las notas identifican esa casa como la Mansión Sagtikos, que todavía está en pie sobre Montauk Highway."
    ],
    whyMatters: "La parada de Washington le da a Islip una conexión directa con los primeros años de la presidencia y con la nación posterior a la Revolución.",
    connectionToday: "Su visita convierte a Sagtikos en un símbolo de transformación: un paisaje de ocupación pasó a ser parte de la ruta del primer presidente de los Estados Unidos.",
    cardText: "La gira de George Washington por Long Island en 1790 llevó al primer presidente por el paisaje de la Revolución en Islip. Su diario menciona una estadía en “Squire Thompson's” (la casa del señor Thompson), identificada en las notas del Historiador del Pueblo como la Mansión Sagtikos.",
  },
  "henry-clinton": {
    role: "General británico durante la ocupación",
    bio: [
      "El material del Historiador del Pueblo dice que a los visitantes de la Mansión Sagtikos se les cuenta que el general británico Henry Clinton estuvo allí “from time to time” (de vez en cuando) durante la ocupación de Long Island. Otra sección señala que sus estadías exactas requieren más investigación en sus documentos, y que aunque las tropas usaban la propiedad cuando estaban en la zona, decir que estaban estacionadas allí de forma permanente puede ser una afirmación demasiado fuerte."
    ],
    whyMatters: "Clinton representa la presencia militar británica en el Long Island ocupado y la presión que sintieron las familias locales durante la guerra.",
    connectionToday: "Su entrada muestra por qué importa el lenguaje cuidadoso: el proyecto puede demostrar cómo los historiadores separan la evidencia sólida, la tradición local y las afirmaciones que todavía necesitan investigación.",
    cardText: "El general Henry Clinton aparece en la tradición local de Sagtikos como parte de la historia de la ocupación de la Mansión. Los detalles todavía necesitan investigación, lo que lo convierte en un ejemplo útil de cómo la historia pública maneja la evidencia con cuidado.",
  },
  "york-and-elizabeth": {
    role: "Un sirviente y una mujer libre, 1783",
    bio: [
      "El folleto de la iglesia episcopal St. John's registra un matrimonio de 1783 entre “York, a Black servant to William Nicoll, Esq.” (York, un sirviente negro de William Nicoll) y “Elizabeth, a free Indian Woman” (Elizabeth, una mujer indígena libre). El folleto dice que este registro, junto con otros, ofrece una mirada a la población de Islip Grange en esa época: pequeña, pero étnicamente mezclada."
    ],
    whyMatters: "York y Elizabeth representan a personas que a menudo aparecen solo por un momento en los registros, pero que son esenciales para la historia real del pueblo.",
    connectionToday: "Su historia le da forma humana a la “promesa incumplida”. Les recuerdan a los visitantes que el Islip temprano incluyó vidas negras e indígenas, no solo titulares de patentes, funcionarios y familias dueñas de tierras.",
    cardText: "York y Elizabeth aparecen en un registro de matrimonio de 1783 de St. John's: York como sirviente negro de William Nicoll, Elizabeth como mujer indígena libre. Su breve registro revela un Islip temprano más diverso de lo que suelen mostrar las historias de fundación.",
  },
  "nathaniel-conklin": {
    role: "Supervisor y cronista de 1798",
    bio: [
      "Nathaniel Conklin sirvió al Pueblo de Islip en varios puestos durante 33 años, a veces ocupando más de uno a la vez. Fue supervisor durante cuatro años y también tuvo cargos como revisor de cercas, comisionado de escuelas, comisionado de caminos, encargado de los caminos, miembro de una comisión para negociar con Huntington sobre los derechos de la bahía y las islas, y miembro de un comité para arrendar el pasto de Captree Island.",
      "El primer libro de actas del pueblo muestra el arco de ese servicio: encargado de los caminos ya en 1793, revisor de cercas, uno de los primeros tres comisionados de escuelas del pueblo en 1796, y supervisor en 1797 y de nuevo de 1799 a 1801. Era supervisor cuando escribió la descripción de enero de 1798, y el dinero para escuelas que ayudó a supervisar aparece en las órdenes de la reunión de 1799.",
      "Su “Description of the Town of Islip” (Descripción del Pueblo de Islip) de 1798 se escribió para defender los reclamos de tierras de Islip y ofrece una vista poco común del pueblo hacia el final del siglo XVIII. La publicación anotada señala que la carta se encontró en los Archivos del Estado de Nueva York y que luego fue transcrita e interpretada por Christopher Albergo y George Munkenbeck."
    ],
    whyMatters: "Conklin conservó una imagen detallada de la tierra, los límites, la población, la economía y el gobierno del Islip temprano.",
    connectionToday: "Su carta muestra por qué importan los archivos. Sin documentos como este, gran parte del Islip temprano sería mucho más difícil de reconstruir.",
    cardText: "La descripción de Islip que Nathaniel Conklin escribió en 1798 es una de las vistas más claras que sobreviven del pueblo cerca de la época de su fundación. Su servicio público y sus registros conectan a los residentes de hoy con un Islip que ya no existe.",
  },
  "abraham-gardiner-thompson": {
    role: "Médico y diseñador del Sello del Pueblo",
    bio: [
      "Abraham Gardiner Thompson nació en el Pueblo de Islip el 10 de agosto de 1810, en una familia local influyente. Estudió medicina, viajó a París para más formación en cirugía, ejerció la medicina, sirvió dos periodos en la Asamblea del Estado de Nueva York, fue activo en la Iglesia Episcopal y donó terrenos relacionados con la iglesia St. Mark's en Islip.",
      "Su aporte más duradero a la vida cotidiana llegó en 1883, cuando el secretario del pueblo Seth Clock le pidió diseñar un sello para el Pueblo de Islip. El material del Historiador del Pueblo explica que el sello no era simbolismo abstracto sino un jeroglífico visual (rebus), que mostraba a Islip como un “eye” (ojo) y un “slip” (esqueje de planta), en recuerdo del pueblo inglés vinculado a la familia Nicoll y de la historia poco común del origen del pueblo."
    ],
    whyMatters: "Thompson diseñó el Sello del Pueblo, uno de los símbolos más visibles de la identidad cívica de Islip.",
    connectionToday: "Cada residente que ve el Sello del Pueblo sigue viendo la interpretación que Abraham Gardiner Thompson hizo de la historia de Islip.",
    cardText: "Abraham Gardiner Thompson diseñó el Sello del Pueblo en 1883. Su jeroglífico visual con un “eye” (ojo) y un “slip” (esqueje de planta) todavía da forma a la identidad visual oficial de Islip hoy.",
  },
  "samuel-sitko": {
    role: "Sobreviviente del Holocausto, Central Islip",
    bio: [
      "El folleto de Mollie Sebor sobre la comunidad judía del Pueblo de Islip describe Adasse Farm, en Central Islip, como un refugio para sobrevivientes del Holocausto después de la Segunda Guerra Mundial. Uno de los sobrevivientes nombrados fue Samuel Sitko, que llegó a Central Islip a los 16 años después del asesinato de su familia en Auschwitz-Birkenau. El folleto señala que se sabe que al menos otros tres sobrevivientes encontraron refugio en la granja lechera."
    ],
    whyMatters: "La historia de Sitko conecta a Central Islip con la historia mundial, el reasentamiento de refugiados y la vida de la comunidad judía después de la Segunda Guerra Mundial.",
    connectionToday: "Su historia refuerza el tema del proyecto, “muchas raíces, un pueblo”, al mostrar a Islip como un lugar de refugio y de reconstrucción.",
    cardText: "Samuel Sitko, sobreviviente del Holocausto, encontró refugio en Central Islip después de la Segunda Guerra Mundial. Su historia conecta la historia comunitaria local de Islip con historias mundiales de persecución, supervivencia y nuevos comienzos.",
  },
  "ruby-and-doris-hodus": {
    role: "Fundadores del Brentwood Jewish Center",
    bio: [
      "El 29 de agosto de 1958, unas 30 personas se reunieron en la casa de Ruby y Doris Hodus para hablar de crear un santuario judío en Brentwood. El 1 de septiembre, Brentwood Jewish Center se convirtió en el nombre elegido para una congregación conservadora destinada a servir a la comunidad."
    ],
    whyMatters: "Ruby y Doris Hodus representan el trabajo a nivel de hogar detrás de las instituciones religiosas y cívicas.",
    connectionToday: "Su historia muestra cómo las comunidades se construyen no solo con funcionarios, sino con vecinos que abren sus casas, organizan reuniones y crean lugares de pertenencia.",
    cardText: "Ruby y Doris Hodus recibieron en su casa la reunión de 1958 que ayudó a dar origen al Brentwood Jewish Center, un recordatorio de que las instituciones comunitarias muchas veces comienzan en hogares privados.",
  },
  "tobak-and-kaufman": {
    role: "Fundadores del B'nai Israel Reform Temple",
    bio: [
      "El folleto de Mollie Sebor dice que el B'nai Israel Reform Temple comenzó cuando la hija de Harvey Tobak pidió ir a la iglesia como su amiga de la casa de al lado, lo que creó la necesidad de un templo en la zona de East Islip y Sayville. Una reunión de cinco familias tuvo lugar en la casa de Irv Kaufman, y para julio de 1964 el B'nai Israel Reform Temple quedó fundado."
    ],
    whyMatters: "Tobak y Kaufman muestran cómo la vida familiar, los hijos y los lazos de vecindario podían dar origen a nuevas instituciones religiosas.",
    connectionToday: "Su historia conecta una pregunta cotidiana de pertenencia, “¿dónde encaja mi hijo?”, con la creación de instituciones que todavía dan forma a la vida comunitaria.",
    cardText: "Harvey Tobak e Irv Kaufman están ligados a la fundación del B'nai Israel Reform Temple, una historia de cómo la pregunta de una niña y una reunión familiar ayudaron a crear una institución comunitaria duradera.",
  },
};
