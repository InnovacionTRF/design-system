// Comprobaciones de adherencia · Transfiriendo.
// ============================================================
// Lógica pura: recibe un mapa { ruta: contenido } y devuelve una lista de
// violaciones. Sin dependencias y sin acceso a disco, para que la corran igual
// el runner inline del workflow de CI (.github/workflows/adherencia.yml) y
// la tarjeta del navegador.
//
// Cada regla existe porque su defecto YA ocurrió en este proyecto. No son
// reglas de estilo genéricas.

const SISTEMA = /^(components|css|tokens|templates|guidelines)\//;
// Raíz del proyecto: styles.css y legacy.css son manifiestos que SÍ deben
// cumplir las reglas de token; thumbnail.html es un lienzo de marca de tamaño
// fijo (1280×854) que no sigue tema ni escala — se exime explícitamente más abajo,
// nunca por accidente.
const RAIZ_ANALIZABLE = new Set(["styles.css", "legacy.css"]);
const RAIZ_EXENTA_CON_MOTIVO = {
  "thumbnail.html": "lienzo de marca de tamaño fijo (1280×854); no sigue tema ni escala, misma categoría que --trf-paper",
};
const ES_CARD = /\.card\.html$/;
const GENERADO = /^_|\/support\.js$|^tools\//;

/** Escala base-4 más los hairlines y la cápsula: los únicos valores que de
 * verdad son "del sistema" y no un número de tipografía o de geometría de datos. */
const PX_PERMITIDOS = new Set([0, 1, 2, 3, 6, 999]);
// Propiedades de ESPACIADO, que es lo único que la escala base-4 gobierna.
// font-size / line-height / letter-spacing siguen tokens/typography.css, una
// escala DISTINTA (34/28/22/19/16/15/14/13/11 — la mayoría no son múltiplos de
// 4 y están bien así). Antes la regla los confundía con espaciado: el primer
// intento de recortar PX_PERMITIDOS inundaba el proyecto de falsos positivos
// en cada font-size:11px de cada tarjeta especimen.
const PROP_ESPACIADO = /^(margin|padding|width|height|top|right|bottom|left|inset|gap|flex-basis|border(?:-[a-z]+)?-radius|border(?:-[a-z]+)?-width|outline-offset)$/;

const FUENTES_SISTEMA = ["Poppins", "JetBrains Mono", "inherit", "monospace", "sans-serif", "system-ui"];
const FUENTES_PROHIBIDAS = /\b(Inter|Roboto|Arial|Helvetica|Open Sans|Lato|Montserrat|Fraunces)\b/;

function lineaDe(texto, indice) {
  return texto.slice(0, indice).split("\n").length;
}

/**
 * @param archivos  { ruta: contenido } de los archivos a analizar
 * @param todasLasRutas  lista COMPLETA de rutas del proyecto, incluidas las de
 *   carpetas que no se leen (uploads/, assets/). Sin esto, la comprobación de
 *   rutas muertas marca como ausente todo lo que el lector no cargó.
 */
