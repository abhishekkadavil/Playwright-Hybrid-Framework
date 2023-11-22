import { Given, When } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("select billing address", async function (this: ScenarioContext) {
  await this.pagesObjs?.billingAddressPage.selectBillingAddress();
});

When("add billing address", async function (this: ScenarioContext) {
  await this.pagesObjs?.billingAddressPage.addBillingAddress();
});
