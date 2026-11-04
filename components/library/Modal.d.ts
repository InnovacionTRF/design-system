import * as React from 'react';
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Nodos de acción alineados a la derecha. */
  footer?: React.ReactNode;
  width?: number;
  /** Nivel del encabezado del título, 1–6. Default 2 — no se cablea: un diálogo no siempre cuelga del mismo nivel de la página. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Etiqueta accesible del botón de cierre. Default "Cerrar". */
  closeLabel?: string;
  style?: React.CSSProperties;
}
/** Diálogo modal con título, cuerpo y pie de acciones. Se compone sobre la primitiva `Dialog`. */
export const Modal: React.FC<ModalProps>;
