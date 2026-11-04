# Transfiriendo — Design System

Un sistema de diseño fiel a la marca para **Transfiriendo**, derivado del *Manual de Marca Transfiriendo 2024* y de la app de referencia interna *Innovación & IA*. Le da a los agentes de diseño los tokens, componentes, assets de marca y kit de UI necesarios para construir interfaces y prototipos fieles a la marca.

## Contexto de la empresa y el producto
Transfiriendo es una empresa B2B colombiana (Bogotá) con ~20 años liderando innovación, posicionada como una "nueva era de servicio". Su manifiesto gira en torno a la **colaboración** — convertir transacciones en relaciones genuinas que crean valor. El eslogan es **«Juntos creamos ecosistemas de negocio»**. Valores de marca: **trabajo en equipo, responsabilidad, proactividad, sinceridad**.

Este sistema apunta al área de **Innovación & IA** — software interno (consolas de automatización de procesos, dashboards, herramientas de modelos/reportes). La superficie de producto de referencia es una **consola de automatización de procesos**, disponible como punto de partida en `templates/consola/`.

## Fuentes provistas
- **`uploads/MANUAL-CORPORATIVO-TRANSFIRIENDO-2024.pdf`** — manual de marca de 55 páginas (construcción del logo, área de seguridad, tamaños mínimos, paletas de color completas, tipografía, papelería). **Presente en este proyecto.**
- **Proyecto fuente «Sistema de diseño Transfiriendo»** (`fb478a77-065b-4e8b-962e-8b2af38018da`) — de ahí se portaron los 19 componentes de `components/library/` y se validaron los tokens. Contiene además dos archivos de referencia que **no existen en este proyecto** y solo se abren allí: `transfiriendo-design-system.jsx` bajo su `uploads/` (sistema React + Tailwind) y `transfiriendoTheme.js` bajo su carpeta `theme` (implementación MUI).
- **Brand assets** — `assets/` (ver abajo); los originales en PNG/PDF viven en el proyecto fuente.

---

## FUNDAMENTOS DE CONTENIDO
Cómo escribe Transfiriendo el copy en producto:

- **Idioma:** español (Colombia). El registro corporativo es **«usted»**, no «tú» ni «vos»: “Ingrese”, “Use”, “Revise”, “vuelva a intentar”. Formal pero cercano — nunca acartonado. (La app de referencia usaba voseo; **no** es uso corporativo y no debe replicarse.)
- **Tono:** cálido, sencillo, seguro. Simplifica lo complejo (“hacer que lo difícil sea fácil”). Primera persona del plural colaborativa en el copy de marca (“creemos”, “trabajamos”, “construimos”); imperativo en «usted» para acciones de producto.
- **Los errores dicen el arreglo, nunca se disculpan.** P. ej. *“Ingrese un número entero, sin puntos ni comas.”* / *“Revise las credenciales del origen y vuelva a intentar.”* Nada de “Lo sentimos”, ni culpar al usuario.
- **Uso de mayúsculas:** minúscula tipo oración para texto de UI y encabezados. MAYÚSCULAS solo para etiquetas pequeñas tipo overline/metadatos (con letter-spacing). Números de sección y códigos en monoespaciada.
- **Números:** formato en español — coma decimal, punto de miles (`99,4%`, `1.840h`, `1.240`). IDs como `TRF-4821` en mono.
- **Emoji:** **no se usan.** El estado se muestra con badges, puntos y color semántico, nunca con emoji.
- **Vibra:** eficiente, transparente, ágil. "El naranja es acción, nunca decoración." Seguridad sin exageración.

Example (login): *“Juntos creamos ecosistemas de negocio”* → *“Ingrese a su cuenta. Use su correo corporativo.”*

---

## FUNDAMENTOS VISUALES
- **Colores.** Solo dos colores de marca: **naranja `#fc7603`** (PANTONE 1585 C) y **gris `#565656`** (PANTONE 425 C). Naranja = acción/foco, reservado para lo interactivo; el gris lleva el texto. Un lienzo neutro cálido (`#f5f4f2`) y papel blanco. Los colores semánticos se toman de las paletas secundaria/terciaria propias de la marca — **success** Sage `#87a37d`, **info** Vivid Blue `#0189cc`, **warning** Bright Orange `#fca03a`, **danger** Burnt Orange `#ec663b` — nunca de librerías externas.
- **Tipografía.** Sistema de **dos niveles** desde la Fase 4. **Poppins** (Light/Regular/Medium/SemiBold) queda para **Display/H1/H2/H3** y momentos de marca — titulares, cifras destacadas, el logo — la tipografía complementaria aprobada por el manual (§4.2), acotada a ese rol y no reemplazada. **IBM Plex Sans** (Regular/Medium/SemiBold) es la fuente de **interfaz** desde H4 hacia abajo: tablas, formularios, badges, metadatos — todo lo que se lee denso, donde una geométrica como Poppins pierde diferenciación entre glifos parecidos. Ninguna reemplaza a la otra; cada una tiene un trabajo, igual que **JetBrains Mono** ya es la fuente de soporte para IDs, códigos y métricas. `--trf-font-brand` (Poppins) y `--trf-font-sans` (Plex) son los tokens; casi todo el sistema ya escribía `var(--trf-font-sans)` sin saber qué fuente había detrás, así que la migración no tocó componentes. La escala también se recalibró en el mismo movimiento — `lg` 16→17, `sm` 14→13, `xs` 13→12 — para sacar la zona `lg/base/sm` de una razón 1,07 casi imperceptible; ver `guidelines/type-body.card.html`.

  ⚠️ **Cambio de gobernanza de marca, no solo de CSS.** El manual §4.2 aprueba Poppins para «todo lo que se lee en pantalla»; esta fase reinterpreta ese alcance como «lo que debe verse», no «todo lo que se lee», y añade una segunda fuente para «lo que debe leerse». **Requiere aprobación de quien gestiona la identidad de marca antes de producción.** Aprobado por: Equipo de Innovación & IA — 2026-07-29.
