import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("login using the credentials", async function (this: ScenarioContext) {
  await this.page?.goto("/login?returnUrl=%2F");
  await this.pagesObjs?.loginPage.loginUsingTheCredentials(
    this.testData.loginCredential.username,
    this.testData.loginCredential.password
  );
});

Then(
  "user should be able to login successfully",
  async function (this: ScenarioContext) {await this.pagesObjs?.loginPage.userShouldBeAbleToLoginSuccessfully()}
);

Then(
  "invalid user error should appear",
  async function (this: ScenarioContext) {await this.pagesObjs?.loginPage.invalidUserErrorShouldAppear()}
);

Then(
  "{string} message should appear",
  async function (this: ScenarioContext, errorMessage: string) {
    await this.pagesObjs?.loginPage.specificUserErrorShouldAppear(errorMessage);
  }
);
