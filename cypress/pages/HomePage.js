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
    // Check for error message
    cy.get(".message--theme_error", { timeout: 10000 }).then((errorMessage) => {
      if (errorMessage.length > 0) {
        const errorText = errorMessage.text();
        if (
          errorText.includes("Unable to create a file or folder with the name")
        ) {
          cy.wrap(null).then(() => {
            throw new Error(
              "Bot creation failed: A file or folder with the same name already exists."
            );
          });
        } else {
          cy.wrap(null).then(() => {
            throw new Error(`Bot creation failed: ${errorText}`);
          });
        }
      }
    });

    // Check for success toast
    cy.get(".toast", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "successfully created");
  }
}

export default new HomePage();
