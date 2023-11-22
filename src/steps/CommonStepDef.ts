import { Given, When, Then } from "@cucumber/cucumber";
import { DataReader } from "../utils/dataReader";
import { ScenarioContext } from "@utils/scenarioContext";
import { fixture } from "../utils/pageFixture";

Given(
  "user is on home page and testdata present in {string}",
  async function (this: ScenarioContext, testDataPath: string) {
    try {
      const page = this.page!;
      await page.goto("/");

      // read test data
      const testDataReader: DataReader = new DataReader();
      this.testData = testDataReader.readJSON(testDataPath);

      // add custom log to cucumber report
      this.pagesObjs?.interactionHelper.addTextToReport(
        `Username ${this.testData.loginCredential.username}`
      );
      this.pagesObjs?.interactionHelper.addTextToReport(
        `Password ${this.testData.loginCredential.password}`
      );
    } catch (error) {
      fixture.logger.error(error);
    }
  }
);
