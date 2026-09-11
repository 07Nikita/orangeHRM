Feature: Dashboard
  Background:
    Given user is logged in to OrangeHRM
  @smoke
  Scenario: Verify dashboard widgets visibility
    Then dashboard widgets should be visible
  @regression
  Scenario: Verify navigation to Admin module
    When user navigates to "Admin"
    Then "System Users" page should be displayed
  @regression
  Scenario: Verify navigation to PIM module
    When user navigates to "PIM"
    Then "PIM" page should be displayed
