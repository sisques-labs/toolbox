export class GenerateUuidUseCase {
  execute(count: number): string[] {
    return Array.from({ length: count }, () => crypto.randomUUID());
  }
}
