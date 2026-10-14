/* Estilo "Minimalista": solo tipografía, sin imágenes. Datos: ver templates/README.md */
GmailSign.register({
  id: "minimal",
  uses: ["nombre", "cargo", "telefono", "correo", "linkedin", "ubicacion", "whatsapp"],
  photo: false,
  assets: [],
  render: function (p, h) {
    var SERIF = "Georgia, 'Times New Roman', serif";
    var SANS = "Verdana, Geneva, sans-serif";
    var link = "color: #111111; text-decoration: none; border-bottom: 1px solid #c4c4c4";
    var sep = ' <span style="color: #b5b5b5">&nbsp;/&nbsp;</span> ';

    var l1 = [], l2 = [];
    if (p.telefono) l1.push('<a href="tel:' + p.telHref + '" style="' + link + '">' + p.telefono + '</a>');
    if (p.correo) l1.push('<a href="mailto:' + p.correo + '" style="' + link + '">' + p.correo + '</a>');
    if (p.linkedin) l2.push('<a href="' + p.linkedin + '" style="' + link + '">' + p.linkedinTexto + '</a>');
    if (p.whatsapp) l2.push('<a href="' + p.whatsapp + '" style="' + link + '">' + p.waTexto + ' &rarr;</a>');

    function line(html, color) {
      return html ? '<tr><td style="padding: 0 0 5px 0; font-family: ' + SANS + '; font-size: 12px; line-height: 1.6; color: ' + color + '">' + html + '</td></tr>' : '';
    }

    return '<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; max-width: 100%">' +
      '<tr><td style="padding: 0 0 3px 0; font-family: ' + SERIF + '; font-size: 19px; font-weight: bold; color: #111111; line-height: 1.25">' + p.nombre + '</td></tr>' +
      (p.cargo ? '<tr><td style="padding: 0 0 10px 0; font-family: ' + SANS + '; font-size: 12px; color: #6b7280">' + p.cargo + '</td></tr>' : '') +
      '<tr><td style="padding: 0 0 10px 0"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
        '<td width="32" height="2" bgcolor="#111111" style="width: 32px; height: 2px; line-height: 2px; font-size: 1px; background: #111111">&nbsp;</td></tr></table></td></tr>' +
      line(l1.join(sep), "#374151") +
      line(l2.join(sep), "#374151") +
      line(p.ubicacion, "#6b7280") +
    '</table>';
  }
});
