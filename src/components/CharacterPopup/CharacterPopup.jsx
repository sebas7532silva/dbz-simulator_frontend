import { useEffect, useState } from "react";
import api from "../../utils/api.js";

function CharacterPopup({ character, onClose, planet }) {
    const [apiCharacter, setApiCharacter] = useState(null);
    const [transformationIndex, setTransformationIndex] = useState(-1);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const characterResponse = await api.getCharacterById(character.id);
                setApiCharacter(characterResponse);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCharacter();
    }, [character.id]);

    if (!apiCharacter) {
        return <div>Loading character...</div>;
    }

    const transformations = apiCharacter.transformations || [];

    const isBaseForm = transformationIndex === -1;
    const displayedCharacter = isBaseForm
        ? apiCharacter
        : transformations[transformationIndex];

        const handleTransform = () => {
            if (transformations.length === 0) return;
    
            setTransformationIndex((prevIndex) =>
                prevIndex + 1 < transformations.length
                    ? prevIndex + 1
                    : -1 // Volver a forma base
            );
        };

    return (
        <div className="character__popup-container">
            <div className="character__container" style={{ backgroundImage: `url(${planet.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h2 className="character__name">{displayedCharacter.name}</h2>
                <div className="character__image-container">
                    <img 
                    src={displayedCharacter.image} 
                    alt={displayedCharacter.name} 
                    className="character__image" 
                />
                </div>
                {apiCharacter.transformations?.length > 0 && (
                    <button
                        className="character__button"
                        type="button"
                        onClick={handleTransform}
                    >
                        Transformar
                    </button>
                )} 
            </div>
            <div className="character__popup-information">
                <h1 className="character__popup-title">Acerca de</h1>
                <h2 className="character__popup-text">{character.description}</h2>
                <h1 className="character__popup-title">Raza:
                    <span className="character__popup-text">{displayedCharacter.race}</span>
                </h1>
                <h1 className="character__popup-title">Planeta de Origen:
                    <span className="character__popup-text">{planet.name}</span>
                </h1>
                <h1 className="character__popup-title">Poder base:
                    <span className="character__popup-text">{displayedCharacter.ki}</span>
                </h1>
                <h1 className="character__popup-title">Poder máximo:
                    <span className="character__popup-text">{character.maxKi}</span>
                </h1>
                
                

            </div>
        </div>

    )


}

export default CharacterPopup;
