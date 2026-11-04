import * as React from 'react';
export type ComboboxOption = string | { value: string; label: string };
export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Texto cuando la búsqueda no arroja resultados. */
  emptyText?: string;
  /** Nombre accesible del campo cuando no hay `label`. Por defecto usa `placeholder`. */
  ariaLabel?: string;
  style?: React.CSSProperties;
}
/** Selector con búsqueda. Filtra al escribir; ítem activo en naranja. Cierra al elegir o click afuera. */
export const Combobox: React.FC<ComboboxProps>;
