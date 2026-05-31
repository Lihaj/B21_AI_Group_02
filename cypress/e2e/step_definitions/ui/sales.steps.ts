import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import salesPage from '../../../support/pages/SalesPage';

When('I navigate to the sales page', () => {
	salesPage.visit();
});

When('I click on the first delete button on the sales page', () => {
	salesPage.clickFirstDelete();
});

Then('I should see the sale delete confirmation prompt', () => {
	salesPage.checkDeleteConfirmationPrompt();
});

Then('I should stay on the sales page', () => {
	salesPage.checkOnSalesPage();
});