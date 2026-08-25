const dict = {
  siteTitle: 'Toolbox — Sisques Labs utilities',
  heading: 'Toolbox',
  tagline: 'A collection of small web utilities by Sisques Labs.',
  theme: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },
  language: {
    switcherLabel: 'Language',
  },
} as const;

export default dict;
export type ShellDict = typeof dict;
