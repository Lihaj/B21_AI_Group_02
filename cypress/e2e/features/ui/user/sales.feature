@ui @user @sales
Feature: User - Sales UI

  Background:
    Given User is login as user

  @215521B @UI_Sales_Read_002
  Scenario: User can sort sales by Quantity column
    When I navigate to the sales page
    And I click on the quantity column header
    Then the sales should be sorted by quantity

  @215521B @UI_Sales_Read_004
  Scenario: User can view the sales list
    When I navigate to the sales page
    Then I should be on the sales list page
    And the sales list should be visible

  @215521B @UI_Sales_Read_005
  Scenario: Sales are sorted by Sold Date descending by default
    When I navigate to the sales page
    Then the sales should be sorted by sold date in descending order

  @215521B @UI_Sales_Read_006
  Scenario: No sales message is displayed when no sales exist
    When I navigate to the sales page
    Then I should see the no sales message

  @215521B @UI_Sales_Read_007
  Scenario: User can sort sales by Quantity column header
    When I navigate to the sales page
    And I click on the quantity column header
    Then the sales should be sorted by quantity