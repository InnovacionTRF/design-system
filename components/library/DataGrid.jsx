import React from "react";
import { compare } from "./format.js";

/**
 * DataGrid · Transfiriendo. Encabezados ordenables.
 * El encabezado es un <button> real con aria-sort en el <th>: antes era un
 * <th onClick> sin tabIndex, así que ordenar era imposible sin ratón.
 * Estilos en css/library.css.
 */
export function DataGrid({ columns = [], rows = [], defaultSort, renderCell, caption, className = "", ...rest }) {
  // "Sin ordenar" (null) es el estado INICIAL, no la primera columna: así la tabla
  // se puede renderizar en el orden en que llegó del API, que a menudo ya es el
  // significativo (recientes primero, ranking del servidor…). Antes era imposible.
  const [sort, setSort] = React.useState(defaultSort ?? null);

  const sorted = React.useMemo(() => {
    if (!sort || !sort.key) return rows;
    const { key, dir } = sort;
    const mul = dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = a[key], vb = b[key];
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * mul;
      return compare(va, vb) * mul;
    });
  }, [rows, sort]);

  // Ciclo de tres estados: asc → desc → sin ordenar.
  const click = (k) => setSort((s) => {
    if (!s || s.key !== k) return { key: k, dir: "asc" };
    if (s.dir === "asc") return { key: k, dir: "desc" };
    return null;
  });
  return (
    <div className={`trf-grid ${className}`.trim()} {...rest}>
      <table>
        {caption && <caption className="trf-grid__caption">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => {
              const on = !!sort && c.key === sort.key;
              return (
                <th
                  key={c.key}
                  scope="col"
                  data-align={c.align === "right" ? "right" : undefined}
                  aria-sort={on ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                >
                  <button type="button" className="trf-grid__sort trf-focusable" onClick={() => click(c.key)}>
                    {c.label}
                    <span className="trf-grid__arrow" aria-hidden="true">
                      {on ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={r.id || i}>
              {columns.map((c) => {
                const custom = renderCell ? renderCell(c.key, r[c.key], r) : undefined;
                return (
                  <td
                    key={c.key}
                    data-align={c.align === "right" ? "right" : undefined}
                    data-mono={c.mono ? "" : undefined}
                  >
                    {custom === undefined ? r[c.key] : custom}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
