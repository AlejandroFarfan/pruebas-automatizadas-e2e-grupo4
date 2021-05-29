@tag.delete-tag
Feature: Deleted tag shoud not be on tagList

  @user1 @web
  Scenario: Deleted tag shoud not be on tagList
    Given I navigate to page "<GHOST_URL_SIGIN>"
    Then I enter "<ADMIN_USER>" into input field having css selector "input[name='identification']"
    Then I enter "<ADMIN_PASSWORD>" into input field having css selector "input[name='password']"
    Then I click on element having css selector "button.login"
    Then I click on element having css selector "a[href='#/tags/']"
    Then I click on element having css selector ".tags-list .gh-tag-list-posts-count[href*='/tags/']+a"
    Then I store a variable with the current tagName
    Then I click on element with xpath "//button[@type='button' and contains(., 'Delete tag')]"
    Then I click on element with xpath "//div[@class='modal-footer']/button[contains(., 'Delete')]"
    Then I click on element having css selector "a[href='#/tags/']"
    Then I check deltedTag is not Listed