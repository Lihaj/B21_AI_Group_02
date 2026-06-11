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

  clickAdd() {
    this.addButton.click();
  }

  enterCategoryFormName(name: string) {
    cy.get('input#name').clear().type(name);
  }

  checkSuccessMessage(message = 'Category created successfully') {
    cy.get('body')
      .find('.alert-success, .alert, .toast, .notification, .message')
      .contains(/Category created successfully/i)
      .should('be.visible');
  }

  checkCategoryNameValidationMessages() {
    cy.contains('Category name must be between 3 and 10 characters').should('be.visible');
    cy.contains('Category name is required').should('be.visible');
  }

  enterSearchCategoryName(name: string) {
    cy.get('input[name="name"]').clear().type(name);
  }

  selectParentCategory(parentName: string) {
    cy.get('select[name="parentId"]').select(parentName);
  }

  clickSearch() {
    cy.contains('button', 'Search').click();
  }

  clickReset() {
    // Try common reset control selectors first, then fallback to text match.
    cy.get('body').then(($body) => {
      if ($body.find('button[type="reset"]').length) {
        cy.get('button[type="reset"]').first().click({ force: true });
        return;
      }
      if ($body.find('input[type="reset"]').length) {
        cy.get('input[type="reset"]').first().click({ force: true });
        return;
      }
      // fallback: look for any element containing reset/clear text (case-insensitive)
      cy.contains(/reset|clear|reset filters/i).click({ force: true });
    });
  }

  checkSearchInputCleared() {
    cy.get('input[name="name"]').should('have.value', '');
  }

  checkParentCategoryFilterReverted(defaultLabel = 'All Parents') {
    cy.get('select[name="parentId"]').find('option:selected').should('contain.text', defaultLabel);
  }

  checkMatchingCategoryPresent(name: string) {
    cy.get('table').find('tbody tr').should('contain.text', name);
  }

  checkFilteredCategoriesByParent(parentName: string) {
    cy.get('table').find('tbody tr').each((row) => {
      cy.wrap(row).find('td').eq(2).should('contain.text', parentName);
    });
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
