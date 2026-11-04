Icono del sistema. Se nombra por **intención**, no por el nombre de Lucide: `crear`, no `Plus`.

```jsx
<Icon name="crear" />                          {/* decorativo, junto a un texto */}
<Icon name="eliminar" title="Eliminar proceso" /> {/* icono solo: necesita nombre */}
<Button icon={(p) => <Icon name="crear" {...p} />}>Nuevo proceso</Button>
```

Requiere Lucide 0.460.0 cargado en la página:

```html
<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.js"></script>
```

- El subconjunto aprobado está en `ICONS` (`components/core/Icon.jsx`), agrupado por propósito: acciones, navegación, datos, estado, dominio Innovación & IA, cuenta. Un nombre fuera del set **no pinta** y avisa por consola.
- Para añadir uno, escriba su intención en `ICONS`. No amplíe pasando nombres sueltos de Lucide: la curaduría es lo que hace la interfaz reconocible.
- `size` 16 por defecto, que es lo que esperan `Button`, `Input` y `Alert`. `strokeWidth` 2 — el del sistema.
- Sin `title` el icono es `aria-hidden`. Póngalo solo cuando el icono va solo.
