class LoginPage {
  visit() {
    cy.visit("/");
    cy.get('input[name="username"]', { timeout: 20000 }).should("be.visible");
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

  login(username, password) {
    this.visit();
    this.enterUsername(username);
    this.enterPassword(password);
    this.checkRememberMe();
    this.submitLogin();
  }

  verifyHomePageLoaded() {
    // You can replace this with a more specific element on the home/dashboard page
    cy.url().should("include", "/home");
    // Or check for a known header, sidebar, or greeting message
    // cy.get('.dashboard-header').should('be.visible')
  }
}

export default new LoginPage();
