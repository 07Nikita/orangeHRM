@login
Feature: Authentication
  Background:
    Given user launches OrangeHRM application
  @smoke
  Scenario: Valid admin login
    When user logs in with valid credentials
    Then dashboard should be displayed
  @regression
  Scenario: Login validation for blank credentials
    When user submits blank credentials
    Then login validation message should be displayed
  @smoke @navigation
  Scenario: Dashboard Quick Launch navigation
    When user logs in with valid credentials
    And user opens Dashboard Quick Launch
    Then Dashboard Quick Launch should be displayed
