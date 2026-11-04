import React from "react";

const SCALE = ["var(--trf-heat-1)", "var(--trf-heat-2)", "var(--trf-heat-3)", "var(--trf-heat-4)", "var(--trf-heat-5)"];
const LAST = SCALE.length - 1;

/**
 * Mapa de calor: intensidad en escala de naranja.
 * El índice de bucket gobierna fondo Y texto: nunca un umbral independiente,
 * que es lo que dejaba texto blanco sobre heat-3 (1,87:1).
 *
 * REGLA: texto sobre un relleno que NO cambia con el tema debe usar un token que
 * TAMPOCO cambie. La rampa de calor y las series son paleta de DATOS, no
 * superficie: no tienen variante oscura, y con razón. Usar --trf-text o
 * --trf-text-on-inverse encima suyo rompe en modo oscuro, porque esos SÍ voltean
 * — es exactamente el fallo que dejó las cinco celdas por debajo de 2,5:1.
 * Los tokens fijos son --trf-neutral-900 y --trf-text-on-fill.
 * Estilos en css/charts.css.
 */
export function Heatmap({ columns = [], rows = [], lessLabel = "Menos", moreLabel = "Más", className = "", ...rest }) {
  const all = rows.flatMap((r) => r.values);
  const max = Math.max(1, ...all);
  const bucketOf = (v) => Math.min(LAST, Math.floor((v / max) * SCALE.length));
  return (
    <div className={`trf-heat ${className}`.trim()} {...rest}>
      <div className="trf-heat__scroll">
        <div className="trf-heat__grid" style={{ gridTemplateColumns: `96px repeat(${columns.length}, 1fr)` }}>
          <span />
          {columns.map((c, i) => <span key={`${c}${i}`} className="trf-heat__wd">{c}</span>)}
          {rows.map((r) => (
            <React.Fragment key={r.name}>
              <span className="trf-heat__rowname">{r.name}</span>
              {r.values.map((v, i) => {
                const b = bucketOf(v);
                return (
                  <div
                    key={i}
                    className="trf-heat__cell"
                    title={`${r.name} · ${columns[i]}: ${v}`}
                    style={{ background: SCALE[b] }}
                  >
                    <span
                      className="trf-heat__val"
                      style={{ color: b === LAST ? "var(--trf-text-on-fill)" : "var(--trf-neutral-900)" }}
                    >{v}</span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="trf-heat__legend">
        <span>{lessLabel}</span>
        <div className="trf-heat__ramp">
          {SCALE.map((c) => <span key={c} className="trf-heat__swatch" style={{ background: c }} />)}
        </div>
        <span>{moreLabel}</span>
      </div>
    </div>
  );
}
