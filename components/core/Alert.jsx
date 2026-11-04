import React from "react";

/**
 * Aviso inline: borde de 1px en el tono semántico, relleno suave e ícono.
 * `danger` y `warning` usan role="alert" (interrumpen); `info` y `success`,
 * role="status" (no interrumpen). Estilos en css/core.css.
 */
export function Alert({ tone = "info", title, icon: Icon, className = "", children, ...rest }) {
  const urgent = tone === "danger" || tone === "warning";
  return (
    <div
      className={`trf-alert ${className}`.trim()}
      data-tone={tone}
      role={urgent ? "alert" : "status"}
      {...rest}
    >
      {Icon && (
        <span className="trf-alert__icon">
          <Icon size={17} strokeWidth={2} />
        </span>
      )}
      <div>
        {title && <p className="trf-alert__title">{title}</p>}
        {/* div y no p: el cuerpo admite contenido en bloque sin producir HTML inválido. */}
        <div className="trf-alert__body">{children}</div>
      </div>
    </div>
  );
}
