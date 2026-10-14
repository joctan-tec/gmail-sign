# Generador de firma para Gmail

Página estática (un solo archivo HTML, sin dependencias ni build) donde cada persona completa sus datos y obtiene una firma de correo lista para pegar en Gmail. La firma se genera de forma dinámica: cada cambio en el formulario actualiza la vista previa al instante.

## Qué incluye

- **Dos conceptos de firma**
  - **Terminal:** estilo consola oscura, con prompt, frase y estado en línea.
  - **Editorial:** tarjeta clara con barra de color, etiquetas y botón de WhatsApp en forma de píldora.
- **Formulario** con identidad, contacto, botón de WhatsApp y usuario de GitHub.
- **Vista previa en vivo** del concepto elegido.
- **Copiar firma** (contenido enriquecido, listo para Gmail) y **Copiar código HTML**.
- **Persistencia local:** los datos y el concepto elegido se guardan en el navegador de cada persona.

## Estructura del proyecto

```
gmail-signature/
├── index.html        # La página completa (HTML + CSS + JS)
├── README.md
└── assets/           # Imágenes que usa la firma (ver más abajo)
    ├── photo.jpg
    ├── t-phone.png   t-mail.png   t-linkedin.png   t-pin.png
    ├── e-phone.png   e-mail.png   e-linkedin.png   e-pin.png
    └── wa-white.png
```

> El repositorio **debe llamarse `gmail-signature`** y las imágenes deben estar en `assets/` de la rama `main`: la página arma las URLs con ese nombre fijo.

## Cómo funciona

1. La persona escribe sus datos en el formulario.
2. `index.html` construye el HTML de la firma con tablas y estilos en línea, que es lo único que Gmail respeta (no admite JavaScript ni CSS externo).
3. Las imágenes (foto e íconos) se cargan desde:

   ```
   https://raw.githubusercontent.com/<usuario>/gmail-signature/main/assets/<archivo>
   ```

   Por eso solo se pide el **usuario de GitHub**.
4. Al pulsar **Copiar firma**, la firma se copia con su formato y se pega en Gmail.

Los campos vacíos se omiten: sin número de WhatsApp no aparece el botón, sin estado no aparece el punto verde, y así con el resto.

## Puesta en marcha

### 1. Prepara el repositorio de imágenes

Cada persona que use la herramienta necesita un repositorio **público** llamado `gmail-signature` con una carpeta `assets/` que contenga estos archivos:

| Archivo | Uso | Tamaño sugerido |
|---|---|---|
| `photo.jpg` | Foto de perfil (se recorta en círculo) | 200 × 200 px, cuadrada |
| `t-phone.png`, `t-mail.png`, `t-linkedin.png`, `t-pin.png` | Íconos del concepto Terminal | 32 × 32 px (se muestran a 16 px o 12 px) |
| `e-phone.png`, `e-mail.png`, `e-linkedin.png`, `e-pin.png` | Íconos del concepto Editorial | 32 × 32 px |
| `wa-white.png` | Ícono de WhatsApp para el botón | 28 × 28 px, blanco con fondo transparente |

Usa PNG con fondo transparente para los íconos. Los del concepto Terminal deben verse bien sobre fondo oscuro y los del Editorial sobre fondo blanco.

### 2. Publica la página

Opciones sencillas:

- **GitHub Pages:** sube `index.html` al repositorio, ve a *Settings → Pages* y elige la rama `main` y la carpeta raíz. La página quedará en `https://<usuario>.github.io/gmail-signature/`.
- **Netlify, Vercel u otro hosting estático:** arrastra o sube el archivo.
- **Local:** abre `index.html` directamente en el navegador; no necesita servidor.

### 3. Genera tu firma

1. Abre la página y completa tus datos.
2. Escribe tu **usuario de GitHub** en la sección *Imágenes*. Mientras esté vacío, la página muestra un aviso y las imágenes no cargan.
3. Elige el concepto (Terminal o Editorial) y revisa la vista previa.
4. Pulsa **Copiar firma**.

### 4. Pégala en Gmail

