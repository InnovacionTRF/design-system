Underline tabs; the orange indicator glides between tabs on the brand curve.

```jsx
const [tab, setTab] = React.useState("resumen");
<Tabs value={tab} onChange={setTab} items={[
  { id: "resumen", label: "Resumen" },
  { id: "detalle", label: "Detalle" },
  { id: "log", label: "Bitácora" },
]} />
```

Props: `items` ([{id,label}]), `value`, `onChange(id)`.
