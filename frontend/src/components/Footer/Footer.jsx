import React from "react";
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

            {/* Social Media Section */}
            <div className="footer-section footer-social-links">
                <FooterSocialLinks />
            </div>
        </footer>
    );
}
