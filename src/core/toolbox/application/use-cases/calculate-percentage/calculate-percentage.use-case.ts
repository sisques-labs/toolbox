export class CalculatePercentageUseCase {
  percentOf(percent: number, value: number): number {
    return (percent / 100) * value;
  }

  whatPercent(part: number, whole: number): number {
    return (part / whole) * 100;
  }

  percentChange(from: number, to: number): number {
    return ((to - from) / from) * 100;
  }
}
