@P1
@Standalone
@Contact_Trigger_Tests
Feature: Contact Trigger Tests
  X Sessions Remaining
  After Top Up
  Book Online DD
  Cancelled Class
  Cancelled Class Reminder - X days in advance
  New Booking
  Re-Enrolment
  Receipt - Not Paid
  Receipt - Paid

  Background:
    Given I run the cron
    And   I know its completed

  Scenario: X Sessions Remaining
    Given I can see the db
    Then  I should be able to see the X Sessions Remaining email