// Spanish overlays for the essays. English (essays.ts) stays canonical. The
// EXCERPTS stay in English (quoted modern scholarship); what translates is the
// display title, the summary, and why-it-matters. The citation keeps the
// original English title, so the translated display title never breaks a
// bibliographic reference.

export interface EssayEsEntry {
  title: string;
  summary: string;
  whyItMatters: string | null;
}

export const essaysEs: Record<string, EssayEsEntry> = {
  "defiance-1775": {
    title: "Un tiempo de desafío e incertidumbre: el Precinto de Islip, 1775",
    summary: "Explica el significado local de los Artículos de Asociación del Precinto de Islip. Sitúa la reunión del 10 de mayo de 1775 después de Lexington y Concord y antes de la ocupación británica, y explica el riesgo político de firmar.",
    whyItMatters: "Este ensayo se complementa directamente con la fuente primaria de los Artículos de Asociación. El documento da las palabras; el ensayo explica el peligro, el momento y el hecho de que pronto sería imposible mantenerse neutral.",
  },
  "response-1775": {
    title: "¿Cómo respondieron los habitantes de Islip en 1775?",
    summary: "Presenta los Artículos de Asociación como un gran paso de organización y explica cómo se les pidió a los habitantes de Islip tomar partido antes de la ocupación británica, y quiénes quedaron excluidos de firmar.",
    whyItMatters: "Muestra que la Revolución dividió a las comunidades antes de convertirse en una ocupación militar local, y conecta la participación cívica con la exclusión: muchas personas vivían en Islip pero no podían firmar legalmente.",
  },
  "thompson-tightrope": {
    title: "Isaac Thompson: un hombre en la cuerda floja",
    summary: "El ensayo central del proyecto. Sostiene que Isaac Thompson no debe entenderse solo como el anfitrión de George Washington, sino como una figura activa cuya familia, cargos, propiedad y decisiones lo pusieron en peligro durante la ocupación.",
    whyItMatters: "Ofrece la base interpretativa más sólida para poner a Isaac Thompson y la Mansión Sagtikos en el centro de la exhibición: apoyar la causa patriota en Islip podía amenazar la familia, la propiedad, el cargo y la seguridad personal.",
  },
  "250th-story": {
    title: "Una historia del 250.º aniversario: las paredes oyen",
    summary: "Presenta la Mansión Sagtikos como una forma de contar la experiencia de la familia Thompson durante la ocupación, con dos ideas interpretativas: “las paredes oyen” y la imagen de Isaac Thompson caminando en la cuerda floja durante los seis años de ocupación.",
    whyItMatters: "Muestra que Sagtikos no es solo una casa para visitar, sino un lugar donde se cruzan la política revolucionaria local, el peligro, la vida familiar y la memoria.",
  },
  "sagtikos-before-thompson": {
    title: "La Mansión Sagtikos antes de la familia Thompson",
    summary: "Explica la historia de la Mansión Sagtikos antes de Isaac Thompson, conectando a Stephanus Van Cortlandt, a Timothy y Ananias Carll y a Jonathan Thompson con la historia temprana de la propiedad y del gobierno del pueblo.",
    whyItMatters: "Permite mostrar que la Mansión Sagtikos no fue solo un sitio de la Guerra de Independencia, sino parte de una historia más larga de tierras coloniales y de gobierno del pueblo.",
  },
  "sagtikos-enslaved-labor": {
    title: "Trabajo esclavizado y de sirvientes por contrato en la Mansión Sagtikos",
    summary: "Conecta la Mansión Sagtikos con la esclavitud y el trabajo de sirvientes por contrato. El pasaje llega a través del ensayo de Munkenbeck, que cita el trabajo de Christopher Verga sobre la esclavitud en el condado de Suffolk. El artículo original de Verga debe verificarse directamente.",
    whyItMatters: "Es esencial para conectar el pasado con el presente. Evita que Sagtikos se presente solo como un sitio patriótico o presidencial, y muestra que ese mismo lugar fue formado por el trabajo de personas esclavizadas y de sirvientes por contrato.",
  },
  "life-under-occupation": {
    title: "¿Cómo era la vida en Islip durante la ocupación?",
    summary: "Explica por qué la ocupación fue difícil para quienes se quedaron en Long Island: vivían bajo la autoridad de la Corona, las fuerzas británicas desconfiaban de ellos y quedaban expuestos a incursiones desde el otro lado del estrecho de Long Island.",
    whyItMatters: "Un ensayo central para la historia de la ocupación. Los habitantes de Islip quedaron atrapados entre las fuerzas de ocupación, los asaltantes patriotas, la sospecha de los lealistas, las incursiones en botes balleneros desde Connecticut, la confiscación de propiedades y el peligro local.",
  },
  "british-soldier": {
    title: "El soldado británico y la ocupación de Islip",
    summary: "Da ejemplos concretos de las presiones de la ocupación: soldados alojados en las casas, confiscaciones, granjas agotadas para abastecer al ejército y prisioneros retenidos sin juicio. Presenta la ocupación como algo complicado, no como una historia simple.",
    whyItMatters: "Una de las secciones más fuertes para explicar la ocupación como experiencia vivida, con detalles que los visitantes pueden imaginar: casas, cercas, ganado, comida, bosques para leña, prisiones y peligro.",
  },
  "magistrate": {
    title: "¿Qué era un magistrado bajo el derecho colonial británico?",
    summary: "Explica por qué importaba el papel de Isaac Thompson como magistrado. Los magistrados se ocupaban de asuntos legales locales, órdenes judiciales y el orden público, lo que hizo más complicada la posición de Thompson durante la Revolución.",
    whyItMatters: "Ayuda a los visitantes a entender que la vida de Thompson era políticamente peligrosa porque formaba parte de la justicia local, los impuestos y la autoridad de la Corona de esa época, mientras al mismo tiempo se conectaba con la resistencia patriota.",
  },
  "singing-defiance": {
    title: "Cantar y desafiar a los ocupantes británicos",
    summary: "Explica cómo la música podía ser obediencia y resistencia al mismo tiempo. Bajo la ocupación, a los habitantes se les podía exigir cantar “God Save the King” (Dios salve al Rey), pero las melodías flexibles del siglo XVIII permitían a los colonos cantar otras letras con tonadas conocidas.",
    whyItMatters: "Muestra que la resistencia no fue solo militar. Podía ser cultural, musical, religiosa y sutil.",
  },
  "hymn-rebellion": {
    title: "Un himno que escondía rebelión: Come, Thou Almighty King",
    summary: "Explica cómo “Come, Thou Almighty King” (Ven, Rey todopoderoso) podía funcionar como resistencia oculta, porque podía cantarse con la misma melodía que “God Save the King”. Una historia cuenta que una congregación de Long Island hizo exactamente eso. Es mejor presentar esa historia específica como tradición mientras no se verifique más.",
    whyItMatters: "Una de las historias humanas más memorables del proyecto: bajo la ocupación, la gente podía obedecer por fuera mientras resistía por dentro, conectando religión, lengua, música y política.",
  },
  "good-old-colony-day": {
    title: "En los viejos tiempos de la colonia: cuando estábamos bajo el Rey",
    summary: "Muestra el contraste entre el gobierno local de rutina y la crisis que estaba por llegar. En la reunión anual de Islip de abril de 1775, los habitantes todavía atendían asuntos de rutina; en cuestión de meses, la guerra y la ocupación transformarían la vida diaria.",
    whyItMatters: "Uno de los mejores ensayos para conectar el pasado con el presente: muestra cómo la gente común puede estar viviendo una vida normal justo antes de que la historia la alcance.",
  },
  "flags-part-one": {
    title: "Las banderas coloniales del Precinto de Islip, primera parte",
    summary: "Usa las banderas para explicar el cambio político antes de la Revolución, conectando la autoridad colonial holandesa e inglesa, la familia Nicoll, la condición de Islip como “terreno intermedio” y la Red Ensign (la enseña roja) que se izaba en tiempos coloniales.",
    whyItMatters: "Convierte la historia colonial abstracta en historia visual, y sirve de apoyo para un recurso ilustrado de banderas con espacios de imagen para la Union Flag, la cruz de San Jorge y la Red Ensign.",
  },
  "flags-part-two": {
    title: "Las banderas coloniales del Precinto de Islip, segunda parte: la Revolución",
    summary: "Sigue la historia de las banderas hasta la Revolución, desde la Red Ensign británica hasta la bandera de la Libertad de Huntington y de vuelta a la Red Ensign durante la ocupación. Tiene el cuidado de decir que los milicianos de Islip “probablemente” marcharon bajo la bandera de Huntington.",
    whyItMatters: "Un candidato fuerte para el lado visual del sitio. Conecta el cambio político con algo que los visitantes pueden ver, y mantiene la debida cautela en la afirmación sobre la bandera.",
  },
  "benajah-strong": {
    title: "El capitán Benajah Strong: “For Washington and Liberty!” (¡Por Washington y la libertad!)",
    summary: "Presenta a Benajah Strong, funcionario de Islip y patriota conectado con la milicia, el gobierno local, la familia Thompson y la experiencia de los refugiados durante la Revolución.",
    whyItMatters: "Benajah Strong conecta la milicia patriota de Islip, la experiencia de los refugiados, el gobierno local y las redes familiares, y amplía la página de Personas más allá de Isaac Thompson y Washington.",
  },
  "islip-militia-anniversary": {
    title: "La milicia de Islip: 250.º aniversario, 1776–2026",
    summary: "Un relato breve de la Compañía de Milicia de Islip que conecta el censo de 1775, a Isaac Thompson, a Benajah Strong y la organización militar local, con cifras concretas.",
    whyItMatters: "Conecta la población, el servicio militar, a Isaac Thompson y a Benajah Strong con el esfuerzo local por organizar a Islip por separado de los pueblos vecinos.",
  },
  "patriots-honored": {
    title: "Patriotas de Islip homenajeados este verano",
    summary: "Conecta a la generación de la Revolución con la conmemoración de hoy, describiendo la investigación para identificar y señalar los lugares de entierro de los patriotas conocidos de Islip.",
    whyItMatters: "Muestra que la Revolución no está solo en documentos viejos. Todavía hoy se investiga, se señala y se recuerda en los cementerios de Islip.",
  },
  "manor-st-george": {
    title: "La Mansión St. George y el Fuerte St. George",
    summary: "Sitúa la historia de Islip dentro del panorama más amplio de Long Island. La Mansión St. George, en Mastic, fue atacada durante la Revolución y se conecta con la forma más temprana del Corazón Púrpura a través del sargento Elijah Churchill.",
    whyItMatters: "Útil para construir un mapa revolucionario más amplio de Long Island alrededor de Islip; refuerza el contexto regional sin reemplazar la historia de Islip.",
  },
  "town-kept-meeting": {
    title: "Un pueblo que siguió reuniéndose: el gobierno local de Islip a través de la guerra",
    summary: "El primer libro de actas de Islip registra la reunión anual del pueblo repitiéndose abril tras abril, desde la década de 1720, pasando por la Revolución y más allá. Durante los seis años de ocupación británica, el pueblo siguió eligiendo a sus funcionarios, llevando sus cuentas y cuidando a sus pobres. Las páginas de la guerra se ven casi iguales a las de la paz, y esa continuidad silenciosa es en sí misma la historia: el mismo Isaac Thompson que firmó los Artículos de Asociación patriotas fue reelegido supervisor en reuniones fechadas, como fórmula legal, por el reinado del rey Jorge III, hasta que el encabezado de abril de 1784 por fin contó los años desde la independencia de Estados Unidos.",
    whyItMatters: "La ocupación no disolvió el autogobierno de Islip; lo obligó a llevar una extraña doble vida, con funcionarios de simpatías patriotas gobernando bajo las fórmulas legales de la Corona. El libro de actas convierte la idea abstracta de una “transición a la independencia” en algo que puedes ver suceder en la página.",
  },
  "minutes-daily-life": {
    title: "Lo que las actas del pueblo revelan sobre la vida diaria",
    summary: "La mayor parte del libro de actas no trata de hechos famosos. Trata de cerdos que había que enyugar y anillar, de verracos que no podían andar sueltos en primavera, de cercas que había que revisar, de marcas de oreja registradas para que los vecinos supieran de quién era cada res, de caminos trazados, de cuentas saldadas hasta el último penique y de vecinos a quienes se les pagaba por hospedar y cuidar a los pobres del pueblo. Leídas en conjunto, estas entradas recuperan la textura de la vida diaria en un pequeño pueblo de granjas y bahía a lo largo de más de un siglo.",
    whyItMatters: "La historia no es solo leyes y batallas. Estas páginas muestran lo que el gobierno significaba para la gente común: proteger los cultivos del ganado, mantener los caminos transitables, marcar las reses y cuidar a los vecinos. El libro incluso conserva una disculpa pública de 1737 por un “Scandalus Report” (un rumor difamatorio) levantado contra un vecino. Este es el mundo cotidiano que la Revolución iba a interrumpir.",
  },
  "conklin-1798-islip": {
    title: "La Descripción de 1798: Islip después de la Revolución",
    summary: "Nathaniel Conklin escribió para defender los límites de Islip, pero su carta de enero de 1798 se convirtió en un retrato de todo el pueblo: granjas y “necks” (franjas de tierra entre arroyos) separadas por cerca de media milla, casas mirando a la bahía a lo largo de la South Country Road, llanuras de pinos que cubrían cuatro quintas partes de la tierra, corsarios americanos recordados en Fire Island Inlet, maíz y ganado, cinco tabernas, cinco escuelas, dos molinos de grano, seis aserraderos y un solo médico que, según él, tenía muy poco que hacer en un pueblo tan saludable. Quince años después del fin de la ocupación, el Islip que describe es ordenado, productivo y todavía pequeño: unas 120 casas habitadas.",
    whyItMatters: "La descripción muestra la vida posterior de la Revolución en el detalle diario. La guerra aparece solo como recuerdo, tres corsarios recordados en la entrada de la bahía, mientras que el asunto real de la carta, defender los límites del pueblo bajo una ley estatal de 1788, muestra el nuevo marco estatal reemplazando en silencio al colonial.",
  },
  "who-lived-in-islip-1798": {
    title: "¿Quiénes vivían en Islip? Raza, condición y hogares en la Descripción de 1798",
    summary: "Una sola oración en la descripción de Conklin cambia la imagen del Islip temprano: de unas 120 casas habitadas, en veinticinco vivían “Indians, Mustees and free Negros” (indígenas, “Mustees” y negros libres). Eso es más o menos uno de cada cinco hogares. “Mustee” es un término de la época para personas de ascendencia mixta, comúnmente indígena americana y africana. Las actas del pueblo cuentan la misma historia en vidas individuales: en 1740, Joseph Nicolls, a quien el secretario registró como “Mallator”, es decir, mulato, acordó con el pueblo hospedar a un vecino pobre por dos chelines a la semana, y en 1787 el pueblo compró grano para una mujer a la que el secretario llamó “Indian hannah”. El Islip temprano nunca fue simplemente un pueblo de colonos blancos.",
    whyItMatters: "El registro muestra presencia, no vidas completas: estos hogares aparecen en una carta sobre límites y en cuentas de ayuda a los pobres, por lo general sin nombres completos. Decir con claridad que cerca de una quinta parte de los hogares del pueblo eran familias indígenas, de ascendencia mixta o negras libres corrige la narrativa más vieja y más simple, y los nombres que faltan marcan la próxima agenda de investigación.",
  },
  "bay-road-farm": {
    title: "Bahía, camino y granja: cómo la geografía formó al Islip temprano",
    summary: "La descripción de Conklin explica la forma del pueblo. Riachuelos y arroyos dividían la costa sur en “necks” (franjas de tierra de cultivo) de cerca de media milla de ancho; la South Country Road corría a más o menos una milla de la bahía, alineando las casas frente al agua; los prados de sal y de juncos alimentaban al ganado, que era la “main dependance” (el principal sustento) de los granjeros; y la bahía enviaba almejas, anguilas y peces sheepshead al mercado de Nueva York. Detrás de todo estaban los matorrales y las llanuras de pinos, cerca de cuatro quintas partes de la tierra del pueblo, que Conklin predijo que un día serían “very useful and valuable” (muy útiles y valiosas). Las actas del pueblo muestran esa misma geografía como política: desde 1765, Islip reguló quién podía pescar en su bahía, y las multas iban para los pobres.",
    whyItMatters: "La geografía explica por qué Islip se veía como se veía: por qué las casas se alineaban en un solo camino, por qué el ganado importaba más que el trigo, por qué el acceso a la bahía era ley del pueblo y por qué tanta parte del pueblo siguió cubierta de bosque por tanto tiempo. Conklin incluso predijo el valor futuro de las llanuras de pinos, la tierra que hoy llamamos los Pine Barrens.",
  },
  "more-than-facts": {
    title: "La historia es más que hechos y acontecimientos",
    summary: "Explica el método detrás del proyecto: la historia no es solo una lista de hechos o de personas famosas. Entender el Islip de la Revolución también significa vida diaria, miedo, música, noticias, comida, familia, trabajo y memoria.",
    whyItMatters: "Expone el método interpretativo de todo el proyecto y justifica la atención a la vida cotidiana, la música y el culto.",
  },
  "huntington-records": {
    title: "Por qué los registros de Huntington importan para Islip",
    summary: "Explica por qué el proyecto a veces usa los registros del vecino Huntington: las actas propias de Islip dicen poco sobre la ocupación, mientras que las de Huntington conservan más detalles sobre las órdenes y las presiones militares.",
    whyItMatters: "Excelente para las páginas de Investigación: el silencio en los registros tiene significado por sí mismo. La falta de entradas dramáticas de guerra en las actas de Islip puede reflejar el control y el peligro de la ocupación.",
  },
};
