import * as React from 'react';
export type SelectOption = string | { value: string; label: string };
export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}
/** Selector desplegable. Panel con fade + subida; ítem activo en naranja. Cierra al elegir o click afuera. */
export const Select: React.FC<SelectProps>;
