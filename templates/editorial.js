/* Estilo "Editorial": tarjeta clara con barra de tres colores. Datos: ver templates/README.md */
GmailSign.register({
  id: "editorial",
  uses: ["nombre", "cargo", "tags", "telefono", "correo", "linkedin", "ubicacion", "whatsapp"],
  photo: true,
  assets: ["e-phone.png", "e-mail.png", "e-linkedin.png", "e-pin.png", "wa-white.png"],
  render: function (p, h) {
    var SANS = "Verdana, Geneva, sans-serif";
    var CHIPS = [
      { bg: "#eff6ff", bd: "#bfdbfe", c: "#1d4ed8" },
      { bg: "#f5f3ff", bd: "#ddd6fe", c: "#6d28d9" },
      { bg: "#ecfeff", bd: "#a5f3fc", c: "#0e7490" }
    ];

    var chips = p.tags.map(function (t, i) {
      var k = CHIPS[i % 3];
      return (i ? '<td width="6">&nbsp;</td>' : '') +
        '<td style="background: ' + k.bg + '; border: 1px solid ' + k.bd + '; border-radius: 12px; padding: 2px 10px; font-family: ' + SANS + '; font-size: 10px; color: ' + k.c + '">' + t + '</td>';
    }).join("");

    function row(file, alt, inner) {
      return '<tr><td valign="middle" style="padding-right: 10px">' + h.img(file, alt, 16, 16) + '</td><td>' + inner + '</td></tr>';
    }
    var rows = "";
    if (p.telefono) rows += row("e-phone.png", "Phone", '<a href="tel:' + p.telHref + '" style="color: #374151; text-decoration: none">' + p.telefono + '</a>');
    if (p.correo) rows += row("e-mail.png", "Email", '<a href="mailto:' + p.correo + '" style="color: #374151; text-decoration: none">' + p.correo + '</a>');
    if (p.linkedin) rows += row("e-linkedin.png", "LinkedIn", '<a href="' + p.linkedin + '" style="color: #374151; text-decoration: none">' + p.linkedinTexto + '</a>');
    if (p.ubicacion) rows += row("e-pin.png", "Location", p.ubicacion);

    var wa = p.whatsapp
      ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px"><tr>' +
        '<td bgcolor="#128c7e" style="background: #128c7e; border-radius: 20px">' +
        '<a href="' + p.whatsapp + '" style="display: inline-block; padding: 8px 20px; font-family: ' + SANS + '; font-size: 11px; font-weight: bold; color: #ffffff; text-decoration: none; letter-spacing: 0.4px">' +
        '<img src="' + h.asset("wa-white.png") + '" width="14" height="14" alt="" style="vertical-align: middle; width: 14px; height: 14px; border: 0; margin-right: 7px" />' +
        p.waTexto + '</a></td></tr></table>'
      : '';

    return '<table cellpadding="0" cellspacing="0" border="0" width="520" style="width: 520px; max-width: 100%; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; border-collapse: separate">' +
      '<tr><td style="border-radius: 10px 10px 0 0; padding: 0"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>' +
        '<td width="40%" height="5" bgcolor="#2563eb" style="height: 5px; line-height: 5px; font-size: 1px; background: #2563eb; border-radius: 10px 0 0 0">&nbsp;</td>' +
        '<td width="35%" height="5" bgcolor="#7c3aed" style="height: 5px; line-height: 5px; font-size: 1px; background: #7c3aed">&nbsp;</td>' +
        '<td width="25%" height="5" bgcolor="#06b6d4" style="height: 5px; line-height: 5px; font-size: 1px; background: #06b6d4; border-radius: 0 10px 0 0">&nbsp;</td>' +
      '</tr></table></td></tr>' +
      '<tr><td style="padding: 22px 22px 18px 22px">' +
        '<table cellpadding="0" cellspacing="0" border="0"><tr>' +
          '<td valign="top" style="padding-right: 20px">' + h.photo(92, "border-radius: 50%; border: 3px solid #ede9fe") + '</td>' +
          '<td valign="top">' +
            '<div style="font-family: ' + SANS + '; font-size: 21px; font-weight: bold; color: #1e1b4b; letter-spacing: 0.2px; line-height: 1.2">' + p.nombre + '</div>' +
            (p.cargo ? '<div style="font-family: ' + SANS + '; font-size: 10px; font-weight: bold; color: #7c3aed; letter-spacing: 2.2px; text-transform: uppercase; margin-top: 6px">' + p.cargo + '</div>' : '') +
            (chips ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px"><tr>' + chips + '</tr></table>' : '') +
          '</td></tr></table>' +
        (rows
          ? '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 16px 0 14px 0"><tr>' +
            '<td width="40%" height="1" style="height: 1px; line-height: 1px; font-size: 1px; background: #2563eb">&nbsp;</td>' +
            '<td width="60%" height="1" style="height: 1px; line-height: 1px; font-size: 1px; background: #e5e7eb">&nbsp;</td></tr></table>' +
            '<table cellpadding="0" cellspacing="0" border="0" style="font-family: ' + SANS + '; font-size: 12px; line-height: 1.9; color: #4b5563">' + rows + '</table>'
          : '') +
        wa +
      '</td></tr></table>';
  }
});
