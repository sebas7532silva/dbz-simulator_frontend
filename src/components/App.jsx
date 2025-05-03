import { useState } from 'react';
import Header from './Header/Header';
import api from '../utils/api.js';
import { useEffect } from 'react';
import Main from './Main/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    const [count, setCount] = useState(0);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

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
                <div>Loading...</div> 
            ) : (
                <Routes>
                    <Route path="/" element={<Main cards={characters} planets={planets} />} />
                </Routes>
            )}

        </div>
        
    )

  

}

export default App
