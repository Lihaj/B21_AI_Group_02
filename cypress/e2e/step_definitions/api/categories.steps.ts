/// <reference types="cypress" />
import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I send a POST request to create category with fixture data {string}', function (fixtureKey: string) {
  cy.get('@token').then((token) => {
    cy.fixture('testdata').then((data) => {
      const apiUrl = Cypress.env('apiUrl');
      cy.request({
        method: 'POST',
        url: `${apiUrl}/categories`,
        headers: { Authorization: `Bearer ${token}` },
        body: data[fixtureKey],
        failOnStatusCode: false
      }).as('response')
    })
  })
})
