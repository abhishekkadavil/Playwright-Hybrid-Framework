import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("confirm order", async function (this: ScenarioContext) {
  await this.pagesObjs?.orderConfirmationPage.confirmOrder();
});

Then(
  "order should be placed successfully",
  async function (this: ScenarioContext) {
    await this.pagesObjs?.orderConfirmationPage.orderSuccessMsgAssertion();
  }
);
