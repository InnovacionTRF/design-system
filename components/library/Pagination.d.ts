import * as React from 'react';
export interface PaginationProps {
  total: number;
  page: number;
  onChange?: (page: number) => void;
  perPage?: number;
  /** Etiqueta del `<nav>`. Default "Paginación". */
  navLabel?: string;
  /** Nombres accesibles de las flechas. */
  prevLabel?: string;
  nextLabel?: string;
  /** Nombre accesible de cada número. Default `Página ${n}`. */
  pageLabel?: (n: number) => string;
  /**
   * Frase de resumen. **Función, no plantilla concatenada**: así se puede
   * pluralizar y reordenar. Default `Mostrando ${from}–${to} de ${count}`.
   */
  summary?: (from: number, to: number, count: number) => React.ReactNode;
  style?: React.CSSProperties;
}
/** Paginación con página activa naranja y colapso en elipsis. */
export const Pagination: React.FC<PaginationProps>;