export function comprobar(archivos, todasLasRutas) {
  const v = [];
  const add = (regla, ruta, linea, detalle) => v.push({ regla, ruta, linea, detalle });

  // --- Recolectar keyframes definidos en TODO el CSS del sistema ---
  const keyframes = new Set();
  for (const [ruta, t] of Object.entries(archivos)) {
    if (!/\.css$/.test(ruta)) continue;
    for (const m of t.matchAll(/@keyframes\s+([\w-]+)/g)) keyframes.add(m[1]);
  }
  // Los @keyframes locales de una tarjeta valen dentro de ella.
  const keyframesLocales = (t) => new Set([...t.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]));

  for (const [ruta, t] of Object.entries(archivos)) {
    // 5b · La raíz del proyecto NO coincidía con SISTEMA y nunca se analizaba:
    // thumbnail.html tenía hex crudos (#fc7603, #9ad9b3…) sin que ninguna regla
    // los viera. Ahora la raíz entra: styles.css/legacy.css se analizan igual
    // que el resto, y thumbnail.html se exime EXPLÍCITAMENTE, con motivo escrito
    // (no por accidente de un regex que no cubría la raíz).
    const esRaiz = !ruta.includes("/");
    if (esRaiz && RAIZ_EXENTA_CON_MOTIVO[ruta]) continue;
    if (esRaiz && !RAIZ_ANALIZABLE.has(ruta)) continue;
    if (!esRaiz && (GENERADO.test(ruta) || !SISTEMA.test(ruta))) continue;
    const esCard = ES_CARD.test(ruta);
    // Se enmascaran los comentarios (bloque y línea) conservando la longitud,
    // para que los números de línea sigan siendo correctos. Sin enmascarar los
    // de línea, un comentario que EXPLICA por qué se quitó un hex se marcaba
    // como si fuera el hex.
    const sinComentarios = t
      .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(^|[^:'"`\\])\/\/[^\n]*/g, (m, p) => p + " ".repeat(m.length - p.length));

    // 1 · Hex crudo en código que debería CONSUMIR tokens.
    //     Fuera de alcance a propósito: tokens/ los DECLARA (es su trabajo) y
    //     las *.card.html son especímenes cuyo trabajo es MOSTRAR el valor.
    //     En alcance: components/**, css/**, templates/** y la raíz analízable
    //     (styles.css, legacy.css) — el template de referencia llegó a estar
    //     escrito entero con hex crudos.
    //     {3,8} y no solo {6}: la regla oxlint original era {3,8} y un #fff de
    //     tres dígitos (o un #rrggbbaa de ocho) pasaba limpio con solo {6}.
    if (!esCard && !/^tokens\//.test(ruta)) {
      for (const m of sinComentarios.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
        add("hex-crudo", ruta, lineaDe(t, m.index), `${m[0]} — use un token --trf-*`);
      }
    }

    // 2 · px fuera de la escala base-4, PERO solo en propiedades de ESPACIADO.
    //     La regla original miraba cualquier "prop: Npx" y confundía tres
    //     escalas distintas: espaciado (base-4), tipografía (tokens/typography.css,
    //     que NO es base-4: 34/28/22/19/16/15/14/13/11) y geometría de
    //     data-viz (css/charts.css: swatches, celdas de calor, barras). Exenta
    //     por completo tokens/ (define la escala) y css/charts.css (geometría
    //     de datos legítimamente arbitraria, documentado aquí en vez de en el
    //     archivo para no repetir el motivo en cada regla). También exenta los
    //     breakpoints de @media (anchos de dispositivo, no espaciado) y los
    //     desplazamientos negativos grandes (patrón fuera-de-pantalla).
    if (!/^tokens\//.test(ruta) && ruta !== "css/charts.css") {
      for (const m of sinComentarios.matchAll(/([a-zA-Z-]+)\s*:\s*(-?\d+)px\b/g)) {
        const prop = m[1].toLowerCase();
        const n = +m[2];
        if (n < 0) continue;
        if (!PROP_ESPACIADO.test(prop)) continue; // font-size, line-height… tienen su propia escala
        if (PX_PERMITIDOS.has(n) || n % 4 === 0) continue;
        const linea = sinComentarios.slice(sinComentarios.lastIndexOf("\n", m.index) + 1, m.index + 10);
        if (/@media|@container/.test(linea)) continue;
        add("px-fuera-de-escala", ruta, lineaDe(t, m.index), `${prop}: ${m[2]}px — use --trf-space-* o un valor de la escala`);
      }
    }

    // 3 · Fuente ajena al sistema.
    const f = sinComentarios.match(FUENTES_PROHIBIDAS);
    if (f) add("fuente-ajena", ruta, lineaDe(t, sinComentarios.indexOf(f[0])), `${f[0]} — solo ${FUENTES_SISTEMA.slice(0, 2).join(" y ")}`);

    // 4 · animation: sin @keyframes. Este fue el fallo de Button y Skeleton.
    const locales = esCard ? keyframesLocales(t) : new Set();
    for (const m of sinComentarios.matchAll(/animation:\s*([a-zA-Z][\w-]*)/g)) {
      const nombre = m[1];
      if (["none", "inherit", "initial", "unset"].includes(nombre)) continue;
      if (keyframes.has(nombre) || locales.has(nombre)) continue;
      add("animation-sin-keyframes", ruta, lineaDe(t, m.index), `${nombre} no está definido`);
    }

    // 4b · Texto blanco sobre un relleno de marca o semántico.
    //      El naranja #fc7603 NO admite blanco (2,72:1) y --trf-danger tampoco
    //      (3,22:1). Se comprueba en TODOS los archivos, tarjetas incluidas: esta
    //      regresión ha vuelto dos veces, y la segunda fue en un especimen que
    //      redibujaba el botón en vez de componer el componente.
    const RELLENOS = /--trf-(action|danger|orange-500|heat-[34])\b/;
    const BLANCO = /(?:^|[^-\w])color\s*:\s*['"]?(#fff\b|#ffffff\b|white\b|rgb\(255,\s*255,\s*255\))/i;
    for (const m of sinComentarios.matchAll(/background(?:-color)?\s*:\s*[^;{}]*?var\(\s*(--trf-[\w-]+)/g)) {
      if (!RELLENOS.test(m[1])) continue;
      // La declaración de color puede ir antes o después dentro de la misma regla.
      const ini = Math.max(0, m.index - 180);
      const ventana = sinComentarios.slice(ini, m.index + 180);
      if (!BLANCO.test(ventana)) continue;
      add("texto-blanco-sobre-relleno", ruta, lineaDe(t, m.index),
        `${m[1]} no admite texto blanco — use --trf-neutral-900 o --trf-text-on-fill según el relleno`);
    }

    // 4c · Generalización de 4b: un token que voltea (superficie/texto temático)
    //      usado como TEXTO sobre un relleno de paleta de DATOS, que no voltea.
    //      Es el defecto de Heatmap/FunnelChart en modo oscuro: --trf-heat-* y
    //      --trf-series-* no tienen variante oscura a propósito (son datos, no
    //      superficie), así que un --trf-text/--trf-surface* encima se rompe en
    //      oscuro. Se exige que AMBOS atañan al MISMO elemento — el mismo bloque
    //      {…} de CSS, o el mismo atributo style="…"/style={{…}} — en vez de
    //      «cerca en el archivo»: una proximidad de caracteres marcaba en falso
    //      la leyenda de texto DEBAJO de un swatch de color-series.card.html,
    //      que no tiene texto encima del relleno, solo al lado.
    const RELLENO_DATOS = /--trf-(heat|series)-[\w-]+\b/;
    // Negative lookahead para --trf-text-on-fill: es el token FIJO correcto
    // (no voltea), y "text" suelto como alternativa lo capturaba como prefijo
    // por accidente — \b tras "text" ya es válido antes del guión de "-on-fill".
    const TOKEN_VOLTEA = /--trf-(?!text-on-fill\b)(text(?:-secondary|-muted)?|text-on-inverse(?:-\d)?|surface[\w-]*)\b/;
    const revisarBloque = (bloque, base) => {
      const bg = bloque.match(/background(?:Color|-color)?\s*:\s*[^;,"'}]*?var\(\s*(--trf-[\w-]+)/);
      if (!bg || !RELLENO_DATOS.test(bg[1])) return;
      const co = bloque.match(/(?:^|[;,"'{])\s*color\s*:\s*[^;,"'}]*?var\(\s*(--trf-[\w-]+)/);
      if (!co || !TOKEN_VOLTEA.test(co[1])) return;
      add("token-tematico-sobre-relleno-fijo", ruta, lineaDe(t, base + bg.index),
        `${bg[1]} (paleta de datos, sin variante de tema) con color: var(${co[1]}) (voltea con el tema) en el MISMO elemento — use --trf-neutral-900 / --trf-text-on-fill`);
    };
    if (/\.css$/.test(ruta)) {
      for (const m of sinComentarios.matchAll(/\{([^{}]*)\}/g)) revisarBloque(m[1], m.index + 1);
    } else {
      for (const m of sinComentarios.matchAll(/style=(?:"([^"]*)"|\{\{([^}]*)\}\})/g)) {
        const bloque = m[1] ?? m[2];
        revisarBloque(bloque, m.index);
      }
    }

    // 5 · Locale suelto. Todo formato pasa por components/library/format.js.
    if (!/format\.js$/.test(ruta)) {
      for (const m of sinComentarios.matchAll(/\.(toLocaleString|toLocaleDateString|localeCompare)\(|Intl\.NumberFormat\(/g)) {
        add("locale-suelto", ruta, lineaDe(t, m.index), "use el módulo Format");
      }
    }

    // 6 · Fallback con literal dentro de var(). El contrato es que styles.css
    //     está enlazado, así que el token siempre existe.
    for (const m of sinComentarios.matchAll(/var\(\s*--[\w-]+\s*,\s*[^)]+\)/g)) {
      add("fallback-literal", ruta, lineaDe(t, m.index), `${m[0].slice(0, 46)} — el token siempre está definido`);
    }
  }

  // 7 · Cobertura de variantes: todo valor declarado en un .d.ts debe tener
  //     regla CSS, o una base que lo absorba. Este fue el fallo de Badge:
  //     un data-tone sin regla no degrada, desaparece.
  const css = Object.entries(archivos).filter(([r]) => /^css\/.*\.css$/.test(r)).map(([, t]) => t).join("\n");
  const BLOQUES = [
    ["Badge", "components/core/Badge.d.ts", "trf-badge", "tone"],
    ["Alert", "components/core/Alert.d.ts", "trf-alert", "tone"],
    ["Button", "components/core/Button.d.ts", "trf-btn", "variant"],
    ["Button", "components/core/Button.d.ts", "trf-btn", "size"],
    ["Timeline", "components/library/Timeline.d.ts", "trf-tl__dot", "tone"],
    ["Toaster", "components/library/Toaster.d.ts", "trf-toast__icon", "tone"],
    ["Tooltip", "components/library/Tooltip.d.ts", "trf-tip__bubble", "placement"],
  ];
  for (const [nombre, dts, sel, attr] of BLOQUES) {
    const fuente = archivos[dts];
    if (!fuente) { add("contrato-ausente", dts, 1, `falta el .d.ts de ${nombre}`); continue; }
    const m = fuente.match(new RegExp(`${attr}\\?:\\s*([^;]+);`));
    if (!m) continue;
    const declarados = [...m[1].matchAll(/['"]([\w-]+)['"]/g)].map((x) => x[1]);
    const conRegla = new Set([...css.matchAll(new RegExp(`\\.${sel}\\[data-${attr}="([^"]+)"\\]`, "g"))].map((x) => x[1]));
    // ¿la clase base pinta algo? entonces un valor sin regla degrada, no desaparece.
    const base = new RegExp(`\\.${sel}\\s*\\{[^}]*(background|color|border)\\s*:`).test(css);
    for (const d of declarados) {
      if (conRegla.has(d) || base) continue;
      add("variante-sin-regla", dts, 1, `${nombre} declara "${d}" y no hay .${sel}[data-${attr}="${d}"] ni base`);
    }
  }

  // 8 · Rutas muertas en la documentación. SKILL.md es lo primero que lee un
  //     agente: cada ruta muerta ahí degrada todo lo que venga después.
  const existentes = new Set(todasLasRutas && todasLasRutas.length ? todasLasRutas : Object.keys(archivos));
  const carpetas = new Set();
  for (const r of existentes) {
    const partes = r.split("/");
    for (let i = 1; i < partes.length; i++) carpetas.add(partes.slice(0, i).join("/"));
  }
  for (const doc of ["readme.md", "SKILL.md"]) {
    const t = archivos[doc];
    if (!t) continue;
    for (const m of t.matchAll(/`([\w./-]+\/[\w./-]*)`/g)) {
      const r = m[1];
      if (/^https?:|[<>*]|node_modules|lucide/.test(r)) continue;
      const limpio = r.replace(/\/$/, "");
      if (existentes.has(limpio) || carpetas.has(limpio)) continue;
      add("ruta-muerta", doc, lineaDe(t, m.index), r);
    }
  }

  // 8b · La misma regla, pero dentro de COMENTARIOS de código. Es la clase
  //      exacta de defecto que 8 persigue: la cabecera de este mismo archivo
  //      citó "tools/verify.mjs", un runner que nunca existió — el runner real
  //      quedó inline en el workflow — y ninguna regla lo vio porque 8 solo
  //      mira readme.md y SKILL.md. Aquí se buscan rutas del propio repo
  //      citadas dentro de /* */ y // en cualquier archivo analizado.
  for (const [ruta, t] of Object.entries(archivos)) {
    if (GENERADO.test(ruta) && !RAIZ_ANALIZABLE.has(ruta)) continue;
    for (const m of t.matchAll(/\/\*[\s\S]*?\*\/|(?:^|[^:'"`\\])\/\/[^\n]*/g)) {
      const bloque = m[0];
      for (const rm of bloque.matchAll(/`([\w./-]+\/[\w./-]*\.\w+)`/g)) {
        const r = rm[1];
        if (/^https?:|[<>*]|node_modules|lucide/.test(r)) continue;
        if (existentes.has(r)) continue;
        add("ruta-muerta", ruta, lineaDe(t, m.index + rm.index), `${r} (en comentario)`);
      }
    }
  }

  return v;
}

/** Formatea el informe. `ok` decide el código de salida. */
export function informe(violaciones) {
  if (!violaciones.length) return { ok: true, texto: "Adherencia: sin violaciones." };
  const porRegla = {};
  for (const x of violaciones) (porRegla[x.regla] ||= []).push(x);
  const lineas = [`Adherencia: ${violaciones.length} violación(es).`, ""];
  for (const [regla, lista] of Object.entries(porRegla)) {
    lineas.push(`  ${regla} (${lista.length})`);
    for (const x of lista.slice(0, 12)) lineas.push(`    ${x.ruta}:${x.linea}  ${x.detalle}`);
    if (lista.length > 12) lineas.push(`    …y ${lista.length - 12} más`);
  }
  return { ok: false, texto: lineas.join("\n") };
}
