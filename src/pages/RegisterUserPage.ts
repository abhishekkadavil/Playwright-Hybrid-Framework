import { Page, expect } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class RegisterUserPage {
  private page: Page;
  private scenarioContext: ScenarioContext

  constructor(page: Page,scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext=scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************

  register_btn = () =>
    this.page.locator(
      "//a[text()='Register']"
    );
    gender_btn = () =>
    this.page.locator(
      "//input[@id='gender-male']"
    );
    first_name_txtBx = () =>
    this.page.locator(
      "//input[@id='FirstName']"
    );
    last_name_txtBx = () =>
    this.page.locator(
      "//input[@id='LastName']"
    );
    DateOfBirthDay_sel = () =>
    this.page.locator(
      "//select[@name='DateOfBirthDay']"
    );
    DateOfBirthMonth_sel = () =>
    this.page.locator(
      "//select[@name='DateOfBirthMonth']"
    );
    DateOfBirthYear_sel = () =>
    this.page.locator(
      "//select[@name='DateOfBirthYear']"
    );
    email_txtBx = () =>
    this.page.locator(
      "//input[@id='Email']"
    );
    company_txtBx = () =>
    this.page.locator(
      "//input[@id='Company']"
    );
    password_txtBx = () =>
    this.page.locator(
      "//input[@id='Password']"
    );
    confirmPassword_txtBx = () =>
    this.page.locator(
      "//input[@id='ConfirmPassword']"
    );
    register_user_btn = () =>
    this.page.locator(
      "//button[@id='register-button']"
    );
    logout_btn = () =>
    this.page.locator(
      "//a[text()='Log out']"
    );
    reg_result = () =>
    this.page.locator(
      "//div[@class='result']"
    );

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async navigateToRegisterUerPage() {
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.register_btn()
    );
  }

  public async addPersonalDetails() {
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.gender_btn()
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.first_name_txtBx(),"Abhishek"
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.last_name_txtBx(),"Kadavil"
    );
    // await this.scenarioContext.pagesObjs?.interactionHelper.selectElementByLabel(
    //   this.DateOfBirthDay_sel(),"23"
    // );
    // await this.scenarioContext.pagesObjs?.interactionHelper.selectElementByLabel(
    //   this.DateOfBirthMonth_sel(),"June"
    // );
    // await this.scenarioContext.pagesObjs?.interactionHelper.selectElementByLabel(
    //   this.DateOfBirthMonth_sel(),"1993"
    // );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.email_txtBx(),this.scenarioContext.testData.loginCredential.username
    );
  }

  public async addCompanyDetails() {
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.company_txtBx(),"Qb"
    );
  }

  public async addPassword() {
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.password_txtBx(),this.scenarioContext.testData.loginCredential.password
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
      this.confirmPassword_txtBx(),this.scenarioContext.testData.loginCredential.password
    );
  }

  public async registrationCompleteMsg() {
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.register_user_btn()
    );
    await expect(this.reg_result()).toHaveText("Your registration completed");
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.logout_btn()
    );
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
