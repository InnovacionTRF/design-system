import React from "react";

/**
 * Icon · Transfiriendo.
 * ============================================================
 * Envoltorio sobre **Lucide 0.460.0**, cargado como UMD desde CDN (ver readme,
 * sección ICONOGRAPHY). El sistema no redibuja iconos ni envía SVG propios: no
 * hay set bespoke en las fuentes de marca.
 *
 * Expone un SUBCONJUNTO CURADO, no Lucide entero. Un set completo sin curaduría
 * es lo mismo que no tener guía: dos personas resuelven «eliminar» con dos
 * glifos distintos y la interfaz deja de ser reconocible. Cada entrada de ICONS
 * declara PARA QUÉ sirve, no solo cómo se llama.
 *
 * Si necesita un icono que no está aquí, añádalo a ICONS con su intención
 * escrita. No pase un nombre suelto de Lucide: `name` fuera del set no pinta.
 */

/** Subconjunto aprobado: intención → nombre en Lucide. */
export const ICONS = {
  // Acciones primarias
  crear: "Plus",
  guardar: "Check",
  editar: "Pencil",
  eliminar: "Trash2",
  duplicar: "Copy",
  descargar: "Download",
  subir: "Upload",
  // Navegación y flujo
  atras: "ChevronLeft",
  adelante: "ChevronRight",
  desplegar: "ChevronDown",
  plegar: "ChevronUp",
  cerrar: "X",
  menu: "Menu",
  masOpciones: "MoreHorizontal",
  enlaceExterno: "ExternalLink",
  // Datos y consulta
  buscar: "Search",
  filtrar: "SlidersHorizontal",
  ordenar: "ArrowUpDown",
  calendario: "Calendar",
  actualizar: "RefreshCw",
  // Estado y aviso — pares fijos con los tonos semánticos
  info: "Info",
  exito: "CircleCheck",
  advertencia: "TriangleAlert",
  error: "CircleAlert",
  // Dominio Innovación & IA
  proceso: "Workflow",
  modelo: "Braces",
  reporte: "ChartColumn",
  documento: "FileText",
  automatizacion: "Zap",
  // Cuenta
  usuario: "User",
  equipo: "Users",
  ajustes: "Settings",
};

const avisados = new Set();

/**
 * `title` da nombre accesible; sin él el icono es decorativo (aria-hidden), que
 * es lo correcto cuando acompaña a un texto que ya dice lo mismo.
 */
export function Icon({ name, size = 16, strokeWidth = 2, title, className = "", style, ...rest }) {
  const ref = React.useRef(null);
  const lucideName = ICONS[name];

  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = "";
    const lucide = typeof window !== "undefined" ? window.lucide : null;
    if (!lucide || !lucideName || !lucide[lucideName]) {
      if (!avisados.has(name) && typeof console !== "undefined") {
        avisados.add(name);
        console.warn(
          `[Transfiriendo] Icon: no se pudo pintar "${name}". ` +
          (lucide ? "El nombre no está en el subconjunto curado (components/core/Icon.jsx · ICONS)."
                  : "Lucide 0.460.0 no está cargado; vea ICONOGRAPHY en el readme.")
        );
      }
      return;
    }
    const el = lucide.createElement(lucide[lucideName]);
    el.setAttribute("width", size);
    el.setAttribute("height", size);
    el.setAttribute("stroke-width", strokeWidth);
    host.appendChild(el);
  }, [lucideName, name, size, strokeWidth]);

  return (
    <span
      ref={ref}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      // El hueco se reserva aunque Lucide tarde o falle: el layout no salta.
      style={{ display: "inline-flex", width: size, height: size, flexShrink: 0, ...style }}
      {...rest}
    />
  );
}
