@P1
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