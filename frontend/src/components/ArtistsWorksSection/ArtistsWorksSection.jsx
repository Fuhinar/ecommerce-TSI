import React from 'react';
import './ArtistsWorksSection.css';

const artistsWork = [
  {
    name: 'Artist Name 1',
    topic: 'Abstract',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Artist Name 2',
    topic: 'Landscape',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Artist Name 3',
    topic: 'Portrait',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Artist Name 4',
    topic: 'Abstract',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Artist Name 1',
    topic: 'Abstract',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Artist Name 2',
    topic: 'Landscape',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Artist Name 3',
    topic: 'Portrait',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Artist Name 4',
    topic: 'Abstract',
    price: '$$$',
    image: 'https://via.placeholder.com/150',
  }
];

const ArtistsWorksSection = () => {
  return (
    <div className="artists-work-section">
      <h2>Our artists work:</h2>
      <div className="grid-container">
        {artistsWork.map((work, index) => (
          <div key={index} className="grid-item">
            <img src={work.image} alt={`${work.name} - ${work.topic}`} />
            <div className="info">
              <p><strong>{work.topic}</strong></p>
              <p><strong>Price:</strong> {work.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button">View all</button>
    </div>
  );
};

export default ArtistsWorksSection;
