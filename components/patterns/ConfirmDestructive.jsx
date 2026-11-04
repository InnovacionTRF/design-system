import React from "react";
import { Dialog, DialogTitle } from "../core/Dialog.jsx";

/**
 * Confirmación destructiva. Obliga a escribir el identificador exacto antes de
 * habilitar el botón: la acción irreversible nunca queda a un solo clic.
 * Se compone sobre la primitiva `Dialog`.
 * Estilos en css/patterns.css (contenido) y css/core.css (contenedor).
 */
export function ConfirmDestructive({
  open, title, description, confirmPhrase,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  promptLabel = (frase) => <>Escriba <span className="trf-confirm__phrase">{frase}</span> para confirmar</>,
  headingLevel = 2,
  onCancel, onConfirm, className = "", ...rest
}) {
  const [value, setValue] = React.useState("");
  const uid = React.useId();
  React.useEffect(() => { if (open) setValue(""); }, [open]);
  const ready = value.trim() === confirmPhrase;
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      labelledBy={`${uid}-t`}
      describedBy={`${uid}-d`}
      width={420}
      className={`trf-confirm ${className}`.trim()}
      {...rest}
    >
      <div className="trf-confirm__head">
        <DialogTitle level={headingLevel} id={`${uid}-t`} className="trf-confirm__title">{title}</DialogTitle>
        <p id={`${uid}-d`} className="trf-confirm__desc">{description}</p>
      </div>
      <div className="trf-confirm__field">
        <label className="trf-confirm__label" htmlFor={`${uid}-i`}>{promptLabel(confirmPhrase)}</label>
        <input
          id={`${uid}-i`}
          className="trf-confirm__input trf-focusable"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-ready={ready ? "" : undefined}
          data-autofocus
        />
      </div>
      <div className="trf-confirm__actions">
        <button type="button" className="trf-confirm__cancel trf-focusable" onClick={onCancel}>{cancelLabel}</button>
        <button
          type="button"
          className="trf-confirm__go trf-focusable"
          disabled={!ready}
          onClick={ready ? onConfirm : undefined}
        >{confirmLabel}</button>
      </div>
    </Dialog>
  );
}
