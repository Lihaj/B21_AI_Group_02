import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import categoryPage from '../../../support/pages/CategoryPage';

When('I navigate to the categories page', () => {
  categoryPage.visit();
});

When('I navigate to the categories add page', () => {
  categoryPage.visitAdd();
});

When('I click the "Add A Category" button', () => {
  categoryPage.clickAdd();
});

When('I click on the "Save" button on the category form', () => {
  categoryPage.clickSave();
});

Then('I should see the "Add A Category" button in the page header', () => {
  categoryPage.checkAddButtonVisible();
});

Then('I should stay on the categories add page', () => {
  categoryPage.checkOnAddPage();
});

Then('I should see the Category Name validation messages', () => {
  categoryPage.checkCategoryNameValidationMessages();
});

When('I enter {string} in the category search box', (categoryName: string) => {
  categoryPage.enterSearchCategoryName(categoryName);
});

When('I enter {string} in the category name field', (categoryName: string) => {
  categoryPage.enterCategoryFormName(categoryName);
});

When('I click the Search button', () => {
  categoryPage.clickSearch();
});

When('I select {string} from the parent category dropdown', (parentName: string) => {
  categoryPage.selectParentCategory(parentName);
});

When('I click the Reset button', () => {
  categoryPage.clickReset();
});

Then('I should see matching categories for {string}', (categoryName: string) => {
  categoryPage.checkMatchingCategoryPresent(categoryName);
});

Then('I should see the Category created successfully message', () => {
  categoryPage.checkSuccessMessage();
});

Then('I should be redirected to the categories page', () => {
  cy.location('pathname').should('include', '/categories');
});

Then('I should see only categories with parent {string}', (parentName: string) => {
  categoryPage.checkFilteredCategoriesByParent(parentName);
});

Then('the category search should be reset', () => {
  categoryPage.checkSearchInputCleared();
  categoryPage.checkParentCategoryFilterReverted();
});

Then('the full category list should be displayed again', () => {
  categoryPage.checkCategoryTableVisible();
});

When('I observe the category list', () => {
  categoryPage.checkCategoryTableVisible();
});

When('I scroll to the bottom of the page', () => {
  categoryPage.scrollToBottom();
});

Then('I should see pagination controls', () => {
  categoryPage.checkPaginationVisible();
});

When('I navigate to the next page', function () {
  // capture first row text to verify page change
  categoryPage.getFirstRowText().then((text) => {
    cy.wrap(text).as('firstRowText');
  }).then(() => {
    categoryPage.goToNextPage();
  });
});

Then('the category list should update to the next page', function () {
  cy.get('@firstRowText').then((prevText: string) => {
    // wait for possible navigation
    cy.get('table').find('tbody tr').first().invoke('text').should('not.eq', prevText);
  });
});
