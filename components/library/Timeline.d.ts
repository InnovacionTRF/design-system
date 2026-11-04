import * as React from 'react';
export interface TimelineItem {
  title: string;
  /** Marca temporal ya formateada; se muestra en monoespaciada. */
  time: string;
  body?: string;
  author?: string;
  /** Glifo del hito. Default '●'. */
  icon?: string;
  tone?: 'accent' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';
}
export interface TimelineProps {
  items: TimelineItem[];
  style?: React.CSSProperties;
}
/** Actividad cronológica: hito con tono semántico, línea de conexión y marca temporal en mono. */
export const Timeline: React.FC<TimelineProps>;
