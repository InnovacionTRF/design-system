import React from "react";
import { Dialog, DialogTitle } from "../core/Dialog.jsx";

/**
 * Modal · Transfiriendo. Diálogo con título, cuerpo y pie de acciones.
 * Se compone sobre la primitiva `Dialog`, que aporta scrim, trampa de foco,
 * Escape, bloqueo de scroll y restauración del foco.
 * Estilos en css/library.css (contenido) y css/core.css (contenedor).
 */
export function Modal({
  open, onClose, title, children, footer, width = 430,
  headingLevel = 2,
  closeLabel = "Cerrar",
  className = "", style, ...rest
}) {
  const uid = React.useId();
  const titleId = `${uid}-title`;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={title ? titleId : undefined}
      width={width}
      className={className}
      style={style}
      {...rest}
    >
      <div className="trf-modal__head">
        <DialogTitle level={headingLevel} id={titleId} className="trf-modal__title">{title}</DialogTitle>
        <button
          type="button"
          className="trf-modal__x trf-focusable"
          onClick={() => onClose && onClose()}
          aria-label={closeLabel}
        >✕</button>
      </div>
      <div className="trf-modal__body">{children}</div>
      {footer && <div className="trf-modal__foot">{footer}</div>}
    </Dialog>
  );
}
