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

When('I send a PUT request to update category with fixture data {string}', function (fixtureKey: string) {
  cy.get('@token').then((token) => {
    cy.fixture('testdata').then((data) => {
      const apiUrl = Cypress.env('apiUrl');
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/categories/${data[fixtureKey].id}`,
        headers: { Authorization: `Bearer ${token}` },
        body: data[fixtureKey],
        failOnStatusCode: false
      }).as('response')
    })
  })
})
