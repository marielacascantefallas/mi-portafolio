# Design System — Portafolio Personal

## Colores

Paleta de marca (mismo valor en ambos modos):

| Token           | Hex       | Uso                                             |
| --------------- | --------- | ------------------------------------------------ |
| `--color-yellow`| `#EFD86D` | Bloques sólidos, pills, highlights               |
| `--color-lilac` | `#AAB6E1` | Bloques sólidos, superficies secundarias (cards) |
| `--color-cream` | `#F9F2E2` | Fondo en modo claro, texto en modo oscuro        |

`--color-yellow` y `--color-lilac` son tonos pastel muy claros entre sí
(contraste < 2:1), así que **nunca se usan como texto suelto sobre el fondo
del sitio** — solo como fondo de bloques/pills con texto oscuro encima, o
como texto/ícono sobre el fondo oscuro, donde sí cumplen AA.

### Modo Oscuro (default)

| Token                | Valor                | Uso                              |
| -------------------- | --------------------- | -------------------------------- |
| `--color-bg`          | `#1C1C1E`             | Fondo principal (neutro oscuro)  |
| `--color-accent`      | `var(--color-lilac)`  | Links, íconos, bordes, CTAs      |
| `--color-text`        | `var(--color-cream)`  | Texto principal                  |
| `--color-text-muted`  | `#B8AF9C`             | Texto secundario                 |

Contraste sobre `#1C1C1E`: lila ~8.5:1, amarillo ~12:1, crema ~15:1 — AA de sobra.

### Modo Claro

| Token                | Valor                | Uso                              |
| -------------------- | --------------------- | -------------------------------- |
| `--color-bg`          | `var(--color-cream)`  | Fondo principal                  |
| `--color-accent`      | `#46548C`             | Links, íconos, bordes, CTAs      |
| `--color-text`        | `#1C1C1E`             | Texto principal                  |
| `--color-text-muted`  | `#6B6558`             | Texto secundario                 |

`--color-accent` en modo claro **no** es el lila puro: es un matiz más
oscuro de la misma familia (mismo tono, menos luminosidad) porque el lila
puro sobre crema da ~1.8:1. Con `#46548C` el contraste sube a ~6.5:1 (AA para
texto normal). El amarillo y el lila puros se reservan para fondos de
bloque/pill con texto oscuro encima (ahí sí superan 10:1).

### Toggle

- Cambio de tema vía toggle en el header.
- Se persiste la preferencia en `localStorage`.
- Se respeta `prefers-color-scheme` del sistema como valor inicial.

---

## Tipografía

Todo el sitio usa Helvetica, con una única excepción: el título del hero
("MARIELA CASCANTE"), que usa una fuente de display dedicada (ver Fase 2).

| Token              | Familia                                        | Uso                         |
| ------------------ | ----------------------------------------------- | ---------------------------- |
| `--font-display`   | `"Helvetica Neue", Helvetica, Arial, sans-serif` | Headings                     |
| `--font-mono`       | `"Helvetica Neue", Helvetica, Arial, sans-serif` | Labels, nav, chips           |
| `--font-body`      | `"Helvetica Neue", Helvetica, Arial, sans-serif` | Texto corrido, párrafos      |

Los tres tokens se mantienen (en vez de colapsarlos en uno solo) para no
tener que tocar cada selector que ya referencia `--font-mono` o
`--font-display`; los tres apuntan a la misma pila tipográfica.

### Escala tipográfica

| Nivel | Tamaño   | Line-height | Uso           |
| ----- | -------- | ----------- | ------------- |
| h1    | 48px     | 1.1         | Hero (ver excepción de fuente en Fase 2) |
| h2    | 36px     | 1.2         | Secciones     |
| h3    | 24px     | 1.3         | Subsecciones  |
| body  | 16px     | 1.5         | Texto general |
| small | 14px     | 1.4         | Captions      |
| mono  | 13px     | 1.4         | Labels, chips |

---

## Espaciado

Escala base: **8px**

| Token        | Valor |
| ------------ | ----- |
| `--space-1`  | 8px   |
| `--space-2`  | 16px  |
| `--space-3`  | 24px  |
| `--space-4`  | 32px  |
| `--space-6`  | 48px  |
| `--space-8`  | 64px  |

---

## Border Radius

Escala continua estilo Apple HIG (radios más generosos que antes).

| Token              | Valor | Uso                              |
| ------------------ | ----- | --------------------------------- |
| `--radius-sm`      | 12px  | Chips, badges, inputs             |
| `--radius-md`      | 16px  | Botones no-pill, íconos pequeños  |
| `--radius-lg`      | 20px  | Cards, fotos, modales medianos    |
| `--radius-xl`      | 28px  | Paneles grandes (ej. contact card)|
| `--radius-full`    | 9999px| Pills (botones)                   |

---

## Variables CSS (referencia de implementación)

```css
:root {
  /* Espaciado */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;

  /* Border radius */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;

  /* Tipografía */
  --font-display: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  /* Paleta de marca */
  --color-yellow: #EFD86D;
  --color-lilac: #AAB6E1;
  --color-cream: #F9F2E2;
}

/* Modo oscuro (default) */
[data-theme="dark"] {
  --color-bg: #1C1C1E;
  --color-accent: var(--color-lilac);
  --color-text: var(--color-cream);
  --color-text-muted: #B8AF9C;
}

/* Modo claro */
[data-theme="light"] {
  --color-bg: var(--color-cream);
  --color-accent: #46548C;
  --color-text: #1C1C1E;
  --color-text-muted: #6B6558;
}
```

---

## Excepciones deliberadas (no tocadas en la Fase 1)

- **Color de marca de proyectos individuales** (ej. `--project-accent` /
  `--case-accent` del caso Social Club, `#4f328c` / `#7663f2`): son colores
  de marca de ese proyecto específico, no del sitio, y se mantienen igual.
- **Gradiente del cursor del hero** (`useGrainCanvas.js`): se actualiza en la
  Fase 2, junto con el resto de la animación del hero.
- **Gradiente placeholder de "FitConnect"** en `data/projects.js`: es
  contenido editorial de ese proyecto, no un token del sistema.
