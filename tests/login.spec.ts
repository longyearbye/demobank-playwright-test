import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("successful login to demobank page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("login with correct credentials", async ({ page }) => {
    // Arrange
    const userLogin = loginData.userLogin;
    const userPassword = loginData.password;
    const expectedUser = "Jan Demobankowy";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedUser);
  });

  test("login with incorrect credentials with too short username", async ({
    page,
  }) => {
    // Arrange
    const shortLogin = "goodman";
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.shortLoginInput.fill(shortLogin);
    await loginPage.passwordInput.click();
    await loginPage.errorLoginMessage.click();

    await expect(loginPage.errorLoginMessage).toHaveText(expectedErrorMessage);
  });

  test("login with incorrect credentials with too short password", async ({
    page,
  }) => {
    // Arrange
    const userLogin = loginData.userLogin;
    const expectedErrorPasswordMessage = "hasło ma min. 8 znaków";
    const incorrectPassword = "call";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(
      expectedErrorPasswordMessage
    );
  });
});
