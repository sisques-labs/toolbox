import type { HomeDict } from './en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

type HomeDictTranslated = WidenStringLiterals<HomeDict>;

const dict = {
  tools: {
    heading: 'Herramientas',
    empty: 'Todavía no hay herramientas publicadas aquí. Vuelve pronto.',
  },
} as const satisfies HomeDictTranslated;

export default dict;
