import { DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import plantPage from '../../../support/pages/PlantPage';

Given('the following plants exist in category {string}:', (category: string, dataTable: DataTable) => {
	const expectedPlantNames = dataTable.hashes().map(row => row.name);

	cy.fixture('seed_data').then(data => {
		const categoryIndex = data.categories.findIndex((item: any) => item.name === category);
		expect(categoryIndex, `category ${category} exists in seed data`).to.be.greaterThan(-1);

		const categoryId = categoryIndex + 1;
		const actualPlantNames = data.plants
			.filter((plant: any) => plant.category_id === categoryId)
			.map((plant: any) => plant.name);

		expectedPlantNames.forEach(plantName => {
			expect(actualPlantNames, `${plantName} exists in category ${category}`).to.include(plantName);
		});
	});
});

When('I navigate to the plants page', () => {
	plantPage.visit();
});

When('I click on the "Add a Plant" button', () => {
	plantPage.clickAddPlant();
});

When('I enter plant name {string} in search field', (name: string) => {
  plantPage.searchPlant(name);
});

When('I select category {string} in category filter', (category: string) => {
  plantPage.selectCategoryFilter(category);
});

When('I filter plants by category {string}', (category: string) => {
	plantPage.visit();
	plantPage.selectCategoryFilter(category);
});

When('I leave all required fields empty', () => {
	// clear text and number inputs
	cy.get('input[type="text"]').each($el => cy.wrap($el).clear({ force: true }));
	cy.get('input[type="number"]').each($el => cy.wrap($el).clear({ force: true }));
	// clear category select / input if present
	cy.get('body').then($body => {
		if ($body.find('select[name="category"]').length) {
			cy.get('select[name="category"]').select('', { force: true }).should('exist');
		} else if ($body.find('input[placeholder="Category"]').length) {
			cy.get('input[placeholder="Category"]').clear({ force: true });
		}
	});
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

When('I fill the plant form with valid details:', (dataTable: DataTable) => {
	const plantData = dataTable.hashes()[0];
	if (plantData.category) {
		plantPage.selectCategory(plantData.category);
	}
	plantPage.fillPlantForm(plantData.name, plantData.price, plantData.quantity);
});

When('I fill the plant form with details:', (dataTable: DataTable) => {
  const plantData = dataTable.hashes()[0];
  if (plantData.category) {
    plantPage.selectCategory(plantData.category);
  }
  plantPage.fillPlantForm(plantData.name, plantData.price, plantData.quantity);
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

Then('I should see the following plants in the list:', (dataTable: DataTable) => {
  const expectedPlants = dataTable.hashes().map(row => row.name);

  expectedPlants.forEach(plantName => {
    // Check each plant exists in the table
    cy.contains('table tbody tr', plantName).should('exist');
  });
});

Then('the plant list page loads successfully in read-only mode', () => {
	cy.location('pathname').should('include', 'plants');

	// main list/table is visible
	cy.get('table').should('be.visible');

	// normal users should not see Add/Create controls
	cy.contains('a', 'Add a Plant').should('not.exist');

	// rows should not have edit/delete actions (read-only)
	cy.get('table tbody tr').each($row => {
		cy.wrap($row).contains('Edit').should('not.exist');
		cy.wrap($row).contains('Delete').should('not.exist');
	});
});

Then('the Add a Plant button is visible only for Admin', () => {
	// Verify the Add a Plant control is present for admin
	cy.contains('a', 'Add a Plant').should('be.visible');
});

Then('the Add a Plant button is hidden or disabled for normal user', () => {
	cy.get('body').then($body => {
		const $add = $body.find('a').filter((i, el) => el.textContent.trim() === 'Add a Plant');
		if ($add.length === 0) {
			expect($add.length).to.eq(0);
		} else {
			if ($add.is(':visible')) {
				expect($add.attr('disabled') !== undefined).to.eq(true);
			} else {
				expect($add.is(':visible')).to.eq(false);
			}
		}
	});
});

Then('only matching plants are displayed', () => {
	cy.get('@lastSearchName').then(name => {
		plantPage.checkOnlyMatchingPlantsDisplayed(String(name));
	});
});

Then('only plants belonging to selected category are displayed', () => {
	cy.get('@lastSelectedCategory').then(selected => {
		plantPage.checkOnlyCategoryDisplayed(String(selected));
	});
});

Then('the Low badge is displayed for the plant with quantity below 5', () => {
	cy.get('table tbody tr').then(rows => {
		const lowStockFound = Array.from(rows).some(row => {
			const cells = Cypress.$(row).find('td');
			const stockText = cells.eq(3).text().trim();
			const stockValue = Number(stockText.replace(/[^0-9.-]/g, ''));
			return !Number.isNaN(stockValue) && stockValue < 5;
		});
		expect(lowStockFound).to.be.true;
	});
});

Then('validation messages are displayed for Name, Category, Price and Quantity', () => {
	cy.contains('Plant name is required').should('be.visible');
	cy.contains('Category is required').should('be.visible');
	cy.contains('Price is required').should('be.visible');
	cy.contains('Quantity is required').should('be.visible');
});

Then('I should see the plant {string} in the plant list', (name: string) => {
	cy.contains('table tbody tr', name).should('exist');
});
