import React, { useReducer } from 'react';
import { render, fireEvent } from "@testing-library/react";
import Context from "../store/context";
import { reducer } from '../store/reducer';
import { initialState } from '../utils';
import Calculator from './calculator';

import {
  BACK_CLICKED,
  CLEAR_CLICKED,
  HISTORY_CLICKED,
  NUMBER_CLICKED,
  OPERATOR_CLICKED,
  PARENTHESES_CLICKED
} from '../store/types';

describe('Calculator component', () => {
  it('should match snapshot', () => {
    const TestComponent = () => {
      const [state, dispatch] = useReducer(reducer, initialState);
      return (
        <Context.Provider value={{ state, dispatch }}>
          <Calculator />
        </Context.Provider>
      )
    }

    const { asFragment } = render(
      <TestComponent />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call dispatch with expected parameters', () => {
    const dispatchMock = jest.fn();
    let coreButton;

    const TestComponent = () => {
      const [state, dispatch] = useReducer(reducer, initialState);
      return (
        <Context.Provider value={{ state, dispatch: dispatchMock }}>
          <Calculator />
        </Context.Provider>
      )
    }

    const { container, asFragment, getByTestId } = render(
      <TestComponent />
    );
  
    expect(dispatchMock).toHaveBeenCalledTimes(0);

    // number panel click
    coreButton = getByTestId('core-button-1');
    fireEvent.click(coreButton);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: NUMBER_CLICKED, payload: "1" });

    // operator panel click
    coreButton = getByTestId('core-button-+');
    fireEvent.click(coreButton);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith({ type: OPERATOR_CLICKED, payload: "+" });

    // top panel
    coreButton = getByTestId('core-button-(');
    fireEvent.click(coreButton);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith({ type: PARENTHESES_CLICKED, payload: "(" });

    // history (=) button clicked
    coreButton = getByTestId('core-button-=');
    fireEvent.click(coreButton);
    expect(dispatchMock).toHaveBeenCalledTimes(4);
    expect(dispatchMock).toHaveBeenCalledWith({ type: HISTORY_CLICKED });

    // back button clicked
    coreButton = getByTestId('core-button-back');
    fireEvent.click(coreButton);
    expect(dispatchMock).toHaveBeenCalledTimes(5);
    expect(dispatchMock).toHaveBeenCalledWith({ type: BACK_CLICKED });

    // clear button clicked
    coreButton = getByTestId('core-button-clear');
    fireEvent.click(coreButton);
    expect(dispatchMock).toHaveBeenCalledTimes(6);
    expect(dispatchMock).toHaveBeenCalledWith({ type: CLEAR_CLICKED });

    // Plus loads of other tests...
  });

  it('should call dispatch with expected parameters', () => {
    let coreButton;  
    const TestComponent = () => {
      const [state, dispatch] = useReducer(reducer, initialState);
      return (
        <Context.Provider value={{ state, dispatch }}>
          <Calculator />
        </Context.Provider>
      )
    }

    const { container, getByTestId } = render(
      <TestComponent />
    );
 
    // click 5
    coreButton = getByTestId('core-button-5');
    fireEvent.click(coreButton);

    // click *
    coreButton = getByTestId('core-button-*');
    fireEvent.click(coreButton);

    // click 5
    coreButton = getByTestId('core-button-5');
    fireEvent.click(coreButton);

    // operator panel click
    let calculation = getByTestId('calculation');
    let result = getByTestId('result');

    expect(calculation.innerHTML).toContain("5*5");
    expect(result.innerHTML).toContain("25");

    // click back
    coreButton = getByTestId('core-button-back');
    fireEvent.click(coreButton);

    calculation = getByTestId('calculation');
    expect(calculation.innerHTML).toContain("5*");

    // clear click
    coreButton = getByTestId('core-button-clear');
    fireEvent.click(coreButton);

    calculation = getByTestId('calculation');
    result = getByTestId('result');
    expect(calculation.innerHTML).toContain("");
    expect(result.innerHTML).toContain("");    

    // Plus loads of other tests...
  });
});