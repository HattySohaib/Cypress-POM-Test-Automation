class LearningInstancePage {
  clickCreateLearningInstanceButton() {
    cy.frameLoaded("iframe");
    cy.iframe().then(($iframe) => {
      // First try to find the button's parent container
      cy.wrap($iframe)
        .find(
          "#create-learning-instance-button, .view-li-page__create-button, .command-button"
        )
        .should("exist")
        .then(($container) => {
          cy.log(`Found potential container: ${$container.attr("class")}`);

          // Try to click the container itself
          cy.wrap($container)
            .scrollIntoView({ timeout: 10000 })
            .click({ force: true });

          cy.log("Clicked on the container");
          cy.wait(500);

          // If that didn't work, try to trigger a custom event
          cy.window().then((win) => {
            cy.log("Dispatching custom click event");

            // Get the button inside the iframe
            const button = $iframe
              .contents()
              .find('button[aria-label="Create Learning Instance"]')[0];

            if (button) {
              // Create and dispatch a MouseEvent
              const clickEvent = new win.MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: win,
              });
              button.dispatchEvent(clickEvent);
              cy.log("Custom click event dispatched");
            }
          });
        });
    });

    // Wait and check if modal appeared
    cy.wait(500);
    cy.log("Checking if modal appeared after alternative approaches");

    // Check if modal appeared by looking for its elements
    cy.iframe()
      .find(
        ".modal-form__content, .modal-form__content-header, input[aria-label='Name']"
      )
      .should("exist")
      .then(($elements) => {
        cy.log(`Found ${$elements.length} modal elements`);
      });
  }

  verifyModalOpened() {
    cy.frameLoaded("iframe"); // Ensure iframe is loaded

    // Check for the modal header with proper data attributes
    cy.iframe()
      .find(
        '[data-path="ModalForm.header"] [data-header-label="Create Learning Instance"]',
        { timeout: 20000 }
      )
      .should("be.visible");

    // Verify the form inside the modal content is present
    cy.iframe()
      .find(".modal-form__content-body .form", { timeout: 15000 })
      .should("exist");

    // Verify at least one input field is loaded and visible
    cy.iframe()
      .find(".field-label input, .field-label textarea", { timeout: 15000 })
      .should("exist");
  }

  typeName(name) {
    cy.iframe()
      .find('input[aria-label="Name"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(name);
  }

  typeDescription(description) {
    cy.iframe()
      .find('textarea[aria-label="Description (optional)"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(description);
  }

  selectDocumentType() {
    const iframe = cy.iframe();
    iframe
      .find('[data-name="domainId"] .rio-select-input-query__input-container')
      .scrollIntoView()
      .should("exist")
      .click({ force: true });

    cy.focused().type("{downarrow}{downarrow}{enter}");
  }

  fillLearningInstanceDetails(details) {
    this.typeName(details.name);
    this.typeDescription(details.description);
    this.selectDocumentType();
  }

  clickNextButton() {
    cy.iframe()
      .contains("button", "Next", { timeout: 10000 })
      .should("be.visible")
      .click();
  }

  verifySuccess(instanceName) {
    cy.url().should("include", `/learning-instances/${instanceName}`);
  }
}

export default new LearningInstancePage();
