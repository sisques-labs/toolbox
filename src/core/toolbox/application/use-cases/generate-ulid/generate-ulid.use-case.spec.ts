import { GenerateUlidUseCase } from './generate-ulid.use-case';

describe('GenerateUlidUseCase', () => {
  it('generates the expected count of ULIDs', () => {
    const useCase = new GenerateUlidUseCase();
    const result = useCase.execute(3);

    expect(result).toHaveLength(3);
    for (const ulid of result) {
      expect(ulid).toMatch(/^[0-9A-HJKMNP-TV-Z]{26}$/);
    }
  });

  it('is lexicographically sortable by time', () => {
    const useCase = new GenerateUlidUseCase({
      now: (() => {
        let t = 1_700_000_000_000;
        return () => {
          t += 1;
          return t;
        };
      })(),
      randomBytes: () => new Uint8Array(10).fill(0),
    });

    const [a, b] = useCase.execute(2);
    expect(a < b).toBe(true);
  });

  it('clamps count between 1 and 50', () => {
    const useCase = new GenerateUlidUseCase({
      now: () => 0,
      randomBytes: () => new Uint8Array(10).fill(1),
    });

    expect(useCase.execute(0)).toHaveLength(1);
    expect(useCase.execute(100)).toHaveLength(50);
  });

  it('encodes a known timestamp deterministically', () => {
    const useCase = new GenerateUlidUseCase({
      now: () => 1_464_408_595_200,
      randomBytes: () => new Uint8Array(10).fill(0),
    });

    expect(useCase.execute(1)[0]).toBe('01AKTRVPR00000000000000000');
  });
});
