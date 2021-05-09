Feature: Attempt to create page without content

  @user1 @web
  Scenario: As an admin user I cannot create an empty post
    Given I navigate to page "<GHOST_URL_SIGIN>"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      When I click on element having css selector "button.login"
      When I navigate to page "<GHOST_PAGE_SECTION>"
      Then I click on element having css selector ".gh-btn.gh-btn-green.ember-view"
      Then I enter "Vitae id modi nesciunt accusantium vero qui eius nemo" into input field having css selector "textarea[placeholder='Page Title']"
      Then I enter "Labore et laudantium sequi accusantium numquam eum aut modi aut. Alias a vitae temporibus est qui voluptas cumque fuga. Dolor rerum laborum aperiam ut reiciendis ut veritatis qui eligendi." into input field having css selector ".koenig-editor__editor"
      Then I click on element having css selector "div.gh-publishmenu.ember-view"
      Then I click on element having css selector ".gh-publishmenu-button"
      Then I navigate to page "http://localhost:2368/ghost/#/pages"
      Then I check that post with title "Vitae id modi nesciunt accusantium vero qui eius nemo" is published
