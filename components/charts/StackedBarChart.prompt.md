Aporte de cada unidad al total del período. El hover atenúa las demás columnas.

```jsx
<StackedBarChart
  series={[
    { key: "salud", name: "Salud", color: "#fc7603" },
    { key: "seguros", name: "Seguros", color: "#0189cc" },
    { key: "cobranzas", name: "Cobranzas", color: "#87a37d" },
  ]}
  data={[
    { label: "Oct", values: { salud: 1240, seguros: 2105, cobranzas: 430 } },
    { label: "Nov", values: { salud: 1380, seguros: 2240, cobranzas: 510 } },
  ]}
/>
```

Props: `data`, `series`, `height`.
