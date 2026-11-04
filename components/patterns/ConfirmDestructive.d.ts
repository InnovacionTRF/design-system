/**
 * Confirmación destructiva: obliga a escribir el identificador exacto antes de
 * habilitar el botón. La acción irreversible nunca queda a un solo clic.
 */
export interface ConfirmDestructiveProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title: string;
  description: string;
  /** Texto exacto que el usuario debe escribir (normalmente el ID del registro). */
  confirmPhrase: string;
  /** Etiqueta del botón destructivo. Default "Eliminar". */
  confirmLabel?: string;
  /** Etiqueta del botón de cancelar. Default "Cancelar". */
  cancelLabel?: string;
  /** Construye la instrucción del campo. Default: «Escriba ‹frase› para confirmar». */
  promptLabel?: (confirmPhrase: string) => React.ReactNode;
  /** Nivel del encabezado del título, 1–6. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function ConfirmDestructive(props: ConfirmDestructiveProps): JSX.Element | null;
