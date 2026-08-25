import { render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { ActiveToolPanel } from './active-tool-panel';

describe('ActiveToolPanel', () => {
  it('renders the case converter panel for "case"', () => {
    render(
      <ActiveToolPanel activeTool="case" t={enToolbox} onCopy={() => {}} />,
    );
    expect(screen.getByLabelText('Input text')).toBeInTheDocument();
    expect(screen.getByText('helloWorldExample')).toBeInTheDocument();
  });

  it('renders the subnet calculator panel for "subnet"', () => {
    render(
      <ActiveToolPanel activeTool="subnet" t={enToolbox} onCopy={() => {}} />,
    );
    expect(
      screen.getByLabelText('CIDR (e.g. 192.168.1.0/24)'),
    ).toBeInTheDocument();
  });

  it('renders the JWT decoder panel for "jwt"', () => {
    render(
      <ActiveToolPanel activeTool="jwt" t={enToolbox} onCopy={() => {}} />,
    );
    expect(screen.getByLabelText('JWT token')).toBeInTheDocument();
  });
});
