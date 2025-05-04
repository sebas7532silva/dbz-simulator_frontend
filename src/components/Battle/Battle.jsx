import React, { useState, useEffect } from 'react';
import parsePowerLevel from '../../utils/parsePowerLevel.js';
import Carousel from '../Carousel/Carousel.jsx';
import Popup from '../Popup/Popup.jsx';

function Battle({ characters, planets }) {
    const [userTeam, setUserTeam] = useState([]);
    const [rivalTeam, setRivalTeam] = useState([]);
    const [selectingFor, setSelectingFor] = useState('user');
    const [isPopupOpen, setIsPopupOpened] = useState(false);
    const [isSelectingMap, setIsSelectingMap] = useState(false);
    const [selectedMap, setSelectedMap] = useState(null);
    const [fightStarted, setFightStarted] = useState(false);

    const isUser = selectingFor === 'user';
    const currentTeam = isUser ? userTeam : rivalTeam;
    const setCurrentTeam = isUser ? setUserTeam : setRivalTeam;

    function handlePopupClose() {
        setIsPopupOpened(false);
    }

    function handleRemoveMember(index, teamType) {
        if (teamType === 'user') {
            setUserTeam(prev => prev.filter((_, i) => i !== index));
        } else if (teamType === 'rival') {
            setRivalTeam(prev => prev.filter((_, i) => i !== index));
        }
    }

    return (
        <div className="battle">
            <div className="battle__title-container">
                <img src="../images/DBBattle.png" 
                    alt="Campo de batalla" 
                    className="battle__image-title" />
            </div>
            <div className="battle__arena">
                <div className="battle__team-container" id="user">
                    <div className="battle__team-formation">
                                {userTeam.map((character, index) => (
                        <div key={index} className="battle__team-member">
                            <div className="battle__trash-container" onClick={() => handleRemoveMember(index, 'user')} >
                                    <svg className="battle__trash" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.45787 18.1422C2.51882 18.8126 3.06735 19.3002 3.73778 19.3002H14.2615C14.9319 19.3002 15.4804 18.7923 15.5414 18.1422L16.7197 5.79004H1.27954L2.45787 18.1422Z" fill="blue"/>
                                        <path d="M16.7201 1.93002H11.5801V1.27991C11.5801 0.568849 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.568849 6.44018 1.27991V1.93002H1.27991C0.568849 1.93002 0 2.49887 0 3.20993C0 3.92099 0.568849 4.48984 1.27991 4.48984H16.7201C17.4312 4.48984 18 3.92099 18 3.20993C18 2.49887 17.4312 1.93002 16.7201 1.93002Z" fill="blue"/>
                                    </svg>
                                </div> 
                            <div className="battle__member-image-container">
                                <img src={character.image} 
                                     alt={character.name} 
                                     className="battle__member-image"/>
                            </div>
                            
                        </div>
                    ))}
                    {Array.from({ length: 5 - userTeam.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="battle__team-member">
                            <span className="battle__empty-slot">+</span>
                        </div>
                    ))}
                    </div>
                    <div className="battle__logo-container"
                    onClick={() => {
                        setSelectingFor('user');
                        setIsPopupOpened(true);}}>
                        <img src="../images/SideGoku.png" 
                          alt="Summon Icon" 
                          className="battle__logo battle__mirror" />
                    </div>

                </div>
                <div className="battle__team-container" id="rival">
                    <div className="battle__team-formation-rival">
                        {rivalTeam.map((character, index) => (
                            <div key={index} className="battle__team-member">
                                <div className="battle__trash-container" onClick={() => handleRemoveMember(index, 'rival')}>
                                    <svg className="battle__trash" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.45787 18.1422C2.51882 18.8126 3.06735 19.3002 3.73778 19.3002H14.2615C14.9319 19.3002 15.4804 18.7923 15.5414 18.1422L16.7197 5.79004H1.27954L2.45787 18.1422Z" fill="blue"/>
                                        <path d="M16.7201 1.93002H11.5801V1.27991C11.5801 0.568849 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.568849 6.44018 1.27991V1.93002H1.27991C0.568849 1.93002 0 2.49887 0 3.20993C0 3.92099 0.568849 4.48984 1.27991 4.48984H16.7201C17.4312 4.48984 18 3.92099 18 3.20993C18 2.49887 17.4312 1.93002 16.7201 1.93002Z" fill="blue"/>
                                    </svg>
                                </div>  
                                <div className="battle__member-image-container">
                                    <img src={character.image} 
                                        alt={character.name} 
                                        className="battle__member-image"/>
                                </div>
                        </div>
                        ))}
                        {Array.from({ length: 5 - rivalTeam.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="battle__team-member">
                                <span className="battle__empty-slot">+</span>
                            </div>
                        ))}
                        </div>
                        <div className="battle__logo-container"
                            onClick={() => {
                                setSelectingFor('rival');
                                setIsPopupOpened(true);}}>
                            <img src="../images/SideGoku.png" 
                            alt="Summon Icon" 
                            className="battle__logo" />
                    </div>
                </div>
                {isPopupOpen ? (
                    currentTeam.length < 5 ? (
                        <Popup onClose={handlePopupClose}>
                        <Carousel
                            cards={characters}
                            userCards={currentTeam}
                            setUserCards={setCurrentTeam}
                        />
                        </Popup>
                    ) : (
                        <Popup onClose={handlePopupClose}>
                            <div className="battle__full-message">
                                <h2>¡El equipo ya está lleno!</h2>
                            </div>
                        </Popup>
                    )
                    ) : null}

            </div>
            {userTeam.length > 0 && rivalTeam.length > 0 && (
                <button
                    className="battle__begin-fight"
                    onClick={() => setIsSelectingMap(true)}
                >
                    Pelear
                </button>
                )}
            {isSelectingMap && (
            <Popup onClose={() => setIsSelectingMap(false)}>
                <div className="battle__map-selection">
                    <h2>Selecciona un campo de batalla</h2>
                    <div className="battle__map-options">
                        {planets.map((planet, index) => (
                            <div
                                key={index}
                                className="battle__map-option"
                                onClick={() => {
                                    setSelectedMap(planet);
                                    setIsSelectingMap(false);
                                    setFightStarted(true);
                                }}
                            >
                                <img
                                    src={planet.image}
                                    alt={planet.name}
                                    className="battle__map-image"
                                />
                                <p>{planet.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Popup>
        )}   
        </div>
    );
}
export default Battle;


