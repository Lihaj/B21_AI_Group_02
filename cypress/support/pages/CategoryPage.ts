class CategoryPage {
  visit() {
    cy.visit('/categories');
  }

  get addButton() {
    return cy.contains('a', /Add A Category/i, { timeout: 10000 });
  }

  checkAddButtonVisible() {
    this.addButton.should('be.visible');
  }
}

export default new CategoryPage();
