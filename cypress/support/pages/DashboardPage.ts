class DashboardPage {
    get manageCategoriesLink() {
        return cy.contains('a', 'Manage Categories');
    }

    get categoriesCard() {
        return cy.contains('h6', 'Categories').parent().parent();
    }

    get plantsCard() {
        return cy.contains('h6', 'Plants').parent().parent();
    }

    get salesCard() {
        return cy.contains('h6', 'Sales').parent().parent();
    }

    visit() {
        cy.visit('/dashboard');
    }

    clickManageCategories() {
        this.manageCategoriesLink.click();
    }

    checkCategoriesCard(mainCount: string, subCount: string) {
        this.categoriesCard
            .should('contain.text', mainCount)
            .and('contain.text', 'Main')
            .and('contain.text', subCount)
            .and('contain.text', 'Sub');
    }

    checkPlantsCard(plantCount: string) {
        this.plantsCard
            .should('contain.text', plantCount)
            .and('contain.text', 'Total');
    }

    checkSalesCard(salesCount: string) {
        this.salesCard
            .should('contain.text', salesCount)
            .and('contain.text', 'Sales');
    }

    checkSalesRevenueCard() {
        cy.get('@totalRevenue').then(totalRevenue => {
            const salesRevenue = totalRevenue.toString();
            this.salesCard
                .should('contain.text', salesRevenue)
                .and('contain.text', 'Revenue');
        });
    }
}

export default new DashboardPage();
