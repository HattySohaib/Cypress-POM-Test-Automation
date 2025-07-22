Cypress.Commands.add("waitForLoadableToFinish", () => {
  cy.get(".loadable__overlay", { timeout: 25000 }).should("not.exist");
  cy.get('[data-path="Loadable"]', { timeout: 15000 })
    .should("have.attr", "data-loadable-loading", "false")
    .and("have.attr", "data-loadable-ready", "true");
});

Cypress.Commands.add("switchToIframe", (iframeSelector) => {
  return cy.get(iframeSelector).then(($iframe) => {
    const body = $iframe.contents().find("body");
    cy.wrap(body).should("exist");
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get('input[name="username"]').should("be.visible").clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('input[name="rememberUsername"]').check({ force: true });
  cy.get('button[name="submitLogin"]').should("be.visible").click();

  // Verify login success
  cy.url().should("not.include", "/login");
  cy.get(".homepage-welcome").should("be.visible");
});

Cypress.Commands.add("logout", () => {
  // Open profile tray
  cy.get('button[name="mysettings"]').should("be.visible").click();

  // Wait for tray and click logout
  cy.get(".poppy__content")
    .should("be.visible")
    .contains("button", "Log out")
    .should("be.visible")
    .click();

  // Verify logout by checking for login page
  cy.get('input[name="username"]').should("be.visible");
});
