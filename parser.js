import { TokenType } from './utils';

export default class Parser {
  constructor(lex) {
    this.lexer = lex;
    this.currentToken = this.lexer.getToken();
  }
  consume(token_type) {
    if (this.currentToken.type == token_type) {
      this.currentToken = this.lexer.getToken();
    } else {
      throw new TypeError(
        `expected: ${token_type.toString()}. Got ${this.currentToken.type}`
      );
    }
  }
  factor() {
    let factor = this.currentToken;
    if (factor.type === TokenType.INTEGER) {
      this.consume(TokenType.INTEGER);
      return new NumberNode(factor);
    } else if (factor.type === TokenType.LPAREN) {
      this.consume(TokenType.LPAREN);
      let expr = this.expr();
      this.consume(TokenType.RPAREN);
      return expr;
    } else if (factor.type === TokenType.PLUS) {
      this.consume(TokenType.PLUS);
      let num = this.factor();
      return new UnaryNode(TokenType.PLUS, num);
    } else if (factor.type === TokenType.MINUS) {
      this.consume(TokenType.MINUS);
      let num = this.factor();
      return new UnaryNode(TokenType.MINUS, num);
    }
    return null;
  }
  term() {
    let node = this.factor();

    if (node === undefined || node === null) return null;

    while (
      this.currentToken.type === TokenType.MUL ||
      this.currentToken.type === TokenType.DIV ||
      this.currentToken.type === TokenType.MOD
    ) {
      let token = this.currentToken;
      if (token.type === TokenType.MUL) {
        this.consume(TokenType.MUL);
      } else if (token.type === TokenType.DIV) {
        this.consume(TokenType.DIV);
      } else if (token.type === TokenType.MOD) {
        this.consume(TokenType.MOD);
      }
      node = new Operator(node, token, this.factor());
    }
    return node;
  }
  expr() {
    let node = this.term();

    if (node === undefined || node === null) return null;

    while (
      this.currentToken.type === TokenType.PLUS ||
      this.currentToken.type === TokenType.MINUS
    ) {
      let token = this.currentToken;
      if (token.type === TokenType.PLUS) {
        this.consume(TokenType.PLUS);
      } else if (token.type === TokenType.MINUS) {
        this.consume(TokenType.MINUS);
      }
      node = new Operator(node, token, this.term());
    }
    return node;
  }
  parse() {
    return this.expr();
  }
}

class Operator {
  constructor(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

class NumberNode {
  constructor(token) {
    this.type = token.type;
    this.value = token.value;
  }
}

class UnaryNode {
  constructor(operator, num) {
    this.operator = operator;
    this.number = num;
  }
}
