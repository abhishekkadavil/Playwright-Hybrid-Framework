import { Page, expect } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class OrderConfirmationPage {
  private page: Page;
  private scenarioContext: ScenarioContext;

  constructor(page: Page, scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext = scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************

  confirm_order_next_step_btn = () =>
    this.page.locator(
      "//button[@class='button-1 confirm-order-next-step-button']"
    );
  order_completed_asrt = () =>
    this.page.locator(
      "//div[@class='section order-completed']/div[@class='title']"
    );

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async confirmOrder() {
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.confirm_order_next_step_btn()
    );
  }

  public async orderSuccessMsgAssertion() {
    await expect(this.order_completed_asrt()).toHaveText(
      "Your order has been successfully processed!"
    );
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
