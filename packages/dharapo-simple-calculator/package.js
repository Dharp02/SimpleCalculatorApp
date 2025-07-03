Package.describe({
  name: 'dharapo:simple-calculator',
  version: '1.0.0',
  summary: 'A universal React calculator component for all Meteor versions (1.8+)',
  git: 'https://github.com/dharapo/meteor-simple-calculator.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // Use a single, stable version that's widely supported
  api.versionsFrom('1.8.1');
  
  // Use only core packages that exist in all Meteor versions
  api.use([
    'ecmascript',    // Available in all modern Meteor versions
    'check',         // Available in all Meteor versions
    'meteor-base'    // Available in all Meteor versions
  ], ['client', 'server']);
  
  // Don't specify React versions - let the host app handle React
  // This prevents version conflicts
  
  // Export the calculator component and API
  api.export(['ReactCalculator', 'CalculatorAPI']);
  
  // Add package files
  api.addFiles([
    'lib/calculator-core.js'
  ], ['client', 'server']);
  
  api.addFiles([
    'client/Calculator.jsx',
    'client/calculator.css'
  ], 'client');
  
  api.addFiles([
    'server/calculator-methods.js'
  ], 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('dharapo:simple-calculator');
  api.addFiles('tests/calculator-tests.js');
});