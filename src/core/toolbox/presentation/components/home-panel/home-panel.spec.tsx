import { fireEvent, render, screen } from '@testing-library/react';
import { ToolId } from '@/core/toolbox/domain/tool.types';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { HomePanel } from './home-panel';

describe('HomePanel', () => {
  it('renders every category and every tool as a card', () => {
    render(<HomePanel t={enToolbox} onSelectTool={() => {}} />);

    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Network')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Case converter/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Convert text between camelCase, snake_case, kebab-case and more',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /IP subnet calculator/ }),
    ).toBeInTheDocument();
  });

  it('calls onSelectTool with the clicked tool id', () => {
    const onSelectTool = vi.fn();
    render(<HomePanel t={enToolbox} onSelectTool={onSelectTool} />);

    fireEvent.click(screen.getByRole('button', { name: /UUID generator/ }));
    expect(onSelectTool).toHaveBeenCalledWith(ToolId.Uuid);
  });
});
