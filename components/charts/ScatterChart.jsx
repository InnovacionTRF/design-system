import React from "react";
import { int } from "../library/format.js";

/**
 * Dispersión: cada punto es un registro. `size` codifica una tercera variable
 * y `category` el color. Estilos en css/charts.css.
 */
export function ScatterChart({ points = [], series = [], width = 560, height = 240, xLabel, yLabel, axesSummary = (x, y) => `Eje X: ${x} · Eje Y: ${y}`, className = "", ...rest }) {
  const [hover, setHover] = React.useState(null);
  const pad = { l: 44, r: 12, t: 12, b: 30 };
  const xMax = Math.max(1, ...points.map((p) => p.x));
  const yMax = Math.max(1, ...points.map((p) => p.y));
  const sMax = Math.max(1, ...points.map((p) => p.size || 1));
  const px = (x) => pad.l + (x / xMax) * (width - pad.l - pad.r);
  const py = (y) => height - pad.b - (y / yMax) * (height - pad.t - pad.b);
  const colorOf = (cat) => (series.find((s) => s.key === cat) || {}).color || "var(--trf-action)";
  const ticks = [0, .25, .5, .75, 1];

  return (
    <div className={`trf-scatter ${className}`.trim()} {...rest}>
      <div className="trf-scatter__plot" onMouseLeave={() => setHover(null)}>
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="trf-chart__svg">
          {ticks.map((t) => {
            const y = pad.t + t * (height - pad.t - pad.b);
            return (
              <g key={t}>
                <line x1={pad.l} y1={y} x2={width - pad.r} y2={y} stroke="var(--trf-grid)" strokeWidth="1" />
                <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--trf-axis-label)">
                  {Math.round(yMax * (1 - t))}
                </text>
              </g>
            );
          })}
          {points.map((p, i) => (
            <circle
              key={i}
              className="trf-scatter__dot"
              cx={px(p.x)} cy={py(p.y)} r={5 + ((p.size || 1) / sMax) * 9}
              fill={colorOf(p.category)} fillOpacity={hover === null || hover === i ? .78 : .28}
              stroke={colorOf(p.category)} strokeWidth="1.5"
              tabIndex={0}
              role="button"
              aria-label={`${p.label || ""}: ${xLabel || "x"} ${int(p.x)}, ${yLabel || "y"} ${int(p.y)}`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
            />
          ))}
        </svg>
        {hover !== null && (
          <div className="trf-scatter__tip" style={{ left: `${(px(points[hover].x) / width) * 100}%`, top: py(points[hover].y) }}>
            <div className="trf-scatter__tip-head">
              <span className="trf-chart__swatch" style={{ background: colorOf(points[hover].category) }} />
              <span className="trf-scatter__tip-id">{points[hover].label}</span>
            </div>
            <div className="trf-scatter__tip-rows">
              {[[xLabel || "x", points[hover].x], [yLabel || "y", points[hover].y]].map(([k, v]) => (
                <div key={k} className="trf-chart__tip-row">
                  <span className="trf-chart__tip-name">{k}</span>
                  <span className="trf-chart__tip-val">{int(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="trf-scatter__foot">
        <span className="trf-scatter__axes">{axesSummary(xLabel, yLabel)}</span>
        <div className="trf-legend" style={{ marginTop: 0 }}>
          {series.map((s) => (
            <span key={s.key} className="trf-legend__item">
              <span className="trf-legend__swatch" style={{ background: s.color }} />{s.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
