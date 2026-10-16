import { useMemo, useRef, type ReactElement } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type {
  ArchitectureDiagram as ArchitectureDiagramData,
  DiagramEdge as DiagramEdgeData,
  DiagramNode as DiagramNodeData,
  DiagramNodeKind,
} from '../../types';
import { EASE } from '../ui/motion';

// ——— Constantes de dibujo (unidades del viewBox) ——————————————————————
const NODE_W = 150;
const NODE_H = 64;
const PAD = 10;
/** Horizontal (≥1024px): separación entre capas / entre nodos de una misma capa. */
const H_GAP_X = 52;
const H_GAP_Y = 26;
/** Curvatura de las aristas en horizontal. */
const H_ROUTE = 26;
/** Vertical (<1024px): separación entre capas / entre nodos de una misma capa. */
const V_GAP_Y = 28;
const V_GAP_INNER = 16;
/** Rodeo lateral de las aristas en vertical (para no cruzar nodos). */
const V_ROUTE = 46;
/** Tipografía del nodo. */
const FONT = 10.5;
const LINE_HEIGHT = 13;
const MAX_CHARS = 16;
/** Centro X del texto del nodo (el glifo ocupa la izquierda). */
const TEXT_CENTER = (x: number): number => x + 40 + (NODE_W - 40 - 12) / 2;

/** Glifos monocromos por clase de nodo, dibujados en una caja 20×20. */
const GLYPHS: Record<DiagramNodeKind, ReactElement> = {
  app: (
    <g>
      <rect x="5.5" y="1.5" width="9" height="17" rx="2.5" />
      <line x1="8.5" y1="16" x2="11.5" y2="16" />
    </g>
  ),
  api: (
    <g>
      <rect x="2" y="3" width="16" height="6" rx="1.5" />
      <rect x="2" y="11" width="16" height="6" rx="1.5" />
      <circle cx="5.5" cy="6" r="1.2" fill="#C9D7DA" stroke="none" />
      <circle cx="5.5" cy="14" r="1.2" fill="#C9D7DA" stroke="none" />
    </g>
  ),
  db: (
    <g>
      <ellipse cx="10" cy="4.5" rx="7" ry="2.6" />
      <path d="M3 4.5 v11 a7 2.6 0 0 0 14 0 v-11" />
    </g>
  ),
  ml: (
    <g>
      <circle cx="4.2" cy="5" r="2.4" />
      <circle cx="15.8" cy="5" r="2.4" />
      <circle cx="10" cy="15.4" r="2.4" />
      <path d="M6.4 5.9 l2.5 7.2 M13.6 5.9 l-2.5 7.2 M6.6 5 h6.8" />
    </g>
  ),
  cloud: (
    <g>
      <path d="M6.2 15.5 h8.3 a3.8 3.8 0 1 0 -1.9 -7.1 a5 5 0 0 0 -9.4 1.3 a3.3 3.3 0 0 0 3 5.8 Z" />
    </g>
  ),
  device: (
    <g>
      <rect x="6" y="6" width="8" height="8" rx="1.5" />
      <line x1="10" y1="2" x2="10" y2="6" />
      <line x1="10" y1="14" x2="10" y2="18" />
      <line x1="2" y1="10" x2="6" y2="10" />
      <line x1="14" y1="10" x2="18" y2="10" />
      <line x1="7" y1="2.6" x2="7" y2="5" />
      <line x1="13" y1="2.6" x2="13" y2="5" />
      <line x1="7" y1="15" x2="7" y2="17.4" />
      <line x1="13" y1="15" x2="13" y2="17.4" />
    </g>
  ),
  broker: (
    <g>
      <path d="M3 6.5 h12" />
      <path d="M12.5 4 l3 2.5 -3 2.5" />
      <path d="M17 13.5 h-12" />
      <path d="M7.5 11 l-3 2.5 3 2.5" />
    </g>
  ),
  rules: (
    <g>
      <path d="M10 3 a5 5 0 0 1 5 5 v3.4 l1.7 2.4 H3.3 L5 11.4 V8 a5 5 0 0 1 5 -5 Z" />
      <path d="M8.3 16.3 a1.8 1.8 0 0 0 3.4 0" />
    </g>
  ),
  twin: (
    <g>
      <path d="M10 2.4 L16.5 6.2 v7.6 L10 17.6 3.5 13.8 V6.2 Z" />
      <path d="M10 2.4 v15.2 M3.5 6.2 L10 10 16.5 6.2 M10 10 v7.6" />
    </g>
  ),
  dashboard: (
    <g>
      <line x1="4.2" y1="15.6" x2="4.2" y2="10.5" />
      <line x1="10" y1="15.6" x2="10" y2="5.5" />
      <line x1="15.8" y1="15.6" x2="15.8" y2="8.5" />
      <line x1="2.5" y1="16.6" x2="17.5" y2="16.6" />
    </g>
  ),
  output: (
    <g>
      <path d="M4 3.5 h12 a2.5 2.5 0 0 1 2.5 2.5 v5.5 a2.5 2.5 0 0 1 -2.5 2.5 h-5.4 l-3.6 3.6 v-3.6 H4 a2.5 2.5 0 0 1 -2.5 -2.5 V6 A2.5 2.5 0 0 1 4 3.5 Z" />
    </g>
  ),
  auth: (
    <g>
      <path d="M10 2.4 L16 4.9 v5.6 c0 4 -2.7 6.3 -6 7.4 -3.3 -1.1 -6 -3.4 -6 -7.4 V4.9 Z" />
      <path d="M7.6 9.7 l2 2 2.8 -3.2" />
    </g>
  ),
  edge: (
    <g>
      <path d="M11.2 2.5 L4.8 11.4 h4.2 L8.6 17.5 15.4 8.4 h-4.2 Z" />
    </g>
  ),
};

