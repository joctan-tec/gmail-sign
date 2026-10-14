/* Estilo "Neo-brutalista": amarillo, bordes negros, sombra dura. Datos: ver templates/README.md */
GmailSign.register({
  id: "brutalist",
  uses: ["nombre", "cargo", "frase", "tags", "telefono", "correo", "linkedin", "ubicacion", "whatsapp"],
  photo: true,
  assets: [],
  render: function (p, h) {
    var HEAVY = "'Arial Black', Impact, Arial, sans-serif";
    var BODY = "Arial, Helvetica, sans-serif";

    var tags = p.tags.map(function (t, i) {
      return (i ? '<td width="6">&nbsp;</td>' : '') +
        '<td bgcolor="#ffffff" style="background: #ffffff; border: 2px solid #000000; padding: 1px 8px; font-family: ' + BODY + '; font-size: 11px; font-weight: bold; color: #000000">' + t + '</td>';
    }).join("");

    function crow(inner) {
      return '<tr><td style="padding: 2px 0; font-family: ' + BODY + '; font-size: 13px; font-weight: bold; color: #000000">&rarr;&nbsp;' + inner + '</td></tr>';
    }
    var rows = "";
    if (p.telefono) rows += crow('<a href="tel:' + p.telHref + '" style="color: #000000; text-decoration: underline">' + p.telefono + '</a>');
    if (p.correo) rows += crow('<a href="mailto:' + p.correo + '" style="color: #000000; text-decoration: underline">' + p.correo + '</a>');
    if (p.linkedin) rows += crow('<a href="' + p.linkedin + '" style="color: #000000; text-decoration: underline">' + p.linkedinTexto + '</a>');
    if (p.ubicacion) rows += crow(p.ubicacion);

    var wa = p.whatsapp
      ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px"><tr>' +
        '<td bgcolor="#ff6ba6" style="background: #ff6ba6; border: 3px solid #000000">' +
        '<a href="' + p.whatsapp + '" style="display: inline-block; padding: 8px 16px; font-family: ' + HEAVY + '; font-size: 12px; color: #000000; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px">' + p.waTexto + ' &rarr;</a>' +
        '</td></tr></table>'
      : '';

    return '<table cellpadding="0" cellspacing="0" border="0" style="max-width: 100%"><tr>' +
      '<td bgcolor="#000000" style="background: #000000; padding: 0 7px 7px 0">' +
      '<table cellpadding="0" cellspacing="0" border="0" width="520" bgcolor="#ffe14d" style="width: 520px; max-width: 100%; background: #ffe14d; border: 3px solid #000000; border-collapse: separate">' +
        '<tr><td style="padding: 20px 20px 18px 20px">' +
          '<table cellpadding="0" cellspacing="0" border="0"><tr>' +
            '<td valign="top" style="padding-right: 18px">' + h.photo(88, "border: 3px solid #000000") + '</td>' +
            '<td valign="top">' +
              '<div style="font-family: ' + HEAVY + '; font-size: 23px; line-height: 1.05; color: #000000; text-transform: uppercase">' + p.nombre + '</div>' +
              (p.cargo ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 9px"><tr><td bgcolor="#000000" style="background: #000000; padding: 3px 9px; font-family: ' + BODY + '; font-size: 11px; font-weight: bold; color: #ffe14d; letter-spacing: 1px; text-transform: uppercase">' + p.cargo + '</td></tr></table>' : '') +
              (tags ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 9px"><tr>' + tags + '</tr></table>' : '') +
            '</td></tr></table>' +
          (rows ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px">' + rows + '</table>' : '') +
          wa +
        '</td></tr>' +
        (p.frase ? '<tr><td bgcolor="#000000" style="background: #000000; padding: 7px 20px; font-family: ' + BODY + '; font-size: 11px; font-weight: bold; color: #ffe14d; letter-spacing: 1.5px; text-transform: uppercase">' + p.frase + '</td></tr>' : '') +
      '</table></td></tr></table>';
  }
});
