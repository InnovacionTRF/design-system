import React from "react";
import { MESES_CORTOS, MESES_LARGOS, DIAS_SEMANA, cellsOfMonth, initialFocusedDay, useCalendarGrid } from "./calendar.js";
// DateRangePicker · Transfiriendo. Rango con extremos naranja y tramo intermedio suave.
// Estilos en css/library.css. El panel cerrado se desmonta (hidden).
// Roving tabindex compartido con DatePicker vía ./calendar.js: el foco se
// mueve con flechas/Home/End; la selección de rango (pick) sigue siendo
// cosa de onClick/Enter sobre el día enfocado.
const drNum = (d) => (d ? d.y * 10000 + d.m * 100 + d.d : null);

export function DateRangePicker({
  value = {}, onChange, presets = true,
  dialogLabel = "Elegir rango de fechas",
  prevMonthLabel = "Mes anterior", nextMonthLabel = "Mes siguiente",
  dayLabel = (d, mes, anio) => `${d} ${mes} ${anio}`,
  emptyLabel = "Elegir rango",
  className = "", style, ...rest
}) {
  const { from, to } = value;
  const now = new Date();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState({
    y: (from || { y: now.getFullYear() }).y,
    m: (from || { m: now.getMonth() }).m,
  });
  const dim = new Date(view.y, view.m + 1, 0).getDate();
  const first = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const [focusedDay, setFocusedDay] = React.useState(() => initialFocusedDay(view, from));
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

  React.useEffect(() => { setFocusedDay(initialFocusedDay(view, from)); }, [view.y, view.m]);

  const shift = (n) => {
    let m = view.m + n, y = view.y;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setView({ y, m });
  };

  const pick = (d) => {
    const c = { y: view.y, m: view.m, d };
    setFocusedDay(d);
    if (!from || (from && to)) { onChange && onChange({ from: c, to: null }); return; }
    if (drNum(c) < drNum(from)) { onChange && onChange({ from: c, to: from }); return; }
    onChange && onChange({ from, to: c });
  };

  const fmt = (d) => (d ? `${d.d} ${MESES_CORTOS[d.m]}` : "");
  const label = from ? (to ? `${fmt(from)} – ${fmt(to)}` : `${fmt(from)} – …`) : emptyLabel;

  const presetList = [
    { label: "Últimos 7 días", get: () => ({ from: { y: view.y, m: view.m, d: 21 }, to: { y: view.y, m: view.m, d: 28 } }) },
    { label: "Este mes", get: () => ({ from: { y: view.y, m: view.m, d: 1 }, to: { y: view.y, m: view.m, d: new Date(view.y, view.m + 1, 0).getDate() } }) },
    { label: "Este semestre", get: () => ({ from: { y: view.y, m: 0, d: 1 }, to: { y: view.y, m: 5, d: 30 } }) },
  ];

  return (
    <div ref={ref} className={`trf-pop ${className}`.trim()} style={style} {...rest}>
      <button
        type="button"
        className="trf-trigger trf-focusable"
        aria-expanded={open}
        aria-controls={uid}
        aria-haspopup="dialog"
        data-placeholder={from ? undefined : ""}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        <span className="trf-trigger__caret" aria-hidden="true">▤</span>
      </button>
      <div id={uid} className="trf-cal" role="dialog" aria-label={dialogLabel} style={{ width: 292 }} hidden={!open}>
        {presets && (
          <div className="trf-cal__presets">
            {presetList.map((p) => (
              <button key={p.label} type="button" className="trf-cal__preset trf-focusable"
                onClick={() => onChange && onChange(p.get())}>{p.label}</button>
            ))}
          </div>
        )}
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
            const n = drNum({ y: view.y, m: view.m, d });
            const f = drNum(from), t = drNum(to);
            const isEnd = n === f || n === t;
            const inRange = f && t && n > f && n < t;
            return (
              <button
                key={d}
                type="button"
                data-day={d}
                className="trf-cal__day trf-focusable"
                role="gridcell"
                tabIndex={d === focusedDay ? 0 : -1}
                aria-selected={isEnd ? "true" : undefined}
                data-in-range={inRange ? "" : undefined}
                aria-label={dayLabel(d, MESES_LARGOS[view.m], view.y)}
                onClick={() => pick(d)}
              >{d}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
