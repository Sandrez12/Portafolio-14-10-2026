/**
 * Formas de tinta SVG propias (manchas y cintas orgánicas en accent/accent-mid
 * que sangran por los bordes) decorando el fondo de la sección de contacto.
 * Decorativas: `aria-hidden` + `pointer-events-none`, sin sombras; la
 * flotación suave es transform puro y se neutraliza con reduced-motion
 * (`motion-safe:` + bloque de `index.css`).
 */
export function InkBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {/* Mancha de tinta que sangra por el borde superior derecho. */}
        <path
          d="M1440 0h-70c-92 12-166 64-192 138-24 66 4 138 70 168 66 30 120 14 120 14L1440 320 1440 0z"
          fill="#7B1D1D"
          opacity="0.32"
        />
        {/* Salpicadura menor bajo la mancha superior. */}
        <path
          d="M1440 330c-64 4-116 36-136 84-18 44 0 92 44 110 46 20 92 6 92 6v-200z"
          fill="#BC3A3A"
          opacity="0.14"
        />
        {/* Cinta de tinta que sangra por el borde inferior izquierdo. */}
        <path
          d="M0 900c130-34 216-102 252-194 30-78-2-156-66-192-60-34-132-24-186 22V900z"
          fill="#3A0E0E"
          opacity="0.6"
        />
        {/* Mancha teal en el borde izquierdo (contrapunto frío). */}
        <path
          d="M0 380c58 6 106 38 124 88 16 46-2 96-46 122-44 26-78 20-78 20V380z"
          fill="#236B6B"
          opacity="0.3"
        />
        {/* Gota de tinta suelta cerca del borde inferior derecho. */}
        <path
          d="M1440 780c-52 0-96 28-112 70-8 22-6 38 6 50h106v-120z"
          fill="#BC3A3A"
          opacity="0.12"
        />
      </svg>

      {/* Gotas flotantes suaves (transform puro, sólo sin reduced-motion). */}
      <svg
        className="absolute right-[10%] top-[14%] h-20 w-20 motion-safe:animate-float"
        viewBox="0 0 100 100"
        focusable="false"
      >
        <path
          d="M50 8c22 0 40 16 44 36 5 24-10 44-34 50-22 5-44-10-50-32C4 38 26 8 50 8z"
          fill="#BC3A3A"
          opacity="0.18"
        />
      </svg>
      <svg
        className="absolute bottom-[12%] left-[16%] h-14 w-14 motion-safe:animate-float motion-safe:[animation-delay:-3s]"
        viewBox="0 0 100 100"
        focusable="false"
      >
        <path
          d="M50 6c24 2 42 20 44 44 2 24-16 44-40 46C30 98 12 82 10 58 8 34 26 4 50 6z"
          fill="#236B6B"
          opacity="0.22"
        />
      </svg>
    </div>
  );
}