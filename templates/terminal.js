/* Estilo "Terminal": consola oscura. Datos: ver templates/README.md */
GmailSign.register({
  id: "terminal",
  uses: ["nombre", "cargo", "frase", "prompt", "telefono", "correo", "linkedin", "ubicacion", "zona", "estado", "whatsapp"],
  photo: true,
  assets: ["t-phone.png", "t-mail.png", "t-linkedin.png", "t-pin.png", "wa-white.png"],
  render: function (p, h) {
    var MONO = "&quot;Courier New&quot;, Courier, monospace";
    var SANS = "Verdana, Geneva, sans-serif";

    function row(file, alt, inner) {
      return '<tr><td valign="middle" style="padding-right: 10px">' + h.img(file, alt, 16, 16) +
        '</td><td>' + inner + '</td></tr>';
    }
    var rows = "";
    if (p.telefono) rows += row("t-phone.png", "Phone", '<a href="tel:' + p.telHref + '" style="color: #c9d1d9; text-decoration: none">' + p.telefono + '</a>');
    if (p.correo) rows += row("t-mail.png", "Email", '<a href="mailto:' + p.correo + '" style="color: #c9d1d9; text-decoration: none">' + p.correo + '</a>');
    if (p.linkedin) rows += row("t-linkedin.png", "LinkedIn", '<a href="' + p.linkedin + '" style="color: #58a6ff; text-decoration: none">' + p.linkedinTexto + '</a>');

    var place = [p.ubicacion, p.zona].filter(Boolean).join(" &middot; ");
    if (p.estado) place += (place ? " &nbsp;&nbsp;" : "") + '<span style="color: #27c93f">&#9679;</span> ' + p.estado;
    var footer = place
      ? '<tr><td bgcolor="#161b22" style="background: #161b22; padding: 8px 14px; border-top: 1px solid #30363d; border-radius: 0 0 9px 9px; font-family: ' + MONO + '; font-size: 10px; color: #8b949e">' +
        '<table cellpadding="0" cellspacing="0" border="0"><tr>' +
        (p.ubicacion ? '<td valign="middle" style="padding-right: 6px">' + h.img("t-pin.png", "Location", 12, 12) + '</td>' : '') +
        '<td style="font-family: ' + MONO + '; font-size: 10px; color: #8b949e">' + place + '</td></tr></table></td></tr>'
      : '';

    var wa = p.whatsapp
      ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px"><tr>' +
        '<td bgcolor="#238636" style="background: #238636; border: 1px solid #2ea043; border-radius: 6px">' +
        '<a href="' + p.whatsapp + '" style="display: inline-block; padding: 8px 18px; font-family: ' + SANS + '; font-size: 12px; font-weight: bold; color: #ffffff; text-decoration: none; letter-spacing: 0.3px">' +
        '<img src="' + h.asset("wa-white.png") + '" width="14" height="14" alt="" style="vertical-align: middle; width: 14px; height: 14px; border: 0; margin-right: 7px" />' +
        p.waTexto + '</a></td></tr></table>'
      : '';

    return '<table cellpadding="0" cellspacing="0" border="0" width="520" style="width: 520px; max-width: 100%; background: #0d1117; border: 1px solid #30363d; border-radius: 10px; border-collapse: separate">' +
      '<tr><td bgcolor="#161b22" style="background: #161b22; padding: 9px 14px; border-bottom: 1px solid #30363d; border-radius: 9px 9px 0 0; font-family: ' + MONO + '; font-size: 11px; color: #8b949e">' +
        '<span style="color: #ff5f56; font-size: 13px">&#9679;</span>&nbsp;<span style="color: #ffbd2e; font-size: 13px">&#9679;</span>&nbsp;<span style="color: #27c93f; font-size: 13px">&#9679;</span>&nbsp;&nbsp;' +
        p.prompt + ' <span style="color: #58a6ff">~</span> % whoami</td></tr>' +
      '<tr><td style="padding: 20px 20px 16px 20px; background: #0d1117">' +
        '<table cellpadding="0" cellspacing="0" border="0"><tr>' +
          '<td valign="top" style="padding-right: 18px">' + h.photo(88, "border-radius: 50%; border: 2px solid #58a6ff") + '</td>' +
          '<td valign="top">' +
            '<div style="font-family: ' + SANS + '; font-size: 20px; font-weight: bold; color: #f0f6fc; letter-spacing: 0.3px; line-height: 1.2">' + p.nombre + '</div>' +
            (p.cargo ? '<div style="font-family: ' + MONO + '; font-size: 12px; color: #58a6ff; margin-top: 6px">&gt; ' + p.cargo + '<span style="color: #7ee787">_</span></div>' : '') +
            (p.frase ? '<div style="font-family: ' + MONO + '; font-size: 11px; color: #8b949e; margin-top: 4px">' + p.frase + '</div>' : '') +
          '</td></tr></table>' +
        (rows
          ? '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 16px 0 12px 0"><tr><td height="1" style="height: 1px; line-height: 1px; font-size: 1px; background: #30363d">&nbsp;</td></tr></table>' +
            '<table cellpadding="0" cellspacing="0" border="0" style="font-family: ' + MONO + '; font-size: 12px; line-height: 1.9">' + rows + '</table>'
          : '') +
        wa +
      '</td></tr>' + footer + '</table>';
  }
});
