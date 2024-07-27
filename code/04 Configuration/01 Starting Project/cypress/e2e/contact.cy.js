/// <reference types="Cypress" />

describe.only("contact form", { defaultCommandTimeout: 2000 }, () => {
  before(() => {
    // Runs only once per suite
  })
  beforeEach(() => {
    // Runs before every test in the suite
    cy.visit("/about")
  })
  it("should submit the form", () => {
    cy.task("seedDatabase", "my_db_init.csv")
    cy.getById("contact-input-message").type("Hello world!")
    cy.getById("contact-input-name").type("John Doe")
    cy.getById("contact-btn-submit").then((el) => {
      expect(el.attr("disabled")).to.be.undefined
      expect(el.text()).to.eq("Send Message")
    })
    cy.screenshot()
    cy.get('[data-cy="contact-input-email"]').type("test@example.com{enter}")
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');
    cy.screenshot()
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn")
    //cy.get("@submitBtn").click()
    cy.submitForm()
    cy.get("@submitBtn").contains("Sending...")
    cy.get("@submitBtn").should("have.attr", "disabled")
  })

  it("should validate the form input", { defaultCommandTimeout: 1000 }, () => {
    cy.submitForm()
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled")
      expect(el.text()).to.not.equal("Sending...")
    })
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message")
    cy.get('[data-cy="contact-input-message"]').as("msgInput")
    cy.get("@msgInput").focus().blur()
    cy.get("@msgInput")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined
        expect(el.attr("class")).contains("invalid")
      })

    cy.get('[data-cy="contact-input-name"]').focus().blur()
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined
        expect(el.attr("class")).contains("invalid")
      })

    cy.get('[data-cy="contact-input-email"]').focus().blur()
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined
        expect(el.attr("class")).contains("invalid")
      })
  })
})
