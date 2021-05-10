Feature: Delete a navigation link in secondary menu

  @user1 @web
  Scenario: Delete a navigation link in secondary menu
    Given I navigate to page "<GHOST_URL_SIGIN>"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      Then I click on element having id "ember12"
      Then I click on element having css selector "a[href*='design']"
      Then I enter "Enlace adicional" into input field having css selector "#secondary-navigation > .gh-blognav-item .gh-blognav-label > input"
      Then I click on element having css selector "main button:first-child"
      Then I navigate to page "<GHOST_WEBSITE>"
      Then I count elements having css selector "header nav .site-nav-right ul li" and store count in variable
      Then I navigate to page "http://localhost:2368/ghost/#/settings/design"
      Then I click on element having css selector "a[href*='design']"
      Then I click on element having css selector "#secondary-navigation > .sortable-objects > div:last-child button.gh-blognav-delete"
      Then I click on element having css selector "main button:first-child"
      Then I navigate to page "http://localhost:2368"
      Then I compare elements having css selector "header nav .site-nav-right ul li" with stored variable minus 1
