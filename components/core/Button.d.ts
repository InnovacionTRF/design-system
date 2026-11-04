import { ComponentType } from "react";

/**
 * Transfiriendo primary control. One primary button per view; the rest are
 * secondary or ghost. Hover lifts 1px, press sinks to scale(0.97).
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. Default "primary". */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Control height. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Leading icon component (e.g. a lucide icon). */
  icon?: ComponentType<{ size?: number; strokeWidth?: number }>;
  /** Trailing icon component. */
  iconRight?: ComponentType<{ size?: number; strokeWidth?: number }>;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
  /** Nombre accesible del spinner. Default "Procesando". */
  loadingLabel?: string;
  /** Full-width block button. */
  full?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
