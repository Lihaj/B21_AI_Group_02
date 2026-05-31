@api @admin @sales
Feature: Admin - Sales API

  Background:
    Given User is authenticated as admin

  @215523H @API_Sales_Create_001
  Scenario: Create sale with invalid quantity as Admin user
    When I send a POST request to create sale for plant id "1" with quantity "102"
    Then the response status should be 400
    And the response body should contain the error message "Aloe Vera has only 100 items available in stock"
    