module.exports = {
  require: ['dotenv/config'],
  spec: 'test/**/*.spec.js',
  timeout: 45000,
  parallel: false,
  retries: 0,
  forbidOnly: true,
  reporter: 'mocha-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'spec, mocha-junit-reporter, mochawesome',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'artifacts/junit/results-[hash].xml',
      toConsole: false
    },
    mochawesomeReporterOptions: {
      reportDir: 'artifacts/mochawesome',
      reportFilename: 'report',
      quiet: true,
      overwrite: true,
      html: true,
      json: true
    }
  }
};
