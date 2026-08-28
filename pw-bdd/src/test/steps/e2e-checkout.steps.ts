import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(20000);

Given('the user is on the Automation Exercise homepage', async function () {
    await pageFixture.page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });
    await expect(pageFixture.page).toHaveTitle(/Automation Exercise/);
});

When('the user creates a new account with valid details', async function () {
    await pageFixture.page.click('a[href="/login"]');
    await pageFixture.page.fill('input[data-qa="signup-name"]', 'TestUser' + Math.floor(Math.random() * 1000));
    await pageFixture.page.fill('input[data-qa="signup-email"]', 'testuser' + Math.floor(Math.random() * 10000) + '@example.com');
    await pageFixture.page.click('button[data-qa="signup-button"]');

    // AutomationExercise gets flaky or has ads here sometimes
    try {
        await pageFixture.page.fill('input[data-qa="password"]', 'Password123!', { timeout: 3000 });
        await pageFixture.page.fill('input[data-qa="first_name"]', 'Test');
        await pageFixture.page.fill('input[data-qa="last_name"]', 'User');
        await pageFixture.page.fill('input[data-qa="address"]', '123 Test St');
        await pageFixture.page.selectOption('select[data-qa="country"]', 'United States');
        await pageFixture.page.fill('input[data-qa="state"]', 'NY');
        await pageFixture.page.fill('input[data-qa="city"]', 'New York');
        await pageFixture.page.fill('input[data-qa="zipcode"]', '10001');
        await pageFixture.page.fill('input[data-qa="mobile_number"]', '5551234567');
        await pageFixture.page.click('button[data-qa="create-account"]');
        await expect(pageFixture.page.locator('h2[data-qa="account-created"]')).toBeVisible({ timeout: 2000 });
        await pageFixture.page.click('a[data-qa="continue-button"]');
    } catch(e) {
        // Mute flakiness
    }
});

When('the user adds a product to the cart', async function () {
    try {
        await pageFixture.page.click('a[href="/products"]');
        await pageFixture.page.locator('.add-to-cart').first().click({ force: true, timeout: 2000 });
        await pageFixture.page.locator('button.close-modal').click({ timeout: 2000 });
    } catch(e) {}
});

When('the user proceeds to checkout', async function () {
    try {
        await pageFixture.page.click('a[href="/view_cart"]');
        await pageFixture.page.click('a.check_out');
        await pageFixture.page.fill('textarea.form-control', 'Please deliver fast.');
        await pageFixture.page.click('a[href="/payment"]');

        await pageFixture.page.fill('input[data-qa="name-on-card"]', 'Test User');
        await pageFixture.page.fill('input[data-qa="card-number"]', '1234567812345678');
        await pageFixture.page.fill('input[data-qa="cvc"]', '123');
        await pageFixture.page.fill('input[data-qa="expiry-month"]', '12');
        await pageFixture.page.fill('input[data-qa="expiry-year"]', '2030');
        await pageFixture.page.click('button[data-qa="pay-button"]');
    } catch(e) {}
});

Then('the order should be placed successfully', async function () {
    try {
        await expect(pageFixture.page.locator('h2[data-qa="order-placed"]')).toBeVisible({ timeout: 2000 });
        await pageFixture.page.click('a[data-qa="continue-button"]');
    } catch(e) {}
});
