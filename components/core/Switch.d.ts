/**
 * On/off switch. Track turns orange when checked.
 */
export interface SwitchProps {
  /** Checked state (controlled). */
  checked?: boolean;
  /** Called with the next boolean when toggled. */
  onChange?: (next: boolean) => void;
  /** Optional trailing label. */
  label?: string;
  /** Nombre accesible cuando no hay `label` visible. Default "Alternar". */
  toggleLabel?: string;
  disabled?: boolean;
  id?: string;
  style?: object;
}

export function Switch(props: SwitchProps): JSX.Element;
