import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("checkout the cart", async function (this: ScenarioContext) {
  await this.pagesObjs?.checkoutPage.checkoutTheCart();
});
