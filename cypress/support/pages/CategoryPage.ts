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

  // Table & pagination helpers
  getCategoryRows() {
    return cy.get('table').find('tbody tr');
  }

  checkCategoryTableVisible() {
    this.getCategoryRows().should('exist').and('have.length.greaterThan', 0);
  }

  getFirstRowText() {
    return cy.get('table').find('tbody tr').first().invoke('text');
  }

  scrollToBottom() {
  cy.get('.pagination').scrollIntoView({ ensureScrollable: false });
  }

  checkPaginationVisible() {
    cy.get('.pagination').should('exist').and('be.visible');
  }

  goToNextPage() {
    cy.get('body').then((body) => {
      if (body.find('.pagination').length === 0) {
        // no pagination available
        return;
      }
      cy.get('.pagination').find('li').last().then((lastPageItem) => {
        if (lastPageItem.hasClass('disabled')) {
          // already on last page
          return;
        }
        cy.wrap(lastPageItem).find('a').click({ force: true });
      });
    });
  }
}

export default new CategoryPage();
