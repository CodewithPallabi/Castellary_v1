import { ThemeConfig } from './index';

export function applyThemeVariables(config: ThemeConfig) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;

  // Apply colors
  root.style.setProperty('--color-keep-primary', config.palette.primary);
  root.style.setProperty('--color-keep-secondary', config.palette.secondary);
  root.style.setProperty('--color-keep-accent', config.palette.accent);
  root.style.setProperty('--color-keep-success', config.palette.success);
  root.style.setProperty('--color-keep-danger', config.palette.danger);
  root.style.setProperty('--color-keep-background', config.palette.background);
  root.style.setProperty('--color-keep-foreground', config.palette.foreground);
  root.style.setProperty('--color-keep-muted', config.palette.muted);
  root.style.setProperty('--color-keep-border', config.palette.border);
  root.style.setProperty('--color-keep-overlay', config.palette.overlay);
  root.style.setProperty('--color-keep-glass', config.palette.glass);

  // Apply fonts
  root.style.setProperty('--font-keep-display', `var(${config.displayFont})`);
}
