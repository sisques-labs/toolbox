import { fireEvent, render, screen } from '@testing-library/react';
import { ToolId } from '@/core/toolbox/domain/tool.types';
import { ToolCard } from './tool-card';

describe('ToolCard', () => {
  it('renders the tool label and description', () => {
    render(
      <ToolCard
        id={ToolId.Json}
        label="JSON formatter"
        description="Validate, format and minify JSON"
        onSelect={() => {}}
      />,
    );

    expect(
      screen.getByRole('button', { name: /JSON formatter/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Validate, format and minify JSON'),
    ).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(
      <ToolCard
        id={ToolId.Json}
        label="JSON formatter"
        description="Validate, format and minify JSON"
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /JSON formatter/ }));
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
