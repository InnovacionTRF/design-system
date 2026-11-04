import * as React from 'react';
export interface AccordionItem { title: string; body: React.ReactNode }
export interface AccordionProps {
  items: AccordionItem[];
  /** Índice abierto al montar; null para todos cerrados. */
  defaultOpen?: number | null;
  /** Permite varios paneles abiertos a la vez. Default false. */
  multiple?: boolean;
  style?: React.CSSProperties;
}
/** Acordeón. Encabezado activo en naranja suave, chevron que rota; alto animado con grid-template-rows. */
export const Accordion: React.FC<AccordionProps>;
