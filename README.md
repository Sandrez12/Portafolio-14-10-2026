# Portafolio · Andrés Felipe Joya Buitrago

Portafolio personal hecho con **Vite + React 18 + TypeScript** y **Tailwind CSS v3**, basado en el diseño de referencia descrito en `_spec/BRIEF.md` (tokens de color, tipografía y datos del CV). Este repositorio contiene el **scaffolding**: la base del proyecto con las secciones como componentes placeholder y todos los datos cargados desde `src/data/`. Las secciones visuales aún no están implementadas.

> Nota: `_spec/` y `_reference-design.jpeg` son material de referencia y **no** deben modificarse.

## Instalación

Requisitos: **Node.js 18+** (recomendado 20/22) y **npm**.

```bash
npm install
```

## Scripts

| Comando             | Descripción                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo de Vite (hot reload).        |
| `npm run build`     | Type-check estricto (`tsc`) + build de producción. |
| `npm run preview`   | Previsualiza el build de producción localmente.     |
| `npm run lint`      | ESLint sobre todo el código.                       |
| `npm run format`    | Formatea todo con Prettier.                         |
| `npm run format:check` | Verifica el formato sin escribir cambios.       |

## Estructura

```text
├── index.html                  # lang="es", meta/OG, theme-color, Google Fonts
├── public/
│   └── favicon.svg             # Favicon propio (llama en accent)
├── src/
│   ├── assets/
│   │   └── photo-placeholder.svg   # Placeholder de foto (reemplazable)
│   ├── components/            # Una sección por archivo (placeholders)
│   │   ├── Hero.tsx            # "Portafolio" + nombre + titular
│   │   ├── About.tsx           # "¿quién soy?" (foto + resumen)
│   │   ├── Info.tsx            # Contacto + idiomas + educación
│   │   ├── Skills.tsx          # Habilidades por categoría
│   │   ├── Projects.tsx        # 5 proyectos
│   │   ├── Certifications.tsx  # 6 certificaciones
│   │   └── Footer.tsx          # Contacto final
│   ├── data/                   # TODO el contenido editable vive aquí
│   │   ├── profile.ts          # Datos personales, contacto, idiomas, educación
│   │   ├── skills.ts           # Habilidades por categoría
│   │   ├── projects.ts         # Proyectos
│   │   └── certifications.ts   # Certificaciones
│   ├── types.ts                # Tipos compartidos (sin `any`)
│   ├── App.tsx                 # Layout base (skip link + contenedor 1120px)
│   ├── main.tsx
│   └── index.css               # Tailwind + estilos globales accesibles
├── tailwind.config.js          # Tokens de color y tipografía del diseño
└── tsconfig.json / tsconfig.node.json / eslint.config.js / .prettierrc
```

## Cómo editar los datos

Todo el contenido está centralizado en **`src/data/`** y tipado en `src/types.ts`:

- **Perfil / contacto / idiomas / educación** → `src/data/profile.ts`
  - Los idiomas usan `filledSegments`/`totalSegments` para la barra segmentada de 8 segmentos (Español 8/8, Inglés C1 7/8, Portugués básico 2/8).
- **Habilidades** → `src/data/skills.ts` (agrupadas por categorías del CV).
- **Proyectos** → `src/data/projects.ts` (título, tagline, descripción, highlights, stack, estado, repo, tag y `teamProject` para el tono honesto de "trabajo en equipo").
- **Certificaciones** → `src/data/certifications.ts`.

Tras editar, corre `npm run build` para validar los tipos.

## Cómo cambiar la foto

1. Coloca tu foto en `src/assets/` (p. ej. `foto.jpg`).
2. En `src/data/profile.ts` cambia el import:

   ```ts
   import photo from '../assets/foto.jpg';
   // ...
   export const profile: Profile = {
     // ...
     photo, // en lugar de photoPlaceholder
   };
   ```

   Vite se encarga de procesar y optimizar el asset. El placeholder actual es `src/assets/photo-placeholder.svg`; puedes borrarlo cuando ya no lo uses.

## Diseño (tokens)

Definidos en `tailwind.config.js` a partir del BRIEF:

- **Colores**: `bg #0C2424`, `panel`/`band #102E2E`, `accent #BC3A3A`, `accent-mid #7B1D1D`, `accent-dark #3A0E0E`, `ink #FFFFFF`, `ink-muted #C9D7DA`, `teal #236B6B`.
- **Tipografía** (Google Fonts en `index.html`): `font-display` (Caveat Brush), `font-hand` (Caveat 700) y `font-sans` (Montserrat 300–700).

## Accesibilidad incluida en la base

- Skip link `<a href="#main">` visible al enfocar con teclado.
- `scroll-behavior: smooth` que respeta `prefers-reduced-motion`.
- Foco visible consistente en color `accent`.
- Cada sección tiene un encabezado accesible (`aria-labelledby`).

## Dependencias

Solo lo mínimo: `react`, `react-dom`, `framer-motion` (animaciones futuras) y `simple-icons` (iconos de marcas para los tiles de skills). Herramientas: Vite, TypeScript estricto, Tailwind CSS v3, ESLint 9 (flat config) y Prettier.
