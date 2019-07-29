/**
 * STUDENTS - this is where you should put your Cypress tests for the last two tasks
 */
describe("The student's tests", function() {
  it("loads in the browser", function() {
    cy.visit("/"); // change URL to match your dev URL
  });
});

describe("Button 0", function() {
  beforeEach(function() {
    cy.get("#button0").click();
  });
  it("should render a welcome message", function() {
    cy.get("#renderhere p");
    cy.get("#renderhere p").contains("Hello there! Nice to meet you!");
  });
});

describe("Button 1", function() {
  beforeEach(function() {
    cy.get("#button1").click();
  });
  it("should render 2 input fields for name and email", function() {
    cy.get("#renderhere .form-group").contains("Name");
    cy.get("#renderhere .form-group").contains("Email Address");
    cy.get('#renderhere input[type="email"]');
    cy.get('#renderhere input[type="text"]');
  });
  it("should render submit button", function() {
    cy.get("#renderhere button").contains("Submit");
  });
  it("should not let me enter nothing into the text fields", function() {
    cy.get("#renderhere button")
      .contains("Submit")
      .click();
    cy.get("#renderhere p:contains('Thank you')").should("not.exist");
  });
  it("should render personalised thank you message on submission", function() {
    cy.get('#renderhere input[type="text"]').type("Jake Perolta");
    cy.get('#renderhere input[type="email"]').type("99@nypd.com");
    cy.get("#renderhere button")
      .contains("Submit")
      .click();
    cy.get("#renderhere p").contains("Thank you");
    cy.get("#renderhere p").contains("Jake Perolta");
    cy.get("#renderhere p").contains("99@nypd.com");
  });
});
