import * as React from 'react';
export interface Toast {
  tone?: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  body?: string;
  /** Acción opcional (p. ej. Deshacer). */
  action?: { label: string; onClick?: () => void };
  /** ms antes de autocerrar. Default 4200; 0 = persistente. */
  duration?: number;
}
export interface ToasterProps {
  /** Etiqueta de la región live. Default "Notificaciones". */
  regionLabel?: string;
  /** Nombre accesible del botón de cierre. Default "Cerrar notificación". */
  closeLabel?: string;
}
export interface ToasterHandle {
  push: (t: Toast) => number;
  remove: (id: number) => void;
}
/** Contenedor de toasts (abajo-derecha). Use ref.current.push({...}). */
export const Toaster: React.ForwardRefExoticComponent<React.RefAttributes<ToasterHandle>>;