/** Parte una etiqueta larga en líneas de ~MAX_CHARS caracteres (máx. 3). */
function wrapLabel(label: string, maxChars = MAX_CHARS): string[] {
  const words = label.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (current === '') {
      current = word;
    } else if (`${current} ${word}`.length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current !== '') lines.push(current);
  return lines.slice(0, 3);
}

// ——— Disposición ————————————————————————————————————————————————
/** Separación vertical entre bandas de columnas (disposición horizontal). */
const BAND_GAP = 56;
/** Columnas por banda en la disposición horizontal (banda a banda, 3 por fila). */
const COLS_PER_BAND = 3;

/** Nodo con su posición calculada (coordenadas del viewBox). */
interface NodeBox {
  node: DiagramNodeData;
  x: number;
  y: number;
  /** Capa del flujo (para el stagger de entrada). */
  layer: number;
}

/** Arista con su trazo ya calculado. */
interface EdgeRoute {
  key: string;
  d: string;
  label?: string;
  labelX: number;
  labelY: number;
  labelAnchor: 'start' | 'middle';
}

/** Disposición completa del diagrama (viewBox + cajas + aristas). */
interface DiagramLayout {
  width: number;
  height: number;
  boxes: NodeBox[];
  routes: EdgeRoute[];
}

/**
 * Capa de cada nodo: camino más largo desde un nodo de origen. Los flujos
 * reales (ver `src/data/projects.ts`) son DAGs acíclicos; la relajación
 * iterativa converge y además corta por si alguien añade un ciclo.
 */
function assignLayers(
  nodes: readonly DiagramNodeData[],
  edges: readonly DiagramEdgeData[],
): number[] {
  const indexOf = new Map(nodes.map((node, i) => [node.id, i] as const));
  const layers = new Array<number>(nodes.length).fill(0);
  for (let pass = 0; pass < nodes.length; pass += 1) {
    let changed = false;
    for (const edge of edges) {
      const from = indexOf.get(edge.from);
      const to = indexOf.get(edge.to);
      if (from === undefined || to === undefined) continue;
      if (layers[to] < layers[from] + 1) {
        layers[to] = layers[from] + 1;
        changed = true;
      }
    }
    if (!changed) break;
  }
  return layers;
}

/**
 * Calcula la disposición del diagrama: horizontal en bandas de hasta
 * `COLS_PER_BAND` columnas (desktop, se lee izquierda→derecha y banda a
 * banda por el pasillo entre bandas) o vertical en filas (móvil). Todo en
 * unidades del `viewBox`, así el SVG escala sin perder proporciones.
 */
