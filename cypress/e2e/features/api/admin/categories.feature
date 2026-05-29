@api @admin @categories
Feature: Admin - Categories API

  Background:
    Given User is authenticated as admin

  @215523H @API_Category_Create_001
  Scenario: Create parent category with name less than 3 characters as Admin
    When I send a POST request to create category with fixture data "shortCategoryName"
    Then the response status should be 400
    And the response body should contain the error message "Category name must be between 3 and 10 characters"

  @215523H @API_Category_Update_001
  Scenario: Update category with valid data as Admin
    When I send a PUT request to update category with fixture data "validCategoryUpdate"
    Then the response status should be 200
