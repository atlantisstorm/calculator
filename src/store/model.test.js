import {
 handleBackClick,
 handleClearClick,
 handleHistoryClick,
 handleNumberClick,
 handleOperatorClick,
 handleParenthesesClick
} from './model';

import { initialState } from '../utils';

describe('model tests', () => {
  it('model should have these declared functions', () => {
    expect(handleBackClick).toBeInstanceOf(Function);
    expect(handleClearClick).toBeInstanceOf(Function);
    expect(handleHistoryClick).toBeInstanceOf(Function);
    expect(handleNumberClick).toBeInstanceOf(Function);
    expect(handleOperatorClick).toBeInstanceOf(Function);
    expect(handleParenthesesClick).toBeInstanceOf(Function);
  });

  it('handleBackClick should return expected state', () => {
    const state = {
      calculation: "5*5",
      result: 25,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    const expectedState = {
      calculation: "5*",
      result: "",
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };

    const newState = handleBackClick({ state });
    expect(newState).toEqual(expectedState);

    // Loads of other tests...
  });

  it('handleClearClick should return expected state', () => {
    const expectedState = initialState;

    const newState = handleClearClick();
    expect(newState).toEqual(expectedState);

    // Loads of other tests...
  });

  it('handleHistoryClick should return expected state', () => {
    const state = {
      calculation: "5*5",
      result: 25,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    const expectedState = {
      calculation: "",
      result: "",
      balancedParentheses: 0,
      calculationError: false,
      history: [{
        calculation: "5*5",
        result: 25,
      }]
    };

    const newState = handleHistoryClick({ state });
    expect(newState).toEqual(expectedState);

    // Loads of other tests...
  });

  it('handleNumberClick should return expected state', () => {
    const state = {
      calculation: "5*",
      result: 2,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    const expectedState = {
      calculation: "5*5",
      result: 25,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };

    const newState = handleNumberClick({ 
      state,
      number: "5"
     });
    expect(newState).toEqual(expectedState);

    // Loads of other tests...
  });

  it('handleOperatorClick should return expected state', () => {
    const state = {
      calculation: "5",
      result: 5,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    const expectedState = {
      calculation: "5+",
      result: 5,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };

    const newState = handleOperatorClick({ 
      state,
      operator: "+"
     });
    expect(newState).toEqual(expectedState);

    // Loads of other tests...
  });  

  it('handleParenthesesClick should return expected state', () => {
    const state = {
      calculation: "5+",
      result: 5,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    const expectedState = {
      calculation: "5+(",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };

    const newState = handleParenthesesClick({ 
      state,
      parentheses: "("
    });

    expect(newState).toEqual(expectedState);

    // Loads of other tests...
  });
});