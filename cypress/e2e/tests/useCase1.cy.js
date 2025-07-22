import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import TaskbotEditPage from "../../pages/TaskBotEditPage";

describe("Bot Creation Flow", () => {
  let testData;
  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.login(testData.userName, testData.password);
    LoginPage.verifyHomePageLoaded();
  });

  it("should create a new bot, configure message box, and return to bot repo", () => {
    HomePage.clickCreateBotButton();
    HomePage.typeBotName(testData.messageTaskName);
    HomePage.clickCreateAndEditButton();
    HomePage.verifyEditPageOpened();

    TaskbotEditPage.searchForMessageBox();
    TaskbotEditPage.selectMessageBoxOption();
    TaskbotEditPage.typeMessageToDisplay(testData.messageText);

    TaskbotEditPage.clickSave();
    TaskbotEditPage.clickClose();
    TaskbotEditPage.verifyRedirectToBotRepo();

    cy.logout();
  });
});
