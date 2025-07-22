import "./commands";
import "cypress-iframe";

Cypress.on("fail", (error, runnable) => {
  if (error.message.includes("Timed out")) {
    console.error("Timeout Error:", error.message);
    throw new Error(
      "A timeout occurred during the test execution. Please check the application or increase timeout durations."
    );
  }
  throw error;
});
