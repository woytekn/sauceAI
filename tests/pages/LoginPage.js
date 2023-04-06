class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = this.page.locator('#user-name');
      this.passwordInput = this.page.locator('#password');
      this.loginButton = this.page.locator('#login-button');
      this.errorMessage = this.page.locator('h3[data-test="error"]');
    }
  
    async navigate() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    async enterUsername(username) {
      await this.usernameInput.fill(username);
    }
  
    async enterPassword(password) {
      await this.passwordInput.fill(password);
    }
  
    async clickLoginButton() {
      await this.loginButton.click();
    }
  
    async login(username, password) {
      await this.navigate();
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
    }
  
    async getErrorMessage() {
      await this.errorMessage.waitFor();
      return await this.errorMessage.textContent();
    }
  }
  
  module.exports = { LoginPage };