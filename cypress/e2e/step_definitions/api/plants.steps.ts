/// <reference types="cypress" />
import { DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('at least one plant exists', function () {
	cy.loginAsAdmin().then(() => {
		cy.get('@token').then((token) => {
			cy.env(['apiUrl']).then(({ apiUrl }) => {
				cy.request({
					method: 'GET',
					url: `${apiUrl}/plants`,
					headers: { Authorization: `Bearer ${token}` },
					failOnStatusCode: false
				}).then((response) => {
					if (Array.isArray(response.body) && response.body.length > 0) {
						return
					}
					cy.request({
						method: 'POST',
						url: `${apiUrl}/plants/category/1`,
						headers: { Authorization: `Bearer ${token}` },
						body: {
							name: 'Test Plant',
							price: 10,
							quantity: 10
						},
						failOnStatusCode: false
					}).as('response')
				})
			})
		})
	})
})

When('I send a GET request to view plant with id {string}', function (plantId: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/plants/${plantId}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

When('I send a GET request to search plants by name {string} page {string} size {string}', function (name: string, page: string, size: string) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/plants/paged?name=${encodeURIComponent(name)}&page=${page}&size=${size}`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

When('I send a GET request to retrieve all plants', function () {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			cy.request({
				method: 'GET',
				url: `${apiUrl}/plants`,
				headers: { Authorization: `Bearer ${token}` },
				failOnStatusCode: false
			}).as('response')
		})
	})
})

When('I send a POST request to create plant with plant data and category id {string}', function (categoryId: string, dataTable: DataTable) {
	cy.get('@token').then((token) => {
		cy.env(['apiUrl']).then(({ apiUrl }) => {
			const plantData = dataTable.hashes()[0]
			cy.request({
				method: 'POST',
				url: `${apiUrl}/plants/category/${categoryId}`,
				headers: { Authorization: `Bearer ${token}` },
				body: {
					name: plantData.name,
					price: Number(plantData.price),
					quantity: Number(plantData.quantity)
				},
				failOnStatusCode: false
			}).as('response').then((resp) => {
				if (resp.status === 201) {
					cy.wrap(resp.body.id).as('createdPlantId')
				}
			})
		})
	})
})

When('I send a PUT request to update plant with id {string} with plant data', function (plantId: string, dataTable: DataTable) {
	let idToUpdate = plantId
	if (plantId === 'createdPlantId') {
		cy.get('@createdPlantId').then((id) => {
			idToUpdate = String(id)
			cy.get('@token').then((token) => {
				cy.env(['apiUrl']).then(({ apiUrl }) => {
					const plantData = dataTable.hashes()[0]
					cy.request({
						method: 'PUT',
						url: `${apiUrl}/plants/${idToUpdate}`,
						headers: { Authorization: `Bearer ${token}` },
						body: {
							name: plantData.name,
							price: Number(plantData.price),
							quantity: Number(plantData.quantity)
						},
						failOnStatusCode: false
					}).as('response')
				})
			})
		})
	} else {
		cy.get('@token').then((token) => {
			cy.env(['apiUrl']).then(({ apiUrl }) => {
				const plantData = dataTable.hashes()[0]
				cy.request({
					method: 'PUT',
					url: `${apiUrl}/plants/${plantId}`,
					headers: { Authorization: `Bearer ${token}` },
					body: {
						name: plantData.name,
						price: Number(plantData.price),
						quantity: Number(plantData.quantity)
					},
					failOnStatusCode: false
				}).as('response')
			})
		})
	}
})

When('I send a DELETE request to delete plant with id {string}', function (plantId: string) {
	let idToDelete = plantId
	if (plantId === 'createdPlantId') {
		cy.get('@createdPlantId').then((id) => {
			idToDelete = String(id)
			cy.get('@token').then((token) => {
				cy.env(['apiUrl']).then(({ apiUrl }) => {
					cy.request({
						method: 'DELETE',
						url: `${apiUrl}/plants/${idToDelete}`,
						headers: { Authorization: `Bearer ${token}` },
						failOnStatusCode: false
					}).as('response')
				})
			})
		})
	} else {
		cy.get('@token').then((token) => {
			cy.env(['apiUrl']).then(({ apiUrl }) => {
				cy.request({
					method: 'DELETE',
					url: `${apiUrl}/plants/${plantId}`,
					headers: { Authorization: `Bearer ${token}` },
					failOnStatusCode: false
				}).as('response')
			})
		})
	}
})

Then('the plant with id {string} should not exist', function (plantId: string) {
	let idToCheck = plantId
	if (plantId === 'createdPlantId') {
		cy.get('@createdPlantId').then((id) => {
			idToCheck = String(id)
			cy.get('@token').then((token) => {
				cy.env(['apiUrl']).then(({ apiUrl }) => {
					cy.request({
						method: 'GET',
						url: `${apiUrl}/plants/${idToCheck}`,
						headers: { Authorization: `Bearer ${token}` },
						failOnStatusCode: false
					}).its('status').should('eq', 404)
				})
			})
		})
	} else {
		cy.get('@token').then((token) => {
			cy.env(['apiUrl']).then(({ apiUrl }) => {
				cy.request({
					method: 'GET',
					url: `${apiUrl}/plants/${plantId}`,
					headers: { Authorization: `Bearer ${token}` },
					failOnStatusCode: false
				}).its('status').should('eq', 404)
			})
		})
	}
})

Then('the plant list should be empty', () => {
	cy.get('@response').its('body.content').should('be.an', 'array').and('have.length', 0)
})

Then('the response body should contain created plant details', () => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.be.an('object')
    expect(body).to.have.property('id')
    expect(body).to.have.property('name')
    expect(body).to.have.property('price')
    expect(body).to.have.property('quantity')
    expect(body).to.have.property('category')
  })
})

Then('the response body should contain updated plant details', () => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.be.an('object')
    expect(body).to.have.property('name')
    expect(body).to.have.property('price')
    expect(body).to.have.property('quantity')
  })
})

Then('the response body should contain a non-empty plant list', () => {
  cy.get('@response').its('body').then((body) => {
    expect(body).to.be.an('array')
    expect(body.length).to.be.greaterThan(0)
  })
})