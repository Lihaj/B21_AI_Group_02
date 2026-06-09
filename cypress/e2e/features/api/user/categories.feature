@api @user @categories
Feature: User - Categories API

  Background:
    Given User is authenticated as user

  @215523H @API_Category_Read_001
  Scenario: View specific category details as normal user
    When I send a GET request to view category with id "5"
    Then the response status should be 200
    And the retrieved category with id "5" should have the name "Foliage"

  @215566P @API_Category_Read_002
  Scenario: Search categories by name as normal user
    When I send a GET request to search categories by name "Foliage"
    Then the response status should be 200

  @215566P @API_Category_Delete_003
  Scenario: Delete a category as a normal user 
    When I send a DELETE request to delete category with id "1"
    Then the response status should be 403
    And the response body should contain the error message "Forbidden"

  @215566P @API_Category_Create_004
  Scenario: Create a category as a normal user
    When I send a POST request to create category with category name "tess"
    Then the response status should be 403