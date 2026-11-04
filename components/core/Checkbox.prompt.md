Casilla controlada, con estado indeterminado para "seleccionar todo" parcial. Botón real con `role="checkbox"`, no `<input>` nativo — mismo patrón que `Switch`.

```jsx
const [on, setOn] = React.useState(false);
<Checkbox checked={on} onChange={setOn} label="Notificarme por correo" />
```

Props: `checked`, `indeterminate`, `onChange(next)`, `label`, `disabled`. El relleno marcado es `--trf-action` con el glifo en `--trf-neutral-900` (el naranja no admite blanco) — mismo patrón que `Chip[aria-pressed="true"]`.
