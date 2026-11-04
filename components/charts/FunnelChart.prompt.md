Embudo de conversión. La caída entre etapas se calcula sola; el naranja se intensifica hacia el final.

```jsx
<FunnelChart steps={[
  { label: "Solicitudes", value: 4820 },
  { label: "Validadas", value: 3610 },
  { label: "Mapeadas", value: 2740 },
  { label: "En producción", value: 1240 },
]} />
```

Props: `steps` ([{label, value}], en orden descendente).
