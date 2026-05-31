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
