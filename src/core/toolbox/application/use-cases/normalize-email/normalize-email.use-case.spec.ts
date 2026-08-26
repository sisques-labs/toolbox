import { NormalizeEmailUseCase } from './normalize-email.use-case';

describe('NormalizeEmailUseCase', () => {
  const useCase = new NormalizeEmailUseCase();

  it('removes dots and the plus-tag from a Gmail address', () => {
    expect(useCase.execute('John.Doe+newsletter@Gmail.com')).toEqual({
      ok: true,
      normalized: 'johndoe@gmail.com',
    });
  });

  it('normalizes googlemail.com to gmail.com', () => {
    expect(useCase.execute('jane.doe@googlemail.com')).toEqual({
      ok: true,
      normalized: 'janedoe@gmail.com',
    });
  });

  it('only lowercases non-Gmail addresses, keeping dots and plus-tags', () => {
    expect(useCase.execute('John.Doe+tag@Example.com')).toEqual({
      ok: true,
      normalized: 'john.doe+tag@example.com',
    });
  });

  it('rejects an address with no @', () => {
    expect(useCase.execute('not-an-email').ok).toBe(false);
  });
});
