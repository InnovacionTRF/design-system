import React from "react";
// Gráficas · Transfiriendo. SVG con tokens; ejes token Label, grilla hairline detrás.
// Orden de color fijo; naranja reservado a la serie principal. Tooltip oscuro al hover.
// El énfasis de la serie principal es SEMÁNTICO: se declara con `primary: true` en la
// serie, no se deduce de su color. Antes se comparaba contra el hex literal '#fc7603',
// así que pasar el token correcto var(--trf-series-1) perdía el énfasis en silencio.
const { useState } = React;
const AX = 'var(--trf-axis-label)', GRID = 'var(--trf-grid)', NS = 'var(--trf-font-sans)';
import { int, thousands } from './format.js';
// Un solo formato para todo el sistema (components/library/format.js).
const fmt = int;

export function Tip({ x, title, rows, w = 168 }) {
  return React.createElement('div', { className: 'trf-chart__tip', style: { left: x, width: w } },
    React.createElement('div', { className: 'trf-chart__tip-head' },
      React.createElement('span', { className: 'trf-chart__tip-title' }, title)),
    React.createElement('div', { className: 'trf-chart__tip-rows' },
      rows.map((r, i) => React.createElement('div', { key: i, className: 'trf-chart__tip-row' },
        r.color && React.createElement('span', { className: 'trf-chart__swatch', style: { background: r.color } }),
        React.createElement('span', { className: 'trf-chart__tip-name' }, r.name),
        React.createElement('span', { className: 'trf-chart__tip-val' }, r.val))))
  );
}
export function Legend({ items }) {
  return React.createElement('div', { className: 'trf-legend' },
    items.map((l, i) => React.createElement('span', { key: i, className: 'trf-legend__item' },
      React.createElement('span', { className: 'trf-legend__swatch', style: { background: l.color } }), l.name)));
}


// LineChart —— { series:[{name,color,vals}], labels:[], yMax }
export function LineChart({ series = [], labels = [], yMax = 2200, months, label = 'Serie temporal' }) {
  const [hi, setHi] = useState(null);
  const W = 600, H = 240, padL = 40, padR = 16, padT = 16, padB = 44;
  const pw = W - padL - padR, ph = H - padT - padB, n = labels.length;
  const xF = (i) => padL + (n <= 1 ? 0 : i * pw / (n - 1)), yF = (v) => padT + (1 - v / yMax) * ph;
  const grid = [0, .25, .5, .75, 1].map(t => { const v = yMax * t; return { y: yF(v), label: thousands(v) }; });
  const monthsFull = months || labels;
  return React.createElement('div', { className: 'trf-chart', onMouseLeave: () => setHi(null) },
    React.createElement('svg', { viewBox: '0 0 ' + W + ' ' + H, className: 'trf-chart__svg', role: 'img', 'aria-label': label },
      grid.map((g, i) => React.createElement('g', { key: 'g' + i },
        React.createElement('line', { x1: padL, x2: W - padR, y1: g.y, y2: g.y, stroke: GRID, strokeWidth: 1 }),
        React.createElement('text', { x: padL - 6, y: g.y + 4, textAnchor: 'end', fontFamily: NS, fontSize: 11, fill: AX, style: { letterSpacing: '.04em' } }, g.label))),
      labels.map((m, i) => React.createElement('text', { key: 'x' + i, x: xF(i), y: H - 6, textAnchor: 'middle', fontFamily: NS, fontSize: 11, fill: AX, style: { letterSpacing: '.04em' } }, m)),
      series.map((s, i) => React.createElement('polyline', { key: 's' + i, points: s.vals.map((v, j) => xF(j) + ',' + yF(v)).join(' '), fill: 'none', stroke: s.color, strokeWidth: s.primary ? 2.6 : 2, strokeLinejoin: 'round', strokeLinecap: 'round' })),
      hi != null && series.map((s, i) => React.createElement('circle', { key: 'd' + i, cx: xF(hi), cy: yF(s.vals[hi]), r: 4, fill: 'var(--trf-surface)', stroke: s.color, strokeWidth: 2 })),
      hi != null && React.createElement('line', { x1: xF(hi), x2: xF(hi), y1: padT, y2: padT + ph, stroke: 'var(--trf-axis-line)', strokeWidth: 1, strokeDasharray: '3 3' }),
      labels.map((m, i) => React.createElement('rect', { key: 'h' + i, x: xF(i) - pw / (n - 1) / 2, y: padT, width: pw / (n - 1), height: ph, fill: 'transparent', tabIndex: 0, role: 'button', 'aria-label': monthsFull[i] + ': ' + series.map(s => s.name + ' ' + fmt(s.vals[i])).join(', '), className: 'trf-chart__hit', onMouseEnter: () => setHi(i), onFocus: () => setHi(i), onBlur: () => setHi(null), style: { cursor: 'pointer' } }))),
    hi != null && React.createElement(Tip, { x: (xF(hi) / W * 100) + '%', title: monthsFull[hi], rows: series.map(s => ({ color: s.color, name: s.name, val: fmt(s.vals[hi]) })) }),
    React.createElement(Legend, { items: series.map(s => ({ color: s.color, name: s.name })) })
  );
}

