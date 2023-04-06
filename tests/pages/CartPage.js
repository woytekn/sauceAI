class CartPage {
    constructor(page) {
      this.page = page;
      this.cartList = this.page.locator('.cart_list');
      this.checkoutButton = this.page.locator('[data-test=checkout]');
      this.continueButton = this.page.locator('[data-test=continue]');
    }
  
    async navigateToCart() {
      await this.page.goto('https://www.saucedemo.com/cart.html');
    }
  
    async clickCheckoutButton() {
      await this.checkoutButton.click();
    }
  
    async getCartItemText(index) {
      const items = await this.cartList.$$('[class="cart_item"]');
      return await items[index].innerText();
    }
  
    async clickRemoveButton(index) {
      const items = await this.cartList.$$('[class="cart_item"]');
      const removeButton = await items[index].$('button');
      await removeButton.click();
    }
  
    async clickContinueShoppingButton() {
      const continueShoppingButton = this.page.locator('[data-test=continue-shopping]');
      await continueShoppingButton.click();
    }
  }
  
  module.exports = { CartPage };