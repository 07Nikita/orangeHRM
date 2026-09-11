@leave
Feature: Leave
  Background:
    Given user is on the Leave module
  @regression
  Scenario: Validate Leave Apply mandatory fields
    When user submits Leave Apply without mandatory fields
    Then Leave mandatory field messages should be displayed
  @regression
  Scenario: Validate incorrect date range
    When user submits an incorrect Leave date range
    Then Leave date range validation should be displayed
