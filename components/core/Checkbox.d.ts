export interface CheckboxProps {
  /** Marcado (controlado). */
  checked?: boolean;
  /** Estado parcial — aria-checked="mixed", para "seleccionar todo" incompleto. */
  indeterminate?: boolean;
  /** Se llama con el próximo boolean al alternar. */
  onChange?: (next: boolean) => void;
  /** Etiqueta al lado del control; conmuta al hacer clic, igual que Switch. */
  label?: string;
  disabled?: boolean;
  id?: string;
  style?: object;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
