import { Given } from '@badeball/cypress-cucumber-preprocessor'

// For API tests, we can directly get the token through API calls.
Given('User is authenticated as admin', () => {
  cy.loginAsAdmin()
})

// For API tests, we can directly get the token through API calls.
Given('User is authenticated as user', () => {
  cy.loginAsUser()
})

// For UI tests, we can directly perform login through the UI.
Given('User is login as admin', () => {
  cy.env(['apiUrl', 'adminUser', 'adminPass']).then((env: any) => {
    cy.visit('login')
    cy.get('input[name="username"]').type(env.adminUser)
    cy.get('input[name="password"]').type(env.adminPass)
    cy.get('button[type="submit"]').click()
  })
})

// For UI tests, we can directly perform login through the UI.
Given('User is login as user', () => {
  cy.env(['apiUrl', 'testUser', 'testPass']).then((env: any) => {
    cy.visit('login')
    cy.get('input[name="username"]').type(env.testUser)
    cy.get('input[name="password"]').type(env.testPass)
    cy.get('button[type="submit"]').click()
  })
})