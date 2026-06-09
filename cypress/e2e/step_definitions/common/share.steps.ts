/// <reference types="cypress" />
import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the response status should be {int}', (status: number) => {
  cy.get('@response').its('status').should('eq', status)
})

