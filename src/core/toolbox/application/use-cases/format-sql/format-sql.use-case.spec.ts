import { FormatSqlUseCase } from './format-sql.use-case';

describe('FormatSqlUseCase', () => {
  const useCase = new FormatSqlUseCase();

  it('puts each clause keyword on its own uppercased line', () => {
    const result = useCase.execute(
      'select id, name from users where id = 1 order by name',
    );
    expect(result).toBe(
      'SELECT id,\n  name\nFROM users\nWHERE id = 1\nORDER BY name',
    );
  });

  it('indents joins and multiple where conditions', () => {
    const result = useCase.execute(
      'select u.id from users u join orders o on o.user_id = u.id where u.active = 1 and o.total > 10',
    );
    expect(result).toBe(
      'SELECT u.id\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE u.active = 1\n  AND o.total > 10',
    );
  });

  it('returns an empty string for empty input', () => {
    expect(useCase.execute('   ')).toBe('');
  });
});
