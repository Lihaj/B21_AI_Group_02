@api @user @sales
Feature: User - Sales API

  Background:
    Given User is authenticated as user

  @215523H @API_Sales_Create_002
  Scenario: Create new sale with valid data as normal user
    When I send a POST request to create sale for plant id "1" with quantity "1"
    Then the response status should be 403

  @215523H @API_Sales_Read_001
  Scenario: Sort sales by invalid property name as normal user
    When I send a GET request to search sales page "0" size "1" sort by "profit"
    Then the response status should be 500
    And the response body should contain the error message "No property 'profit' found for type 'Sale'"

  @215521B @API_Sales_Read_005
  Scenario: User can retrieve all sales successfully
    When I send a GET request to retrieve all sales
    Then the response status should be 200
    And the response body should contain a list of sales with valid fields

  @215521B @API_Sales_Delete_002
  Scenario: Non-Admin user is forbidden from deleting a sale
    When I send a DELETE request to delete sale with id "1" as user
    Then the response status should be 403