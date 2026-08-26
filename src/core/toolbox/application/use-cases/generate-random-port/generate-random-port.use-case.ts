export type PortRange = 'well-known' | 'registered' | 'dynamic' | 'any';

const RANGES: Record<PortRange, [number, number]> = {
  'well-known': [0, 1023],
  registered: [1024, 49151],
  dynamic: [49152, 65535],
  any: [0, 65535],
};

export class GenerateRandomPortUseCase {
  execute(range: PortRange): number {
    const [min, max] = RANGES[range];
    const span = max - min + 1;
    const [randomValue] = crypto.getRandomValues(new Uint32Array(1));
    return min + (randomValue % span);
  }
}
