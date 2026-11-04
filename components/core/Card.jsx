import React from "react";

/**
 * Surface container. Estática por defecto; se eleva y muestra cursor de mano
 * Únicamente cuando la tarjeta entera es clicable (recibe `onClick`). `accent`
 * para la destacada.
 *
 * Si recibe `onClick`, se vuelve operable de verdad: role="button", entra en el
 * orden de tabulación y responde a Enter y Espacio. Antes se elevaba en hover
 * pero seguía siendo un <div> sin rol ni activación por teclado.
 *
 * `hover` quedó DEPRECADO (cambio de comportamiento, ver readme §Card): ya no
 * activa la elevación por sí solo — permitirlo dejaba una tarjeta con `hover`
 * pero sin `onClick` elevada y con cursor de mano sin ser enfocable ni
 * activable por teclado, una afordancia falsa. La elevación se deriva SOLO de
 * `clickable`. Se acepta el prop un ciclo para no romper llamadas existentes:
 * avisa una vez por consola pidiendo migrar a `onClick`.
 * Estilos en css/core.css.
 */
let avisadoHoverDeprecado = false;
export function Card({
  hover, accent = false, padding = 20,
  onClick, onKeyDown, role, tabIndex,
  className = "", style, children, ...rest
}) {
  const clickable = typeof onClick === "function";
  if (hover && !avisadoHoverDeprecado && typeof console !== "undefined") {
    avisadoHoverDeprecado = true;
    console.warn(
      '[Transfiriendo] Card: el prop "hover" está deprecado y ya no eleva la tarjeta por sí solo — ' +
      'una tarjeta solo se eleva si es clicable. Pase "onClick" en su lugar; "hover" se elimina en la próxima versión mayor.'
    );
  }
  const handleKeyDown = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (!clickable || e.defaultPrevented) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e); }
  };
  return (
    <div
      className={`trf-card ${className}`.trim()}
      data-hover={clickable ? "" : undefined}
      data-accent={accent ? "" : undefined}
      role={role ?? (clickable ? "button" : undefined)}
      tabIndex={tabIndex ?? (clickable ? 0 : undefined)}
      onClick={onClick}
      onKeyDown={clickable || onKeyDown ? handleKeyDown : undefined}
      style={{ padding, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
