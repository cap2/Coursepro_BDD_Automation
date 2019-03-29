@P1
@Standalone
@Settings_Tests
Feature: Settings Tests
  Create new User
  Create new Contact Trigger

  Scenario: Create New User
    Given Im logged in
    When  I click the user settings page
    Then  I should be able to create a new user

  Scenario: Create new Contact Trigger
    Given Im logged in
    When  I click the member settings page
    Then  I should be able to create a new contact trigger