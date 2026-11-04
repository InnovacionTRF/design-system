import * as React from 'react';
export interface PopoverRenderProps { close: () => void; }
export interface PopoverProps {
  /** Elemento que abre el panel. */
  trigger: React.ReactNode;
  /** Contenido, o render-prop que recibe { close }. */
  children: React.ReactNode | ((p: PopoverRenderProps) => React.ReactNode);
  width?: number;
  style?: React.CSSProperties;
}
/** Panel flotante anclado con flecha. Cierra al click afuera. */
export const Popover: React.FC<PopoverProps>;
