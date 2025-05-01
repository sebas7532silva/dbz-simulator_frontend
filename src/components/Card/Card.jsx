import { useEffect, useState } from "react";
import api from "../../utils/api.js";


function Card({ character, onClick }) {
    const [planetId, setPlanetId] = useState({});
    const [planet, setPlanet] = useState({});

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
                onClick={onClick}
            >
            Ver más
            </button>    
        </div>
    );
}

export default Card;