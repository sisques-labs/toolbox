import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { XmlJsonPanel } from './xml-json-panel';

describe('XmlJsonPanel', () => {
  it('converts the default XML to JSON', () => {
    render(<XmlJsonPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('xml-json-output').textContent).toContain(
      '"root"',
    );
  });

  it('converts JSON to XML in decode mode', () => {
    render(<XmlJsonPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'JSON → XML' }));
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: '{"root":{"name":"Toolbox"}}' },
    });
    expect(screen.getByTestId('xml-json-output').textContent).toBe(
      '<root>\n  <name>Toolbox</name>\n</root>',
    );
  });
});
