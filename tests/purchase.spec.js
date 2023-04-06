const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { ProductsPage } = require('./pages/ProductsPage');
const { CartPage } = require('./pages/CartPage');
const { CheckoutPage } = require('./pages/CheckoutPage');
const { ConfirmationPage } = require('./pages/ConfirmationPage');

test.describe('Complete purchase order', () => {
	let loginPage;
	let productsPage;
	let cartPage;
	let checkoutPage;
	let confirmationPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		productsPage = new ProductsPage(page);
		cartPage = new CartPage(page);
		checkoutPage = new CheckoutPage(page);
		confirmationPage = new ConfirmationPage(page);

		// Login
		await loginPage.login('standard_user', 'secret_sauce');

		// Filter and add cheapest product to cart
		await productsPage.selectSortingOption('Price (low to high)');
		await productsPage.addToCart(0);

		// Go to cart and checkout
		await cartPage.navigateToCart();
		await cartPage.clickCheckoutButton();
	});

	test('Fill out checkout form and complete purchase', async () => {
		// Fill out checkout form and complete purchase
		await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
		await checkoutPage.clickContinueButton();
		await checkoutPage.clickFinishButton();

		// Verify purchase completed successfully
		const confirmationMessage = await confirmationPage.getConfirmationMessage();
		expect(confirmationMessage).toContain('Thank you for your order!');
	});

	test('Error message is shown when user does not enter checkout information', async () => {
		// Submit checkout form without filling in information
		await checkoutPage.clickContinueButton();

		// Assert error message for first name is displayed
		const errorMessage = await checkoutPage.getErrorMessage();
		expect(errorMessage).toBeTruthy();
	});
});
