import { Suspense } from 'react'
import { mount } from 'cypress/react'
import CompanyList from './CompanyList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CompanyContextProvider from '../context/CompanyContext'

const colors = {
  active: 'bg-blue-500',
}

describe('CompanyList Component', () => {
  let queryClient: QueryClient

  const mockCompanies = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' },
  ]

  const mountComponent = () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <CompanyContextProvider>
            <CompanyList />
          </CompanyContextProvider>
        </Suspense>
      </QueryClientProvider>
    )

    cy.wait('@getCompanies')
  }

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    })

    cy.intercept('GET', '**/companies', {
      statusCode: 200,
      body: mockCompanies,
    }).as('getCompanies')
  })

  it('renders company buttons', () => {
    mountComponent()

    cy.get('button').should('have.length', mockCompanies.length)
    cy.get('button').each(($button, index) => {
      cy.wrap($button).should('contain.text', mockCompanies[index].name)
    })
  })

  it('should have an active company by default', () => {
    mountComponent()

    cy.get('button').first().should('have.class', colors.active)
  })

  it('sets other active company on click', () => {
    mountComponent()

    cy.get('button').last().click()
    cy.get('button').last().should('have.class', colors.active)
  })
})
