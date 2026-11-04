Primitiva de diálogo modal: úsela solo para construir diálogos nuevos, no en pantallas — para avisos y confirmaciones ya existen `Modal` y `ConfirmDestructive`, que se componen sobre ella.

```jsx
const id = React.useId();
<Dialog open={open} onClose={cerrar} labelledBy={`${id}-t`} width={430}>
  <DialogTitle level={2} id={`${id}-t`} className="trf-modal__title">Publicar proceso</DialogTitle>
  <p>El proceso quedará visible para las cuatro unidades.</p>
  <Button data-autofocus onClick={publicar}>Publicar</Button>
</Dialog>
```

Aporta scrim tokenizado (`--trf-scrim`, con variante oscura), trampa de foco en ambos sentidos, foco inicial, restauración del foco al cerrar, Escape, clic en el scrim y bloqueo del scroll del body.

- `data-autofocus` en un control dirige el foco inicial; si no, va al primer control.
- `closeOnOverlay` / `closeOnEscape` en `false` para un diálogo del que no se puede salir sin decidir.
- `DialogTitle` lleva `level` (1–6, por defecto 2): el nivel no se cablea, porque un diálogo no siempre cuelga del mismo nivel de la página.
