/// <reference types="cypress" />
import { When } from '@badeball/cypress-cucumber-preprocessor'

When('I send a GET request to search sales page {string} size {string} sort by {string}', function (page: string, size: string, sortKey: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/sales/page?page=${page}&size=${size}&sort=${sortKey}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

When('I send a POST request to create sale for plant id {string} with quantity {string}', function (plantId: string, quantity: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'POST',
				url: `${apiUrl}/sales/plant/${plantId}?quantity=${quantity}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})
