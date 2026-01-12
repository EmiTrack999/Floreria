# Vercel Static Deployment

Este proyecto está preparado para ser desplegado en Vercel como sitio estático. 

## Estructura recomendada
- Todo el contenido HTML, CSS, JS e imágenes debe estar en la raíz o en carpetas `/css`, `/js`, `/images`, `/static`.
- No se requiere backend (ni Python, ni Flask, ni base de datos local).
- El archivo `vercel.json` fuerza que todas las rutas apunten a `index.html` (SPA friendly).

## ¿Cómo mejorar la experiencia visual?
- Usa imágenes de alta calidad en `/images`.
- Personaliza los colores y fuentes en `/css/styles.css`.
- Agrega animaciones y efectos visuales en `/js/main.js`.
- Haz el sitio responsive y accesible.

## ¿Cómo desplegar?
1. Sube este proyecto a un repositorio de GitHub.
2. Conéctalo a Vercel y selecciona "Static" como tipo de proyecto.
3. ¡Listo! No necesitas configuración adicional.

---

Si necesitas funciones avanzadas (carrito, pedidos, etc.), se pueden simular con LocalStorage o migrar a un frontend moderno (React, Next.js) con backend serverless y base de datos en la nube.
