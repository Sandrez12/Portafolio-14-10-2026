interface OrnamentProps {
  className?: string;
}

/** Ornamento decorativo que precede los títulos "quién soy" y "skills" (trazo propio, no copiado). */
export function Ornament({ className = 'h-8 w-5' }: OrnamentProps) {
  return (
    <svg viewBox="0 0 24 36" className={className} aria-hidden="true" focusable="false">
      <path
        d="M17 2c-6 1-11 5-11 11 0 4 2 6 5 8 3 2 4 4 3 7-1 3-4 5-7 5 6 1 12-2 13-8 1-5-2-8-5-10-2-1-3-3-2-5 1-3 3-6 4-8z"
        fill="#BC3A3A"
      />
      <path d="M17 2c-3 3-4 7-2 10 1 2 4 3 5 6-1-4-4-6-4-9 0-2 0-5 1-7z" fill="#7B1D1D" />
    </svg>
  );
}
