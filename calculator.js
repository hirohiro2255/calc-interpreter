import { isDigit } from './utils';
import Token from './token';
import { TokenType } from './utils';

export default class Calculator {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.currentToken = null;
  }

  genError() {
    throw new TypeError('Not an expected character');
  }

  getNextToken() {
    const input = this.input;

    if (this.pos > input.length - 1) {
      return new Token(TokenType.EOF);
    }

    const c = input[this.pos];

    if (isDigit(c)) {
      const token = new Token(TokenType.INTEGER, Number.parseFloat(c));
      this.pos++;
      return token;
    }

    if (c === '+') {
      const token = new Token(TokenType.PLUS, '+');
      this.pos++;
      return token;
    }

    this.genError();
  }

  consume(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.getNextToken();
    } else {
      this.genError();
    }
  }

  calc() {
    this.currentToken = this.getNextToken();

    const n1 = this.currentToken;
    this.consume(TokenType.INTEGER);
    const plus = this.currentToken;
    this.consume(TokenType.PLUS);
    const n2 = this.currentToken;
    this.consume(TokenType.INTEGER);

    return n1.value + n2.value;
  }
}
