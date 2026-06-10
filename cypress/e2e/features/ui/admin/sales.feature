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

  @215521B @UI_Sales_Create_001
  Scenario: Admin can create a sale successfully and stock is reduced
    When I navigate to the sales page
    And I click on the "Sell Plant" button on the sales page
    And I select a plant with id "1"
    And I enter a valid quantity "2"
    And I click the sell save button
    Then the sale should be created successfully
    And I should be redirected to the sales list page

  @215521B @UI_Sales_Create_002
  Scenario: Admin sees quantity validation when entering quantity 0
    When I navigate to the sales page
    And I click on the "Sell Plant" button on the sales page
    And I enter a valid quantity "0"
    And I click the sell save button
    Then I should see the quantity validation message

  @215521B @UI_Sales_Cancel_001
  Scenario: Admin is redirected back to sales list when cancel is clicked on sales page
    When I navigate to the sales page
    And I click on the cancel link on the sales page
    Then I should be on the sales list page

  @215521B @UI_Sales_Cancel_002
  Scenario: Admin is redirected back to sales list when cancel is clicked on sell plant page
    When I navigate to the sales page
    And I click on the "Sell Plant" button on the sales page
    And I click on the cancel link on the sell plant page
    Then I should be on the sales list page