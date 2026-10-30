LANDININV1 — HTML, CSS Y JAVASCRIPT PUROS

Uso
Abre index.html directamente en un navegador. También puedes subir toda esta
carpeta a cualquier hosting estático, manteniendo su estructura de archivos.
No hace falta instalar Node, React, Astro ni ejecutar un proceso de compilación.

Subir a Railway
1. Sube el contenido de esta carpeta a un repositorio de GitHub y conecta ese
   repositorio a un servicio de Railway.
2. Si subes todo el repositorio landings, configura Root Directory como
   /landininv1 y la ruta del archivo de configuración como
   /landininv1/railway.json en el servicio. Si esta carpeta es la raíz de su
   propio repositorio, no hace falta configurar un subdirectorio.
3. Railway construye el Dockerfile incluido. No necesitas definir un comando
   de build ni un comando de inicio adicional.
4. En Networking, genera el dominio del servicio. El servidor utiliza el puerto
   PORT asignado por Railway (8080 si no hay uno definido).

La página continúa siendo HTML, CSS y JavaScript puros. Nginx solo sirve los
archivos dentro del contenedor. railway.json comprueba la ruta / al arrancar.
Esta carpeta está preparada para el despliegue; no se ha publicado en una cuenta
de Railway ni se ha ejecutado Docker en este equipo, donde no está instalado.
Referencia: https://docs.railway.com/services

Archivos
index.html       Contenido y estructura de la landing.
styles.css       Estilos compilados y adaptación a móvil, tablet y escritorio.
script.js        Contador, formulario, gráficos, avisos y modal.
assets/          Imagen y fuentes locales; licencias de los recursos.
Dockerfile       Contenedor de Nginx para Railway.
nginx.conf       Servidor estático que escucha en el puerto PORT.
railway.json     Configuración de build y comprobación de disponibilidad.

Formulario
El ZIP original no incluye un servidor, CRM, correo ni número de WhatsApp receptor.
El formulario valida los cinco campos. Mientras no tenga un destino configurado,
muestra que los datos no se han enviado. No guarda los datos personales.
Para conectarlo, configura formEndpoint al inicio de LANDING_CONFIG en script.js.
El endpoint debe aceptar POST con JSON: name, email, phone, country y dob,
y responder con un estado HTTP satisfactorio cuando reciba el registro.
Usa un servidor para credenciales o claves privadas, nunca este archivo público.

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
