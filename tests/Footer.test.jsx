
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from '../src/components/Footer/Footer';

describe('Nexora Technologies Footer Component', () => {

  it('renders the footer correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('contentinfo')
    ).toBeInTheDocument();
  });

  it('displays the company logo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('link', { name: /NEXORA/i })
    ).toBeInTheDocument();
  });

  it('links the logo to the homepage', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logo = screen.getByRole('link', {
      name: /NEXORA/i,
    });

    expect(logo).toHaveAttribute('href', '/');
  });

  it('displays the company tagline', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        'Building digital experiences for tomorrow.'
      )
    ).toBeInTheDocument();
  });

  it('displays the current year and copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(
        new RegExp(`${currentYear} Nexora Technologies`)
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/All rights reserved/i)
    ).toBeInTheDocument();
  });

});
