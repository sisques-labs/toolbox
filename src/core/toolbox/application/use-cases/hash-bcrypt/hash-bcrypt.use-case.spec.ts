import { HashBcryptUseCase } from './hash-bcrypt.use-case';

describe('HashBcryptUseCase', () => {
  const useCase = new HashBcryptUseCase();

  it('produces a bcrypt hash with the requested cost factor', () => {
    const hash = useCase.hash('correct horse battery staple', 10);
    expect(hash).toMatch(/^\$2[aby]\$10\$/);
  });

  it('verifies a matching plain text against its own hash', () => {
    const hash = useCase.hash('super-secret', 4);
    expect(useCase.compare('super-secret', hash)).toBe(true);
  });

  it('rejects a non-matching plain text', () => {
    const hash = useCase.hash('super-secret', 4);
    expect(useCase.compare('wrong-guess', hash)).toBe(false);
  });

  it('returns false for a malformed hash instead of throwing', () => {
    expect(useCase.compare('anything', 'not-a-real-hash')).toBe(false);
  });
});
