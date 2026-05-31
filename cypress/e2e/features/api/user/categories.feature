@api @user @categories
Feature: User - Categories API

  Background:
    Given User is authenticated as user

  @215523H @API_Category_Read_001
  Scenario: View specific category details as normal user
    When I send a GET request to view category with id "5"
    Then the response status should be 200
    And the retrieved category with id "5" should have the name "Foliage"