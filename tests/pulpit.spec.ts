import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.password;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test("make a transfer with correct data", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "120";
    const transferTitle = "zwrot";
    const transferReceiver = "Chuck Demobankowy";

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiverInput.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.executeBtn.click();
    await pulpitPage.closeBtn.click();

    // Assert
    await expect(pulpitPage.transferMessage).toHaveText(
      `Przelew wykonany! ${transferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });
  test("successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpReceiver = "503 xxx xxx";
    const topUpAmount = "50";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReceiver.selectOption(topUpReceiver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.topUpBtn.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.messageAssert).toHaveText(expectedMessage);
  });
  test.only("correct balance after successful mobile top-up", async ({
    page,
  }) => {
    // Arrange
    const topUpReceiver = "503 xxx xxx";
    const topUpAmount = "50";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReceiver.selectOption(topUpReceiver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.topUpBtn.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.moneyValueAssert).toHaveText(`${expectedBalance}`);
  });
});

// skróty klawiszowe:
// alt + shift + "strzałka w dół" - duplikowanie linii
