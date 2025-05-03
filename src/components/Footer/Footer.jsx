import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">
                    © 2025 DB Simulator
                </p>
                <div className="footer__thanks">
                    <p className="footer__text">API por
                        <a className="footer__link" 
                            href="https://web.dragonball-api.com/about"
                            target="_blank">
                            Antonio Alvarez
                        </a> 
                    </p>
                    <p className="footer__text">Música por
                        <a className="footer__link" 
                            href="https://www.youtube.com/@remixrobots9493"
                            target="_blank">
                            Remix Robots
                        </a>
                    </p>
                </div>
            </div>
            
        </footer>
    );
}

export default Footer;