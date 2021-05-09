Feature: Edit a navigation link in main menu

  @user1 @web
  Scenario: Edit a navigation link in main menu
    Given I navigate to page "http://127.0.0.1:2368/ghost/#/signin"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      Then I click on element having id "ember12"
      Then I click on element having css selector "a[href*='design']"
      Then I clear input field having css selector "#settings-navigation > .sortable-objects > div:nth-child(2) .gh-blognav-label > input"
      Then I enter "Otro enlace" into input field having css selector "#settings-navigation > .sortable-objects > div:nth-child(2) .gh-blognav-label > input"
      Then I click on element having css selector "main button:first-child"
      Then I navigate to page "<GHOST_WEBSITE>"
      Then I should see text "Otro enlace"