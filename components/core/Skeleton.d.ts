/**
 * Shimmering loading placeholder. Los keyframes (`trf-shimmer`) vienen en
 * `tokens/animation.css`, que entra por `styles.css`: no hay que declarar nada.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
}

export function Skeleton(props: SkeletonProps): JSX.Element;
