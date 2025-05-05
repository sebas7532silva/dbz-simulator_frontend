import React, { useState, useEffect } from 'react';
import parsePowerLevel from '../../utils/parsePowerLevel.js';
import Popup from '../Popup/Popup.jsx';
import { useNavigate } from 'react-router-dom';

function FightScene({ userTeam, rivalTeam, selectedMap, handleBackBattle }) {

    const totalKiUser = userTeam.reduce((sum, char) => {
        const parsedKi = parsePowerLevel(char.maxKi);
        return isNaN(parsedKi) ? sum : sum + parsedKi;
    }, 0);
    
    const totalKiRival = rivalTeam.reduce((sum, char) => {
        const parsedKi = parsePowerLevel(char.maxKi);
        return isNaN(parsedKi) ? sum : sum + parsedKi;
    }, 0);

    const winner = totalKiUser > totalKiRival ? 'user' : totalKiRival > totalKiUser ? 'rival' : 'tie';
    const loser = winner === 'user' ? 'rival' : winner === 'rival' ? 'user' : null;

    const [userKi, setUserKi] = useState(totalKiUser);
    const [rivalKi, setRivalKi] = useState(totalKiRival);
    const [showPopup, setShowPopup] = useState(false);
    const [finalWinner, setFinalWinner] = useState('');

    function handleShowWinner() {
        setShowPopup(false);
    }

    useEffect(() => {
        // Verificar si alguno de los equipos ya tiene poder 0 y mostrar el popup
        if (totalKiUser === 0 || totalKiRival === 0) {
            setShowPopup(true);
            setFinalWinner(totalKiUser === 0 ? 'rival' : 'user');
            return; // Salir de la animación ya que el combate ya terminó
        }

        const duration = 10000; // 10 segundos
        const fps = 60;
        const totalFrames = (duration / 1000) * fps;

        const userStart = totalKiUser;
        const rivalStart = totalKiRival;

        const userEnd = winner === 'user' ? Math.floor(totalKiUser * 0.4) : 0;
        const rivalEnd = winner === 'rival' ? Math.floor(totalKiRival * 0.4) : 0;

        const userStep = (userStart - userEnd) / totalFrames;
        const rivalStep = (rivalStart - rivalEnd) / totalFrames;

        let frame = 0;

        const interval = setInterval(() => {
            frame++;

            setUserKi(prev => {
                const next = Math.max(userEnd, prev - userStep);
                return next;
            });

            setRivalKi(prev => {
                const next = Math.max(rivalEnd, prev - rivalStep);
                return next;
            });

            // Verificamos si la vida de un equipo llegó a 0 y mostramos el popup
            if (userKi <= 0 || rivalKi <= 0) {
                clearInterval(interval);
                setShowPopup(true);
                setFinalWinner(winner); // Establecemos el ganador final
            }

            if (frame >= totalFrames) {
                clearInterval(interval);
            }
        }, 1000 / fps);

        return () => clearInterval(interval);
    }, [userKi, rivalKi, totalKiUser, totalKiRival, winner]);

    return (
        <div className="fight"
             style={{
                backgroundImage: selectedMap ? `url(${selectedMap.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            
            <div className="fight-scene__teams">
                <div className="fight-scene__team user">
                    <div className="fight__team-healthbar">
                        <div
                            className="fight__healthbar-effect"
                            style={{
                                width: `${totalKiUser > 0 ? (userKi / totalKiUser) * 100 : 0}%`
                            }}
                        />
                    </div>
                    <div className="fight__characters">
                        {userTeam.map((char) => (
                            <div key={char.id} className="fight__character-container">
                                <img
                                    src={char.image}
                                    alt={char.name}
                                    className="fight__character-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="fight-scene__team rival">
                    <div className="fight__team-healthbar">
                        <div
                            className="fight__healthbar-effect"
                            style={{
                                width: `${totalKiRival > 0 ? (rivalKi / totalKiRival) * 100 : 0}%`
                            }}
                        />
                    </div>
                    <div className="fight__characters">
                        {rivalTeam.map((char) => (
                            <div key={char.id} className="fight__character-container">
                                <img
                                    src={char.image}
                                    alt={char.name}
                                    className="fight__character-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showPopup && (
                <Popup onClose={handleShowWinner}>
                    <div className="fight__over-container">
                        <div className="fight__battle-over">
                            <p className="fight__over-message">
                                {finalWinner === 'tie' 
                                    ? '¡Es un empate!' 
                                    : `El equipo ganador es ${finalWinner === 'user' ? 'tu equipo!' : 'el equipo rival!'}`}
                            </p>
                        </div>
                        <button className="fight__return-battle" onClick={handleBackBattle}>
                            Volver
                        </button>
                    </div>
                </Popup>
            )}

            {(userKi <= 0 || rivalKi <= 0) && !showPopup && (
                <button className="fight__return-battle outside-popup" onClick={handleBackBattle}>
                    Volver
                </button>
            )}
        </div>
    );
}

export default FightScene;
