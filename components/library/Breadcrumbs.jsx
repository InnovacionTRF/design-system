import React from "react";
// Breadcrumbs · Transfiriendo. Chevron separador; actual sin enlace.
// Estilos en css/library.css; el hover es :hover, no handlers de React.
export function Breadcrumbs({ items = [], onNavigate, navLabel = "Ruta", className = "", ...rest }) {
  const norm = items.map((i) => (typeof i === "string" ? { label: i } : i));
  return (
    <nav aria-label={navLabel} className={`trf-crumbs ${className}`.trim()} {...rest}>
      {norm.map((it, i) => {
        const last = i === norm.length - 1;
        return (
          <span key={i} className="trf-crumbs__item">
            {i > 0 && <span className="trf-crumbs__sep" aria-hidden="true">›</span>}
            {last ? (
              <span aria-current="page" className="trf-crumbs__current">{it.label}</span>
            ) : (
              <a
                href={it.href || "#"}
                className="trf-crumbs__link trf-focusable"
                onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(it, i); } }}
              >
                {it.label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
