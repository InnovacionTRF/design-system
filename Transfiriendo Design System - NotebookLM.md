# Transfiriendo — Design System (resumen para NotebookLM)

## Qué es esto
Sistema de diseño fiel a la marca para **Transfiriendo**, empresa B2B colombiana (Bogotá, ~20 años en el mercado), posicionada como una "nueva era de servicio". Manifiesto centrado en la **colaboración**: convertir transacciones en relaciones que crean valor. Eslogan: «Juntos creamos ecosistemas de negocio». Valores: trabajo en equipo, responsabilidad, proactividad, sinceridad.

El sistema sirve al área de **Innovación & IA** — software interno (consolas de automatización de procesos, dashboards, modelos, reportes). Producto de referencia: una consola de automatización de procesos.

Fuentes: *Manual de Marca Transfiriendo 2024* (PDF, 55 páginas) y una app de referencia interna *Innovación & IA*.

## Voz y tono (contenido)
- **Idioma:** español de Colombia, registro **«usted»** (nunca «tú» ni «vos»): "Ingrese", "Use", "Revise". Formal pero cercano.
- **Tono:** cálido, sencillo, seguro; simplifica lo complejo. Primera persona plural en copy de marca ("creemos", "trabajamos"); imperativo en "usted" para acciones de producto.
- **Errores:** dicen el arreglo, nunca se disculpan. Ej.: "Ingrese un número entero, sin puntos ni comas." Nada de "Lo sentimos".
- **Mayúsculas:** minúscula tipo oración en general; MAYÚSCULAS solo en etiquetas overline pequeñas.
- **Números:** formato español — coma decimal, punto de miles (99,4% · 1.840h · 1.240). IDs tipo TRF-4821 en monoespaciada.
- **Emoji:** no se usan nunca. Estado = badges + color semántico.
- **Vibra:** eficiente, transparente, ágil. "El naranja es acción, nunca decoración."

## Fundamentos visuales
- **Colores de marca:** naranja `#fc7603` (acción/foco, exclusivo de lo interactivo) y gris `#565656` (texto). Lienzo cálido `#f5f4f2` + blanco. Semánticos propios: success Sage `#87a37d`, info Vivid Blue `#0189cc`, warning Bright Orange `#fca03a`, danger Burnt Orange `#ec663b`.
- **Tipografía (2 niveles):** Poppins para Display/H1–H3 y momentos de marca; IBM Plex Sans para interfaz densa (H4 y menor, tablas, formularios); JetBrains Mono para IDs/códigos/métricas. Cambio de gobernanza de marca aprobado por Equipo de Innovación & IA (29-jul-2026).
- **Espaciado:** escala base-4 estricta (4/8/12/16/24/32/48/64).
- **Radios:** sm 4 · md 8 (controles) · lg 12 (tarjetas) · xl 16 · full (píldoras). Los inputs nunca llegan a píldora completa.
- **Tarjetas:** blancas, borde hairline 1px `#e0ded9`, radius-lg, sombra baja. Solo se elevan en hover si son clicables (halo naranja tenue). Máx. 1 tarjeta accent por pantalla.
- **Animación:** una sola curva `cubic-bezier(.32,.72,0,1)`. Duraciones: instant 100ms, fast 180ms, base 260ms, slow 400ms. `prefers-reduced-motion` desactiva todo.
- **Hover/press:** hover eleva (1–4px), press hunde (`scale(.97)`). Única metáfora física del sistema.
- **Transparencia/blur:** con moderación; overlays usan `--trf-scrim` sin blur (no `backdrop-filter` de ventana completa).
- **Imaginería:** cálida, poco ruido visual, logo en zonas tranquilas.

## Iconografía
- Componente `Icon` propio; set **Lucide 0.460.0** outline, trazo 2px (sustitución documentada, la app de referencia ya usaba lucide-react).
- Subconjunto curado (~32 iconos) nombrados por **intención** ("crear", no "Plus").
- Nunca emoji como iconos; flechas Unicode ↑↓ solo en deltas de métricas.
- Marcas de marca = PNG rasterizados, nunca redibujados.

