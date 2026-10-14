# Generador de firma para Gmail

Página estática donde cada persona elige un estilo, completa sus datos y obtiene una firma de correo lista para pegar en Gmail. La firma se genera de forma dinámica: cada cambio en el formulario actualiza la vista previa al instante. No necesita servidor, build ni dependencias.

## Qué incluye

- **7 estilos de firma**, cada uno en su propio archivo (carpeta `templates/`), que se cargan solo al seleccionarlos.
- **Formulario vacío con placeholders:** ningún campo trae valores precargados; cada uno muestra un texto de ejemplo en gris.
- **Panel informativo** por estilo: qué datos usa y qué imágenes necesita. Los campos que el estilo no usa se marcan en el formulario.
- **Vista previa en vivo** y botones para **copiar la firma** (con formato, lista para Gmail) o **copiar el código HTML**.
- **Imágenes desde GitHub:** la foto y los íconos se toman de un repositorio público; usuario, repositorio, rama, carpeta y nombre de la foto son configurables.
- **Persistencia local:** los datos y el estilo elegido se guardan en el navegador de cada persona.
- **Aviso de tamaño:** la página avisa si la firma supera los 10 000 caracteres que admite Gmail.

## Estilos disponibles

| Estilo | Descripción | Imágenes |
|---|---|---|
| **Terminal** | Consola oscura estilo GitHub, con prompt, frase y estado en línea | foto + íconos |
| **Editorial** | Tarjeta clara con barra de tres colores, etiquetas y botón en píldora | foto + íconos |
| **Minimalista** | Solo tipografía: nombre en serif, línea de acento y enlaces subrayados | ninguna |
| **Tarjeta dividida** | Panel verde azulado con la foto y datos de contacto a la derecha | foto |
| **Ventana retro** | Ventana de escritorio de los 90, con barra de título y botón biselado | foto |
| **Neo-brutalista** | Amarillo intenso, bordes negros gruesos, sombra dura y botón rosa | foto |
| **Boarding pass** | Pase de abordar con talón perforado y código de barras generado de tus datos | foto |

El detalle de qué datos usa cada estilo está en [`templates/README.md`](templates/README.md).

## Estructura del proyecto

```
gmail-signature/          # el nombre del repo también es configurable
├── index.html            # La página: formulario, vista previa y carga de estilos
├── README.md
├── templates/
│   ├── README.md         # Datos disponibles y guía para crear estilos
│   ├── manifest.js       # Lista de estilos disponibles
│   ├── terminal.js       # Un archivo por estilo
│   ├── editorial.js
│   ├── minimal.js
│   ├── tarjeta.js
│   ├── retro.js
│   ├── brutalist.js
│   └── ticket.js
└── assets/               # Imágenes de la firma (el nombre de la carpeta es configurable)
    ├── photo.jpg
    ├── t-phone.png   t-mail.png   t-linkedin.png   t-pin.png
    ├── e-phone.png   e-mail.png   e-linkedin.png   e-pin.png
    └── wa-white.png
```

> `index.html` y la carpeta `templates/` deben publicarse juntas. Ya no es un archivo único.

## Cómo funciona

1. `index.html` lee `templates/manifest.js` y crea un botón por cada estilo.
2. Al elegir uno, se importa su archivo (`templates/<estilo>.js`). Los siguientes cambios de estilo usan la copia ya cargada.
3. La persona completa el formulario. En cada cambio, la página prepara los datos (textos escapados, enlaces `tel:` y `wa.me` ya armados) y se los pasa al estilo, que devuelve el HTML de la firma.
4. La firma usa tablas y estilos en línea, que es lo único que Gmail respeta (no admite JavaScript ni CSS externo).
5. Las imágenes se cargan desde:

   ```
   https://raw.githubusercontent.com/<usuario>/<repositorio>/<rama>/<carpeta>/<archivo>
   ```

   El **usuario de GitHub** es obligatorio cuando el estilo usa imágenes. El repositorio, la rama y la carpeta son opcionales: si los dejas vacíos se usan `gmail-signature`, `main` y `assets`.
