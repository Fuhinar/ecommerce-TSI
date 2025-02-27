import React from 'react';

import Logo from './Logo-2.png';
import './FooterLogo.css';

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer-logo-container">
                <img src={Logo} alt="WeaveArt Logo" className="footer-logo" />
            </div>
        </div>
    );
}