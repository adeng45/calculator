import './App.css';
import  { useState } from 'react';


function App() {

  const [res, setRes] = useState("");

  //Generates the middle 3 rows.
  const operators = ['+', '-', '*', '/', '^', '%', '.'];

  const del = (i) => {
    if (res === '') {
      return;
    }
    setRes(res.slice(0, i));
  }

  const evaluate = () => {
    setRes(eval(res).toString());
  }

  const generate = () => {

    const buttons = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 4; j++) {
        buttons.push(
          <button className='digit' onClick={() => updateRes((3 * i + j).toString())}>{3 * i + j}</button>
        )
      }
      buttons.push(
        <button className='op' onClick={() => updateRes(operators[i])}>{operators[i]}</button>
      )
    }

    return buttons;
  }

  const updateRes = (value) => {

    //Don't want to start off with an operator.
    if (res === '' && operators.includes(value))  {
      return;
    }

    //No consecutive operators.
    if (operators.includes(value) && operators.includes(res.slice(-1))) {
      return;
    }

    //Leading 0
    if (res === '0' && !operators.includes(value)) {
      setRes(value);
      return;
    }
    
    setRes(res + value);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
        <span>{res}</span>
        </div>

        <div className="buttons">
          {/* Top row */}
          <button className='op' onClick={() => del(0)}>C</button>
          <button className='op' onClick={() => updateRes('^')}>^</button>
          <button className='op' onClick={() => updateRes('%')}>%</button>
          <button className='op' onClick={() => del(-1)}>DEL</button>
          
          {/* Middle 3 rows. */}
          {generate()}
    
          {/* Bottom row */}
          <button className='digit' onClick={() => updateRes('0')}>0</button>
          <button className='op' onClick={() => updateRes('.')}>.</button>
          <button className='op' onClick={() => evaluate()}>=</button>
          <button className='op' onClick={() => updateRes('/')}>/</button>
        </div>

      </div>
    </div>
  );
}


export default App;
