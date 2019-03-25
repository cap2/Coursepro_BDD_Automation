@P1
@Standalone
@Booking_Tests
Feature: Booking Tests
  Continuous Class Cash Payment
  Continuous Class DD Payment
  Fixed Class Cash Payment
  Fixed Class DD Payment
  Top-up Continuous Cash Payment
  Top-up Continuous DD Payment
  Top-up Fixed Cash Payment
  Top-up Fixed DD Payment

Scenario: Continuous Class Cash Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to book a continuous class
  Then  I pay with cash

Scenario: Continuous Class DD Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to book a continuous class
  Then  I pay with dd

Scenario: Fixed Class Cash Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to book a fixed class
  Then  I pay with cash

Scenario: Fixed Class DD Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to book a fixed class
  Then  I pay with dd

Scenario: Top-up Continuous Cash Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to topup a continuous class
  Then  I pay with cash

Scenario: Top-up Continuous DD Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to topup a continuous class
  Then  I pay with dd

Scenario: Top-up Fixed Cash Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to topup a fixed class
  Then  I pay with cash

Scenario: Top-up Fixed DD Payment
  Given Im logged in
  When  I go to the booking page
  Then  I should be able to topup a fixed class
  Then  I pay with dd
