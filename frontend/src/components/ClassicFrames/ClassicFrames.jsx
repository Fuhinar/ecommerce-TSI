import React from "react";
import "./ClassicFrames.css";

export default function ClassicFrames({ products = [] }) {
  return (
    <div className="classic-frames-page">
      <div className="classic-frames-header">
        <h1>Классические рамки</h1>
        <p>
          Наши художники с особыми потребностями привносят в свою работу широкий спектр креативности. Каждая работа отражает их уникальное видение и стиль.
        </p>
        <p>
          Классические рамы подчеркивают уникальность каждого произведения, подчеркивая его лучшие качества. Они придают произведению искусства законченный и отполированный вид.
        </p>
      </div>

      <div className="classic-frames-grid">
        {products.map((item, index) => (
          <div key={index} className="classic-frames-card">
            <div className="image-container">
              <img src={item.image} alt={item.name} className="classic-frames-image" />
            </div>
            <div className="classic-frames-info">
              <p className="artist-name">Имя художника: {item.artist}</p>
              <p className="topic">Тема: {item.topic}</p>
              <p className="price">Цена: {item.price} Сом</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-button">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
      </div>
    </div>
  );
}
