import React from 'react';
import { render } from "@testing-library/react";
import History from './history';

describe('History component', () => {
  it('should match snapshot', () => {
    const history = [
      {
        calculation: '5+5',
        result: "10"
      },
      {
        calculation: '5*5',
        result: "25"
      }
    ];
    const { asFragment } = render(
      <History history={ history } />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it.skip('more test here!', () => {
    // Plus loads of other tests...
  });
});