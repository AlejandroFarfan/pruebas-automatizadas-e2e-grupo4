import { DesignPage } from "../page-objects/design"
import { HomePage } from "../page-objects/home"
import { Login } from "../page-objects/login"
import { DataReader } from "../external-data/dataReader"
import * as faker from "faker"

describe('Manage navigation links', () => {
  const login = new Login()
  const designPage = new DesignPage()
  const homePage = new HomePage()
  const dataReader = new DataReader()
  let dynamicData;
  let staticData;
  let secMenuItems;

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

    homePage.navigate()

    homePage.getSecondaryMenu()
    .then( menu => {
      if (menu[0].children[0].tagName != 'UL') {
        secMenuItems = 0
      } else {
        secMenuItems = menu[0].children[0].children.length
      }
    })
  })

  beforeEach(() => {
    login.login(true)

    designPage.navigate()
  })

  afterEach(() => {
    designPage.navigate()

    designPage.selectMainLabelFields(false)
    .then((fields) => {
      if (fields.length > 4) {
        designPage.deleteMainLastItem()

        designPage.saveChanges()
      }
    })

    homePage.navigate()

    homePage.getSecondaryMenu()
    .then( menu => {
      let afterSecMenuItems = 0
      if (menu[0].children[0].tagName == 'UL') {
        afterSecMenuItems = menu[0].children[0].children.length
      }

      if (afterSecMenuItems > secMenuItems) {
        designPage.navigate()

        designPage.deleteSecondaryLastItem()

        designPage.saveChanges()
      }
    })

  })

  it('Creates a link in main navigation with valid data (Positive)', () => {
    designPage.selectMainLabelFields()
    .then(($fields) => {
      // count menu items
      const fieldsCount = $fields.length
      designPage.typeMainLabelField(faker.lorem.words(2))

      designPage.typeMainUrlField(faker.internet.url())

      designPage.saveChanges()

      homePage.navigate()

      homePage.getMainMenuAllItems()
      .should(($fields) => {
        expect($fields).to.have.length(fieldsCount + 1)
      })
    })
  })

  it('Creates a link in main navigation with spaces in both fields (Negative)', () => {
    designPage.selectMainLabelFields()
    .then(($fields) => {
      const fieldsCount = $fields.length

      designPage.typeMainLabelField(staticData[0].spaces)

      designPage.typeMainUrlField(staticData[0].spaces)

      designPage.saveChanges()

      designPage.selectMainLabelFields()
      .should(($fields) => {
        expect($fields).to.have.length(fieldsCount)
      })
    })
  })

  it('Creates a link in main navigation with dangerous data in both fields (Positive/Negative)', () => {
    designPage.selectMainLabelFields()
    .then(($fields) => {
      const fieldsCount = $fields.length

      designPage.typeMainLabelField(dynamicData.spec_char)

      designPage.typeMainUrlField(dynamicData.spec_char)

      designPage.saveChanges()

      designPage.selectMainLabelFields()
      .should(($fields) => {
        expect($fields).to.have.length(fieldsCount + 1)
      })
    })
  })

  it('Creates a link in main navigation with very long text in both fields (Positive?)', () => {
    designPage.selectMainLabelFields()
    .then(($fields) => {
      const fieldsCount = $fields.length

      designPage.typeMainLabelField(dynamicData.very_long_text)

      designPage.typeMainUrlField(dynamicData.very_long_text)

      designPage.saveChanges()

      designPage.selectMainLabelFields()
      .should(($fields) => {
        expect($fields).to.have.length(fieldsCount + 1)
      })
    })
  })

  it('Creates a link in main navigation with text in label and spaces in url (Positive)', () => {
    designPage.selectMainLabelFields()
    .then(($fields) => {
      const fieldsCount = $fields.length

      designPage.typeMainLabelField(dynamicData.text)

      designPage.typeMainUrlField(dynamicData.spaces)

      designPage.saveChanges()

      designPage.selectMainLabelFields()
      .should(($fields) => {
        expect($fields).to.have.length(fieldsCount + 1)
      })
    })
  })

  it('Creates a link in main navigation with js code in both fields (Positive)', () => {
    designPage.selectMainLabelFields()
    .then(($fields) => {
      const fieldsCount = $fields.length

      designPage.typeMainLabelField(dynamicData.code)

      designPage.typeMainUrlField(dynamicData.code)

      designPage.saveChanges()

      designPage.selectMainLabelFields()
      .should(($fields) => {
        expect($fields).to.have.length(fieldsCount + 1)
      })
    })
  })

  it('Creates a link in secondary navigation with valid data (Positive)', () => {
    designPage.typeSecondaryLabelField(faker.lorem.words(2))

    designPage.typeSecondaryUrlField(faker.internet.url())

    designPage.saveChanges()

    homePage.navigate()

    homePage.getSecondaryMenuAllItems()
    .should(($fields) => {
      expect($fields).to.have.length(secMenuItems + 1)
    })
  })

  it('Creates a link in secondary navigation with spaces in both fields (Negative)', () => {
    designPage.typeSecondaryLabelField(staticData[0].spaces)

    designPage.typeSecondaryUrlField(staticData[0].spaces)

    designPage.saveChanges()

    homePage.navigate()

    homePage.getSecondaryMenuAllItems()
    .should(($fields) => {
      expect($fields).to.have.length(secMenuItems)
    })
  })

  it('Creates a link in secondary navigation with dangerous data in both fields (Positive/Negative)', () => {
    designPage.typeSecondaryLabelField(dynamicData.spec_char)

    designPage.typeSecondaryUrlField(dynamicData.spec_char)

    designPage.saveChanges()

    homePage.navigate()

    homePage.getSecondaryMenuAllItems()
    .should(($fields) => {
      expect($fields).to.have.length(secMenuItems + 1)
    })
  })

  it('Creates a link in secondary navigation with very long text in both fields (Positive?)', () => {
    designPage.typeSecondaryLabelField(dynamicData.very_long_text)

    designPage.typeSecondaryUrlField(dynamicData.very_long_text)

    designPage.saveChanges()

    homePage.navigate()

    homePage.getSecondaryMenuAllItems()
    .should(($fields) => {
      expect($fields).to.have.length(secMenuItems + 1)
    })
  })

  it('Creates a link in secondary navigation with text in label and spaces in url (Positive)', () => {
    designPage.typeSecondaryLabelField(dynamicData.text)

    designPage.typeSecondaryUrlField(dynamicData.spaces)

    designPage.saveChanges()

    homePage.navigate()

    homePage.getSecondaryMenuAllItems()
    .should(($fields) => {
      expect($fields).to.have.length(secMenuItems + 1)
    })
  })

  it('Creates a link in secondary navigation with js code in both fields (Positive)', () => {
    designPage.typeSecondaryLabelField(dynamicData.code)

    designPage.typeSecondaryUrlField(dynamicData.code)

    designPage.saveChanges()

    homePage.navigate()

    homePage.getSecondaryMenuAllItems()
    .should(($fields) => {
      expect($fields).to.have.length(secMenuItems + 1)
    })
  })
})