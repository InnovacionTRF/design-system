export interface RadioGroupItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  items: RadioGroupItem[];
  /** Id del ítem seleccionado. */
  value?: string;
  onChange?: (id: string) => void;
  /** aria-label del role="radiogroup". */
  label?: string;
  style?: object;
}

export interface RadioProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  style?: object;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element;
export function Radio(props: RadioProps): JSX.Element;
