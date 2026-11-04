/**
 * Barras apiladas: aporte de cada serie al total de cada período.
 */
export interface StackedSeries {
  /** Clave dentro de `values`. */
  key: string;
  /** Nombre visible en la leyenda. */
  name: string;
  /** Color de la serie (usar la paleta terciaria de marca). */
  color: string;
}

export interface StackedDatum {
  /** Etiqueta del eje X (mes, semana…). */
  label: string;
  /** Valor por cada `series[].key`. */
  values: Record<string, number>;
}

export interface StackedBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: StackedDatum[];
  series: StackedSeries[];
  /** Alto del área de barras en px. Default 190. */
  height?: number;
}

export function StackedBarChart(props: StackedBarChartProps): JSX.Element;
