describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:4200");
    cy.get("#productList").should("be.visible");
    cy.get("#addProduct").click();
    cy.get("#productList").should("not.exist");
    cy.get("#name").type("automation name");
    cy.get("#description").type("automation description");
    cy.get("#price").type("10");
    cy.get("#create").click();
    cy.get("#productList").contains("automation name");
  });
});
