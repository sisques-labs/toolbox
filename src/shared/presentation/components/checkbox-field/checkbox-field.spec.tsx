import { fireEvent, render, screen } from '@testing-library/react';
import { CheckboxField } from './checkbox-field';

describe('CheckboxField', () => {
  it('associates the label with the checkbox and reflects the checked state', () => {
    render(<CheckboxField label="Uppercase" checked onChange={() => {}} />);
    expect(screen.getByLabelText('Uppercase')).toBeChecked();
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(
      <CheckboxField label="Uppercase" checked={false} onChange={onChange} />,
    );
    fireEvent.click(screen.getByLabelText('Uppercase'));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
