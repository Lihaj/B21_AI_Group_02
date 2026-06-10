@ui @admin @sales
Feature: Admin - Sales UI

  Background:
    Given User is login as admin

  @215523H @UI_Sales_Delete_001
  Scenario: Admin sees a confirmation before deleting a sale
    When I navigate to the sales page
    And I click on the first delete button on the sales page
    Then I should see the sale delete confirmation prompt
    And I should stay on the sales page