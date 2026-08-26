import { ConvertTemperatureUseCase } from './convert-temperature.use-case';

describe('ConvertTemperatureUseCase', () => {
  const useCase = new ConvertTemperatureUseCase();

  it('converts 0°C to the other scales', () => {
    const result = useCase.execute(0, 'celsius');
    expect(result).toEqual({
      celsius: 0,
      fahrenheit: 32,
      kelvin: 273.15,
    });
  });

  it('converts 98.6°F to celsius and kelvin', () => {
    const result = useCase.execute(98.6, 'fahrenheit');
    expect(result.celsius).toBeCloseTo(37, 5);
    expect(result.kelvin).toBeCloseTo(310.15, 5);
  });

  it('converts 0K to celsius and fahrenheit (absolute zero)', () => {
    const result = useCase.execute(0, 'kelvin');
    expect(result.celsius).toBeCloseTo(-273.15, 5);
    expect(result.fahrenheit).toBeCloseTo(-459.67, 5);
  });
});
