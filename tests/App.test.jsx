import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

function TestComponent() {
  return <h1>Welcome to Nexora Technologies</h1>
}

describe('Nexora Technologies Website', () => {
  it('renders the welcome heading', () => {
    render(<TestComponent />)

    expect(
      screen.getByText('Welcome to Nexora Technologies')
    ).toBeInTheDocument()
  })
})