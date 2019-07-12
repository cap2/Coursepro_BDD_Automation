@P1
@Standalone
@HomePortal_Tests
Feature: HomePortal Tests
  Register for HomePortal
  View Progress on HomePortal
  Quick Activation on HomePortal
  HomePortal Topups - Continuous
  HomePortal Topups - Fixed
  HomePortal movements - Continuous
  HomePortal movements - Fixed

  Scenario: Register for HomePortal
    Given Im on the HomePortal Page after getting member data
    Then I should be able to Register for HomePortal

  Scenario: View Progress on HomePortal
    Given Im on the HomePortal Page
    When I login to HomePortal with User 1
    Then I should be able to View Progress on HomePortal

  Scenario: Quick Activation on HomePortal
    Given Im on the HomePortal Page
    When I login to HomePortal with User 1
    Then I should be able to use Quick Activation on HomePortal

  Scenario: HomePortal Topups - Continuous
    Given Im on the HomePortal Page
    When I login to HomePortal with User 1
    Then I should be able to Topup - Continuous

  Scenario: HomePortal Topups - Fixed
    Given Im on the HomePortal Page
    When I login to HomePortal with User 1
    Then I should be able to Topup - Fixed

  Scenario: HomePortal movements - Continuous
    Given Im on the HomePortal Page
    When I login to HomePortal with User 1
    Then I should be able to move - Continuous

  Scenario: HomePortal movements - Fixed
    Given Im on the HomePortal Page
    When I login to HomePortal with User 1
    Then I should be able to move - Fixed