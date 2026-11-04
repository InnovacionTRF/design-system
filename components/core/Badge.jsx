import React from "react";

/** Etiqueta de estado compacta, con punto opcional. Estilos en css/core.css. */
export function Badge({ tone = "neutral", dot = false, className = "", children, ...rest }) {
  return (
    <span className={`trf-badge ${className}`.trim()} data-tone={tone} {...rest}>
      {dot && <span className="trf-badge__dot" />}
      {children}
    </span>
  );
}
