# Castellary MVP — Theme System

This document explains how the theme system works, how options switch dynamically, and how new themes can be created.

---

## 🎨 Theme Configuration Files

Each civilization maps to a config file in [lib/theme/](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/lib/theme/):
* `medieval.ts`
* `rome.ts`
* `cyberpunk.ts`
* `samurai.ts`
* `robo.ts`
* `blockcraft.ts`

These configure the primary/secondary colors, display fonts, ambient loop paths, and transitions.

---

## 🔄 Dynamic Style Resolvers

When the theme shifts (either via the settings page or snap scrolling), the state is caught by [context/RealmThemeContext.tsx](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/context/RealmThemeContext.tsx), which triggers the resolver function:

```typescript
export function applyThemeVariables(config: ThemeConfig) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;

  // Map theme variables to CSS custom properties
  root.style.setProperty('--color-keep-primary', config.palette.primary);
  root.style.setProperty('--color-keep-secondary', config.palette.secondary);
  root.style.setProperty('--color-keep-accent', config.palette.accent);
  root.style.setProperty('--color-keep-success', config.palette.success);
  root.style.setProperty('--color-keep-danger', config.palette.danger);
  root.style.setProperty('--color-keep-background', config.palette.background);
  root.style.setProperty('--color-keep-foreground', config.palette.foreground);
  root.style.setProperty('--color-keep-muted', config.palette.muted);
  root.style.setProperty('--color-keep-border', config.palette.border);
  root.style.setProperty('--color-keep-glass', config.palette.glass);
  root.style.setProperty('--color-keep-overlay', config.palette.overlay);
  
  // Update the active display font mapping
  root.style.setProperty('--font-keep-display', `var(${config.displayFont})`);
}
```

This updates custom variables in [app/globals.css](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/app/globals.css) dynamically, instantly re-skinning all dashboard panel borders and backdrops.

---

## ⚙️ Adding a New Theme

To add a new civilization theme:
1. Define a config file in `lib/theme/mytheme.ts` adhering to the `ThemeConfig` interface.
2. Register the config in [lib/theme/index.ts](file:///home/pallabi-panja/Projects/CASTELLARY_V1/CASTELLARY/lib/theme/index.ts).
3. Append any custom fonts in `app/globals.css` and map them to variables.
4. Place character sprites, environmental backdrops, and audio ambient files in `public/themes/mytheme/`.
