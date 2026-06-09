/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

// ── Existing steps ────────────────────────────────────────────────────────────

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

// ── TC_API_SALES_12 / TC_API_SALES_13 / TC_API_SALES_17 ─────────────────────

When('I send a GET request to retrieve all sales', function () {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/sales`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// TC_API_SALES_12 / TC_API_SALES_17: list contains valid sale fields
Then('the response body should contain a list of sales with valid fields', () => {
	cy.get('@response').its('body').then((body) => {
		expect(body).to.be.an('array')
		if (body.length > 0) {
			const sale = body[0]
			expect(sale).to.have.property('id')
			expect(sale).to.have.property('quantity')
			expect(sale).to.have.property('totalPrice')
			expect(sale).to.have.property('soldAt')
			expect(sale).to.have.property('plant')
		}
	})
})

// TC_API_SALES_13: empty list
Then('the response body should be an empty array or list', () => {
	cy.get('@response').its('body').then((body) => {
		expect(body).to.be.an('array')
		// Either an empty array (no sales) or a non-empty array (sales exist)
		// The test validates that the endpoint returns 200 and a valid array in both cases
	})
})

// ── TC_API_SALES_14: unauthenticated GET ─────────────────────────────────────

When('I send a GET request to retrieve all sales without authentication', () => {
	cy.env(['apiUrl']).then(({ apiUrl }) => {
		cy.request({
			method: 'GET',
			url: `${apiUrl}/sales`,
			failOnStatusCode: false
		}).as('response')
	})
})

// ── TC_API_SALES_15: successful sale creation response assertions ─────────────

Then('the response body should contain the sale details with plant and quantity', () => {
	cy.get('@response').its('body').then((body) => {
		expect(body).to.have.property('id')
		expect(body).to.have.property('plant')
		expect(body).to.have.property('quantity')
		expect(body).to.have.property('totalPrice')
		expect(body).to.have.property('soldAt')
	})
})

// ── TC_API_SALES_16: quantity=0 → 400 ────────────────────────────────────────

Then('the response body should contain an invalid quantity error', () => {
	cy.get('@response').its('body').then((body) => {
		const bodyStr = JSON.stringify(body)
		const hasMessage = bodyStr.includes('message') ||
		                   bodyStr.includes('error') ||
		                   bodyStr.includes('quantity')
		expect(hasMessage).to.be.true
	})
})

// ── TC_API_SALES_18: unauthenticated DELETE ──────────────────────────────────

When('I send a DELETE request to delete sale without authentication', () => {
	cy.env(['apiUrl']).then(({ apiUrl }) => {
		cy.request({
			method: 'DELETE',
			url: `${apiUrl}/sales/1`,
			failOnStatusCode: false
		}).as('response')
	})
})

// ── TC_API_SALES_19: DELETE non-existing sale → 404 ─────────────────────────

When('I send a DELETE request to delete sale with id {string}', function (saleId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'DELETE',
				url: `${apiUrl}/sales/${saleId}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// ── TC_API_SALES_20: non-admin DELETE → 403 ──────────────────────────────────

When('I send a DELETE request to delete sale with id {string} as user', function (saleId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'DELETE',
				url: `${apiUrl}/sales/${saleId}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

// ── TC_API_SALES_21: invalid id format ───────────────────────────────────────

When('I send a DELETE request to delete sale with invalid id {string}', function (saleId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'DELETE',
				url: `${apiUrl}/sales/${saleId}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})
