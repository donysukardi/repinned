Cypress.Commands.add('getInStory', getInStory)

Cypress.Commands.add('getInStoryByTestId', id =>
  getInStory(`[data-testid="${id}"]`),
)

// because storybook loads our story in an iframe,
// we have to get that iframe and select items inside there.
// Learned this from https://medium.com/@mtiller/testing-react-components-using-storybook-and-cypress-1689a27f55aa
function getInStory(selector) {
  return cy.get('#root').find(selector)
}

// see the baseUrl config in cypress.json
Cypress.Commands.add('visitStory', url => {
  return cy.visit(url)
})
