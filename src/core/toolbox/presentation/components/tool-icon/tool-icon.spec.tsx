import { render } from '@testing-library/react';
import { ALL_TOOL_IDS } from '@/core/toolbox/domain/tool.types';
import { ToolIcon } from './tool-icon';

describe('ToolIcon', () => {
  it.each(ALL_TOOL_IDS)('renders a decorative svg for the %s tool', (id) => {
    const { container } = render(<ToolIcon id={id} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
