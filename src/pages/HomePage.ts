import { Page } from "@playwright/test";
import { ScenarioContext } from "@utils/scenarioContext";

export default class HomePage {
  private page: Page;
  private scenarioContext: ScenarioContext

  constructor(page: Page,scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext=scenarioContext;
  }

  //   *****************************************************
  //                        Locators
  //   *****************************************************


  //   *****************************************************
  //                        Actions
  //   *****************************************************

  //   *****************************************************
  //                       Sections
  //   *****************************************************

}
