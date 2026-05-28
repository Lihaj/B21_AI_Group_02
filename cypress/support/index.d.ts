declare namespace Cypress {
  interface Chainable {
    loginAsAdmin(): Chainable<string>
    loginAsUser(): Chainable<string>
    seedDatabase(): Chainable<void>
  }
}
