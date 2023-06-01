export function isDigit(n) {
  const v = Number.parseFloat(n);
  return !isNaN(v) && Number.isSafeInteger(v);
}

export const TokenType = {
  INTEGER: 'integer',
  DOT: '.',
  LPAREN: '(',
  RPAREN: ')',
  MUL: '*',
  DIV: '/',
  MOD: '%',
  PLUS: '+',
  MINUS: '-',
  EOF: 'eof',
};
