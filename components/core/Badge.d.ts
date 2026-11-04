/**
 * Compact pill-shaped status label with an optional leading dot.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. Default "neutral". */
  tone?: "neutral" | "orange" | "success" | "warning" | "info" | "danger";
  /** Show a leading status dot in the current color. */
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
