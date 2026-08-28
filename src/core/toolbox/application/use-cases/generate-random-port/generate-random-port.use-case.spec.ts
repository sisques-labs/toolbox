import { GenerateRandomPortUseCase } from './generate-random-port.use-case';

describe('GenerateRandomPortUseCase', () => {
  const useCase = new GenerateRandomPortUseCase();

  it('generates a port within the well-known range', () => {
    const port = useCase.execute('well-known');
    expect(port).toBeGreaterThanOrEqual(0);
    expect(port).toBeLessThanOrEqual(1023);
  });

  it('generates a port within the registered range', () => {
    const port = useCase.execute('registered');
    expect(port).toBeGreaterThanOrEqual(1024);
    expect(port).toBeLessThanOrEqual(49151);
  });

  it('generates a port within the dynamic/private range', () => {
    const port = useCase.execute('dynamic');
    expect(port).toBeGreaterThanOrEqual(49152);
    expect(port).toBeLessThanOrEqual(65535);
  });

  it('generates a port across the full range for "any"', () => {
    const port = useCase.execute('any');
    expect(port).toBeGreaterThanOrEqual(0);
    expect(port).toBeLessThanOrEqual(65535);
  });

  it('re-draws instead of using a biased value near the top of the uint32 range', () => {
    const spy = vi.spyOn(crypto, 'getRandomValues');
    spy.mockImplementationOnce((array) => {
      (array as Uint32Array)[0] = 0xffffffff;
      return array;
    });
    spy.mockImplementationOnce((array) => {
      (array as Uint32Array)[0] = 0;
      return array;
    });

    const port = useCase.execute('registered');

    expect(spy).toHaveBeenCalledTimes(2);
    expect(port).toBe(1024);

    spy.mockRestore();
  });
});
