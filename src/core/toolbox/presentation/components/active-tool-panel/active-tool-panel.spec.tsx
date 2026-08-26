import { render, screen } from '@testing-library/react';
import { ToolId } from '@/core/toolbox/domain/tool.types';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { ActiveToolPanel } from './active-tool-panel';

describe('ActiveToolPanel', () => {
  it('renders the case converter panel for ToolId.Case', () => {
    render(
      <ActiveToolPanel
        activeTool={ToolId.Case}
        t={enToolbox}
        onCopy={() => {}}
      />,
    );
    expect(screen.getByLabelText('Input text')).toBeInTheDocument();
    expect(screen.getByText('helloWorldExample')).toBeInTheDocument();
  });

  it('renders the subnet calculator panel for ToolId.Subnet', () => {
    render(
      <ActiveToolPanel
        activeTool={ToolId.Subnet}
        t={enToolbox}
        onCopy={() => {}}
      />,
    );
    expect(
      screen.getByLabelText('CIDR (e.g. 192.168.1.0/24)'),
    ).toBeInTheDocument();
  });

  it('renders the JWT decoder panel for ToolId.Jwt', () => {
    render(
      <ActiveToolPanel
        activeTool={ToolId.Jwt}
        t={enToolbox}
        onCopy={() => {}}
      />,
    );
    expect(screen.getByLabelText('JWT token')).toBeInTheDocument();
  });

  it.each(Object.values(ToolId))(
    'renders a panel for every ToolId without throwing (%s)',
    (toolId) => {
      const { container } = render(
        <ActiveToolPanel activeTool={toolId} t={enToolbox} onCopy={() => {}} />,
      );

      expect(container).not.toBeEmptyDOMElement();
    },
  );
});
