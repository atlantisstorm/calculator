import { reducer } from './reducer';
import { initialState } from '../utils';
import {
  BACK_CLICKED,
  CLEAR_CLICKED,
  HISTORY_CLICKED,
  NUMBER_CLICKED,
  OPERATOR_CLICKED,
  PARENTHESES_CLICKED
} from './types';

describe('reducer tests', () => {
  it('reducer should be a function', () => {
    expect(reducer).toBeInstanceOf(Function);
  });

  it('should restore default values when CLEAR_CLICKED is dispatched', () => {
    let state;
    const expectedState = initialState;

    state = reducer(initialState, { type: CLEAR_CLICKED });
    expect(state).toEqual(expectedState);
  });

  it('should save current calculation and result to history then clear them when HISTORY_CLICKED is dispatched', () => {
    let state;
    const testState = {
      calculation: "5+5",
      result: "10",
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };

    const expectedState = {
      calculation: "",
      result: "",
      balancedParentheses: 0,
      calculationError: false,
      history: [
        {
          calculation: "5+5",
          result: "10",
        }
      ]
    };

    state = reducer(testState, { type: HISTORY_CLICKED });
    expect(state).toMatchObject(expectedState);
  });

  it('should ignore invalid sequences when NUMBER_CLICKED is dispatched', () => {
    let state, testState, expectedState;

    // '(' after a number is invalid, return calculation error.
    testState = { 
      calculation: "5",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    state = reducer(testState, { type: NUMBER_CLICKED, payload: '(' });
    expect(state.calculationError).toEqual(true);

    // ')' after an operator is invalid, return state unchanged.
    testState = { 
      calculation: "5+",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    state = reducer(testState, { type: NUMBER_CLICKED, payload: ')' });
    expect(state.calculationError).toEqual(true);

    // number after ')' is invalid, return state unchanged.
    testState = { 
      calculation: "(5+5)",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = testState;
    state = reducer(testState, { type: NUMBER_CLICKED, payload: '5' });
    expect(state).toEqual(expectedState);

    // dot after ')' is invalid, return state unchanged.
    expectedState = testState;
    state = reducer(testState, { type: NUMBER_CLICKED, payload: '.' });
    expect(state).toEqual(expectedState);

    // . after '.' is invalid, return state unchanged.    
    testState = {
      calculation: "(5+5.",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = testState;
    state = reducer(testState, { type: NUMBER_CLICKED, payload: '.' });
    expect(state).toEqual(expectedState);

    // TODO obviously loads more tests can/should be added...
  });

  it('should ignore invalid sequences when OPERATOR_CLICKED is dispatched', () => {
    let state, testState, expectedState;

    // should add operator after a number.
    testState = { 
      calculation: "5",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = { 
      calculation: "5+",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };    

    state = reducer(testState, { type: OPERATOR_CLICKED, payload: '+' });
    expect(state).toMatchObject(expectedState);

    // should NOT add operator after an operator, return orginal state.
    testState = { 
      calculation: "5+",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };
  
    expectedState = {
      calculation: "5+",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };    
  
    state = reducer(testState, { type: OPERATOR_CLICKED, payload: '+' });
    expect(state).toMatchObject(expectedState);
  
    // should NOT add operator after an operator, return orginal state.
    testState = {
      calculation: "5+",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = {
      calculation: "5+",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    state = reducer(testState, { type: OPERATOR_CLICKED, payload: '+' });
    expect(state).toMatchObject(expectedState);

    // should NOT add divide/multiply operator after left parentheses, return orginal state.
    testState = {
      calculation: "(5+5)+(",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = {
      calculation: "(5+5)+(",
      result: "50",
      balancedParentheses: 0,
      calculationError: false
    };

    state = reducer(testState, { type: OPERATOR_CLICKED, payload: '/' });
    expect(state).toMatchObject(expectedState);

    // TODO obviously loads more tests can/should be added...
  });

  it('should ignore invalid sequences when PARENTHESES_CLICKED is dispatched', () => {
    let state, testState, expectedState;

    // should add left parentheses on empty calculation.
    testState = {
      calculation: "",
      result: "",
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = {
      calculation: "(",
      result: "",
      balancedParentheses: 1,
      calculationError: false
    };

    state = reducer(testState, { type: PARENTHESES_CLICKED, payload: '(' });
    expect(state).toMatchObject(expectedState);

    // should ignore right parentheses if previous was left parentheses..
    testState = {
      calculation: "(",
      result: "",
      balancedParentheses: 1,
      calculationError: false
    };

    expectedState = {
      calculation: "(",
      result: "",
      balancedParentheses: 1,
      calculationError: false
    };

    state = reducer(testState, { type: PARENTHESES_CLICKED, payload: ')' });
    expect(state).toMatchObject(expectedState);

    // should report calculation error for right parentheses if previous is operator.
    testState = {
      calculation: "5+",
      result: "",
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = {
      calculation: "5+",
      result: "",
      balancedParentheses: 0,
      calculationError: true
    };

    state = reducer(testState, { type: PARENTHESES_CLICKED, payload: ')' });
    expect(state).toMatchObject(expectedState);

    // should ignore left parentheses if previous is right parentheses, return original state.
    testState = {
      calculation: "(5+5)",
      result: 10,
      balancedParentheses: 0,
      calculationError: false
    };

    expectedState = {
      calculation: "(5+5)",
      result: 10,
      balancedParentheses: 0,
      calculationError: false
    };

    state = reducer(testState, { type: PARENTHESES_CLICKED, payload: '(' });
    expect(state).toMatchObject(expectedState);

    // TODO obviously loads more tests can/should be added...
  });

  it('should give correct response following a sequence click events', () => {
    let state, testState, expectedState;

    // should add left parentheses on empty calculation.
    testState = {
      calculation: "5+(8-65",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };
    state = reducer(testState, { type: PARENTHESES_CLICKED, payload: ')' });

    expectedState = {
      calculation: "5+(8-65)",
      result: -52,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: BACK_CLICKED });

    expectedState = {
      calculation: "5+(8-65",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: OPERATOR_CLICKED, payload: "/" });

    expectedState = {
      calculation: "5+(8-65/",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: NUMBER_CLICKED, payload: "0" });

    expectedState = {
      calculation: "5+(8-65/0",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: PARENTHESES_CLICKED, payload: ")" });

    expectedState = {
      calculation: "5+(8-65/0)",
      result: "Cannot divide by 0",
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: BACK_CLICKED });

    expectedState = {
      calculation: "5+(8-65/0",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: BACK_CLICKED });

    expectedState = {
      calculation: "5+(8-65/",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: NUMBER_CLICKED, payload: "5" });

    expectedState = {
      calculation: "5+(8-65/5",
      result: "",
      balancedParentheses: 1,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);

    // next action...
    testState = state;
    state = reducer(testState, { type: PARENTHESES_CLICKED, payload: ")" });

    expectedState = {
      calculation: "5+(8-65/5)",
      result: 0,
      balancedParentheses: 0,
      calculationError: false,
      history: []
    };
    expect(state).toMatchObject(expectedState);
    // Yes, the result of 5+(8-65/5) really is 0!

    // TODO obviously loads more tests can/should be added...
  });
});