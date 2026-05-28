import { Given } from '@badeball/cypress-cucumber-preprocessor'

Given('User is authenticated as admin', () => {
  cy.loginAsAdmin()
})

Given('User is authenticated as user', () => {
  cy.loginAsUser()
})
