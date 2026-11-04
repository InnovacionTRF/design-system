Campo multilínea. Reutiliza el envoltorio de `Input` (label/hint/error); añade `rows`, `maxLength` y un contador opcional.

```jsx
<Textarea
  label="Descripción del proceso"
  hint="Máximo 500 caracteres"
  rows={4}
  maxLength={500}
  showCount
/>
```

Props: `label`, `hint`, `error` (tiene prioridad visual sobre el contador), `rows`, `maxLength`, `showCount`. `resize: vertical` únicamente.
