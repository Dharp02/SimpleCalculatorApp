import React from 'react';
import Calculator from './Calculator';

const App = () => (
  <div className="app">
    <header>
      <h1>Simple Calculator</h1>
      <p>Built with Meteor & React</p>
    </header>
    
    <Calculator />
  </div>
);

export default App;