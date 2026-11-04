import React from "react";

/**
 * Combobox · Transfiriendo. Select con búsqueda.
 * Patrón ARIA de combobox completo: role="combobox" en el campo,
 * aria-expanded / aria-controls / aria-activedescendant, teclado con flechas,
 * Enter, Escape y Tab. El menú cerrado se DESMONTA — antes solo se ocultaba con
 * opacity, así que sus botones seguían en el orden de tabulación y en el árbol
 * de accesibilidad, y un usuario de teclado tabulaba dentro de una lista invisible.
 * Estilos en css/library.css.
 */
export function Combobox({
  options = [], value, onChange, label,
  placeholder = "Buscar…", emptyText = "Sin resultados",
  ariaLabel,
  className = "", style, ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);
  const uid = React.useId();
  const listId = `${uid}-list`;

  // La normalización va DENTRO del memo. Antes `norm` se recreaba en cada render
  // y el memo dependía de [q, options], así que con un array literal inline en el
  // padre las dependencias cambiaban siempre y el memo no acertaba nunca.
  const norm = React.useMemo(
    () => options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)),
    [options]
  );
  const sel = norm.find((o) => o.value === value);
  const list = React.useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? norm.filter((o) => o.label.toLowerCase().includes(t)) : norm;
  }, [q, norm]);

  React.useEffect(() => {
    if (!open) return undefined;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setQ(""); } };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [open]);

  React.useEffect(() => { setActive(0); }, [q, open]);

  const pick = (o) => { onChange && onChange(o.value); setOpen(false); setQ(""); };

  const onKeyDown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); setQ(""); return; }
    if (e.key === "Tab") { setOpen(false); return; }
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) { e.preventDefault(); setOpen(true); return; }
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % Math.max(1, list.length)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + list.length) % Math.max(1, list.length)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(list.length - 1); }
    else if (e.key === "Enter") { e.preventDefault(); list[active] && pick(list[active]); }
  };

  return (
    <div ref={ref} className={`trf-pop ${className}`.trim()} style={style} {...rest}>
      {label && <label className="trf-field__label" htmlFor={uid}>{label}</label>}
      <span className="trf-field__wrap">
        <span className="trf-combo__icon" aria-hidden="true">⌕</span>
        <input
          id={uid}
          className="trf-combo__field trf-focusable"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && list[active] ? `${uid}-o${active}` : undefined}
          aria-label={label ? undefined : (ariaLabel || placeholder)}
          placeholder={placeholder}
          value={open ? q : (sel ? sel.label : "")}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onKeyDown={onKeyDown}
        />
      </span>
      <div id={listId} className="trf-menu" data-scroll="" hidden={!open}>
        {/* role="listbox" solo entra cuando hay opciones: listbox exige option/group
           como único contenido, y el mensaje vacío no es ninguno de los dos. */}
        {list.length === 0
          ? <p className="trf-menu__empty" role="status">{emptyText}</p>
          : <div role="listbox">{list.map((o, i) => (
              <button
                key={o.value}
                id={`${uid}-o${i}`}
                type="button"
                className="trf-option"
                role="option"
                tabIndex={-1}
                aria-selected={o.value === value}
                data-active={i === active ? "" : undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(o)}
              >
                <span>{o.label}</span>
                {o.value === value && <span className="trf-option__check" aria-hidden="true">✓</span>}
              </button>
            ))}</div>}
      </div>
    </div>
  );
}
