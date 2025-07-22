// File: cypress/e2e/tests/createBot.cy.js

import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import TaskbotEditPage from "../../pages/TaskBotEditPage";

describe("Bot Creation Flow", () => {
  let testData;

  before(() => {
    // ✅ Load test data before tests
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // ✅ Login before each test using custom command
    cy.login(testData.username, testData.password);
    LoginPage.verifyHomePageLoaded();
  });

  it("should create a new bot, configure message box, and return to bot repo", () => {
    // ✅ Step 1: Create bot from homepage
    HomePage.clickCreateBotButton();
    HomePage.typeBotName(testData.messageTaskName);
    HomePage.clickCreateAndEditButton();
    HomePage.verifyEditPageOpened();

    // ✅ Step 2: Search for and insert a Message Box
    TaskbotEditPage.searchForMessageBox();
    TaskbotEditPage.selectMessageBoxOption();
    TaskbotEditPage.typeMessageToDisplay(testData.messageText);

    // ✅ Step 3: Save and close editor
    TaskbotEditPage.clickSave();
    TaskbotEditPage.clickClose();
    TaskbotEditPage.verifyRedirectToBotRepo();

    // Add logout step
    cy.logout();
  });
});
