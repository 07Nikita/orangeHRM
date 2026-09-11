@myinfo
Feature: My Info
  Background:
    Given user is on the My Info module
  @smoke
  Scenario: Verify My Info tabs and controls
    Then My Info tabs and controls should be visible
