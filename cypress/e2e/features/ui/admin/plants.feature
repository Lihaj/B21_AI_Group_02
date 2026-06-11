@ui @admin @plants
Feature: Admin - Plants UI

  Background:
    Given User is login as admin

  @215503X @UI_Plant_Read_001
  Scenario: View plant list as Admin
    Given at least one plant exists
    When I navigate to the plants page
    Then I should be navigated back to the plants page
    And I should see "10" plants in the plant list

  @215503X @UI_Plant_Read_003
  Scenario: Verify "Add a Plant" button for Admin
    Given at least one plant exists
    When I navigate to the plants page
    Then the Add a Plant button is visible only for Admin

  @215503X @UI_Plant_Create_001
  Scenario: Add a plant with valid data as Admin
    Given at least one plant exists
    When I navigate to the plants page
    And I click on the "Add a Plant" button
    And I fill the plant form with valid details:
      | name     | category | price | quantity |
      | Monstera | 3        | 25    | 10       |
    And I click on the "Save" button on the plant form
    Then I should be navigated back to the plants page
    And I should see the plant "Monstera" in the plant list

  @215503X @UI_Plant_Create_002
  Scenario: Add plant with empty fields
    Given at least one plant exists
    When I navigate to the plants page
    And I click on the "Add a Plant" button
    And I leave all required fields empty
    And I click on the "Save" button on the plant form
    Then validation messages are displayed for Name, Category, Price and Quantity

  @215503X @UI_Plant_Create_003
  Scenario: Add plant with invalid price
    Given at least one plant exists
    When I navigate to the plants page
    And I click on the "Add a Plant" button
    And I fill the plant form with details:
      | name    | category | price | quantity |
      | TestBad | 3        | 0     | 5        |
    And I click on the "Save" button on the plant form
    Then I should see the price validation message

  @215503X @UI_Plant_Read_006
  Scenario: Filter plants by category "Flowering" (Admin)
    Given the following plants exist in category "Flowering":
      | name      |
      | Rose      |
      | Sunflower |
      | Tulip     |
    When I filter plants by category "Flowering"
    Then I should see the following plants in the list:
      | name      |
      | Rose      |
      | Sunflower |
      | Tulip     |

  @215503X @UI_Plant_Read_007
  Scenario: Verify Low badge for low quantity
    Given at least one plant exists
    When I navigate to the plants page
    And I click on the "Add a Plant" button
    And I fill the plant form with details:
      | name      | category | price | quantity |
      | Baby Leaf | 3        | 5     | 4        |
    And I click on the "Save" button on the plant form
    Then the Low badge is displayed for the plant with quantity below 5

  @215523H @UI_Plant_Update_002
  Scenario: Admin sees price validation when updating plant with negative price
    When I navigate to the plant edit page for plant id "3" with the following plant data:
      | name  | price | quantity |
      | Ficus | -45   | 25       |
    And I click on the "Save" button on the plant form
    Then I should stay on the plant edit page
    And I should see the price validation message

  @215523H @UI_Plant_Create_004
  Scenario: Admin can cancel plant creation
    When I navigate to the plants page
    And I click on the "Add a Plant" button
    And I click on the "Cancel" link
    Then I should be navigated back to the plants page
    And I should see "10" plants in the plant list
