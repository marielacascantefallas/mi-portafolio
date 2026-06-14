# Design System — Portafolio Personal

## Colores

### Modo Oscuro (default)

| Token              | Hex       | Uso                          |
| ------------------ | --------- | ---------------------------- |
| `--color-bg`       | `#0B0B0D` | Fondo principal              |
| `--color-accent`   | `#FF8A3D` | Acento naranja (CTAs, hover) |
| `--color-blue`     | `#2A4D7A` | Secundario / links           |
| `--color-text`     | `#FAFAF8` | Texto principal              |

### Modo Claro

| Token              | Hex       | Uso                            |
| ------------------ | --------- | ------------------------------ |
| `--color-bg`       | `#FAFAF8` | Fondo principal                |
| `--color-accent`   | `#D2691E` | Acento naranja claro           |
| `--color-blue`     | `#2A4D7A` | Secundario / links             |
| `--color-text`     | `#0B0B0D` | Texto principal                |

### Toggle

- Cambio de tema vía toggle en el header.
- Se persiste la preferencia en `localStorage`.
- Se respeta `prefers-color-scheme` del sistema como valor inicial.

---

## Tipografía

| Token              | Familia                          | Uso                    | Weight |
| ------------------ | -------------------------------- | ---------------------- | ------ |
| `--font-display`   | Sans-serif display (ej. Inter)   | Títulos, headings      | 500    |
| `--font-mono`      | Monospace (ej. JetBrains Mono)   | Labels, nav, chips     | 400    |
| `--font-body`      | Sans-serif body (ej. Inter)      | Texto corrido, párrafos| 400    |

### Escala tipográfica

| Nivel | Tamaño   | Line-height | Uso           |
| ----- | -------- | ----------- | ------------- |
| h1    | 48px     | 1.1         | Hero          |
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

| Token              | Valor | Uso                    |
| ------------------ | ----- | ---------------------- |
| `--radius-sm`      | 4px   | Chips, badges          |
| `--radius-md`      | 8px   | Botones, inputs        |
| `--radius-lg`      | 16px  | Cards, modales         |
| `--radius-full`    | 9999px| Avatares, pills        |

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
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Tipografía */
  --font-display: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-body: 'Inter', sans-serif;
}

/* Modo oscuro (default) */
[data-theme="dark"] {
  --color-bg: #0B0B0D;
  --color-accent: #FF8A3D;
  --color-blue: #2A4D7A;
  --color-text: #FAFAF8;
}

/* Modo claro */
[data-theme="light"] {
  --color-bg: #FAFAF8;
  --color-accent: #D2691E;
  --color-blue: #2A4D7A;
  --color-text: #0B0B0D;
}
```
