import React from "react";
// Timeline · Transfiriendo. Actividad cronológica con hitos por tono semántico.
// Estilos en css/library.css.
export function Timeline({ items = [], className = "", ...rest }) {
  return (
    <div className={`trf-tl ${className}`.trim()} {...rest}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <div key={i} className="trf-tl__row">
            <div className="trf-tl__rail">
              <span className="trf-tl__dot" data-tone={it.tone || "neutral"} aria-hidden="true">
                {it.icon || "●"}
              </span>
              {!last && <span className="trf-tl__line" />}
            </div>
            <div className="trf-tl__body" data-last={last ? "" : undefined}>
              <div className="trf-tl__head">
                <p className="trf-tl__title">{it.title}</p>
                <span className="trf-tl__time">{it.time}</span>
              </div>
              {it.body && <p className="trf-tl__text">{it.body}</p>}
              {it.author && <p className="trf-tl__author">{it.author}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
