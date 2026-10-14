/* Estilo "Boarding pass": pase de abordar con código de barras generado. Datos: ver templates/README.md */
GmailSign.register({
  id: "ticket",
  uses: ["nombre", "cargo", "frase", "telefono", "correo", "linkedin", "ubicacion", "zona", "estado", "whatsapp"],
  photo: true,
  assets: [],
  render: function (p, h) {
    var MONO = "&quot;Courier New&quot;, Courier, monospace";
    var SANS = "Verdana, Geneva, sans-serif";
    var NAVY = "#1b2a49";

    function field(label, val, size, last) {
      return '<td valign="top" style="padding: 0 ' + (last ? '0' : '20') + 'px 12px 0">' +
        '<div style="font-family: ' + MONO + '; font-size: 9px; letter-spacing: 1.5px; color: #7b8794; text-transform: uppercase">' + label + '</div>' +
        '<div style="font-family: ' + SANS + '; font-size: ' + size + 'px; font-weight: bold; color: ' + NAVY + '; line-height: 1.3">' + val + '</div></td>';
    }

    var mid = [];
    if (p.cargo) mid.push(["Rol", p.cargo]);
    if (p.ubicacion) mid.push(["Base", p.ubicacion]);
    if (p.zona) mid.push(["Zona", p.zona]);
    var midRow = mid.length
      ? '<tr><td><table cellpadding="0" cellspacing="0" border="0"><tr>' +
        mid.map(function (m, i) { return field(m[0], m[1], 13, i === mid.length - 1); }).join("") +
        '</tr></table></td></tr>'
      : '';

    var contact = [];
    if (p.telefono) contact.push('<a href="tel:' + p.telHref + '" style="color: ' + NAVY + '; text-decoration: none">' + p.telefono + '</a>');
    if (p.correo) contact.push('<a href="mailto:' + p.correo + '" style="color: ' + NAVY + '; text-decoration: none">' + p.correo + '</a>');
    if (p.linkedin) contact.push('<a href="' + p.linkedin + '" style="color: #1d4ed8; text-decoration: none">' + p.linkedinTexto + '</a>');
    var contactRow = contact.length
      ? '<tr><td><table cellpadding="0" cellspacing="0" border="0"><tr>' + field("Contacto", contact.join("<br>"), 12, true) + '</tr></table></td></tr>'
      : '';

    // Código de barras decorativo: se genera a partir de los datos, así que cambia con cada persona.
    var x = h.hash(p.nombre + "|" + p.correo + "|" + p.telefono) || 7;
    var bars = "";
    for (var i = 0; i < 30; i++) {
      x = (x * 1664525 + 1013904223) % 4294967296;
      var w = 1 + ((x >>> 16) % 3);
      // Las barras claras son celdas vacías: así el código HTML pesa menos.
      bars += '<td width="' + w + '" height="34"' + (i % 2 === 0 ? ' bgcolor="' + NAVY + '"' : '') + ' style="font-size: 1px; line-height: 1px">&nbsp;</td>';
    }

    var wa = p.whatsapp
      ? '<table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 12px auto 0 auto"><tr>' +
        '<td bgcolor="' + NAVY + '" style="background: ' + NAVY + '; border-radius: 4px">' +
        '<a href="' + p.whatsapp + '" style="display: inline-block; padding: 6px 12px; font-family: ' + MONO + '; font-size: 10px; font-weight: bold; color: #ffffff; text-decoration: none; letter-spacing: 0.5px">' + p.waTexto + '</a>' +
        '</td></tr></table>'
      : '';

    return '<table cellpadding="0" cellspacing="0" border="0" width="560" style="width: 560px; max-width: 100%; background: #ffffff; border: 1px solid #cbd2dc; border-radius: 10px; border-collapse: separate">' +
      '<tr><td colspan="2" bgcolor="' + NAVY + '" style="background: ' + NAVY + '; border-radius: 9px 9px 0 0; padding: 8px 18px">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>' +
          '<td style="font-family: ' + MONO + '; font-size: 11px; font-weight: bold; letter-spacing: 3px; color: #ffffff">BOARDING PASS</td>' +
          '<td align="right" style="font-family: ' + MONO + '; font-size: 10px; letter-spacing: 1px; color: #9fb3d1">' + (p.estado ? '<span style="color: #4ade80">&#9679;</span> ' + p.estado : '') + '</td>' +
        '</tr></table></td></tr>' +
      '<tr>' +
        '<td valign="top" style="padding: 18px 18px 8px 18px">' +
          '<table cellpadding="0" cellspacing="0" border="0">' +
            '<tr><td><table cellpadding="0" cellspacing="0" border="0"><tr>' + field("Pasajero", p.nombre, 20, true) + '</tr></table></td></tr>' +
            midRow + contactRow +
            (p.frase ? '<tr><td style="padding-top: 2px; font-family: ' + SANS + '; font-size: 11px; font-style: italic; color: #6b7280">' + p.frase + '</td></tr>' : '') +
          '</table>' +
        '</td>' +
        '<td width="150" valign="top" align="center" style="width: 150px; border-left: 2px dashed #b8c0cc; padding: 16px">' +
          '<table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td>' + h.photo(72, "border-radius: 8px") + '</td></tr></table>' +
          '<table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 14px auto 4px auto"><tr>' + bars + '</tr></table>' +
          (p.telefono ? '<div style="font-family: ' + MONO + '; font-size: 9px; letter-spacing: 1px; color: #7b8794; text-align: center">' + p.telefono + '</div>' : '') +
          wa +
        '</td>' +
      '</tr></table>';
  }
});
