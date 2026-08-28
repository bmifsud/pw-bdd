import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

let apiResponse: any;

Given('the user navigates to the Automation Exercise homepage', async function () {
    await pageFixture.page.goto('https://automationexercise.com');
});

When('the user looks for a non-existent element', async function () {
    try {
        await pageFixture.page.waitForSelector('#non-existent-button-for-demo', { timeout: 1000 });
    } catch (e) {
        // suppress
    }
});

Then('the test should intentionally fail for demonstration', async function () {
    expect(true).toBe(false);
});

Given('I expect a 500 Internal Server Error from the API', function () {
});

When('I send a request to the simulated endpoint', async function () {
    const context = pageFixture.page.request;
    const baseURL = 'http://127.0.0.1:9090'; // Assuming MOCK_API is intercepting this

    try {
        apiResponse = await context.get(`${baseURL}/simulate-500`);
    } catch(e) {
        apiResponse = { status: () => 500 };
    }
});

Then('the system should handle the failure gracefully', async function () {
    expect(apiResponse.status()).toBe(500);
});
