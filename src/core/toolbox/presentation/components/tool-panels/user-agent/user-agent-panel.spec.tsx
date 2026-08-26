import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { UserAgentPanel } from './user-agent-panel';

describe('UserAgentPanel', () => {
  it('parses the default user agent string', () => {
    render(<UserAgentPanel t={enToolbox} />);
    expect(screen.getByTestId('ua-browser').textContent).toContain('Chrome');
    expect(screen.getByTestId('ua-os').textContent).toContain('Windows');
  });

  it('reparses when the input changes', () => {
    render(<UserAgentPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('User agent string'), {
      target: {
        value:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      },
    });
    expect(screen.getByTestId('ua-browser').textContent).toContain(
      'Mobile Safari',
    );
    expect(screen.getByTestId('ua-os').textContent).toContain('iOS');
  });
});
