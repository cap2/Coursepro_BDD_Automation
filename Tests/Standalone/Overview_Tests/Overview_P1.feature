@P1
@Standalone
@Overview_Tests
Feature: Overview Tests
  Assessment Asses Student
  Assessment Mark Attendance
  Cancel and Un_cancel Classes
  Week Day Navigation

  Scenario: Assessment Asses Student
    Given Im logged in
    When I go to a class
    Then I should be able to assess a pupil

  Scenario: Assessment Mark Attendance
    Given Im logged in
    When I go to a class
    Then I should be able to mark a pupil

  Scenario: Cancel and Un_cancel Classes
    Given Im logged in
    When I on the overview page
    Then I should be able to cancel a class
    Then un-cancel a class

  Scenario: Week Day Navigation
    Given Im logged in
    When I on the overview page
    Then I should be able to change the day