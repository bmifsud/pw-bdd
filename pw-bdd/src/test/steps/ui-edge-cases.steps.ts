import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

Given('the user navigates to the Dynamic ID page', async function () {
    await pageFixture.page.goto('http://uitestingplayground.com/dynamicid');
});

When('the user clicks the button with a dynamic ID', async function () {
    await pageFixture.page.click('button:has-text("Button with Dynamic ID")');
});

Then('the action should be registered successfully', async function () {
    await expect(pageFixture.page.locator('h3')).toHaveText('Dynamic ID');
});

Given('the user navigates to the Hidden Layers page', async function () {
    await pageFixture.page.goto('http://uitestingplayground.com/hiddenlayers');
});

When('the user attempts to double click the green button', async function () {
    await pageFixture.page.click('#greenButton');
});

Then('the action should be blocked by a hidden layer', async function () {
    try {
        await pageFixture.page.click('#greenButton', { timeout: 2000 });
        throw new Error('Button was expected to be unclickable, but it was clicked.');
    } catch (e: any) {
        expect(e.message).toContain('intercepts pointer events');
    }
});
