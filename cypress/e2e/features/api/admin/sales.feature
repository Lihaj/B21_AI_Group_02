@api @admin @sales
Feature: Admin - Sales API

  Background:
    Given User is authenticated as admin

  @215523H @API_Sales_Create_001
  Scenario: Create sale with invalid quantity as Admin user
    When I send a POST request to create sale for plant id "1" with quantity "102"
    Then the response status should be 400
    And the response body should contain the error message "Aloe Vera has only 100 items available in stock"

  @215521B @API_Sales_Read_001 
  Scenario: Admin can retrieve all sales successfully
    When I send a GET request to retrieve all sales
    Then the response status should be 200
    And the response body should contain a list of sales with valid fields

  @215521B @API_Sales_Create_002
  Scenario: Admin can successfully sell a plant with valid quantity
    When I send a POST request to create sale for plant id "2" with quantity "20"
    Then the response status should be 201
    And the response body should contain the sale details with plant and quantity

  @215521B @API_Sales_Create_003
  Scenario: Admin cannot sell a plant with quantity 0
    When I send a POST request to create sale for plant id "2" with quantity "0"
    Then the response status should be 400
    And the response body should contain an invalid quantity error

  @215521B @API_Sales_Delete_001
  Scenario: Unauthenticated user cannot delete a sale
    When I send a DELETE request to delete sale without authentication
    Then the response status should be 401

  @215521B @API_Sales_Read_002
  Scenario: Admin gets 404 when sale ID does not exist
    When I send a DELETE request to delete sale with id "999999"
    Then the response status should be 404

  @215521B @API_Sales_Delete_002
  Scenario: Admin receives 500 when backend fails during a sales deletion request
    When I send a DELETE request to delete sale with invalid id "abc"
    Then the response status should be 500