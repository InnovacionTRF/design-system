import { ComponentType, ReactNode } from "react";

/**
 * Inline feedback banner with a colored left bar and optional leading icon.
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic tone. Default "info". */
  tone?: "info" | "success" | "warning" | "danger";
  /** Optional bold title line. */
  title?: string;
  /** Optional leading icon component (e.g. a lucide icon). */
  icon?: ComponentType<{ size?: number; strokeWidth?: number; style?: object }>;
  children?: ReactNode;
}

export function Alert(props: AlertProps): JSX.Element;
