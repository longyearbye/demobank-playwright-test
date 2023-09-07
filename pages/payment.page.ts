import { Page } from "@playwright/test";

export class PaymentPage {
  constructor(private page: Page) {}
  transferLink = this.page.getByRole("link", { name: "płatności" });
  transferReceiverInput = this.page.getByTestId("transfer_receiver");
  transferToInput = this.page.getByTestId("form_account_to");
  transferAmountInput = this.page.getByTestId("form_amount");
  expressCheckbox = this.page.getByLabel("ekspresowy");
  transferBtn = this.page.getByRole("button", { name: "wykonaj przelew" });
  actionCloseBtn = this.page.getByTestId("close-button");
  messagetext = this.page.locator("#show_messages");
}
