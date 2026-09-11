module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['support/world.ts', 'hooks/**/*.ts', 'step_definitions/**/*.step.ts'],
    format: ['progress-bar', 'json:reports/cucumber-report.json', 'html:reports/cucumber-report.html'],
    parallel: Number(process.env.PARALLEL_WORKERS || 1),
    timeout: 30000,
    publishQuiet: true,
    formatOptions: { snippetInterface: 'async-await' }
  }
};
