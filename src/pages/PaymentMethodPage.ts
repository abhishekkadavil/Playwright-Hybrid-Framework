import { Page } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class PaymentMethodPage {
  private page: Page;
  private scenarioContext: ScenarioContext;

  constructor(page: Page, scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext = scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************

  paymentMethod_check_btn = () =>
    this.page.locator("//input[@id='paymentmethod_0']");
  paymentMethod_save_btn = () =>
    this.page.locator(
      "//div[@id='payment-method-buttons-container']/button[@name='save']"
    );
  payment_info_next_btn = () =>
    this.page.locator(
      "//div[@id='payment-info-buttons-container']/button[@class='button-1 payment-info-next-step-button']"
    );
  paymentMethod_card_btn = () =>
    this.page.locator("//input[@id='paymentmethod_1']");
  cardHolderName_txtBx = () =>
    this.page.locator("//input[@id='CardholderName']");
  cardNumber_txtBx = () => this.page.locator("//input[@id='CardNumber']");
  cardExpiryDate_year_sel = () =>
    this.page.locator("//select[@id='ExpireYear']");
  cardCode_txtBx = () => this.page.locator("//input[@id='CardCode']");

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async selectPaymentMethod() {
    if (this.scenarioContext.testData.payment.pmtType) {
      await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
        this.paymentMethod_check_btn()
      );
      await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
        this.paymentMethod_save_btn()
      );
      await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
        this.payment_info_next_btn()
      );
    } else {
      await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
        this.paymentMethod_card_btn()
      );
      await this.scenarioContext.pagesObjs?.interactionHelper.typeElementOneByOne(
        this.cardHolderName_txtBx(),
        "gsadsad Kadavil"
      );
      await this.scenarioContext.pagesObjs?.interactionHelper.typeElementOneByOne(
        this.cardNumber_txtBx(),
        "4001919257537193"
      );

      await this.scenarioContext.pagesObjs?.interactionHelper.selectElementByLabel(
        this.cardExpiryDate_year_sel(),
        ""
      );

      await this.scenarioContext.pagesObjs?.interactionHelper.typeElementOneByOne(
        this.cardCode_txtBx(),
        "123"
      );
      await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
        this.payment_info_next_btn()
      );
    }
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
