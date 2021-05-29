@post.create-without-content
Feature: Attempt to create post without contents

  @user1 @web
  Scenario: As an admin user I cannot create an empty post
    Given I navigate to page "<GHOST_URL_SIGIN>"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      When I click on element having css selector "button.login"
      When I navigate to page "<GHOST_POST_SECTION>"
      Then I click on element having css selector ".gh-btn.gh-btn-green.ember-view"
      Then I click on element having css selector "a.blue.link.fw4.flex.items-center.ember-view"
      Then I should not see text "Post Title" in posts section
