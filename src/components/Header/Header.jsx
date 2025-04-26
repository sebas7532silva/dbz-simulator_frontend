// This component wi9ll create the Header of the application
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }

    const goToBattle = () => {
        navigate('/battle');
    }
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
                <button className="header__button" onClick={goToHome}>Cards</button>
                <button className="header__button" onClick={goToBattle}>Battle</button>
            </div>

        </div>

    );
}

export default Header;