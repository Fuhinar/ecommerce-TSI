import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // состояние для отслеживания авторизации
  const [userAvatar, setUserAvatar] = useState(null); // аватарка пользователя

  const toggleCart = () => {
    setCartOpen((prevCartOpen) => !prevCartOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="topbar">
        <div className={`burger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Главная
          </Link>
          <Link to="/artist" className="nav-link" onClick={toggleMenu}>
            Художники
          </Link>
          <Link to="/framed-canvas" className="nav-link" onClick={toggleMenu}>
            Картины
          </Link>
          <Link to="/classic-frames" className="nav-link" onClick={toggleMenu}>
            Мерч
          </Link>
          <Link to="/events" className="nav-link" onClick={toggleMenu}>
            События
          </Link>
        </div>
      </div>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">
            Главная
          </Link>
          <Link to="/artist" className="nav-link">
            Художники
          </Link>
          <Link to="/framed-canvas" className="nav-link">
            Картины
          </Link>
          <Link to="/classic-frames" className="nav-link">
            Мерч
          </Link>
          <Link to="/events" className="nav-link">
            События
          </Link>
        </nav>
        <div className="buttons">
          <FaShoppingCart
            onClick={toggleCart}
            className={`shop-cart-button ${cartOpen ? 'active' : ''}`}
          />
          <FaSearch className="search-button" />
            {userLoggedIn ? (
              <img 
                src={userAvatar || '/path/to/default-avatar.png'}
                alt="User Avatar"
                className="user-avatar"
              />
            ) : (
              <FaUser className="user-login-icon" />
            )}
        </div>
      </header>
      <div className="divider"></div>
    </div>
  );
}
