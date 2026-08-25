import { GenerateUuidUseCase } from './generate-uuid.use-case';

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('GenerateUuidUseCase', () => {
  const useCase = new GenerateUuidUseCase();

  it('generates the requested number of v4 UUIDs', () => {
    const result = useCase.execute(5);

    expect(result).toHaveLength(5);
    for (const uuid of result) {
      expect(uuid).toMatch(UUID_V4_PATTERN);
    }
  });

  it('generates unique values', () => {
    const result = useCase.execute(20);

    expect(new Set(result).size).toBe(20);
  });
});
