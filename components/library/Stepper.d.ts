import * as React from 'react';
export type Step = string | { label: string };
export interface StepperProps {
  steps: Step[];
  /** Índice del paso actual (0-based). Anteriores se marcan completados. */
  current?: number;
  style?: React.CSSProperties;
}
/** Indicador de progreso por pasos. */
export const Stepper: React.FC<StepperProps>;
