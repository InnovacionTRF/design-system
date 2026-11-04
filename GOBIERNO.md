# Transfiriendo Design System

Sistema de diseño de Transfiriendo para el software del área de Innovación & IA: tokens, hojas de estilo, componentes, guías y plantillas. Derivado del *Manual de Marca Transfiriendo 2024*.

## Fuente y estado

- **Origen**: proyecto «Transfiriendo Design System» en Claude Design (id `0ece168c-445b-4440-b148-02e47f34dfd7`). El Claude Design independiente cierra el 14 de diciembre de 2026; este repositorio pasa a ser la fuente de referencia.
- **Resumen en texto**: `administrativo-innovacion/Marca/` (repo del área).
- **Manual de marca (PDF)**: no se versiona aquí. Pedirlo al área de Comunicaciones.
- **Pendiente de aprobación de gobernanza de marca**: la tipografía de dos niveles (Poppins para H1–H3, IBM Plex Sans para H4 y menor) fue aprobada por el Equipo de Innovación & IA el 2026-07-29. Falta la aprobación de quien gestiona la identidad de marca antes de usarla en producción.

## Reglas duras

- Naranja `#fc7603` solo para acción y foco, nunca decoración. Gris `#565656` para texto. Lienzo `#f5f4f2`.
- El naranja de marca **no admite texto blanco** (2,72:1): los rellenos naranja llevan texto `#2f2f2f`.
- Colores semánticos de la paleta de marca, nunca de librerías: éxito `#87a37d`, información `#0189cc`, advertencia `#fca03a`, peligro `#ec663b`.
- Tipografía: Poppins (display y H1–H3), IBM Plex Sans (interfaz), JetBrains Mono (IDs, códigos y métricas), autohospedadas, sin peticiones a Google Fonts.
- Espaciado base-4 (4/8/12/16/24/32/48/64). Radios 4/8/12/16.
- Una sola curva de movimiento: `cubic-bezier(.32,.72,0,1)`.
- Textos en español de Colombia, registro «usted». Los errores dicen cómo arreglarlo, sin disculparse. Sin emoji. Números en formato `es-CO`.
- Todo color, radio, espacio, sombra y duración sale de un token `--trf-*`; sin hex sueltos en componentes.
- Dirección visual por defecto: **Nítido**. También existen `material` y `calido`, cada una en claro y oscuro.

## Cómo usarlo en un proyecto

1. Copiar o consumir `styles.css` (único punto de entrada) o `dist/styles.bundle.css`.
2. Referenciar este repositorio desde el `CLAUDE.md` y el agente de frontend del proyecto.
3. Apartarse de una regla se registra como excepción en el proyecto.

## Contenido previsto

`tokens/` · `css/` · `components/` · `guidelines/` · `templates/` · `assets/` · `tools/` (verificación de adherencia) · `SKILL.md` · `readme.md` del sistema.

> Estado de la migración: este repositorio se creó el 2026-11-04 con la documentación de entrada. Los archivos del sistema se cargan desde la exportación del proyecto de Claude Design.
