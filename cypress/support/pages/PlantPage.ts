class PlantPage {
	visit() {
		cy.visit('plants');
	}

	visitEdit(plantId: string) {
		cy.visit(`plants/edit/${plantId}`);
	}

	clickAddPlant() {
		cy.contains('a', 'Add a Plant').click();
	}

	clickCancel() {
		cy.contains('a', 'Cancel').click();
	}

	clickSave() {
		cy.contains('button', 'Save').click({ force: true });
	}

	checkOnPlantsPage() {
		cy.location('pathname').should('eq', '/ui/plants');
	}

	checkOnEditPage() {
		cy.location('pathname').should('eq', '/ui/plants/edit/3');
	}

	fillPlantForm(name: string, price: string, quantity: string) {
		cy.get('input[type="text"]').clear().type(name);
		cy.get('input[type="number"]').first().clear().type(price);
		cy.get('input[type="number"]').last().clear().type(quantity);
	}

	selectCategory(category: string) {
		const selectSelector = 'select[name="category"], select[id="category"], select[name*="category"], select[data-cy*="category"]';
		const inputSelector = 'input[placeholder*="Category"], input[name*="category"], input[id*="category"], input[data-cy*="category"]';
		cy.get('body').then($body => {
			if ($body.find(selectSelector).length) {
				cy.get(selectSelector).first().select(category, { force: true });
			} else if ($body.find(inputSelector).length) {
				cy.get(inputSelector).first().clear().type(category);
			} else {
				cy.get('body').contains('Category').parent().find('select, input').first().select(category, { force: true });
			}
		});
	}

	searchPlant(name: string) {
		const selector = 'input[placeholder*="Search"], input[name*="search"], input[data-cy*="search"], input[type="search"], input[type="text"]';
		cy.get(selector).first().clear().type(name).type('{enter}');
		cy.wrap(name).as('lastSearchName');
	}

	checkOnlyMatchingPlantsDisplayed(name: string) {
		cy.get('table tbody tr').should('have.length.greaterThan', 0);
		cy.get('table tbody tr').each($row => {
			cy.wrap($row).should('contain.text', name);
		});
	}

	selectCategoryFilter(category: string) {
		const selectSelector = 'select[name="categoryFilter"], select[data-cy="category-filter"], select[name*="category"], select[id*="category"], select';
		cy.get(selectSelector).first().should('be.visible').then($sel => {
			const $option = $sel.find('option').filter((_, option) => Cypress.$(option).text().trim() === category).first();
			if ($option.length) {
				cy.wrap($sel).select($option.val() as string, { force: true });
			} else {
				cy.wrap($sel).select(category, { force: true });
			}
			cy.wrap(category).as('lastSelectedCategory');
		});
	}

	checkOnlyCategoryDisplayed(category: string) {
		cy.get('table tbody tr').should('have.length.greaterThan', 0);
		cy.get('table tbody tr').each($row => {
			if ($row.find('.category-cell').length) {
				cy.wrap($row).find('.category-cell').should('contain.text', category);
			} else {
				cy.wrap($row).should('contain.text', category);
			}
		});
	}

	checkPriceValidationMessage() {
		cy.contains('Price must be greater than 0').should('be.visible');
	}

	checkPlantCount(plantCount: string) {
		cy.visit('plants');
		let totalPlantCount = 0;

		function countPlantsOnPage() {
			cy.get('table').find('tbody tr').then(rows => {
				totalPlantCount += rows.length;
			});
		}

		function goToNextPage() {
			cy.get('body').then(body => {
				if (body.find('.pagination').length === 0) {
					expect(totalPlantCount.toString()).to.eq(plantCount);
				} else {
					cy.get('.pagination').find('li').last().then(lastPageItem => {
						if (lastPageItem.hasClass('disabled')) {
							expect(totalPlantCount.toString()).to.eq(plantCount);
						} else {
							cy.wrap(lastPageItem).find('a').click({ force: true });
							countPlantsOnPage();
							goToNextPage();
						}
					});
				}
			});
		}

		countPlantsOnPage();
		goToNextPage();
	}
}

export default new PlantPage();
