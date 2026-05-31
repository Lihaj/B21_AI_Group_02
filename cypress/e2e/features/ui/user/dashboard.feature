@ui @user @dashboard
Feature: User - Dashboard UI

  Background:
    Given User is login as user

  @215523H @UI_Dashboard_Read_001
  Scenario: Dashboard shows number of Main and Sub categories
    Given There are "2" main categories and "5" sub categories in the system
    When I navigate to the dashboard page
    Then I should see "2" main and "5" sub categories in the dashboard category card

  @215523H @UI_Dashboard_Read_002
  Scenario: Dashboard shows number of total plants
    Given There are 10 plants in the system
    When I navigate to the dashboard page
    Then I should see "10" plants in the dashboard plants card

  @215523H @UI_Dashboard_Read_003
  Scenario: Dashboard shows number of total sales
    Given There are 15 sales in the system
    When I navigate to the dashboard page
    Then I should see "15" sales in the dashboard sales card

  @215523H @UI_Dashboard_Read_004
  Scenario: Dashboard shows total sales revenue
    Given There are sales in the system
    When I navigate to the dashboard page
    Then I should see correct sales revenue in the dashboard sales card

  @215523H @UI_Dashboard_Read_005
  Scenario: Dashboard's "Manage Category" button navigate to category page
    When I navigate to the dashboard page
    And I click on the Manage Categories button
    Then I should be navigated to the categories page
