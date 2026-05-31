class DashboardPage {
	visit() {
        cy.visit('/dashboard');
	}

    clickManageCategories() {
        cy.contains('a', 'Manage Categories').click();
    }

	checkCategoriesCard(mainCount: string, subCount: string) {
		cy.contains('h6', 'Categories')
			.parent()
			.parent()
			.should('contain.text', mainCount)
			.and('contain.text', 'Main')
			.and('contain.text', subCount)
			.and('contain.text', 'Sub');
	}

    checkCategoryCount(mainCount: string, subCount: string) {
        cy.visit('/categories');
        let mainCategoryCount = 0;
        let subCategoryCount = 0;
        function countCategoriesOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                rows.each((_, row) => {
                    const parentCategory = Cypress.$(row).find('td').eq(2).text().trim();
                    if (parentCategory === '-') {
                        mainCategoryCount++;
                    }
                    else {
                        subCategoryCount++;
                    }
                });
            });
        }

        function goToNextPage() {
            cy.get('body').then(body => {
                if (body.find('.pagination').length === 0) {
                    expect(mainCategoryCount.toString()).to.eq(mainCount);
                    expect(subCategoryCount.toString()).to.eq(subCount);
                } else {
                    cy.get('.pagination').find('li').last().then(lastPageItem => {
                        if (lastPageItem.hasClass('disabled')) {
                            expect(mainCategoryCount.toString()).to.eq(mainCount);
                            expect(subCategoryCount.toString()).to.eq(subCount);
                        } else {
                            cy.wrap(lastPageItem).find('a').click({ force: true });
                            countCategoriesOnPage();
                            goToNextPage();
                        }
                    });
                }
            });
        }

        countCategoriesOnPage();
        goToNextPage();
    }

    checkPlantsCard(plantCount: string) {
        cy.contains('h6', 'Plants')
            .parent()
            .parent()
            .should('contain.text', plantCount)
            .and('contain.text', 'Total');
    }

    checkPlantCount(plantCount: string) {
        cy.visit('/plants');
        let totalPlantCount = 0;
        function countPlantsOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                const plantCountInPage = rows.length;
                totalPlantCount += plantCountInPage;
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

    checkSalesCard(salesCount: string) {
        cy.contains('h6', 'Sales')
            .parent()
            .parent()
            .should('contain.text', salesCount)
            .and('contain.text', 'Sales');
    }

    checkSalesCount(salesCount: string) {
        cy.visit('/sales');
        let totalSalesCount = 0;
        function countSalesOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                const salesCountInPage = rows.length;
                totalSalesCount += salesCountInPage;
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

    checkSalesRevenueCard() {
        cy.get('@totalRevenue').then(totalRevenue => {
            const salesRevenue = totalRevenue.toString();
        cy.contains('h6', 'Sales')
            .parent()
            .parent()
            .should('contain.text', salesRevenue)
            .and('contain.text', 'Revenue');
        });
    }

    checkSalesRevenueInSystem() {
        cy.visit('/sales');
        let totalRevenue = 0; // save this value in the sessoin or some shared state to compare with the value on the card
        function calculateRevenueOnPage() {
            cy.get('table').find('tbody tr').then(rows => {
                rows.each((_, row) => {
                    const saleValue = parseFloat(Cypress.$(row).find('td').eq(2).text().trim());
                    totalRevenue += saleValue;
                });
            });
        }
        function goToNextPage() {
            cy.get('body').then(body => {
                if (body.find('.pagination').length === 0) {
                    expect(totalRevenue.toString()).to.eq(totalRevenue.toString());
                } else {
                    cy.get('.pagination').find('li').last().then(lastPageItem => {
                        if (lastPageItem.hasClass('disabled')) {
                            expect(totalRevenue.toString()).to.eq(totalRevenue.toString());
                        } else {
                            cy.wrap(lastPageItem).find('a').click({ force: true });
                            calculateRevenueOnPage();
                            goToNextPage();
                        }
                    });
                }
            });
        }

        calculateRevenueOnPage();
        goToNextPage();
        cy.wrap(totalRevenue).as('totalRevenue');
    }
}

export default new DashboardPage();
