import React from "react";

/**
 * Transfiriendo primary control. One primary button per view; the rest are
 * secondary or ghost. Hover eleva (elevación, no color), press hunde.
 * Estilos en css/core.css — .trf-btn + data-variant / data-size.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  loadingLabel = "Procesando",
  disabled = false,
  full = false,
  className = "",
  children,
  ...rest
}) {
  const isDisabled = disabled || loading;
  return (
    <button
      className={`trf-btn ${className}`.trim()}
      data-variant={variant}
      data-size={size}
      data-full={full ? "" : undefined}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading
        ? <span className="trf-btn__spinner" role="status" aria-label={loadingLabel} />
        : Icon && <Icon size={16} strokeWidth={2} />}
      {children}
      {IconRight && !loading && <IconRight size={16} strokeWidth={2} />}
    </button>
  );
}
