import React from "react";
import "./ClassicFrames.css";

export default function ClassicFrames({ products = [] }) {
  return (
    <div className="classic-frames-page">
      <div className="classic-frames-header">
        <h1>Classic Frames</h1>
        <p>
          Our artists with special needs bring a wide range of creativity to their work. Each piece reflects their unique vision and style.
        </p>
        <p>
          Classic frames highlight the uniqueness of each piece, emphasizing its best qualities. They give the artwork a finished and polished look.
        </p>
      </div>

      <div className="classic-frames-grid">
        {products.map((item, index) => (
          <div key={index} className="classic-frames-card">
            <div className="image-container">
              <img src={item.image} alt={item.name} className="classic-frames-image" />
            </div>
            <div className="classic-frames-info">
              <p className="artist-name">Artist name: {item.artist}</p>
              <p className="topic">Topic: {item.topic}</p>
              <p className="price">Price: {item.price}</p>
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
