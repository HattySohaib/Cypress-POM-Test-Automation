class LoginPage {
  visit() {
    cy.visit("/");
    cy.get('input[name="username"]').should("be.visible");
  }

  enterUsername(username) {
    cy.get('input[name="username"]').clear().type(username);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  checkRememberMe() {
    cy.get('input[name="rememberUsername"]').check({ force: true });
  }

  submitLogin() {
    cy.get('button[name="submitLogin"]').should("be.visible").click();
  }

  verifyHomePageLoaded() {
    cy.url().should("not.include", "/login");
    cy.get(".homepage-welcome").should("be.visible");
  }
}

export default new LoginPage();
