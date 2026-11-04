/**
 * Dispersión: cada punto es un registro. `size` codifica una tercera variable
 * y `category` el color.
 */
export interface ScatterPoint {
  label: string;
  x: number;
  y: number;
  /** Tercera variable — controla el radio del punto. */
  size?: number;
  /** Clave de serie que define el color. */
  category?: string;
}

export interface ScatterSeries { key: string; name: string; color: string; }

export interface ScatterChartProps extends React.HTMLAttributes<HTMLDivElement> {
  points: ScatterPoint[];
  series?: ScatterSeries[];
  width?: number;
  height?: number;
  /** Nombre del eje X (se muestra al pie y en el tooltip). */
  xLabel?: string;
  /** Nombre del eje Y. */
  yLabel?: string;
  /** Resumen de ejes al pie. Función para poder reordenar. */
  axesSummary?: (x?: string, y?: string) => React.ReactNode;
}

export function ScatterChart(props: ScatterChartProps): JSX.Element;
