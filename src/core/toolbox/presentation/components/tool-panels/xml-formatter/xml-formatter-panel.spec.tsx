import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { XmlFormatterPanel } from './xml-formatter-panel';

describe('XmlFormatterPanel', () => {
  it('pretty-prints the default input', () => {
    render(<XmlFormatterPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('xml-output').textContent).toContain('\n');
  });

  it('minifies the input when the minify button is clicked', () => {
    render(<XmlFormatterPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Minify' }));
    expect(screen.getByTestId('xml-output').textContent).not.toContain('\n');
  });

  it('shows an error for malformed XML', () => {
    render(<XmlFormatterPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('XML input'), {
      target: { value: '<root><a></root>' },
    });
    expect(
      screen.getByText('Enter valid, well-formed XML'),
    ).toBeInTheDocument();
  });
});
