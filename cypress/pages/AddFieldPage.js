class AddFieldPage {
  clickAddFieldButton() {
    cy.frameLoaded("iframe");
    cy.iframe().contains("button", "Add a field").should("be.visible").click();
  }

  typeFieldName(name) {
    cy.iframe()
      .find('input[name="name"]')
      .should("be.visible")
      .clear()
      .type(name);
  }

  typeFieldLabel(label) {
    cy.iframe()
      .find('input[name="displayName"]')
      .should("be.visible")
      .clear()
      .type(label);
    cy.iframe().find('input[name="confidenceThreshold"]').click();
  }

  clickCreateButton() {
    cy.frameLoaded("iframe"); // Ensure iframe is ready

    cy.iframe().find('button[aria-label="Create"]').should("exist").click();
    cy.iframe()
      .find('button[aria-label="Create"]')
      .should("have.attr", "data-input-status", "DISABLED")
      .and("have.class", "command-button__button--is_disabled");
  }

  fillAndCreateField({ name, label }) {
    this.typeFieldName(name);
    this.typeFieldLabel(label);
    this.clickCreateButton();
  }

  verifyFieldCreated(name) {
    cy.get("div.toasttray").contains(name);
  }
}

export default new AddFieldPage();
