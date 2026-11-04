import React from "react";
// Checkbox · Transfiriendo. Botón real con role="checkbox", no <input> nativo —
// mismo patrón que Switch (role="switch"). Estilos en css/core.css.
export function Checkbox({
  checked = false, indeterminate = false, onChange, label,
  disabled = false, id, className = "", style, ...rest
}) {
  const autoId = React.useId();
  const cid = id || autoId;
  const state = indeterminate ? "mixed" : (checked ? "true" : "false");
  const toggle = () => { if (!disabled && onChange) onChange(!checked); };
  return (
    <span
      className={`trf-checkbox ${className}`.trim()}
      data-disabled={disabled ? "" : undefined}
      style={style}
    >
      <button
        id={cid}
        type="button"
        className="trf-checkbox__ctrl trf-focusable"
        role="checkbox"
        aria-checked={state}
        aria-labelledby={label ? `${cid}-lbl` : undefined}
        aria-label={label ? undefined : "Casilla de verificación"}
        disabled={disabled}
        onClick={toggle}
        {...rest}
      >
        <span className="trf-checkbox__box">
          {indeterminate
            ? <span className="trf-checkbox__mark" aria-hidden="true">−</span>
            : (checked && <span className="trf-checkbox__mark" aria-hidden="true">✓</span>)}
        </span>
      </button>
      {label && <span id={`${cid}-lbl`} className="trf-checkbox__label" onClick={toggle}>{label}</span>}
    </span>
  );
}