## Assets de marca
`Logo` component envuelve: `logo.png` (lockup completo, fondos claros), `logo-blanco.png` (fondos oscuros), `isotipo.png`/`isotipo-blanco.png` (símbolo solo, espacios reducidos), `logo-naranja-blanco.png` (isotipo naranja + texto blanco). Tamaños mínimos: lockup ≥39px alto, isotipo ≥51px. Nunca alterar colores, proporciones ni tipografía del logo.

## Temas: dirección × modo (sistema 2-D)
- `data-direction`: `material` (default) · `calido` · `nitido`.
- `data-theme`: claro (default) · `dark`.
- 6 combinaciones completas de color+forma+elevación. El único invariante es el naranja de marca.
- **Material:** superficie blanca, sombra separa planos, radios 12/8/8.
- **Cálido:** neutros arena, radios generosos, control en cápsula (999px), sin elevación.
- **Nítido:** radio plano 6px, sin elevación, jerarquía por línea, neutros más fríos.
- Todos los tokens de texto cumplen WCAG AA (≥4,5:1) en las 6 combinaciones.

## Arquitectura CSS
- `styles.css` = manifiesto de `@import` (no reglas propias). Importa `tokens/` (custom properties, @font-face, keyframes) y `css/` (estilos de componente: base, core, library, charts, patterns).
- **Fuentes autohospedadas** (Poppins, IBM Plex Sans, JetBrains Mono) vía `.ttf` en `assets/fonts/` — cero peticiones externas a Google Fonts.
- Componentes usan CSS real (clases `.trf-*` + atributos `data-*`), nunca estilos inline.
- `tokens/compat.css` deprecado (alias cortos legacy); disponible opt-in vía `legacy.css`.
- Radio de **control** (`--trf-radius-md`) vs. radio de **contenedor** (`--trf-radius-lg`) es la distinción más importante del sistema.
- Acentos de color nunca en un solo borde lateral: tono se lee por relleno + ícono + borde completo de 1px.

## Componentes (namespace `window.TransfiriendoDesignSystem_…`)
- **core/:** Button, Input, Textarea, Card, Badge, Alert, Tabs, Switch, Checkbox, Radio/RadioGroup, Skeleton, Dialog/DialogTitle, Icon.
- **brand/:** Logo.
- **library/** (portados de app de referencia): Accordion, Breadcrumbs, Charts (Line/Bar/Donut/Sparkline), Chip, Combobox, DataGrid, DatePicker, DateRangePicker, FileUpload, Modal, Pagination, Popover, Select, Sidebar, StatCard, Stepper, Timeline, Toaster, Tooltip.
- **charts/:** FunnelChart, StackedBarChart, ScatterChart, Heatmap.
- **patterns/:** ConfirmDestructive, UndoToast, UnsavedBar.

Sin UI kit interactivo actualmente (se removió a pedido del usuario); superficies de producto viven como plantillas: `templates/consola/`, `templates/slide-kpis/`, `templates/slide-login/`.

## Accesibilidad
- Todo interactivo tiene `:focus-visible`, nombre accesible, objetivo táctil ≥24×24px.
- Patrones ARIA completos: Tabs (tablist+flechas), Combobox/Select (aria-activedescendant), DataGrid (aria-sort), Modal (trampa de foco completa), Accordion, Sidebar, Tooltip.
- Paneles cerrados se desmontan (`hidden`), no se ocultan con opacidad.
- Strings y etiquetas ARIA son props con default en español — sobreescribibles, sin capa i18n.

## Responsive
Mobile-first; breakpoints como constantes literales en `@media` (custom properties no evalúan ahí): sm 480 · md 768 · lg 1024 · xl 1280. Por debajo de md, Sidebar pasa a drawer deslizante; Tabs hace scroll horizontal; Stepper solo rotula el paso actual.

## Verificación de adherencia (CI)
10 reglas automatizadas nacidas de defectos reales del proyecto (hex crudo, valores fuera de escala base-4, fuentes ajenas, animaciones sin keyframes, texto blanco sobre relleno naranja, locale suelto, fallback literal, variante sin regla CSS, componente sin contrato .d.ts, ruta muerta). Corre en `.github/workflows/adherencia.yml` en cada push, y en una tarjeta interactiva del propio Design System.

## Orden narrativo de la pestaña Design System
1. Marca → 2. Color → 3. Tipografía → 4. Espacio y forma → 5. Movimiento y elevación → 6. Componentes → 7. Navegación → 8. Gráficas → 9. Pantallas.
