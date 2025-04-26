// This component will create the Header of the application
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const goTo = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    // Determina los botones a mostrar según la ruta actual
    let buttons = [];
    if (location.pathname === '/') {
        buttons = [
            { label: 'Author', path: '/author' },
            { label: 'Battle', path: '/battle' },
        ];
    } else if (location.pathname === '/author') {
        buttons = [
            { label: 'Home', path: '/' },
            { label: 'Battle', path: '/battle' }
        ];
    } else if (location.pathname === '/battle') {
        buttons = [
            { label: 'Author', path: '/author' },
            { label: 'Home', path: '/' }
        ];
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
            <h2 className="header__description">
            Un simulador de batallas de Dragon Ball donde puedes elegir a tus personajes favoritos y hacerlos pelear en varios planetas con diferentes bandas sonoras.
            </h2>

            <div className="header__button-container">
                {buttons.map((btn, index) => (
                    <button 
                        key={index} 
                        className="header__button" 
                        onClick={() => goTo(btn.path)}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Header;
