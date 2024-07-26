/// <reference types="Cypress" />

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about")
    cy.get('[data-cy="contact-input-message"]').type("Hello Test-World!")
    cy.get('[data-cy="contact-input-name"]').type("John Test")
    //cy.get('[data-cy="contact-input-email"]').type("john@example.com")
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined
      expect(el.text()).to.eq("Send Message")
    })
    cy.get('[data-cy="contact-input-email"]').type("john@example.com{enter}")

    /*     cy.get('[data-cy="contact-btn-submit"]')
      .contains("Send Message")
      .should("not.have.attr", "disabled") */
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn")
    // cy.get("@submitBtn").click()
    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled")
  })

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about")
    cy.get('[data-cy="contact-btn-submit"]').click()
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled")
      expect(el.text()).is.not.equal("Sending...")
    })
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message")

    cy.get('[data-cy="contact-input-message"]').as("msgInput")
    cy.get("@msgInput").blur()
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contain("invalid")
      })

    cy.get('[data-cy="contact-input-email"]').focus().blur()
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contain("invalid")
      })

    cy.get('[data-cy="contact-input-name"]').focus().blur()
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contain("invalid")
      })
  })
})
