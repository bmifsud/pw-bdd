import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { server } from "../test/mock/server";
import { logBugToJira } from "../utils/jiraService";
import { logger } from "../utils/logger";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    if (process.env.MOCK_API === 'true') {
        logger.info("Starting MSW Server...");
        server.listen({ onUnhandledRequest: 'bypass' });
    }
    browser = await chromium.launch({ headless: true });
});

Before(async function ({ pickle }) {
    logger.info(`Starting scenario: ${pickle.name}`);
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        logger.error(`Scenario failed: ${pickle.name}`);
        const screenshot = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });

        await this.attach(screenshot, "image/png");

        const errorMessage = result.message || "Unknown error";
        const base64Screenshot = screenshot.toString('base64');
        await logBugToJira(pickle.name, errorMessage, base64Screenshot);
    }
    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
    if (process.env.MOCK_API === 'true') {
        logger.info("Stopping MSW Server...");
        server.close();
    }
});
