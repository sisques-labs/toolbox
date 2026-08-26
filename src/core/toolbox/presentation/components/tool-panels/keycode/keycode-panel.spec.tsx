import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { KeycodePanel } from './keycode-panel';

describe('KeycodePanel', () => {
  it('shows the placeholder before any key is pressed', () => {
    render(<KeycodePanel t={enToolbox} />);
    expect(screen.getByText('Press any key…')).toBeInTheDocument();
  });

  it('shows the key details after a keydown event', () => {
    render(<KeycodePanel t={enToolbox} />);
    fireEvent.keyDown(screen.getByTestId('keycode-listener'), {
      key: 'a',
      code: 'KeyA',
      keyCode: 65,
      ctrlKey: true,
    });
    expect(screen.getByTestId('keycode-key').textContent).toBe('a');
    expect(screen.getByTestId('keycode-code').textContent).toBe('KeyA');
    expect(screen.getByTestId('keycode-keycode').textContent).toBe('65');
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });
});
