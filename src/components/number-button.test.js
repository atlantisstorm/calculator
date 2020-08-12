import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import NumberButton from './number-button';

describe('NumberButton component', () => {
  it('should match snapshot', () => {
    const onClick = jest.fn();
    const value = "5";

    const { asFragment } = render(
      <NumberButton onClick={ onClick } value={ value } />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call dispatch with expected parameters', () => {
    const onClick = jest.fn();
    const value = "5";

    const { container, getByTestId } = render(
      <NumberButton onClick={ onClick } value={ value } />
    );

    const coreButton = getByTestId('core-button-5');
    fireEvent.click(coreButton);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(container.innerHTML).toContain("class=\"number\"");

    // Plus loads of other tests...
  });
});