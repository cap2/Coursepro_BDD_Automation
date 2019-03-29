@P1
@Standalone
@Member_Tests
Feature: Member Tests
  Search Member
  Add Member
  Add Membership
  View Financial Information

  Scenario: Search Member
    Given Im logged in
    When  I go to the member page
    Then  I should be able to search for a member

  Scenario: Add Member
    Given Im logged in
    When  I go to the member page
    Then  I should be able to add a member

  Scenario: Add Membership
    Given Im logged in
    When  I go to the member page
    Then  I should be able to add a membership

  Scenario: View Financial Information
    Given Im logged in
    When  I go to the member page
    Then  I should be able to view a financial screen