Label always visible; the error message states the fix, not an apology. Focus shows the orange ring.

```jsx
<Input label="Nombre del proceso" placeholder="Conciliación de cartera" />
<Input label="Buscar" placeholder="ID, unidad o responsable" icon={Search} />
<Input label="Volumen mensual" error="Ingrese un número entero, sin puntos ni comas." />
```

Props: `label`, `hint`, `error` (overrides hint, turns field red), `icon`. Passes through all native input attributes.
