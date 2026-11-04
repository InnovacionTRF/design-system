/**
 * Embudo de conversión etapa a etapa. La intensidad del naranja crece con la
 * pérdida acumulada; el ancho es proporcional a la primera etapa.
 */
export interface FunnelStep {
  /** Nombre de la etapa. */
  label: string;
  /** Valor absoluto de la etapa. */
  value: number;
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Etapas en orden descendente. */
  steps: FunnelStep[];
}

export function FunnelChart(props: FunnelChartProps): JSX.Element;
