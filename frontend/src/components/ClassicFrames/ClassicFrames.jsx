import React, { useState } from "react";
import "./ClassicFrames.css";
import { useNavigate } from "react-router-dom";

export default function ClassicFrames({ products = [] }) {
  const navigate = useNavigate();
  
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleCardClick = (id) => {
    navigate(`/artpersonalpage/${id}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="classic-canvas-card"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="image-container">
              <img src={item.image} alt={item.name} className="classic-frames-image" />
            </div>
            <div className="classic-frames-info">
              <p className="topic">{item.title}</p>
              <p className="price">Цена: {item.price} Сом</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
