import LoginPage from "../../pages/LoginPage";

describe("Login Test", () => {
  it("should log in and load the home page", () => {
    cy.fixture("testData").then((data) => {
      LoginPage.login(data.username, data.password);
      LoginPage.verifyHomePageLoaded();
    });
  });
});
