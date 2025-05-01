import Card from "../Card/Card";
function Main({ cards, planets }) {

  const goku = cards.find((character) => character.name === "Goku");

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