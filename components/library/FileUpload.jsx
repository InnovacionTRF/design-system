import React from "react";
// FileUpload · Transfiriendo. Zona de arrastre + lista con progreso.
// Estilos en css/library.css.

const fuSize = (b) => (b >= 1048576
  ? (b / 1048576).toFixed(1).replace(".", ",") + " MB"
  : Math.max(1, Math.round(b / 1024)) + " KB");
const fuExt = (n) => (String(n).split(".").pop() || "").slice(0, 4).toUpperCase();

export function FileUpload({
  files = [], onAdd, onRemove,
  hint = "CSV, JSON, PDF · hasta 25 MB",
  cta = <>Arrastre archivos o <em>busque en su equipo</em></>,
  progressLabel = (nombre) => `Progreso de ${nombre}`,
  removeLabel = (nombre) => `Quitar ${nombre}`,
  className = "", ...rest
}) {
  const [drag, setDrag] = React.useState(false);
  const input = React.useRef(null);
  const take = (list) => onAdd && onAdd(Array.from(list).map((f) => ({
    name: f.name, size: fuSize(f.size || 0), pct: 100, done: true,
  })));
  const openPicker = () => input.current && input.current.click();
  return (
    <div className={`trf-upload ${className}`.trim()} {...rest}>
      <div
        className="trf-upload__zone trf-focusable"
        role="button"
        tabIndex={0}
        data-drag={drag ? "" : undefined}
        onClick={openPicker}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } }}
        onDragOver={(e) => { e.preventDefault(); if (!drag) setDrag(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDrag(false); }}
        onDrop={(e) => { e.preventDefault(); setDrag(false); take((e.dataTransfer && e.dataTransfer.files) || []); }}
      >
        <span className="trf-upload__glyph" aria-hidden="true">↑</span>
        <p className="trf-upload__cta">{cta}</p>
        <p className="trf-upload__hint">{hint}</p>
        <input
          ref={input}
          type="file"
          multiple
          hidden
          onChange={(e) => { take(e.target.files || []); e.target.value = ""; }}
        />
      </div>
      {files.length > 0 && (
        <div className="trf-upload__list">
          {files.map((f, i) => (
            <div key={f.name + i} className="trf-upload__row">
              <span className="trf-upload__ext" aria-hidden="true">{fuExt(f.name)}</span>
              <div className="trf-upload__meta">
                <div className="trf-upload__head">
                  <span className="trf-upload__name">{f.name}</span>
                  <span className="trf-upload__pct" data-done={f.done ? "" : undefined}>
                    {f.done ? "Completado" : f.pct + "%"}
                  </span>
                </div>
                <div className="trf-upload__track" role="progressbar"
                  aria-valuenow={f.pct} aria-valuemin={0} aria-valuemax={100}
                  aria-label={progressLabel(f.name)}>
                  <div className="trf-upload__fill" data-done={f.done ? "" : undefined} style={{ width: f.pct + "%" }} />
                </div>
              </div>
              <span className="trf-upload__size">{f.size}</span>
              <button
                type="button"
                className="trf-upload__x trf-focusable"
                onClick={() => onRemove && onRemove(i)}
                aria-label={removeLabel(f.name)}
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
