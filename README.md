# Playwright-Supertest-Hybrid-Framework

A boilerplate framework that helps you to write automation tests for E2E and API using Playwright and Supertest.

### Test application

https://github.com/abhishekkadavil/nopCommerce#how-to-run

## Note
* Avoiding playwright.config.ts since it will make difficult to manage Page object in cucumber.
* if we set the parallel value to >1 and execute only 1 test case, await fixture.logger.close(); will throw exception - need to fix it
* Do not use an arrow function in Hooks, if we use then you will get an error  because the arrow functions have their own lexical context and do not correctly determine the this context. Hooks use context significantly and this context must be set as expected by the hook function. Instead, you should use regular function definition in hooks instead of arrow function. Normal functions automatically get the context and this context is set correctly.
* scenario context - https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md
cucumber World is used to impliment scenario context(World create an isolated scope for each scenario). Here we are creating an interface IWorld to store all the variables used in the scenario context and impliments the same in ScenarioContext class and later this class will be passed into setWorldConstructor() to let the cucumber know aout it. The reason we are creating an interface IWorld is to increase the readability of the code.

## Plugins needed

- Playwright Test for VSCode
- Cucumber (Gherkin) Full Support
  - ctrl + , -> will open the vs code user defined settings
    search for cucumber -> and edit the settings file - add cucumber.features, cucumber.glue paths
	```
		"cucumber.features": [
       "tests/features/*.feature",
   		],
   		"cucumber.glue": [
       "src/steps/*.ts",
		]
	```
