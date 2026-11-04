import React from "react";

/**
 * Barra de tabs con indicador naranja animado.
 * Patrón ARIA de tablist: role, aria-selected y navegación por flechas.
 * Estilos en css/core.css; aquí solo queda la medición del indicador.
 */
export function Tabs({ items = [], value, onChange, className = "", style, ...rest }) {
  const ref = React.useRef(null);
  const [bar, setBar] = React.useState({ left: 0, width: 0 });

  React.useEffect(() => {
    const el = ref.current?.querySelector(`[data-tab="${value}"]`);
    if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, items]);

  const onKeyDown = (e) => {
    const i = items.findIndex((t) => t.id === value);
    if (i < 0) return;
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    onChange && onChange(items[next].id);
    ref.current?.querySelector(`[data-tab="${items[next].id}"]`)?.focus();
  };

  return (
    <div
      ref={ref}
      className={`trf-tabs ${className}`.trim()}
      role="tablist"
      onKeyDown={onKeyDown}
      style={style}
      {...rest}
    >
      {items.map((it) => {
        const selected = value === it.id;
        return (
          <button
            key={it.id}
            className="trf-tab"
            data-tab={it.id}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={it.panelId}
            id={it.tabId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange && onChange(it.id)}
          >
            {it.label}
          </button>
        );
      })}
      <span className="trf-tabs__bar" style={{ left: bar.left, width: bar.width }} />
    </div>
  );
}