// BarChart —— { data:[{name,val,color}], yMax }
export function BarChart({ data = [], yMax, label = 'Comparativa por categoría' }) {
  const W = 320, H = 210, padT = 18, padB = 30; const top = padT, ph = H - padB - padT;
  const max = yMax || Math.max(...data.map(d => d.val)) * 1.1;
  const grid = [0, .5, 1].map(t => ({ y: top + (1 - t) * ph, label: thousands(max * t) }));
  const slot = (W - 34) / data.length, bw = 34;
  return React.createElement('svg', { viewBox: '0 0 ' + W + ' ' + H, className: 'trf-chart__svg', role: 'img', 'aria-label': label },
    grid.map((g, i) => React.createElement('g', { key: 'g' + i },
      React.createElement('line', { x1: 34, x2: W - 4, y1: g.y, y2: g.y, stroke: GRID, strokeWidth: 1 }),
      React.createElement('text', { x: 30, y: g.y + 3, textAnchor: 'end', fontFamily: NS, fontSize: 10, fill: AX, style: { letterSpacing: '.04em' } }, g.label))),
    data.map((d, i) => { const h = d.val / max * ph, x = 34 + i * slot + (slot - bw) / 2, y = top + ph - h;
      return React.createElement('g', { key: i },
        React.createElement('rect', { x, y, width: bw, height: h, rx: 4, fill: d.color || 'var(--trf-action)' }),
        React.createElement('text', { x: x + bw / 2, y: y - 6, textAnchor: 'middle', fontFamily: NS, fontSize: 11, fill: 'var(--trf-text)', style: { fontWeight: 600, fontVariantNumeric: 'tabular-nums' } }, fmt(d.val)),
        React.createElement('text', { x: x + bw / 2, y: H - 6, textAnchor: 'middle', fontFamily: NS, fontSize: 10, fill: AX, style: { letterSpacing: '.04em' } }, d.name)); })
  );
}

// DonutChart —— { data:[{name,val,color}] }
export function DonutChart({ data = [], size = 140, label = 'Composición del total', totalLabel = 'total' }) {
  const r = 54, C = 2 * Math.PI * r, total = data.reduce((a, b) => a + b.val, 0);
  let acc = 0;
  const segs = data.map(d => { const frac = d.val / total; const s = { color: d.color, dash: (frac * C).toFixed(1) + ' ' + (C - frac * C).toFixed(1), off: (-acc * C).toFixed(1), pct: Math.round(frac * 100) + '%', name: d.name }; acc += frac; return s; });
  return React.createElement('div', { className: 'trf-donut' },
    React.createElement('svg', { viewBox: '0 0 140 140', width: size, height: size, style: { flexShrink: 0 }, role: 'img', 'aria-label': label },
      segs.map((s, i) => React.createElement('circle', { key: i, cx: 70, cy: 70, r, fill: 'none', stroke: s.color, strokeWidth: 18, strokeDasharray: s.dash, strokeDashoffset: s.off, transform: 'rotate(-90 70 70)' })),
      React.createElement('text', { x: 70, y: 66, textAnchor: 'middle', fontFamily: NS, fontSize: 22, fill: 'var(--trf-text)', style: { fontWeight: 600, fontVariantNumeric: 'tabular-nums' } }, thousands(total)),
      React.createElement('text', { x: 70, y: 84, textAnchor: 'middle', fontFamily: NS, fontSize: 10, fill: AX, style: { letterSpacing: '.04em' } }, totalLabel)),
    React.createElement('div', { className: 'trf-donut__legend' },
      segs.map((s, i) => React.createElement('span', { key: i, className: 'trf-legend__item' },
        React.createElement('span', { className: 'trf-legend__swatch', style: { background: s.color } }), s.name,
        React.createElement('span', { className: 'trf-legend__pct' }, s.pct))))
  );
}

// Sparkline —— { vals, color }
export function Sparkline({ vals = [], color = 'var(--trf-action)', width = 120, height = 48, label = 'Micro-tendencia' }) {
  const sp = 4, mn = Math.min(...vals), mx = Math.max(...vals);
  const x = (i) => sp + i * (width - 2 * sp) / (vals.length - 1), y = (v) => sp + (1 - (v - mn) / (mx - mn || 1)) * (height - 2 * sp);
  const pts = vals.map((v, i) => x(i).toFixed(1) + ',' + y(v).toFixed(1));
  const area = 'M' + x(0).toFixed(1) + ',' + (height - sp) + ' L' + pts.join(' L') + ' L' + x(vals.length - 1).toFixed(1) + ',' + (height - sp) + ' Z';
  return React.createElement('svg', { viewBox: '0 0 ' + width + ' ' + height, width, height, role: 'img', 'aria-label': label },
    React.createElement('path', { d: area, fill: 'var(--trf-surface-accent)', stroke: 'none' }),
    React.createElement('polyline', { points: pts.join(' '), fill: 'none', stroke: color, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' }),
    React.createElement('circle', { cx: x(vals.length - 1), cy: y(vals[vals.length - 1]), r: 3, fill: color }));
}

// Agrupador: el sistema expone las cuatro gráficas bajo un solo nombre.
// Sin volcado a window: el namespace del bundle ya expone cada export con
// mayúscula inicial (igual que el resto de components/**, que perdió su
// propio Object.assign(window, …) en la migración a css/*.css).
export const Charts = { LineChart, BarChart, DonutChart, Sparkline };
