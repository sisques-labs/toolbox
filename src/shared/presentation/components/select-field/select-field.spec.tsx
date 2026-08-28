import { fireEvent, render, screen } from '@testing-library/react';
import { SelectField } from './select-field';

describe('SelectField', () => {
  const options = [
    { value: '2', label: '2 spaces' },
    { value: '4', label: '4 spaces' },
  ];

  it('associates the label with the select and lists every option', () => {
    render(
      <SelectField
        label="Indent"
        value="2"
        onChange={() => {}}
        options={options}
      />,
    );
    const select = screen.getByLabelText('Indent');
    expect(select).toHaveValue('2');
    expect(
      screen.getByRole('option', { name: '4 spaces' }),
    ).toBeInTheDocument();
  });

  it('calls onChange when a different option is selected', () => {
    const onChange = vi.fn();
    render(
      <SelectField
        label="Indent"
        value="2"
        onChange={onChange}
        options={options}
      />,
    );
    fireEvent.change(screen.getByLabelText('Indent'), {
      target: { value: '4' },
    });
    expect(onChange).toHaveBeenCalledOnce();
  });
});