- **Espaciado.** Escala estricta **base-4** (4/8/12/16/24/32/48/64). Sin valores sueltos; todo lo que respira usa un múltiplo.
- **Radios de esquina.** `sm 4` · `md 8` (controles) · `lg 12` (tarjetas) · `xl 16` · `full` (píldoras/switches/badges). Los inputs nunca llegan a píldora completa.
- **Fondos.** Neutros cálidos planos y blanco. Sin fotografías de fondo tipo hero en el producto. El único gradiente permitido es un resplandor naranja radial sutil sobre paneles oscuros de marca (ver login). Sin texturas repetidas, sin patrones cargados.
- **Tarjetas.** Blancas, borde hairline de 1px (`#e0ded9`), `radius-lg`, sombra suave y baja (`0 1px 3px rgba(47,47,47,.09)`). Una tarjeta solo **se eleva en hover si es clicable**: `translateY(-4px)` + un halo tenue con tinte naranja (`0 10px 30px -10px rgba(252,118,3,.22)`) + el borde se calienta a `#ffd8a8`. Máximo una tarjeta **accent** (naranja suave) por pantalla.
- **Sombras.** Bajas y suaves; la elevación es contenida. Los botones primarios llevan una sombra con tinte naranja que se profundiza en hover. Los paneles oscuros no usan sombra.
- **Bordes.** Hairline `#e0ded9` en reposo; `#c4c4c4` en hover fuerte; **naranja `#fc7603`** en foco/activo. El foco añade un anillo de 4px `rgba(252,118,3,.12)`.
- **Animación.** **Una sola curva de easing en todo el sistema:** `cubic-bezier(.32,.72,0,1)` — arranque rápido, parada suave. Duraciones: `instant 100ms`, `fast 180ms` (botones/inputs/toggles), `base 260ms` (tabs/dropdowns), `slow 400ms` (modales/paneles/entrada de página). Nada se mueve más de 400ms. `prefers-reduced-motion` desactiva toda animación (piso de calidad).
- **Hover / press.** El hover **eleva** (botones/tarjetas suben 1–4px); el press **hunde** (`scale(0.97)`). Las transiciones de color se mueven *hacia* el naranja; nada parpadea ni pulsa solo para llamar la atención. Este subir/hundir es la única metáfora física del sistema.
- **Transparencia / blur.** Con moderación: los headers pegajosos pueden usar `backdrop-blur` con una superficie blanca al 85%. Los overlays usan el token `--trf-scrim` (`rgba(47,47,47,.34)` claro, `rgba(0,0,0,.62)` oscuro) y **sin blur** — un `backdrop-filter` sobre toda la ventana se repinta en cada scroll detrás de él, y el scrim solo ya separa los planos. Los rellenos semánticos usan colores de marca con alfa bajo.
- **Entrada de página.** El contenido sube 12px con un fade (`trf-rise`). Una sola dirección — nunca desde los lados, nunca con escala.
- **Vibra de la imaginería.** Cálida; cuando se usa fotografía, poco ruido visual y el logo colocado en zonas tranquilas (Manual §2.11).

---

## ICONOGRAFÍA
- **El sistema envía un componente `Icon`** (`components/core/Icon.jsx`). No delega la iconografía al consumidor.
- **Set:** **Lucide 0.460.0**, estilo outline, trazo 2px, 16px por defecto en controles. Es una sustitución documentada: la app de referencia importa `lucide-react` y no hay iconos SVG propios en las fuentes de marca.
- **Contrato de carga.** `Icon` lee `window.lucide`, así que la página debe traer el UMD antes del bundle:

  ```html
  <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.js"></script>
  ```

  Si Lucide no está cargado, `Icon` reserva el hueco y avisa una vez por consola: el layout no salta.
- **Subconjunto curado, no Lucide entero.** `ICONS` (en `Icon.jsx`) define ~32 entradas agrupadas por propósito: acciones, navegación, datos, estado, dominio Innovación & IA y cuenta. **Se nombran por intención, no por glifo**: `<Icon name="crear" />`, no `Plus`. Un nombre fuera del set no pinta. Un set completo sin curaduría es lo mismo que no tener guía: dos personas resuelven «eliminar» con dos glifos distintos y la interfaz deja de ser reconocible. Para añadir uno, escriba su intención en `ICONS`.
- **Nombre accesible:** sin `title` el icono es `aria-hidden`, que es lo correcto cuando acompaña a un texto que ya dice lo mismo. Con `title` pasa a `role="img"`.
- **`Button`, `Input` y `Alert`** reciben `icon` como *componente*, no como nombre: `icon={(p) => <Icon name="crear" {...p} />}`. Esperan `size` 16 y `strokeWidth` 2.
- **Emoji:** nunca se usan como iconos. Las **flechas Unicode** (`↑ ↓`) aparecen solo dentro de deltas de métricas.
- Las **marcas de marca** son assets PNG rasterizados (ver abajo), nunca redibujadas en código. El estado usa color + `Badge`, no iconos solos.

## Assets de marca (`assets/`)
Todos se usan vía el componente **`Logo`**, nunca redibujados ni recoloreados.
- `logo.png` — lockup completo (isotipo naranja + «Transfiriendo» en gris). Fondos claros. → `<Logo />`
- `logo-blanco.png` — lockup todo blanco. Fondos oscuros. → `<Logo inverted />`
- `isotipo.png` / `isotipo-blanco.png` — solo el símbolo circular (conexión), para espacios reducidos: favicon, avatar, sidebar colapsada. → `<Logo isotipo />` / `<Logo isotipo inverted />`
- `logo-naranja-blanco.png` — isotipo naranja + wordmark blanco, para fondos oscuros donde se quiera conservar el naranja. No tiene variante propia en el componente: páselo con `<Logo src="assets/logo-naranja-blanco.png" />`.

**Tamaños mínimos** (Manual §2.5 / §3.4): lockup completo ≥ 39px de alto en pantalla (2,08×0,55cm impreso); isotipo ≥ 51px (1,5×1,5cm). Escalas en uso en este sistema: 30px (topbar), 40px (plantillas), 56px (slides), 72–110px (paneles de marca).

**Nunca**: alterar colores, proporciones, orientación ni tipografía del logo; invertir tonos; reordenar los elementos; reducir por debajo de la escala mínima.

