import React from "react";
// Pagination · Transfiriendo. Página activa naranja sólido; colapso con elipsis.
// Estilos en css/library.css. Objetivo táctil 40×40 (--trf-control-md).
export function Pagination({
  total, page, onChange, perPage = 10,
  navLabel = "Paginación",
  prevLabel = "Página anterior",
  nextLabel = "Página siguiente",
  pageLabel = (n) => `Página ${n}`,
  // Función, no concatenación: así se puede pluralizar y reordenar.
  summary = (from, to, count) => `Mostrando ${from}–${to} de ${count}`,
  className = "", ...rest
}) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  const keep = new Set([1, pages, page, page - 1, page + 1]);
  const nums = [];
  for (let i = 1; i <= pages; i++) if (keep.has(i)) nums.push(i);
  const items = [];
  nums.forEach((n, idx) => { if (idx > 0 && n - nums[idx - 1] > 1) items.push("gap"); items.push(n); });
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const go = (p) => onChange && onChange(Math.min(pages, Math.max(1, p)));
  return (
    <nav className={`trf-pager ${className}`.trim()} aria-label={navLabel} {...rest}>
      <span className="trf-pager__info">{summary(from, to, total)}</span>
      <div className="trf-pager__list">
        <button type="button" className="trf-pager__btn trf-focusable" disabled={page === 1}
          onClick={() => go(page - 1)} aria-label={prevLabel}>‹</button>
        {items.map((it, i) => it === "gap"
          ? <span key={`g${i}`} className="trf-pager__gap" aria-hidden="true">…</span>
          : <button key={it} type="button" className="trf-pager__btn trf-focusable"
              onClick={() => go(it)}
              aria-current={it === page ? "page" : undefined}
              aria-label={pageLabel(it)}>{it}</button>)}
        <button type="button" className="trf-pager__btn trf-focusable" disabled={page === pages}
          onClick={() => go(page + 1)} aria-label={nextLabel}>›</button>
      </div>
    </nav>
  );
}
