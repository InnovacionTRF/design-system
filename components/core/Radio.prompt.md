Grupo de opciones excluyentes con roving tabindex — mismo mecanismo que `core/Tabs.jsx`: un solo ítem en `tabIndex=0`, flechas/Home/End mueven el foco y seleccionan.

```jsx
const [unidad, setUnidad] = React.useState("a");
<RadioGroup
  value={unidad}
  onChange={setUnidad}
  label="Unidad de negocio"
  items={[{ id: "a", label: "Salud" }, { id: "b", label: "Facturación" }]}
/>
```

`Radio` (mismo archivo) es el control suelto, sin grupo — úselo solo si de verdad no hay opciones relacionadas; si hay dos o más, use `RadioGroup`. El punto naranja del glifo va en `--trf-action` puro: es un glifo pequeño sobre superficie, no texto sobre relleno, así que no aplica la restricción de contraste texto-sobre-fill.
