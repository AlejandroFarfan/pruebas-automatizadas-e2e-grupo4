export class DesignPage {
  path = Cypress.config('ghostUnderTest') + '/'
  scenario = 'design-scenario-'
  adminUrl = Cypress.config('ghostUrl')

  // sc: Scenario, ss: Screenshot
  takeScreenshot(scNumber, ssNumber) {
    cy.wait(1000)
    cy.screenshot(this.path + this.scenario + scNumber + '-' + ssNumber, { capture: 'viewport' })
  }

  navigateToAdmin() {
    cy.visit(this.adminUrl)
  }

  navigate() {
    cy.wait(1000)

    cy.visit(this.adminUrl + '#/settings/design')
  }

  typeMainLabelField(text) {
    cy.get('#settings-navigation > .gh-blognav-item .gh-blognav-label > input')
      .click({force: true})
      .type(text)
  }

  typeMainUrlField(url) {
    cy.get('#settings-navigation > .gh-blognav-item .gh-blognav-url > input')
      .click({force: true})
      .clear()
      .type(url)
  }

  saveChanges() {
    cy.get('main button:first-child')
      .click()
  }

  editMainLabelField(position, text) {
    cy.get('#settings-navigation > .sortable-objects > div:nth-child('+position+') .gh-blognav-label > input')
      .click({force: true})
      .clear()
      .type(text)
  }

  editMainUrlField(position, url) {
    cy.get('#settings-navigation > .sortable-objects > div:nth-child('+position+') .gh-blognav-url > input')
      .click({force: true})
      .clear()
      .type(url)
  }

  selectMainLabelFields() {
    cy.wait(1000)

    return cy.get('#settings-navigation > .sortable-objects > div .gh-blognav-label > input')
  }

  deleteMainLastItem() {
    cy.get('#settings-navigation > .sortable-objects .gh-blognav-delete:last')
      .click({force: true})
  }

  typeSecondaryLabelField(text) {
    cy.get('#secondary-navigation > .gh-blognav-item .gh-blognav-label > input')
      .click({force: true})
      .type(text)
  }

  typeSecondaryUrlField(url) {
    cy.get('#secondary-navigation > .gh-blognav-item .gh-blognav-url > input')
      .click({force: true})
      .clear()
      .type(url)
  }

  getSecondaryLabelsContainer() {
    return cy.get('#secondary-navigation > .sortable-objects')
  }

  selectSecondaryLabelFields() {
    cy.wait(1000)

    return cy.get('#secondary-navigation > .sortable-objects > div .gh-blognav-label > input')
  }

  deleteSecondaryLastItem() {
    cy.get('#secondary-navigation > .sortable-objects .gh-blognav-delete:last')
      .click({force: true})
  }
}