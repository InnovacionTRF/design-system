// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
//
// UNA sola hoja: styles.css ya importa tokens/ y css/ enteros. Antes esto
// enlazaba seis hojas de tokens a mano Y styles.css, así que el navegador
// pedía cada archivo de tokens dos veces.
// Las fuentes NO van aquí: se enlazan en el <helmet> de cada plantilla para
// que arranquen en paralelo con esta carga (ver tokens/fonts.css).
(() => {
  const base = '../..';
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = base + '/styles.css';
  document.head.appendChild(l);

  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  document.head.appendChild(s);
})();
