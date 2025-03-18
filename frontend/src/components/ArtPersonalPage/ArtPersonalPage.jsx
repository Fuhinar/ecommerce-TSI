import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { logoPositions } from '../LogoPositions';
import './ArtPersonalPage.css';

export default function ArtPersonalPage({ works, artists }) {
  const { workId } = useParams();
  const { addToCart } = useContext(CartContext);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M'); // По умолчанию M
  const [selectedLogo, setSelectedLogo] = useState(null); // Выбранное положение логотипа

  const work = works.find((w) => w.id === parseInt(workId, 10));
  if (!work) return <h2>Работа не найдена</h2>;

  const artist = artists.find((a) => a.id === work.artistId) || {};

  // Категории, где нужен выбор размера и логотипа
  const isWearable = ['hoodie', 'tshirt', 'sweatshirt'].includes(work.category);
  const isPainting = work.category === 'painting';
  const positions = logoPositions[work.category] || [];
  

  const handleAddToCart = () => {
    if (isWearable && !selectedLogo) {
      alert('Пожалуйста, выберите расположение логотипа.');
      return;
    }

    const quantity = isPainting ? 1 : document.getElementById('quantity').value;

    addToCart({
      ...work,
      size: isWearable ? selectedSize : null,
      logoPosition: selectedLogo,
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
              {isWearable && (
                <>
                  <div className="size-selector">
                    <label htmlFor="size">Размер:</label>
                    <select id="size" name="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  <div className="variant-selector">
                    <label>Выберите расположение логотипа:</label>
                    <div className="gallery-grid">
                      {positions.map((logo, index) => (
                        <div
                          key={index}
                          className={`gallery-item ${selectedLogo === logo.id ? 'selected' : ''}`}
                          onClick={() => setSelectedLogo(logo.id)}
                        >
                          <img src={logo.image} alt={`Позиция ${logo.id}`} />
                        </div>
                      ))}

                    </div>
                    <p className="logo-info">*Приведенные изображения показывают только расположение логотипа, фактический дизайн будет основан на выбранном изображении.</p>
                  </div>
                </>
              )}

              {!isPainting && (
                <div className="quantity-selector">
                  <label htmlFor="quantity">Количество:</label>
                  <input id="quantity" name="quantity" type="number" min="1" defaultValue="1" />
                </div>
              )}

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
