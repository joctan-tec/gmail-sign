/* Estilo "Ventana retro": escritorio de los 90. Datos: ver templates/README.md */
GmailSign.register({
  id: "retro",
  uses: ["nombre", "cargo", "frase", "telefono", "correo", "linkedin", "ubicacion", "zona", "estado", "whatsapp"],
  photo: true,
  assets: [],
  render: function (p, h) {
    var MONO = "&quot;Courier New&quot;, Courier, monospace";

    function line(label, inner) {
      return '<tr><td valign="top" style="padding: 1px 10px 1px 0; font-family: ' + MONO + '; font-size: 11px; font-weight: bold; color: #7a5c00">' + label + '&gt;</td>' +
        '<td valign="top" style="padding: 1px 0; font-family: ' + MONO + '; font-size: 12px; color: #000000">' + inner + '</td></tr>';
    }
    var rows = "";
    if (p.telefono) rows += line("TEL", '<a href="tel:' + p.telHref + '" style="color: #000000; text-decoration: none">' + p.telefono + '</a>');
    if (p.correo) rows += line("MAIL", '<a href="mailto:' + p.correo + '" style="color: #000000; text-decoration: none">' + p.correo + '</a>');
    if (p.linkedin) rows += line("WEB", '<a href="' + p.linkedin + '" style="color: #0000cc; text-decoration: underline">' + p.linkedinTexto + '</a>');

    var wa = p.whatsapp
      ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px"><tr>' +
        '<td bgcolor="#c0c0c0" style="background: #c0c0c0; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #000000; border-bottom: 2px solid #000000">' +
        '<a href="' + p.whatsapp + '" style="display: inline-block; padding: 5px 14px; font-family: ' + MONO + '; font-size: 11px; font-weight: bold; color: #000000; text-decoration: none">' + p.waTexto + '</a>' +
        '</td></tr></table>'
      : '';

    var status = [];
    if (p.estado) status.push('<span style="color: #1a8f1a">&#9679;</span> ' + p.estado);
    if (p.ubicacion) status.push(p.ubicacion);
    if (p.zona) status.push(p.zona);
    var statusBar = status.length
      ? '<tr><td bgcolor="#e6dfc8" style="background: #e6dfc8; border-top: 2px solid #000000; padding: 6px 14px; font-family: ' + MONO + '; font-size: 10px; color: #000000">' + status.join("&nbsp;&nbsp;|&nbsp;&nbsp;") + '</td></tr>'
      : '';

    return '<table cellpadding="0" cellspacing="0" border="0" style="max-width: 100%"><tr>' +
      '<td bgcolor="#000000" style="background: #000000; padding: 0 6px 6px 0">' +
      '<table cellpadding="0" cellspacing="0" border="0" width="500" bgcolor="#fff8dc" style="width: 500px; max-width: 100%; background: #fff8dc; border: 2px solid #000000; border-collapse: separate">' +
        '<tr><td bgcolor="#000000" style="background: #000000; padding: 5px 10px; font-family: ' + MONO + '; font-size: 11px; font-weight: bold; color: #fff8dc; letter-spacing: 1.5px; text-transform: uppercase">&#9632;&nbsp;&nbsp;' + p.nombre + '</td></tr>' +
        '<tr><td style="padding: 16px 16px 16px 16px">' +
          '<table cellpadding="0" cellspacing="0" border="0"><tr>' +
            '<td valign="top" style="padding-right: 16px">' + h.photo(76, "border: 2px solid #000000") + '</td>' +
            '<td valign="top">' +
              (p.cargo ? '<div style="font-family: ' + MONO + '; font-size: 13px; font-weight: bold; color: #000000; line-height: 1.3">' + p.cargo + '</div>' : '') +
              (p.frase ? '<div style="font-family: ' + MONO + '; font-size: 11px; color: #555555; margin: 4px 0 8px 0">&quot;' + p.frase + '&quot;</div>' : '<div style="height: 6px; line-height: 6px; font-size: 1px">&nbsp;</div>') +
              (rows ? '<table cellpadding="0" cellspacing="0" border="0">' + rows + '</table>' : '') +
            '</td></tr></table>' +
          wa +
        '</td></tr>' +
        statusBar +
      '</table></td></tr></table>';
  }
});
