import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Artists.css';

export default function Artists({ ArtistsPage = [] }) {
  const history = useNavigate(); // Для навигации

  return (
    <div className="artists-section">
      <h2 className="artists-section-title">Our Artists</h2>
      <div className="artists-grid">
        {ArtistsPage.map((artist) => (
          <div
            key={artist.id}
            className="artists-card"
            onClick={() => history(`/artistpersonalpage/${artist.id}`)} // Перенаправление на страницу художника
            style={{ cursor: 'pointer' }}
          >
            <div className="artists-image-container">
              <img
                src={artist.photo}
                alt={artist.name}
                className="artists-photo"
              />
            </div>
            <p className="artists-name">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
