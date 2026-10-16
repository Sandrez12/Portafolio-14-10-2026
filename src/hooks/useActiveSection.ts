import { useEffect, useState } from 'react';

/**
 * Scroll-spy: devuelve el `id` de la sección visible en la banda superior del
 * viewport (~30%–40%). Usa IntersectionObserver (sin listeners de scroll).
 *
 * @param ids Ids de los elementos a observar. Debe ser una referencia estable
 *            (constante de módulo, p. ej. `NAV_SECTION_IDS`) para no re-suscribir.
 * @returns Id activo (el primero de `ids` hasta que el observer dispare).
 *
 * Ejemplo: `const active = useActiveSection(NAV_SECTION_IDS);`
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    /** Secciones actualmente visibles en la banda, con su ratio de intersección. */
    const visible = new Map<HTMLElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.set(element, entry.intersectionRatio);
          else visible.delete(element);
        }
        if (visible.size === 0) return;
        // Activa la sección con mayor intersección dentro de la banda.
        const ranked = Array.from(visible.entries()).sort((a, b) => b[1] - a[1]);
        setActive(ranked[0][0].id);
      },
      // Banda entre el 30% y el 40% del viewport: la sección que la cruce es la activa.
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
