class SalesPage {
	private confirmationMessage = '';
	private deleteConfirmShown = false;

	visit() {
		cy.visit('/sales');
	}

	// ── Sell Plant form ──────────────────────────────────────────────────────

	clickSellPlant() {
		cy.contains('a', 'Sell Plant').click();
	}

	selectPlantById(plantId: string) {
		cy.get('select[name="plantId"], select#plantId').select(plantId);
	}

	enterQuantity(quantity: string) {
		cy.get('input[name="quantity"], input#quantity').clear().type(quantity);
	}

	clickSave() {
		cy.contains('button', 'Sell').click({ force: true });
	}

	clickCancelLink() {
		cy.contains('a', 'Cancel').click();
	}

	checkOnSellPlantPage() {
		cy.location('pathname').should('include', '/sales/sell');
	}

	checkSaleCreatedSuccessfully() {
		cy.location('pathname').should('eq', '/ui/sales');
		cy.get('table tbody tr').should('have.length.greaterThan', 0);
	}

	checkQuantityValidationMessage() {
		cy.get('input[name="quantity"], input#quantity').then($input => {
			const validity = ($input[0] as HTMLInputElement).validity;
			expect(validity.valid, 'Quantity input should be invalid (HTML5 validation blocked submit)').to.be.false;
		});

		cy.location('pathname').should('not.eq', '/ui/sales');
	}

	// ── Delete confirmation ──────────────────────────────────────────────────

	clickFirstDelete() {
		cy.on('window:confirm', (message: string) => {
			this.confirmationMessage = message;
			this.deleteConfirmShown = true;
			expect(message).to.eq('Are you sure you want to delete this sale?');
			return false;
		});

		cy.get('table tbody tr').first().find('button').click({ force: true });
	}

	clickFirstDeleteAndConfirm() {
		cy.on('window:confirm', () => true);
		cy.get('table tbody tr').first().find('button').click({ force: true });
	}

	clickFirstDeleteAndCancel() {
		cy.on('window:confirm', () => false);
		cy.get('table tbody tr').first().find('button').click({ force: true });
	}

	checkDeleteConfirmationPrompt() {
		expect(this.confirmationMessage).to.eq('Are you sure you want to delete this sale?');
	}

	checkItemDeleted(initialCount: number) {
		cy.get('table tbody tr').should('have.length', initialCount - 1);
	}

	checkItemNotDeleted(initialCount: number) {
		cy.get('table tbody tr').should('have.length', initialCount);
	}

	// ── Navigation / page state ──────────────────────────────────────────────

	checkOnSalesPage() {
		cy.location('pathname').should('eq', '/ui/sales');
	}

	checkSalesListVisible() {
		cy.get('table').should('be.visible');
		cy.get('table tbody tr').should('have.length.greaterThan', 0);
	}

	// ── Sorting ──────────────────────────────────────────────────────────────

	clickQuantityColumnHeader() {
		cy.contains('th', 'Quantity').click();
	}

	checkSortedByQuantityAscending() {
		cy.get('table tbody tr').then(rows => {
			const quantities: number[] = [];
			rows.each((_, row) => {
				const qty = parseInt(Cypress.$(row).find('td').eq(1).text().trim(), 10);
				quantities.push(qty);
			});
			const sorted = [...quantities].sort((a, b) => a - b);
			expect(quantities).to.deep.equal(sorted);
		});
	}

	checkDefaultSortBySoldDateDescending() {
		cy.get('table tbody tr').then(rows => {
			const dates: number[] = [];
			rows.each((_, row) => {
				const dateText = Cypress.$(row).find('td').last().text().trim();
				dates.push(new Date(dateText).getTime());
			});
			const sorted = [...dates].sort((a, b) => b - a);
			expect(dates).to.deep.equal(sorted);
		});
	}

	// ── Empty state ───────────────────────────────────────────────────────────

	checkEmptySalesMessage() {
		cy.contains('No sales found').should('be.visible');
	}

	// ── Sales count ───────────────────────────────────────────────────────────

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
