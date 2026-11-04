/**
 * Barra de cambios sin guardar, anclada al pie del formulario mientras esté sucio.
 */
export interface UnsavedBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Solo se renderiza cuando es true. */
  dirty: boolean;
  /** Texto del aviso. Default "Tiene cambios sin guardar." */
  message?: string;
  onDiscard?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  /** Etiqueta del botón de descarte. Default "Descartar". */
  discardLabel?: string;
}

export function UnsavedBar(props: UnsavedBarProps): JSX.Element | null;
