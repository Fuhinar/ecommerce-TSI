import React from "react";
import "./Footer.css";
export default function FooterCountrySelector() {
    return (
        <div className="footer-country-selector">
            <label htmlFor="country">Country/region</label>
            <select id="country" className="country-selector">
                <option value="kg">Bishkek, Kyrgyzstan (KGS)</option>
                <option value="us">New York, USA (USD)</option>
                <option value="uk">London, UK (GBP)</option>
            </select>
        </div>
    );
}
