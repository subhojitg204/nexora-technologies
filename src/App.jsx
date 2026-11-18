import UserLogin from "./pages/User/UserLogin";
import UserRegister from "./pages/User/UserRegister";
import UserDashboard from "./pages/User/UserDashboard";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from "./pages/Admin/Admin.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

import Home from "./pages/Home/Home.jsx";
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
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App;
