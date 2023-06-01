import { TokenType, isDigit } from './utils';
import Token from './token';

export default class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.currentChar = this.input[this.pos];
  }
  forward() {
    this.pos++;
    if (this.pos < this.input.length) {
      this.currentChar = this.input[this.pos];
    } else {
      this.currentChar = null;
    }
  }
  isOp(c) {
    switch (c) {
      case TokenType.DOT:
      case TokenType.LPAREN:
      case TokenType.RPAREN:
      case TokenType.MUL:
      case TokenType.DIV:
      case TokenType.MOD:
      case TokenType.PLUS:
      case TokenType.MINUS:
        return true;
    }
    return false;
  }
  constains(source, delim) {
    for (var x = 0; x < source.length; x++) {
      if (source[x] == delim) {
        return true;
      }
    }
    return false;
  }
  extractNumbers() {
    let number = '';
    while (
      this.currentChar != null &&
      (isDigit(this.currentChar) ||
        (this.currentChar == TokenType.DOT && number.length > 0))
    ) {
      number += this.currentChar;
      this.forward();
    }
    if (this.constains(number, TokenType.DOT)) {
      return parseFloat(number);
    }
    return parseInt(number);
  }
  extractOperator() {
    let operator = this.currentChar;
    this.forward();
    return operator;
  }
  ignoreSpace() {
    while (this.currentChar != null && this.currentChar == ' ') {
      this.forward();
    }
  }
  getToken() {
    while (this.currentChar != null) {
      if (this.currentChar == ' ') {
        this.ignoreSpace();
      }

      if (isDigit(this.currentChar)) {
        let num = this.extractNumbers();
        return new Token(TokenType.INTEGER, num);
      }
      if (this.isOp(this.currentChar)) {
        let op = this.extractOperator();
        return new Token(op, op);
      }
    }
    return new Token(TokenType.EOF, null);
  }
}
