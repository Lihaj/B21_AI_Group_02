import 'allure-cypress';
import './commands';

before(() => {
  cy.seedDatabase();
});
