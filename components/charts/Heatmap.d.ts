/**
 * Mapa de calor con intensidad en escala de naranja. Filas = categorías,
 * columnas = períodos.
 */
export interface HeatmapRow {
  name: string;
  /** Un valor por cada entrada de `columns`. */
  values: number[];
}

export interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Etiquetas de columna (días, semanas…). */
  columns: string[];
  rows: HeatmapRow[];
  /** Extremos de la leyenda. Defaults "Menos" / "Más". */
  lessLabel?: string;
  moreLabel?: string;
}

export function Heatmap(props: HeatmapProps): JSX.Element;
