@ui @admin @categories
Feature: Admin - Categories UI

  Background:
    Given User is login as admin

  @215523H @UI_Category_Create_001
  Scenario: "Add A Category" button visibility for admin
    When I navigate to the categories page
    Then I should see the "Add A Category" button in the page header
