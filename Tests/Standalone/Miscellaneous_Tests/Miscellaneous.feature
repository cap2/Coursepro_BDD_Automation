@P1
@Miscellaneous
Feature: Miscellaneous Tests
  Login
  Logout
  Switch Leisure Centre
  User Permissions

  Scenario: Login with valid credentials
    Given Im on the login page for coursepro
    When I successfully login
    Then I should see overview screen

  Scenario: Logout
    Given Im logged in
    When I click the logout button
    Then I should see the homepage

  Scenario: Switch Leisure Centre
    Given Im logged in
    When I click the leisure centre button
    Then I should be able to switch leisure centres

  Scenario: User Permissions
    Given Im logged in as a none root user
    When I click the leisure centre button for lead
    Then I should not be able to switch leisure centres