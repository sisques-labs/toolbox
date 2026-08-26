import { CalculatePercentageUseCase } from './calculate-percentage.use-case';

describe('CalculatePercentageUseCase', () => {
  const useCase = new CalculatePercentageUseCase();

  it('computes what X% of Y is', () => {
    expect(useCase.percentOf(25, 200)).toBe(50);
  });

  it('computes what percent X is of Y', () => {
    expect(useCase.whatPercent(50, 200)).toBe(25);
  });

  it('computes the percentage change from X to Y', () => {
    expect(useCase.percentChange(200, 250)).toBe(25);
    expect(useCase.percentChange(200, 150)).toBe(-25);
  });

  it('returns a non-finite result when dividing by a zero base', () => {
    expect(Number.isFinite(useCase.whatPercent(10, 0))).toBe(false);
    expect(Number.isFinite(useCase.percentChange(0, 10))).toBe(false);
  });
});