1. En Gmail abre **Ajustes (⚙) → Ver todos los ajustes**.
2. En la pestaña **General**, baja hasta **Firma**.
3. Crea una firma nueva o edita una existente.
4. Pega con `Ctrl + V` (`Cmd + V` en Mac) y pulsa **Guardar cambios** al final de la página.

## Campos del formulario

| Sección | Campo | Notas |
|---|---|---|
| Identidad | Nombre, Cargo | Obligatorios en la práctica |
| | Frase | Solo concepto Terminal |
| | Etiquetas | Solo concepto Editorial; separadas por coma, hasta 5 |
| | Prompt del terminal | Solo Terminal (por ejemplo `usuario@ciudad`) |
| Contacto | Teléfono, Correo | Se convierten en enlaces `tel:` y `mailto:` |
| | URL de LinkedIn y texto visible | El texto visible puede ser una versión corta de la URL |
| | Ubicación | En Terminal aparece en el pie; en Editorial, como una fila de contacto |
| | Zona horaria, Estado | Solo Terminal |
| WhatsApp | Número, texto del botón, mensaje inicial | Con el número vacío no se muestra el botón |
| Imágenes | Usuario de GitHub | Define de dónde se cargan la foto y los íconos |

## Privacidad

No hay servidor ni base de datos. Los datos que se escriben solo se guardan en el `localStorage` del navegador de cada persona y nunca salen de su equipo. Las imágenes sí se piden a `raw.githubusercontent.com` para mostrarse, y esas mismas URLs son las que verán quienes reciban tus correos.

## Personalización

Todo está en `index.html`:

- **Colores y tipografías de las firmas:** dentro de las funciones `sigTerminal` y `sigEditorial` (estilos en línea).
- **Colores de las etiquetas del concepto Editorial:** arreglo `CHIPS`.
- **Valores por defecto del formulario:** objeto `DEFAULTS`.
- **Apariencia de la página** (no de la firma): bloque `<style>` al inicio. Soporta modo claro y oscuro.
- **Agregar un concepto nuevo:**
  1. Crea una función `sigNuevo(d)` que devuelva el HTML de la firma (tablas y estilos en línea).
  2. Agrega un botón de opción `<input type="radio" name="tpl" value="nuevo">` en el HTML.
  3. En la función `render`, añade el caso correspondiente.

## Limitaciones y consejos

- **Imágenes alojadas, no incrustadas:** Gmail necesita URLs públicas. Si el repo es privado o el nombre no coincide, las imágenes se verán rotas.
- **Caché de GitHub:** si cambias una imagen en `assets/`, `raw.githubusercontent.com` puede tardar unos minutos en reflejarlo.
- **Clientes de correo:** algunos (por ejemplo Outlook de escritorio) ignoran partes de los estilos, como los bordes redondeados. Conviene enviarte un correo de prueba y revisarlo.
- **Imágenes bloqueadas por defecto:** muchos clientes piden permiso antes de mostrar imágenes externas, así que algunos destinatarios verán primero la firma sin íconos.
- **Modo oscuro del destinatario:** puede alterar los colores de la firma en algunos clientes.
- **Límite de tamaño:** Gmail admite firmas de hasta 10 000 caracteres; las dos plantillas incluidas caben con margen.
- **Si «Copiar firma» no funciona:** algunos navegadores bloquean el portapapeles. Selecciona la vista previa con el mouse y copia con `Ctrl + C`.

## Solución de problemas

| Problema | Causa probable | Qué hacer |
|---|---|---|
| Aparece el aviso «Falta tu usuario de GitHub» | El campo está vacío | Escribe tu usuario |
| Foto e íconos se ven rotos | Repo no público, nombre distinto de `gmail-signature`, carpeta o archivos mal nombrados | Revisa la sección *Puesta en marcha* |
| Los íconos se ven borrosos | Imágenes de tamaño muy pequeño | Usa PNG de 32 × 32 px o más |
| La firma pegada pierde el formato | Se copió desde el área de código | Usa **Copiar firma**, no el código HTML |
| Los datos no se guardan | El navegador bloquea `localStorage` (modo privado, por ejemplo) | La firma sigue funcionando, pero tendrás que reingresar los datos |
