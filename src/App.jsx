import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

import Home from './pages/Home/home.jsx';
import About from './pages/About/About.jsx';
import Services from './pages/Services/Services.jsx';
import Portfolio from './pages/Portfolio/Portfolio.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Contact from './pages/Contact/Contact.jsx';

import './App.css';

function App() {

  // Load the previously selected theme
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('nexora-theme') !== 'light';
  });

  // Save theme whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'nexora-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(previous => !previous);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>

      <Header
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
