Static surface by default. Add `hover` only when the whole card is clickable — it lifts 4px with a soft orange halo. `accent` is the one highlighted card per screen.

```jsx
<Card><p>Contenido que solo se lee.</p></Card>
<Card onClick={() => {}}><p>Card clicable — se eleva porque tiene onClick, no por `hover`.</p></Card>
<Card accent><p>Destacada. Una por pantalla como máximo.</p></Card>
```

Props: `hover`, `accent`, `padding` (px, default 20). Passes through native div attributes.
