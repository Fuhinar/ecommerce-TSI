import React from "react";
import { useNavigate } from "react-router-dom";
import "./FramedCanvas.css";

export default function FramedCanvas({ products = [] }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/artpersonalpage/${id}`);
  };

  return (
    <div className="framed-canvas-page">
      <div className="framed-canvas-header">
        <h1>Холст в рамке</h1>
        <p>
          Приобретая картину, созданную детьми, вы приобретаете не просто изображение — вы привозите домой уникальную историю и эмоции. Каждая картина — это произведение искусства, которое вдохновляет и радует глаз.
        </p>
        <p>
          Рама придает произведению искусства завершенный вид и подчеркивает его красоту, делая его настоящим центром внимания в вашем интерьере.
        </p>
      </div>

      <div className="framed-canvas-grid">
        {products.map((item, index) => (
          <div
            key={index}
            className="framed-canvas-card"
            onClick={() => handleCardClick(item.id)} // Добавьте обработчик клика
          >
            <div className="image-container">
              <img src={item.image} alt={item.title} className="framed-canvas-image" />
            </div>
            <div className="framed-canvas-info">
              <p className="description">{item.description}</p>
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