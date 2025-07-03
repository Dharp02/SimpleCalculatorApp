// Core calculator functionality available on both client and server
CalculatorAPI = {
  // Basic arithmetic operations
  add: function(a, b) {
    return parseFloat(a) + parseFloat(b);
  },
  
  subtract: function(a, b) {
    return parseFloat(a) - parseFloat(b);
  },
  
  multiply: function(a, b) {
    return parseFloat(a) * parseFloat(b);
  },
  
  divide: function(a, b) {
    const divisor = parseFloat(b);
    if (divisor === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return parseFloat(a) / divisor;
  },
  
  // Utility function to validate numbers
  isValidNumber: function(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  
  // Format result for display
  formatResult: function(result) {
    if (typeof result === 'number') {
      // Round to avoid floating point precision issues
      return Math.round(result * 100000000) / 100000000;
    }
    return result;
  },
  
  // Calculate method that calls the server
  calculate: function(previousValue, currentValue, operator, callback) {
    if (Meteor.isClient) {
      Meteor.call('reactCalculator.calculate', previousValue, currentValue, operator, callback);
    } else {
      // Direct calculation on server
      return this.performCalculation(previousValue, currentValue, operator);
    }
  },
  
  // Direct calculation (used on server)
  performCalculation: function(previousValue, currentValue, operator) {
    let result;
    
    switch (operator) {
      case 'add':
        result = this.add(previousValue, currentValue);
        break;
      case 'subtract':
        result = this.subtract(previousValue, currentValue);
        break;
      case 'multiply':
        result = this.multiply(previousValue, currentValue);
        break;
      case 'divide':
        result = this.divide(previousValue, currentValue);
        break;
      default:
        throw new Error('Invalid operation: ' + operator);
    }
    
    if (!this.isValidNumber(result)) {
      throw new Error('Calculation resulted in invalid number');
    }
    
    return this.formatResult(result);
  }
};