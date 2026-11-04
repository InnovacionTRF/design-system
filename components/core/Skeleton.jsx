import React from "react";

/** Placeholder de carga con barrido. Estilos y keyframes en CSS. */
export function Skeleton({ width, height = 12, radius, className = "", style, ...rest }) {
  return (
    <span
      className={`trf-skeleton ${className}`.trim()}
      aria-hidden="true"
      style={{ width: width || "100%", height, borderRadius: radius, ...style }}
      {...rest}
    />
  );
}