function buildLayout(diagram: ArchitectureDiagramData, horizontal: boolean): DiagramLayout {
  const { nodes, edges } = diagram;
  const layers = assignLayers(nodes, edges);
  const layerCount = Math.max(1, ...layers) + 1;
  const layerOf = new Map(nodes.map((node, i) => [node.id, layers[i]] as const));

  // Agrupa por capa conservando el orden de `nodes`.
  const groups: DiagramNodeData[][] = Array.from({ length: layerCount }, () => []);
  nodes.forEach((node, i) => groups[layers[i]].push(node));

  const positions = new Map<string, { x: number; y: number }>();
  const boxes: NodeBox[] = [];
  const routes: EdgeRoute[] = [];
  const place = (node: DiagramNodeData, layer: number, x: number, y: number): void => {
    positions.set(node.id, { x, y });
    boxes.push({ node, x, y, layer });
  };

  if (!horizontal) {
    // Móvil: una fila por capa, nodos de la misma capa lado a lado.
    const groupWidths = groups.map((g) => g.length * NODE_W + (g.length - 1) * V_GAP_INNER);
    const width = Math.max(NODE_W, ...groupWidths) + PAD * 2;
    const height = PAD * 2 + layerCount * NODE_H + (layerCount - 1) * V_GAP_Y;
    const centerX = width / 2;
    groups.forEach((group, layer) => {
      const groupW = groupWidths[layer];
      group.forEach((node, i) => {
        place(
          node,
          layer,
          centerX - groupW / 2 + i * (NODE_W + V_GAP_INNER),
          PAD + layer * (NODE_H + V_GAP_Y),
        );
      });
    });
    for (const edge of edges) {
      const from = positions.get(edge.from);
      const to = positions.get(edge.to);
      if (!from || !to) continue;
      const x1 = from.x + NODE_W / 2;
      const y1 = from.y + NODE_H;
      const x2 = to.x + NODE_W / 2;
      const y2 = to.y;
      routes.push({
        key: `${edge.from}->${edge.to}`,
        d: `M ${x1} ${y1} C ${x1} ${y1 + V_ROUTE}, ${x2} ${y2 - V_ROUTE}, ${x2} ${y2}`,
        label: edge.label,
        labelX: (x1 + x2) / 2 + 8,
        labelY: (y1 + y2) / 2 + 3,
        labelAnchor: 'start',
      });
    }
    return { width, height, boxes, routes };
  }

  // Desktop: bandas de hasta 3 columnas (izquierda→derecha, banda a banda).
  const bandCount = Math.ceil(layerCount / COLS_PER_BAND);
  const cols = Math.min(layerCount, COLS_PER_BAND);
  const width = PAD * 2 + cols * NODE_W + (cols - 1) * H_GAP_X;
  const bandHeights = Array.from({ length: bandCount }, (_, band) =>
    Math.max(
      NODE_H,
      ...groups
        .slice(band * COLS_PER_BAND, (band + 1) * COLS_PER_BAND)
        .map((g) => g.length * NODE_H + (g.length - 1) * H_GAP_Y),
    ),
  );
  const height =
    PAD * 2 + bandHeights.reduce((a, b) => a + b, 0) + (bandCount - 1) * BAND_GAP;
  const colX = (layer: number): number =>
    PAD + (layer % COLS_PER_BAND) * (NODE_W + H_GAP_X);
  const bandTop = (band: number): number =>
    PAD + bandHeights.slice(0, band).reduce((a, b) => a + b, 0) + band * BAND_GAP;

  groups.forEach((group, layer) => {
    const band = Math.floor(layer / COLS_PER_BAND);
    const groupH = group.length * NODE_H + (group.length - 1) * H_GAP_Y;
    const top = bandTop(band) + (bandHeights[band] - groupH) / 2;
    group.forEach((node, i) => {
      place(node, layer, colX(layer), top + i * (NODE_H + H_GAP_Y));
    });
  });

  for (const edge of edges) {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    const fromLayer = layerOf.get(edge.from);
    const toLayer = layerOf.get(edge.to);
    if (!from || !to || fromLayer === undefined || toLayer === undefined) continue;
    const key = `${edge.from}->${edge.to}`;
    if (Math.floor(fromLayer / COLS_PER_BAND) === Math.floor(toLayer / COLS_PER_BAND)) {
      // Misma banda: sale por la derecha del origen, entra por la izquierda del destino.
      const x1 = from.x + NODE_W;
      const y1 = from.y + NODE_H / 2;
      const x2 = to.x;
      const y2 = to.y + NODE_H / 2;
      routes.push({
        key,
        d: `M ${x1} ${y1} C ${x1 + H_ROUTE} ${y1}, ${x2 - H_ROUTE} ${y2}, ${x2} ${y2}`,
        label: edge.label,
        labelX: (x1 + x2) / 2,
        labelY: (y1 + y2) / 2 - 7,
        labelAnchor: 'middle',
      });
    } else {
      // Cambio de banda: baja por el pasillo entre bandas y entra por arriba.
      const x1 = from.x + NODE_W / 2;
      const y1 = from.y + NODE_H;
      const x2 = to.x + NODE_W / 2;
      const y2 = to.y;
      const midY = (y1 + y2) / 2;
      routes.push({
        key,
        d: `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
        label: edge.label,
        labelX: (x1 + x2) / 2,
        labelY: midY - 8,
        labelAnchor: 'middle',
      });
    }
  }
  return { width, height, boxes, routes };
}


interface ArchitectureDiagramProps {
  /** Diagrama (nodos/aristas del flujo real del proyecto, ver `src/data/projects.ts`). */
  diagram: ArchitectureDiagramData;
  className?: string;
}

/**
 * Diagrama de arquitectura SVG: nodos rect redondeados con etiqueta y glifo
 * por tipo, aristas cuyo trazo SE DIBUJA al entrar al viewport
 * (`pathLength` 0→1) y, sólo sin reduced-motion y mientras el diagrama está
 * en el viewport, puntos que viajan por las aristas. Con
 * `prefers-reduced-motion` se muestra el diagrama completo estático. Escala
 * con `viewBox`; en móvil (<1024px) la disposición es vertical.
 */
export function ArchitectureDiagram({ diagram, className }: ArchitectureDiagramProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const layout = useMemo(() => buildLayout(diagram, isDesktop), [diagram, isDesktop]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Los puntos viajeros son una animación infinita: sólo existen mientras el
  // diagrama está dentro del viewport (se desmontan al salir de él).
  const inView = useInView(containerRef, { margin: '-48px' });
  const showTravelers = inView && !prefersReducedMotion;

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label={diagram.caption}
        focusable="false"
        className="block h-auto w-full overflow-visible"
      >
        <title>{diagram.caption}</title>

        {/* Aristas: el trazo se dibuja al entrar al viewport (pathLength 0→1, escalonadas). */}
        {layout.routes.map((route, index) => (
          <motion.path
            key={route.key}
            d={route.d}
            fill="none"
            stroke="#7B1D1D"
            strokeWidth={1.4}
            strokeLinecap="round"
            pathLength={1}
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{ duration: 0.7, delay: 0.35 + index * 0.14, ease: EASE }}
          />
        ))}

        {/* Etiquetas de las aristas (MQTT, SSE, 30 frames...). */}
        {layout.routes.map((route) =>
          route.label ? (
            <text
              key={`${route.key}-label`}
              x={route.labelX}
              y={route.labelY}
              textAnchor={route.labelAnchor}
              fontSize={9}
              fill="#C9D7DA"
            >
              {route.label}
            </text>
          ) : null,
        )}

        {/* Puntos viajando por las aristas (nunca con reduced-motion, nunca fuera del viewport). */}
        {showTravelers
          ? layout.routes.map((route, index) => (
              <circle key={`traveler-${route.key}`} r={2.6} fill="#BC3A3A" stroke="none">
                <animateMotion
                  dur={isDesktop ? '1.8s' : '1.2s'}
                  begin={`${0.2 + index * 0.35}s`}
                  repeatCount="indefinite"
                  path={route.d}
                />
              </circle>
            ))
          : null}

        {/* Nodos: rect redondeado + glifo por tipo + etiqueta partida en líneas. */}
        {layout.boxes.map((box) => {
          const lines = wrapLabel(box.node.label);
          return (
            <motion.g
              key={box.node.id}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-48px' }}
              transition={{ duration: 0.45, delay: 0.1 + box.layer * 0.09, ease: EASE }}
            >
              <rect
                x={box.x}
                y={box.y}
                width={NODE_W}
                height={NODE_H}
                rx={12}
                fill="#0C2424"
                stroke="#236B6B"
                strokeWidth={1}
              />
              <g
                transform={`translate(${box.x + 10}, ${box.y + NODE_H / 2 - 10})`}
                fill="none"
                stroke="#BC3A3A"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {GLYPHS[box.node.kind]}
              </g>
              {lines.map((line, i) => (
                <text
                  key={`${i}-${line}`}
                  x={TEXT_CENTER(box.x)}
                  y={box.y + NODE_H / 2 + (i - (lines.length - 1) / 2) * LINE_HEIGHT + 3.5}
                  textAnchor="middle"
                  fontSize={FONT}
                  fill="#FFFFFF"
                >
                  {line}
                </text>
              ))}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}


