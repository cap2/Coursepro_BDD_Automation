@P1
@Standalone
@Portable_Devices_Tests
Feature: Portable Devices Tests
  Can login to device
  Can mark attendance
  Can assess by pupil
  Can assess by competency
  Can mark a member as ready to move
  Can view medical and payment alerts on each device type

  Scenario: Can login to device
    Given Im logged in
    When  I go to the ipod device
    Then  I should be able to login to device

  Scenario: Can mark attendance
    Given Im logged in
    When  I go to the ipod device
    Then  I should be able to login to device
    Then  I should be able to mark attendance

  Scenario: Can assess by pupil
    Given Im logged in
    When  I go to the ipod device
    Then  I should be able to login to device
    Then  I should be able to assess by pupil

  Scenario: Can assess by competency
    Given Im logged in
    When  I go to the ipod device
    Then  I should be able to login to device
    Then  I should be able to assess by competency

  Scenario: Can mark a member as ready to move
    Given Im logged in
    When  I go to the ipod device
    Then  I should be able to login to device
    Then  I should be mark a member as ready to move

  Scenario: Can view medical and payment alerts
    Given Im logged in
    When  I go to the ipod device
    Then  I should be able to login to device
    Then  I should be able to view medical and payment alerts