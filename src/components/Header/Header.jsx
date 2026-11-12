
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ darkMode, onToggleTheme }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <Link
  to="/"
  className="logo"
  aria-label="NEXORA Technologies Home"
>
  NEXORA
</Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <nav
        id="main-navigation"
        className={`nav-links ${menuOpen ? 'nav-open' : ''}`}
        aria-label="Main navigation"
      >
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/portfolio" onClick={closeMenu}>Our Work</NavLink>
        <NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </nav>

      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle colour theme"
        aria-pressed={!darkMode}
        title="Switch colour theme"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

    </header>
  );
}
