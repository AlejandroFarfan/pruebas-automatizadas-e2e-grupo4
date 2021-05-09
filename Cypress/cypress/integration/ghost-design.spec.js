import { DesignPage } from "../page-objects/design-page"
import { HomePage } from "../page-objects/home-page"
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
    designPage.typeMainLabelField('Enlace nuevo')

    designPage.typeMainUrlField('https://www.google.com')

    designPage.saveChanges()

    homePage.navigate()

    homePage.getMainMenuLastItem()
      .should('have.class', 'nav-enlace-nuevo')
      .should('contain', 'Enlace nuevo')
  })

  it('Edits a link in main navigation', () => {
    designPage.editMainLabelField(2, 'Otro enlace')

    designPage.editMainUrlField(2, 'https://www.facebook.com')

    designPage.saveChanges()

    homePage.navigate()

    homePage.getMainMenuNItem(2)
      .should('have.class', 'nav-otro-enlace')
      .should('contain', 'Otro enlace')
  })

  it('Deletes a link in main navigation', () => {

      designPage.selectMainLabelFields()
      .then(($fields) => {
        // count menu items
        const fields = $fields.length

        designPage.deleteMainLastItem()

        designPage.saveChanges()

        homePage.navigate()

        homePage.getMainMenuAllItems()
          .should(($menuItems) => {
            expect($menuItems).to.have.length(fields - 1)
          })
      })
  })

  it('Creates a link in second navigation', () => {
    designPage.typeSecondaryLabelField('Enlace prueba')

    designPage.typeSecondaryUrlField('https://www.twitter.com')

    designPage.saveChanges()

    homePage.navigate()

    homePage.getSecondaryMenuLastItem()
      .should('have.class', 'nav-enlace-prueba')
      .should('contain', 'Enlace prueba')
  })

  it('Deletes a link in second navigation', () => {

    designPage.selectSecondaryLabelFields()
      .then(($fields) => {
        // count menu items
        const fields = $fields.length

        designPage.deleteSecondaryLastItem()

        designPage.saveChanges()

        homePage.navigate()

        homePage.getSecondaryMenuAllItems()
          .should(($menuItems) => {
            expect($menuItems).to.have.length(fields - 1)
          })
      })
  })
})