/// <reference types="cypress" />
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I send a DELETE request to delete category with id {string}', function (categoryId: string) {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).as('response')
    })
  })
})

When('I send a POST request to create category with category name {string}', function (categoryName: string) {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/categories`,
        headers: { Authorization: `Bearer ${token}` },
        body: { name: categoryName },
        failOnStatusCode: false
      }).as('response')
    })
  })
})


When('I send a PUT request to update category with id {string} and category name {string}', function (categoryId: string, categoryName: string) {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        body: { name: categoryName },
        failOnStatusCode: false
      }).as('response')
    })
  })
})

Then('the retrieved category with id {string} should have the name {string}', (categoryId: string, categoryName: string) => {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(categoryName);
      });
    });
  });
});

When('I send a GET request to view category with id {string}', (categoryId: string) => {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).as('response')
    })
  })
})
