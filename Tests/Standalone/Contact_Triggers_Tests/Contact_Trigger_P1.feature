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

  Scenario: X Sessions Remaining
    Given Im logged in
    When  I go to the member page
    Then  I should be able to search for a member
