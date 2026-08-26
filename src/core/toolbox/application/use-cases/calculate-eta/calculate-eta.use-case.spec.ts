import { CalculateEtaUseCase } from './calculate-eta.use-case';

describe('CalculateEtaUseCase', () => {
  const useCase = new CalculateEtaUseCase();

  it('estimates the remaining time from a linear completion rate', () => {
    const result = useCase.execute({
      unitsCompleted: 25,
      totalUnits: 100,
      elapsedSeconds: 50,
    });
    expect(result).toEqual({ ok: true, remainingSeconds: 150 });
  });

  it('returns zero remaining time once all units are complete', () => {
    const result = useCase.execute({
      unitsCompleted: 100,
      totalUnits: 100,
      elapsedSeconds: 50,
    });
    expect(result).toEqual({ ok: true, remainingSeconds: 0 });
  });

  it('rejects zero completed units, elapsed time or non-positive totals', () => {
    expect(
      useCase.execute({
        unitsCompleted: 0,
        totalUnits: 100,
        elapsedSeconds: 50,
      }).ok,
    ).toBe(false);
    expect(
      useCase.execute({
        unitsCompleted: 10,
        totalUnits: 100,
        elapsedSeconds: 0,
      }).ok,
    ).toBe(false);
    expect(
      useCase.execute({ unitsCompleted: 10, totalUnits: 0, elapsedSeconds: 50 })
        .ok,
    ).toBe(false);
  });
});
