import Lexer from './lexer';
import Parser from './parser';
import Calculator from './calculator';

const input = '(1%1)';
const lexer = new Lexer(input);
const parser = new Parser(lexer);
const calculator = new Calculator(parser);

console.log(calculator.calc());
