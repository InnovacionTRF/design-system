Para acciones irreversibles. El botón solo se habilita cuando el texto coincide exactamente con `confirmPhrase`.

```jsx
<ConfirmDestructive
  open={open}
  title="Eliminar el proceso TRF-4821"
  description="Se borran la configuración, el historial y las reglas. No se puede deshacer."
  confirmPhrase="TRF-4821"
  onCancel={() => setOpen(false)}
  onConfirm={borrar}
/>
```

Use esto, no un `Modal` simple, cuando el dato no se puede recuperar. Para lo reversible use `UndoToast`.
