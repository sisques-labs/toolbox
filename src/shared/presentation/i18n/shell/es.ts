import type { ShellDict } from './en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

type ShellDictTranslated = WidenStringLiterals<ShellDict>;

const dict = {
  siteTitle: 'Toolbox — herramientas de Sisques Labs',
  heading: 'Toolbox',
  tagline: 'Una colección de pequeñas utilidades web de Sisques Labs.',
  theme: {
    switchToLight: 'Cambiar a tema claro',
    switchToDark: 'Cambiar a tema oscuro',
  },
  language: {
    switcherLabel: 'Idioma',
  },
} as const satisfies ShellDictTranslated;

export default dict;
