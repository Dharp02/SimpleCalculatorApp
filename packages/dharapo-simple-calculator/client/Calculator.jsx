// Simple Calculator Component - Working Version
console.log('Calculator.jsx loading...');

// Get React from global scope (Meteor 3.3 style)
const React = window.React;
const { useState } = React;

// Simple calculator component
function SimpleCalculator(props) {
  console.log('SimpleCalculator component created');
  
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
        return firstValue / secondValue;
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

  return React.createElement('div', {
    className: 'dharapo-calculator',
    style: { 
      maxWidth: '300px', 
      margin: '20px auto', 
      padding: '20px', 
      backgroundColor: '#333',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    // Display
    React.createElement('div', {
      key: 'display',
      style: { marginBottom: '15px' }
    }, 
      React.createElement('input', {
        type: 'text',
        value: display,
        readOnly: true,
        style: {
          width: '100%',
          height: '60px',
          fontSize: '24px',
          textAlign: 'right',
          padding: '0 15px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#222',
          color: 'white',
          boxSizing: 'border-box'
        }
      })
    ),
    
    // Buttons
    React.createElement('div', {
      key: 'buttons',
      style: { display: 'flex', flexDirection: 'column', gap: '10px' }
    }, [
      // Row 1
      React.createElement('div', {
        key: 'row1',
        style: { display: 'flex', gap: '10px' }
      }, [
        React.createElement('button', {
          key: 'clear',
          onClick: clearAll,
          style: buttonStyle('#a6a6a6', 'black')
        }, 'C'),
        React.createElement('button', {
          key: 'ce',
          onClick: clearEntry,
          style: buttonStyle('#a6a6a6', 'black')
        }, 'CE'),
        React.createElement('button', {
          key: 'divide',
          onClick: () => inputOperation('÷'),
          style: buttonStyle('#ff9500', 'white')
        }, '÷'),
        React.createElement('button', {
          key: 'multiply',
          onClick: () => inputOperation('×'),
          style: buttonStyle('#ff9500', 'white')
        }, '×')
      ]),
      
      // Row 2
      React.createElement('div', {
        key: 'row2',
        style: { display: 'flex', gap: '10px' }
      }, [
        React.createElement('button', {
          key: '7',
          onClick: () => inputNumber(7),
          style: buttonStyle('#666', 'white')
        }, '7'),
        React.createElement('button', {
          key: '8',
          onClick: () => inputNumber(8),
          style: buttonStyle('#666', 'white')
        }, '8'),
        React.createElement('button', {
          key: '9',
          onClick: () => inputNumber(9),
          style: buttonStyle('#666', 'white')
        }, '9'),
        React.createElement('button', {
          key: 'subtract',
          onClick: () => inputOperation('-'),
          style: buttonStyle('#ff9500', 'white')
        }, '-')
      ]),
      
      // Row 3
      React.createElement('div', {
        key: 'row3',
        style: { display: 'flex', gap: '10px' }
      }, [
        React.createElement('button', {
          key: '4',
          onClick: () => inputNumber(4),
          style: buttonStyle('#666', 'white')
        }, '4'),
        React.createElement('button', {
          key: '5',
          onClick: () => inputNumber(5),
          style: buttonStyle('#666', 'white')
        }, '5'),
        React.createElement('button', {
          key: '6',
          onClick: () => inputNumber(6),
          style: buttonStyle('#666', 'white')
        }, '6'),
        React.createElement('button', {
          key: 'add',
          onClick: () => inputOperation('+'),
          style: buttonStyle('#ff9500', 'white')
        }, '+')
      ]),
      
      // Row 4
      React.createElement('div', {
        key: 'row4',
        style: { display: 'flex', gap: '10px' }
      }, [
        React.createElement('button', {
          key: '1',
          onClick: () => inputNumber(1),
          style: buttonStyle('#666', 'white')
        }, '1'),
        React.createElement('button', {
          key: '2',
          onClick: () => inputNumber(2),
          style: buttonStyle('#666', 'white')
        }, '2'),
        React.createElement('button', {
          key: '3',
          onClick: () => inputNumber(3),
          style: buttonStyle('#666', 'white')
        }, '3'),
        React.createElement('button', {
          key: 'equals',
          onClick: performCalculation,
          style: buttonStyle('#ff9500', 'white')
        }, '=')
      ]),
      
      // Row 5
      React.createElement('div', {
        key: 'row5',
        style: { display: 'flex', gap: '10px' }
      }, [
        React.createElement('button', {
          key: '0',
          onClick: () => inputNumber(0),
          style: { ...buttonStyle('#666', 'white'), flex: '2' }
        }, '0'),
        React.createElement('button', {
          key: 'decimal',
          onClick: () => inputNumber('.'),
          style: buttonStyle('#666', 'white')
        }, '.')
      ])
    ])
  ]);
}

// Button style helper
function buttonStyle(backgroundColor, color) {
  return {
    flex: '1',
    height: '60px',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: backgroundColor,
    color: color
  };
}

// Export to global scope
if (typeof window !== 'undefined') {
  window.ReactCalculator = SimpleCalculator;
}

// Also assign to global variable for Meteor package system
ReactCalculator = SimpleCalculator;

console.log('Calculator.jsx loaded, ReactCalculator assigned:', typeof ReactCalculator);