`Logo` resuelve la carpeta de assets con `base` → `window.TRF_ASSET_BASE` → `"assets"`. En una página anidada pase `base` con la ruta relativa correcta.

---

## Índice / manifiesto

**CSS global** — `styles.css` (enlazar solo este archivo). Importa `tokens/` (custom properties y `@font-face`): `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `animation.css` (los `@keyframes`), `elevation.css`, `themes.css` (direcciones visuales), `dataviz.css` (series y escala de calor); y `css/` (estilos de componente): `base.css`, `core.css`, `library.css`, `charts.css`, `patterns.css`. `legacy.css` es opt-in y está deprecado.

**Animaciones.** Los `@keyframes` viven solo en `tokens/animation.css` y llegan con `styles.css`: `trf-spin` (spinner), `trf-shimmer` (skeleton), `trf-rise` (entrada de contenido, 12px de subida + fade), `trf-dialog-in`, `trf-toast-in` y `trf-dock-in`. Ningún componente inyecta un `<style>` propio. El bloque `prefers-reduced-motion` de `motion.css` los neutraliza todos.

**Formato de números y fechas.** Un solo módulo, un solo locale: `components/library/format.js`, expuesto en el bundle como `Format`. Nada en el sistema llama a `toLocaleString` ni a `localeCompare` por su cuenta.

```js
const { Format } = window.TransfiriendoDesignSystem_0ece16;
Format.int(1240)       // "1.240"
Format.decimal(1.8)    // "1,8"
Format.percent(99.4)   // "99,4%"
Format.delta(-3.1)     // "−3,1%"
Format.thousands(2000) // "2 k"        (etiquetas de eje)
Format.compact(1840)   // "1,8 K"
Format.currency(1240)  // "$ 1.240"
Format.date(new Date())// "29 de jul de 2026"
Format.compare(a, b)   // ordenación de tablas
```

El locale es **`es-CO`**, contrastado contra las reglas de arriba: `1.240`, `1.840`, `99,4%`, `1,8`, `12.500`. Dos salidas de es-CO conviene conocerlas, documentadas en vez de corregidas a mano —corregirlas devolvería el sistema a un formato inventado—: **compacto** da `"1,8 K"` (unidad en mayúscula, espacio duro) y **moneda** da `"$ 1.240"` (signo separado, espacio duro). Si un diseño necesita otra forma, pase la unidad por `unit` en vez de reformatear.

Ojo con `percent`: recibe el número **tal como se muestra** (`99.4`), no la fracción.

**Reglas de token.** Todo color, radio, espacio, sombra y duración sale de un token `--trf-*`; no se escriben hexadecimales sueltos en componentes. Los colores de serie (`--trf-series-1…8`) tienen orden fijo y el naranja de marca se reserva a la serie principal. `components/library/chartData.js` **no duplica** esos valores: sus colores son referencias `var(--trf-series-N)`, que funcionan igual como `fill`/`stroke` de SVG que como `background`. `tokens/dataviz.css` es el único origen de verdad y no hay nada que sincronizar.

**Contraste.** Todos los tokens de texto cumplen **WCAG AA (≥4,5:1)** en las seis combinaciones dirección × modo. Medido sobre el **peor** de los cuatro fondos de cada combinación —`surface`, `bg`, `surface-2` y `surface-accent`, este último compuesto cuando es translúcido:

| | text | secondary | muted | success | info | danger | orange |
|---|---|---|---|---|---|---|---|
| Material claro | 12,18 | 6,68 | 4,71 | 4,63 | 5,41 | 4,79 | 4,82 |
| Material oscuro | 10,87 | 6,14 | 4,65 | 7,51 | 5,39 | 6,43 | 6,51 |
| Cálido claro | 12,01 | 5,51 | 4,66 | 4,57 | 5,34 | 4,73 | 4,75 |
| Cálido oscuro | 10,48 | 5,20 | 4,77 | 7,53 | 5,41 | 6,45 | 6,53 |
| Nítido claro | 15,81 | 7,10 | 4,84 | 4,63 | 5,41 | 4,79 | 4,81 |
| Nítido oscuro | 12,54 | 5,50 | 4,71 | 8,07 | 5,80 | 6,91 | 7,00 |

Rellenos y texto sobre color: naranja de marca + `--trf-neutral-900` **4,93** · `--trf-danger-action` + blanco **4,86** · escala de calor 12,22 / 9,97 / 7,16 / 4,93 / 6,13. `--trf-text-disabled` es el único exento (WCAG exime el estado deshabilitado).

La rampa tiene cuatro niveles: `--trf-text` → `--trf-text-secondary` → `--trf-text-muted` → `--trf-text-disabled`.

**Dos pares de tokens que se confunden.** Son la causa de la mayoría de los fallos de contraste que hubo:
- **Relleno vs. texto** — un token de relleno nunca va como `color:`. `--trf-danger` (`#ec663b`) es borde, barra o icono (umbral 3:1); el texto va en `--trf-danger-text` y el fill de botón destructivo en `--trf-danger-action`. Igual con `--trf-action` (fill) frente a `--trf-orange-text` (texto).
- **Texto sobre fill vs. sobre superficie invertida** — `--trf-text-on-fill` es blanco y **no voltea** con el tema, porque el fill de color sigue siendo oscuro en modo oscuro. `--trf-text-on-inverse` **sí voltea**: en claro es blanco sobre `#2f2f2f` y en oscuro es `#2f2f2f` sobre `#f2f2f2`, porque describe una superficie, no un relleno.

**Texto sobre el naranja de marca.** El fill `#fc7603` **no admite texto blanco** (2,72:1). El botón primario lleva texto `--trf-neutral-900` (4,93:1) y el fill no cambia en hover ni en press: el hover se expresa con elevación y subida, porque oscurecer el naranja baja el ratio con texto oscuro y aclararlo saldría de la paleta o chocaría con `--trf-warning`.

**Escala de calor.** El color del texto se deriva del **mismo índice de bucket** que el fondo, nunca de un umbral aparte: `heat-1…4` llevan `--trf-text` y solo `heat-5` lleva blanco. `heat-5` es `#a8410f`; el `#ec663b` anterior no admitía ningún color de texto a 11px.

