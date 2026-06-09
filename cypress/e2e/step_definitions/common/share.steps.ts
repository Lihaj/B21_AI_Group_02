/// <reference types="cypress" />
import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the response status should be {int}', (status: number) => {
  cy.get('@response').its('status').should('eq', status)
})

Then('the response body should contain the error message {string}', (errorMessage: string) => {
  cy.get('@response').its('body').then((body) => {
    expect(JSON.stringify(body)).to.include(errorMessage)
  })
})

Then('the response body should contain the success message {string}', (successMessage: string) => {
  cy.get('@response').its('body').then((body) => {
    expect(JSON.stringify(body)).to.include(successMessage)
  })
})

Then('the response body should contain updated plant details', () => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.be.an('object')
    expect(body).to.have.property('name')
    expect(body).to.have.property('price')
    expect(body).to.have.property('quantity')
  })
})

Then('the response body should contain a non-empty plant list', () => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.be.an('array')
    expect(body.length).to.be.greaterThan(0)
  })
})
