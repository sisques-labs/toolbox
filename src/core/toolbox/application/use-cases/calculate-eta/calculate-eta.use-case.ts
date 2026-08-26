export interface EtaInput {
  unitsCompleted: number;
  totalUnits: number;
  elapsedSeconds: number;
}

export interface EtaResult {
  ok: boolean;
  remainingSeconds?: number;
}

export class CalculateEtaUseCase {
  execute({ unitsCompleted, totalUnits, elapsedSeconds }: EtaInput): EtaResult {
    if (unitsCompleted <= 0 || totalUnits <= 0 || elapsedSeconds <= 0) {
      return { ok: false };
    }
    if (unitsCompleted >= totalUnits) {
      return { ok: true, remainingSeconds: 0 };
    }

    const rate = unitsCompleted / elapsedSeconds;
    const remainingUnits = totalUnits - unitsCompleted;
    return { ok: true, remainingSeconds: remainingUnits / rate };
  }
}