6. **Copiar firma** deja la firma con su formato en el portapapeles, lista para pegar.

Los campos vacíos se omiten: sin número de WhatsApp no aparece el botón, sin estado no aparece el punto verde, y así con el resto. Los placeholders son solo una guía visual y no forman parte de la firma. Mientras el formulario esté sin datos, la vista previa muestra un mensaje y los botones de copiar avisan que faltan datos.

## Puesta en marcha

### 1. Prepara el repositorio de imágenes

Si vas a usar un estilo con imágenes, necesitas un repositorio **público** con una carpeta de imágenes (por defecto `gmail-signature/assets/`, rama `main`; todo es configurable en el formulario). Qué archivos hacen falta depende del estilo: la página lo indica debajo de la vista previa. El **Minimalista** no necesita ninguno.

| Archivo | Uso | Tamaño sugerido |
|---|---|---|
| `photo.jpg` (o el nombre que configures) | Foto de perfil | 200 × 200 px, cuadrada |
| `t-phone.png`, `t-mail.png`, `t-linkedin.png`, `t-pin.png` | Íconos del estilo Terminal | 32 × 32 px (se muestran a 16 px o 12 px) |
| `e-phone.png`, `e-mail.png`, `e-linkedin.png`, `e-pin.png` | Íconos del estilo Editorial | 32 × 32 px |
| `wa-white.png` | Ícono de WhatsApp (Terminal y Editorial) | 28 × 28 px, blanco con fondo transparente |

Usa PNG con fondo transparente para los íconos. Los de Terminal deben verse bien sobre fondo oscuro y los de Editorial sobre fondo blanco. Los otros cinco estilos solo usan la foto (o nada), no necesitan íconos.

### 2. Publica la página

- **GitHub Pages:** sube `index.html` y la carpeta `templates/` al repositorio, ve a *Settings → Pages* y elige la rama y la carpeta raíz. La página quedará en `https://<usuario>.github.io/<repositorio>/`.
- **Netlify, Vercel u otro hosting estático:** sube el archivo y la carpeta.
- **Local:** abre `index.html` directamente en el navegador. Los estilos se cargan con etiquetas `<script>`, así que no hace falta un servidor.

### 3. Genera tu firma

1. Abre la página y elige un estilo.
2. Completa tus datos (los textos en gris son solo ejemplos).
3. Si el estilo usa imágenes, escribe tu **usuario de GitHub** en la sección *Imágenes (GitHub)* y, si tu repositorio, rama o carpeta tienen otros nombres, complétalos también.
4. Revisa la vista previa y pulsa **Copiar firma**.

### 4. Pégala en Gmail

1. En Gmail abre **Ajustes (⚙) → Ver toda la configuración**.
2. En la pestaña **General**, baja hasta **Firma** y crea una nueva o edita una existente.
3. Pega con `Ctrl + V` (`Cmd + V` en Mac) y pulsa **Guardar cambios** al final de la página.

## Datos del formulario

| Sección | Campo | Notas |
|---|---|---|
| Identidad | Nombre, Cargo | |
| | Frase | La usan Terminal, Tarjeta, Retro, Neo-brutalista y Boarding pass |
| | Etiquetas | Separadas por coma, hasta 5. Las usan Editorial, Tarjeta y Neo-brutalista |
| | Prompt del terminal | Solo Terminal |
| Contacto | Teléfono, Correo | Se convierten en enlaces `tel:` y `mailto:` |
| | URL de LinkedIn y texto visible | El texto visible puede ser una versión corta de la URL |
| | Ubicación | |
| | Zona horaria, Estado | Los usan Terminal, Retro y Boarding pass |
| WhatsApp | Número, texto del botón, mensaje inicial | Con el número vacío no se muestra el botón |
| Imágenes (GitHub) | Usuario de GitHub | Obligatorio si el estilo usa imágenes |
| | Repositorio | Vacío = `gmail-signature` |
| | Rama | Vacía = `main`. Admite nombres con barra (`feature/x`) |
| | Carpeta de imágenes | Vacía = `assets`. Admite subcarpetas (`docs/img`); `/` o `.` significa la raíz del repo |
| | Nombre del archivo de la foto | Vacío = `photo.jpg` |

