Controlled on/off toggle. Track goes orange when checked; thumb slides on the brand curve.

```jsx
const [on, setOn] = React.useState(true);
<Switch checked={on} onChange={setOn} label="Notificar al finalizar" />
```

Props: `checked`, `onChange(next)`, `label`, `disabled`.
