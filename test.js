import Calculator from './calculator';
import { eq, fail, tests } from './tinytest';

tests({
  '1+1 === 2': function () {
    const calculator = new Calculator('1+1');
    eq(2, calculator.calc());
  },
  '2+5 === 7': function () {
    const calculator = new Calculator('2+5');
    eq(7, calculator.calc());
  },
  '3+9 === 12': function () {
    const calculator = new Calculator('3+9');
    eq(12, calculator.calc());
  },
  '0+9 === 9': function () {
    const calculator = new Calculator('0+9');
    eq(9, calculator.calc());
  },

  '1 - 1 === 0': function () {
    const calculator = new Calculator('1-1');
    eq(0, calculator.calc());
  },

  '1 - 2 === -1': function () {
    const calculator = new Calculator('1-2');
    eq(-1, calculator.calc());
  },

  '1 - 12 === -1': function () {
    const calculator = new Calculator('1 - 12');
    eq(-11, calculator.calc());
  },
});
