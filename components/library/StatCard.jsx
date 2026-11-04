import React from "react";
// StatCard · Transfiriendo. Métrica con delta y sparkline opcional.
// Estilos en css/library.css.

function scSpark(points, color, id) {
  const w = 96, h = 30;
  const max = Math.max(...points), min = Math.min(...points), span = (max - min) || 1;
  const step = w / (points.length - 1);
  const pts = points.map((v, i) => [i * step, h - ((v - min) / span) * (h - 4) - 2]);
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = d + " L " + w + " " + h + " L 0 " + h + " Z";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="trf-stat__spark" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.4" fill={color} />
    </svg>
  );
}

/**
 * `trend` es la DIRECCIÓN de la flecha; `polarity` dice si subir es bueno.
 * Se separan porque no siempre coinciden: en una tasa de error, bajar es bueno.
 * Antes `up` significaba siempre «bueno» y una tasa de error a la baja se
 * pintaba en rojo.
 */
export function StatCard({
  label, value, delta, trend = "up", polarity = "up-is-good",
  unit, spark, interactive = false, className = "", ...rest
}) {
  // useId y no Math.random(): el id del degradado debe ser estable entre el
  // render de servidor y el de cliente, o la hidratación no coincide y cualquier
  // test de snapshot cambia en cada corrida.
  // Los ':' que useId inserta se quitan: son válidos en un id de HTML pero rompen
  // la referencia url(#…) del SVG y cualquier querySelector sobre ella.
  const gradId = "trf-spark-" + React.useId().replace(/:/g, "");
  const upIsGood = polarity !== "down-is-good";
  const sense = trend === "flat" ? "neutral" : ((trend === "up") === upIsGood ? "good" : "bad");
  const arrow = trend === "flat" ? "→" : (trend === "up" ? "↑" : "↓");
  const sparkColor = sense === "bad" ? "var(--trf-danger)" : "var(--trf-action)";
  return (
    <div
      className={`trf-stat ${className}`.trim()}
      data-interactive={interactive ? "" : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      {...rest}
    >
      <p className="trf-stat__label">{label}</p>
      <div className="trf-stat__row">
        <div>
          <p className="trf-stat__value">
            {value}
            {unit && <span className="trf-stat__unit">{unit}</span>}
          </p>
          {delta && <p className="trf-stat__delta" data-sense={sense}>{arrow} {delta}</p>}
        </div>
        {spark && scSpark(spark, sparkColor, gradId)}
      </div>
    </div>
  );
}
