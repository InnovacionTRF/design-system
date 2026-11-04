// Datos de demo · Transfiriendo. Orden fijo; naranja = serie principal.
// Los colores son REFERENCIAS al token, no copias: `var(--trf-series-N)` funciona
// igual como fill/stroke de SVG que como background en CSS. Antes este archivo
// duplicaba los ocho hex de tokens/dataviz.css y había que sincronizarlo a mano;
// ahora tokens/dataviz.css es el único origen de verdad y no hay nada que sincronizar.
export const SERIES_ORDER = [1,2,3,4,5,6,7,8].map((n) => `var(--trf-series-${n})`);
export const UNIT_COLORS = {
  Salud: 'var(--trf-series-1)',
  'Facturación': 'var(--trf-series-2)',
  Seguros: 'var(--trf-series-3)',
  Cobranzas: 'var(--trf-series-4)',
};
export const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun'];
export const UNITS = [
  // `primary` marca la serie de marca: el énfasis de trazo sale de aquí, no del color.
  { name:'Salud', color: UNIT_COLORS.Salud, primary: true, vals:[820,910,880,1010,1120,1240] },
  { name:'Facturación', color: UNIT_COLORS['Facturación'], vals:[640,700,760,720,810,890] },
  { name:'Seguros', color: UNIT_COLORS.Seguros, vals:[1450,1520,1600,1710,1820,2105] },
  { name:'Cobranzas', color: UNIT_COLORS.Cobranzas, vals:[520,480,500,430,460,430] },
];
