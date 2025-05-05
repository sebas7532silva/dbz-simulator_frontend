import React, { useEffect, useRef, useState } from 'react';
import songs from '../../utils/songExtraction.js';
import Popup from '../Popup/Popup';

const Music = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const audioRef = useRef(null);
  
    const currentSong = songs[currentSongIndex];
  
    useEffect(() => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
    }, [isPlaying, currentSongIndex]);
  
    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };
  
    const nextSong = () => {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    };
  
    const prevSong = () => {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    };
  
    return (
      <>
        <audio ref={audioRef} src={currentSong.ruta} autoPlay loop />
  
        <button
          className="music__button"
          onClick={() => setShowPopup(true)}
          aria-label="Music Player"
        >
          <svg fill="#000000" version="1.1" id="Capa_1"
	 width="800px" height="800px" viewBox="0 0 387.468 387.467">
        <g>
            <path d="M193.735,158.509c19.452,0,35.229,15.771,35.229,35.225c0,19.452-15.777,35.222-35.229,35.222
                c-19.454,0-35.224-15.77-35.224-35.222C158.512,174.28,174.281,158.509,193.735,158.509z"/>
            <path d="M56.747,56.742c-75.662,75.664-75.662,198.326,0,273.986c75.66,75.652,198.321,75.652,273.981,0
                c75.652-75.668,75.652-198.33,0-273.986C255.061-18.91,132.407-18.918,56.747,56.742z M358.589,213.815l-72.831-15.256
                c-1.15,21.973-9.999,43.621-26.786,60.403c-36.03,36.039-94.431,36.039-130.468,0c-11.813-11.806-19.67-26.027-23.729-41.084
                l-70.804,21.268c-6.083-21.512-7.746-44.005-5.013-66.058l72.803,14.757c1.364-21.604,10.227-42.825,26.737-59.334
                c36.035-36.039,94.436-36.039,130.466,0c11.586,11.579,19.372,25.461,23.52,40.181l71.429-18.857
                C359.614,170.691,361.165,192.459,358.589,213.815z"/>
        </g>
        </svg>
        </button>
  
        {showPopup && (
          <Popup onClose={() => setShowPopup(false)}>
            <div className="music__popup">
              <h2 className="music__title">{currentSong.nombre}</h2>
              <div className="music__controls">
                <button onClick={prevSong} className="music__control-button">⏮</button>
                <button onClick={togglePlay} className="music__control-button">
                  {isPlaying ? '⏸' : '▶️'}
                </button>
                <button onClick={nextSong} className="music__control-button">⏭</button>
              </div>
            </div>
          </Popup>
        )}
      </>
    );
  };
  
  export default Music;
