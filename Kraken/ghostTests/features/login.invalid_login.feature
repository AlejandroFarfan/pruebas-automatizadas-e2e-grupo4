@login.invalid-login
Feature: Invalid login

  @user1 @web
  Scenario: Invalid login
    Given I navigate to page "<GHOST_URL_SIGIN>"
      Then I enter "$email_1" into input field having id "ember8"
      Then I enter "$name_1" into input field having id "ember10"
      Then I click on element having css selector "button.login"
      Then I should see text "There is no user with that email address." in login alert div