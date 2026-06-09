@api @admin @categories
Feature: Admin - Categories API

  Background:
    Given User is authenticated as admin

  @215523H @API_Category_Create_001
  Scenario: Create parent category with name less than 3 characters as Admin
    When I send a POST request to create category with category name "ab"
    Then the response status should be 400
    And the response body should contain the error message "Category name must be between 3 and 10 characters"

  @215566P @API_Category_Create_002
  Scenario: Create a category with valid data as Admin
    When I send a POST request to create category with category name "Gardner"
    Then the response status should be 201

  @215566P @API_Category_Create_003
  Scenario: Create a category without a name as Admin
    When I send a POST request to create category without category name
    Then the response status should be 400
    And the response body should contain the error message "Category name is mandatory"

  @215523H @API_Category_Update_001
  Scenario: Update category with valid data as Admin
    When I send a PUT request to update category with id "1" and category name "UpdatedCat"
    Then the response status should be 200
    And the retrieved category with id "1" should have the name "UpdatedCat"

  @215566P @API_Category_Update_003
  Scenario: Update a non-existing category as Admin
    When I send a PUT request to update category with id "9999" and category name "Update"
    Then the response status should be 404
    And the response body should contain the error message "Category not found"

  @215523H @API_Category_Delete_001
  Scenario: Delete parent category with sub categories as Admin
    When I send a DELETE request to delete category with id "2"
    Then the response status should be 400
    And the response body should contain the error message "Cannot delete category. Please delete sub-categories first"

  @215566P @API_Category_Delete_002
  Scenario: Delete an existing category as Admin
    When I send a POST request to create category with category name "Temp"
    Then the response status should be 201
    When I send a DELETE request to delete the category from previous response
    Then the response status should be 204

  @215566P @API_Category_Delete_004
  Scenario: Delete a non-existing category as Admin
    When I send a DELETE request to delete category with id "-1"
    Then the response status should be 404
    And the response body should contain the error message "Category not found"
