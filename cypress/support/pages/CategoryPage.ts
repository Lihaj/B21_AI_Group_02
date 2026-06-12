class CategoryPage {
  private confirmationMessage = '';

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

  checkAddButtonNotVisible() {
    cy.contains('a', /Add A Category/i).should('not.exist');
  }

  checkDeleteActionDisabledForUser() {
    cy.get('table tbody tr').first().then(($row) => {
      const deleteElements = $row.find('button, a').filter((index, el) => {
        const text = el.textContent?.trim() || '';
        const hasTrashIcon = el.querySelector('i[class*="trash"]');
        return /delete/i.test(text) || !!hasTrashIcon;
      });

      expect(deleteElements.length).to.be.greaterThan(0);
      const deleteEl = deleteElements.first();
      const isDisabled = deleteEl.is(':disabled')
        || deleteEl.hasClass('disabled')
        || deleteEl.attr('aria-disabled') === 'true'
        || getComputedStyle(deleteEl[0]).pointerEvents === 'none';

      expect(isDisabled).to.be.true;
    });
  }

  checkEditActionDisabledForUser() {
    cy.get('table tbody tr').first().then(($row) => {
      const editElements = $row.find('button, a').filter((index, el) => {
        const text = el.textContent?.trim() || '';
        const hasPencilIcon = el.querySelector('i[class*="edit"], i[class*="pencil"], i[class*="pen"]');
        return /edit/i.test(text) || !!hasPencilIcon;
      });

      expect(editElements.length).to.be.greaterThan(0);
      const editEl = editElements.first();
      const isDisabled = editEl.is(':disabled')
        || editEl.hasClass('disabled')
        || editEl.attr('aria-disabled') === 'true'
        || getComputedStyle(editEl[0]).pointerEvents === 'none';

      expect(isDisabled).to.be.true;
    });
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

  clickFirstDelete() {
    cy.on('window:confirm', (message: string) => {
      this.confirmationMessage = message;
      return true;
    });

    cy.get('table tbody tr').first().find('button').last().click({ force: true });
  }

  clickFirstEdit() {
    // assume the edit action is the first button/icon in the Actions column
    cy.get('table tbody tr').first().find('button, a').first().click({ force: true });
  }

  checkUpdateSuccessMessage(message = 'Category updated successfully') {
    cy.get('body')
      .find('.alert-success, .alert, .toast, .notification, .message')
      .contains(/Category updated successfully/i)
      .should('be.visible');
  }

  checkDeleteConfirmationPrompt() {
    expect(this.confirmationMessage).to.eq('Delete this category?');
  }

  checkDeleteSuccessMessage(message = 'Category deleted successfully') {
    cy.get('body')
      .find('.alert-success, .alert, .toast, .notification, .message')
      .contains(/Category deleted successfully/i)
      .should('be.visible');
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

  checkCategoryCount(mainCount: string, subCount: string) {
    this.visit();
    let mainCategoryCount = 0;
    let subCategoryCount = 0;
    const countCategoriesOnPage = () => {
      cy.get('table').find('tbody tr').then(rows => {
        rows.each((_, row) => {
          const parentCategory = Cypress.$(row).find('td').eq(2).text().trim();
          if (parentCategory === '-') {
            mainCategoryCount++;
          } else {
            subCategoryCount++;
          }
        });
      });
    };

    const goToNextPage = () => {
      cy.get('body').then(body => {
        if (body.find('.pagination').length === 0) {
          expect(mainCategoryCount.toString()).to.eq(mainCount);
          expect(subCategoryCount.toString()).to.eq(subCount);
        } else {
          cy.get('.pagination').find('li').last().then(lastPageItem => {
            if (lastPageItem.hasClass('disabled')) {
              expect(mainCategoryCount.toString()).to.eq(mainCount);
              expect(subCategoryCount.toString()).to.eq(subCount);
            } else {
              cy.wrap(lastPageItem).find('a').click({ force: true });
              countCategoriesOnPage();
              goToNextPage();
            }
          });
        }
      });
    };

    countCategoriesOnPage();
    goToNextPage();
  }
}

export default new CategoryPage();
