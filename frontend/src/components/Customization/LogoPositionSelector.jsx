import React, { useState } from "react";

const positions = [
  { id: "front", label: "Спереди", image: "/images/logo_front.jpg" },
  { id: "back", label: "Сзади", image: "/images/logo_back.jpg" },
];

const LogoPositionSelector = ({ onPositionChange }) => {
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    onPositionChange(position.id);
  };

  return (
    <div className="logo-selector">
      <h3>Выберите расположение логотипа</h3>
      <div className="preview">
        <img src={selectedPosition.image} alt={selectedPosition.label} />
      </div>
      <div className="options">
        {positions.map((pos) => (
          <button
            key={pos.id}
            className={selectedPosition.id === pos.id ? "active" : ""}
            onClick={() => handlePositionChange(pos)}
          >
            {pos.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LogoPositionSelector;