**Estilos: CSS real, no inline.** Los componentes se pintan con clases de `css/`, no con `style={{…}}`. Convención única en todo el sistema:

- una clase de bloque por componente (`.trf-btn`, `.trf-card`, `.trf-alert`);
- variantes y estados viajan en atributos `data-*` (`data-variant`, `data-tone`, `data-size`, `data-hover`), que salen directos de los props sin concatenar `className`;
- los sub-elementos usan `__` (`.trf-switch__thumb`);
- ninguna transición usa `all`: las propiedades se enumeran siempre.

Es lo que habilita `:focus-visible`, `:hover` nativo y media queries dentro de un componente. **Anillo de foco unificado** en `css/base.css` para todo elemento interactivo, con más cuerpo sobre superficie oscura y sobre `--trf-sidebar-bg`.

⚠️ **Cambio incompatible a nivel de estilo (versión mayor).** La superficie pública no cambia —mismos nombres, props y namespace— pero los componentes **ya no llevan sus estilos dentro del JS**: el consumidor debe enlazar `styles.css` o saldrán sin estilar.

⚠️ **`Card`: `hover` deprecado (revisión de Fase 3).** Antes, `data-hover={hover || clickable ? "" : undefined}` dejaba que una `Card` con `hover` pero sin `onClick` se elevara y mostrara cursor de mano **sin ser enfocable ni activable por teclado** —una afordancia falsa, justo lo contrario de la regla que este mismo readme documenta («una tarjeta solo se eleva si es clicable»). La elevación ahora se deriva **únicamente** de `onClick`. `hover` se acepta un ciclo por compatibilidad —no hace nada, avisa una vez por consola pidiendo migrar a `onClick`— y se elimina en la próxima versión mayor.

**Strings y etiquetas accesibles.** Todo texto visible y toda etiqueta ARIA es un **prop con default en español (es-CO, registro «usted»)**. No hay capa de i18n: se sobreescribe prop a prop.

```jsx
<Pagination total={90} page={2} summary={(d, h, n) => `${d}–${h} de ${n} procesos`} />
<Modal closeLabel="Descartar" headingLevel={3} />
<Sidebar expandLabel="Abrir menú" collapseLabel="Cerrar menú" />
```

Las **frases con interpolación son funciones**, no concatenaciones: `summary(from, to, total)` en `Pagination`, `dayLabel(d, mes, año)` en los calendarios, `progressLabel(nombre)` y `removeLabel(nombre)` en `FileUpload`, `promptLabel(frase)` en `ConfirmDestructive`. Concatenar impide pluralizar y reordenar; una función deja ambas cosas en manos de quien la usa.

⚠️ **Las cuatro gráficas aceptan `label` y hay que pasárselo.** Los defaults dicen «Serie temporal», «Comparativa por categoría»… Cuatro gráficas en un panel repitiendo eso no le dicen nada a un lector de pantalla: describa **esa** gráfica —«Volumen mensual por unidad, enero a junio de 2026»—. Es la única etiqueta del sistema cuyo default es deliberadamente insuficiente.

**Un solo diálogo.** `Modal` y `ConfirmDestructive` se componen sobre la primitiva **`Dialog`** (`components/core/`), que concentra scrim, trampa de foco, foco inicial, restauración del foco, Escape, clic en el scrim y bloqueo del scroll. Antes cada uno traía su copia y las dos divergieron en scrim, nivel de encabezado y afordancias de cierre.

El **scrim es un token único**, `--trf-scrim`, y lo usan también el drawer de `Sidebar` y cualquier overlay futuro. **Sin `backdrop-filter`**: el blur queda reservado a cabeceras sticky, como dice arriba — sobre el área completa de la ventana repinta en cada scroll del contenido de detrás, y el scrim solo ya separa las capas.

El **nivel del encabezado no se cablea**: `headingLevel` (1–6, por defecto 2) en `Modal` y `ConfirmDestructive`, porque un diálogo no siempre cuelga del mismo nivel de la página. Un control con `data-autofocus` dirige el foco inicial.

**Accesibilidad.** Todo elemento interactivo tiene `:focus-visible` (definido una vez en `css/base.css`, con variante reforzada sobre superficie oscura y sobre `--trf-sidebar-bg`), nombre accesible y objetivo táctil **≥24×24** (WCAG 2.2 SC 2.5.8). Patrones ARIA completos en `Tabs` (tablist + flechas), `Combobox` y `Select` (combobox/listbox + `aria-activedescendant`), `DataGrid` (`<button>` de orden + `aria-sort`), `Modal` (trampa de foco, foco inicial, restauración al cerrar, bloqueo de scroll, `aria-labelledby`), `Accordion` (`aria-expanded`/`aria-controls` + `role="region"`), `Sidebar` (`<nav>` + `aria-current`) y `Tooltip` (`aria-describedby` + descarte con Escape).

Regla que se rompía en varios sitios: **los paneles cerrados se desmontan** (`hidden`), no se ocultan con `opacity`. Ocultar con opacidad deja los controles en el orden de tabulación y en el árbol de accesibilidad, así que un usuario de teclado tabula dentro de una lista invisible.

La tarjeta **Auditoría de accesibilidad** monta 19 controles y mide nombre accesible, tamaño de objetivo y anillo de foco: si alguien añade un control sin nombre o por debajo de 24px, lo marca en rojo.

**Responsive.** Enfoque mobile-first. Los breakpoints van en `css/responsive.css` como **constantes escritas literales** en cada `@media`, porque las custom properties **no funcionan dentro de `@media`** (`@media (min-width: var(--trf-bp-md))` no evalúa). Los tokens `--trf-bp-*` existen solo para leerlos desde JS.

| | Ancho | Uso |
|---|---|---|
| `sm` | 480px | móvil grande · rejillas de 1 → 2 columnas |
| `md` | 768px | tablet · umbral del drawer de navegación |
| `lg` | 1024px | escritorio angosto · rejillas a 3–4 columnas |
| `xl` | 1280px | escritorio |

