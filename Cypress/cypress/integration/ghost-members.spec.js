import { MembersPage } from "../page-objects/members"
import { Login } from "../page-objects/login"
import { DataReader } from "../external-data/dataReader"
import * as faker from "faker"

describe('Manage Members', () => {
  const login = new Login()
  const membersPage = new MembersPage()
  const dataReader = new DataReader()
  let dynamicData;
  let staticData;
  let membersEnabled;
  let memberCreated = false;

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

    membersPage.navigateToLabs()

    membersPage.getMainMenuAdmin()
    .then( menu => {
      membersEnabled = false
      if (menu[0].children.length > 5) {
        membersEnabled = true
      }

      if (membersEnabled == false) {
        membersPage.enableMembersSection()
      }
    })

    membersPage.logout()
  })

  beforeEach(() => {
    login.login(true)

    membersPage.navigateToNewMember()
  })

  afterEach(() => {
    if (memberCreated) {
      membersPage.deleteMember()
    }
    memberCreated = false
  })

  it('Creates a member with a typical name and email (Positive)', () => {
    membersPage.typeNameMemberField(faker.name.findName())

    membersPage.typeEmailMemberField(faker.internet.email())

    membersPage.saveMemberInfo()

    membersPage.getMemberDetailsSection()
      .contains('– Created on')
      .then( response => memberCreated = true)
  })

  it('Creates a member with spaces in both fields (Negative)', () => {
    membersPage.typeNameMemberField(staticData[0].spaces)

    membersPage.typeEmailMemberField(staticData[0].spaces)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })

  it('Creates a member with dangerous data in both fields (Negative)', () => {
    membersPage.typeNameMemberField(dynamicData.spec_char)

    membersPage.typeEmailMemberField(dynamicData.spec_char)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })

  it('Creates a member with code in both fields (Negative)', () => {
    membersPage.typeNameMemberField(dynamicData.code)

    membersPage.typeEmailMemberField(dynamicData.code)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })

  it('Creates a member with very long text in both fields (Negative)', () => {
    membersPage.typeNameMemberField(dynamicData.very_long_text)

    membersPage.typeEmailMemberField(dynamicData.very_long_text)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })

  it('Creates a member with text in name and spaces in email (Negative)', () => {
    membersPage.typeNameMemberField(dynamicData.text)

    membersPage.typeEmailMemberField(dynamicData.spaces)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })

  it('Creates a member with text in name and very long email (Negative)', () => {
    membersPage.typeNameMemberField(dynamicData.text)

    membersPage.typeEmailMemberField(dynamicData.very_long_email)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })

  it('Creates a member with short text in both fields (Negative)', () => {
    membersPage.typeNameMemberField(dynamicData.text)

    membersPage.typeEmailMemberField(dynamicData.text)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })

  it('Creates a member with a short text in name and a long -valid- email (Positive)', () => {
    membersPage.typeNameMemberField(dynamicData.text)

    membersPage.typeEmailMemberField(staticData[0].long_email)

    membersPage.saveMemberInfo()

    membersPage.getMemberDetailsSection()
      .contains('– Created on')
      .then( response => memberCreated = true)
  })

  it('Creates a member with a very long name and a valid email (Negative)', () => {
    membersPage.typeNameMemberField(dynamicData.very_long_text)

    membersPage.typeEmailMemberField(staticData[0].email)

    membersPage.saveMemberInfo()

    membersPage.getMembersSaveButton()
      .contains('Retry')
  })
})