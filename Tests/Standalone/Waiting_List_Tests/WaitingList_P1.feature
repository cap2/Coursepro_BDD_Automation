@P1
@Standalone
@Waiting_List_Tests
Feature: Waiting List Tests
  Add to existing waiting list
  Add to new waiting list

  Scenario: Add to existing waiting list
    Given Im logged in
    When  I click the waiting list page
    Then  I should be able to add to an existing list

  Scenario: Add to new waiting list
    Given Im logged in
    When  I click the waiting list page
    Then  I should be able to add to a new list