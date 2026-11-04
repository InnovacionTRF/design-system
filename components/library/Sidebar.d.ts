import * as React from 'react';
export interface SidebarItem { label: string; value?: string; }
export interface SidebarProps {
  items: SidebarItem[];
  active?: string;
  onSelect?: (value: string) => void;
  /** Controlado: colapsado o expandido. Omitir para estado interno. */
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  open?: boolean;
  /** Cierra el drawer: clic en el scrim, Escape, o el botón .trf-sidebar__burger del consumidor. */
  onClose?: () => void;
  brand?: string;
  /** Etiquetas del botón de colapso. Defaults "Expandir navegación" / "Colapsar navegación". */
  expandLabel?: string;
  collapseLabel?: string;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Navegación lateral oscura, colapsable; ítem activo con acento naranja. */
export const Sidebar: React.FC<SidebarProps>;
