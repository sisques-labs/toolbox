import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeToggle } from './theme-toggle';

const labels = {
  switchToLight: 'Switch to light theme',
  switchToDark: 'Switch to dark theme',
};

describe('ThemeToggle', () => {
  it('labels itself as a switch to dark when currently light', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} labels={labels} />);
    const button = screen.getByRole('button', {
      name: labels.switchToDark,
    });
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('labels itself as a switch to light when currently dark', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} labels={labels} />);
    const button = screen.getByRole('button', {
      name: labels.switchToLight,
    });
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="light" onToggle={onToggle} labels={labels} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
