import './App.css';
import  { useState } from 'react';


function App() {

  const [display, setDisplay] = useState('0');
  const [exp, setExp] = useState('0');

  const operators = ['+', '-', '*', '÷', '^', '%', '.'];

  //Delete values.
  const del = (clearAll) => {
    if (display === '') {
      return;
    }

    if (display === 'Infinity' || clearAll || display.length === 1) {
      setExp('0');
      setDisplay('0');
      return;
    }

    setExp(exp.slice(0, -1));
    setDisplay(display.slice(0, -1));
  }

  //Evaluate expression.
  const evaluate = () => {
    let value = eval(exp).toString();
    setExp(value);
    setDisplay(value);
  }

  //Generates the middle 3 rows.
  const generate = () => {

    const buttons = [];

    for (let i = 0; i < 3; i++) {
      buttons.push(
        <button className='op' onClick={() => update(operators[i])}>{operators[i]}</button>
      )
      for (let j = 1; j < 4; j++) {
        buttons.push(
          <button className='digit' onClick={() => update((3 * i + j).toString())}>{3 * i + j}</button>
        )
      }
    }

    return buttons;
  }

  const update = (value) => {

    //Don't want to start off with an operator.
    if (display === '' && operators.includes(value))  {
      return;
    }

    //No consecutive operators.
    if (operators.includes(value) && operators.includes(display.slice(-1))) {
      return;
    }

    //Special case of '÷'
    if (value === '÷') {

      setExp(exp + '/');
      setDisplay(display + value);
      return;
    }

    //Leading 0
    if (display === '0' && !operators.includes(value)) {
      setExp(value);
      setDisplay(value);
      return;
    }
    
    setExp(exp + value);
    setDisplay(display + value);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
        <span>{display}</span>
        </div>

        <div className="buttons">
          {/* Top row */}
          <button className='op' onClick={() => del(true)}>C</button>
          <button className='op' onClick={() => update('(')}>(</button>
          <button className='op' onClick={() => update(')')}>)</button>
          <button className='op' onClick={() => del(false)}>DEL</button>
          
          {/* Middle 3 rows. */}
          {generate()}
    
          {/* Bottom row */}
          <button className='op lcorner' onClick={() => update('÷')}>÷</button>
          <button className='digit' onClick={() => update('.')}>.</button>
          <button className='digit' onClick={() => update('0')}>0</button>
          <button className='sop rcorner' onClick={() => evaluate()}>=</button>

        </div>

      </div>
    </div>
  );
}


export default App;
