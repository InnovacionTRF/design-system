import * as React from 'react';
export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onToggle'> {
  /** Estado seleccionado: naranja sólido + check. */
  selected?: boolean;
  /** Callback al hacer click. */
  onToggle?: () => void;
  children?: React.ReactNode;
}
/** Chip de filtro (selección múltiple). */
export const Chip: React.FC<ChipProps>;
