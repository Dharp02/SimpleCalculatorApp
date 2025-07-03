import React from 'react';

const App = () => (
  <div className="app">
    <header>
      <h1>Simple Calculator Test</h1>
      <p>Testing dharapo:simple-calculator package</p>
    </header>
    
    {typeof SimpleCalculator !== 'undefined' ? (
      <SimpleCalculator 
        onCalculation={(result) => {
          console.log('Calculation:', result);
        }}
      />
    ) : (
      <div>Loading calculator...</div>
    )}
  </div>
);

export default App;