import { render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { DeviceInfoPanel } from './device-info-panel';

describe('DeviceInfoPanel', () => {
  it('shows the current browser environment', () => {
    render(<DeviceInfoPanel t={enToolbox} />);
    expect(screen.getByTestId('device-info-user-agent').textContent).toBe(
      navigator.userAgent,
    );
    expect(screen.getByTestId('device-info-language').textContent).toBe(
      navigator.language,
    );
  });
});
