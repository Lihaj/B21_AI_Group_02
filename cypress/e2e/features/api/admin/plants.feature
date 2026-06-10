@api @admin @plants
Feature: Admin - Plants API

  Background:
    Given User is authenticated as admin

  @215523H @API_Plant_Create_001
  Scenario: Create plant with parent category as Admin
    When I send a POST request to create plant with plant data and category id "1"
      | name      | price | quantity |
      | New Plant | 25    | 60       |
    Then the response status should be 400
    And the response body should contain the error message "Plants can only be added to sub-categories"

  @215503X @API_Plant_Create_002
  Scenario: Create plant with valid data as Admin
    When I send a POST request to create plant with plant data and category id "3"
      | name         | price | quantity |
      | New Plant 01 | 25    | 60       |
    Then the response status should be 201
    And the response body should contain created plant details

  @215503X @API_Plant_Update_001
  Scenario: Update plant with valid data as Admin
    When I send a POST request to create plant with plant data and category id "3"
      | name            | price | quantity |
      | Plant to Update | 20    | 50       |
    When I send a PUT request to update plant with id "createdPlantId" with plant data
      | name      | price | quantity |
      | New Plant | 30    | 70       |
    Then the response status should be 200
    And the response body should contain updated plant details

  @215503X @API_Plant_Create_003
  Scenario: Create plant without name as Admin
    When I send a POST request to create plant with plant data and category id "3"
      | name | price | quantity |
      |      | 25    | 60       |
    Then the response status should be 400
    And the response body should contain the error message "Plant name"

  @215503X @API_Plant_Create_004
  Scenario: Create plant with invalid name length as Admin
    When I send a POST request to create plant with plant data and category id "1"
      | name | price | quantity |
      | Ab   | 25    | 60       |
    Then the response status should be 400
    And the response body should contain the error message "Plant name must be between 3 and 25 characters"

  @215503X @API_Plant_Create_005
  Scenario: Create plant with zero or negative price as Admin
    When I send a POST request to create plant with plant data and category id "1"
      | name         | price | quantity |
      | New Plant 01 | 0     | 60       |
    Then the response status should be 400
    And the response body should contain the error message "Price must be greater than 0"

  @215503X @API_Plant_Create_006
  Scenario: Create plant with negative quantity as Admin
    When I send a POST request to create plant with plant data and category id "1"
      | name         | price | quantity |
      | New Plant 01 | 25    | -1       |
    Then the response status should be 400
    And the response body should contain the error message "Quantity cannot be negative"

  @215503X @API_Plant_Delete_001
  Scenario: Delete existing plant as Admin
    When I send a POST request to create plant with plant data and category id "3"
      | name          | price | quantity |
      | Plant to Delete | 15    | 40       |
    When I send a DELETE request to delete plant with id "createdPlantId"
    Then the response status should be 204
    And the plant with id "createdPlantId" should not exist

  @215503X @API_Plant_Read_003
  Scenario: View all plants as Admin
    Given at least one plant exists
    When I send a GET request to retrieve all plants
    Then the response status should be 200
    And the response body should contain a non-empty plant list