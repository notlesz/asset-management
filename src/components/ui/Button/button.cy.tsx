/// <reference types="cypress" />

import Button from '.'

describe('<Button />', () => {
  it('Render with value Text', () => {
    cy.mount(<Button>Text</Button>)

    cy.get('[data-cy=button]').should('have.text', 'Text')
  })
})
