Relación entre dos métricas; el tamaño del punto es una tercera variable.

```jsx
<ScatterChart
  xLabel="volumen mensual" yLabel="tasa de error"
  series={[{ key: "salud", name: "Salud", color: "#fc7603" }, { key: "seguros", name: "Seguros", color: "#0189cc" }]}
  points={[
    { label: "TRF-4821", x: 1240, y: 4, size: 320, category: "salud" },
    { label: "TRF-4819", x: 2105, y: 2, size: 480, category: "seguros" },
  ]}
/>
```

Props: `points`, `series`, `xLabel`, `yLabel`, `width`, `height`.
