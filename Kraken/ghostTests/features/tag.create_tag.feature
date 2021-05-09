Feature: New Tag should be visible on post settings

  @user1 @web
  Scenario: New Tag should be visible on post settings
    Given I navigate to page "<GHOST_URL_SIGIN>"
    Then I enter "<ADMIN_USER>" into input field having css selector "input[name='identification']"
    Then I enter "<ADMIN_PASSWORD>" into input field having css selector "input[name='password']"
    Then I click on element having css selector "button.login"
    Then I click on element having css selector "a[href='#/tags/']"
    Then I click on element having css selector "a[href*='tags/new']"
    Then I enter "$name_1" into input field having css selector "input[name='name']"
    Then I click on element with xpath "//button[@type='button' and contains(., 'Save')]"
    Then I click on element having css selector "a[href='#/posts/']"
    Then I click on element having css selector "a[href='#/editor/post/']"
    Then I click on element having css selector "button.post-settings"
    Then I click on element having css selector "label[for='tag-input']+div"
    Then I check for "$$name_1" to exist in tag selector

