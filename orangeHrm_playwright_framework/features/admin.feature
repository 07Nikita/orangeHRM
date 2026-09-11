@admin
Feature: Admin
  Background:
    Given user is on the Admin module
  @smoke
  Scenario: Search System User
    When user searches for the configured system user
    Then the configured system user should be listed
  @regression
  Scenario: Reset System User filters
    When user resets System User filters
    Then System User filters should be reset
  @regression
  Scenario: Validate Add User required fields
    When user submits the Add User form without required fields
    Then Add User required field messages should be displayed
