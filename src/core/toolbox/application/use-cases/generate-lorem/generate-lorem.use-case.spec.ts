import { GenerateLoremUseCase } from './generate-lorem.use-case';

describe('GenerateLoremUseCase', () => {
  const useCase = new GenerateLoremUseCase();

  it('generates the requested number of paragraphs', () => {
    const result = useCase.execute(3);

    expect(result.split('\n\n')).toHaveLength(3);
  });

  it('generates a single paragraph', () => {
    const result = useCase.execute(1);

    expect(result.split('\n\n')).toHaveLength(1);
  });

  it('produces paragraphs that start with an uppercase letter and end with a period', () => {
    const result = useCase.execute(5);

    for (const paragraph of result.split('\n\n')) {
      expect(paragraph).toMatch(/^[A-Z]/);
      expect(paragraph).toMatch(/\.$/);
    }
  });
});
