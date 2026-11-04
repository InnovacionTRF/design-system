import React from "react";

/**
 * Popover · Transfiriendo. Panel flotante anclado con flecha.
 * El panel cerrado se DESMONTA (hidden), así que su contenido no queda en el
 * orden de tabulación. Cierra con click afuera y con Escape.
 * Estilos en css/library.css.
 */
export function Popover({ trigger, children, width = 244, className = "", style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const id = React.useId();

  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div
      ref={ref}
      className={`trf-popover ${className}`.trim()}
      style={style}
      onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      <span
        role="button"
        tabIndex={0}
        className="trf-popover__trigger trf-focusable"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); } }}
      >
        {trigger}
      </span>
      <div id={id} className="trf-popover__panel" style={{ width }} hidden={!open}>
        <span className="trf-popover__arrow" />
        {typeof children === "function" ? children({ close: () => setOpen(false) }) : children}
      </div>
    </div>
  );
}
