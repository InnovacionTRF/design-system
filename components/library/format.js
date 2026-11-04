// Formato de números y fechas · Transfiriendo.
// ============================================================
// UN SOLO locale para todo el sistema: 'es-CO'.
//
// Antes convivían tres. El más dañino era 'de-DE', usado para *simular* el punto
// de miles español: funciona por coincidencia, pero es alemán, y basta un caso de
// borde para que divergan. Junto a él, 'es' a secas — que NO agrupa enteros de
// cuatro dígitos: (1240).toLocaleString('es') da "1240" y toLocaleString('es-CO')
// da "1.240". El mismo número se dibujaba distinto en el tooltip y en el eje de
// la misma gráfica.
//
// Contrastado contra las reglas del readme (coma decimal, punto de miles):
//   1.240 ✓   1.840 ✓   99,4% ✓   1,8 ✓   12.500 ✓
//
// Dos diferencias que es-CO produce y conviene conocer, documentadas en vez de
// corregidas a mano (corregirlas nos devolvería a un formato inventado):
//   · compacto → "1,8 K" / "1,8 M": unidad en mayúscula y separada por un
//     espacio duro (U+00A0). No es "1,8k".
//   · moneda   → "$ 1.240": es-CO separa el signo del número, también con
//     espacio duro. No es "$1.240".
// Si un diseño necesita otra forma, pásela por `unit` en vez de reformatear.

const LOCALE = "es-CO";

/** Entero con punto de miles: 1240 → "1.240". */
export function int(n) {
  return Number(n).toLocaleString(LOCALE, { maximumFractionDigits: 0 });
}

/** Decimal con coma: (1.8, 1) → "1,8". */
export function decimal(n, digits = 1) {
  return Number(n).toLocaleString(LOCALE, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/**
 * Porcentaje. Recibe el número tal como se muestra, NO la fracción:
 * percent(99.4) → "99,4%". Es el uso real en este sistema (las métricas ya
 * vienen en puntos porcentuales) y evita el error de dividir dos veces.
 */
export function percent(n, digits = 1) {
  return decimal(n, digits) + "%";
}

/** Variación con signo explícito: 14.1 → "+14,1%", -3.1 → "−3,1%". */
export function delta(n, digits = 1) {
  const signo = n > 0 ? "+" : (n < 0 ? "−" : "");
  return signo + decimal(Math.abs(n), digits) + "%";
}

/** Moneda. Ojo: es-CO devuelve "$ 1.240", con espacio duro. */
export function currency(n, code = "COP") {
  return Number(n).toLocaleString(LOCALE, {
    style: "currency", currency: code, maximumFractionDigits: 0,
  });
}

/** Compacto para ejes. Ojo: es-CO devuelve "1,8 K" / "1,8 M". */
export function compact(n) {
  return Number(n).toLocaleString(LOCALE, {
    notation: "compact", compactDisplay: "short", maximumFractionDigits: 1,
  });
}

/**
 * Miles para etiquetas de eje, en la forma corta que usa el sistema: 2000 → "2 k".
 * Existe aparte de `compact` porque los ejes necesitan una cadena angosta y
 * predecible, y `compact` cambia de unidad al cruzar el millón.
 */
// Espacio DURO (U+00A0) entre número y unidad, igual que compact(): es lo que
// es-CO produce para unidad+número y lo que el readme documenta. thousands()
// usaba un espacio normal — la tercera forma de "miles" que este módulo
// existía para eliminar.
export function thousands(n) {
  if (n === 0) return "0";
  return decimal(n / 1000, Number.isInteger(n / 1000) ? 0 : 1) + "\u00A0k";
}

/** Fecha corta: "29 de jul de 2026". */
export function date(d, opts) {
  return new Date(d).toLocaleDateString(LOCALE, {
    day: "numeric", month: "short", year: "numeric", ...opts,
  });
}

/** Comparador de texto para ordenar tablas. Sustituye localeCompare suelto. */
export function compare(a, b) {
  return String(a).localeCompare(String(b), LOCALE);
}

/** Agrupador: expuesto en el bundle como `Format` (los nombres en minúscula no salen al namespace). */
export const Format = { locale: LOCALE, int, decimal, percent, delta, currency, compact, thousands, date, compare };
