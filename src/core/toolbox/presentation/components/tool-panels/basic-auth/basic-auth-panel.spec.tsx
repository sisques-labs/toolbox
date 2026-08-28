import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { BasicAuthPanel } from './basic-auth-panel';

describe('BasicAuthPanel', () => {
  it('encodes the default username/password into a header', () => {
    render(<BasicAuthPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('basic-auth-header').textContent).toMatch(
      /^Basic [A-Za-z0-9+/=]+$/,
    );
  });

  it('decodes a pasted header back into username and password', () => {
    render(<BasicAuthPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Authorization header'), {
      target: { value: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==' },
    });
    expect(screen.getByText('Aladdin')).toBeInTheDocument();
    expect(screen.getByText('open sesame')).toBeInTheDocument();
  });
});