Por debajo de `md`, `Sidebar` pasa a **drawer deslizante** (`open` lo muestra, `onClose` recibe el clic en el scrim, con el mismo `--trf-scrim` de los diálogos); en escritorio ambos props se ignoran. Utilidades de rejilla listas: `.trf-kpis`, `.trf-kpis-3`, `.trf-pagehead`.

**Comportamiento móvil de cada componente de navegación**, medido, no supuesto:

| Componente | Por debajo de `md` | Por qué |
|---|---|---|
| `Sidebar` | Drawer deslizante sobre el contenido, 260px / 82vw | Los 220px fijos se comen la pantalla |
| `Tabs` | Desplazamiento horizontal, sin barra visible | Envolver a dos filas rompe el indicador naranja, que se posiciona con `offsetLeft` sobre una sola línea |
| `Stepper` | Solo se rotula el paso **actual** (por debajo de 600px) | Los números siguen visibles, así que no se pierde la posición; lo que se oculta son las etiquetas que no toca leer ahora |
| `Breadcrumbs` | Se reacomoda en varias líneas | Ya lleva `flex-wrap`; no necesita regla |
| `Pagination` | Resumen y controles se apilan | Ya lleva `flex-wrap`; no necesita regla |

`Tabs` y `Stepper` **desbordaban** en móvil hasta esta revisión: el primero es un flex sin `wrap` y el segundo tiene las etiquetas en `white-space: nowrap`.

**Migrado: todo.** `components/core/` → `css/base.css` + `css/core.css`; `components/library/` (19) → `css/library.css`; `components/charts/` → `css/charts.css`; `components/patterns/` → `css/patterns.css`. Ningún componente ni tarjeta usa `style={{…}}` para estilo estático ni alias cortos.

⚠️ **`tokens/compat.css` quedó deprecado y fuera de la cadena de `styles.css`.** Sus alias cortos (`--accent`, `--surface`, `--text-2`, `--ctrl-radius`…) ya no son tokens válidos del sistema: el conteo bajó de 364 a 284 al sacarlos. Si un consumidor externo todavía los referencia, puede enlazar `legacy.css` **después** de `styles.css` como parche temporal. No se añaden alias nuevos ahí.

**Radio: control vs. contenedor.** Es la distinción que más se rompe.
- `--trf-radius-md` es el radio de **control**: botones, inputs, celdas de calendario. En Cálido vale **999px** (cápsula).
- `--trf-radius-lg` es el radio de **contenedor**: cards, modales, banners, toasts, paneles, tooltips.

Un contenedor sobre el radio de control se vuelve un estadio en Cálido. Si el elemento no se pulsa, va en `--trf-radius-lg`.

**Acentos de color: nunca en un solo borde.** Un borde lateral grueso en el tono semántico —el recurso clásico de `Alert`— deja el color colgado de un canto mientras el resto del contorno no pertenece a nadie, y se rompe en RTL. La regla del sistema es: **el tono se lee por relleno, ícono y borde completo de 1px**, las tres vías a la vez y ninguna de más de 1px. `Alert` la sigue; `Timeline` y `Toaster` anclan el tono en el ícono.

Los alias cortos de `compat.css` que usa la librería portada siguen la dirección a través del token de **contenedor**, nunca del de control: `--radius-lg` → `--trf-radius-lg` (12/16/6, para Accordion, DataGrid, FileUpload, Modal, StatCard) y `--radius-md` → `--trf-radius-sm` (8/12/6, para los paneles de dropdown de Combobox, DatePicker, DateRangePicker, Popover y Select). `--ctrl-radius` es el único que va al token de control.

**Por qué `compat.css` declara alias en `*` y no solo en `:root`.** Cuando el valor de una custom property contiene `var()`, la sustitución ocurre en el elemento donde se **declara**, no donde se usa. Declarado en `:root`, `--ctrl-radius` se resolvería al literal `8px` sobre `<html>` y ese valor ya resuelto se heredaría hacia abajo — un `data-direction` en un descendiente jamás podría cambiarlo, y los 19 componentes portados quedarían fuera del sistema de direcciones. Declarados en `*`, la indirección se re-resuelve en cada elemento.

**Anidamiento.** `data-direction` y `data-theme` funcionan **a cualquier nivel del DOM**, no solo en `<html>`: se puede tematizar un panel suelto. Para que una dirección anidada herede el tema oscuro del ancestro, cada bloque oscuro de `themes.css` se declara con dos selectores — el compuesto `[data-direction="D"][data-theme="dark"]` y el descendente `[data-theme="dark"] [data-direction="D"]:not([data-theme])`. Sin el segundo, un `<div data-direction="calido">` dentro de `<html data-theme="dark">` hacía match solo con el bloque claro y el panel revertía a claro. El `:not([data-theme])` deja que un descendiente declare su propio tema y lo gane.

La tarjeta **Anidamiento de tema y dirección** mide los **cinco** casos en el DOM: dirección anidada bajo tema oscuro, ambos en el mismo nodo, panel oscuro dentro de página clara, dirección anidada en página clara (que debe seguir clara), y tema oscuro anidado bajo una dirección. Los cinco en verde.

## Temas: dirección × modo
El sistema es una **búsqueda 2-D**: la combinación de dirección y modo produce un juego **completo** de tokens (color, forma y elevación a la vez). Tres direcciones × dos modos = seis combinaciones.

| Atributo | Valores |
|---|---|
| `data-direction` | `material` · `calido` · `nitido` *(por defecto)* |
| `data-theme` | *(claro por defecto)* · `dark` |

```html
<html data-direction="nitido" data-theme="dark">
```

Seis combinaciones: cada dirección en claro y en oscuro.

- **Material** — superficie blanca sobre lienzo cálido (`#f5f4f2`); la sombra separa los planos. Radios 12 / 8 / 8. Ya no es la dirección implícita: se activa con `data-direction="material"`.
- **Cálido** — neutros arena (`#faf8f5`, texto secundario `#97887a`) y radios generosos: card 16px y **control en cápsula (999px)**. Sin elevación: separan el aire y la calidez.
- **Nítido** — radio **plano de 6px** en card, control y detalle; **sin elevación**: la jerarquía la carga la línea. Neutros más fríos (`#f4f4f3`) y texto más contrastado (`#1a1a1a`). **Dirección por defecto**: se aplica sin necesidad de declarar `data-direction`.
- En oscuro solo Material usa sombra; Cálido y Nítido siguen sin ninguna.

