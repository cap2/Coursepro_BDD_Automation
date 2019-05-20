@P1
@Standalone
@Report_Tests
Feature: Overview Report
  Report Tests
  Class Member Report
  Class Session Member Report
  Classes Report
  Members Report
  Transactions Report
  Transactions Credit Report
  Transactions Refunds Report
  Transactions Online Report

  Scenario: Overview Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see overview report

  Scenario: Class Member Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see class member report

  Scenario: Class Session Member Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see class session member report

  Scenario: Classes Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see classes report

  Scenario: Members Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see members report

  Scenario: Transactions Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see transactions report

  Scenario: Transactions Credit Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see transactions credit report

  Scenario: Transactions Refunds Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see transactions refunds report

  Scenario: Transactions Online Report
    Given Im logged in
    When  I go to the reports page
    Then  I should see transactions online report