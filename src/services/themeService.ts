type Theme = 'light' | 'dark' | 'system';
type AccentColor = 'blue' | 'emerald' | 'rose' | 'amber' | 'purple';

const accentColors: Record<AccentColor, string> = {
  blue: '221.2 83.2% 53.3%',
  emerald: '142.1 76.2% 36.3%',
  rose: '346.8 77.2% 49.8%',
  amber: '37.7 92.1% 50.2%',
  purple: '262.1 83.3% 57.8%',
};

export const themeService = {
  setTheme(theme: Theme) {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem('raxima-theme', theme);
  },

  setAccentColor(color: AccentColor) {
    const root = window.document.documentElement;
    const hsl = accentColors[color];
    root.style.setProperty('--primary', hsl);
    localStorage.setItem('raxima-accent', color);
  },

  initialize() {
    const savedTheme = (localStorage.getItem('raxima-theme') as Theme) || 'system';
    const savedAccent = (localStorage.getItem('raxima-accent') as AccentColor) || 'blue';
    
    this.setTheme(savedTheme);
    this.setAccentColor(savedAccent);
  },

  getSettings() {
    return {
      theme: (localStorage.getItem('raxima-theme') as Theme) || 'system',
      accent: (localStorage.getItem('raxima-accent') as AccentColor) || 'blue'
    };
  }
};
