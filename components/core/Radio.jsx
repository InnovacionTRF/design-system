import React from "react";
// Radio + RadioGroup · Transfiriendo. Roving tabindex, mismo mecanismo que
// core/Tabs.jsx: un solo ítem en tabIndex=0, flechas mueven el foco y
// seleccionan (a diferencia de Tabs, mover el foco aquí SÍ dispara onChange —
// comportamiento estándar de radiogroup). Estilos en css/core.css.
export function RadioGroup({ items = [], value, onChange, label, className = "", style, ...rest }) {
  const ref = React.useRef(null);

  const select = (id) => { onChange && onChange(id); };
  const focusItem = (id) => { ref.current?.querySelector(`[data-radio="${id}"]`)?.focus(); };

  const onKeyDown = (e) => {
    const i = items.findIndex((it) => it.id === value);
    const cur = i < 0 ? 0 : i;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (cur + 1) % items.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (cur - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    select(items[next].id);
    focusItem(items[next].id);
  };

  return (
    <div
      ref={ref}
      className={`trf-radiogroup ${className}`.trim()}
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      style={style}
      {...rest}
    >
      {items.map((it) => {
        const selected = value === it.id;
        return (
          <button
            key={it.id}
            type="button"
            data-radio={it.id}
            className="trf-radio trf-focusable"
            role="radio"
            aria-checked={selected}
            tabIndex={selected || (!value && it.id === items[0]?.id) ? 0 : -1}
            disabled={it.disabled}
            onClick={() => select(it.id)}
          >
            <span className="trf-radio__dot" aria-hidden="true" />
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

/** Radio suelto, fuera de un RadioGroup — poco frecuente, pero disponible para
 * un caso de un solo control (p. ej. dentro de una fila de tabla). Sin roving
 * tabindex propio: si necesita varios relacionados, use RadioGroup. */
export function Radio({ checked = false, onChange, label, disabled = false, id, className = "", style, ...rest }) {
  const autoId = React.useId();
  const rid = id || autoId;
  return (
    <span className={`trf-radio-standalone ${className}`.trim()} data-disabled={disabled ? "" : undefined} style={style}>
      <button
        id={rid}
        type="button"
        className="trf-radio trf-focusable"
        role="radio"
        aria-checked={checked}
        aria-labelledby={label ? `${rid}-lbl` : undefined}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        {...rest}
      >
        <span className="trf-radio__dot" aria-hidden="true" />
      </button>
      {label && <span id={`${rid}-lbl`} className="trf-radio__label">{label}</span>}
    </span>
  );
}
