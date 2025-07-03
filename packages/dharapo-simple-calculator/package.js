Package.describe({
  name: 'dharapo:simple-calculator',
  version: '1.0.0',
  summary: 'A universal React calculator component that works with all Meteor versions (1.8+)',
  git: 'https://github.com/dharapo/meteor-simple-calculator.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  
  api.use([
    'ecmascript',
    'meteor-base'
  ], ['client', 'server']);
  
  api.export(['SimpleCalculator'], 'client');
  
  api.addFiles([
    'client/Calculator.jsx',
    'client/calculator.css'
  ], 'client');
});