import React from "react";
// Toasts · Transfiriendo. Apilados abajo-derecha; autocierre a 4,2s.
// Estilos en css/library.css.
const ICON = { success: "✓", info: "ⓘ", warning: "⚠", danger: "✕" };
let _id = 0;

export const Toaster = React.forwardRef(function Toaster(
  { regionLabel = "Notificaciones", closeLabel = "Cerrar notificación" } = {}, ref
) {
  const [items, setItems] = React.useState([]);
  const remove = React.useCallback((id) => setItems((l) => l.filter((t) => t.id !== id)), []);
  const push = React.useCallback((toast) => {
    const id = ++_id;
    const dur = toast.duration ?? 4200;
    setItems((l) => [...l, { id, ...toast }]);
    if (dur) setTimeout(() => remove(id), dur);
    return id;
  }, [remove]);
  React.useImperativeHandle(ref, () => ({ push, remove }), [push, remove]);

  return (
    <div className="trf-toasts" role="region" aria-label={regionLabel} aria-live="polite">
      {items.map((t) => {
        const tone = ICON[t.tone] ? t.tone : "info";
        return (
          <div key={t.id} className="trf-toast">
            <span className="trf-toast__icon" data-tone={tone} aria-hidden="true">{ICON[tone]}</span>
            <div className="trf-toast__meta">
              <p className="trf-toast__title">{t.title}</p>
              {t.body && <p className="trf-toast__body">{t.body}</p>}
            </div>
            {t.action && (
              <button
                type="button"
                className="trf-toast__action trf-focusable"
                onClick={() => { t.action.onClick && t.action.onClick(); remove(t.id); }}
              >{t.action.label}</button>
            )}
            <button
              type="button"
              className="trf-toast__x trf-focusable"
              onClick={() => remove(t.id)}
              aria-label={closeLabel}
            >✕</button>
          </div>
        );
      })}
    </div>
  );
});
