import "./Footer.css";
import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function FooterSocialLinks() {
    return (
        <div className="footer-social-links">
            <a href="https://www.instagram.com/weaveart.kg/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
            </a>
        </div>
    );
}
