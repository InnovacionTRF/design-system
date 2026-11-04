One primary action per view; everything else is secondary or ghost. Hover lifts 1px, press sinks to scale(0.97). Icons come from the shipped `Icon` component.

```jsx
<Button icon={(p) => <Icon name="crear" {...p} />}>Nuevo proceso</Button>
<Button variant="secondary" size="sm">Cancelar</Button>
<Button variant="ghost">Ver detalle</Button>
<Button variant="danger">Eliminar</Button>
<Button loading>Procesando</Button>
```

Variants: `primary` (orange, the only high-emphasis action), `secondary` (white, hairline border, turns orange on hover), `ghost` (text-only, soft orange fill on hover), `danger`. Sizes `sm | md | lg`. `full` for block width; `loading` shows a spinner and disables.
