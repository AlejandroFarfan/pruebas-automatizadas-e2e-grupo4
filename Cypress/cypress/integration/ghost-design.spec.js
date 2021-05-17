import { DesignPage } from "../page-objects/design"
import { HomePage } from "../page-objects/home"
import { Login } from "../page-objects/login"

describe('Manage navigation links', () => {
  const login = new Login()
  const designPage = new DesignPage()
  const homePage = new HomePage()

  beforeEach(() => {
    login.login(true)

    designPage.navigate()
  })

  it('Creates a link in main navigation', () => {
    designPage.takeScreenshot(1, 1)
    designPage.typeMainLabelField('Enlace nuevo')

    designPage.typeMainUrlField('https://www.google.com')
    designPage.takeScreenshot(1, 2)

    designPage.saveChanges()
    designPage.takeScreenshot(1, 3)

    homePage.navigate()

    homePage.getMainMenuLastItem()
      .should('have.class', 'nav-enlace-nuevo')
      .should('contain', 'Enlace nuevo')
    designPage.takeScreenshot(1, 4)
  })

  it('Edits a link in main navigation', () => {
    designPage.takeScreenshot(2, 1)
    designPage.editMainLabelField(2, 'Otro enlace')

    designPage.editMainUrlField(2, 'https://www.facebook.com')
    designPage.takeScreenshot(2, 2)

    designPage.saveChanges()
    designPage.takeScreenshot(2, 3)

    homePage.navigate()

    homePage.getMainMenuNItem(2)
      .should('have.class', 'nav-otro-enlace')
      .should('contain', 'Otro enlace')
    designPage.takeScreenshot(2, 4)
  })

  it('Deletes a link in main navigation', () => {
    designPage.takeScreenshot(3, 1)
    designPage.selectMainLabelFields()
    .then(($fields) => {
      designPage.takeScreenshot(3, 2)
      // count menu items
      const fields = $fields.length

      designPage.deleteMainLastItem()

      designPage.saveChanges()
      designPage.takeScreenshot(3, 3)

      homePage.navigate()

      homePage.getMainMenuAllItems()
        .should(($menuItems) => {
          expect($menuItems).to.have.length(fields - 1)
        })
      designPage.takeScreenshot(3, 4)
    })
  })

  it('Creates a link in second navigation', () => {
    designPage.takeScreenshot(4, 1)
    designPage.typeSecondaryLabelField('Enlace prueba')

    designPage.typeSecondaryUrlField('https://www.twitter.com')
    designPage.takeScreenshot(4, 2)

    designPage.saveChanges()
    designPage.takeScreenshot(4, 3)

    homePage.navigate()

    homePage.getSecondaryMenuLastItem()
      .should('have.class', 'nav-enlace-prueba')
      .should('contain', 'Enlace prueba')
    designPage.takeScreenshot(4, 4)
  })

  it('Deletes a link in second navigation', () => {
    designPage.takeScreenshot(5, 1)
    designPage.selectSecondaryLabelFields()
      .then(($fields) => {
        designPage.takeScreenshot(5, 2)
        // count menu items
        const fields = $fields.length

        designPage.deleteSecondaryLastItem()

        designPage.saveChanges()
        designPage.takeScreenshot(5, 3)

        homePage.navigate()

        homePage.getSecondaryMenuAllItems()
          .should(($menuItems) => {
            expect($menuItems).to.have.length(fields - 1)
          })
          designPage.takeScreenshot(5, 4)
      })
  })
})