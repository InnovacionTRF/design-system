import { ComponentType } from "react";

/**
 * Text input with an always-visible label. Errors say what happened and how to
 * fix it. Focus draws the orange ring; optional leading icon turns orange on focus.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the field (always visible). */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message; overrides hint and turns the field red. */
  error?: string;
  /** Leading icon component (e.g. a lucide icon). */
  icon?: ComponentType<{ size?: number; strokeWidth?: number; style?: object }>;
}

export function Input(props: InputProps): JSX.Element;
