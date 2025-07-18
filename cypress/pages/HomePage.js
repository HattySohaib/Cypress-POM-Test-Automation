class HomePage {
  clickCreateBotButton() {
    cy.contains("button", "Create a bot").should("be.visible").click();
  }

  typeBotName(botName) {
    cy.get('input[name="name"]').should("be.visible").clear().type(botName);
  }

  clickCreateAndEditButton() {
    cy.get('button[name="submit"]').contains("Create & edit").click();
  }

  verifyEditPageOpened() {
    cy.get(".toast", { timeout: 10000 }) // Wait for toast to appear
      .should("be.visible")
      .and("contain.text", "successfully created");
  }
}

export default new HomePage();