## Debug
* Use https://trace.playwright.dev/ to view traceviwer, the zip files can be found inside test-results
* To debug the code we can use javascript debug terminal in the terminal drop down in VSCode. (https://www.youtube.com/watch?v=e16azjLChA8)

## Tech stack used

#### E2E Dependencies
* Playwright - typescript - E2E testing library

#### Common framework dependencies
* multiple-cucumber-html-reporter - For reporting
* winston - For logging
* dotenv - For environment variable management
* fs-extra - Used to clean up test result before each execution
* cross-env - Help to pass env variable properly for every platform
* cucumber - Testing framework
* faker - for test data

#### API Dependencies
* chai - assertion library
* supertest - API testing library

#### Other
* ts-node - TypeScript execution engine and REPL for Node.js.
* typescript - Language support for application-scale JavaScript


## Execution
We can execute the test in different ways:
* Normal case
	* Execute `npm run test`
	* To execute specific tags from command line we can use npm argument parser npm_config_ -> `npm run test --tags="@Login_Scenario3"`
	* Can pass browser type from cli -> `npm run test --tags="@Login_Scenario3" --browsertype="firefox"`
	* Default value for browser is chrome
* Rerun failed cases: run `npm run test test:failed`

### Execution Flow
In any point the execution in framework is start from `package.json`. Depending on the command executed in CLI `test:failed` or `test` script will executed.

Test that need to execute are defined in the features files present in the features folder, The set of test cases are identified by appropriate tag name using the tags section in cucumber.js or CLI.

#### Normal case
While executing `npm run test` package.json -> script -> test will be executed

test have below script:<br>
`"test": "cross-env ENV=staging FORCE_COLOR=0 cucumber-js --config=config/cucumber.js test || true"`

* `cross-env` - if we are planning to execute teston different OS the terminal will be differnt, to make the script compatible with all the OS we use this library.
* `ENV=staging` we can have multiple configurations for mutiple environment like staging and production, To specify which env we need to use we can use this.<br>
* `cross-env` and `ENV=staging` are from same library.
* `FORCE_COLOR=0` - Used to remove junk charectors from cucumber report
* `--config=config/cucumber.js` - specify cucumber configuration path
* `|| true` - by adding this in the test command the post test and pretest script will execute regardless of pass or fail of the test cases. If we do not give this, the pre and post test script will not execute after the test failure.

**Argument passing through CLI (tags, browser type etc) -**
The simplest way to pass arguments to an npm script is to prepend the arguments to the argument parser called npm_config_ and attach the result to the process.env object. In `npm_config_tags` or `npm_config_browsertype`, arguments can be passed from CLI, eg: `npm run test --tags="@Login_Scenario3"`<br>
**Note:** `TAGS` and `tags` are two different argument. TAGS is not working in linux env.

#### Rerun failed cases
While executing `npm run test test:failed` package.json -> script -> test:failed will be executed

* Create two profiles in `cucumber.js` file `default` and `rerun`
* Rerun profile should not contain `paths`, because if we provide path here then the scenarios from the path will be executed, we only need to execute failed scenarios hence we provide no path.
* Need to specify rerun in both profiles in cucumber.js -> format -> rerun (`"rerun:@rerun.txt"`)
* After specifying above if we execute the test and have failed test cases, Those failed feature file and scenarios  will be inserted in `rerun.txt`
* Add `cucumber-js -p rerun @rerun.txt` (`-p rerun` is selecting the rerun profile and passing the feature files through `@rerun.txt`)
* using `npm run test test:failed` we can execute failed test cases


## Test Execution Configurations

Execution configuration can be done from `cucumber.js` and `utils/env/.env*`

* retry, parallel, dryRun etc are configured from `cucumber.js`<br>
* browser, baseUrl, headless are done from `utils/env/.env*`


## Test case creation
Test cases are defined in the Features folder in the form of `.feature` file. The first step in the feature file is used to provide the test data used in the test case. Once we get the appropriate test data we can continue rest of the test step.

### src/steps
* This folder contain all the step defined in the feature file like reading test data, Do the functionality like login, create order etc<br>
### src/pages
* This folder contain all the operations defined in the steps file like login, create order etc
### src/helpers
* This folder contains classes for helping pages and steps creation
	* **AllPageObjects** - Contanis all the page's objects and this object is shared with cucumber world hence we can access the page object with respect to the scenario scope.
	* **InteractionHelper** - Created all the actions like click, type, screeshot etc in here so that we can add addional log and easy access.

## Read Test Data
**src/utils/dataReader.ts**<br>
Test data reading start from test data path provided in step defined in the feature file. Test data is provided in JSON file in `TestData/{feature name}/{test case01}` path. data reading is implimented in `src/utils/dataReader.ts`.

## Test reporting:
**src/utils/reporter/reporter.ts**<br>
Since we are using `cucumber-js` to run the tests, playwright report is cannot be used(https://github.com/cucumber/cucumber-js/issues/2221), hence we will use multiple-cucumber-html-reporter.

**Impliment multiple-cucumber-html-reporter**<br>
* Use formater in `cucumber.js` to create json from cucumber report.
* Create `utils/reporter/reporter.ts` for creating report from the above json file.
* After the test execution, use `node reporter.ts` command to execute `reporter.ts` then it will convert json to cucumber-html-reporter.
* We dont want to execute command manually every time after a test execution, So we are putting the same command inside posttest.
`"posttest": "npx ts-node src/utils/reporter.ts"` in package.js

cucumber-html-reporter is more npm trendier than other reporters like allure reporter etc. thats why i choose this reporter.


## Scenario context
**src/utils/scenarioContext.ts**<br>
It is a is an isolated scope for each scenario. All the operations which are common in scenario level like page object, test data, page etc data passing between test step are
done through cucumber world object(https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md). i.e. During the execution if we want to share the page or store the order number in one step and use that order number in different step, then we need to use `scenariocontext.ts`.

## Logs:
**src/utils/logger/logger.ts**<br>
We are using winston package for logging. we will manage log start and stop process in the hooks. We are sharing the log object between classes using fixture. same thing we can do using scenariocontext as well. Not any particular reason but just want to use fixture in the framework as well. Each scenario will have seperate log file.

## Other utils:
* **src/utils/browserManager.ts** - Manages browser selection as well aas browser settings like headless, timeout, maximise option etc.
* **src/utils/hooks.ts** - Manages Before, BeforeAll, BeforeStep, AfterStep, After, AfterAll through that manages page object initialisation, browser context creation, browser invoking, logging, tracing etc.
* **src/utils/preTest.ts** - clears test-results folder after each execution, This is executed from `pretest` script in the `package.json`.

### Test output
* The output of the test execution like order number, payment id etc. can be logged in report for the later use, so didn't create any other mechanism for that. Checkout `src/steps/CommonStepDef.ts`.

## Other Features
* Added Same test case with multiple types of data - Scenario outline mode
* Can execute in paralell mode, this can be controlled from cucucmber.js
* Added cucumber world for managing the state of page object, class object etc
* Added `InteractionHelper` class so less code in step def classes
* Most of the exceptions are also handling in `InteractionHelper` class

## Why and Why Not
* OOPS, used in framework - `scenarioContext.ts`, for implimenting cucumber world
* Design pattern used
	* Added factory design pattern in the framework - selecting the browser mechanism
	* DI injection in Test context
* No need to put the locators in exec or properties file because it's not efficient, if we implement such ecosystem we have to create and maintain separate files and related class to maintain that ecosystem which is an overkill
* instead of cucumber.json we are using cucumber.js(not*.ts beacause we will be during execution it will convert to js hence creating the file in js), because using *.json we cannot pass parameter like tags or anything from command line because it is a static file so if we convert to js file we can pass parameter.

## Feature need to add
* dockerized the framework
	* https://codefresh.io/blog/not-ignore-dockerignore-2/
* DB Connection should be in singleton pattern
* Need to run test case from feature file instead of test runner file
* Integrate with slack - https://www.youtube.com/watch?v=BsLFhe_1By8&list=PLNky9jSTCKG3j0WwqMDFOrr3XMlaSsKOY&index=12
* Need to add souce labs
* Need to add browser stack
* Need to integrate with aws
* Need to create artifactory for the framework

## Referece:
* https://github.com/Tallyb/cucumber-playwright/tree/master
* https://github.com/Tallyb/cucumber-playwright/pull/95/files
