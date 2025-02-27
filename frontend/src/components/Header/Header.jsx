import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import './Header.css';

export default function Header() {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(prevCartOpen => !prevCartOpen);
    };

    return (
        <div>
            <div className='topbar'></div>
            <header className='header'>
                <img src={logo} alt="Logo" className='logo' />
                <nav className='nav'>
                    <Link to="/" className='nav-link'>Home</Link>
                    <Link to="/artist" className='nav-link'>Artists</Link>
                    <Link to="/framed-canvas" className='nav-link'>Framed Canvas</Link>
                    <Link to="/classic-frames" className='nav-link'>Classic Frames</Link>
                    <Link to="/events" className='nav-link'>Events</Link>
                </nav>
                <div className='buttons'>
                    <FaShoppingCart 
                        onClick={toggleCart} 
                        className={`shop-cart-button ${cartOpen ? 'active' : ''}`} 
                    />
                    <FaSearch className='search-button' />
                </div>
            </header>
            <div className='divider'></div>
        </div>
    );
}
