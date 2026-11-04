import React from "react";

/**
 * Accordion · Transfiriendo. Un panel abierto a la vez, o varios con `multiple`.
 * El encabezado es un botón con aria-expanded/aria-controls y el panel lleva
 * role="region". Estilos en css/library.css.
 */
export function Accordion({ items = [], defaultOpen = 0, multiple = false, className = "", ...rest }) {
  const [open, setOpen] = React.useState(multiple ? (defaultOpen === null ? [] : [defaultOpen]) : defaultOpen);
  const uid = React.useId();
  const isOpen = (i) => (multiple ? open.includes(i) : open === i);
  const toggle = (i) => {
    if (multiple) setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
    else setOpen((o) => (o === i ? null : i));
  };
  return (
    <div className={`trf-acc ${className}`.trim()} {...rest}>
      {items.map((it, i) => {
        const on = isOpen(i);
        const headId = `${uid}-h${i}`;
        const panelId = `${uid}-p${i}`;
        return (
          <div key={i} className="trf-acc__item" data-last={i === items.length - 1 ? "" : undefined}>
            <button
              type="button"
              id={headId}
              className="trf-acc__head trf-focusable"
              aria-expanded={on}
              aria-controls={panelId}
              onClick={() => toggle(i)}
            >
              <span>{it.title}</span>
              <span className="trf-acc__caret" aria-hidden="true">▾</span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headId}
              className="trf-acc__panel"
              data-open={on ? "" : undefined}
            >
              <div className="trf-acc__clip">
                <p className="trf-acc__body">{it.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
