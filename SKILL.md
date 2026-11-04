---
name: transfiriendo-design
description: Use this skill to generate well-branded interfaces and assets for Transfiriendo, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and ready-made components and templates for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files: `styles.css` (the single entry point) plus `tokens/` for the design tokens, `css/` for the component stylesheets, `components/` for the reusable primitives, `templates/` for ready-made starting points (process console, KPI slide, login slide), `guidelines/` for the foundation specimen cards, and `assets/` for the official logo files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key facts to internalize: orange `#fc7603` is action (never decoration), gray `#565656` carries text; **the brand orange does not take white text** (2,72:1) — filled buttons use `--trf-neutral-900` on it and do not change fill on hover, they lift; type is Poppins + JetBrains Mono; base-4 spacing; one easing curve `cubic-bezier(.32,.72,0,1)`; two independent theme axes, `data-direction` (`material` · `calido` · `nitido`) for shape and `data-theme="dark"` for colour — six combinations, all AA-verified; every number goes through the `Format` module (`es-CO`), never a bare `toLocaleString`; Spanish (Colombia) copy in the formal **«usted»** register (never «vos» or «tú») that states fixes without apologizing; icons come from the shipped `Icon` component (a curated Lucide 0.460.0 subset, named by intent — load the Lucide UMD before the bundle); never redraw the logo — use `assets/`.

Before shipping, run the adherence check: the `Adherencia` card renders it in the browser, and `.github/workflows/adherencia.yml` runs it in CI. Nine rules, each born from a real defect in this project — raw hex, off-scale px, foreign fonts, missing keyframes, bare locales, literal fallbacks, unstyled variants, missing prop contracts and dead documentation paths.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
