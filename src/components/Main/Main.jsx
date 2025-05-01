import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";
import { useState } from "react";

function Main({ cards, planets }) {
  const [userCards, setUserCards] = useState([]);

  const goku = cards.find((character) => character.name === "Jiren");

  return (
    <div className="cards">
        <div className="cards__title-container">
            <img src="../images/YourCardsES.png" 
                    alt="Your Cards" 
                    className="cards__image-title" />
        </div>
        <div className="cards__container">
            <Card character={goku} />

        </div>  
    </div>
  );
} 

export default Main;