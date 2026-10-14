# Estilos de firma

Cada estilo es un archivo JavaScript independiente en esta carpeta. La página no los carga todos al abrirse: **el archivo de un estilo se importa solo cuando la persona lo selecciona**, y queda en memoria para el resto de la sesión.

## Estilos incluidos

| Estilo | Archivo | Datos que usa | Imágenes que necesita |
|---|---|---|---|
| Terminal | `terminal.js` | nombre, cargo, frase, prompt, teléfono, correo, linkedin, ubicación, zona, estado, whatsapp | foto + `t-phone.png`, `t-mail.png`, `t-linkedin.png`, `t-pin.png`, `wa-white.png` |
| Editorial | `editorial.js` | nombre, cargo, tags, teléfono, correo, linkedin, ubicación, whatsapp | foto + `e-phone.png`, `e-mail.png`, `e-linkedin.png`, `e-pin.png`, `wa-white.png` |
| Minimalista | `minimal.js` | nombre, cargo, teléfono, correo, linkedin, ubicación, whatsapp | ninguna |
| Tarjeta dividida | `tarjeta.js` | nombre, cargo, frase, tags, teléfono, correo, linkedin, ubicación, whatsapp | foto |
| Ventana retro | `retro.js` | nombre, cargo, frase, teléfono, correo, linkedin, ubicación, zona, estado, whatsapp | foto |
| Neo-brutalista | `brutalist.js` | nombre, cargo, frase, tags, teléfono, correo, linkedin, ubicación, whatsapp | foto |
| Boarding pass | `ticket.js` | nombre, cargo, frase, teléfono, correo, linkedin, ubicación, zona, estado, whatsapp | foto |

La página muestra esta misma información debajo de la vista previa de cada estilo, y marca en el formulario los campos que el estilo seleccionado no usa.

## Cómo se cargan

1. `index.html` lee `templates/manifest.js`, que lista los estilos (`id`, `name`, `file`, `description`) y genera los botones de selección.
2. Al elegir uno, la página agrega un `<script src="templates/<archivo>.js">` al documento.
3. Ese archivo se registra llamando a `GmailSign.register({...})`.
4. La página llama a su función `render` cada vez que cambia el formulario.

Se usan etiquetas `<script>` y no módulos ES ni `fetch`, así que también funciona abriendo `index.html` directamente desde el disco (`file://`).

## Anatomía de un estilo

```js
GmailSign.register({
  id: "mi-estilo",                       // igual al id del manifest
  uses: ["nombre", "cargo", "correo"],   // datos que usa (ver tabla de abajo)
  photo: true,                           // ¿usa la foto del repo?
  assets: ["wa-white.png"],              // otros archivos de la carpeta de imágenes
  render: function (p, h) {
    return '<table>…</table>';           // HTML de la firma
  }
});
```

| Propiedad | Para qué sirve |
|---|---|
| `id` | Identificador único. Debe coincidir con el del manifest. |
| `uses` | Lista de datos que el estilo usa. Alimenta el panel informativo y marca en gris los campos que no se aplican. |
| `photo` | `true` si el estilo muestra la foto. Con `false` y sin `assets`, la página no pide datos de imágenes. |
| `assets` | Nombres de los demás archivos de imagen que necesita. Se listan en el panel informativo. |
| `render(p, h)` | Recibe los datos (`p`) y las ayudas (`h`) y devuelve un texto con el HTML de la firma. |

## Datos disponibles (`p`)

Todos los textos y URLs llegan **ya escapados para HTML**, así que se pueden insertar directamente en el resultado. Un dato sin completar llega como texto vacío (`""`) o lista vacía (`[]`), nunca como `undefined`; usa esos valores para decidir si mostrar o no una fila.

