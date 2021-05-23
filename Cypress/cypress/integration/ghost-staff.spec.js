import { StaffPage } from "../page-objects/staff"
import { Login } from "../page-objects/login"
import { DataReader } from "../external-data/dataReader"
import * as faker from "faker"

describe('Manage Invites to Staff', () => {
  const login = new Login()
  const staffPage = new StaffPage()
  const dataReader = new DataReader()
  let dynamicData;
  let staticData;

  before(() => {
    cy.readFile('cypress/external-data/schema_design_week7.json')
      .then( response => {
        staticData = response
        dataReader.getDynamicData()
          .then( response => {
            dynamicData = response
          })
          .catch( error => {
            dynamicData = staticData[0]
          })
      })

    login.login(true)
    Cypress.Cookies.defaults({
      preserve: 'ghost-admin-api-session',
    })
  })

  beforeEach(() => {
    staffPage.navigateToStaff()

    staffPage.showInvitePopup()
  })

  after(() => {
    cy.clearCookie('ghost-admin-api-session')
    cy.getCookies().should('be.empty')
  })

  it('Creates an invite with a valid email (Positive)', () => {
    staffPage.typeEmailField(dynamicData.email)

    staffPage.clickSendInvitation()

    staffPage.getInvitedUsersContainer()
      .contains('Invitation sent:')

    staffPage.deleteInvitations()
  })

  it('Creates an invite with a short text (Negative)', () => {
    staffPage.typeEmailField(dynamicData.text)

    staffPage.clickSendInvitation()

    staffPage.getSendInvitationButton()
      .contains('Retry')
  })

  it('Creates an invite with dangerous text (Negative)', () => {
    staffPage.typeEmailField(dynamicData.spec_char)

    staffPage.clickSendInvitation()

    staffPage.getSendInvitationButton()
      .contains('Retry')
  })

  it('Creates an invite with very long text (Negative)', () => {
    staffPage.typeEmailField(dynamicData.very_long_text)

    staffPage.clickSendInvitation()

    staffPage.getSendInvitationButton()
      .contains('Retry')
  })

  it('Creates an invite with spaces in field (Negative)', () => {
    staffPage.typeEmailField(dynamicData.spaces)

    staffPage.clickSendInvitation()

    staffPage.getSendInvitationButton()
      .contains('Retry')
  })

  it('Creates an invite with code (Negative)', () => {
    staffPage.typeEmailField(dynamicData.code)

    staffPage.clickSendInvitation()

    staffPage.getSendInvitationButton()
      .contains('Retry')
  })

  it('Creates an invite with very long email (Negative)', () => {
    staffPage.typeEmailField(dynamicData.very_long_email)

    staffPage.clickSendInvitation()

    staffPage.getSendInvitationButton()
      .contains('Retry')
  })

  it('Creates an invite with long -valid- email (Positive)', () => {
    staffPage.typeEmailField(staticData[0].long_email)

    staffPage.clickSendInvitation()

    staffPage.getInvitedUsersContainer()
      .contains('Invitation sent:')

    staffPage.deleteInvitations()
  })
})