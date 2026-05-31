@api @user @plants
Feature: User - Plants API

  Background:
    Given User is authenticated as user

  @215523H @API_Plant_Read_001
  Scenario: View non-existent plant details as normal user
    When I send a GET request to view plant with id "25"
    Then the response status should be 404
    And the response body should contain the error message "Plant not found"

  @215523H @API_Plant_Read_002
  Scenario: Search plant with non-existent plant name as normal user
    When I send a GET request to search plants by name "Daffodils" page "0" size "1"
    Then the response status should be 200
    And the plant list should be empty