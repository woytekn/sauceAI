const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { ProductsPage } = require('./pages/ProductsPage');
const { CartPage } = require('./pages/CartPage');
const { CheckoutPage } = require('./pages/CheckoutPage');
const { ConfirmationPage } = require('./pages/ConfirmationPage');

test('Complete purchase order', async ({ page }) => {
	const loginPage = new LoginPage(page);
	const productsPage = new ProductsPage(page);
	const cartPage = new CartPage(page);
	const checkoutPage = new CheckoutPage(page);
	const confirmationPage = new ConfirmationPage(page);

	// Login
	await loginPage.login('standard_user', 'secret_sauce');

	// Filter and add cheapest product to cart
	await productsPage.selectSortingOption('Price (low to high)');
	await productsPage.addToCart(0);

	// Go to cart and checkout
	await cartPage.navigateToCart();
	await cartPage.clickCheckoutButton();

	// Fill out checkout form and complete purchase
	await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
	await checkoutPage.clickContinueButton();
	await checkoutPage.clickFinishButton();

	// Verify purchase completed successfully
	const confirmationMessage = await confirmationPage.getConfirmationMessage();
	expect(confirmationMessage).toContain('Thank you for your order!');
});
