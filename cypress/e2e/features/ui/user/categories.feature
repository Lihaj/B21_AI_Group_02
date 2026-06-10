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