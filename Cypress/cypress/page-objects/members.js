export class MembersPage {
  adminUrl = Cypress.config('ghostUrl')

  logout() {
    cy.visit(this.adminUrl + '#/signout')
  }

  navigateToAdmin() {
    cy.visit(this.adminUrl)
  }

  navigateToLabs() {
    cy.visit(this.adminUrl + '#/settings/labs')
  }

  getMainMenuAdmin() {
    return cy.get('ul.gh-nav-manage')
  }

  enableMembersSection() {
    cy.visit(this.adminUrl + '#/settings/labs/members')

    cy.wait(1000)

    cy.get('label[for=labs-members] span.input-toggle-component').click()
  }

  navigateToMembers() {
    cy.visit(this.adminUrl + '#/members')
  }

  navigateToNewMember() {
    cy.visit(this.adminUrl + '#/members/new')
  }

  typeNameMemberField(text) {
    cy.get('input#member-name')
      .click({force: true})
      .type(text)
  }

  typeEmailMemberField(email) {
    cy.get('input#member-email')
      .click({force: true})
      .type(email)
  }

  saveMemberInfo() {
    cy.get('main button:first-child')
      .click()
  }

  getMemberDetailsSection() {
    return cy.get('.gh-member-details')
  }

  getMembersSaveButton() {
    return cy.get('main button:first-child')
  }

  deleteMember() {
    cy.get('main .gh-btn-red')
      .click()

    cy.wait(1000)

    cy.get('.fullscreen-modal .gh-btn-red')
      .click()
  }
}