import { Page } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class BillingAddressPage {
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
  billing_address_save_btn = () =>
    this.page.locator(
      "//div[@id='billing-buttons-container']/button[@name='save']"
    );
  billing_address_country_sel = () =>
    this.page.locator("//select[@id='BillingNewAddress_CountryId']");
  billing_address_state_sel = () =>
    this.page.locator("//select[@id='BillingNewAddress_StateProvinceId']");
  billing_address_city_txtbx = () =>
    this.page.locator("//input[@id='BillingNewAddress_City']");
  billing_address_address1_txtbx = () =>
    this.page.locator("//input[@id='BillingNewAddress_Address1']");
  billing_address_pincode_txtbx = () =>
    this.page.locator("//input[@id='BillingNewAddress_ZipPostalCode']");
  billing_address_phoneno_txtbx = () =>
    this.page.locator("//input[@id='BillingNewAddress_PhoneNumber']");

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async selectBillingAddress() {
    await this.billing_address_save_btn().click();
  }

  public async addBillingAddress() {
    await this.scenarioContext.pagesObjs?.interactionHelper.selectElementByLabel(
      this.billing_address_country_sel(),
      "India"
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.selectElementByLabel(
      this.billing_address_state_sel(),
      "Kerala"
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementOneByOne(
      this.billing_address_city_txtbx(),
      "Therissuer"
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementOneByOne(
      this.billing_address_address1_txtbx(),
      "Kadaveeil House, Palakakal"
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementOneByOne(
      this.billing_address_pincode_txtbx(),
      "680027"
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.typeElementOneByOne(
      this.billing_address_phoneno_txtbx(),
      "09946266914"
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.billing_address_save_btn()
    );
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
