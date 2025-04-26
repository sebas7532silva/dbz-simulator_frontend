import { useState } from "react";


function Card({ character, onClick }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        onClick(character);
    };

    return (
        <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
            <div className="card__front">
                <img src={character.image} alt={character.name} className="card__image" />
                <h3 className="card__name">{character.name}</h3>
            </div>
            <div className="card__back">
                <h3 className="card__name">{character.name}</h3>
                <p className="card__description">{character.description}</p>
            </div>
        </div>
    );
}

export default Card;