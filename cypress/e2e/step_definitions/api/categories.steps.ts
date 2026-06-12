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

When('I send a POST request to create category without category name', function () {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/categories`,
        headers: { Authorization: `Bearer ${token}` },
        body: {},
        failOnStatusCode: false
      }).as('response')
    })
  })
})

When('I send a DELETE request to delete the category from previous response', function () {
  cy.get<Cypress.Response<any>>('@response').then((response) => {
    const categoryId = response.body?.id
    if (!categoryId) {
      throw new Error('Created category id is missing from response body')
    }
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

When('I send a GET request to search categories by name {string}', (categoryName: string) => {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/categories?name=${encodeURIComponent(categoryName)}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).as('response')
    })
  })
})

When('I send a GET request to filter categories by parent id {string}', (parentId: string) => {
  cy.get('@token').then((token) => {
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/categories?parentId=${parentId}`,
        headers: { Authorization: `Bearer ${token}` },
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