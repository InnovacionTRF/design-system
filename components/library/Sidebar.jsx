import React from "react";

/**
 * Sidebar · Transfiriendo. Navegación oscura colapsable.
 * Por debajo de 768px pasa a drawer deslizante (ver css/responsive.css): `open`
 * lo muestra y el propio componente renderiza el scrim, que llama a `onClose` al
 * hacer clic o con Escape. En escritorio `open`/`onClose` se ignoran y el scrim
 * no se monta (css/responsive.css ya lo oculta con display:none ≥768px).
 * `<nav>` y no `<aside>`; el ítem activo lleva aria-current="page". Colapsada,
 * la etiqueta se oculta con CSS en vez de desmontarse, así que el nombre
 * accesible no degrada a `title`. Estilos en css/library.css.
 */
export function Sidebar({
  items = [], active, onSelect, collapsed: controlled, onToggle,
  open = false, onClose,
  closeLabel = "Cerrar navegación",
  brand = "Transfiriendo",
  expandLabel = "Expandir navegación", collapseLabel = "Colapsar navegación",
  footer, className = "", ...rest
}) {
  const [inner, setInner] = React.useState(false);
  const collapsed = controlled !== undefined ? controlled : inner;
  const toggle = () => {
    if (controlled === undefined) setInner((c) => !c);
    onToggle && onToggle(!collapsed);
  };

  // Escape cierra el drawer igual que el clic en el scrim. Solo se escucha
  // mientras está abierto, para no interceptar Escape en el resto de la página.
  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* El scrim es del drawer, no del consumidor: sin él, open/onClose no tenían
         ningún elemento que los usara. tabIndex=-1 y aria-hidden: es un fondo de
         clic, no un control — el foco no debe poder aterrizar ahí. */}
      <div
        className="trf-sidebar__scrim"
        hidden={!open}
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
      />
      <nav
        className={`trf-sidebar ${className}`.trim()}
        data-collapsed={collapsed ? "" : undefined}
        data-open={open ? "" : undefined}
        aria-label={brand}
        {...rest}
      >
        <div className="trf-sidebar__top">
          {!collapsed && <span className="trf-sidebar__brand">{brand}</span>}
          <button
            type="button"
            className="trf-sidebar__toggle trf-focusable"
            onClick={toggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? expandLabel : collapseLabel}
          >{collapsed ? "»" : "«"}</button>
        </div>
        {items.map((it, i) => {
          const val = it.value ?? it.label;
          const on = val === active;
          return (
            <button
              key={i}
              type="button"
              className="trf-sidebar__item trf-focusable"
              aria-current={on ? "page" : undefined}
              onClick={() => onSelect && onSelect(val)}
            >
              <span className="trf-sidebar__glyph" aria-hidden="true" />
              {/* Siempre en el DOM: colapsada, la etiqueta visible se oculta con
                  `hidden`, que la saca del árbol de accesibilidad — el botón se
                  queda SIN nombre accesible en ese instante. El <span class="trf-sr-only">
                  de abajo es lo que lo restituye: no es un respaldo del texto oculto,
                  es la única fuente del nombre accesible mientras está colapsada. */}
              <span className="trf-sidebar__label" hidden={collapsed}>{it.label}</span>
              {collapsed && <span className="trf-sr-only">{it.label}</span>}
            </button>
          );
        })}
        {footer && <div className="trf-sidebar__foot">{footer}</div>}
      </nav>
    </>
  );
}
