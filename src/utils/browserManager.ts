import { chromium, firefox, webkit } from "@playwright/test";

const commonBrowserOptions = {
  args: ["--start-maximized"],
};
export const invokeBrowser = () => {
  const browserType = process.env.npm_config_browsertype || process.env.BROWSER;
  switch (browserType) {
    case "chrome":
      return chromium.launch({
        headless: process.env.HEADLESS == "true" ? true : false,
        timeout: Number(process.env.TIMEOUT),
        tracesDir: process.env.TRACE_DIR,
        slowMo: Number(process.env.SLOW_MO),
        ...commonBrowserOptions,
      });
    case "firefox":
      return firefox.launch({
        headless: process.env.HEADLESS == "true" ? true : false,
        timeout: Number(process.env.TIMEOUT),
        tracesDir: process.env.TRACE_DIR,
        slowMo: Number(process.env.SLOW_MO),
        ...commonBrowserOptions,
        firefoxUserPrefs: {
          "media.navigator.streams.fake": true,
          "media.navigator.permission.disabled": true,
        },
      });
    case "webkit":
      return webkit.launch({
        headless: process.env.HEADLESS == "true" ? true : false,
        timeout: Number(process.env.TIMEOUT),
        tracesDir: process.env.TRACE_DIR,
        slowMo: Number(process.env.SLOW_MO),
        ...commonBrowserOptions,
      });
    default:
      throw new Error("Please set the proper browser or browser!");
  }
};
