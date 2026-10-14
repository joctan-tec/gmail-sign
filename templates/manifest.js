/*
 * Lista de estilos disponibles. La página lee este archivo para mostrar los
 * botones de selección; el archivo de cada estilo (`file`) se carga solo
 * cuando la persona lo elige.
 *
 * Para agregar un estilo: crea templates/<id>.js (ver templates/README.md)
 * y añade una línea aquí.
 */
GmailSign.manifest = [
  { id: "terminal",   name: "Terminal",         file: "templates/terminal.js",   description: "Consola oscura estilo GitHub, con prompt, frase y estado en línea." },
  { id: "editorial",  name: "Editorial",        file: "templates/editorial.js",  description: "Tarjeta clara con barra de tres colores, etiquetas y botón de WhatsApp en píldora." },
  { id: "minimal",    name: "Minimalista",      file: "templates/minimal.js",    description: "Solo tipografía: nombre en serif, una línea de acento y enlaces subrayados. Sin imágenes." },
  { id: "tarjeta",    name: "Tarjeta dividida", file: "templates/tarjeta.js",    description: "Panel verde azulado con la foto a la izquierda y los datos de contacto a la derecha." },
  { id: "retro",      name: "Ventana retro",    file: "templates/retro.js",      description: "Ventana de escritorio de los años 90, con barra de título, botón biselado y barra de estado." },
  { id: "brutalist",  name: "Neo-brutalista",   file: "templates/brutalist.js",  description: "Amarillo intenso, bordes negros gruesos, sombra dura y botón rosa. Sin íconos." },
  { id: "ticket",     name: "Boarding pass",    file: "templates/ticket.js",     description: "Pase de abordar con campos etiquetados, talón perforado y un código de barras generado a partir de tus datos." }
];
