Feature: Edit first post with invalid title length

  @user1 @web
  Scenario: As an admin user I cannot update (publish) a post with a title that exceeds 256 characters
    Given I navigate to page "<GHOST_URL_SIGIN>"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      When I click on element having css selector "button.login"
      When I navigate to page "<GHOST_POST_SECTION>"
      Then I click on element having css selector "a[title='Edit this post']"
      Then I clear post input field having css selector "textarea[placeholder='Post Title']"
      Then I enter "Vitae id modi nesciunt accusantium vero qui eius nemo. Omnis unde ducimus eos consectetur saepe incidunt. Enim consequuntur deserunt iure voluptate consequatur odio ipsam velit dolorum. Laudantium libero ea sed natus porro non provident possimus vitae. Cumque dignissimos ipsa voluptatum aliquid reiciendis. Rerum veritatis ratione dolor accusantium facilis consequatur aspernatur et totam." into input field having css selector "textarea[placeholder='Post Title']"
      Then I click on element having css selector "div.gh-publishmenu.ember-view"
      Then I click on element having css selector ".gh-publishmenu-button"
      Then I click on element having css selector "a.blue.link.fw4.flex.items-center.ember-view"
      Then I click on element having css selector ".gh-btn-red span"
      Then I navigate to page "<GHOST_WEBSITE>"
      Then I check that post with title "Vitae id modi nesciunt accusantium vero qui eius nemo. Omnis unde ducimus eos consectetur saepe incidunt. Enim consequuntur deserunt iure voluptate consequatur odio ipsam velit dolorum. Laudantium libero ea sed natus porro non provident possimus vitae. Cumque dignissimos ipsa voluptatum aliquid reiciendis. Rerum veritatis ratione dolor accusantium facilis consequatur aspernatur et totam." is not published

      