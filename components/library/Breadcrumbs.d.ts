import * as React from 'react';
export type Crumb = string | { label: string; href?: string };
export interface BreadcrumbsProps {
  /** Etiqueta del <nav>. Default "Ruta". */
  navLabel?: string;
  items: Crumb[];
  /** Intercepta la navegación (SPA). */
  onNavigate?: (item: { label: string; href?: string }, index: number) => void;
  style?: React.CSSProperties;
}
/** Ruta de migas; el nivel actual va en gris fuerte, sin enlace. */
export const Breadcrumbs: React.FC<BreadcrumbsProps>;
