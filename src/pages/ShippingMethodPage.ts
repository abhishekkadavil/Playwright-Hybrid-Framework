import { Page } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class ShippingMethodPage {
  private page: Page;
  private scenarioContext: ScenarioContext

  constructor(page: Page,scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext=scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************

  shipping_method_next_step_btn_btn = () =>
    this.page.locator(
      "//div[@id='shipping-method-buttons-container']/button[@class='button-1 shipping-method-next-step-button']"
    );

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async selectShippingMethod() {
    await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
      this.shipping_method_next_step_btn_btn()
    );
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
