import React from "react";

/**
 * Confirmación reversible: se ejecuta de inmediato y ofrece deshacer durante
 * unos segundos. Preferible a un diálogo cuando la acción se puede revertir.
 * Estilos en css/patterns.css.
 */
export function UndoToast({ open, message, undoLabel = "Deshacer", dismissLabel = "Cerrar aviso", onUndo, onDismiss, duration = 4500, className = "", ...rest }) {
  React.useEffect(() => {
    if (!open || !duration) return undefined;
    const t = setTimeout(() => onDismiss && onDismiss(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onDismiss]);
  if (!open) return null;
  return (
    <div className={`trf-dock ${className}`.trim()} data-compact="" role="status" aria-live="polite" {...rest}>
      <span className="trf-dock__msg">{message}</span>
      <button type="button" className="trf-dock__undo trf-focusable" onClick={onUndo}>{undoLabel}</button>
      <button type="button" className="trf-dock__x trf-focusable" onClick={onDismiss} aria-label={dismissLabel}>✕</button>
    </div>
  );
}
