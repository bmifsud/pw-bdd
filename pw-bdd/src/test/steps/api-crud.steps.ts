import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

let apiPayload: any;
let apiResponse: any;
let bookingId: number;

Given('I have a valid booking payload', function () {
    apiPayload = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-02"
        },
        "additionalneeds": "Breakfast"
    };
});

When('I send a POST request to create the booking', async function () {
    const context = pageFixture.page.request;
    const baseURL = process.env.MOCK_API === 'true' ? 'http://127.0.0.1:9090' : 'https://restful-booker.herokuapp.com';

    apiResponse = await context.post(`${baseURL}/booking`, {
        data: apiPayload,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
});

Then('I should receive a 200 OK status', function () {
    expect(apiResponse.status()).toBe(200);
});

Then('the response payload should contain the booking details', async function () {
    const body = await apiResponse.json();
    bookingId = body.bookingid;
    expect(bookingId).toBeDefined();
    expect(body.booking.firstname).toBe(apiPayload.firstname);
});
