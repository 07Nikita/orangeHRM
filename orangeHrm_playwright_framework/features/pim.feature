@pim
Feature: PIM
  Background:
    Given user is on the PIM module
  @smoke
  Scenario: Validate Add Employee mandatory fields
    When user submits the Add Employee form without required fields
    Then Add Employee required field messages should be displayed
  @regression
  Scenario: Create Employee
    When user creates the configured employee
    Then employee creation should complete
  @regression
  Scenario: Open Employee Personal Details
    When user opens Employee Personal Details
    Then Employee Personal Details should be displayed
