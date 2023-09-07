import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.password;
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test("successful making a transfer", async ({ page }) => {
    // Arrange
    const moneyReceiver = "john doe";
    const bankingAccount = "12 3456 7890 1234 5678 9011 23456";
    const amount = "123";
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${moneyReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);

    await paymentPage.transferLink.click();
    await paymentPage.transferReceiverInput.fill(moneyReceiver);
    await paymentPage.transferToInput.fill(bankingAccount);
    await paymentPage.transferAmountInput.fill(amount);
    await paymentPage.expressCheckbox.check();
    await paymentPage.transferBtn.click();
    await paymentPage.actionCloseBtn.click();
    // Assert
    await expect(paymentPage.messagetext).toHaveText(expectedMessage);
  });
});
