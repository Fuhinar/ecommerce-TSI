import React from "react";
import "./Footer.css";
export default function FooterLinks() {
    return (
        <div className="footer-links-container">
            <p className="footer-heading">Больше</p>
            <ul className="footer-links">
                <li><a href="/terms">Правила пользования</a></li>
                <li><a href="/about">О нас</a></li>
                <li><a href="/blog">Блог</a></li>
                <li><a href="/faq">Часто задаваемые вопросы</a></li>
                <li><a href="/delivery">Доставка</a></li>
            </ul>
        </div>

    );
}
