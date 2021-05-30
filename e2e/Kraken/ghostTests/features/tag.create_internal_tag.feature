@tag.create-internal-tag
Feature: internal tags should start by #

  @user1 @web
  Scenario: internal tags should start by #
    Given I navigate to page "<GHOST_URL_SIGIN>"
    Then I enter "<ADMIN_USER>" into input field having css selector "input[name='identification']"
    Then I enter "<ADMIN_PASSWORD>" into input field having css selector "input[name='password']"
    Then I click on element having css selector "button.login"
    Then I click on element having css selector "a[href='#/tags/']"
    Then I click on element having css selector "a[href*='tags/new']"
    Then I enter "#internalTagName" into input field having css selector "input[name='name']"
    Then I click on element with xpath "//button[@type='button' and contains(., 'Save')]"
    Then I click on element having css selector "a[href='#/tags/']"
    Then I click on element with xpath "//button[contains(@class,'gh-btn') and contains(., 'Internal tags')]"
    Then I check "#internalTagName" is listed
