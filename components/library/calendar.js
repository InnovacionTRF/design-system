import React from "react";
// calendar.js · Transfiriendo. Utilidades compartidas de DatePicker/DateRangePicker:
// cálculo de celdas del mes, nombres de mes/día, y el hook de roving tabindex
// (mismo mecanismo que core/Tabs.jsx: un solo tabIndex=0 activo, flechas mueven
// el foco con preventDefault + .focus() explícito). Antes vivía duplicado
// carácter por carácter en los dos archivos (dpCells/drCells, DP_MS/DR_MS…),
// divergiendo ya en el prefijo de las constantes — el mismo riesgo que format.js
// resolvió para el locale.
export const MESES_CORTOS = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
export const MESES_LARGOS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
export const DIAS_SEMANA = ["L","M","M","J","V","S","D"];

export function cellsOfMonth(y, m) {
  const first = (new Date(y, m, 1).getDay() + 6) % 7; // lunes = 0
  const dim = new Date(y, m + 1, 0).getDate();
  const out = [];
  for (let i = 0; i < first; i++) out.push(null);
  for (let d = 1; d <= dim; d++) out.push(d);
  return out;
}

/**
 * Día inicial de foco al abrir el calendario o cambiar de mes: el seleccionado
 * si cae en el mes visible, si no hoy si cae en el mes visible, si no el día 1.
 */
export function initialFocusedDay(view, selected, today = new Date()) {
  if (selected && selected.y === view.y && selected.m === view.m) return selected.d;
  if (today.getFullYear() === view.y && today.getMonth() === view.m) return today.getDate();
  return 1;
}

/**
 * Hook de roving tabindex para una grilla de días lunes→domingo (7 columnas).
 * dim = días del mes visible. Devuelve { focusedDay, setFocusedDay, gridRef, onKeyDown }.
 * Alcance mínimo (APG): una flecha que saldría del mes visible no hace nada —
 * no navega de mes automáticamente. Home/End saltan dentro de la SEMANA visible
 * del día enfocado, no al día 1 / último día del mes.
 */
/**
 * Hook de roving tabindex para una grilla de días lunes→domingo (7 columnas).
 * dim = días del mes visible; first = columna (0=lunes) del día 1, la MISMA
 * que calcula cellsOfMonth — Home/End necesitan la columna real de cada día,
 * no asumir que el día 1 cae en lunes. Devuelve { gridRef, onKeyDown, focusDay }.
 * Alcance mínimo (APG): una flecha que saldría del mes visible no hace nada —
 * no navega de mes automáticamente. Home/End saltan dentro de la SEMANA visible
 * del día enfocado, no al día 1 / último día del mes.
 */
export function useCalendarGrid(dim, first, focusedDay, setFocusedDay) {
  const gridRef = React.useRef(null);
  const columnOf = (d) => (first + d - 1) % 7;

  const focusDay = (d) => {
    setFocusedDay(d);
    // El nuevo día aún no tiene tabIndex=0 en este mismo tick (depende del
    // re-render), así que se enfoca por selector tras el commit.
    requestAnimationFrame(() => {
      gridRef.current?.querySelector(`[data-day="${d}"]`)?.focus();
    });
  };

  const onKeyDown = (e) => {
    if (focusedDay == null) return;
    let next = null;
    if (e.key === "ArrowRight") next = focusedDay + 1;
    else if (e.key === "ArrowLeft") next = focusedDay - 1;
    else if (e.key === "ArrowDown") next = focusedDay + 7;
    else if (e.key === "ArrowUp") next = focusedDay - 7;
    else if (e.key === "Home") next = focusedDay - columnOf(focusedDay);
    else if (e.key === "End") next = focusedDay + (6 - columnOf(focusedDay));
    if (next === null) return;
    if (next < 1 || next > dim) { e.preventDefault(); return; } // fuera del mes: sin navegación automática
    e.preventDefault();
    focusDay(next);
  };

  return { gridRef, onKeyDown, focusDay };
}
