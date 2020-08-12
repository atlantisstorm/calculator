import { evaluate } from 'mathjs';
export const initialState = {
  calculation: "",
  result: "",
  balancedParentheses: 0,
  calculationError: false,
  history: []
}

export const numBtns = [7,8,9,4,5,6,1,2,3,'.',0, "="];
export const operatorsBtns = ['+', '-', '*', '/'];

export const parenthesesLeft = '(';
export const parenthesesRight = ')';

export const evaluateCalculation = (calculation, balancedParentheses) => {
  let newResult = "";
  let calculationError = false;
  try {
    newResult = balancedParentheses === 0 ? evaluate(calculation) : "";
  } catch(err) {
    calculationError = true;
  }

  if (newResult === Infinity || newResult === -Infinity) {
    newResult = "Cannot divide by 0";
  }

  return { newResult, calculationError };
}