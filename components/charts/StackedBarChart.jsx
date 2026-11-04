import React from "react";
import { int } from "../library/format.js";

/**
 * Barras apiladas: aporte de cada serie al total de cada período.
 * El hover atenúa las demás columnas. Estilos en css/charts.css.
 */
export function StackedBarChart({ data = [], series = [], height = 190, className = "", ...rest }) {
  const [hover, setHover] = React.useState(null);
  const totals = data.map((d) => series.reduce((a, s) => a + (d.values[s.key] || 0), 0));
  const max = Math.max(1, ...totals);
  return (
    <div className={`trf-stack ${className}`.trim()} {...rest}>
      <div className="trf-stack__row" style={{ height }} onMouseLeave={() => setHover(null)}>
        {data.map((d, i) => (
          <div
            key={d.label}
            className="trf-stack__col trf-focusable"
            data-hot={hover === i ? "" : undefined}
            tabIndex={0}
            role="button"
            aria-label={`${d.label}: ${int(totals[i])}`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <span className="trf-stack__total">{int(totals[i])}</span>
            <div
              className="trf-stack__bars"
              data-dim={hover !== null && hover !== i ? "" : undefined}
              style={{ height: `${(totals[i] / max) * 100}%` }}
            >
              {series.map((s) => {
                const v = d.values[s.key] || 0;
                return (
                  <div
                    key={s.key}
                    title={`${s.name}: ${int(v)}`}
                    style={{ height: `${(v / totals[i]) * 100}%`, background: s.color }}
                  />
                );
              })}
            </div>
            <span className="trf-stack__label">{d.label}</span>
          </div>
        ))}
      </div>
      <div className="trf-legend">
        {series.map((s) => (
          <span key={s.key} className="trf-legend__item">
            <span className="trf-legend__swatch" style={{ background: s.color }} />{s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
