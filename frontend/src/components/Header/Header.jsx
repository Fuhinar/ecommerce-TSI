import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавьте useNavigate
import logo from './logo.png';
import { FaShoppingCart, FaSearch, FaUser, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext'; // Исправьте путь
import './Header.css';


export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); // Хук для навигации

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Подсчет общей суммы
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Оформление заказа
  const handleCheckout = () => {
    navigate('/cart'); // Перенаправление на страницу корзины
    setCartOpen(false); // Закрыть корзину
  };

  return (
    <div>
      {/* Мобильное меню */}
      <div className="topbar">
        <div className={`burger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>Главная</Link>
          <Link to="/artist" className="nav-link" onClick={toggleMenu}>Художники</Link>
          <Link to="/framed-canvas" className="nav-link" onClick={toggleMenu}>Картины</Link>
          <Link to="/classic-frames" className="nav-link" onClick={toggleMenu}>Мерч</Link>
          <Link to="/events" className="nav-link" onClick={toggleMenu}>События</Link>
        </div>
      </div>

      {/* Хедер */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/artist" className="nav-link">Художники</Link>
          <Link to="/framed-canvas" className="nav-link">Картины</Link>
          <Link to="/classic-frames" className="nav-link">Мерч</Link>
          <Link to="/events" className="nav-link">События</Link>
        </nav>
        
        {/* Кнопки справа */}
        <div className="buttons">
          <FaShoppingCart onClick={toggleCart} className={`shop-cart-button ${cartOpen ? 'active' : ''}`} />
          <FaSearch className="search-button" />
          {userLoggedIn ? (
            <img 
              src={userAvatar || '/path/to/default-avatar.png'}
              alt="User Avatar"
              className="user-avatar"
            />
          ) : (
            <Link to="/login">
              <FaUser className="user-login-icon" />
            </Link>
          )}
        </div>
      </header>

      {/* Корзина */}
      {cartOpen && (
        <div className="cart-dropdown">
          <h3>Корзина</h3>
          {cartItems.length > 0 ? (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-details">
                      <p>{item.title}</p>
                      <p>{item.price} Сом x {item.quantity}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <FaPlus />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <p><strong>Итого:</strong> {totalAmount.toFixed(2)} Сом</p>
                <button className="checkout-button" onClick={handleCheckout}>Оформить заказ</button>
              </div>
            </>
          ) : (
            <p className="empty-cart-message">Корзина пуста</p>
          )}
          <button className="close-cart" onClick={toggleCart}><FaTimes /></button>
        </div>
      )}

      <div className="divider"></div>
    </div>
  );
}