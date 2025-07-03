import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNext) {
      setDisplay(String(num));
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNext(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue === 0 ? 0 : firstValue / secondValue; // Handle division by zero
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNext(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNext(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  return (
    <div className="calculator">
      <div className="display">
        <input 
          type="text" 
          value={display} 
          readOnly 
          className="display-screen"
        />
      </div>
      
      <div className="buttons">
        <div className="row">
          <button onClick={clearAll} className="btn clear">C</button>
          <button onClick={clearEntry} className="btn clear">CE</button>
          <button onClick={() => inputOperation('÷')} className="btn operator">÷</button>
          <button onClick={() => inputOperation('×')} className="btn operator">×</button>
        </div>
        
        <div className="row">
          <button onClick={() => inputNumber(7)} className="btn number">7</button>
          <button onClick={() => inputNumber(8)} className="btn number">8</button>
          <button onClick={() => inputNumber(9)} className="btn number">9</button>
          <button onClick={() => inputOperation('-')} className="btn operator">-</button>
        </div>
        
        <div className="row">
          <button onClick={() => inputNumber(4)} className="btn number">4</button>
          <button onClick={() => inputNumber(5)} className="btn number">5</button>
          <button onClick={() => inputNumber(6)} className="btn number">6</button>
          <button onClick={() => inputOperation('+')} className="btn operator">+</button>
        </div>
        
        <div className="row">
          <button onClick={() => inputNumber(1)} className="btn number">1</button>
          <button onClick={() => inputNumber(2)} className="btn number">2</button>
          <button onClick={() => inputNumber(3)} className="btn number">3</button>
          <button onClick={performCalculation} className="btn equals">=</button>
        </div>
        
        <div className="row">
          <button onClick={() => inputNumber(0)} className="btn number zero">0</button>
          <button onClick={() => inputNumber('.')} className="btn number">.</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;