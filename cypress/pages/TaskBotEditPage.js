class TaskbotEditPage {
  searchForMessageBox() {
    cy.waitForLoadableToFinish();

    cy.get(".editor-palette-search__input")
      .should("be.visible")
      .clear()
      .type("message box");
  }

  selectMessageBoxOption() {
    cy.get('button[name="item-button"]')
      .contains("Message box")
      .should("be.visible")
      .click();
  }

  typeMessageToDisplay(message) {
    cy.get('div[name="content"][contenteditable="true"]')
      .should("exist")
      .click()
      .type(message);
  }

  clickSave() {
    cy.get('button[name="save"]').should("be.visible").click();
    cy.get('button[name="save"]')
      .should("have.attr", "data-input-status", "DISABLED")
      .and("have.class", "command-button__button--is_disabled");
  }

  clickClose() {
    cy.contains("button", "Close").should("be.visible").click();
  }

  verifyRedirectToBotRepo() {
    cy.url().should("include", "/bots/repository");
  }
}

export default new TaskbotEditPage();
