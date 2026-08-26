export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export interface TemperatureResult {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

export class ConvertTemperatureUseCase {
  execute(value: number, unit: TemperatureUnit): TemperatureResult {
    const celsius =
      unit === 'celsius'
        ? value
        : unit === 'fahrenheit'
          ? ((value - 32) * 5) / 9
          : value - 273.15;

    return {
      celsius,
      fahrenheit: (celsius * 9) / 5 + 32,
      kelvin: celsius + 273.15,
    };
  }
}
