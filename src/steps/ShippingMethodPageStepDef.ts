import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("select shipping method", async function (this: ScenarioContext) {
  await this.pagesObjs?.shippingMethodPage.selectShippingMethod();
});
