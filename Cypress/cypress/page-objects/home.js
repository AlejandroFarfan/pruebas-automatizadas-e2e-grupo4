export class HomePage {
  publicSite = Cypress.config('ghostUrl').split('ghost/')[0]

  navigate() {
    cy.wait(1000)

    cy.visit(this.publicSite)
  }

  getMainMenuLastItem() {
    return cy.get('nav')
      .find('.site-nav-left li:last')
  }

  getMainMenuNItem(position) {
    return cy.get('header nav')
      .find('.site-nav-left li:nth-child('+position+')')
  }

  getMainMenuAllItems() {
    return cy.get('header nav')
      .find('.site-nav-left ul li')
  }

  getSecondaryMenuLastItem() {
    return cy.get('nav')
      .find('.site-nav-right li:last')
  }

  getSecondaryMenuAllItems() {
    return cy.get('header nav')
      .find('.site-nav-right ul li')
  }

  getSecondaryMenu() {
    return cy.get('header nav .site-nav-right')
  }
}
