/* Estilo "Tarjeta dividida": panel verde azulado + datos. Datos: ver templates/README.md */
GmailSign.register({
  id: "tarjeta",
  uses: ["nombre", "cargo", "frase", "tags", "telefono", "correo", "linkedin", "ubicacion", "whatsapp"],
  photo: true,
  assets: [],
  render: function (p, h) {
    var SANS = "Verdana, Geneva, sans-serif";

    function crow(label, inner) {
      return '<tr><td valign="top" style="padding: 3px 14px 3px 0; font-family: ' + SANS + '; font-size: 9px; font-weight: bold; letter-spacing: 1.2px; color: #b7791f; text-transform: uppercase">' + label + '</td>' +
        '<td valign="top" style="padding: 3px 0; font-family: ' + SANS + '; font-size: 12px; color: #1f2937">' + inner + '</td></tr>';
    }
    var rows = "";
    if (p.telefono) rows += crow("Tel", '<a href="tel:' + p.telHref + '" style="color: #1f2937; text-decoration: none">' + p.telefono + '</a>');
    if (p.correo) rows += crow("Mail", '<a href="mailto:' + p.correo + '" style="color: #1f2937; text-decoration: none">' + p.correo + '</a>');
    if (p.linkedin) rows += crow("In", '<a href="' + p.linkedin + '" style="color: #0f3d3e; text-decoration: none; font-weight: bold">' + p.linkedinTexto + '</a>');

    var wa = p.whatsapp
      ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px"><tr>' +
        '<td bgcolor="#f4b942" style="background: #f4b942; border-radius: 6px">' +
        '<a href="' + p.whatsapp + '" style="display: inline-block; padding: 8px 18px; font-family: ' + SANS + '; font-size: 11px; font-weight: bold; color: #0f3d3e; text-decoration: none; letter-spacing: 0.4px">' + p.waTexto + ' &nearr;</a>' +
        '</td></tr></table>'
      : '';

    return '<table cellpadding="0" cellspacing="0" border="0" width="540" style="width: 540px; max-width: 100%; background: #ffffff; border: 1px solid #d9dee5; border-radius: 12px; border-collapse: separate">' +
      '<tr>' +
        '<td width="170" valign="top" align="center" bgcolor="#0f3d3e" style="width: 170px; background: #0f3d3e; border-radius: 11px 0 0 11px; padding: 26px 16px">' +
          '<table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td>' + h.photo(92, "border-radius: 50%; border: 3px solid #f4b942") + '</td></tr></table>' +
          (p.cargo ? '<div style="font-family: ' + SANS + '; font-size: 10px; font-weight: bold; letter-spacing: 1.6px; color: #f4b942; text-transform: uppercase; text-align: center; margin-top: 14px; line-height: 1.5">' + p.cargo + '</div>' : '') +
          (p.ubicacion ? '<div style="font-family: ' + SANS + '; font-size: 11px; color: #b6d4d2; text-align: center; margin-top: 8px">' + p.ubicacion + '</div>' : '') +
        '</td>' +
        '<td valign="top" style="padding: 24px 24px 22px 24px">' +
          '<div style="font-family: ' + SANS + '; font-size: 22px; font-weight: bold; color: #0f3d3e; line-height: 1.2">' + p.nombre + '</div>' +
          (p.frase ? '<div style="font-family: ' + SANS + '; font-size: 12px; font-style: italic; color: #6b7280; margin-top: 5px">' + p.frase + '</div>' : '') +
          (p.tags.length ? '<div style="font-family: ' + SANS + '; font-size: 11px; color: #0f766e; margin-top: 8px">' + p.tags.join(" &nbsp;&middot;&nbsp; ") + '</div>' : '') +
          (rows ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px">' + rows + '</table>' : '') +
          wa +
        '</td>' +
      '</tr></table>';
  }
});
