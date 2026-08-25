import { render } from '@testing-library/react';
import type { ToolId } from '@/core/toolbox/domain/tool.types';
import { ToolIcon } from './tool-icon';

const ALL_TOOL_IDS: ToolId[] = [
  'case',
  'slug',
  'lorem',
  'json',
  'yaml',
  'base64',
  'url',
  'html',
  'jwt',
  'hash',
  'uuid',
  'password',
  'timestamp',
  'color',
  'subnet',
];

describe('ToolIcon', () => {
  it.each(ALL_TOOL_IDS)('renders a decorative svg for the %s tool', (id) => {
    const { container } = render(<ToolIcon id={id} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
