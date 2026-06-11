@ui @admin @categories
Feature: Admin - Categories UI

  Background:
    Given User is login as admin

  @215523H @UI_Category_Create_001
  Scenario: "Add A Category" button visibility for admin
    When I navigate to the categories page
    Then I should see the "Add A Category" button in the page header

  @215523H @UI_Category_Create_002
  Scenario: Admin sees Category Name validation when saving empty category form
    When I navigate to the categories add page
    And I click on the "Save" button on the category form
    Then I should stay on the categories add page
    And I should see the Category Name validation messages

  @215566P @UI_Category_Create_003
  Scenario: Add new category with valid data as Admin
    When I navigate to the categories page
    And I click the "Add A Category" button
    And I enter "NewCat1" in the category name field
    And I select "Indoor" from the parent category dropdown
    And I click on the "Save" button on the category form
    Then I should see the Category created successfully message
    And I should be redirected to the categories page
    And I should see matching categories for "NewCat1"
