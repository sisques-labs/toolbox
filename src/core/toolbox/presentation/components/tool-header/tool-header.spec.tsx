import { fireEvent, render, screen } from '@testing-library/react';
import { ToolHeader } from './tool-header';

describe('ToolHeader', () => {
  const baseProps = {
    title: 'Case converter',
    description:
      'Convert text between camelCase, snake_case, kebab-case and more',
    locale: 'en' as const,
    onLocaleChange: () => {},
    theme: 'light' as const,
    onToggleTheme: () => {},
    themeLabels: {
      switchToLight: 'Switch to light',
      switchToDark: 'Switch to dark',
    },
    languageLabel: 'Language',
  };

  it('renders the active tool title and description', () => {
    render(<ToolHeader {...baseProps} />);
    expect(
      screen.getByRole('heading', { name: 'Case converter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Convert text between camelCase/),
    ).toBeInTheDocument();
  });

  it('calls onLocaleChange through the language switcher', () => {
    const onLocaleChange = vi.fn();
    render(<ToolHeader {...baseProps} onLocaleChange={onLocaleChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'ES' }));
    expect(onLocaleChange).toHaveBeenCalledWith('es');
  });

  it('calls onToggleTheme through the theme toggle', () => {
    const onToggleTheme = vi.fn();
    render(<ToolHeader {...baseProps} onToggleTheme={onToggleTheme} />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark' }));
    expect(onToggleTheme).toHaveBeenCalledOnce();
  });
});
