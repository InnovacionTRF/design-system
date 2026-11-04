Inline feedback: 1px border in the semantic tone, soft fill and icon. Body says what happened and how to fix it. Icons come from the shipped `Icon` component.

```jsx
<Alert tone="info" icon={Info} title="Motor DDI conectado">
  Las recomendaciones se actualizan cada 15 minutos.
</Alert>
<Alert tone="success" icon={Check} title="Proceso publicado">Corriendo en las cuatro unidades.</Alert>
<Alert tone="warning">El modelo lleva 14 días sin reentrenar.</Alert>
<Alert tone="danger" title="Conexión rechazada">Revise las credenciales del origen.</Alert>
```

Tones: `info | success | warning | danger`. `title` optional; `icon` takes a component — pass `(p) => <Icon name="info" {...p} />`.
