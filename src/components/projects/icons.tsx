import { siGithub } from 'simple-icons';

interface GithubIconProps {
  /** Tamaño del icono en px (por defecto 16). */
  size?: number;
}

/** Icono monocromo de GitHub (simple-icons), decorativo (`aria-hidden`). */
export function GithubIcon({ size = 16 }: GithubIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className="fill-current"
    >
      <path d={siGithub.path} />
    </svg>
  );
}
