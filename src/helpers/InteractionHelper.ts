import { Page } from "playwright";
import { join } from "path";
import test, { Locator } from "@playwright/test";
import { fixture } from "../utils/pageFixture";
import { ScenarioContext } from "@utils/scenarioContext";

export class InteractionHelper {
  private page: Page;
  private scenarioContext: ScenarioContext;

  constructor(page: Page, scenarioContext: ScenarioContext) {
    this.page = page;
    this.scenarioContext = scenarioContext;
  }

  public async addScreenshotToReport(screenShotName: string | undefined) {
    const img = await this.page?.screenshot({
      path: join(process.env.SCREENSHOT as string, `${screenShotName}.png`),
    });
    await this.scenarioContext.attach(img!, "image/png");
  }

  public async addTextToReport(reporterInput: string) {
    this.scenarioContext.attach(`${reporterInput}`, "text/plain;charset=UTF-8");
  }

  public async typeElementFill(locator: Locator, input: string) {
    try {
      fixture.logger.info(`typeElement ${locator}`);
      await locator.fill(input);
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`typeElement ${locator}`);
    }
  }

  public async typeElementOneByOne(locator: Locator, input: string) {
    try {
      fixture.logger.info(`typeElementOneByOne ${locator}`);
      await locator.pressSequentially(input);
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`typeElementOneByOne ${locator}`);
    }
  }

  public async keyboardKeyPress(locator: Locator, input: string) {
    try {
      fixture.logger.info(`keyboardKeyPress ${locator}`);
      await locator.press(input);
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`keyboardKeyPress ${locator}`);
    }
  }

  public async clickElement(locator: Locator) {
    try {
      fixture.logger.info(`clickElement ${locator}`);
      await locator.click();
    } catch (error) {
      // fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`clickElement ${locator}`);
    }
  }

  public async forceClickElement(locator: Locator) {
    try {
      fixture.logger.info(`clickElement ${locator}`);
      await locator.click({ force: true });
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`clickElement ${locator}`);
    }
  }

  public async doubleClickElement(locator: Locator) {
    try {
      fixture.logger.info(`doubleClickElement ${locator}`);
      await locator.dblclick();
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`doubleClickElement ${locator}`);
    }
  }

  public async rightClickElement(locator: Locator) {
    try {
      fixture.logger.info(`rightClickElement ${locator}`);
      await locator.click({ button: 'right' });
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`rightClickElement ${locator}`);
    }
  }

  public async pressKeyboardKeyPlusClick(locator: Locator, keyboardKey?: "Alt"|"Control"|"Meta"|"Shift") {
    try {
      fixture.logger.info(`keyboardKeyPlusClick ${locator}`);
      await locator.click({ modifiers: [`${keyboardKey!}`] });
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`keyboardKeyPlusClick ${locator}`);
    }
  }

  public async clickOnSpecificLocation(locator: Locator, x: number, y:number) {
    try {
      fixture.logger.info(`clickOnSpecificLocation ${locator}`);
      await locator.click({ position: { x: x, y: y } });
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`clickOnSpecificLocation ${locator}`);
    }
  }

  public async selectElementByValue(locator: Locator, value: string) {
    try {
      fixture.logger.info(`selectElementByValue ${locator}`);
      await locator.selectOption(`${value}`);
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`selectElementByValue ${locator}`);
    }
  }

  public async selectElementByLabel(locator: Locator, label: string) {
    try {
      fixture.logger.info(`selectElementByLabel ${locator}`);
      await locator.selectOption(`${label}`);
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`selectElementByLabel ${locator}`);
    }
  }

  public async selectMultipleItems(locator: Locator, items: string[]) {
    try {
      fixture.logger.info(`selectMultipleItems ${locator}`);
      await locator.selectOption(`${items}`);
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`selectMultipleItems ${locator}`);
    }
  }

  public async hoverElement(locator: Locator) {
    try {
      fixture.logger.info(`hoverElement ${locator}`);
      await locator.hover();
    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`hoverElement ${locator}`);
    }
  }

  public async focusElement(locator: Locator) {
    try {
      fixture.logger.info(`focusElement ${locator}`);
      await locator.focus();

    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`focusElement ${locator}`);
    }
  }

  public async uploadFile(locator: Locator, filePath: string) {
    try {
      fixture.logger.info(`uploadFile ${locator}`);
      await locator.setInputFiles(filePath);

    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`uploadFile ${locator}`);
    }
  }

  public async uploadFiles(locator: Locator, filesPath: string[]) {
    try {
      fixture.logger.info(`uploadFiles ${locator}`);
      await locator.setInputFiles(filesPath);

    } catch (error) {
      fixture.logger.error( `***** Error Occured ***** ${error}`);
      fixture.logger.error(`uploadFiles ${locator}`);
    }
  }
}
