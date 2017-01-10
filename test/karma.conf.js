/* eslint-env node */

var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: [
      'jasmine'
    ],
    files: [
      require.resolve('es6-shim'),
      'test/specs/**/*.js'
    ],
    preprocessors: {
      'test/specs/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    coverageReporter: {
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'html',
        dir: 'coverage/'
      }]
    }
  });
};