| Clave | Tipo | Ejemplo | Notas |
|---|---|---|---|
| `p.nombre` | texto | `Ana Rojas Mora` | |
| `p.cargo` | texto | `Ingeniera de software` | |
| `p.frase` | texto | `// building things` | |
| `p.tags` | lista de textos | `["Software", "Data"]` | Hasta 5 elementos, sin vacíos |
| `p.prompt` | texto | `ana@heredia` | Pensado para el estilo Terminal |
| `p.telefono` | texto | `+506 8888 8888` | Tal como lo escribió la persona |
| `p.telHref` | texto | `+50688888888` | Solo dígitos y `+`; úsalo en `href="tel:…"` |
| `p.correo` | texto | `ana@correo.com` | Úsalo en `href="mailto:…"` |
| `p.linkedin` | URL | `https://www.linkedin.com/in/ana/` | Siempre con `https://`; vacío si la URL no es válida |
| `p.linkedinTexto` | texto | `linkedin.com/in/ana` | Texto visible; si no se escribió, se deriva de la URL. Vacío si no hay LinkedIn |
| `p.ubicacion` | texto | `Heredia, Costa Rica` | |
| `p.zona` | texto | `UTC-6` | |
| `p.estado` | texto | `online` | |
| `p.whatsapp` | URL | `https://wa.me/50688888888?text=Hola` | Enlace listo, con el mensaje inicial ya codificado. Vacío si no hay número |
| `p.waTexto` | texto | `Escríbeme por WhatsApp` | Si no se escribió, vale `WhatsApp` |

## Ayudas (`h`)

| Función | Qué devuelve |
|---|---|
| `h.photo(tamaño, estiloExtra)` | Etiqueta `<img>` cuadrada con la foto del repo. `estiloExtra` es CSS en línea opcional, por ejemplo `"border-radius: 50%"`. |
| `h.img(archivo, alt, ancho, alto, estiloExtra)` | Etiqueta `<img>` de un archivo de la carpeta de imágenes (por ejemplo un ícono). |
| `h.asset(archivo)` | Solo la URL de un archivo de la carpeta de imágenes, para armar tu propia etiqueta. |
| `h.esc(texto)` | Escapa un texto para HTML. Solo hace falta para texto que no venga de `p`. |
| `h.hash(texto)` | Número entero estable a partir de un texto. Sirve para generar detalles decorativos que cambian con cada persona (el estilo Boarding pass lo usa para su código de barras). |

## Reglas para que la firma funcione en Gmail

Gmail y la mayoría de clientes de correo ignoran gran parte del CSS moderno. Para que un estilo se vea bien:

- Usa **tablas** (`<table>`, `<tr>`, `<td>`) para la estructura y **estilos en línea** (`style="…"`). No uses `<style>`, clases, `flex`, `grid` ni variables CSS.
- No uses JavaScript, fuentes web ni imágenes locales. Las imágenes deben venir de URLs públicas (`h.photo`, `h.img`, `h.asset`).
- Usa colores sólidos. Los degradados y las sombras suelen perderse; para una sombra dura, usa una celda negra con relleno (ver `brutalist.js`).
- Para un color de fondo, pon `bgcolor="…"` además de `background`. Así se conserva en más clientes.
- Para una línea fina, usa una celda con `height` y `font-size: 1px; line-height: 1px`.
- Los `border-radius` funcionan en Gmail, pero no en algunas versiones de Outlook; el diseño debe seguir siendo legible sin ellos.
- Usa fuentes comunes (`Verdana`, `Arial`, `Georgia`, `Courier New`) con alternativas.
- Evita emojis y símbolos poco comunes: pueden verse distintos según el cliente.
- **Tamaño:** Gmail admite hasta 10 000 caracteres por firma. La página avisa si se supera. Con textos largos, el estilo más pesado incluido (Boarding pass) ronda los 7 300 caracteres.
- Si tu estilo necesita una condición (por ejemplo, ocultar una fila sin dato), arma el HTML con condicionales en JavaScript; no dejes celdas vacías.

## Cómo agregar un estilo nuevo

1. Crea `templates/<id>.js` con `GmailSign.register({...})` (ver la anatomía de arriba). Puedes partir de `minimal.js`, el más corto.
2. Agrega una línea en `templates/manifest.js`:

   ```js
   { id: "mi-estilo", name: "Mi estilo", file: "templates/mi-estilo.js", description: "Una frase que lo describa." },
   ```
3. Recarga la página: aparecerá un botón nuevo.
4. Revisa que se vea bien con todos los campos llenos, con solo el nombre y con todo vacío.
5. Pega la firma en Gmail y envíate un correo de prueba.

Si el estilo usa íconos propios, nómbralos con un prefijo único (por ejemplo `m-phone.png`), súbelos a la carpeta de imágenes y decláralos en `assets`.
