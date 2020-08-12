import {
  evaluateCalculation,
  parenthesesLeft,
  parenthesesRight,
  initialState
} from '../utils';

export const handleNumberClick = ({ state, number }) => {
  const { calculation, balancedParentheses } = state;
  let newState = state;
  let sequenceOK = true;
  let regex = /\.$/; // Ends with a dot.
  if (number.match(regex) && calculation.match(regex)) {
    sequenceOK = false;
  }
  regex = /\)$/; // Ends with a right parentheses.
  if (calculation.match(regex)) {
    sequenceOK = false;
  }
  if (number.match(/^\.$/)) { // clicked dot?
    // Split current calculation to ensure we're not adding a decimal point when we've already got one!
    const els = calculation.split(/[+\-*/]/);
    const last_els = els[els.length-1];
    if (last_els.match(/\./)) {
      sequenceOK = false;
    }
  }
  if (sequenceOK) {
    // The number pad key hit is the equals sign then we don't add to the calculation string.
    const newCalculation = number !== "=" ? `${calculation}${number}` : calculation;
    const { newResult, calculationError } = evaluateCalculation(newCalculation, balancedParentheses);
    newState = {
      ...state,
      calculationError,
      calculation: newCalculation,
      result: newResult
    };
  }
  return newState;
}

export const handleHistoryClick = ({ state }) => {
  const { calculation, result, history } = state;
  const newHistory = [...history, { calculation, result }];
  const newCalculation = "";
  const newResult = "";

  return {...state, calculation: newCalculation, result: newResult, history: newHistory };
}

export const handleOperatorClick = ({ state, operator }) => {
  // Values on operator panel ['+', '-', '*', '/'].
  const { calculation } = state;

  let newState = state;
  // Ensure we don't add multiple operators together nor that we're following a left parentheses with a divide/multipy.
  if (!(calculation.match(/[+\-*/]$/)) && !(calculation.match(/[(]$/) && operator.match(/[/*]/) )) {
    newState = {
      ...state,
      calculation: `${calculation}${operator}`
    };
  }

  return newState;
}

export const handleBackClick = ({ state }) => {
  const { calculation, balancedParentheses } = state;
  const lastCharacter = calculation.slice(-1); // get last character.
  const newCalculation = calculation.slice(0, -1); // Remove last character.

  let newBalancedParentheses = balancedParentheses;
  if (lastCharacter === parenthesesLeft) {
    newBalancedParentheses = balancedParentheses -1;
  } else if (lastCharacter === parenthesesRight) {
    newBalancedParentheses = balancedParentheses +1;
  }

  const { newResult } = evaluateCalculation(newCalculation, balancedParentheses);

  return {
    ...state,
    calculation: newCalculation,
    result: newResult,
    balancedParentheses: newBalancedParentheses
  };
}
  
export const handleClearClick = () => {
  return initialState;
}

export const handleParenthesesClick = ({ state, parentheses }) => {
  const { calculation, balancedParentheses } = state;
  let newCalculation = calculation;
  let newBalancedParentheses = balancedParentheses;

  if (parentheses === parenthesesLeft) {
    if (!calculation.match(/(\d|\))$/)) {
      newCalculation = `${calculation}${parenthesesLeft}`;
      newBalancedParentheses = balancedParentheses + 1;
    }
  } else {
    if (!calculation.match(/[+\-*(]$/) && balancedParentheses !== 0) {
      newCalculation = `${calculation}${parenthesesRight}`;
      newBalancedParentheses = balancedParentheses - 1;
    }
  }

  const { newResult, calculationError } = evaluateCalculation(newCalculation, newBalancedParentheses);

  return {
    ...state,
    calculationError,
    calculation: newCalculation,
    result: newResult,
    balancedParentheses: newBalancedParentheses
  };
}

export const Model = {
  handleNumberClick,
  handleHistoryClick,
  handleOperatorClick,
  handleBackClick,
  handleClearClick,
  handleParenthesesClick
};

export default Model;