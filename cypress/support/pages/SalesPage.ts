class SalesPage {
	private confirmationMessage = '';

	visit() {
		cy.visit('/sales');
	}

	clickFirstDelete() {
		cy.on('window:confirm', (message: string) => {
			this.confirmationMessage = message;
			expect(message).to.eq('Are you sure you want to delete this sale?');
			return false;
		});

		cy.get('table tbody tr').first().find('button').click({ force: true });
	}

	checkDeleteConfirmationPrompt() {
		expect(this.confirmationMessage).to.eq('Are you sure you want to delete this sale?');
	}

	checkOnSalesPage() {
		cy.location('pathname').should('eq', '/ui/sales');
	}

	checkSalesCount(salesCount: string) {
		let totalSalesCount = 0;

		function countSalesOnPage() {
			cy.get('table').find('tbody tr').then(rows => {
				totalSalesCount += rows.length;
			});
		}

		function goToNextPage() {
			cy.get('body').then(body => {
				if (body.find('.pagination').length === 0) {
					expect(totalSalesCount.toString()).to.eq(salesCount);
				} else {
					cy.get('.pagination').find('li').last().then(lastPageItem => {
						if (lastPageItem.hasClass('disabled')) {
							expect(totalSalesCount.toString()).to.eq(salesCount);
						} else {
							cy.wrap(lastPageItem).find('a').click({ force: true });
							countSalesOnPage();
							goToNextPage();
						}
					});
				}
			});
		}

		countSalesOnPage();
		goToNextPage();
	}
}

export default new SalesPage();
