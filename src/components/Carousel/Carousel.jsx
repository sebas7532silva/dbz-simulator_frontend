import React, { useState } from 'react';

const Carousel = ({ cards, userCards, setUserCards }) => {
  const [current, setCurrent] = useState(0);

  const prevCard = () => {
    setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % cards.length);
  };

  const getCard = (indexOffset) => {
    const index = (current + indexOffset + cards.length) % cards.length;
    return cards[index];
  };

  const handleAddCard = (card) => {
    if (!userCards.some(userCard => userCard.id === card.id)) {
      
      setUserCards(prevCards => [...prevCards, card]);
      console.log(userCards);
    }
  };

  return (
    <div className="carousel">
      <button className="carousel-button" onClick={prevCard}>&lt;</button>

      <div className="carousel-track">
      {[-1, 0, 1].map((offset) => {
          const card = getCard(offset);
          const isAdded = userCards.some(userCard => userCard.id === card.id);

          return (
            <div
              key={card.id}
              className={`carousel-card ${offset === 0 ? 'center' : 'side'} ${isAdded ? 'added' : ''}`}
              style={{ backgroundImage: 'url("/images/summonWall.jpeg")' }}
            >
              <h1 className='carousel__card-name'>{card.name}</h1>
              <div className='carousel__image-container'>
                <img
                  src={card.image}
                  alt={card.name}
                  className="carousel-image"
                />
              </div> 
              <button
                onClick={() => handleAddCard(card)}
                className='carousel__add-button'
                disabled={isAdded}
              >
                {isAdded ? 'Agregada' : 'Agregar'}
              </button>
            </div>
          );
        })}

      </div>

      <button className="carousel-button" onClick={nextCard}>&gt;</button>
    </div>
  );
};

export default Carousel;


