import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import LearningInstancePage from "../../pages/LearningInstancePage";
import AddFieldPage from "../../pages/AddFieldPage";

describe("Use Case 2 - Create a Learning Instance from Document Automation", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.login(testData.username, testData.password);
    LoginPage.verifyHomePageLoaded();
  });

  it("should fill and submit Create Learning Instance form", () => {
    HomePage.expandAIMenu();
    HomePage.clickDocumentAutomation();
    HomePage.verifyLearningInstancesPageLoaded();

    // ✅ Use iframe-safe click method
    LearningInstancePage.clickCreateLearningInstanceButton();
    LearningInstancePage.verifyModalOpened();

    // ✅ Fill and submit form
    LearningInstancePage.fillLearningInstanceDetails({
      name: testData.learningInstanceName,
      description: testData.description,
      documentType: testData.documentType,
    });

    LearningInstancePage.clickNextButton();

    AddFieldPage.clickAddFieldButton();
    AddFieldPage.fillAndCreateField({ name: "Invoice", label: "Invoice" });

    cy.logout();
  });
});
