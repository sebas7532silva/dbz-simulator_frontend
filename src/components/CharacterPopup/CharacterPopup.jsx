import { useEffect, useState } from "react";

function CharacterPopup({ character, onClose, planet }) {
    console.log(character);

    return (
        <div className="character__popup-container">
            <div className="character__container" style={{ backgroundImage: `url(${planet.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h2 className="character__name">{character.name}</h2>
                <div className="character__image-container">
                    <img 
                    src={character.image} 
                    alt={character.name} 
                    className="character__image" 
                />
                </div>
            </div>
            <div className="character__popup-information">
                <h1 className="character__popup-title">Acerca de</h1>
                <h2 className="character__popup-text">{character.description}</h2>
                <h1 className="character__popup-title">Raza:
                    <span className="character__popup-text">{character.race}</span>
                </h1>
                <h1 className="character__popup-title">Planeta de Origen:
                    <span className="character__popup-text">{planet.name}</span>
                </h1>
                <h1 className="character__popup-title">Poder base:
                    <span className="character__popup-text">{character.ki}</span>
                </h1>
                <h1 className="character__popup-title">Poder máximo:
                    <span className="character__popup-text">{character.maxKi}</span>
                </h1>
                

            </div>
        </div>

    )


}

export default CharacterPopup;
