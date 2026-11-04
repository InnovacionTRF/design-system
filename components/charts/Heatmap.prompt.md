Actividad por categoría y período. La intensidad va en escala de naranja; el texto se invierte a blanco en las celdas más oscuras.

```jsx
<Heatmap
  columns={["L", "M", "M", "J", "V", "S", "D"]}
  rows={[
    { name: "Salud", values: [12, 18, 24, 31, 28, 8, 3] },
    { name: "Seguros", values: [9, 14, 19, 22, 26, 6, 2] },
  ]}
/>
```

Props: `columns`, `rows` ([{name, values}]).
