const report = require("multiple-cucumber-html-reporter");
import * as os from 'os';

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Cucumber BDD Automation Report",
    pageTitle: "E2E Test Report",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chromium",
            version: "latest",
        },
        device: "Local test machine",
        platform: {
            name: os.platform() === 'win32' ? 'windows' : os.platform() === 'darwin' ? 'osx' : 'linux',
            version: os.release(),
        },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "pw-bdd prototype" },
            { label: "Release", value: "1.0.0" },
            { label: "Execution Start Time", value: new Date().toISOString() }
        ],
    },
});
