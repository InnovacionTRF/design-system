import * as React from 'react';
export interface StatCardProps {
  label: string;
  value: string | number;
  /** Variación ya formateada, p. ej. "8,2% vs. mes anterior". */
  delta?: string;
  /** Dirección de la flecha. */
  trend?: 'up' | 'down' | 'flat';
  /**
   * Si subir es bueno. Independiente de `trend`: en una tasa de error,
   * `trend="down"` con `polarity="down-is-good"` se pinta en verde.
   * Default 'up-is-good'.
   */
  polarity?: 'up-is-good' | 'down-is-good';
  /** Sufijo corto de la métrica, p. ej. "%" u "h". */
  unit?: string;
  /** Serie para el sparkline (mínimo 2 puntos). */
  spark?: number[];
  /** Cursor de puntero si la tarjeta navega. */
  interactive?: boolean;
  style?: React.CSSProperties;
}
/** Tarjeta de métrica: valor tabular, delta con color semántico y sparkline opcional. */
export const StatCard: React.FC<StatCardProps>;
