declare namespace Cypress {
  interface Chainable {
    seedDatabase(): Chainable<void>
  }
}
