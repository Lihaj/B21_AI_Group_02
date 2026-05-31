class CategoryPage {
  visit() {
    cy.visit('/categories');
  }

  visitAdd() {
    cy.visit('/categories/add');
  }

  get addButton() {
    return cy.contains('a', /Add A Category/i, { timeout: 10000 });
  }

  get saveButton() {
    return cy.contains('button', 'Save', { timeout: 10000 });
  }

  checkAddButtonVisible() {
    this.addButton.should('be.visible');
  }

  clickSave() {
    this.saveButton.click({ force: true });
  }

  checkOnAddPage() {
    cy.location('pathname').should('eq', '/ui/categories/add');
  }

  checkCategoryNameValidationMessages() {
    cy.contains('Category name must be between 3 and 10 characters').should('be.visible');
    cy.contains('Category name is required').should('be.visible');
  }
}

export default new CategoryPage();
