import { ConvertJsonCsvUseCase } from './convert-json-csv.use-case';

describe('ConvertJsonCsvUseCase', () => {
  const useCase = new ConvertJsonCsvUseCase();

  it('converts a JSON array of flat objects to CSV', () => {
    const result = useCase.execute(
      '[{"name":"Ana","age":30},{"name":"Bob","age":25}]',
      'jsonToCsv',
    );
    expect(result).toEqual({ ok: true, output: 'name,age\nAna,30\nBob,25' });
  });

  it('quotes CSV fields containing a comma or a quote when converting from JSON', () => {
    const result = useCase.execute(
      '[{"name":"Doe, John","note":"Said \\"hi\\""}]',
      'jsonToCsv',
    );
    expect(result).toEqual({
      ok: true,
      output: 'name,note\n"Doe, John","Said ""hi"""',
    });
  });

  it('unions keys across objects, filling missing ones blank, when converting from JSON', () => {
    const result = useCase.execute(
      '[{"a":1,"b":2},{"a":3,"c":4}]',
      'jsonToCsv',
    );
    expect(result).toEqual({ ok: true, output: 'a,b,c\n1,2,\n3,,4' });
  });

  it('rejects non-array JSON input', () => {
    expect(useCase.execute('{"a":1}', 'jsonToCsv')).toEqual({ ok: false });
  });

  it('rejects invalid JSON input', () => {
    expect(useCase.execute('not json', 'jsonToCsv')).toEqual({ ok: false });
  });

  it('converts CSV to a JSON array of objects', () => {
    const result = useCase.execute('name,age\nAna,30\nBob,25', 'csvToJson');
    expect(result).toEqual({
      ok: true,
      output: JSON.stringify(
        [
          { name: 'Ana', age: '30' },
          { name: 'Bob', age: '25' },
        ],
        null,
        2,
      ),
    });
  });

  it('parses quoted CSV fields with embedded commas and escaped quotes', () => {
    const result = useCase.execute(
      'name,note\n"Doe, John","Said ""hi"""',
      'csvToJson',
    );
    expect(result).toEqual({
      ok: true,
      output: JSON.stringify(
        [{ name: 'Doe, John', note: 'Said "hi"' }],
        null,
        2,
      ),
    });
  });

  it('rejects empty CSV input', () => {
    expect(useCase.execute('   ', 'csvToJson')).toEqual({ ok: false });
  });
});
