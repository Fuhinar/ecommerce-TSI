import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SearchPage.css';

export default function SearchPage() {
  const [artists, setArtists] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase().trim() || '';

  // Функция для загрузки данных через axios
  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.error(`Ошибка при загрузке данных с ${url}:`, err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        await Promise.all([
          fetchData('/api/artists/', setArtists),
          fetchData('/api/products/', setProducts),
        ]);
      } catch (err) {
        setError("Ошибка при загрузке данных. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Фильтрация продуктов по title, description и category
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  // Фильтрация артистов по name, secondName и bio
  const filteredArtists = artists.filter((artist) => {
    return (
      artist.name.toLowerCase().includes(query) ||
      artist.secondName.toLowerCase().includes(query) ||
      artist.bio.toLowerCase().includes(query)
    );
  });

  // Объединяем результаты, добавляя тип для каждого объекта
  const combinedResults = [
    ...filteredProducts.map(product => ({ ...product, type: 'product' })),
    ...filteredArtists.map(artist => ({ ...artist, type: 'artist' }))
  ];

  return (
    <div className="search-page">
      <h1>Результаты поиска</h1>
      <p>Вы искали: <strong>{query}</strong></p>

      {loading && <p>Загрузка данных...</p>}
      {error && <p className="error">{error}</p>}

      {(!loading && !error) && (
        combinedResults.length > 0 ? (
          <ul className="results-list">
            {combinedResults.map((item) => (
              <li key={`${item.type}-${item.id}`} className="result-item">
                {item.type === 'product' ? (
                  <Link to={`/artpersonalpage/${item.id}`}>
                    <h3>{item.title}</h3>
                    <img src={item.image} alt={item.title} />
                    <p><strong>Цена:</strong> {item.price} Сом</p>
                  </Link>
                ) : (
                  <Link to={`/artistpersonalpage/${item.id}`}>
                    <h3>{item.name} {item.secondName}</h3>
                    <img src={item.photo} alt={item.name} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Ничего не найдено.</p>
        )
      )}
    </div>
  );
}
