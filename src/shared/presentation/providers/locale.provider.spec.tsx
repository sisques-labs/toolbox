import { render, screen } from '@testing-library/react';
import { LocaleProvider, useLocale } from './locale.provider';

function LocaleProbe() {
  const { locale } = useLocale();
  return <span data-testid="locale">{locale}</span>;
}

describe('LocaleProvider', () => {
  it('defaults to the default locale when no initialLocale is given', () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('es');
  });

  it('starts at the given initialLocale, matching a URL-prefixed page', () => {
    render(
      <LocaleProvider initialLocale="en">
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('does not override an explicit initialLocale with a stored preference', () => {
    window.localStorage.setItem('toolbox:locale', 'es');
    render(
      <LocaleProvider initialLocale="en">
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });
});
