import React from "react";
import FooterCountrySelector from "./FooterCountrySelector";
import FooterLinks from "./FooterLinks";
import FooterSocialLinks from "./FooterSocialLinks";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            {/* Links Section */}
            <div className="footer-section footer-links-container">
                <FooterLinks />
            </div>

            {/* Country/Region Section */}
            <div className="footer-section footer-country-selector">
                <FooterCountrySelector />
            </div>

            {/* Social Media Section */}
            <div className="footer-section footer-social-links">
                <FooterSocialLinks />
            </div>
        </footer>
    );
}
