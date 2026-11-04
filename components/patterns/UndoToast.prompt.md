Para acciones reversibles: se ejecutan sin preguntar y se ofrece deshacer. Evita el diálogo de confirmación cuando no hace falta.

```jsx
<UndoToast open={open} message="Proceso archivado" onUndo={restaurar} onDismiss={() => setOpen(false)} />
```

Regla: reversible → `UndoToast`; irreversible → `ConfirmDestructive`.
