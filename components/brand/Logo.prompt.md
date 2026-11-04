The official logo, always from image assets — never redrawn. Orange circle + gray wordmark on light; white lockup on dark. The isotipo (mark only) is for tight spaces: favicon, avatar, collapsed sidebar.

```jsx
// point the component at your assets folder once:
window.TRF_ASSET_BASE = "assets";

<Logo height={28} />
<Logo inverted height={28} />        {/* on dark backgrounds */}
<Logo isotipo height={40} />          {/* mark only */}
```

Minimum sizes (Manual §2.5 / §3.4): full lockup ≥ 39px tall on screen; isotipo ≥ 51px. Props: `inverted`, `isotipo`, `height`, `base` / `src` / `isotipoSrc`.
