import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";
import { useState } from "react";

function Main({ cards, planets }) {
  const [userCards, setUserCards] = useState([]);
  const [isCarruselOpen, setIsCarruselOpen] = useState(false);

  function handleAddCards() {
    setIsCarruselOpen(true);
  }

  const goku = cards.find((character) => character.name === "Jiren");

  return (
    <div className="cards">
      <div className="cards__header-container">
        <div className="cards__title-container">
              <img src="../images/YourCardsES.png" 
                      alt="Your Cards" 
                      className="cards__image-title" />
          </div>
          <div className="cards__summon-container" onClick={handleAddCards}>
              <img src="../images/summonIcon.png" 
                          alt="Summon Icon" 
                          className="cards__image-summon" />
          </div>
      </div>
        <div className="cards__container">
            <Card character={goku} />

        </div>  
    </div>
  );
} 

export default Main;