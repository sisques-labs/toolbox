import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { UuidPanel } from './uuid-panel';

const UUID_V4_PATTERN =
  /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;

describe('UuidPanel', () => {
  it('generates 5 UUIDs by default', () => {
    const { container } = render(<UuidPanel t={enToolbox} onCopy={() => {}} />);
    const rows = container.querySelectorAll('[data-testid="uuid-row"]');
    expect(rows).toHaveLength(5);
    for (const row of rows) {
      expect(row.textContent).toMatch(UUID_V4_PATTERN);
    }
  });

  it('regenerates the requested count when Generate is clicked', () => {
    const { container } = render(<UuidPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Count'), {
      target: { value: '3' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    expect(container.querySelectorAll('[data-testid="uuid-row"]')).toHaveLength(
      3,
    );
  });

  it('copies all UUIDs when Copy all is clicked', () => {
    const onCopy = vi.fn();
    render(<UuidPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy all' }));
    expect(onCopy).toHaveBeenCalledWith(expect.any(String), 'UUIDs');
  });
});
