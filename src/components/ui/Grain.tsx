/**
 * Grano fotográfico sutil sobre toda la página: overlay fijo con ruido SVG
 * (`feTurbulence` inline, estático, se rasteriza una vez). Decorativo:
 * `aria-hidden` + `pointer-events-none`, opacidad ~0.05.
 *
 * Ejemplo: `<Grain />` (una sola vez, al final de App).
 */
export function Grain() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 opacity-[0.05]">
      <svg className="h-full w-full" focusable="false">
        <filter id="grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
