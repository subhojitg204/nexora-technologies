import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from '../src/components/Header/Header';

describe('Nexora Technologies Header', () => {
  it('renders the website header', () => {
    render(
      <MemoryRouter>
        <Header
          darkMode={false}
          onToggleTheme={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('banner')
    ).toBeInTheDocument();
  });

  it('displays the website logo', () => {
    render(
      <MemoryRouter>
        <Header
          darkMode={false}
          onToggleTheme={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('link', {
        name: 'NEXORA Technologies Home',
      })
    ).toBeInTheDocument();
  });
 it('calls the theme toggle function when clicked', async () => {
  const user = userEvent.setup();
  const mockToggleTheme = vi.fn();

  render(
    <MemoryRouter>
      <Header
        darkMode={false}
        onToggleTheme={mockToggleTheme}
      />
    </MemoryRouter>
  );

  const themeButton = screen.getByRole('button', {
    name: 'Toggle colour theme',
  });

  expect(themeButton).toBeInTheDocument();

  await user.click(themeButton);

  expect(mockToggleTheme).toHaveBeenCalledTimes(1);
});
  });
