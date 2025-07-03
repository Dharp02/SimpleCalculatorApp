// Basic tests for SimpleCalculator package
if (typeof Tinytest !== 'undefined') {
  Tinytest.add('SimpleCalculator - component exists', function (test) {
    test.isTrue(typeof SimpleCalculator !== 'undefined', 'SimpleCalculator component should be defined');
  });

  Tinytest.add('SimpleCalculator - is a function', function (test) {
    test.isTrue(typeof SimpleCalculator === 'function', 'SimpleCalculator should be a function');
  });
}