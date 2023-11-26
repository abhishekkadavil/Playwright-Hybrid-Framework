import { Page, expect } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class LoginPage {
  private page: Page;
  private scenarioContext: ScenarioContext;

  constructor(page: Page, scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext = scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************

  //   profile menu
  username_txtbx = () => this.page.locator("//input[@id='Email']");
  password_txtbx = () => this.page.locator("//input[@id='Password']");
  login_btn = () => this.page.locator("//button[text()='Log in']");
  logout_btn = () => this.page.locator("//a[@class='ico-logout']");
  login_error_msg = () =>
    this.page.locator(
      "//div[@class='message-error validation-summary-errors']"
    );

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async loginUsingTheCredentials(username: string, password: string) {
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.username_txtbx(),
      username
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.password_txtbx(),
      password
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(this.login_btn());
  }

  public async userShouldBeAbleToLoginSuccessfully() {
    await expect(this.logout_btn()).toHaveText("Log out");
  }

  public async invalidUserErrorShouldAppear() {
    await expect(this.login_error_msg()).toHaveText(
      "Login was unsuccessful. Please correct the errors and try again.No customer account found"
    );
  }

  public async specificUserErrorShouldAppear(errorMessage: string) {
    await expect(this.login_error_msg()).toHaveText(errorMessage);
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
