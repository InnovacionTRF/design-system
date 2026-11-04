/**
 * Confirmación reversible: la acción se ejecuta ya y se ofrece deshacer durante
 * unos segundos. Preferible a un diálogo cuando se puede revertir.
 */
export interface UndoToastProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  /** Qué acaba de pasar, en pasado: "Proceso archivado". */
  message: string;
  undoLabel?: string;
  /** Nombre accesible del botón de cierre. Default "Cerrar aviso". */
  dismissLabel?: string;
  onUndo?: () => void;
  onDismiss?: () => void;
  /** Ms antes de cerrarse solo. Default 4500; 0 lo deja fijo. */
  duration?: number;
}

export function UndoToast(props: UndoToastProps): JSX.Element | null;
