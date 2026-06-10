import 'allure-cypress';
import './commands';

beforeEach(() => {
  cy.seedDatabase();
});
