/**
 * Surface container. Static by default; lifts + shows a hand cursor ONLY when
 * the whole card is clickable (has `onClick`). `accent` for the single
 * highlighted card.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @deprecated No longer triggers the lift by itself — elevation now derives
   * solely from `onClick`. Pass `onClick` instead. Kept for one cycle so
   * existing calls don't break; logs a console warning once. Removed in the
   * next major version.
   */
  hover?: boolean;
  /** Soft-orange highlighted variant. Max one per screen. */
  accent?: boolean;
  /** Inner padding in px. Default 20. */
  padding?: number;
  /**
   * Al pasarlo, la tarjeta se vuelve operable: role="button", tabIndex 0 y
   * activación con Enter y Espacio.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card(props: CardProps): JSX.Element;
