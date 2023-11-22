const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results/cucumber-report",
    reportPath: "test-results/custom-reports/",
    reportName: "E2E Automation Report",
    pageTitle: "Ecom E2E App test report",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "Abhishek Kadavil - PC",
        platform: {
            name: "Ubuntu",
            version: "22.04 LTS",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Ecom Application" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});