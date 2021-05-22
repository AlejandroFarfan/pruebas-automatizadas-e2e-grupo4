export class StaffPage {
  adminUrl = Cypress.config('ghostUrl')

  navigateToStaff() {
    cy.visit(this.adminUrl + '#/staff')
  }

  showInvitePopup() {
    cy.get('main button:first-child')
      .click()

    cy.wait(1000)
  }

  typeEmailField(email) {
    cy.get('input#new-user-email')
    .click({force: true})
    .type(email)
  }

  clickSendInvitation() {
    cy.get('.fullscreen-modal .modal-footer button.gh-btn-green')
      .click()
  }

  getInvitedUsersContainer() {
    cy.wait(2000)

    cy.reload(true)

    return cy.get('main .gh-invited-users')
  }

  deleteInvitations() {
    cy.get('main .gh-invited-users a[href*=revoke]:first-child')
      .click({multiple: true})
  }

  getSendInvitationButton() {
    return cy.get('.fullscreen-modal .modal-footer button')
  }
}