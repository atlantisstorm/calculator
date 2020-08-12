import React, {useReducer } from 'react';
import './App.css';
import Context from "./store/context";
import { reducer } from './store/reducer';
import { initialState } from './utils';
import Calculator from './components/calculator';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <Calculator />
      </Context.Provider>
    </div>
  );
}

export default App;
