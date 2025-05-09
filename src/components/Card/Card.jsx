import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import Popup from "../Popup/Popup.jsx";
import CharacterPopup from "../CharacterPopup/CharacterPopup.jsx";


function Card({ character, onDelete }) {
    const [planetId, setPlanetId] = useState({});
    const [planet, setPlanet] = useState({});
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    function handleSeeMore() {
        setIsPopupOpened(true);
    }

    function handlePopupClose() {
        setIsPopupOpened(false)
    }

    useEffect(() => {
        const fetchPlanetId = async () => {
            try {
                const planetResponse = await api.getCharacterById(character.id);
                setPlanetId(planetResponse.originPlanet.id);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPlanetId();
    }, [character.id]);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                if (planetId) { 
                    const planetExtraction = await api.getPlanetById(planetId);
                    setPlanet(planetExtraction);
                }
            } catch (err) {
                console.log("Error al obtener el planeta:", err);
            }
        };

        if (planetId) {
            fetchPlanet();
        }

    }, [planetId]);  

    if (!planet) {
        return <div>Loading planet...</div>;
    }


    return (
        <div className="character__container" style={{ backgroundImage: `url(${planet.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="character__trash-container" onClick={() => onDelete(character.id)}>
                <svg className="character__trash" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.45787 18.1422C2.51882 18.8126 3.06735 19.3002 3.73778 19.3002H14.2615C14.9319 19.3002 15.4804 18.7923 15.5414 18.1422L16.7197 5.79004H1.27954L2.45787 18.1422Z" fill="orange"/>
                    <path d="M16.7201 1.93002H11.5801V1.27991C11.5801 0.568849 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.568849 6.44018 1.27991V1.93002H1.27991C0.568849 1.93002 0 2.49887 0 3.20993C0 3.92099 0.568849 4.48984 1.27991 4.48984H16.7201C17.4312 4.48984 18 3.92099 18 3.20993C18 2.49887 17.4312 1.93002 16.7201 1.93002Z" fill="orange"/>
                </svg>
            </div>
            
            <h2 className="character__name">{character.name}</h2>
            <div className="character__image-container">
                <img 
                    src={character.image} 
                    alt={character.name} 
                    className="character__image" 
                />
            </div>
            <button
                className="character__button" 
                type="button" 
                onClick={handleSeeMore}
            >
            Ver más
            </button> 
            {isPopupOpened && (<Popup onClose={handlePopupClose} >
                <CharacterPopup character={character} planet={planet} />

        
                    </Popup>)}   
        </div>
    );
}

export default Card;