import bcrypt from 'bcryptjs';

export class HashBcryptUseCase {
  hash(text: string, rounds: number): string {
    return bcrypt.hashSync(text, rounds);
  }

  compare(text: string, hash: string): boolean {
    try {
      return bcrypt.compareSync(text, hash);
    } catch {
      return false;
    }
  }
}
