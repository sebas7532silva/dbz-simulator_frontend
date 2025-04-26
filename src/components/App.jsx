import { useState } from 'react';
import Header from './Header/Header';
import api from '../utils/api.js';
import { useEffect } from 'react';


function App() {
    const [count, setCount] = useState(0)
    const [characters, setCharacters] = useState([])
    const [planets, setPlanets] = useState([])

    // Get all planets and characters when mounting the component
    useEffect(() => {
        api.getPlanets()
            .then((res) => {
                setPlanets(res);
            })
            .catch((err) => {
                console.log(err);
            });
        api.getCharacters()
            .then((res) => {
                setCharacters(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="page">
            <Header />
        </div>
    )

  

}

export default App
