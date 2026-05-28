/// <reference types="cypress" />

Cypress.Commands.add('loginAsAdmin', () => {
  cy.env(['apiUrl', 'adminUser', 'adminPass']).then((env: any) => {
    cy.request('POST', `${env.apiUrl}/auth/login`, {
      username: env.adminUser,
      password: env.adminPass,
    }).then((res: Cypress.Response<any>) => {
      cy.wrap(res.body.token).as('token')
    })
  })
})

Cypress.Commands.add('loginAsUser', () => {
  cy.env(['apiUrl', 'testUser', 'testPass']).then((env: any) => {
    cy.request('POST', `${env.apiUrl}/auth/login`, {
      username: env.testUser,
      password: env.testPass,
    }).then((res: Cypress.Response<any>) => {
      cy.wrap(res.body.token).as('token')
    })
  })
})

Cypress.Commands.add('seedDatabase', () => {
  cy.fixture('seed_data').then((data) => {
    // Clear existing data (in reverse dependency order)
    cy.task('queryDb', 'DELETE FROM sales');
    cy.task('queryDb', 'DELETE FROM plants');
    cy.task('queryDb', 'DELETE FROM categories');
    
    // Seed Categories
    data.categories.forEach((category: any, index: number) => {
      const id = index + 1; // Assuming 1-based IDs
      const parentId = category.parent_id === null ? 'NULL' : category.parent_id;
      const query = `INSERT INTO categories (id, name, parent_id) VALUES (${id}, '${category.name}', ${parentId})`;
      cy.task('queryDb', query);
    });

    // Seed Plants
    data.plants.forEach((plant: any, index: number) => {
      const id = index + 1;
      const query = `INSERT INTO plants (id, name, price, quantity, category_id) VALUES (${id}, '${plant.name}', ${plant.price}, ${plant.quantity}, ${plant.category_id})`;
      cy.task('queryDb', query);
    });

    // Seed Sales
    data.sales.forEach((sale: any, index: number) => {
      const id = index + 1;
      const query = `INSERT INTO sales (id, plant_id, quantity, total_price, sold_at) VALUES (${id}, ${sale.plant_id}, ${sale.quantity}, ${sale.total_price}, '${sale.sold_at.replace('T', ' ').replace('Z', '')}')`;
      cy.task('queryDb', query);
    });
  });
});
