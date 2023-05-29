export function isDigit(n) {
  const v = Number.parseFloat(n);
  return !isNaN(v) && Number.isSafeInteger(v);
}

export const TokenType = {
  INTEGER: 'integer',
  PLUS: 'plus',
  EOF: 'eof',
};
