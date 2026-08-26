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

  it('accepts a step value against a wildcard base', () => {
    expect(useCase.parse('*/15 * * * *').ok).toBe(true);
  });

  it('accepts a step value against a range base', () => {
    expect(useCase.parse('0-30/10 * * * *').ok).toBe(true);
  });

  it('rejects a step value that is not a positive integer', () => {
    expect(useCase.parse('*/0 * * * *')).toEqual({
      ok: false,
      error: 'invalid',
    });
  });

  it('accepts a range value within bounds', () => {
    expect(useCase.parse('0 9-17 * * *').ok).toBe(true);
  });

  it('rejects a range value out of bounds', () => {
    expect(useCase.parse('0 9-99 * * *')).toEqual({
      ok: false,
      error: 'invalid',
    });
  });

  it('accepts a comma-separated list of values', () => {
    expect(useCase.parse('0,15,30 * * * *').ok).toBe(true);
  });

  it('rejects a comma-separated list containing an invalid item', () => {
    expect(useCase.parse('0,99 * * * *')).toEqual({
      ok: false,
      error: 'invalid',
    });
  });

  it('describes a weekend schedule', () => {
    expect(useCase.parse('0 9 * * 0,6')).toEqual({
      ok: true,
      expression: '0 9 * * 0,6',
      description: 'At 09:00 on weekends',
    });
  });

  it('describes a single numeric day of week by name', () => {
    expect(useCase.parse('0 9 * * 2')).toEqual({
      ok: true,
      expression: '0 9 * * 2',
      description: 'At 09:00 on Tue',
    });
  });

  it('describes a non-numeric day-of-week expression as-is', () => {
    expect(useCase.parse('0 9 * * 1,3,5')).toEqual({
      ok: true,
      expression: '0 9 * * 1,3,5',
      description: 'At 09:00 on day-of-week 1,3,5',
    });
  });

  it('describes a fixed minute-and-hour schedule combined with day/month', () => {
    expect(useCase.parse('0 9 15 6 *')).toEqual({
      ok: true,
      expression: '0 9 15 6 *',
      description: 'At 09:00 on day-of-month 15 in month 6',
    });
  });

  it('describes a fixed-minute, every-hour schedule with no extra fields', () => {
    expect(useCase.parse('30 * * * *')).toEqual({
      ok: true,
      expression: '30 * * * *',
      description: 'At minute 30 of every hour',
    });
  });

  it('describes a fixed-minute, every-hour schedule combined with day/month', () => {
    expect(useCase.parse('30 * 15 6 *')).toEqual({
      ok: true,
      expression: '30 * 15 6 *',
      description: 'At minute 30 of every hour, on day-of-month 15 in month 6',
    });
  });

  it('describes a step-minute schedule', () => {
    expect(useCase.parse('*/10 * * * *')).toEqual({
      ok: true,
      expression: '*/10 * * * *',
      description: 'Every 10 minutes',
    });
  });

  it('falls back to a raw cron summary for unrecognized shapes', () => {
    expect(useCase.parse('*/10 5 * * *')).toEqual({
      ok: true,
      expression: '*/10 5 * * *',
      description: 'Cron: */10 5 * * *',
    });
  });

  it('rejects an expression that does not have exactly five fields', () => {
    expect(useCase.parse('* * * *')).toEqual({ ok: false, error: 'invalid' });
  });
});
