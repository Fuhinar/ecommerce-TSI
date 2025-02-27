import React from 'react';
import { useParams } from 'react-router-dom';
import './ArtPersonalPage.css';

export default function ArtPersonalPage({ works, artists }) {
  const { workId } = useParams();
  const work = works.find((w) => w.id === parseInt(workId, 10));
  const artist = artists.find((a) => a.id === work.artistId);

  if (!work) {
    return <h2>Work not found</h2>;
  }

  return (
    <div className="art-personal-page">
      <header className="art-header">
        <div className="art-header-container">
          <img src={work.image} alt={work.title} className="art-image-large" />
          <div className="artist-info">
            <img src={artist.photo} alt={artist.name} className="artist-photo" />
            <p className='artist-name'>
              More about: {artist.name}
            </p>
            <p className="art-price">Price: {work.price}</p>
            <section className="art-options">
              
              <div className="options-container">
                <div className="size-selector">
                  <label htmlFor="size">Size:</label>
                  <select id="size" name="size">
                    <option value="10x10">10 cm x 10 cm</option>
                    <option value="20x20">20 cm x 20 cm</option>
                    <option value="30x30">30 cm x 30 cm</option>
                  </select>
                </div>
                <div className="quantity-selector">
                  <label htmlFor="quantity">Pack Quantity:</label>
                  <input id="quantity" name="quantity" type="number" min="1" defaultValue="1" />
                </div>
              </div>
              <button className="add-to-cart">Add to Cart</button>
            </section>
          </div>
        </div>
      </header>

      <section className="art-description">
        <h2>Description</h2>
        <p>{work.description || 'No description available.'}</p>
      </section>
    </div>
  );
}
