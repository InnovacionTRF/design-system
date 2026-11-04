import * as React from 'react';

export interface DialogProps {
  open: boolean;
  /** Se llama con Escape, con clic en el scrim y desde el contenido. */
  onClose?: () => void;
  /** id del elemento que titula el diálogo (aria-labelledby). */
  labelledBy?: string;
  /** id del elemento que lo describe (aria-describedby). */
  describedBy?: string;
  /** Ancho del contenedor en px o cualquier longitud CSS. */
  width?: number | string;
  /** Cerrar al hacer clic en el scrim. Default true. */
  closeOnOverlay?: boolean;
  /** Cerrar con Escape. Default true. */
  closeOnEscape?: boolean;
  overlayClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/**
 * Primitiva de diálogo modal: scrim tokenizado, trampa de foco, Escape, bloqueo
 * de scroll y restauración del foco. No se usa suelta en pantallas — `Modal` y
 * `ConfirmDestructive` se componen sobre ella.
 * Marque un control con `data-autofocus` para dirigir el foco inicial.
 */
export const Dialog: React.FC<DialogProps>;

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Nivel del encabezado, 1–6. Default 2. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
/** Encabezado de diálogo con nivel configurable, para no cablear `<h2>`. */
export const DialogTitle: React.FC<DialogTitleProps>;
