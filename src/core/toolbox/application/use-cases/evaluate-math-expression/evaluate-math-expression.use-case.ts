export interface MathEvalResult {
  ok: boolean;
  value?: number;
}

const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };
const FUNCTIONS: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt,
  abs: Math.abs,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: Math.log10,
  ln: Math.log,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
};

type Token =
  | { type: 'number'; value: number }
  | { type: 'ident'; value: string }
  | { type: 'op'; value: string };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const char = input[i];
    if (/\s/.test(char)) {
      i++;
    } else if (/[0-9.]/.test(char)) {
      let j = i;
      while (j < input.length && /[0-9.]/.test(input[j])) j++;
      tokens.push({ type: 'number', value: Number(input.slice(i, j)) });
      i = j;
    } else if (/[a-zA-Z]/.test(char)) {
      let j = i;
      while (j < input.length && /[a-zA-Z0-9]/.test(input[j])) j++;
      tokens.push({ type: 'ident', value: input.slice(i, j) });
      i = j;
    } else if ('+-*/%^()'.includes(char)) {
      tokens.push({ type: 'op', value: char });
      i++;
    } else {
      throw new Error(`Unexpected character: ${char}`);
    }
  }
  return tokens;
}

class Parser {
  private pos = 0;
  constructor(private tokens: Token[]) {}

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private next(): Token {
    const token = this.tokens[this.pos];
    if (!token) throw new Error('Unexpected end of expression');
    this.pos++;
    return token;
  }

  private peekOp(): string | null {
    const token = this.peek();
    return token?.type === 'op' ? token.value : null;
  }

  parse(): number {
    const value = this.parseExpr();
    if (this.pos !== this.tokens.length) {
      throw new Error('Unexpected trailing input');
    }
    return value;
  }

  private parseExpr(): number {
    let value = this.parseTerm();
    let op: string | null;
    while ((op = this.peekOp()) && ['+', '-'].includes(op)) {
      this.next();
      const rhs = this.parseTerm();
      value = op === '+' ? value + rhs : value - rhs;
    }
    return value;
  }

  private parseTerm(): number {
    let value = this.parseUnary();
    let op: string | null;
    while ((op = this.peekOp()) && ['*', '/', '%'].includes(op)) {
      this.next();
      const rhs = this.parseUnary();
      value = op === '*' ? value * rhs : op === '/' ? value / rhs : value % rhs;
    }
    return value;
  }

  private parseUnary(): number {
    if (this.peek()?.type === 'op' && this.peek()!.value === '-') {
      this.next();
      return -this.parseUnary();
    }
    return this.parsePower();
  }

  private parsePower(): number {
    const base = this.parseAtom();
    if (this.peek()?.type === 'op' && this.peek()!.value === '^') {
      this.next();
      const exponent = this.parseUnary();
      return Math.pow(base, exponent);
    }
    return base;
  }

  private parseAtom(): number {
    const token = this.next();

    if (token.type === 'number') return token.value;

    if (token.type === 'op' && token.value === '(') {
      const value = this.parseExpr();
      const closing = this.next();
      if (closing.type !== 'op' || closing.value !== ')') {
        throw new Error('Expected closing parenthesis');
      }
      return value;
    }

    if (token.type === 'ident') {
      const name = token.value.toLowerCase();
      if (this.peek()?.type === 'op' && this.peek()!.value === '(') {
        this.next();
        const arg = this.parseExpr();
        const closing = this.next();
        if (closing.type !== 'op' || closing.value !== ')') {
          throw new Error('Expected closing parenthesis');
        }
        const fn = FUNCTIONS[name];
        if (!fn) throw new Error(`Unknown function: ${name}`);
        return fn(arg);
      }
      if (name in CONSTANTS) return CONSTANTS[name];
      throw new Error(`Unknown identifier: ${name}`);
    }

    throw new Error('Unexpected token');
  }
}

export class EvaluateMathExpressionUseCase {
  execute(expression: string): MathEvalResult {
    try {
      const tokens = tokenize(expression);
      if (tokens.length === 0) return { ok: false };
      const value = new Parser(tokens).parse();
      if (!Number.isFinite(value)) return { ok: false };
      return { ok: true, value };
    } catch {
      return { ok: false };
    }
  }
}
