// Universal Calculator Component - Fixed for all Meteor versions
console.log('Loading SimpleCalculator...');

import React from 'react';

console.log('React found, version:', React.version);

function SimpleCalculatorComponent(props = {}) {
  const {
    className = '',
    theme = 'default',
    onCalculation = null
  } = props;

  const [display, setDisplay] = React.useState('0');
  const [previousValue, setPreviousValue] = React.useState(null);
  const [operation, setOperation] = React.useState(null);
  const [waitingForNext, setWaitingForNext] = React.useState(false);

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
    let result;
    switch (operation) {
      case '+':
        result = firstValue + secondValue;
        break;
      case '-':
        result = firstValue - secondValue;
        break;
      case '×':
        result = firstValue * secondValue;
        break;
      case '÷':
        result = secondValue === 0 ? 0 : firstValue / secondValue;
        break;
      default:
        result = secondValue;
    }
    
    return Math.round(result * 100000000) / 100000000;
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNext(true);
      
      if (onCalculation) {
        onCalculation({
          operation: operation,
          operand1: previousValue,
          operand2: inputValue,
          result: newValue
        });
      }
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

  // Use React.createElement for maximum compatibility
  return React.createElement('div', {
    className: `simple-calculator ${theme} ${className}`
  }, [
    // Display
    React.createElement('div', {
      key: 'display',
      className: 'calculator-display'
    }, 
      React.createElement('input', {
        type: 'text',
        value: display,
        readOnly: true,
        className: 'display-screen'
      })
    ),
    
    // Buttons
    React.createElement('div', {
      key: 'buttons',
      className: 'calculator-buttons'
    }, [
      // Row 1
      React.createElement('div', {
        key: 'row1',
        className: 'button-row'
      }, [
        React.createElement('button', {
          key: 'clear',
          onClick: clearAll,
          className: 'calc-btn clear-btn'
        }, 'C'),
        React.createElement('button', {
          key: 'ce',
          onClick: clearEntry,
          className: 'calc-btn clear-btn'
        }, 'CE'),
        React.createElement('button', {
          key: 'divide',
          onClick: () => inputOperation('÷'),
          className: 'calc-btn operator-btn'
        }, '÷'),
        React.createElement('button', {
          key: 'multiply',
          onClick: () => inputOperation('×'),
          className: 'calc-btn operator-btn'
        }, '×')
      ]),
      
      // Row 2
      React.createElement('div', {
        key: 'row2',
        className: 'button-row'
      }, [
        React.createElement('button', {
          key: '7',
          onClick: () => inputNumber(7),
          className: 'calc-btn number-btn'
        }, '7'),
        React.createElement('button', {
          key: '8',
          onClick: () => inputNumber(8),
          className: 'calc-btn number-btn'
        }, '8'),
        React.createElement('button', {
          key: '9',
          onClick: () => inputNumber(9),
          className: 'calc-btn number-btn'
        }, '9'),
        React.createElement('button', {
          key: 'subtract',
          onClick: () => inputOperation('-'),
          className: 'calc-btn operator-btn'
        }, '-')
      ]),
      
      // Row 3
      React.createElement('div', {
        key: 'row3',
        className: 'button-row'
      }, [
        React.createElement('button', {
          key: '4',
          onClick: () => inputNumber(4),
          className: 'calc-btn number-btn'
        }, '4'),
        React.createElement('button', {
          key: '5',
          onClick: () => inputNumber(5),
          className: 'calc-btn number-btn'
        }, '5'),
        React.createElement('button', {
          key: '6',
          onClick: () => inputNumber(6),
          className: 'calc-btn number-btn'
        }, '6'),
        React.createElement('button', {
          key: 'add',
          onClick: () => inputOperation('+'),
          className: 'calc-btn operator-btn'
        }, '+')
      ]),
      
      // Row 4
      React.createElement('div', {
        key: 'row4',
        className: 'button-row'
      }, [
        React.createElement('button', {
          key: '1',
          onClick: () => inputNumber(1),
          className: 'calc-btn number-btn'
        }, '1'),
        React.createElement('button', {
          key: '2',
          onClick: () => inputNumber(2),
          className: 'calc-btn number-btn'
        }, '2'),
        React.createElement('button', {
          key: '3',
          onClick: () => inputNumber(3),
          className: 'calc-btn number-btn'
        }, '3'),
        React.createElement('button', {
          key: 'equals',
          onClick: performCalculation,
          className: 'calc-btn equals-btn'
        }, '=')
      ]),
      
      // Row 5
      React.createElement('div', {
        key: 'row5',
        className: 'button-row'
      }, [
        React.createElement('button', {
          key: '0',
          onClick: () => inputNumber(0),
          className: 'calc-btn number-btn zero-btn'
        }, '0'),
        React.createElement('button', {
          key: 'decimal',
          onClick: () => inputNumber('.'),
          className: 'calc-btn number-btn'
        }, '.')
      ])
    ])
  ]);
}

// Export globally
if (typeof window !== 'undefined') {
  window.SimpleCalculator = SimpleCalculatorComponent;
}
if (typeof global !== 'undefined') {
  global.SimpleCalculator = SimpleCalculatorComponent;
}

SimpleCalculator = SimpleCalculatorComponent;

console.log('SimpleCalculator loaded successfully:', typeof SimpleCalculator);