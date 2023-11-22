import { Page } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class ItemPage {
  private page: Page;
  private scenarioContext: ScenarioContext;

  constructor(page: Page, scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext = scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************

  item_quantity_txtbx = () =>
    this.page.locator("//input[@aria-label='Enter a quantity']");
  add_to_cart_btn = () =>
    this.page.locator("//button[@class='button-1 add-to-cart-button']");

  //   *****************************************************
  //                        Actions
  //   *****************************************************

  public async addItemToCart() {
    for (var item of this.scenarioContext.testData.items) {
      await this.page.goto(item.url);
      await this.scenarioContext.pagesObjs?.interactionHelper.typeElementFill(
        this.item_quantity_txtbx(),
        item
      );
      await this.scenarioContext.pagesObjs?.interactionHelper.clickElement(
        this.add_to_cart_btn()
      );
    }
  }

  //   *****************************************************
  //                       Sections
  //   *****************************************************
}
