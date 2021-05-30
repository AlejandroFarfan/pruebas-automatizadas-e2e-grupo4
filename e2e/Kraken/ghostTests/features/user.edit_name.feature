@u-user.edit-user-name
Feature: update user name

  @user1 @web
  Scenario: update user name
    Given I navigate to page "<GHOST_URL_SIGIN>"
    Then I enter "<ADMIN_USER>" into input field having css selector "input[name='identification']"
    Then I enter "<ADMIN_PASSWORD>" into input field having css selector "input[name='password']"
    Then I click on element having css selector "button.login"
    Then I click on element having css selector ".gh-user-email"
    Then I click on element with xpath "//li/a[contains(.,'Your Profile')]"
    Then I clear input field having css selector "input[placeholder='Full Name']"
    Then I enter "$name_1" into input field having css selector "input[placeholder='Full Name']"
    Then I click on element with xpath "//button[contains(., 'Save')]"

