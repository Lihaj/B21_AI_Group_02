@ui @admin @plants
Feature: Admin - Plants UI

  Background:
    Given User is login as admin

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
