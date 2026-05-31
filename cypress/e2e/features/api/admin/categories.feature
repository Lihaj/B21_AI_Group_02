@api @admin @categories
Feature: Admin - Categories API

  Background:
    Given User is authenticated as admin

  @215523H @API_Category_Create_001
  Scenario: Create parent category with name less than 3 characters as Admin
    When I send a POST request to create category with category name "ab"
    Then the response status should be 400
    And the response body should contain the error message "Category name must be between 3 and 10 characters"

  @215523H @API_Category_Update_001
  Scenario: Update category with valid data as Admin
    When I send a PUT request to update category with id "1" and category name "UpdatedCat"
    Then the response status should be 200
    And the retrieved category with id "1" should have the name "UpdatedCat"

  @215523H @API_Category_Delete_001
  Scenario: Delete parent category with sub categories as Admin
    When I send a DELETE request to delete category with id "2"
    Then the response status should be 500
    And the response body should contain the error message "Cannot delete category. Please delete sub-categories first"
