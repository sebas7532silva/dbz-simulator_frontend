import { useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import api from '../utils/api.js';
import { useEffect } from 'react';
import Main from './Main/Main';
import Author from './Author/Author';
import Battle from './Battle/Battle';
import Preloader from './Preloader/Preloader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    const [count, setCount] = useState(0);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userCards, setUserCards] = useState([]);

    // Get all planets and characters when mounting the component
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [planetsResponse, charactersResponse] = await Promise.all([
                    api.getPlanets(),
                    api.getCharacters()
                ]);
    
                setPlanets(planetsResponse.items);
                setCharacters(charactersResponse);
                setLoading(false); 
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="page">
            <Header />
            {loading ? (
                <Preloader /> 
            ) : (
                <Routes>
                    <Route path="/" element={<Main 
                                    cards={characters} 
                                    userCards={userCards}
                                    setUserCards={setUserCards} />} />
                    <Route path="/author" element={ <Author />} />
                    <Route path="/battle" element={ <Battle characters={characters}
                                                            planets={planets}/>} />
                </Routes>
            )}

            <Footer />

        </div>
        
    )

  

}

export default App
