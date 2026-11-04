import { ComponentType } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label rendered above the field (always visible). */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message; overrides hint and turns the field red. */
  error?: string;
  rows?: number;
  maxLength?: number;
  /** Muestra "n / maxLength" alineado a la derecha del hint. Se omite si hay error. */
  showCount?: boolean;
}

export function Textarea(props: TextareaProps): JSX.Element;
