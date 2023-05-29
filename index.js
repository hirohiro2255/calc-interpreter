import { TokenType, isDigit } from './utils';
import Token from './token';
import Calculator from './calculator';

const calculator = new Calculator('4+1');

console.log(calculator.calc());
