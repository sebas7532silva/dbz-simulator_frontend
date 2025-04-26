// Code for the API utility functions
// The API used corresponds to Dragon Ball API

class API { 
    constructor(options) {
        this._options = options;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    }

    // Function to get the list of characters from the API
    getCharacters() {
        let allCharacters = [];  // Array para almacenar todos los personajes
        let currentPage = 1;  // Página inicial
        let limit = 10;  // Número de personajes por página

        const getPage = (page) => {  // Log para depuración
            return fetch(`${this._options.baseUrl}/characters?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: this._options.headers
            })
            .then(this._checkResponse)
            .then(data => {
                // Agregar los personajes de la página actual al array
                allCharacters = allCharacters.concat(data.items);

                // Si hay una página siguiente, hacer la solicitud para la siguiente página
                if (data.links && data.links.next) {
                    return getPage(page + 1);  // Llamar a la siguiente página
                } else {
                    return allCharacters;  // Si no hay más páginas, devolver todos los personajes
                }
            });
        };

        return getPage(currentPage);  // Llamar a la primera página
    }

    getPlanets() {
        return fetch(`${this._options.baseUrl}/planets`, {
            method: 'GET',
            headers: this._options.headers
        })
        .then(this._checkResponse)
    }

    getPlanetById(id) {
        return fetch(`${this._options.baseUrl}/planets/${id}`, {
            method: 'GET',
            headers: this._options.headers
        })
        .then(this._checkResponse)
    }

    getCharacterById(id) {
        return fetch(`${this._options.baseUrl}/characters/${id}`, {
            method: 'GET',
            headers: this._options.headers
        })
        .then(this._checkResponse)
    }

    getCharactersByFilter(filter) {
        return fetch(`${this._options.baseUrl}/characters?${filter}`, {
            method: 'GET',
            headers: this._options.headers
        })
        .then(this._checkResponse)
    }

}

const api = new API({
    baseUrl: 'https://dragonball-api.com/api',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
});

export default api;
