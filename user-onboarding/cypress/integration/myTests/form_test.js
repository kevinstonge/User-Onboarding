describe("testing form input", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("add text to inputs and submit form", () => {
    cy.get("[data-cy='name']").type("myname").should("have.value", "myname");
    cy.get("[data-cy='email']")
      .type("myname@gmail.com")
      .should("have.value", "myname@gmail.com");
    cy.get("[data-cy='password']")
      .type("myPassword")
      .should("have.value", "myPassword");
    cy.get("[data-cy='terms']").check().should("be.checked");
    cy.get("[data-cy=submit]")
      .click()
      .then(() => {
        cy.get("[data-cy=memberList]").should("contain", "myname@gmail.com");
      });
  });
});
//
