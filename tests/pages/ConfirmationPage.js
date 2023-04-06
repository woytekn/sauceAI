class ConfirmationPage {
	constructor(page) {
		this.page = page;
		this.productName = this.page.locator('.inventory_item_name');
		this.finishButton = this.page.locator('#finish');
		this.confirmationMessage = this.page.locator('.complete-header');
	}

	async getProductName() {
		return await this.productName.innerText();
	}

	async clickFinishButton() {
		await this.finishButton.click();
	}

	async isConfirmationTextDisplayed() {
		return await this.confirmationText.isVisible();
	}

	async getConfirmationMessage() {
		return await this.confirmationMessage.innerText();
	}
}

module.exports = { ConfirmationPage };
