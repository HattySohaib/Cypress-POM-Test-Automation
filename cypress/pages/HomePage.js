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

  expandAIMenu() {
    cy.contains("button", "AI").should("be.visible").click();
  }

  clickDocumentAutomation() {
    cy.contains("a", "Document Automation").should("be.visible").click();
  }

  verifyLearningInstancesPageLoaded() {
    cy.url({ timeout: 10000 }).should("include", "/learning-instances");
  }

  verifyEditPageOpened() {
    cy.get(".toast", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "successfully created");
  }
}

export default new HomePage();
