import React from "react";
// Chip · Transfiriendo. Filtro seleccionable; naranja sólido al activarse.
// Estilos en css/library.css.
export function Chip({ selected = false, onToggle, className = "", children, ...rest }) {
  return (
    <button
      type="button"
      className={`trf-chip trf-focusable ${className}`.trim()}
      aria-pressed={selected}
      onClick={onToggle}
      {...rest}
    >
      {selected && <span className="trf-chip__check" aria-hidden="true">✓</span>}
      {children}
    </button>
  );
}
