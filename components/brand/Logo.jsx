import React from "react";

/**
 * Transfiriendo logo, rendered from the official image assets (never redrawn).
 * On light backgrounds: orange circle + gray wordmark. On dark: the white lockup.
 *
 * Asset base resolution order: `base` prop → window.TRF_ASSET_BASE → "assets".
 * Set window.TRF_ASSET_BASE once, or pass `src`/`isotipoSrc` to override fully.
 */
export function Logo({ inverted = false, isotipo = false, height = 28, base, src, isotipoSrc, style, ...rest }) {
  const h = typeof height === "string" ? parseFloat(height) : height;
  const root = base || (typeof window !== "undefined" && window.TRF_ASSET_BASE) || "assets";
  const wordmark = src || `${root}/${inverted ? "logo-blanco.png" : "logo.png"}`;
  const mark = isotipoSrc || `${root}/${inverted ? "isotipo-blanco.png" : "isotipo.png"}`;
  const file = isotipo ? mark : wordmark;
  // wordmark aspect ≈ 3.6:1 (padding-free lockup); isotipo is square.
  return (
    <img
      src={file}
      alt="Transfiriendo"
      style={{ height: h, width: "auto", display: "block", flex: "0 0 auto", alignSelf: "flex-start", ...style }}
      {...rest}
    />
  );
}
