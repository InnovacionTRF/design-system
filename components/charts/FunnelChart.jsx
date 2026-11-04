import React from "react";
import { int } from "../library/format.js";

const SCALE = ["var(--trf-heat-1)", "var(--trf-heat-2)", "var(--trf-heat-3)", "var(--trf-heat-4)", "var(--trf-heat-5)"];
const LAST = SCALE.length - 1;

/**
 * Embudo de conversión etapa a etapa. La intensidad del naranja crece con la
 * pérdida acumulada; el ancho es proporcional a la primera etapa.
 * El color del texto se deriva del MISMO índice de la escala que el fondo:
 * solo el último escalón admite blanco (heat-4 con blanco da 2,72:1).
 *
 * REGLA: texto sobre un relleno que NO cambia con el tema debe usar un token que
 * TAMPOCO cambie. La rampa de calor y las series son paleta de DATOS, no
 * superficie: no tienen variante oscura, y con razón. Usar --trf-text o
 * --trf-text-on-inverse encima suyo rompe en modo oscuro, porque esos SÍ voltean
 * — es exactamente el fallo que dejó las cinco celdas por debajo de 2,5:1.
 * Los tokens fijos son --trf-neutral-900 y --trf-text-on-fill.
 * Estilos en css/charts.css.
 */
export function FunnelChart({ steps = [], className = "", ...rest }) {
  const first = steps.length ? steps[0].value : 0;
  return (
    <div className={`trf-funnel ${className}`.trim()} {...rest}>
      {steps.map((s, i) => {
        const pct = first ? s.value / first : 0;
        const drop = i === 0
          ? "punto de partida"
          : `−${Math.round((1 - s.value / steps[i - 1].value) * 100)}% vs. etapa anterior`;
        const fg = i >= LAST ? "var(--trf-text-on-fill)" : "var(--trf-neutral-900)";
        return (
          <div key={s.label} className="trf-funnel__row">
            <div>
              <p className="trf-funnel__label">{s.label}</p>
              <p className="trf-funnel__drop">{drop}</p>
            </div>
            <div className="trf-funnel__track">
              <div
                className="trf-funnel__bar"
                style={{ width: `${Math.max(pct * 100, 12)}%`, background: SCALE[Math.min(i, LAST)], color: fg }}
              >
                <span className="trf-funnel__val">{int(s.value)}</span>
                <span className="trf-funnel__pct">{Math.round(pct * 100)}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
