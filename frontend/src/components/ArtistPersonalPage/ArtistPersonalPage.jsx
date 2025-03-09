import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtistPersonalPage.css';

export default function ArtistPersonalPage({ ArtistInfoPage, works }) {
  const { artistId } = useParams(); // Получаем ID художника из URL
  const history = useNavigate();

  // Преобразуем artistId из строки в число
  const artist = ArtistInfoPage?.find((a) => a.id === parseInt(artistId, 10));
  const artistsWorks = works?.filter((work) => work.artist === parseInt(artistId, 10));

  if (!artist) {
    return <h2>Artist not found</h2>;
  }

  return (
    <div className="artist-personal-page">  
      <header className="artist-header">
        <h1>{artist.secondName} {artist.name}</h1>
        <p>{artist.bio}</p>
      </header>
      <div className="artist-photos">
        <img src={artist.photo} alt={artist.name} className="artist-photo-1" />
        <img src={artist.secondaryPhoto} alt={`${artist.name}`} className="artist-photo-2" />
      </div>

      <section className="artist-works">
        <h2>Artist's works:</h2>
        <div className="works-grid">
          {artistsWorks.map((work) => (
            <div
              key={work.id}
              className="work-card"
              onClick={() => history(`/artpersonalpage/${work.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={work.image} alt={work.topic} className="work-image" />
              <p className="work-title">{work.topic}</p>
              <p className="work-price">Price: {work.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="subscribe">
        <h2>Subscribe to our emails</h2>
        <p>Stay informed about new works and updates from this artist.</p>
        <form
          className="subscribe-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing!");
          }}
        >
          <input
            type="email"
            className="subscribe-input"
            placeholder="Enter your email"
            required
          />
          
        </form>
      </section>
    </div>
  );
}
