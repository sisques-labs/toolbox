import { ConvertTimestampUseCase } from './convert-timestamp.use-case';

describe('ConvertTimestampUseCase', () => {
  const useCase = new ConvertTimestampUseCase();

  it('formats a fixed instant as ISO 8601 and UTC', () => {
    const epochMs = Date.UTC(2024, 0, 15, 12, 30, 0);

    const result = useCase.execute(epochMs, epochMs);

    expect(result.iso).toBe('2024-01-15T12:30:00.000Z');
    expect(result.utc).toBe('Mon, 15 Jan 2024 12:30:00 GMT');
  });

  it('describes a past instant relative to the given "now"', () => {
    const now = Date.UTC(2024, 0, 15, 13, 0, 0);
    const oneHourBefore = now - 60 * 60 * 1000;

    const result = useCase.execute(oneHourBefore, now);

    expect(result.relative).toBe('1 hour ago');
  });

  it('describes a future instant relative to the given "now"', () => {
    const now = Date.UTC(2024, 0, 15, 13, 0, 0);
    const inOneDay = now + 24 * 60 * 60 * 1000;

    const result = useCase.execute(inOneDay, now);

    expect(result.relative).toBe('tomorrow');
  });
});
