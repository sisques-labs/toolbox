import { ConvertListUseCase } from './convert-list.use-case';

describe('ConvertListUseCase', () => {
  const useCase = new ConvertListUseCase();

  it('sorts ascending, trims and drops empty lines by default', () => {
    const result = useCase.execute(' banana \n\napple\ncherry', {
      sort: 'asc',
      unique: false,
      removeEmpty: true,
      prefix: '',
      suffix: '',
    });
    expect(result).toBe('apple\nbanana\ncherry');
  });

  it('sorts descending', () => {
    const result = useCase.execute('a\nb\nc', {
      sort: 'desc',
      unique: false,
      removeEmpty: false,
      prefix: '',
      suffix: '',
    });
    expect(result).toBe('c\nb\na');
  });

  it('removes duplicate lines while keeping first occurrence order', () => {
    const result = useCase.execute('a\nb\na\nc\nb', {
      sort: 'none',
      unique: true,
      removeEmpty: false,
      prefix: '',
      suffix: '',
    });
    expect(result).toBe('a\nb\nc');
  });

  it('applies a prefix and suffix to every line', () => {
    const result = useCase.execute('a\nb', {
      sort: 'none',
      unique: false,
      removeEmpty: false,
      prefix: '- ',
      suffix: ';',
    });
    expect(result).toBe('- a;\n- b;');
  });
});
