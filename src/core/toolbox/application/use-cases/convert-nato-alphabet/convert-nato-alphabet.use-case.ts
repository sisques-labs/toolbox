const LETTERS: Record<string, string> = {
  a: 'Alpha',
  b: 'Bravo',
  c: 'Charlie',
  d: 'Delta',
  e: 'Echo',
  f: 'Foxtrot',
  g: 'Golf',
  h: 'Hotel',
  i: 'India',
  j: 'Juliett',
  k: 'Kilo',
  l: 'Lima',
  m: 'Mike',
  n: 'November',
  o: 'Oscar',
  p: 'Papa',
  q: 'Quebec',
  r: 'Romeo',
  s: 'Sierra',
  t: 'Tango',
  u: 'Uniform',
  v: 'Victor',
  w: 'Whiskey',
  x: 'X-ray',
  y: 'Yankee',
  z: 'Zulu',
};

const DIGITS: Record<string, string> = {
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
};

function mapChar(char: string): string {
  return LETTERS[char.toLowerCase()] ?? DIGITS[char] ?? char;
}

export class ConvertNatoAlphabetUseCase {
  execute(text: string): string {
    const trimmed = text.trim();
    if (!trimmed) return '';

    return trimmed
      .split(/\s+/)
      .map((word) => word.split('').map(mapChar).join(' '))
      .join(' / ');
  }
}
