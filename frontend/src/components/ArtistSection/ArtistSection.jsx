import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistSection.css';

export default function ArtistSection({ artists = [] }) {
  const history = useNavigate();

  return (
    <div className="artist-section">
      <h2 className="section-title">Some of our artists:</h2>
      <div className="artist-grid">
        {artists.slice(0, 3).map((artist) => (
          <div
            key={artist.id}
            className="artist-card"
            onClick={() => history(`/artistpersonalpage/${artist.id}`)} // Перенаправление на страницу художника
          >
            <div className="image-container">
              <img src={artist.photo} alt={artist.name} className="artist-photo" />
            </div>
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>
      <button
        className="view-all-button"
        onClick={() => history('/artist')} // Переход на страницу всех художников
      >
        View All
      </button>
    </div>
  );
}
