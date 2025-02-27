import React from "react";
import "./FramedCanvas.css";

export default function FramedCanvas({ items = [] }) {
  return (
    
    <div className="framed-canvas-page">
      <div className="framed-canvas-header">
        <h1>Framed Canvas</h1>
        <p>
          When you purchase a painting created by children, you're not just acquiring an image—
          you're bringing home a unique story and emotions.
        </p>
        <p>
          A frame gives the artwork a finished look and highlights its beauty,
          making it a true focal point in your decor.
        </p>
      </div>

      <div className="framed-canvas-grid">
        {items.map((item, index) => (
          <div key={index} className="framed-canvas-card">
            <div className="image-container">
              <img src={item.image} alt={item.name} className="framed-canvas-image" />
            </div>
            <div className="framed-canvas-info">
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
