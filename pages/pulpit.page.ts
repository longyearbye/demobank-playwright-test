import { Page } from "@playwright/test";

export class PulpitPage {
  constructor(private page: Page) {}

  transferReceiverInput = this.page.locator("#widget_1_transfer_receiver");
  transferAmountInput = this.page.locator("#widget_1_transfer_amount");
  transferTitle = this.page.locator("#widget_1_transfer_title");
  transferButton = this.page.getByRole("button", { name: "wykonaj" });
  executeBtn = this.page.locator("#execute_btn");
  closeBtn = this.page.getByTestId("close-button");
  transferMessage = this.page.locator("#show_messages");

  topUpReceiver = this.page.locator("#widget_1_topup_receiver");
  topUpAmount = this.page.locator("#widget_1_topup_amount");
  topUpAgreement = this.page.locator("#widget_1_topup_agreement");
  topUpBtn = this.page.getByRole("button", { name: "doładuj telefon" });
  closeButton = this.page.getByTestId("close-button");
  messageAssert = this.page.locator("#show_messages");
  moneyValueAssert = this.page.locator("#money_value");
}
