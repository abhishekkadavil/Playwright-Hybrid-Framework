import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("add item to cart", async function (this: ScenarioContext) {
  await this.pagesObjs?.itemPage.addItemToCart();
});
