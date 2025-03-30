import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtistPersonalPage.css';

export default function ArtistPersonalPage({ ArtistInfoPage, works }) {
  const { artistId } = useParams();
  const history = useNavigate();

  const artist = ArtistInfoPage?.find((a) => a.id === parseInt(artistId, 10));
  
  // Фильтруем только картины этого художника
  const artistsWorks = works?.filter(
    (work) => work.artist === parseInt(artistId, 10) && work.category === 'painting'
  );

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
        <h2>Работы художника:</h2>
        {artistsWorks.length === 0 ? (
          <p>У этого художника пока нет картин.</p>
        ) : (
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
                <p className="work-price">Цена: {work.price} Сом</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="subscribe">
        <h2>Подпишитесь на нашу рассылку</h2>
        <p>Будьте в курсе новых работ и обновлений этого художника.</p>
        <form
          className="subscribe-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Спасибо за подписку!");
          }}
        >
          <input
            type="email"
            className="subscribe-input"
            placeholder="Введите ваш email"
            required
          />
        </form>
      </section>
    </div>
  );
}
