import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import salesPage from '../../../support/pages/SalesPage';

// ── Navigation ────────────────────────────────────────────────────────────────

When('I navigate to the sales page', () => {
	salesPage.visit();
});

// ── Sell Plant form ───────────────────────────────────────────────────────────

When('I click on the {string} button on the sales page', (buttonText: string) => {
	cy.contains('a', buttonText).click();
});

When('I select a plant with id {string}', (plantId: string) => {
	salesPage.selectPlantById(plantId);
});

When('I enter a valid quantity {string}', (quantity: string) => {
	salesPage.enterQuantity(quantity);
});

When('I click the sell save button', () => {
	salesPage.clickSave();
});

When('I click on the cancel link on the sales page', () => {
	salesPage.clickCancelLink();
});

When('I click on the cancel link on the sell plant page', () => {
	salesPage.clickCancelLink();
});

// ── Delete confirmation ───────────────────────────────────────────────────────

When('I click on the first delete button on the sales page', () => {
	salesPage.clickFirstDelete();
});

// ── Sorting ───────────────────────────────────────────────────────────────────

When('I click on the quantity column header', () => {
	salesPage.clickQuantityColumnHeader();
});

// ── Assertions ────────────────────────────────────────────────────────────────

Then('the sale should be created successfully', () => {
	salesPage.checkSaleCreatedSuccessfully();
});

Then('I should be redirected to the sales list page', () => {
	salesPage.checkOnSalesPage();
});

Then('I should see the quantity validation message', () => {
	salesPage.checkQuantityValidationMessage();
});

Then('I should be on the sales list page', () => {
	salesPage.checkOnSalesPage();
});

Then('I should see the sale delete confirmation prompt', () => {
	salesPage.checkDeleteConfirmationPrompt();
});

Then('I should stay on the sales page', () => {
	salesPage.checkOnSalesPage();
});

Then('the sales list should be visible', () => {
	salesPage.checkSalesListVisible();
});

Then('the sales should be sorted by quantity', () => {
	salesPage.checkSortedByQuantityAscending();
});

Then('the sales should be sorted by sold date in descending order', () => {
	salesPage.checkDefaultSortBySoldDateDescending();
});

Then('I should see the no sales message', () => {
	salesPage.checkEmptySalesMessage();
});