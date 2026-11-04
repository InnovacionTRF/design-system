import React from "react";
// Stepper · Transfiriendo. Pasos completados y actual en naranja; conector coloreado.
// Estilos en css/library.css.
export function Stepper({ steps = [], current = 0, className = "", ...rest }) {
  const norm = steps.map((s) => (typeof s === "string" ? { label: s } : s));
  return (
    <div className={`trf-stepper ${className}`.trim()} {...rest}>
      {norm.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === norm.length - 1;
        return (
          <div key={i} className="trf-stepper__step" data-last={last ? "" : undefined}>
            <div className="trf-stepper__col">
              <div className="trf-stepper__dot" data-on={done || active ? "" : undefined}
                aria-current={active ? "step" : undefined}>
                {done ? "✓" : i + 1}
              </div>
              <span className="trf-stepper__label" data-active={active ? "" : undefined}>{s.label}</span>
            </div>
            {!last && <div className="trf-stepper__line" data-on={done ? "" : undefined} />}
          </div>
        );
      })}
    </div>
  );
}
