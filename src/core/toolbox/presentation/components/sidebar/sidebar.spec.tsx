import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  it('renders every category heading and tool label', () => {
    render(
      <Sidebar
        t={enToolbox}
        brand="Toolbox"
        search=""
        onSearchChange={() => {}}
        activeTool="case"
        onSelectTool={() => {}}
      />,
    );

    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Network')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Case converter/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /IP subnet calculator/ }),
    ).toBeInTheDocument();
  });

  it('calls onSelectTool with the clicked tool id', () => {
    const onSelectTool = vi.fn();
    render(
      <Sidebar
        t={enToolbox}
        brand="Toolbox"
        search=""
        onSearchChange={() => {}}
        activeTool="case"
        onSelectTool={onSelectTool}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /UUID generator/ }));
    expect(onSelectTool).toHaveBeenCalledWith('uuid');
  });

  it('filters the tool list by the search term and hides empty categories', () => {
    render(
      <Sidebar
        t={enToolbox}
        brand="Toolbox"
        search="uuid"
        onSearchChange={() => {}}
        activeTool="case"
        onSelectTool={() => {}}
      />,
    );

    expect(
      screen.getByRole('button', { name: /UUID generator/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Case converter/ }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Text')).not.toBeInTheDocument();
  });

  it('calls onSearchChange when typing in the search box', () => {
    const onSearchChange = vi.fn();
    render(
      <Sidebar
        t={enToolbox}
        brand="Toolbox"
        search=""
        onSearchChange={onSearchChange}
        activeTool="case"
        onSelectTool={() => {}}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Search tools...'), {
      target: { value: 'json' },
    });
    expect(onSearchChange).toHaveBeenCalledWith('json');
  });
});
