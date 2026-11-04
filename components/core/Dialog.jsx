import React from "react";

/**
 * Dialog · primitiva de diálogo modal de Transfiriendo.
 * ============================================================
 * NO se usa directamente en pantallas: `Modal` y `ConfirmDestructive` se
 * componen sobre ella. Antes cada uno traía su propia copia de overlay, scrim,
 * gestión de foco y cierre, y las dos copias divergieron en todo — scrim,
 * nivel de encabezado y afordancias de cierre incluidos.
 *
 * Concentra lo que un diálogo modal debe hacer siempre:
 *  · scrim único y tokenizado (--trf-scrim), con variante oscura;
 *  · trampa de foco con ciclo en ambos sentidos;
 *  · foco inicial dentro del diálogo y restauración al cerrar;
 *  · Escape y clic en el scrim;
 *  · bloqueo del scroll del body mientras está abierto;
 *  · role="dialog" + aria-modal + aria-labelledby.
 *
 * El nivel del encabezado NO se cablea aquí: lo decide quien compone, porque un
 * diálogo no siempre cuelga del mismo nivel de la página.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  width,
  closeOnOverlay = true,
  closeOnEscape = true,
  overlayClassName = "",
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = React.useRef(null);
  const prevFocus = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    prevFocus.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const node = ref.current;
    const focusables = () => Array.from(
      node?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) || []
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    // Foco inicial: lo que pida el contenido con [data-autofocus], si no el
    // primer control, si no el diálogo mismo.
    // Se reintenta en el siguiente frame porque con `open` verdadero YA en el
    // montaje el .focus() síncrono no siempre prende: el nodo acaba de entrar
    // en el documento y el foco se queda en BODY.
    const enfocarInicial = () => {
      if (!node || node.contains(document.activeElement)) return;
      const wanted = node.querySelector("[data-autofocus]");
      (wanted || focusables()[0] || node).focus();
    };
    enfocarInicial();
    const frame = requestAnimationFrame(enfocarInicial);

    const onKey = (e) => {
      if (e.key === "Escape" && closeOnEscape) { e.stopImmediatePropagation(); onClose && onClose(); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) { e.preventDefault(); return; }
      const i = f.indexOf(document.activeElement);
      // i === -1 significa que el foco está FUERA de la trampa (arrancó en BODY,
      // o el usuario hizo clic en el scrim). Sin esta rama ninguna de las otras
      // dos coincide, no se llama preventDefault y el Tab se escapa al control
      // que hay detrás del velo — visible para el teclado, invisible para el ojo.
      if (i === -1) { e.preventDefault(); (e.shiftKey ? f[f.length - 1] : f[0]).focus(); return; }
      if (e.shiftKey && i === 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      const back = prevFocus.current;
      if (back && typeof back.focus === "function") back.focus();
    };
  }, [open, onClose, closeOnEscape]);

  if (!open) return null;
  return (
    <div
      className={`trf-dialog__overlay ${overlayClassName}`.trim()}
      onClick={closeOnOverlay ? () => onClose && onClose() : undefined}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={`trf-dialog ${className}`.trim()}
        style={width ? { width, ...style } : style}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Encabezado con nivel configurable. `level` 1–6; por defecto 2.
 * Existe para que el nivel no quede cableado en cada diálogo.
 */
export function DialogTitle({ level = 2, className = "", children, ...rest }) {
  const Tag = `h${Math.min(6, Math.max(1, level))}`;
  return <Tag className={className} {...rest}>{children}</Tag>;
}
