import * as React from 'react';
export interface TooltipProps {
  /** Texto breve; nunca información esencial. */
  label: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  style?: React.CSSProperties;
}
/** Tooltip de fondo oscuro; aparece al hover/focus con fade + desplazamiento. */
export const Tooltip: React.FC<TooltipProps>;
