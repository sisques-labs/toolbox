export type PortRange = 'well-known' | 'registered' | 'dynamic' | 'any';

const RANGES: Record<PortRange, [number, number]> = {
  'well-known': [0, 1023],
  registered: [1024, 49151],
  dynamic: [49152, 65535],
  any: [0, 65535],
};

const UINT32_RANGE = 0x100000000;

function unbiasedRandomInt(span: number): number {
  const rejectionLimit = Math.floor(UINT32_RANGE / span) * span;
  const buffer = new Uint32Array(1);
  let randomValue: number;
  do {
    [randomValue] = crypto.getRandomValues(buffer);
  } while (randomValue >= rejectionLimit);
  return randomValue % span;
}

export class GenerateRandomPortUseCase {
  execute(range: PortRange): number {
    const [min, max] = RANGES[range];
    const span = max - min + 1;
    return min + unbiasedRandomInt(span);
  }
}
