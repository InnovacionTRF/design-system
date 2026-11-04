import React from "react";

/**
 * Select · Transfiriendo. Patrón ARIA de listbox: el menú cerrado se DESMONTA
 * (antes solo se ocultaba con opacity, así que sus botones seguían en el orden
 * de tabulación). Teclado completo: flechas, Home/End, Enter, Escape.
 * Estilos en css/library.css.
 */
export function Select({ options = [], value, onChange, placeholder = "Elegir…", className = "", style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);
  const id = React.useId();
  const norm = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const sel = norm.find((o) => o.value === value);

  React.useEffect(() => {
    if (!open) return undefined;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [open]);

  React.useEffect(() => {
    if (open) setActive(Math.max(0, norm.findIndex((o) => o.value === value)));
  }, [open]);

  const pick = (o) => { onChange && onChange(o.value); setOpen(false); };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault(); setOpen(true); return;
    }
    if (!open) return;
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % norm.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + norm.length) % norm.length); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(norm.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); norm[active] && pick(norm[active]); }
  };

  return (
    <div ref={ref} className={`trf-pop ${className}`.trim()} style={style} {...rest}>
      <button
        type="button"
        className="trf-trigger trf-focusable"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-haspopup="listbox"
        data-placeholder={sel ? undefined : ""}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span>{sel ? sel.label : placeholder}</span>
        <span className="trf-trigger__caret" aria-hidden="true">▾</span>
      </button>
      <div id={`${id}-list`} className="trf-menu" role="listbox" hidden={!open}>
        {norm.map((o, i) => (
          <button
            key={o.value}
            type="button"
            className="trf-option"
            role="option"
            aria-selected={o.value === value}
            data-active={i === active ? "" : undefined}
            onMouseEnter={() => setActive(i)}
            onClick={() => pick(o)}
          >
            <span>{o.label}</span>
            {o.value === value && <span className="trf-option__check" aria-hidden="true">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
