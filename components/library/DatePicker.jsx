import React from "react";
import { MESES_CORTOS, MESES_LARGOS, DIAS_SEMANA, cellsOfMonth, initialFocusedDay, useCalendarGrid } from "./calendar.js";
// DatePicker · Transfiriendo. Calendario lunes→domingo, día activo en naranja.
// Estilos en css/library.css. El panel cerrado se desmonta (hidden).
// Roving tabindex: un solo día en tabIndex=0 (el enfocado), el resto -1 —
// mismo mecanismo que core/Tabs.jsx, factorizado en ./calendar.js.
export function DatePicker({
  value, onChange, placeholder = "Elegir fecha",
  dialogLabel = "Elegir fecha",
  prevMonthLabel = "Mes anterior", nextMonthLabel = "Mes siguiente",
  dayLabel = (d, mes, anio) => `${d} ${mes} ${anio}`,
  className = "", style, ...rest
}) {
  const now = new Date();
  const init = value || { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState({ y: init.y, m: init.m });
  const dim = new Date(view.y, view.m + 1, 0).getDate();
  const first = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const [focusedDay, setFocusedDay] = React.useState(() => initialFocusedDay(view, value));
  const { gridRef, onKeyDown } = useCalendarGrid(dim, first, focusedDay, setFocusedDay);
  const ref = React.useRef(null);
  const uid = React.useId();

  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  // Recalcula el día enfocado al abrir o al cambiar de mes, para que siempre
  // caiga dentro del mes visible.
  React.useEffect(() => { setFocusedDay(initialFocusedDay(view, value)); }, [view.y, view.m]);

  const shift = (n) => {
    let m = view.m + n, y = view.y;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setView({ y, m });
  };
  const label = value ? `${value.d} ${MESES_CORTOS[value.m]} ${value.y}` : placeholder;

  return (
    <div ref={ref} className={`trf-pop ${className}`.trim()} style={style} {...rest}>
      <button
        type="button"
        className="trf-trigger trf-focusable"
        aria-expanded={open}
        aria-controls={uid}
        aria-haspopup="dialog"
        data-placeholder={value ? undefined : ""}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        <span className="trf-trigger__caret" aria-hidden="true">▤</span>
      </button>
      <div id={uid} className="trf-cal" role="dialog" aria-label={dialogLabel} style={{ width: 268 }} hidden={!open}>
        <div className="trf-cal__head">
          <button type="button" className="trf-cal__nav trf-focusable" onClick={() => shift(-1)} aria-label={prevMonthLabel}>‹</button>
          <span className="trf-cal__month">{MESES_LARGOS[view.m]} {view.y}</span>
          <button type="button" className="trf-cal__nav trf-focusable" onClick={() => shift(1)} aria-label={nextMonthLabel}>›</button>
        </div>
        <div className="trf-cal__grid" aria-hidden="true">
          {DIAS_SEMANA.map((w, i) => <span key={i} className="trf-cal__wd">{w}</span>)}
        </div>
        <div ref={gridRef} className="trf-cal__grid" role="grid" onKeyDown={onKeyDown}>
          {cellsOfMonth(view.y, view.m).map((d, i) => {
            if (d === null) return <span key={`b${i}`} />;
            const on = value && value.y === view.y && value.m === view.m && value.d === d;
            return (
              <button
                key={d}
                type="button"
                data-day={d}
                className="trf-cal__day trf-focusable"
                role="gridcell"
                tabIndex={d === focusedDay ? 0 : -1}
                aria-selected={on ? "true" : undefined}
                aria-label={dayLabel(d, MESES_LARGOS[view.m], view.y)}
                onClick={() => { setFocusedDay(d); onChange && onChange({ y: view.y, m: view.m, d }); setOpen(false); }}
              >{d}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
