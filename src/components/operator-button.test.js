import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import OperatorButton from './operator-button';

describe('NumberButton component', () => {
  it('should match snapshot', () => {
    const onClick = jest.fn();
    const value = "+";

    const { asFragment } = render(
      <OperatorButton onClick={ onClick } value={ value } />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call dispatch with expected parameters', () => {
    const onClick = jest.fn();
    const value = "+";

    const { container, asFragment, getByTestId } = render(
      <OperatorButton onClick={ onClick } value={ value } />
    );

    const coreButton = getByTestId('core-button-+');
    fireEvent.click(coreButton);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(container.innerHTML).toContain("class=\"operator\"");

    // Plus loads of other tests...
  });
});