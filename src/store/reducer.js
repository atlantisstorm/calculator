import Model from './model';
import {
  BACK_CLICKED,
  CLEAR_CLICKED,
  HISTORY_CLICKED,
  NUMBER_CLICKED,
  OPERATOR_CLICKED,
  PARENTHESES_CLICKED
} from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    case NUMBER_CLICKED: {
      // Values on number panel [7,8,9,4,5,6,1,2,3,'.',0, "="].
      return Model.handleNumberClick({
        state,
        number: action.payload
      });
    }

    case HISTORY_CLICKED: {
      return Model.handleHistoryClick({ state });
    }

    case OPERATOR_CLICKED: {
      // Values on operator panel ['+', '-', '*', '/'].
      return Model.handleOperatorClick({ 
        state,
        operator: action.payload
      });
    }

    case BACK_CLICKED: {
      return Model.handleBackClick({ state });
    }

    case CLEAR_CLICKED: {
      return Model.handleClearClick();
    }

    case PARENTHESES_CLICKED: {
      return Model.handleParenthesesClick({
        state,
        parentheses: action.payload
      })
    }

    default: {
      return state;
    }
  }
};