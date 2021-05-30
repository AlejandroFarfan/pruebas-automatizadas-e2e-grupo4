@tag.edit-tag
Feature: Tag updates should be visible on webSite

  @user1 @web
  Scenario: Tag updates should be visible on webSite
    Given I navigate to page "<GHOST_URL_SIGIN>"
    Then I enter "<ADMIN_USER>" into input field having css selector "input[name='identification']"
    Then I enter "<ADMIN_PASSWORD>" into input field having css selector "input[name='password']"
    Then I click on element having css selector "button.login"
    Then I click on element having css selector "a[href='#/tags/']"
    Then I click on element having css selector "a[href*='?tag=']+a"
    Then I clear input field having css selector "input[name='name']"
    Then I enter "$name_1" into input field having css selector "input[name='name']"
    Then I clear input field having css selector "textarea[name='description']"
    Then I enter "$name_2" into input field having css selector "textarea[name='description']"
    Then I clear input field having css selector "input[name='slug']"
    Then I enter "$name_3" into input field having css selector "input[name='slug']"
    Then I click on element with xpath "//button[@type='button' and contains(., 'Save')]"
    Then I navigate to page "<GHOST_TAG_WEBSITE>" and slug "$$name_3"
    Then I should see text "$$name_1"
    Then I should see text "$$name_2"

