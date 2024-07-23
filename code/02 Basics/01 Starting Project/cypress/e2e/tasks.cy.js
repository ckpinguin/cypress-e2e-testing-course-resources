/// <reference types="Cypress" />

describe("tasks management", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/")
    cy.contains("Add Task").click()
    cy.get(".backdrop").click({ force: true }) // makes test unrealistic though
    cy.get(".backdrop").should("not.exist")
    cy.get("dialog.modal").should("not.exist")
  })

  it("should close the new task modal on click of the cancel button", () => {
    cy.visit("http://localhost:5173/")
    cy.contains("Add Task").click()
    cy.get(".actions").find('[type="button"]').should("exist")
    cy.get(".actions").find('[type="button"]').click()
    cy.get(".backdrop").should("not.exist")
    cy.get("dialog.modal").should("not.exist")
  })

  it("should create a new task", () => {
    cy.visit("http://localhost:5173/")
    cy.contains("Add Task").click()
    cy.get("#title").type("New Task")
    cy.get("#summary").type("Description of new task")
    cy.get(".modal").contains("Add Task").click()
    cy.get(".backdrop").should("not.exist")
    cy.get("dialog.modal").should("not.exist")
    cy.get(".task").should("have.length", 1)
    cy.get(".task").contains("New Task")
    cy.get(".task h2").contains("New Task")
    cy.get(".task p").contains("Description of new task")
  })

  it("should validate user input", () => {
    cy.visit("http://localhost:5173/")
    cy.contains("Add Task").click()
    cy.get(".modal").contains("Add Task").click()
    cy.get(".error-message")
    cy.contains("Please provide values") // same as above
  })

  it("should filter tasks", () => {
    cy.visit("http://localhost:5173/")
    cy.contains("Add Task").click()
    cy.get("#title").type("New Task")
    cy.get("#summary").type("Description of new task")
    cy.get("#category").select("urgent")
    cy.get(".modal").contains("Add Task").click()
    cy.get("#filter").select("urgent")
    cy.get(".task").should("have.length", 1)
    cy.get(".task h2").contains("New Task")
    cy.get(".task p").contains("Description of new task")
    cy.get("#filter").select("low")
    cy.get(".task").should("have.length", 0)
    cy.get("#filter").select("urgent")
    cy.get(".task").should("have.length", 1)
    cy.get("#filter").select("all")
    cy.get(".task").should("have.length", 1)
  })

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5173/")
    cy.contains("Add Task").click()
    cy.get("#title").type("Task 1")
    cy.get("#summary").type("First Task")
    cy.get(".modal").contains("Add Task").click()
    cy.get(".task").should("have.length", 1)

    cy.contains("Add Task").click()
    cy.get("#title").type("Task 2")
    cy.get("#summary").type("Second Task")
    cy.get(".modal").contains("Add Task").click()
    cy.get(".task").should("have.length", 2)
    cy.get(".task").eq(0).contains("First Task") // or first()
    cy.get(".task").eq(1).contains("Second Task") // or last()
  })
})
