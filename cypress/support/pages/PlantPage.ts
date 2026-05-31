class PlantPage {
	visit() {
		cy.visit('/plants');
	}

	visitEdit(plantId: string) {
		cy.visit(`/plants/edit/${plantId}`);
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

	checkPriceValidationMessage() {
		cy.contains('Price must be greater than 0').should('be.visible');
	}

	checkPlantCount(plantCount: string) {
		cy.visit('/plants');
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
