import React, { useState } from "react";
import LogoPositionSelector from "./LogoPositionSelector";

const MerchCustomization = () => {
  const [logoPosition, setLogoPosition] = useState("front");

  return (
    <div>
      <h2>Кастомизация мерча</h2>
      <LogoPositionSelector onPositionChange={setLogoPosition} />
      <p>Выбранная позиция логотипа: {logoPosition}</p>
      <button onClick={() => alert(`Выбрана позиция: ${logoPosition}`)}>Подтвердить</button>
    </div>
  );
};

export default MerchCustomization;
