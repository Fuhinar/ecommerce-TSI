import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; // ✅ Импорт контекста корзины
import './ArtPersonalPage.css';

export default function ArtPersonalPage({ works, artists }) {
  const { workId } = useParams();
  const { addToCart } = useContext(CartContext); // ✅ Используем контекст корзины
  const work = works.find((w) => w.id === parseInt(workId, 10));

  if (!work) {
    return <h2>Работа не найдена</h2>;
  }

  const artist = artists.find((a) => a.id === work.artistId) || {}; // ✅ Безопасное получение художника

  return (
    <div className="art-personal-page">
      <header className="art-header">
        <div className="art-header-container">
          <img src={work.image} alt={work.title} className="art-image-large" />
          <div className="artist-info">
            <p className='artist-name'>
              Подробнее о: {artist.name || 'Неизвестный художник'}
            </p>
            <p className="art-price">Цена: {work.price} Сом</p>
            <section className="art-options">
              <div className="options-container">
                <div className="size-selector">
                  <label htmlFor="size">Размер:</label>
                  <select id="size" name="size">
                    <option value="10x10">10 см x 10 см</option>
                    <option value="20x20">20 см x 20 см</option>
                    <option value="30x30">30 см x 30 см</option>
                  </select>
                </div>
                <div className="quantity-selector">
                  <label htmlFor="quantity">Количество:</label>
                  <input id="quantity" name="quantity" type="number" min="1" defaultValue="1" />
                </div>
              </div>
              <button className="add-to-cart" onClick={() => addToCart(work)}>Добавить в корзину</button>
            </section>
          </div>
        </div>
      </header>

      <section className="art-description">
        <h2>Описание</h2>
        <p>{work.description || 'Описание отсутствует.'}</p>
      </section>
    </div>
  );
}
