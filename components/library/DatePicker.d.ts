import * as React from 'react';
/** Fecha simple: año, mes (0–11) y día. */
export interface DateValue { y: number; m: number; d: number }
export interface DatePickerProps {
  value?: DateValue;
  onChange?: (value: DateValue) => void;
  placeholder?: string;
  /** Nombre accesible del panel. Default "Elegir fecha". */
  dialogLabel?: string;
  prevMonthLabel?: string;
  nextMonthLabel?: string;
  /** Nombre accesible de cada día. Default `${d} ${mes} ${anio}`. */
  dayLabel?: (d: number, mes: string, anio: number) => string;
  style?: React.CSSProperties;
}
/** Calendario que abre desde el campo. Semana lunes→domingo, día activo en naranja. */
export const DatePicker: React.FC<DatePickerProps>;