**La dirección sí cambia el color** de fondos, superficies, texto y bordes — no solo la forma. Lo único invariante en las seis combinaciones es el **naranja de marca `#fc7603`**.

Los valores salen **verbatim de la tabla `themes` del proyecto fuente** (`a` = Material, `b` = Cálido, `c` = Nítido). El manual de marca **no** define estas direcciones; son una capa del sistema de diseño, no de la identidad.

**Contraste.** Los tres niveles de texto legible cumplen **WCAG AA (≥4,5:1)** en las seis combinaciones. Medido sobre el peor caso de cada dirección (lienzo o superficie):

| | secundario | muted |
|---|---|---|
| Material claro / oscuro | 6,68 / 7,83 | 4,71 / 5,12 |
| Cálido claro / oscuro | 5,80 / 6,66 | 4,62 / 4,57 |
| Nítido claro / oscuro | 7,10 / 7,01 | 4,84 / 4,83 |

La rampa tiene cuatro niveles y solo el último está exento de AA:
`--trf-text` (12–16:1) → `--trf-text-secondary` → `--trf-text-muted` → `--trf-text-disabled` (**solo** para estado deshabilitado, que WCAG exime).

**Desviaciones deliberadas de la fuente.** La tabla `themes` traía el texto secundario y el muted por debajo de AA (Cálido secundario 3,4:1; muted 2,5–2,9:1 en las tres direcciones). Se oscurecieron conservando el matiz de cada dirección — el tierra en Cálido, el gris neutro en Material y Nítido. Son los únicos valores no verbatim, y se cambiaron porque enviar texto ilegible no es una decisión de marca que se pueda heredar. Todo lo demás (fondos, superficies, bordes, radios, elevación) sigue verbatim.

Nota: subir el muted comprimió la distancia entre niveles; en Cálido claro quedan a 1,18 puntos de ratio. Si necesita más separación visual, el camino es oscurecer el secundario, no aclarar el muted.

## Entrega de CSS
`styles.css` es un manifiesto de `@import`: los fuentes quedan separados por legibilidad y el navegador los pide en paralelo una vez parseado el manifiesto. Para un consumidor que prefiera **una sola petición** en vez de quince, CI genera `dist/styles.bundle.css` — la concatenación literal de esas quince hojas locales, en el mismo orden. Se regenera y se verifica en cada push (`node` inline en `.github/workflows/adherencia.yml`, igual que `_ds_bundle.js`): si alguien edita una hoja de token o de componente sin volver a construir el bundle, el paso falla.

**Fuentes autohospedadas — cero peticiones externas.** Poppins, IBM Plex Sans y JetBrains Mono se sirven como `.ttf` desde `assets/fonts/` vía `@font-face` en `tokens/fonts.css`, que entra en `styles.css` como cualquier otra hoja de tokens. **El contrato es simple: enlazar solo `styles.css` (o `dist/styles.bundle.css`) basta** — no hace falta ningún `<link>` adicional a Google Fonts, ni `preconnect`, ni un segundo archivo. Antes cada `*.card.html` y los `<helmet>` de las plantillas traían además un `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">` propio: la familia cargaba por **dos caminos** a la vez (el `@font-face` local y la hoja de Google), una petición externa de más por página y dos fuentes de verdad para lo mismo. Se retiraron esos `<link>` (y sus dos `preconnect`) de las 47 páginas que los traían; verificado que Poppins/Plex/JetBrains Mono siguen renderizando igual solo con `styles.css` enlazado.

`ds-base.js` de las tres plantillas enlazaba **seis hojas de tokens a mano y además `styles.css`**, que ya las importa todas: el navegador pedía cada archivo de tokens dos veces. Ahora enlaza una sola hoja.

**Deuda anotada, fuera de alcance de este cambio:** los archivos son `.ttf`, no `.woff2`. `.woff2` con compresión Brotli suele pesar 2–3× menos que `.ttf` para la misma fuente — es una optimización de peso, no una inconsistencia entre código y documentación, así que no se tocó aquí. Cuando se aborde, conviene generar los `.woff2` a partir de estos mismos `.ttf` (misma fuente real, no una sustitución) y añadir un segundo `src` en cada `@font-face`.

**Y una regla nueva, 8b, que atrapa la clase exacta de defecto que motivó este punto:** la cabecera de `tools/checks.mjs` citaba `tools/verify.mjs`, un runner que nunca existió — el real quedó inline en el workflow desde la Fase 2 — y la regla 8 no lo vio porque solo miraba `readme.md`/`SKILL.md`. 8b busca rutas del repo citadas dentro de comentarios `/* */` y `//` de cualquier archivo analizado. Corregida la cita y, con la regla ya activa, 0 hallazgos nuevos.

**Gráficas: acceso por teclado a los tooltips, que faltaba en las tres familias con hover.** `LineChart`, `StackedBarChart` y `ScatterChart` disparaban el tooltip solo con `onMouseEnter`, sin `tabIndex` ni `onFocus` — un usuario de teclado no podía llegar a ningún punto. Las tres ganaron `tabIndex={0}`, `onFocus`/`onBlur` espejo del hover, `role="button"` + `aria-label` con el valor leído, y anillo de foco en `css/charts.css`.

**Higiene de tokens.** 145 nombres únicos declarados; **13 sin consumidor**, en tres categorías distintas:

