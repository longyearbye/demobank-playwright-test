import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId("login-input");
  passwordInput = this.page.getByTestId("password-input");
  loginButton = this.page.getByTestId("login-button");

  // await page.getByTestId("login-input").fill(userLogin);
  loginError = this.page.getByTestId("user-name");
  passwordError = this.page.getByTestId("error-login-password");

  shortLoginInput = this.page.getByTestId("login-input");
  errorLoginMessage = this.page.getByTestId("error-login-id");
}
