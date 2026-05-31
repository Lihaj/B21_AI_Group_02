import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import dashboardPage from '../../../support/pages/DashboardPage';

When('I navigate to the dashboard page', () => {
    dashboardPage.visit();
});

When('I click on the Manage Categories button', () => {
    dashboardPage.clickManageCategories();
});

Then('I should see {string} main and {string} sub categories in the dashboard category card', (main: string, sub: string) => {
    dashboardPage.checkCategoriesCard(main, sub);
});

Given('There are {string} main categories and {string} sub categories in the system', (main: string, sub: string) => {
    dashboardPage.checkCategoryCount(main, sub);
});

Given('There are {int} plants in the system', (plants: number) => {
    dashboardPage.checkPlantCount(plants.toString());
})

Then('I should see {string} plants in the dashboard plants card', (plants: string) => {
    dashboardPage.checkPlantsCard(plants);
})

Then('I should see {string} sales in the dashboard sales card', (sales: string) => {
    dashboardPage.checkSalesCard(sales);
})

Given('There are {int} sales in the system', (sales: number) => {
    dashboardPage.checkSalesCount(sales.toString());
})

Then('I should see correct sales revenue in the dashboard sales card', () => {
    dashboardPage.checkSalesRevenueCard();
})

Given('There are sales in the system', () => {
    dashboardPage.checkSalesRevenueInSystem();
})

Then('I should be navigated to the categories page', () => {
    cy.url().should('include', '/categories');
})
