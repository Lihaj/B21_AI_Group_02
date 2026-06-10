@ui @user @plants
Feature: User - Plants UI

  Background:
    Given User is login as user

  @215503X @UI_Plant_Read_002
  Scenario: View plant list as normal user
    Given at least one plant exists
    When I navigate to the plants page
    Then the plant list page loads successfully in read-only mode

  @215503X @UI_Plant_Read_004
  Scenario: Verify "Add a Plant" button is hidden for normal user
    Given at least one plant exists
    When I navigate to the plants page
    Then the Add a Plant button is hidden or disabled for normal user

  @215503X @UI_Plant_Read_005
  Scenario: Search plant by name (User)
    Given at least one plant exists
    When I navigate to the plants page
    And I enter plant name "Monstera" in search field
    Then only matching plants are displayed

  @215503X @UI_Plant_Read_006
  Scenario: Filter plants by category "Flowering" (User)
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

