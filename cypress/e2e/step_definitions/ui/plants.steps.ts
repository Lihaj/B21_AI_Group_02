import { DataTable, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import plantPage from '../../../support/pages/PlantPage';

When('I navigate to the plants page', () => {
	plantPage.visit();
});

When('I click on the "Add a Plant" button', () => {
	plantPage.clickAddPlant();
});

When('I click on the "Cancel" link', () => {
	plantPage.clickCancel();
});

When('I navigate to the plant edit page for plant id {string} with the following plant data:', (plantId: string, dataTable: DataTable) => {
	const plantData = dataTable.hashes()[0];
	plantPage.visitEdit(plantId);
	plantPage.fillPlantForm(plantData.name, plantData.price, plantData.quantity);
});

When('I click on the "Save" button on the plant form', () => {
	plantPage.clickSave();
});

Then('I should be navigated back to the plants page', () => {
	plantPage.checkOnPlantsPage();
});

Then('I should stay on the plant edit page', () => {
	plantPage.checkOnEditPage();
});

Then('I should see the price validation message', () => {
	plantPage.checkPriceValidationMessage();
});

Then('I should see {string} plants in the plant list', (plants: string) => {
	plantPage.checkPlantCount(plants);
});
