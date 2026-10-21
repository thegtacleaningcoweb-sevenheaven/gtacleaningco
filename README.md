# The GTA Cleaning Co.

Sitio estático de The GTA Cleaning Co., hecho con Astro (Vite por debajo). El HTML se genera en el build, así que el navegador recibe la página lista: poco JavaScript, fuentes locales y metadatos para buscadores.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` deja el sitio en `dist/`. Esa carpeta se puede publicar en Netlify, Cloudflare Pages, Vercel o cualquier hosting estático.

## Antes de publicarlo

Edita `src/data/site.ts`:

- dominio (`url`) — también actualiza la línea `Sitemap:` de `public/robots.txt`
- teléfono
- email de las cotizaciones

El formulario abre el correo del visitante con el resumen (`mailto`). No hay servidor detrás.

Las fotos van en `public/images/` y se conectan en `src/data/images.ts`. Si dejas la ruta vacía, se ve el espacio reservado.

Los textos de la página están en `src/data/content.ts` y `src/data/checklists.ts`. Para regenerar los PDF:

```bash
npm run pdfs
```

Todavía hay respuestas marcadas como `[Add your answer]`, una reseña de ejemplo y huecos en la política de cancelación. No entran al marcado de FAQ de Google hasta que les pongas `schema: true` en `src/data/content.ts`.
