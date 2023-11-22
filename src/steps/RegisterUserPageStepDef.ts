import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "@utils/scenarioContext";

When("navigate to register user page", async function (this: ScenarioContext) {
  await this.pagesObjs?.registerUserPage.navigateToRegisterUerPage();
});

Then("add personal details", async function (this: ScenarioContext) {
  await this.pagesObjs?.registerUserPage.addPersonalDetails();
});

Then("add company details", async function (this: ScenarioContext) {
  await this.pagesObjs?.registerUserPage.addCompanyDetails();
});

Then("add options", async function (this: ScenarioContext) {});

Then("add password", async function (this: ScenarioContext) {
  await this.pagesObjs?.registerUserPage.addPassword();
});

Then(
  "user should be able register successfully",
  async function (this: ScenarioContext) {
    await this.pagesObjs?.registerUserPage.registrationCompleteMsg();
  }
);