## Privacidad

No hay servidor ni base de datos. Los datos que se escriben solo se guardan en el `localStorage` del navegador de cada persona y nunca salen de su equipo. Las imágenes sí se piden a `raw.githubusercontent.com` para mostrarse, y esas mismas URLs son las que verán quienes reciban tus correos.

## Personalización y nuevos estilos

- **Crear o modificar un estilo:** cada estilo es un archivo en `templates/`. La guía completa, con la lista de datos disponibles y las reglas para que funcione en Gmail, está en [`templates/README.md`](templates/README.md). En resumen: crea el archivo, registra el estilo con `GmailSign.register(...)` y agrega una línea en `templates/manifest.js`.
- **Placeholders del formulario:** objeto `PLACEHOLDERS` en `index.html`.
- **Apariencia de la página** (no de la firma): bloque `<style>` de `index.html`. Soporta modo claro y oscuro.

## Limitaciones y consejos

- **Imágenes alojadas, no incrustadas:** Gmail necesita URLs públicas. Si el repo es privado o el usuario, repositorio, rama, carpeta o nombres de archivo no coinciden con lo escrito en el formulario, las imágenes se verán rotas.
- **Caché de GitHub:** si cambias una imagen, `raw.githubusercontent.com` puede tardar unos minutos en reflejarlo.
- **Clientes de correo:** algunos (por ejemplo Outlook de escritorio) ignoran partes de los estilos, como los bordes redondeados. Envíate un correo de prueba y revísalo.
- **Imágenes bloqueadas por defecto:** muchos clientes piden permiso antes de mostrar imágenes externas, así que algunos destinatarios verán primero la firma sin foto ni íconos. El estilo Minimalista no depende de ellas.
- **Modo oscuro del destinatario:** puede alterar los colores de la firma en algunos clientes.
- **Límite de tamaño:** Gmail admite hasta 10 000 caracteres por firma. Con textos largos, el estilo más pesado (Boarding pass) ronda los 7 300; la página avisa si se supera el límite.
- **Si «Copiar firma» no funciona:** algunos navegadores bloquean el portapapeles. Selecciona la vista previa con el mouse y copia con `Ctrl + C`.

## Solución de problemas

| Problema | Causa probable | Qué hacer |
|---|---|---|
| «No se pudo cargar templates/…» o «No se encontró templates/manifest.js» | La carpeta `templates/` no está junto a `index.html` | Publica o copia ambos juntos |
| Aparece el aviso «Falta tu usuario de GitHub» | El estilo usa imágenes y el campo está vacío | Escribe tu usuario |
| Foto e íconos se ven rotos | Repo no público, o usuario, repositorio, rama o carpeta distintos de lo escrito en el formulario; archivos mal nombrados | Revisa la sección *Imágenes (GitHub)* y los archivos que indica el panel del estilo |
| Los íconos se ven borrosos | Imágenes de tamaño muy pequeño | Usa PNG de 32 × 32 px o más |
| La firma pegada pierde el formato | Se copió desde el área de código | Usa **Copiar firma**, no el código HTML |
| La vista previa dice «Completa el formulario…» | Todos los campos de datos están vacíos | Escribe al menos un dato |
| Aviso de más de 10 000 caracteres | Textos muy largos o estilo muy pesado | Acorta los textos o elige otro estilo |
| Los datos no se guardan | El navegador bloquea `localStorage` (modo privado, por ejemplo) | La firma sigue funcionando, pero tendrás que reingresar los datos |
