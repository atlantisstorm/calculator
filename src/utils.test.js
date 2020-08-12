import { evaluateCalculation } from './utils';

describe('utils tests', () => {
  it('evaluateCalculation should be a function', () => {
    expect(evaluateCalculation).toBeInstanceOf(Function);
  });

  it('should return zero when multipying by zero', () => {
    const calculation = "5*0";
    const balancedParentheses = 0;
    const { newResult, calculationError } = evaluateCalculation(calculation, balancedParentheses);
    expect(calculationError).toEqual(false);
    expect(newResult).toEqual(0);
  });

  it('should result in infinity when dividing by zero', () => {
    const calculation = "5/0";
    const balancedParentheses = 0;
    const { newResult, calculationError } = evaluateCalculation(calculation, balancedParentheses);
    expect(calculationError).toEqual(false);
    expect(newResult).toEqual("Cannot divide by 0");
  });

  it('should handle basic addition', () => {
    const calculation = "5+5";
    const balancedParentheses = 0;
    const { newResult, calculationError } = evaluateCalculation(calculation, balancedParentheses);
    expect(calculationError).toEqual(false);
    expect(newResult).toEqual(10);
  });

  it('should correctly calculate when in parentheses ', () => {
    const calculation = "(5*5)+(5*5)";
    const balancedParentheses = 0;
    const { newResult, calculationError } = evaluateCalculation(calculation, balancedParentheses);
    expect(calculationError).toEqual(false);
    expect(newResult).toEqual(50);
  });

  it('should report error for badly formed calculation', () => {
    const calculation = "5*5)";
    const balancedParentheses = 0;
    const { newResult, calculationError } = evaluateCalculation(calculation, balancedParentheses);
    expect(calculationError).toEqual(true);
  });

  // Plus countless other tests...
});