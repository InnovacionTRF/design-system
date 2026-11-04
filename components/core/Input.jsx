import React from "react";

/**
 * Text input con label siempre visible. El error dice el arreglo, no se disculpa.
 * Estilos en css/core.css. El foco del icono sale de :focus-within, no de estado React.
 */
export function Input({ label, hint, error, icon: Icon, id, className = "", style, ...rest }) {
  const autoId = React.useId();
  const inputId = id || autoId;
  const msgId = `${inputId}-msg`;
  const msg = error || hint;
  return (
    <label className="trf-field" htmlFor={inputId} style={style}>
      {label && <span className="trf-field__label">{label}</span>}
      <span className="trf-field__wrap">
        {Icon && (
          <span className="trf-field__icon">
            <Icon size={16} strokeWidth={2} />
          </span>
        )}
        <input
          id={inputId}
          className={`trf-input ${className}`.trim()}
          data-with-icon={Icon ? "" : undefined}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={msg ? msgId : undefined}
          {...rest}
        />
      </span>
      {msg && (
        <span id={msgId} className="trf-field__hint" data-error={error ? "" : undefined}>
          {msg}
        </span>
      )}
    </label>
  );
}
