module.exports = {
  default: {
    /* The simplest way to pass arguments to an npm script is to prepend the arguments to the argument parser called npm_config_ and attach the result to the process.env object. below npm_config_tags, tags can be passed from cli, eg: npm run test --tags="@Login_Scenario3" Note: TAGS and tags are two different argument. TAGS is not working in linux env. */
    tags: process.env.npm_config_tags || '@Login_Scenario1',
    parallel: 1,
    retry: 0,
    format: [
      "progress-bar",
      "json:test-results/cucumber-report/cucumber-html-reporter.json",
      "message:test-results/cucumber-report/cucumber-html-reporter.ndjson",
      "html:test-results/cucumber-report/cucumber-report.html",
      "rerun:@rerun.txt",
    ],
    formatOptions: {
      snippetInterface: "async-await",
      html: "cucumber-report.html",
    },
    paths: ["tests/features"],
    dryRun: false,
    require: ["src/steps/*.ts", "src/utils/hooks.ts"],
    requireModule: ["ts-node/register"],
  },
  rerun: {
    parallel: 0,
    retry: 0,
    format: [
      "progress-bar",
      "json:test-results/cucumber-report/cucumber-html-reporter.json",
      "message:test-results/cucumber-report/cucumber-html-reporter.ndjson",
      "html:test-results/cucumber-report/cucumber-report.html",
      "rerun:@rerun.txt",
    ],
    formatOptions: {
      snippetInterface: "async-await",
      html: "cucumber-report.html",
    },
    dryRun: false,
    require: ["src/steps/*.ts", "src/utils/hooks.ts"],
    requireModule: ["ts-node/register"],
  },
};
