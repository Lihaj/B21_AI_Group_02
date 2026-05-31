import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import categoryPage from '../../../support/pages/CategoryPage';

When('I navigate to the categories page', () => {
  categoryPage.visit();
});

When('I navigate to the categories add page', () => {
  categoryPage.visitAdd();
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
