/// <reference types="cypress" />

import Search from '.'

describe('<Search />', () => {
  it('renders', () => {
    cy.mount(<Search handleSearch={() => {}} value="" />)
  })
})
