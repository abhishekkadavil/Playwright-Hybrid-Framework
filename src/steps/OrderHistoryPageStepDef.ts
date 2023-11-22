import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

Then(
  "order can be view in order history",
  async function (this: ScenarioContext) {
    await this.page?.goto("/order/history");
  }
);
