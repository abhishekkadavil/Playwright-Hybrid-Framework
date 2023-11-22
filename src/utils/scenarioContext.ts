import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { AllPageObjects } from '../helpers/AllPageObjects';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';
// import DataReader from './dataReader';

// export interface CucumberWorldConstructorParams {
//   parameters: { [key: string]: string };
// }

export interface ScenarioContext extends World {

  // used to specify browser configurations like viewport, recordVideo, screenshot, acceptDownloads..etc
  context?: BrowserContext;

  // used like driver in selenium
  page?: Page;

  testName?: string;

  // Test data
  testData: any;

  // Page objects
  pagesObjs?: AllPageObjects;
}

export class IWorld extends World implements ScenarioContext {
  constructor(options: any) {
    super(options);
  }
  testData: any;
}

setWorldConstructor(IWorld);