// File: cypress/e2e/tests/createBot.cy.js

import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";

describe("Bot Creation Flow", () => {
  let testData;

  before(() => {
    // ✅ Load test data before tests
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // ✅ Login before each test to ensure isolated, stateless testing
    LoginPage.login(testData.username, testData.password);
    LoginPage.verifyHomePageLoaded();
  });

  it("should create a new bot and open the editor", () => {
    // ✅ Action: Open the modal
    HomePage.clickCreateBotButton();

    // ✅ Action: Fill the bot name
    HomePage.typeBotName(testData.messageTaskName);

    // ✅ Action: Submit the modal
    HomePage.clickCreateAndEditButton();

    // ✅ Assertion: Ensure the editor page has loaded
    HomePage.verifyEditPageOpened();
  });
});
