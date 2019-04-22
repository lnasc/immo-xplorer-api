module.exports = function () {
    return {
      files: [
        'src/**/*.js'
      ],
  
      tests: [
        'test/**/*.spec.js'
      ],
  
      setup: function () {
        global.expect = require('chai').expect;
      },
  
      env: {
        type: 'node',
        runner: 'node'
      }
    };
  };