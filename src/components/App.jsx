import { useState } from 'react';
import Header from './Header/Header';


function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="page">
            <Header />
        </div>
    )

  

}

export default App
