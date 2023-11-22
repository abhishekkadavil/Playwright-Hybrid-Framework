import { Page } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class CheckoutPage {
  private page: Page;
  private scenarioContext: ScenarioContext;

  constructor(page: Page, scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext = scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************

  checkout_notification_bar = () =>
    this.page.locator(
      "//div[@id='bar-notification']//span"
    );
    shopping_cart_btn = () =>
    this.page.locator(
      "//a[@class='ico-cart']"
    );
    termsofservice_chkBx = () =>
    this.page.locator(
      "//input[@id='termsofservice']"
    );
    checkout_btn = () =>
    this.page.locator(
      "//button[@id='checkout']"
    );

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async checkoutTheCart() {
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.checkout_notification_bar()
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.shopping_cart_btn()
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.termsofservice_chkBx()
    );
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.checkout_btn()
    );
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
