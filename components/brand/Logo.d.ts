/**
 * Transfiriendo logo rendered from official image assets (never redrawn).
 * Light bg → orange circle + gray wordmark; dark bg → white lockup.
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Use the white version for dark backgrounds. */
  inverted?: boolean;
  /** Render the circular isotipo (mark only) instead of the full lockup. */
  isotipo?: boolean;
  /** Rendered height in px. Default 28. Min 39px screen for the full lockup, 51px for the isotipo. */
  height?: number;
  /** Asset folder base. Falls back to window.TRF_ASSET_BASE, then "assets". */
  base?: string;
  /** Explicit wordmark URL (overrides base). */
  src?: string;
  /** Explicit isotipo URL (overrides base). */
  isotipoSrc?: string;
}

export function Logo(props: LogoProps): JSX.Element;
