import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { logoPositions } from '../LogoPositions';
import './ArtPersonalPage.css';

export default function ArtPersonalPage({ works, artists }) {
  const { workId } = useParams();
  const { addToCart } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [cartNotification, setCartNotification] = useState('');

  const work = works.find((w) => w.id === parseInt(workId, 10));
  if (!work) return <h2>Работа не найдена</h2>;

  const artist = artists.find((a) => a.id === work.artist) || {};

  const isWearable = ['hoodie', 'tshirt', 'sweatshirt'].includes(work.category);
  const isPainting = work.category === 'painting';

  const positions = logoPositions[work.category] || [];
  const selectedLogoObj = positions.find((p) => p.id === selectedLogo);

  const handleAddToCart = () => {
    if (isWearable && !selectedLogo) {
      alert('Пожалуйста, выберите расположение логотипа.');
      return;
    }

    const quantity = isPainting ? 1 : document.getElementById('quantity').value;

    addToCart({
      ...work,
      size: isWearable ? selectedSize : null,
      logoPosition: selectedLogoObj ? selectedLogoObj.label : null,
      quantity,
    });

    setCartNotification('Товар добавлен в корзину!');
    setTimeout(() => {
      setCartNotification('');
    }, 3000);
  };

  return (
    <div className="product-page">
      {cartNotification && (
        <div className="cart-notification">
          {cartNotification}
        </div>
      )}
      
      <div className="product-page__card">
        <div className="product-page__top">
          <div className="product-page__images">
            <img
              src={work.image}
              alt={work.title}
              className="product-page__main-image"
            />

            {isWearable && selectedLogo && (
              <div className="product-page__logo-preview">
                <img
                  src={selectedLogoObj.image}
                  alt={selectedLogoObj.label}
                  className="product-page__logo-image"
                />
                <p className="product-page__logo-label">
                  <strong>{selectedLogoObj.label}</strong>
                </p>
              </div>
            )}
          </div>

          <div className="product-page__info">
            <h1 className="product-page__title">{work.title}</h1>

            <p className="product-page__artist">
              <span>Подробнее о художнике: </span>
              {artist.id ? (
                <Link to={`/artistpersonalpage/${artist.id}`} className="artist-link">
                  {artist.name}
                </Link>
              ) : (
                'Неизвестный художник'
              )}
            </p>

            <p className="product-page__price">{work.price} Сом</p>

            {isWearable && (
              <div className="product-page__options">
                <div className="product-page__option">
                  <label htmlFor="size">Размер:</label>
                  <select
                    id="size"
                    name="size"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                <div className="product-page__option">
                  <label>Расположение логотипа:</label>
                  <div className="product-page__variants">
                    {positions.map((logo) => (
                      <div
                        key={logo.id}
                        className={`product-page__variant-item ${
                          selectedLogo === logo.id ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedLogo(logo.id)}
                      >
                        <img src={logo.image} alt={logo.label} />
                      </div>
                    ))}
                  </div>
                  <p className="product-page__note">
                    *Изображения показывают расположение логотипа, а не итоговый дизайн.
                  </p>
                </div>
              </div>
            )}

            {!isPainting && (
              <div className="product-page__option">
                <label htmlFor="quantity">Количество:</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  defaultValue="1"
                />
              </div>
            )}

            <button className="product-page__add-to-cart" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>

      <div className="product-page__card product-page__description">
        <h2>Описание</h2>
        <p>{work.description || 'Описание отсутствует.'}</p>
      </div>
    </div>
  );
}
