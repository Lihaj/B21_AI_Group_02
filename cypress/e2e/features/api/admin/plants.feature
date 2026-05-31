@api @admin @plants
Feature: Admin - Plants API

  Background:
    Given User is authenticated as admin

  @215523H @API_Plant_Create_001
  Scenario: Create plant with parent category as Admin
    When I send a POST request to create plant with plant data and category id "1"
      | name        | price | quantity |
      | Snake Plant | 25    | 60       |
    Then the response status should be 400
    And the response body should contain the error message "Plants can only be added to sub-categories"