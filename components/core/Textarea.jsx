import React from "react";
// Textarea · Transfiriendo. Variante multilínea de Input: reutiliza las clases
// de envoltorio (.trf-field*) y añade solo el control. Estilos en css/core.css.
export function Textarea({
  label, hint, error, rows = 4, maxLength, showCount = false,
  id, value, defaultValue, onChange, className = "", style, ...rest
}) {
  const autoId = React.useId();
  const taId = id || autoId;
  const msgId = `${taId}-msg`;
  const msg = error || hint;
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue || "");
  const count = (isControlled ? value : uncontrolled)?.length || 0;

  const handleChange = (e) => {
    if (!isControlled) setUncontrolled(e.target.value);
    onChange && onChange(e);
  };

  return (
    <label className="trf-field" htmlFor={taId} style={style}>
      {label && <span className="trf-field__label">{label}</span>}
      <textarea
        id={taId}
        className={`trf-input trf-textarea ${className}`.trim()}
        rows={rows}
        maxLength={maxLength}
        value={value}
        defaultValue={isControlled ? undefined : defaultValue}
        onChange={handleChange}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={msg || (showCount && maxLength) ? msgId : undefined}
        {...rest}
      />
      {(msg || (showCount && maxLength && !error)) && (
        <span id={msgId} className="trf-field__hint-row">
          <span className="trf-field__hint" data-error={error ? "" : undefined}>{msg}</span>
          {showCount && maxLength && !error && (
            <span className="trf-field__count">{count} / {maxLength}</span>
          )}
        </span>
      )}
    </label>
  );
}
