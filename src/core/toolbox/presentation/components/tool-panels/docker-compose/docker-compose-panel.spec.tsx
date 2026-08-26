import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { DockerComposePanel } from './docker-compose-panel';

describe('DockerComposePanel', () => {
  it('converts the default docker run command', () => {
    render(<DockerComposePanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('docker-compose-output').textContent).toContain(
      'services:',
    );
  });

  it('shows an error when there is no image', () => {
    render(<DockerComposePanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('docker run command'), {
      target: { value: 'docker run -d' },
    });
    expect(
      screen.getByText('Enter a docker run command with at least an image'),
    ).toBeInTheDocument();
  });
});
