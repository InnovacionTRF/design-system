import * as React from 'react';
// DateValue se declara UNA vez, en DatePicker.d.ts, y se reexporta aquí. Declararla
// en los dos archivos hacía que el compilador de adherencia emitiera la misma regla
// dos veces, una por declaración.
import type { DateValue } from './DatePicker';
export type { DateValue };
export interface DateRange { from?: DateValue | null; to?: DateValue | null }
export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (value: DateRange) => void;
  /** Muestra atajos (últimos 7 días, este mes, este semestre). Default true. */
  presets?: boolean;
  /** Nombre accesible del panel. Default "Elegir rango de fechas". */
  dialogLabel?: string;
  prevMonthLabel?: string;
  nextMonthLabel?: string;
  dayLabel?: (d: number, mes: string, anio: number) => string;
  /** Texto del disparador sin selección. Default "Elegir rango". */
  emptyLabel?: string;
  style?: React.CSSProperties;
}
/** Rango de fechas. Extremos en naranja sólido, tramo intermedio en naranja suave. Segundo click cierra el rango. */
export const DateRangePicker: React.FC<DateRangePickerProps>;
