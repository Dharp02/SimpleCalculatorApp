// Server-side calculation methods for React Calculator Package
import { check } from 'meteor/check';
if (Meteor.isServer) {
  Meteor.methods({
    'reactCalculator.calculate': function(previousValue, currentValue, operator) {
      check(previousValue, Number);
      check(currentValue, Number);
      check(operator, String);
      
      try {
        const result = CalculatorAPI.performCalculation(previousValue, currentValue, operator);
        return result;
      } catch (error) {
        throw new Meteor.Error('calculation-error', error.message);
      }
    },
    
    // Batch calculation method
    'reactCalculator.batchCalculate': function(operations) {
      check(operations, Array);
      
      const results = [];
      
      operations.forEach(function(op, index) {
        check(op, {
          a: Number,
          b: Number,
          operator: String
        });
        
        try {
          const result = CalculatorAPI.performCalculation(op.a, op.b, op.operator);
          results.push({
            index: index,
            result: result,
            success: true
          });
        } catch (error) {
          results.push({
            index: index,
            error: error.message,
            success: false
          });
        }
      });
      
      return results;
    },
    
    // Get calculator stats (for analytics)
    'reactCalculator.getStats': function() {
      return {
        packageVersion: '1.0.0',
        supportedOperations: ['add', 'subtract', 'multiply', 'divide'],
        serverTime: new Date()
      };
    }
  });
}