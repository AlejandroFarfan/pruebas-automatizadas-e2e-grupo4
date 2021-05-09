export class DesignPage {
  navigate() {
    cy.get('a[href*="design"]')
      .click()
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

  selectSecondaryLabelFields() {
    return cy.get('#secondary-navigation > .sortable-objects > div .gh-blognav-label > input')
  }

  deleteSecondaryLastItem() {
    cy.get('#secondary-navigation > .sortable-objects .gh-blognav-delete:last')
      .click({force: true})
  }
}