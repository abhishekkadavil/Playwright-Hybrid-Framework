import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("select payment method", async function (this: ScenarioContext) {
  await this.pagesObjs?.paymentMethodPage.selectPaymentMethod();
});
