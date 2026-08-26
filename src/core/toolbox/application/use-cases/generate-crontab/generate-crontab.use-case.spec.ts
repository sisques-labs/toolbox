import { GenerateCrontabUseCase } from './generate-crontab.use-case';

describe('GenerateCrontabUseCase', () => {
  const useCase = new GenerateCrontabUseCase();

  it('builds an expression from fields', () => {
    expect(
      useCase.build({
        minute: '30',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
      }),
    ).toEqual({
      ok: true,
      expression: '30 * * * *',
      description: 'At minute 30 of every hour',
    });
  });

  it('describes every minute', () => {
    expect(useCase.parse('* * * * *')).toEqual({
      ok: true,
      expression: '* * * * *',
      description: 'Every minute',
    });
  });

  it('describes a daily schedule', () => {
    expect(useCase.parse('0 9 * * *')).toEqual({
      ok: true,
      expression: '0 9 * * *',
      description: 'At 09:00 every day',
    });
  });

  it('describes weekday schedules', () => {
    expect(useCase.parse('0 9 * * 1-5')).toEqual({
      ok: true,
      expression: '0 9 * * 1-5',
      description: 'At 09:00 on weekdays (Mon–Fri)',
    });
  });

  it('rejects invalid expressions', () => {
    expect(useCase.parse('not cron')).toEqual({
      ok: false,
      error: 'invalid',
    });
  });

  it('rejects out-of-range fields when building', () => {
    expect(
      useCase.build({
        minute: '60',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
      }),
    ).toEqual({ ok: false, error: 'invalid' });
  });
});
