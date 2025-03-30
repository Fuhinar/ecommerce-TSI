import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistsWorksSection.css';

export default function ArtistsWorksSection({ products = [] }) {
  const navigate = useNavigate();

  // Перемешиваем и берём только 8 случайных работ
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const selectedWorks = shuffled.slice(0, 8);

  return (
    <div className="artists-work-section">
      <h2>Работы наших художников:</h2>
      <div className="grid-container">
        {selectedWorks.map((item) => (
          <div 
            key={item.id} 
            className="grid-item" 
            onClick={() => navigate(`/artpersonalpage/${item.id}`)}
          >
            <div className="image-container">
              <img
                src={item.image} 
                alt={`${item.title} - ${item.topic}`}
                className="work-image"
              />
            </div>
            <div className="info">
              <p><strong>{item.title}</strong></p>
              <p><strong>Цена:</strong> {item.price} Сом</p>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button" onClick={() => navigate(`/framed-canvas/`)}>
        Просмотреть все
      </button>
    </div>
  );
}
