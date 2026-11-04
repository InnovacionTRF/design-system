import * as React from 'react';
export interface DataGridColumn {
  key: string;
  label: string;
  /** Alineación de la celda; 'right' activa cifras tabulares. */
  align?: 'left' | 'right';
  /** Renderiza la columna en monoespaciada (IDs, códigos). */
  mono?: boolean;
}
export interface DataGridProps {
  columns: DataGridColumn[];
  rows: Array<Record<string, any>>;
  /**
   * Orden inicial. Si se omite, la tabla se renderiza **sin ordenar**, en el orden
   * en que llegaron las filas — a menudo el significativo (recientes primero,
   * ranking del servidor). El encabezado cicla asc → desc → sin ordenar.
   */
  defaultSort?: { key: string; dir: 'asc' | 'desc' } | null;
  /** Personaliza una celda (badges, formatos). Devuelva undefined para el valor crudo. */
  renderCell?: (key: string, value: any, row: Record<string, any>) => React.ReactNode;
  style?: React.CSSProperties;
}
/** Tabla ordenable: el encabezado cicla asc → desc → sin ordenar. Flecha naranja en la columna activa. */
export const DataGrid: React.FC<DataGridProps>;
