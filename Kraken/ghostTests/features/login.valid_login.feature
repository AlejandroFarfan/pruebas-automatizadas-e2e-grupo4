Feature: Valid login

  @user1 @web
  Scenario: Valid login
    Given I navigate to page "<GHOST_URL_SIGIN>"
      Then I enter "<ADMIN_USER>" into input field having id "ember8"
      Then I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      Then I click on element having css selector "button.login"
      Then I should see text "<ADMIN_USER>"