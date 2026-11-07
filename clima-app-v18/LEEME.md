# Clima SV — guía de la estructura (versión 18)

Para publicar: sube **toda esta carpeta** a Netlify (arrastrándola). No hace falta compilar nada.

## Carpetas
- `index.html` — solo la estructura de la pantalla.
- `css/` — estilos: `base` (diseño general), `gato`, `tarjetas`, `modales` (ventanas), `ajustes`, `splash` (pantalla de inicio).
- `js/` — el código, un tema por archivo (se cargan en este orden):
  - `config` paletas, departamentos y **número de versión** · `datos-mapa` mapa de departamentos · `util` herramientas generales
  - `estado` datos actuales y reglas de hora/lluvia · `ajustes` preferencias y pantalla de ajustes · `tema` · `ahorro`
  - `logica` qué estado, gato, mensaje, avisos y actividades mostrar según clima y hora
  - `gato` · `tarjetas` pantalla principal y ventanas de detalle · `efectos` animaciones del cielo · `sonido`
  - `radar` · `lugares` (selector, búsqueda, favoritos, mapa) · `extras` (aire y mar) · `compartir` · `red` (descarga y caché sin internet)
  - `main` — orden de arranque de todo.
- `img/` — las 7 imágenes del gato (`gato-sol`, `gato-lluvia`, `gato-frio`, `gato-noche`, `gato-manana`, `gato-ejercicio`, `gato-casa`). Para cambiarlas, reemplaza el archivo con el mismo nombre.
- `sw.js` — guarda los archivos para que la app abra sin internet. `manifest.json` e íconos: instalación en el celular.

## Cosas que se editan seguido
- **Cambiar de versión:** número en `js/config.js` (`APP_VERSION`) y nombre `clima-vNN` en `sw.js` (así el celular descarga lo nuevo).
- **Agregar un archivo nuevo de código o estilo:** añádelo en `index.html` y en la lista de `sw.js`.
- **Frases y reglas según hora y clima:** `js/logica.js`.
- **Umbrales de los avisos (viento, lluvia, calor):** `alertsFor` en `js/logica.js`.

## Probar sin esperar al clima real
Añade al final del enlace: `?demo` (sale una barra para elegir el clima) y `&hora=3` (simula las 3 am, de 0 a 23).
