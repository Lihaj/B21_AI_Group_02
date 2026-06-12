import { Given } from '@badeball/cypress-cucumber-preprocessor'
import loginPage from '../../../support/pages/LoginPage'

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
    loginPage.visit()
    loginPage.login(env.adminUser, env.adminPass)
  })
})

// For UI tests, we can directly perform login through the UI.
Given('User is login as user', () => {
  cy.env(['apiUrl', 'testUser', 'testPass']).then((env: any) => {
    loginPage.visit()
    loginPage.login(env.testUser, env.testPass)
  })
})