import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import categoryPage from '../../../support/pages/CategoryPage';

When('I navigate to the categories page', () => {
  categoryPage.visit();
});

Then('I should see the "Add A Category" button in the page header', () => {
  categoryPage.checkAddButtonVisible();
});
