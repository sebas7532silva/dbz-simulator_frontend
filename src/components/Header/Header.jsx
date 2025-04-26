// This component wi9ll create the Header of the application
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLocation = () => {
        if (location.pathname === '/') {
            navigate('/battle');
        } else {
            navigate('/');
        }
    }
    const buttonText = location.pathname === '/' ? 'Battle' : 'Home';

    return (
        <div className="header">
            <div className="header__logo-container">
                <img src="../images/DBLogo.png" 
                     alt="DB Logo" 
                     className="header__logo" />
                <img src="../images/BSTitle.png" 
                     alt="DB Logo" 
                     className="header__logo" />
            </div>
            <h2 className="header__description">A Dragon Ball battle simulator where you can choose your favorite characters and make them fight across various planets with different soundtracks.</h2>

            <div className="header__button-container">
                <button className="header__button" onClick={handleLocation}>{buttonText}</button>
            </div>

        </div>

    );
}

export default Header;