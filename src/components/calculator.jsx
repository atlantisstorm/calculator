import React, { useContext } from 'react';
import NumberButton from './number-button';
import OperatorButton from './operator-button';
import CoreButton from './core-button';
import History from './history';
import { Context } from "../store/context";
import { numBtns, operatorsBtns, parenthesesLeft, parenthesesRight } from '../utils';
import {
  BACK_CLICKED,
  CLEAR_CLICKED,
  HISTORY_CLICKED,
  NUMBER_CLICKED,
  OPERATOR_CLICKED,
  PARENTHESES_CLICKED
} from '../store/types';

const Calculator = () => {
  const { state, dispatch } = useContext(Context);
  const { calculation, result, history } = state;

  const onClickNumber = (event) => {
    const payload = event.target.value || 0;
    if (payload !== "=") {
      dispatch({ type: NUMBER_CLICKED, payload: event.target.value || 0 });
    } else {
      dispatch({ type: HISTORY_CLICKED });
    } 
  }

  const onClickOperator = (event) => {
    dispatch({ type:OPERATOR_CLICKED, payload: event.target.value });
  }

  const onClickBack = () => {
    dispatch({ type:BACK_CLICKED });
  }

  const onClickClear = () => {
    dispatch({ type:CLEAR_CLICKED });
  }

  const onClickParentheses = (event) => {
    dispatch({ type: PARENTHESES_CLICKED, payload: event.target.value });
  }

  return (
    <div>
      <div className="panel">
        <h4>Calculator</h4>
        <div>
          <div data-testid="calculation" className="calculation" placeholder="Results will appear here">{calculation}</div>
        </div>
        <div data-testid="result" className="result">
          <span>{ result }</span>
        </div>
        <div>
            <CoreButton cls="parentheses" onClick={onClickParentheses} value={parenthesesLeft} />
            <CoreButton cls="parentheses" onClick={onClickParentheses} value={parenthesesRight} />
            <CoreButton cls="back" onClick={onClickBack} value="back" />
        </div>
        <div>
            <div className="number-panel">
              { numBtns.map((value, index) => (
                <NumberButton key={index} onClick={onClickNumber} value={value} />
                ))
              }
            </div>
            <div className="operators-panel" >
            { operatorsBtns.map((value, index) => (
                <OperatorButton key={index} onClick={onClickOperator} value={value} />
              ))
            }
            </div>
        </div>
        <div className="clear"></div>        
        <div>
          <CoreButton cls="clear" onClick={onClickClear} value="clear" />
        </div>
      </div>
      { history.length > 0 &&
        <History history={history} />
      }
    </div>  
  )
}

export default Calculator;