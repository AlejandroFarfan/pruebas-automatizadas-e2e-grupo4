export class HomePage {
  navigate() {
    cy.visit('http://127.0.0.1:2368/')
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
}