import type { ReactNode } from 'react';

/**
 * Palabras clave del resumen que se resaltan en accent (del propio texto del
 * CV; ordenadas de más largas a más cortas para no partir "NoSQL"/"Oracle
 * APEX"). El texto NUNCA se altera: sólo se envuelven los coincidencias.
 */
const KEYWORDS = /Oracle APEX|NoSQL|SQL|Python|Java|Kotlin/g;

/**
 * Resumen del perfil con las palabras clave resaltadas en accent. Divide el
 * texto original en fragmentos (regex global recreado en cada render para
 * no compartir `lastIndex` entre montajes) sin modificar ni una coma.
 */
export function HighlightedSummary({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const keywords = new RegExp(KEYWORDS);
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = keywords.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <strong key={key++} className="font-semibold text-accent">
        {match[0]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}
