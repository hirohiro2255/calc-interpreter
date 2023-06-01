import { TokenType } from './utils';
import Token from './token';
import Lexer from './lexer';
import Parser from './parser';

export default class Calculator {
  constructor(parser) {
    this.parser = parser;
  }

  visit(node) {
    if (node.constructor.name === 'Operator') {
      return this.genOpNode(node);
    } else if (node.constructor.name === 'NumberNode') {
      return this.genNumNode(node);
    } else if (node.constructor.name === 'UnaryNode') {
      return this.genUnaryNode(node);
    } else {
      throw new TypeError('Invalid Token');
    }
  }
  genOpNode(node) {
    if (node.operator.type === TokenType.MUL) {
      return this.visit(node.left) * this.visit(node.right);
    } else if (node.operator.type === TokenType.DIV) {
      return this.visit(node.left) / this.visit(node.right);
    } else if (node.operator.type === TokenType.MOD) {
      return this.visit(node.left) % this.visit(node.right);
    } else if (node.operator.type === TokenType.PLUS) {
      return this.visit(node.left) + this.visit(node.right);
    } else if (node.operator.type === TokenType.MINUS) {
      return this.visit(node.left) - this.visit(node.right);
    }
  }
  genNumNode(node) {
    return node.value;
  }
  genUnaryNode(node) {
    let x = this.visit(node.number);
    return node.operator === TokenType.MINUS ? -x : +x;
  }
  calc() {
    return this.visit(this.parser.parse());
  }
}
