Feature: Attempt to delete page

  @user1 @web
  Scenario: As an admin user I can delete a page
    Given I navigate to page "<GHOST_URL_SIGIN>"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      When I click on element having css selector "button.login"
      When I navigate to page "<GHOST_PAGE_SECTION>"
      Then I count elements having css selector ".content-list .gh-list li" and store count in variable
      Then I click on element having css selector "a[title='Edit this post']"
      Then I click on element having css selector ".post-settings"
      Then I click on element having css selector "form > .gh-btn > span"
      Then I click on element having css selector ".gh-btn-red"
      Then I navigate to page "http://localhost:2368/ghost/#/pages"
      Then I compare elements having css selector ".content-list .gh-list li" with stored variable minus 1
