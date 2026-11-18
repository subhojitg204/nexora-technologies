
import { useState, useEffect } from 'react';
import {
  Link,
  NavLink,
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  ArrowLeft,
  ArrowUpRight,
  House,
  Building2,
  Layers3,
  BriefcaseBusiness,
  Wallet,
  Mail,
  UserRound,
  ShieldCheck,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const navigationLinks = [
  { path: '/', label: 'Home', icon: House },
  { path: '/about', label: 'About', icon: Building2 },
  { path: '/services', label: 'Services', icon: Layers3 },
  { path: '/portfolio', label: 'Our Work', icon: BriefcaseBusiness },
  { path: '/pricing', label: 'Pricing', icon: Wallet },
  { path: '/contact', label: 'Contact', icon: Mail }
];

export default function Header({ darkMode, onToggleTheme }) {

  const [menuOpen, setMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();


useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY || 0;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollHeight > 0
        ? Math.min(100, Math.max(
            0,
            (scrollTop / scrollHeight) * 100
          ))
        : 0;

    setScrolled(scrollTop > 60);
    setScrollProgress(progress);
  };

  handleScroll();

  window.addEventListener('scroll', handleScroll, {
    passive: true
  });

  window.addEventListener('resize', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  };
}, [location.pathname]);


  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleBack = () => {
    closeMenu();

    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
  <header
  className={`navbar cyber-navbar ${
    scrolled ? 'navbar-scrolled' : ''
  }`}
> 

      {/* BRAND SECTION */}

      <div className="navbar-brand">

        {location.pathname !== '/' && (
          <button
            type="button"
            className="navbar-back-btn"
            onClick={handleBack}
            aria-label="Go back to previous page"
            title="Go Back"
          >
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
        )}

        <Link
          to="/"
          className="logo cyber-logo"
          aria-label="NEXORA Technologies Home"
          onClick={closeMenu}
        >

          <div className="cyber-logo-icon">
            <svg
              viewBox="0 0 48 48"
              width="42"
              height="42"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="nexoraLogoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>

              <path
                d="M12 35 V13 L36 35 V13"
                fill="none"
                stroke="url(#nexoraLogoGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="cyber-logo-text">
            <strong>NEXORA<span>.</span></strong>
            <small>TECHNOLOGIES</small>
          </div>

        </Link>

      </div>

      {/* MOBILE MENU TOGGLE */}

      <button
        type="button"
        className="menu-toggle cyber-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        {menuOpen
          ? <X size={22} aria-hidden="true" />
          : <Menu size={22} aria-hidden="true" />
        }
      </button>

      {/* MAIN NAVIGATION */}

      <nav
        id="main-navigation"
        className={`nav-links cyber-nav-links ${menuOpen ? 'nav-open' : ''}`}
        aria-label="Main navigation"
      >
<p className="cyber-mobile-label">
  EXPLORE NEXORA
</p>
        <div className="cyber-nav-capsule">

          {navigationLinks.map(({ path, label, icon: Icon }) => (

            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={closeMenu}
              className="cyber-nav-item"
            >
              <Icon size={16} aria-hidden="true" />
              <span>{label}</span>
              <ChevronRight
  size={16}
  className="cyber-mobile-arrow"
  aria-hidden="true"
/>
            </NavLink>

          ))}

        </div>

        {/* AUTHENTICATION BUTTONS */}
<p className="cyber-mobile-label">
  ACCOUNT ACCESS
</p>
        <div className="cyber-auth-buttons">

          <NavLink
            to="/login"
            onClick={closeMenu}
            className="login-btn user-login-btn"
          >
            <UserRound size={17} aria-hidden="true" />
            <span>User Login</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </NavLink>

          <NavLink
            to="/admin/login"
            onClick={closeMenu}
            className="login-btn admin-login-btn"
          >
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Admin Login</span>
          </NavLink>

        </div>

      </nav>

      {/* THEME TOGGLE */}

      <button
        type="button"
        className="theme-toggle cyber-theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle colour theme"
        aria-pressed={!darkMode}
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode
          ? <Sun size={20} aria-hidden="true" />
          : <Moon size={20} aria-hidden="true" />
        }
      </button>
{/* SCROLL PROGRESS BAR */}

<div className="cyber-scroll-track" aria-hidden="true">
  <div
    className="cyber-scroll-progress"
    style={{ width: `${scrollProgress}%` }}
  />
</div>
{/* MOBILE MENU BACKDROP */}

{menuOpen && (
  <div
    className="cyber-menu-backdrop"
    onClick={closeMenu}
    aria-hidden="true"
  />
)}
    </header>
  );
}
