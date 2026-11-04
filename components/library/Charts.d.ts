import * as React from 'react';
export interface Series {
  name: string;
  /** Color de la serie. Prefiera el token: `var(--trf-series-N)`. */
  color: string;
  vals: number[];
  /**
   * Marca la serie principal, que se dibuja con trazo más grueso (2,6 vs. 2).
   * El énfasis es semántico y explícito: NO se deduce del color, para que pasar
   * el token de marca no lo active por accidente ni pasarlo mal lo desactive.
   */
  primary?: boolean;
}
export interface Datum { name: string; val: number; color?: string; }

export interface LineChartProps {
  series: Series[]; labels: string[]; yMax?: number; months?: string[];
  /**
   * Nombre accesible del gráfico. **Descríbalo**: cuatro gráficas en un panel
   * que dicen todas "Serie temporal" no aportan nada a un lector de pantalla.
   */
  label?: string;
}
/** Serie(s) temporal(es) con grilla hairline, ejes token Label y tooltip al hover. */
export const LineChart: React.FC<LineChartProps>;

export interface BarChartProps { data: Datum[]; yMax?: number; /** Nombre accesible: describa ESTA gráfica. */ label?: string; }
/** Comparación de una métrica entre categorías. */
export const BarChart: React.FC<BarChartProps>;

export interface DonutChartProps { data: Datum[]; size?: number; /** Nombre accesible: describa ESTA gráfica. */ label?: string; /** Rótulo bajo el total. Default "total". */ totalLabel?: string; }
/** Composición de un total en pocas partes (2–5). */
export const DonutChart: React.FC<DonutChartProps>;

export interface SparklineProps { vals: number[]; color?: string; width?: number; height?: number; /** Nombre accesible: describa ESTA micro-tendencia. */ label?: string; }
/** Micro-tendencia comprimida junto a un KPI. */
export const Sparkline: React.FC<SparklineProps>;
