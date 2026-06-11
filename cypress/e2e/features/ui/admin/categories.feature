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

  @215566P @UI_Category_Delete_002
  Scenario: Delete category as Admin
    When I navigate to the categories page
    And I save the first category name
    And I click the Delete button on a category
    Then I should see the category delete confirmation prompt
    And I should see the Category deleted successfully message
    And the deleted category should not appear in the list

  @215566P @UI_Category_Update_001
  Scenario: Edit existing category with valid data as Admin
    When I navigate to the categories page
    And I save the first category name
    And I click the Edit button on a category
    And I enter "UpdCat1" in the category name field
    And I click on the "Save" button on the category form
    Then I should see the Category updated successfully message
    And I should be redirected to the categories page
    And I should see matching categories for "UpdCat1"
