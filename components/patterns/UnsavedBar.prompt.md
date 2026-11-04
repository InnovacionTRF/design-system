Aparece mientras el formulario tiene cambios sin guardar y ofrece las dos salidas explícitas. Nunca se guarda solo.

```jsx
<UnsavedBar dirty={dirty} onDiscard={reset} onSave={guardar} />
```

Props: `dirty`, `message`, `onDiscard`, `onSave`, `saveLabel`.