- **Pasos de escala** (9) — `--trf-fw-light`, `--trf-fw-regular`, `--trf-leading-tight`, `--trf-tracking-normal`, `--trf-text-display`, `--trf-space-10`, `--trf-neutral-200`, `--trf-motion-instant`, `--trf-axis` (alias retrocompatible de `--trf-axis-label`). Una escala es un sistema: un paso que falta obliga a inventar un valor suelto, que es peor que un paso sin usar. Se conservan enteros a propósito.
- **Constantes para JS, sin JS que las lea todavía** (4) — `--trf-bp-sm`, `--trf-bp-md`, `--trf-bp-lg`, `--trf-bp-xl`. `css/responsive.css` las declara con el comentario «existen solo para leerlos desde JS», porque una custom property no evalúa dentro de `@media` — los breakpoints reales van escritos literales en cada consulta. Pero **ningún JS del proyecto las lee hoy**; `--trf-bp-md` solo aparecía dentro del comentario que ilustra por qué `var()` no sirve ahí, no en código real. La justificación del comentario sigue siendo válida (single source of truth documentado para el día en que algo sí necesite leerlos en runtime, p. ej. un `matchMedia` en un componente), pero hoy es una promesa sin cumplir — se deja anotado en vez de borrarlo, porque borrar los tokens dejaría el valor de los breakpoints viviendo solo duplicado en cinco `@media` distintos, sin una fuente única ni comentada.

`--trf-danger-hover` **se eliminó** en una fase anterior: se conservó «por si acaso» al corregir el contraste y ningún componente llegó a usarlo. Un token sin consumidor ni propósito declarado es ruido — a diferencia de los 13 de arriba, que sí tienen uno.

**Los diez terciarios sí se usan**: la tarjeta de paleta terciaria clavaba los hex en vez de referenciar sus tokens, así que podía derivar de ellos en silencio. Ahora los consume, y muestra los diez del manual §2.7.1 — le faltaban Soft Coral y Lavender Blue.

**`--trf-axis` se partió en dos.** Servía a la vez para la **línea** del eje (componente de UI, umbral 3:1) y para su **etiqueta** (texto de 11px, umbral 4,5:1). Un solo nombre para dos umbrales invita a usar el valor flojo en el texto — que es exactamente el fallo que tuvo: `#a0a0a0` daba 2,61:1. Ahora hay `--trf-axis-line` y `--trf-axis-label`, y el alias apunta a la etiqueta, que es el umbral más exigente: si alguien lo usa para una línea, sale más oscura de lo necesario, que es el error inocuo. Al revés no lo sería.

## Verificación de adherencia
`_adherence.oxlintrc.json` lo **genera el compilador**: editarlo a mano se revierte en la siguiente compilación. Por eso la verificación que sí corre vive aparte, en `tools/`:

Corre en CI vía `.github/workflows/adherencia.yml` en cada push y pull request, sin dependencias, y **sale con código 1** si hay violaciones. La tarjeta **Adherencia** del Design System ejecuta las mismas reglas en el navegador sobre el proyecto real, así que el resultado está a la vista sin abrir una terminal.

El runner de Node va **inline en el workflow**, no como archivo del repositorio: el compilador empaqueta todo `.mjs` del árbol —incluido `.github/`— y ese código importa `node:fs`, que dentro del bundle queda indefinido y lo rompe. `checks.mjs` sí vive en `tools/` porque es lógica pura, sin dependencias de plataforma.

`tools/checks.mjs` tiene la lógica; los dos ejecutores la comparten — una implementación, no dos que se desincronizan. La lista de archivos se **deriva** de los `@import` de `styles.css` y del manifiesto, así que no hay lista escrita a mano que envejezca.

**Las diez reglas nacieron de un defecto real de este proyecto.** Ninguna es de estilo genérico:

| Regla | El defecto que la originó |
|---|---|
| `hex-crudo` | El template de referencia llegó a estar escrito **entero** con hex crudos |
| `px-fuera-de-escala` | Valores sueltos que rompen el ritmo base-4 |
| `fuente-ajena` | Inter apareció como fallback dentro de un token de fuente |
| `animation-sin-keyframes` | `Button` y `Skeleton` animaban con `@keyframes` inexistentes |
| `texto-blanco-sobre-relleno` | El naranja de marca no admite blanco (2,72:1); reapareció **dos veces** en especímenes que redibujaban el botón en vez de componerlo |
| `locale-suelto` | Tres locales conviviendo: el mismo número salía distinto en el eje y en el tooltip |
| `fallback-literal` | `var(--x, #hex)` sugiere una opcionalidad que el contrato no tiene |
| `variante-sin-regla` | `Badge` aceptaba `tone="warning"` sin regla CSS: la píldora salía sin estilo |
| `contrato-ausente` | Un componente sin `.d.ts` no tiene contrato de props |
| `token-tematico-sobre-relleno-fijo` | `Heatmap`/`FunnelChart` usaban un token de texto que voltea con el tema sobre un relleno de paleta de datos que no voltea: ilegible en oscuro |
| `ruta-muerta` | `SKILL.md` mandaba a los agentes a un directorio de UI kits que no existe |

**Calibración de `px-fuera-de-escala` (revisión de Fase 3).** La regla original miraba cualquier `propiedad: Npx` y confundía tres escalas distintas: espaciado (base-4), tipografía (`tokens/typography.css`, que **no** es base-4: 34/28/22/19/16/15/14/13/11) y geometría de data-viz (`css/charts.css`: celdas de calor, barras, swatches). El primer intento de recortar la lista de valores permitidos habría inundado el proyecto de falsos positivos en cada `font-size:11px` de cada tarjeta especimen — lo midí antes de aplicarlo.

La regla ahora **solo mira propiedades de espaciado** (`margin`, `padding`, `width`, `height`, `top/right/bottom/left`, `inset`, `gap`, `border-radius`, `border-width`), exime `css/charts.css` por completo (geometría de datos legítimamente arbitraria) y reduce los valores permitidos a los que de verdad son del sistema: hairlines (1, 2, 3), el radio plano (6) y la cápsula (999).

Antes/después de apretarla: **0 → 59 hallazgos**, todos dimensiones de icono/gap en tarjetas especimen y un puñado de declaraciones en `css/core.css`, `css/library.css` y `css/patterns.css` (15, 26, 11, 10, 7, 5, 9px — tamaños de glifo y de punto de estado, anteriores a esta regla). **Triado, no corregido a ciegas**: cambiarlos sin verificación visual por cada uno arriesgaba una regresión silenciosa peor que el hallazgo. Quedan como deuda P3 documentada para una pasada dedicada, componente por componente, con captura de pantalla de por medio.

