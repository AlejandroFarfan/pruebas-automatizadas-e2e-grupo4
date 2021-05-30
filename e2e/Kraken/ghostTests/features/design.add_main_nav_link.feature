@design.add-main-nav-link
Feature: Add a navigation link in main menu

  @user1 @web
  Scenario: Add a navigation link in main menu
    Given I navigate to page "<GHOST_URL_SIGIN>"
      When I enter "<ADMIN_USER>" into input field having id "ember8"
      When I enter "<ADMIN_PASSWORD>" into input field having id "ember10"
      Then I click on element having id "ember12"
      Then I click on element having css selector "a[href*='design']"
      Then I enter "Enlace nuevo" into input field having css selector "#settings-navigation > .gh-blognav-item .gh-blognav-label > input"
      Then I click on element having css selector "main button:first-child"
      Then I navigate to page "<GHOST_WEBSITE>"
      Then I should see text "Enlace nuevo"