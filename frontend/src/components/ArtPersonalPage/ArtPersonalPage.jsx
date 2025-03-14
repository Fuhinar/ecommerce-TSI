import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { productVariants } from '../CustomizingChoices';
import './ArtPersonalPage.css';

export default function ArtPersonalPage({ works, artists }) {
  const { workId } = useParams();
  const { addToCart } = useContext(CartContext);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const work = works.find((w) => w.id === parseInt(workId, 10));

  if (!work) {
    return <h2>Работа не найдена</h2>;
  }

  const artist = artists.find((a) => a.id === work.artistId) || {};

  // Приведение категории к ключу в productVariants
  const categoryMap = {
    'толстовка': 'hoodie',
    'футболка': 'tshirt',
    // Другие категории
  };

  const variants = productVariants[categoryMap[work.category]] || [];

  const renderOptions = () => {
    if (!variants.length) {
      return <p>Варианты для этой категории отсутствуют.</p>;
    }

    switch (work.category) {
      case 'толстовка':
      case 'футболка':
        return (
          <>
            <div className="size-selector">
              <label htmlFor="size">Размер:</label>
              <select id="size" name="size">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="variant-selector">
              <label>Выберите вариант:</label>
              <div className="gallery-grid">
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`gallery-item ${selectedVariant?.id === variant.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <img src={variant.image} alt={`Вариант ${variant.id}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    if ((work.category === 'толстовка' || work.category === 'футболка') && !selectedVariant) {
      alert('Пожалуйста, выберите вариант.');
      return;
    }

    const quantity = document.getElementById('quantity').value;
    const size = document.getElementById('size')?.value;

    addToCart({
      ...work,
      variant: selectedVariant,
      size,
      quantity,
    });
  };

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
                {renderOptions()}
                <div className="quantity-selector">
                  <label htmlFor="quantity">Количество:</label>
                  <input id="quantity" name="quantity" type="number" min="1" defaultValue="1" />
                </div>
              </div>
              <button className="add-to-cart" onClick={handleAddToCart}>
                Добавить в корзину
              </button>
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