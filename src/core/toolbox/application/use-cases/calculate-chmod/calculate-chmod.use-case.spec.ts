import { CalculateChmodUseCase } from './calculate-chmod.use-case';

describe('CalculateChmodUseCase', () => {
  const useCase = new CalculateChmodUseCase();

  it('computes octal and symbolic from flags', () => {
    expect(
      useCase.fromFlags({
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: false, execute: true },
        other: { read: true, write: false, execute: false },
      }),
    ).toEqual({
      octal: '755',
      symbolic: 'rwxr-xr--',
      flags: {
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: false, execute: true },
        other: { read: true, write: false, execute: false },
      },
    });
  });

  it('parses an octal string', () => {
    expect(useCase.fromOctal('644')).toEqual({
      ok: true,
      octal: '644',
      symbolic: 'rw-r--r--',
      flags: {
        owner: { read: true, write: true, execute: false },
        group: { read: true, write: false, execute: false },
        other: { read: true, write: false, execute: false },
      },
    });
  });

  it('rejects invalid octal', () => {
    expect(useCase.fromOctal('999')).toEqual({ ok: false, error: 'invalid' });
    expect(useCase.fromOctal('77')).toEqual({ ok: false, error: 'invalid' });
  });
});
