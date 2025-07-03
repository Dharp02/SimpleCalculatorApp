# Simple Calculator for Meteor

A modern, responsive React calculator component for Meteor 3.3+ applications with server-side calculations.

## Installation

```bash
meteor add dharapo:simple-calculator
```

## Basic Usage

```jsx
import React from 'react';
import { ReactCalculator } from 'meteor/dharapo:simple-calculator';

const App = () => (
  <div>
    <h1>My Calculator App</h1>
    <ReactCalculator />
  </div>
);

export default App;
```

## Features

- 🚀 Modern React component with hooks
- 🛡️ Server-side calculations for security
- 🎨 Multiple themes (default, light, compact)
- 📱 Responsive design
- ⚡ Real-time error handling
- 🔧 Easy customization
- 📊 Calculation callbacks for analytics

## Advanced Usage

### With Custom Props

```jsx
<ReactCalculator 
  className="my-calculator"
  theme="light"
  onCalculation={(result) => {
    console.log('Calculation:', result);
    // { operation: 'add', operand1: 5, operand2: 3, result: 8 }
  }}
/>
```

### Available Themes

```jsx
<ReactCalculator theme="default" />  {/* Dark theme (default) */}
<ReactCalculator theme="light" />    {/* Light theme */}
<ReactCalculator theme="compact" />  {/* Smaller size */}
```

### Using the API Directly

```javascript
import { CalculatorAPI } from 'meteor/dharapo:simple-calculator';

// Client-side (calls server)
CalculatorAPI.calculate(10, 5, 'add', (error, result) => {
  if (!error) {
    console.log(result); // 15
  }
});

// Server-side (direct calculation)
const result = CalculatorAPI.performCalculation(10, 5, 'multiply'); // 50
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | String | `''` | Additional CSS class |
| `theme` | String | `'default'` | Theme variant |
| `onCalculation` | Function | `null` | Callback for calculations |

## API Methods

### Meteor Methods

- `dharapo.calculator.calculate(a, b, operator)` - Performs server-side calculation
- `dharapo.calculator.batchCalculate(operations)` - Performs multiple calculations
- `dharapo.calculator.getStats()` - Returns package information

### Core API

- `CalculatorAPI.add(a, b)`
- `CalculatorAPI.subtract(a, b)`
- `CalculatorAPI.multiply(a, b)`
- `CalculatorAPI.divide(a, b)`
- `CalculatorAPI.isValidNumber(value)`
- `CalculatorAPI.formatResult(result)`

## Requirements

- **Meteor**: 1.8+ (tested up to 3.3+)
- **React**: 16+ (compatible with 16, 17, 18+)
- **Browser**: Modern browsers with ES6 support

## Compatibility

This package is designed to work with:
- ✅ Meteor 1.8, 1.9, 1.10, 1.11, 1.12
- ✅ Meteor 2.x (all versions)
- ✅ Meteor 3.x (all versions)
- ✅ React 16, 17, 18+
- ✅ Both client-side and server-side rendering
- ✅ TypeScript projects (with proper typing)

## Installation Notes

This package uses only core Meteor packages and doesn't force specific React versions, ensuring maximum compatibility with existing projects.

## Author

Created by dharapo

## License

MIT License