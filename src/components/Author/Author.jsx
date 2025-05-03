import { useState, useEffect } from "react";

function Author() {
    const [isAnime, setIsAnime] = useState(false);

    function handleTransform() {
        setIsAnime(!isAnime);
    }
    
    let imageTransform = isAnime ? "../images/MeDB.png" : "../images/Me.jpg";


    return (

        <div className="author">
            <div className="author__title-container">
                <img src="../images/AboutMe.png" 
                    alt="Your Cards" 
                    className="author__image-title" />
            </div>
            <div className="author__information-container" 
                 >
                <div className="author__card" 
                          style={{ backgroundImage: `url(${imageTransform})`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center' }}>
                    <button className="author__transform" onClick={handleTransform}>Transformar</button>
                </div>
                <div className="author__description">
  <p>Hola, soy Freddy Silva. Soy originario de Ecuador, pero actualmente vivo en México, donde me mudé para estudiar Ingeniería en Ciencia de Datos y Matemáticas en el Tecnológico de Monterrey.</p>
  <p>Actualmente estoy cursando una maestría en Inteligencia Artificial Aplicada, lo que me ha permitido profundizar en tecnologías avanzadas y aplicarlas en proyectos reales.</p>
  <p>En mi tiempo libre, disfruto ir al gimnasio y estudiar nuevas tecnologías relacionadas con el desarrollo web y el aprendizaje automático (Machine Learning).</p>
  <p>Si quieres saber más sobre mí, te invito a visitar mi perfil de LinkedIn y mi repositorio en GitHub.</p>
  <p>¡Saludos!</p>
  <p>F.S.</p>
</div>

            </div>
        </div>

    )

}


export default Author;