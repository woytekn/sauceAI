const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

const username = 'standard_user';
const password = 'secret_sauce';

test.describe('Login tests', () => {
	test('Correct login', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.login(username, password);

		// Verify that the user has successfully logged in
		const url = await page.url();
		expect(url).toBe('https://www.saucedemo.com/inventory.html');
	});

	test('Incorrect login', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.login('invalid_username', 'invalid_password');

		// Verify that the error message is displayed
		const errorMessage = await loginPage.getErrorMessage();
		expect(errorMessage).toBe(
			'Epic sadface: Username and password do not match any user in this service'
		);
	});
});
