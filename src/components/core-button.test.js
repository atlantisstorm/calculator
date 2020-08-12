import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import CoreButton from './core-button';

describe('CoreButton component', () => {
  it('should match snapshot', () => {
    const onClick = jest.fn();
    const value = "5";
    const cls = "";

    const { asFragment } = render(
      <CoreButton onClick={ onClick } value={ value } cls={ cls } />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call dispatch with expected parameters', () => {
    const onClick = jest.fn();
    const value = "5";
    const cls = "";

    const { asFragment, getByTestId } = render(
      <CoreButton onClick={ onClick } value={ value } cls={ cls } />
    );

    const coreButton = getByTestId('core-button-5');
    fireEvent.click(coreButton);
    expect(onClick).toHaveBeenCalledTimes(1);

    // Plus loads of other tests...
  });
});