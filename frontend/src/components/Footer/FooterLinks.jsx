import React from "react";
import "./Footer.css";
export default function FooterLinks() {
    return (
        <div className="footer-links-container">
            <p className="footer-heading">More</p>
            <ul className="footer-links">
                <li><a href="/terms">Terms of use</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/delivery">Delivery</a></li>
            </ul>
        </div>

    );
}
