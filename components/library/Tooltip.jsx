import React from "react";

/**
 * Tooltip · Transfiriendo. Fondo inverso; fade + desplazamiento.
 * El trigger la referencia con aria-describedby y Escape la descarta (WCAG 1.4.13).
 * Estilos en css/library.css.
 */
export function Tooltip({ label, placement = "top", className = "", children, ...rest }) {
  const [show, setShow] = React.useState(false);
  const id = React.useId();
  const onKeyDown = (e) => { if (e.key === "Escape" && show) { e.stopPropagation(); setShow(false); } };
  return (
    <span
      className={`trf-tip ${className}`.trim()}
      aria-describedby={id}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
      <span
        id={id}
        role="tooltip"
        className="trf-tip__bubble"
        data-placement={placement}
        data-open={show ? "" : undefined}
      >
        {label}
      </span>
    </span>
  );
}
