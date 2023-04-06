class CheckoutPage {
	constructor(page) {
		this.page = page;
		this.firstNameInput = this.page.locator('[data-test="firstName"]');
		this.lastNameInput = this.page.locator('[data-test="lastName"]');
		this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
		this.continueButton = this.page.locator('.cart_button');
		this.finishButton = this.page.locator('.cart_button');
	}

	async getErrorMessage() {
		await this.page.waitForSelector('h3[data-test="error"]');
		const errorHeader = await this.page.$('h3[data-test="error"]');
		const errorHeaderText = await errorHeader.innerText();
		if (errorHeaderText.includes('Error: First Name is required')) {
			return true;
		} else {
			return false;
		}
	}

	async fillCheckoutForm(firstName, lastName, postalCode) {
		await this.firstNameInput.type(firstName);
		await this.lastNameInput.type(lastName);
		await this.postalCodeInput.type(postalCode);
	}

	async clickContinueButton() {
		await this.continueButton.click();
	}

	async clickFinishButton() {
		await this.finishButton.click();
	}
}

module.exports = { CheckoutPage };
