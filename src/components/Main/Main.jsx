import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Popup from "../Popup/Popup";
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from "react";

function Main({ cards, userCards, setUserCards }) {
  const [isCarruselOpen, setIsCarruselOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleAddCards() {
    setIsCarruselOpen(true);
  }

  function handlePopupClose() {
    setIsCarruselOpen(false);
  }

  function handleDeleteCard(cardId) {
    setUserCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
    }, []);

  if (loading) return <Preloader />;
  

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
      {isCarruselOpen && (<Popup onClose={handlePopupClose} >
          <Carousel cards={cards} userCards={userCards} setUserCards={setUserCards}/>
        </Popup>)}
        
        <div className="cards__container">
          {userCards.map((card) => (
            <Card character={card} key={card.id} onDelete={handleDeleteCard} />
          ))}
        </div>

    </div>
  );
} 

export default Main;