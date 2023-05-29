import { isDigit } from './utils';
import Token from './token';
import { TokenType } from './utils';

export default class Calculator {
  constructor(text) {
    this.text = text;
    this.pos = 0;
    this.currentToken = null;
    this.currentChar = this.text[this.pos];
  }

  genError() {
    throw new TypeError('Unexpected Token');
  }

  advance() {
    this.pos++;
    if (this.pos > this.text.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.text[this.pos];
    }
  }

  skipWhitespace() {
    while (this.currentChar !== null && this.currentChar === ' ') {
      this.advance();
    }
  }

  integer() {
    let result = '';
    while (this.currentChar !== null && isDigit(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return Number.parseFloat(result);
  }

  getNextToken() {
    while (this.currentChar !== null) {
      if (this.currentChar === ' ') {
        this.skipWhitespace();
        continue;
      }

      if (isDigit(this.currentChar)) {
        return new Token(TokenType.INTEGER, this.integer());
      }

      if (this.currentChar === '+') {
        this.advance();
        return new Token(TokenType.PLUS, '+');
      }

      if (this.currentChar === '-') {
        this.advance();
        return new Token(TokenType.MINUS, '-');
      }
      this.genError();
    }
    return new Token(TokenType.EOF);
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.getNextToken();
    } else {
      this.genError();
    }
  }

  calc() {
    this.currentToken = this.getNextToken();

    const left = this.currentToken;
    this.eat(TokenType.INTEGER);

    const op = this.currentToken;
    if (op.type === TokenType.PLUS) {
      this.eat(TokenType.PLUS);
    } else {
      this.eat(TokenType.MINUS);
    }

    const right = this.currentToken;
    this.eat(TokenType.INTEGER);

    if (op.type === TokenType.PLUS) {
      return left.value + right.value;
    } else {
      return left.value - right.value;
    }
  }
}
