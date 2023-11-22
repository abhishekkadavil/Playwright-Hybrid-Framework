import {
  Before,
  BeforeAll,
  BeforeStep,
  AfterStep,
  After,
  ITestCaseHookParameter,
  AfterAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { Browser, ConsoleMessage } from "@playwright/test";
import { ScenarioContext } from "./scenarioContext";
import { invokeBrowser } from "./browserManager";
import { getEnv } from "./env/env";
import { fixture } from "./pageFixture";
import { createLogger } from "winston";
import { options } from "./logger/logger";
import { AllPageObjects } from "../helpers/AllPageObjects";

let browser: Browser;

// Overriding default timeout of cucumber js
setDefaultTimeout(60 * 1000);

// Since launching the browser takes lot of memery and resources it is recommended to do it in the BeforeAll by playwright
BeforeAll(async function () {
  /* Get the env values */
  getEnv();
  /*   select browser type and provide properties */
  browser = await invokeBrowser();
});

Before(async function (
  this: ScenarioContext,
  { pickle }: ITestCaseHookParameter
) {
  // Storing test name in scenario context
  this.testName = pickle.name + " " + pickle.id;

  // Creating logger
  fixture.logger = createLogger(options(this.testName));

  // Creating new browser context
  this.context = await browser.newContext({
    baseURL: process.env.BASE_E2E_URL,
    acceptDownloads: true,
    recordVideo: { dir: process.env.RECORD_VIDEO as string },
    viewport: null,
  });

  // Start tracing
  await this.context.tracing.start({
    name: this.testName,
    title: pickle.name,
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  this.page = await this.context.newPage();
  this.pagesObjs = new AllPageObjects(this.page,this);

  // get message from broser console and attach it in the report
  this.page.on("console", async (msg: ConsoleMessage) => {
    if (msg.type() === "log") {
      fixture.logger.info("----- Browser console log message ----- " + msg.text() + " -----");
    }
  });
});

BeforeStep(async function ({ pickleStep }) {
  fixture.logger.info("----- Step                        ----- " + pickleStep.text + " started -----");
});

AfterStep(async function ({ pickleStep }) {
  fixture.logger.info("----- Step                        ----- " + pickleStep.text + " ended -----");
});

After(async function (
  this: ScenarioContext,
  { result, pickle }: ITestCaseHookParameter
) {
  //Screenshot
  if (result?.status == Status.FAILED) {
    await this.pagesObjs?.interactionHelper.addScreenshotToReport(this.testName);
  }
  //   Stop tracing
  await this.context?.tracing.stop({
    path: (process.env.TRACE_DIR as string) + `${pickle.id}.zip`,
  });

  // Close all the browser and context
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
  await fixture.logger.close();
});
