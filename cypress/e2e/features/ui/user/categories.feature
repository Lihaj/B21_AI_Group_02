@ui @user @categories
Feature: User - Categories UI

  Background:
    Given User is login as user

  @215566P @UI_Category_Read_001
  Scenario: View the category list with pagination as a normal user
    When I navigate to the categories page
    And I observe the category list
    And I scroll to the bottom of the page
    Then I should see pagination controls
    When I navigate to the next page
    Then the category list should update to the next page

  @215566P @UI_Category_Read_002
  Scenario: Search category by name as a normal user
    When I navigate to the categories page
    And I enter "Fruits" in the category search box
    And I click the Search button
    Then I should see matching categories for "Fruits"

  @215566P @UI_Category_Read_003
  Scenario: Filter categories by parent category as a normal user
    When I navigate to the categories page
    And I select "Indoor" from the parent category dropdown
    And I click the Search button
    Then I should see only categories with parent "Indoor"

  @215566P @UI_Category_Read_004
  Scenario: Reset the category search and filters as a normal user
    When I navigate to the categories page
    And I enter "Fruits" in the category search box
    And I click the Search button
    And I click the Reset button
    Then the category search should be reset
    And the full category list should be displayed again