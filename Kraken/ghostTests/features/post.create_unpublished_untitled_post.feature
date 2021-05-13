@post.create-untitled
Feature: Create untitled post

  @user1 @web
  Scenario: As an admin user I can create an untitled post, by clicking on the title
    Given I navigate to page "<GHOST_URL_SIGIN>"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      When I click on element having css selector "button.login"
      When I navigate to page "<GHOST_POST_SECTION>"
      Then I click on element having css selector ".gh-btn.gh-btn-green.ember-view"
      Then I click on element having css selector "textarea.gh-editor-title.ember-text-area.gh-input.ember-view"
      Then I click on element having css selector "a.blue.link.fw4.flex.items-center.ember-view"
      Then I should see text "(Untitled)" in posts section
      Then I navigate to page "<GHOST_WEBSITE>"
      Then I check that post with title "(Untitled)" is not published