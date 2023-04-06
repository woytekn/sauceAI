class ProductsPage {
	constructor(page) {
		this.page = page;
		this.productList = this.page.locator('.inventory_list');
		this.sortDropdown = this.page.locator('.product_sort_container');
		this.cartBadge = this.page.locator('.shopping_cart_badge');
	}

	async selectSortingOption(option) {
		await this.sortDropdown.selectOption(option);
	}

	async getNthProduct(index) {
		const products = await this.page.$$('.inventory_item');
		return products[index];
	}

	async getCartBadgeCount() {
		return await this.cartBadge.innerText();
	}

	async addToCart(productIndex) {
		const product = await this.getNthProduct(productIndex);
		const addToCartButton = await product.$('.btn_inventory');
		await addToCartButton.click();
	}
}

module.exports = { ProductsPage };
