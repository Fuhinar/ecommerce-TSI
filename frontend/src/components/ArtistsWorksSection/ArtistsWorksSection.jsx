// ArtistsWorksSection.js
import React from 'react';
import './ArtistsWorksSection.css';
  export default function ArtistsWorksSection({ products = [] }) {
    return (
      <div className="artists-work-section">
        <h2>Our artists work:</h2>
        <div className="grid-container">
          {products.map((item) => (
            <div key={item.id} className="grid-item">
              <div className="image-container">
                <img
                  src={item.image} // <-- здесь используем item.image из API
                  alt={`${item.title} - ${item.topic}`}
                  className="work-image"
                />
              </div>
              <div className="info">
                <p><strong>{item.title}</strong></p>
                <p><strong>Price:</strong> {item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-button">View all</button>
      </div>
    );
  }