**Raíz del proyecto, antes fuera de alcance.** `thumbnail.html` tenía hex crudos (`#fc7603`, `#9ad9b3`…) que ninguna regla veía porque el alcance no cubría la raíz. Ahora `styles.css` y `legacy.css` se analizan igual que el resto, y `thumbnail.html` se exime **explícitamente y con motivo escrito** —lienzo de marca de tamaño fijo, misma categoría que `--trf-paper`—, no por un hueco accidental del regex.

**`hex-crudo` ampliado de `{6}` a `{3,8}`.** La regla oxlint que sustituyó era `{3,8}`; con solo seis dígitos un `#fff` de tres pasaba limpio.

**Alcance deliberado.** `hex-crudo` no aplica a `tokens/` —que *declara* la paleta, es su trabajo— ni a las `*.card.html`, que son especímenes cuyo trabajo es *mostrar* el valor. Sí aplica a `components/`, `css/` y `templates/`. `px-fuera-de-escala` exime `tokens/`, los breakpoints de `@media` (son anchos de dispositivo, no espaciado) y los desplazamientos negativos grandes (patrón fuera-de-pantalla). `ruta-muerta` solo corre en CI: el navegador no puede enumerar el disco.

**Probado en falso positivo y en falso negativo.** Con el proyecto limpio sale 0; introduciendo `const ROTO = "#ff0000"` en `components/core/Badge.jsx` sale 1 señalando `Badge.jsx:4`; al revertir vuelve a 0.

## Orden narrativo
La pestaña Design System está numerada para leerse como un recorrido, de la identidad a la pantalla completa:

1. **Marca** — quiénes somos: logo y voz.
2. **Color** — con qué pintamos: marca, neutros, semánticos, series de datos.
3. **Tipografía** — cómo hablamos en pantalla.
4. **Espacio y forma** — cómo respira y cómo se recorta; incluye las direcciones visuales.
5. **Movimiento y elevación** — cómo reacciona.
6. **Componentes** — las piezas.
7. **Navegación** — cómo se recorre.
8. **Gráficas** — cómo se muestran los datos.
9. **Pantallas** — cómo se resuelven las decisiones difíciles.

Los fundamentos (1–5) responden «con qué»; las piezas (6–9), «con qué se arma». Al agregar una tarjeta, elija el grupo por la pregunta que responde, no por el archivo donde vive.

**Componentes** (`window.TransfiriendoDesignSystem_…` en runtime):
- `components/core/` — **Button**, **Input**, **Textarea**, **Card**, **Badge**, **Alert**, **Tabs**, **Switch**, **Checkbox**, **Radio** (+ **RadioGroup**), **Skeleton**, **Dialog** (+ **DialogTitle**), **Icon**.
- `components/brand/` — **Logo** (image-based lockup + isotipo).
- `components/library/` — portados desde el proyecto fuente *Sistema de diseño Transfiriendo*: **Accordion**, **Breadcrumbs**, **Charts** (LineChart, BarChart, DonutChart, Sparkline), **Chip**, **Combobox**, **DataGrid**, **DatePicker**, **DateRangePicker**, **FileUpload**, **Modal**, **Pagination**, **Popover**, **Select**, **Sidebar**, **StatCard**, **Stepper**, **Timeline**, **Toaster**, **Tooltip**.
- `components/charts/` — gráficas analíticas: **FunnelChart**, **StackedBarChart**, **ScatterChart**, **Heatmap**.
- `components/patterns/` — patrones de pantalla: **ConfirmDestructive** (irreversible, confirmación escrita), **UndoToast** (reversible), **UnsavedBar** (cambios sin guardar).

**Kit de UI** — ninguno por ahora. Las superficies de producto viven como plantillas (ver abajo); el click-through interactivo de Innovación & IA se eliminó a pedido del usuario.

**Guidelines / tarjetas especímen** — `guidelines/*.card.html`, numeradas por el orden narrativo. La tarjeta **Brand · Logo** vive aquí (`guidelines/brand-logo.card.html`). Incluye también **Auditoría de direcciones**, que mide en vivo el radio de cada superficie en las tres direcciones y falla visiblemente si un componente deja de seguir su rol.

**Cobertura de direcciones (medida, no declarada).** La tarjeta **Auditoría de direcciones** monta los **27** componentes con superficie y mide su radio real en las tres direcciones: 9 controles a 8/999/6, 11 contenedores a 12/16/6, 3 detalles flotantes a 8/12/6 y 4 píldoras invariables. `Timeline` y `Breadcrumbs` figuran como informativos: no tienen superficie con radio propio. Lo que **no** sigue la dirección, a propósito: círculos (`50%`), el indicador de 2px de `Tabs`, las muestras de leyenda de las gráficas y las esquinas de barra o segmento del data-viz — son formas geométricas, no superficies de UI.

Si añade un componente con el token equivocado, esa tarjeta lo marca en rojo sola. Ojo al auditar a mano: el radio también se declara por esquina (`borderTopLeftRadius`), no solo con `borderRadius` — así se colaron los 6px fijos de `Tabs`.

**Plantillas** — `templates/consola/` (dashboard de consola de procesos), `templates/slide-kpis/` (diapositiva de KPI 16:9) y `templates/slide-login/` (diapositiva de login dividida 16:9).

**Otros** — `thumbnail.html` (miniatura de la página de inicio), `SKILL.md` (manifiesto Agent-Skills), `uploads/` (manual de marca original + fuentes de referencia).

## Adiciones intencionales
- **Skeleton** y **Switch** aparecen como componentes de primera clase; ambos existen en la app de referencia (`Skeleton`, `Toggle`) — `Toggle` se exporta aquí como **Switch** para seguir el nombre habitual. **Logo** envuelve los assets de imagen oficiales para que nunca se redibujen.
- **Dialog** (+ **DialogTitle**) — extraída, no inventada: `Modal` y `ConfirmDestructive` ya existían y traían cada uno su copia de overlay, foco y cierre. La primitiva es esas dos copias unificadas.
- **Icon** — envoltorio sobre el set de iconos que el sistema ya declaraba. Sin él, el sistema decía «usamos Lucide» y no enviaba nada con qué usarlo.
- **Format** — módulo de formato numérico. No es un componente: existe porque convivían tres locales y el mismo número se dibujaba distinto en el eje y en el tooltip de la misma gráfica.
