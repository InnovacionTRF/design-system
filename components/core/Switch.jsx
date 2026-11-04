import React from "react";

/**
 * Interruptor on/off. La etiqueta CONMUTA al hacer clic (antes solo enfocaba,
 * porque un <label for> apuntaba a un <button>). Estilos en css/core.css.
 */
export function Switch({ checked = false, onChange, label, toggleLabel = "Alternar", disabled = false, id, className = "", style, ...rest }) {
  const autoId = React.useId();
  const sid = id || autoId;
  const toggle = () => { if (!disabled && onChange) onChange(!checked); };
  return (
    <span
      className={`trf-switch ${className}`.trim()}
      data-disabled={disabled ? "" : undefined}
      style={style}
    >
      <button
        id={sid}
        className="trf-switch__track"
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? `${sid}-lbl` : undefined}
        aria-label={label ? undefined : toggleLabel}
        disabled={disabled}
        onClick={toggle}
        {...rest}
      >
        <span className="trf-switch__thumb" />
      </button>
      {label && (
        <span id={`${sid}-lbl`} className="trf-switch__label" onClick={toggle}>{label}</span>
      )}
    </span>
  );
}
