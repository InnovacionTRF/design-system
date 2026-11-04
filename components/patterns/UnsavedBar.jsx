import React from "react";

/**
 * Barra de cambios sin guardar. Aparece anclada al pie cuando el formulario
 * está sucio; es la única forma de salir sin perder trabajo por accidente.
 * Estilos en css/patterns.css.
 */
export function UnsavedBar({ dirty, message = "Tiene cambios sin guardar.", onDiscard, onSave, discardLabel = "Descartar", saveLabel = "Guardar cambios", className = "", ...rest }) {
  if (!dirty) return null;
  return (
    <div className={`trf-dock ${className}`.trim()} role="status" {...rest}>
      <span className="trf-dock__dot" aria-hidden="true" />
      <span className="trf-dock__msg">{message}</span>
      <button type="button" className="trf-dock__ghost trf-focusable" onClick={onDiscard}>{discardLabel}</button>
      <button type="button" className="trf-dock__primary trf-focusable" onClick={onSave}>{saveLabel}</button>
    </div>
  );
}
