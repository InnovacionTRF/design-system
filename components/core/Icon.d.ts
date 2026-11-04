import * as React from 'react';

/** Subconjunto curado: intención (clave) → nombre en Lucide (valor). */
export declare const ICONS: Record<string, string>;

export type IconName =
  | 'crear' | 'guardar' | 'editar' | 'eliminar' | 'duplicar' | 'descargar' | 'subir'
  | 'atras' | 'adelante' | 'desplegar' | 'plegar' | 'cerrar' | 'menu' | 'masOpciones' | 'enlaceExterno'
  | 'buscar' | 'filtrar' | 'ordenar' | 'calendario' | 'actualizar'
  | 'info' | 'exito' | 'advertencia' | 'error'
  | 'proceso' | 'modelo' | 'reporte' | 'documento' | 'automatizacion'
  | 'usuario' | 'equipo' | 'ajustes';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Intención del icono, no el nombre de Lucide. Fuera del subconjunto no pinta. */
  name: IconName;
  /** Lado en px. Default 16 (el que esperan Button, Input y Alert). */
  size?: number;
  /** Grosor de trazo. Default 2 — el del sistema; no lo cambie sin motivo. */
  strokeWidth?: number;
  /**
   * Nombre accesible. Sin él el icono es decorativo (`aria-hidden`), que es lo
   * correcto cuando va junto a un texto que ya dice lo mismo.
   */
  title?: string;
}
/**
 * Icono del sistema: envoltorio sobre Lucide 0.460.0 (UMD desde CDN) con un
 * subconjunto curado. Requiere que Lucide esté cargado; vea ICONOGRAPHY.
 */
export const Icon: React.FC<IconProps>;
