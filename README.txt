LANDININV1 — HTML, CSS Y JAVASCRIPT PUROS

Uso
La página conserva su diseño original y sus recursos locales. Para que el
formulario funcione, usa el servidor Node incluido: node --env-file=.env server.mjs
Requiere Node 24. No necesita dependencias ni compilación del frontend.
Abrir index.html directamente sirve para revisar el diseño, sin envío de datos.

Subir a Railway
1. Conecta el repositorio que contiene esta carpeta a un servicio de Railway.
2. Si el repositorio es landings, configura Root Directory como /landininv1
   y el archivo de configuración como /landininv1/railway.json.
3. Railway construye el Dockerfile; no agregues comandos de build o inicio.
4. En Variables configura GOOGLE_SHEETS_WEBAPP_URL y GOOGLE_SHEETS_TOKEN.
   Son los mismos valores privados para las seis landings.
5. Genera el dominio en Networking. El servidor escucha en PORT (8080 por defecto).
La integración necesita que el receptor Apps Script esté desplegado y autorizado
en la cuenta de Zaira. Preparar archivos no publica automáticamente en Railway.

Archivos
index.html / styles.css / script.js  Página original y sus interacciones.
leads-client.js                     Envío y reintentos sin duplicados.
server.mjs                         Archivos públicos y endpoint /api/leads.
landing.config.json                Identidad de esta landing en el servidor.
assets/                            Imágenes, fuentes y licencias.
Dockerfile / railway.json          Despliegue sin dependencias adicionales.
.env.example                       Variables de ejemplo, sin claves reales.
nginx.conf                         Configuración anterior; ya no se utiliza.

Formulario
Valida nombre, correo, WhatsApp, país y fecha de nacimiento. El servidor añade
landininv1 — Data Strategic como origen; no acepta una identidad elegida por el cliente.
La hoja recibe fecha y hora, landing, los cinco campos, página e ID de registro.
No se guardan datos personales en localStorage ni se publican claves privadas.
El ID se conserva en memoria si falla un envío y permite reintentar sin duplicar.
Solo muestra confirmación cuando Google Sheets devuelve el ID guardado. Si falta
configuración o falla Google, conserva el formulario y permite volver a intentarlo.
Nunca pongas el token en script.js, index.html o un repositorio. Para uso local,
copia .env.example a .env y completa las variables; .env está excluido de Git.

Comportamientos conservados
- Contador de ocho minutos sincronizado entre ambas secciones. Mantiene su fecha
  de vencimiento en localStorage y se detiene en 00:00 sin reiniciarse solo.
- Avisos rotativos cada doce segundos: son los ejemplos del archivo original,
  no están conectados a actividad real.
- Modal después de dos minutos, si no se está completando el formulario. Se
  puede cerrar con el botón, Escape o haciendo clic fuera de la tarjeta.
- Botones que llevan al formulario y gráficos SVG con datos y tooltips locales.

Fidelidad
Se conservaron el contenido, paleta, tipografías, imágenes, secciones, espaciados,
breakpoints y estilos del código de Figma Make entregado. Se corrigió la suma
de porcentajes de la cuadrícula de escritorio, que desbordaba por el espacio
entre columnas. Los gráficos se reconstruyeron como SVG sin Recharts.
Los logos y recursos que no se muestran en el App.tsx original no se añadieron.
La referencia disponible fue el código del ZIP; no incluía una captura o archivo
.fig independiente para una comparación píxel a píxel contra el lienzo de Figma.

SEO
Se conservó noindex, nofollow del original. Se puede cambiar en index.html cuando
la página esté preparada para indexación pública.

Recursos
Foto de fondo: Unsplash, photo-1486325212027-8081e485255e.
https://unsplash.com/license
Inter y JetBrains Mono: Google Fonts, SIL Open Font License.
Iconos SVG: Lucide, licencia ISC.
CSS generado con Tailwind CSS, licencia MIT. No se carga Tailwind en el navegador.
Las licencias redistribuidas están en assets/licenses/.
